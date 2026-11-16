import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/privacy", "/lottolov", "/work/workatlas", "/resume"];
const browser = await chromium.launch({ headless: true });
let failed = false;
for (const route of routes) {
  for (const theme of ["bright", "dark"]) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
    await page.addInitScript((value) => {
      localStorage.setItem("lotolipi-theme", value);
    }, theme);
    await page.goto("http://127.0.0.1:3000" + route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const skip = await page.locator('a.loto-skip-link[href="#main-content"]').count();
    const main = await page.locator("main#main-content").count();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
    console.log(JSON.stringify({ route, theme, violations: results.violations.map(v => ({ id: v.id, impact: v.impact, count: v.nodes.length })), skip, main, overflow }));
    if (results.violations.length || skip !== 1 || main !== 1 || overflow) failed = true;
    await page.close();
  }
}
await browser.close();
if (failed) process.exitCode = 1;
