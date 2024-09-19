import { test } from '../../utils/testFixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
test.describe.configure({ mode: 'serial' });
test.beforeAll(async ({ accessToken, deleteArticlesApi }) => {
  // Use the deleteArticlesApi fixture to delete the articles with the accessToken
  await deleteArticlesApi(accessToken);
});
test('Creates Article', async ({
  accessToken,
  authenticatedPage,
  createArticleApi,
}) => {
  const fakeTitle = faker.company.catchPhrase();
  const fakeDescription = faker.lorem.sentence();
  const fakeBody = faker.lorem.paragraph();
  const fakeTagList = [faker.hacker.noun()];

  // Use the createArticleApi fixture to create an article with the accessToken
  await createArticleApi(accessToken, {
    title: fakeTitle,
    description: fakeDescription,
    body: fakeBody,
    tagList: fakeTagList,
  });

  // Assert article is visible from home authenticatedPage global feed tab
  await authenticatedPage.goto('https://conduit.bondaracademy.com');

  await authenticatedPage
    .locator('.article-preview')
    .last()
    .waitFor({ state: 'visible' });

  await expect(
    authenticatedPage.getByRole('heading', {
      name: fakeTitle,
    })
  ).toBeVisible();

  // Assert article is visible from profile authenticatedPage
  await authenticatedPage.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );

  await authenticatedPage
    .locator('.article-preview')
    .waitFor({ state: 'visible' });

  await expect(
    authenticatedPage.getByRole('heading', {
      name: fakeTitle,
    })
  ).toBeVisible();
});
test('Delete Article', async ({
  request,
  authenticatedPage,
  accessToken,
  deleteArticlesApi,
  createArticleApi,
}) => {
  const fakeTitle = faker.company.catchPhrase();
  const fakeDescription = faker.lorem.sentence();
  const fakeBody = faker.lorem.paragraph();
  const fakeTagList = [faker.hacker.noun()];

  // Use the createArticleApi fixture to create an article with the accessToken
  const postNewArticleResponseData = await createArticleApi(accessToken, {
    title: fakeTitle,
    description: fakeDescription,
    body: fakeBody,
    tagList: fakeTagList,
  });

  const slug = postNewArticleResponseData.article.slug;

  await deleteArticlesApi(accessToken);

  //assert article is not found from home authenticatedPage
  await authenticatedPage.goto('https://conduit.bondaracademy.com');
  await expect(
    authenticatedPage.getByRole('heading', {
      hasText: fakeTitle,
    })
  ).not.toBeVisible();

  //assert article is not found from profile authenticatedPage
  await authenticatedPage.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await expect(
    authenticatedPage.getByRole('heading', {
      hasText: fakeTitle,
    })
  ).not.toBeVisible();
});
test('Mark Article as Favorite', async ({
  request,
  accessToken,
  authenticatedPage,
  createArticleApi,
}) => {
  const fakeTitle = faker.company.catchPhrase();
  const fakeDescription = faker.lorem.sentence();
  const fakeBody = faker.lorem.paragraph();
  const fakeTagList = [faker.hacker.noun()];

  // Use the createArticleApi fixture to create an article with the accessToken
  const postNewArticleResponseData = await createArticleApi(accessToken, {
    title: fakeTitle,
    description: fakeDescription,
    body: fakeBody,
    tagList: fakeTagList,
  });

  const slug = postNewArticleResponseData.article.slug;

  // assert article is not marked as favorite from home global feed
  await authenticatedPage.goto('https://conduit.bondaracademy.com');
  await authenticatedPage
    .locator('.article-preview')
    .last()
    .waitFor({ state: 'visible' });
  
    const articleContainer = authenticatedPage.locator('.article-preview', {
    has: authenticatedPage.locator('h1', {
      hasText: fakeTitle,
    }),
  });
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('0');

  // mark article as favorite via API
  const favoriteArticleResponse = await request.post(
    `https://conduit-api.bondaracademy.com/api/articles/${slug}/favorite`,
    {
      data: {
        article: {
          favorited: true,
          favoritesCount: 1,
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(favoriteArticleResponse.status()).toEqual(200);

  // assert article is marked as favorite from home authenticatedPage
  await authenticatedPage.goto('https://conduit.bondaracademy.com');
  await authenticatedPage
    .locator('.article-preview')
    .last()
    .waitFor({ state: 'visible' });
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('1');

  // assert article is marked as favorite from profile authenticatedPage
  await authenticatedPage.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await authenticatedPage
    .locator('.article-preview')
    .last()
    .waitFor({ state: 'visible' });
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('1');
});
test('Post Comment on Personal Article', async ({
  request,
  accessToken,
  authenticatedPage,
  createArticleApi,
}) => {
  const fakeTitle = faker.company.catchPhrase();
  const fakeDescription = faker.lorem.sentence();
  const fakeBody = faker.lorem.paragraph();
  const fakeTagList = [faker.hacker.noun()];

  // Use the createArticleApi fixture to create an article with the accessToken
  const postNewArticleResponseData = await createArticleApi(accessToken, {
    title: fakeTitle,
    description: fakeDescription,
    body: fakeBody,
    tagList: fakeTagList,
  });

  const slug = postNewArticleResponseData.article.slug;
  const userName = postNewArticleResponseData.article.author.username;

  // post comment via API
  const commentOwnArticleResponse = await request.post(
    `https://conduit-api.bondaracademy.com/api/articles/${slug}/comments`,
    {
      data: {
        comment: {
          body: 'omnis odio numquam.',
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(commentOwnArticleResponse.status()).toEqual(200);
  const commentJson = await commentOwnArticleResponse.json();
  const comment = commentJson.comment.body;

  await authenticatedPage.goto(
    `https://conduit.bondaracademy.com/article/${slug}`
  );

  // iterate over card containers in case there's more than one find the matching one
  await authenticatedPage
    .locator('[class="card"]')
    .waitFor({ state: 'visible' });
  const commentCards = authenticatedPage.locator('[class="card"]');
  const commentCardsCount = await commentCards.count();

  for (let i = 0; i < commentCardsCount; i++) {
    let text = await commentCards.nth(i).locator('.card-text').textContent();
    if (text.includes(comment)) {
      // assert author
      //TODO: function or logic to assert dynamic date
      await expect(
        commentCards.nth(i).getByRole('link', { name: userName })
      ).toHaveText(userName);
      // await expect(commentCards.nth(i).locator('.date-posted')).toHaveText(
      //   'September 4, 2024'
      // ); need to assert dynamic date with correct format
    } else {
      console.log('No matching comment found');
      break;
    }
  }
});
