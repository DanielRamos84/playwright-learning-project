import { test, expect } from '@playwright/test';
import tagsData from '../../test-data/mocks/tagsData.json';
import globalFeedArticlesData from '../../test-data/mocks/articles/globalFeedArticlesData.json';
import yourFeedArticlesData from '../../test-data/mocks/articles/yourFeedArticlesData.json';
test.use({ storageState: 'playwright/.auth/user.json' });
test.beforeEach(async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/');
});
test.skip('Mock Articles Global Feed Page', async ({ page }) => {
  await page.route('**/api/articles?limit=*&offset=*', async (route) => {
    await route.fulfill({
      body: JSON.stringify(globalFeedArticlesData),
    });
  });

  await page.locator('.preview-link').last().waitFor();
  const getArticlesTitle = page.locator('.preview-link h1');
  const getArticlesTitleCount = await getArticlesTitle.count();

  for (let i = 0; i < getArticlesTitleCount; i++) {
    const articleTitle = await getArticlesTitle.nth(i).textContent();
    expect(articleTitle.includes(globalFeedArticlesData.articles[i].title));
  }
});
test.skip('Empty Mock Global Feed Page', async ({ page }) => {
  await page.route('**/api/articles?limit=*&offset=*', async (route) => {
    await route.fulfill({
      body: JSON.stringify([]),
    });
  });

  await page.waitForTimeout(1500);

  await expect(page.locator('.article-preview')).toHaveText(
    /no articles are here... yet./i
  );
});
test.skip('Mock Articles Your Feed Page', async ({ page }) => {
  await page.route('**/api/articles/feed?limit=*offset=*', async (route) => {
    await route.fulfill({
      body: JSON.stringify(yourFeedArticlesData),
    });
  });
  await page.waitForTimeout(1500);

  await page.getByText(/your feed/i).click();

  await page.waitForTimeout(1500);

  await page.locator('.preview-link').last().waitFor();
  const getArticlesTitle = page.locator('.preview-link h1');
  const getArticlesTitleCount = await getArticlesTitle.count();

  for (let i = 0; i < getArticlesTitleCount; i++) {
    const articleTitle = await getArticlesTitle.nth(i).textContent();
    expect(articleTitle.includes(yourFeedArticlesData.articles[i].title));
  }
});
test.skip('Empty Mock Your Feed Page', async ({ page }) => {
  await page.route('**/api/articles/feed?limit=*&offset=*', async (route) => {
    await route.fulfill({
      body: JSON.stringify([]),
    });
  });

  await page.waitForTimeout(1500);

  await page.getByText(/your feed/i).click();

  await page.waitForTimeout(1500);

  await expect(page.locator('.article-preview')).toHaveText(
    /no articles are here... yet./i
  );
});
test.skip('Mock tags', async ({ page }) => {
  await page.route('**/api/tags', async (route) => {
    await route.fulfill({
      body: JSON.stringify(tagsData),
    });
  });

  await page.locator('.sidebar .tag-list a').last().waitFor();
  const getSideBarTags = page.locator('.sidebar .tag-list a');
  const getSideBarTagsCount = await getSideBarTags.count();

  for (let i = 0; i < getSideBarTagsCount; i++) {
    const sideBarTagText = await getSideBarTags.nth(i).textContent();
    expect(sideBarTagText.includes(tagsData.tags[i]));
  }
});
