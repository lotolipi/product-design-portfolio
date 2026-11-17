import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({ headless: true });
const checks = [];
const site = "http://www.lotolipi.space:3000";
let failed = false;

async function scenario(name, run, production = true) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const gaRequests = [];
  try {
    if (production) {
      await context.route(site + "/**", async route => {
        const url = route.request().url().replace("http://www.lotolipi.space:3000", "http://127.0.0.1:3000");
        try {
          const response = await route.fetch({ url });
          await route.fulfill({ response });
        } catch (error) {
          await route.abort();
          throw error;
        }
      });
    }
    await context.route(/https:\/\/(www\.)?googletagmanager\.com\//, async route => {
      gaRequests.push(route.request().url());
      await route.fulfill({ status: 200, contentType: "application/javascript", body: "/* mocked GA4 loader: no analytics sent */" });
    });
    const page = await context.newPage();
    await run(page, gaRequests, production ? site : "http://127.0.0.1:3000");
    checks.push({ name, pass: true, gaRequests });
  } catch (error) {
    failed = true;
    checks.push({ name, pass: false, error: String(error), gaRequests });
  } finally {
    await context.close();
  }
}

try {
  await scenario("production host: no consent means no GA4 loader", async (page, requests, base) => {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Allow analytics" }).waitFor();
    if (requests.length) throw Error("GA4 loaded before consent");
  });

  await scenario("production host: decline persists and blocks GA4", async (page, requests, base) => {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "No thanks" }).click();
    await page.reload({ waitUntil: "networkidle" });
    if (requests.length) throw Error("GA4 loaded after decline");
    if (await page.getByRole("button", { name: "Allow analytics" }).count()) throw Error("Decline not persisted");
  });

  await scenario("production host: acceptance loads GA4 and persists", async (page, requests, base) => {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Allow analytics" }).click();
    await page.locator('script[src*="googletagmanager.com/gtag/js"]').waitFor({ state: "attached" });
    if (!requests.some(url => url.includes("G-15PTW9YS2F"))) throw Error("GA4 loader not requested after consent");
    await page.reload({ waitUntil: "networkidle" });
    if (await page.getByRole("button", { name: "Allow analytics" }).count()) throw Error("Acceptance not persisted");
    await page.goto(base + "/privacy", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Change analytics choice" }).click();
    await page.getByRole("button", { name: "No thanks" }).waitFor();
  });

  await scenario("preview host: GA4 and consent banner disabled", async (page, requests, base) => {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    if (requests.length) throw Error("GA4 loaded in preview");
    if (await page.getByRole("button", { name: "Allow analytics" }).count()) throw Error("Production consent banner rendered in preview");
  }, false);
} finally {
  await browser.close();
  await writeFile("analytics-qa-report.json", JSON.stringify({ checks }, null, 2));
}
for (const check of checks) console.log(JSON.stringify(check));
if (failed) process.exitCode = 1;
