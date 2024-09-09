import { test } from '../../utils/testFixtures';
import { expect } from '@playwright/test';
import tagsData from '../../test-data/mocks/tagsData.json';
import globalFeedArticlesData from '../../test-data/mocks/articles/globalFeedArticlesData.json';
import yourFeedArticlesData from '../../test-data/mocks/articles/yourFeedArticlesData.json';
test.beforeEach(async ({ authenticatedPage }) => {
  await authenticatedPage.goto('https://conduit.bondaracademy.com/');
});
test('Mock Articles Global Feed Page', async ({ authenticatedPage }) => {
  await authenticatedPage.route('**/api/articles?limit*', async (route) => {
    await route.fulfill({
      body: JSON.stringify(globalFeedArticlesData),
    });
  });

  await authenticatedPage.locator('.preview-link').last().waitFor();
  const getArticlesTitle = authenticatedPage.locator('.preview-link h1');
  const getArticlesTitleCount = await getArticlesTitle.count();

  for (let i = 0; i < getArticlesTitleCount; i++) {
    const articleTitle = await getArticlesTitle.nth(i).textContent();
    expect(articleTitle.includes(globalFeedArticlesData.articles[i].title));
  }
});
test('Empty Mock Global Feed Page', async ({ authenticatedPage }) => {
  await authenticatedPage.route('**/api/articles?limit*', async (route) => {
    await route.fulfill({
      body: JSON.stringify([]),
    });
  });

  await authenticatedPage.waitForTimeout(1500);

  await expect(authenticatedPage.locator('.article-preview')).toHaveText(
    /no articles are here... yet./i
  );
});
test('Mock Articles Your Feed Page', async ({ authenticatedPage }) => {
  await authenticatedPage.route('**/api/articles/feed?limit*', async (route) => {
    await route.fulfill({
      body: JSON.stringify(yourFeedArticlesData),
    });
  });
  await authenticatedPage.waitForTimeout(1500);

  await authenticatedPage.getByText(/your feed/i).click();

  await authenticatedPage.waitForTimeout(1500);

  await authenticatedPage.locator('.preview-link').last().waitFor();
  const getArticlesTitle = authenticatedPage.locator('.preview-link h1');
  const getArticlesTitleCount = await getArticlesTitle.count();

  for (let i = 0; i < getArticlesTitleCount; i++) {
    const articleTitle = await getArticlesTitle.nth(i).textContent();
    expect(articleTitle.includes(yourFeedArticlesData.articles[i].title));
  }
});
test('Empty Mock Your Feed Page', async ({ authenticatedPage }) => {
  await authenticatedPage.route('**/api/articles/feed?limit*', async (route) => {
    await route.fulfill({
      body: JSON.stringify([]),
    });
  });

  await authenticatedPage.waitForTimeout(1500);

  await authenticatedPage.getByText(/your feed/i).click();

  await authenticatedPage.waitForTimeout(1500);

  await expect(authenticatedPage.locator('.article-preview')).toHaveText(
    /no articles are here... yet./i
  );
});
test('Mock tags', async ({ authenticatedPage }) => {
  await authenticatedPage.route('**/api/tags', async (route) => {
    await route.fulfill({
      body: JSON.stringify(tagsData),
    });
  });

  await authenticatedPage.locator('.sidebar .tag-list a').last().waitFor();
  const getSideBarTags = authenticatedPage.locator('.sidebar .tag-list a');
  const getSideBarTagsCount = await getSideBarTags.count();

  for (let i = 0; i < getSideBarTagsCount; i++) {
    const sideBarTagText = await getSideBarTags.nth(i).textContent();
    expect(sideBarTagText.includes(tagsData.tags[i]));
  }
});
