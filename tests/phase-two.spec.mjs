import { test, expect } from '@playwright/test';

// Current editorial portfolio replaces the former theme toggle, contact form
// and JS motion class. Test their current user-facing equivalents, not retired selectors.
for (const route of ['/', '/work/workatlas', '/resume', '/lottolov']) {
  test('navigation and content: '+route, async ({page})=>{
    await page.goto(route);
    await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.getByRole('button',{name:/switch to (dark|bright|light) mode/i})).toHaveCount(0);
    await expect(page.locator('footer a[href^="mailto:"]')).toBeVisible();
  });
}
test('mobile contact and layout',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#contact');
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
});
test('reduced motion preserves essential content',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/work/workatlas');
  await expect(page.locator('#evidence')).toBeVisible();
  await page.goto('/resume');
  await expect(page.locator('.experience-row').first()).toBeVisible();
});
for(const [route,feedback] of [['workatlas','Dev’s edit can update'],['signal','Correct: the contexts differ'],['field-guide','Make the trade-off visible']]){
  test('experience choices, keyboard, reset and skip: '+route,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto('/work/'+route);
    const challenge=page.locator('.lot-experience');
    const radios=challenge.getByRole('radio');
    await expect(radios).toHaveCount(2);
    await radios.first().focus();
    await page.keyboard.press('Space');
    await expect(radios.first()).toBeChecked();
    await expect(challenge.getByRole('status')).not.toBeEmpty();
    await page.keyboard.press('ArrowDown');
    await expect(radios.nth(1)).toBeChecked();
    await expect(challenge.getByRole('status')).toContainText(feedback);
    await challenge.getByRole('button',{name:'Reset'}).click();
    await expect(radios.nth(1)).not.toBeChecked();
    await expect(challenge.getByRole('status')).toBeEmpty();
    await challenge.getByRole('link',{name:'Skip to design thinking'}).click();
    await expect(page).toHaveURL(/#case-study-reading$/);
    await expect(page.locator('#case-study-reading main h1')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  });
  test('desktop experience and runtime motion preference: '+route,async({page})=>{
    await page.setViewportSize({width:1440,height:900});
    await page.goto('/work/'+route);
    const challenge=page.locator('.lot-experience');
    await challenge.getByRole('radio').nth(1).check();
    await expect(challenge.getByRole('status')).toContainText(feedback);
    for(const reducedMotion of ['reduce','no-preference']){
      await page.emulateMedia({reducedMotion});
      await expect(challenge.getByRole('status')).toContainText(feedback);
      await expect(page.locator('main h1')).toBeVisible();
    }
  });
}
