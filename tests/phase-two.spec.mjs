import { test, expect } from '@playwright/test';

const routes = ['/', '/work/workatlas', '/resume', '/lottolov'];

for (const route of routes) {
  test(`theme switch persists and stays in footer: ${route}`, async ({ page }) => {
    await page.goto(route);
    const toggle = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(toggle).toBeVisible();
    await expect(toggle.locator('xpath=..')).toHaveJSProperty('tagName', 'FOOTER');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-loto-theme', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-loto-theme', 'dark');
    await expect(page.getByRole('button', { name: 'Switch to bright mode' })).toBeVisible();
  });
}

test('mobile contact is usable without floating controls or horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#contact');
  const form = page.locator('.co-contact .co-mail-form');
  await expect(form).toBeVisible();
  await expect(form).toHaveCSS('opacity', '1');
  const toggle = page.locator('.co-footer .loto-theme-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveCSS('position', 'static');
  const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  expect(overflowing).toBe(false);
});

test('reduced motion keeps essential content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/workatlas');
  await expect(page.locator('.co-case-page .chapter').first()).toBeVisible();
  await page.goto('/resume');
  await expect(page.locator('.resume-shell .resume-job').first()).toBeVisible();
});

test('keyboard can operate theme toggle', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('.co-footer .loto-theme-toggle');
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-loto-theme', 'dark');
});

test('runtime reduced-motion changes disable and restore Phase 2 enhancement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/work/workatlas');
  const root = page.locator('html');
  await expect(root).toHaveClass(/loto-phase2/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(root).not.toHaveClass(/loto-phase2/);
  await expect(page.locator('.co-case-page .chapter').first()).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(root).toHaveClass(/loto-phase2/);
  await expect(page.locator('.co-case-page .chapter').first()).toBeVisible();
});
