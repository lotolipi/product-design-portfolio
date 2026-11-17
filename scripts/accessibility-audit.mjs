import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";

const routes = ["/", "/privacy", "/lottolov", "/work/workatlas", "/resume"];
const viewports = [{ name: "mobile", width: 375, height: 812 }, { name: "desktop", width: 1440, height: 900 }];
const browser = await chromium.launch({ headless: true });
const report = [];
let failed = false;
try {
  for (const route of routes) {
    for (const theme of ["bright", "dark"]) {
      for (const viewport of viewports) {
        const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
        try {
          const page = await context.newPage();
          await page.addInitScript(value => localStorage.setItem("lotolipi-theme", value), theme);
          await page.goto("http://127.0.0.1:3000" + route, { waitUntil: "networkidle" });
          const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
          const skip = await page.locator('a.loto-skip-link[href="#main-content"]').count();
          const main = await page.locator("main#main-content").count();
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
          const violations = results.violations.map(v => ({
            id: v.id, impact: v.impact, count: v.nodes.length,
            nodes: v.nodes.map(n => ({ target: n.target, html: n.html.slice(0, 250), summary: n.failureSummary?.slice(0, 350) }))
          }));
          const entry = { route, theme, viewport: viewport.name, violations, skip, main, overflow };
          report.push(entry);
          console.log(JSON.stringify(entry));
          if (violations.length || skip !== 1 || main !== 1 || overflow) failed = true;
        } catch (error) {
          failed = true;
          const entry = { route, theme, viewport: viewport.name, error: String(error) };
          report.push(entry);
          console.error(JSON.stringify(entry));
        } finally {
          await context.close();
        }
      }
    }
  }
} finally {
  await browser.close();
  await writeFile("accessibility-report.json", JSON.stringify({ checkedAt: new Date().toISOString(), results: report }, null, 2));
}
if (failed) process.exitCode = 1;
