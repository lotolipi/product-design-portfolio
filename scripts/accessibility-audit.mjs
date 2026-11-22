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
          // Desktop keyboard/reduced-motion smoke checks; run against the same rendered page.
          let keyboard = null;
          if (viewport.name === "desktop") {
            await page.keyboard.press("Tab");
            const skipFocused = await page.locator('a.loto-skip-link').evaluate(el => el === document.activeElement);
            const skipVisible = await page.locator('a.loto-skip-link').evaluate(el => {
              const style = getComputedStyle(el);
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && style.visibility !== "hidden" && style.opacity !== "0";
            });
            await page.keyboard.press("Enter");
            const mainFocused = await page.locator("main#main-content").evaluate(el => el === document.activeElement);
            const reducedScroll = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === "auto");
            const toggle = page.locator("button.loto-theme-toggle");
            // Privacy has its own navigation and intentionally no theme toggle.
            // All other routes must still expose the keyboard-operable control.
            if (route === "/privacy" && await toggle.count() === 0) {
              keyboard = { skipFocused, skipVisible, mainFocused, reducedScroll, themeToggleNotApplicable: true };
            } else {
            await toggle.focus();
            const toggleFocused = await toggle.evaluate(el => el === document.activeElement);
            const toggleFocusIndicator = await toggle.evaluate(el => {
              const s = getComputedStyle(el);
              return (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== "none";
            });
            const beforeTheme = await page.locator("html").getAttribute("data-loto-theme");
            await page.keyboard.press("Enter");
            const expectedTheme = beforeTheme === "dark" ? "bright" : "dark";
            const afterTheme = await page.locator("html").getAttribute("data-loto-theme");
            const storedTheme = await page.evaluate(() => localStorage.getItem("lotolipi-theme"));
            keyboard = { skipFocused, skipVisible, mainFocused, reducedScroll, toggleFocused, toggleFocusIndicator, themeKeyboardOperable: afterTheme === expectedTheme, themePersisted: storedTheme === expectedTheme };
            }
            if (Object.values(keyboard).some(value => value !== true)) failed = true;
          }
          const entry = { route, theme, viewport: viewport.name, violations, skip, main, overflow, keyboard };
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
