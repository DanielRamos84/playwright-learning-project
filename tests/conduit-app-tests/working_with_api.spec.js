import { test } from '../../utils/testFixtures';
import { expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });
test.beforeAll(async ({ request, accessToken }) => {
  // Ensure the token is valid and delete any existing articles
  const userArticlesResponse = await request.get(
    'https://conduit-api.bondaracademy.com/api/articles?author=Nikita%20Schaefer51',
    {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  if (userArticlesResponse.status() === 401) {
    console.log('Token expired or invalid. Triggering re-authentication...');
    // Reset the accessToken
    await test.getFixtures().accessToken({ request }, () => {});
  }

  const userArticles = await userArticlesResponse.json();
  expect(userArticlesResponse.status()).toEqual(200);

  // Delete any existing articles
  if (userArticles.articles.length > 0) {
    for (const article of userArticles.articles) {
      const deleteResponse = await request.delete(
        `https://conduit-api.bondaracademy.com/api/articles/${article.slug}`,
        {
          headers: {
            Authorization: `Token ${accessToken}`,
          },
        }
      );
      if (!deleteResponse.ok()) {
        console.log(`Failed to delete article: ${article.slug}`);
      } else {
        console.log(`Found and deleted article: ${article.slug}`);
      }
    }
  } else {
    console.log('No articles found for the user.');
  }
});
test('Creates Article', async ({ request, accessToken, authenticatedPage }) => {
  // Create new article via API
  const postNewArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          title: 'Dynamic Functionality Consultant',
          description:
            'Aliquid vitae pariatur nam dignissimos est tempore quam qui aspernatur.',
          body: 'Soluta consectetur esse aliquid nostrum neque maxime.',
          tagList: ['Ea maiores quo veritatis laborum.'],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(postNewArticleResponse.status()).toEqual(201);

  // Assert article is visible from home authenticatedPage global feed tab
  await authenticatedPage.goto('https://conduit.bondaracademy.com');
  await authenticatedPage.locator('.article-preview').last().waitFor();
  await expect(
    authenticatedPage.getByRole('heading', {
      name: /dynamic functionality consultant/i,
    })
  ).toBeVisible();

  // Assert article is visible from profile authenticatedPage
  await authenticatedPage.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await authenticatedPage.locator('.article-preview').last().waitFor();
  await expect(
    authenticatedPage.getByRole('heading', {
      name: /dynamic functionality consultant/i,
    })
  ).toBeVisible();
});
test('Delete Article', async ({ request, authenticatedPage, accessToken }) => {
  // create new article via API
  const postNewArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          title: 'Direct Applications Manager',
          description:
            'Aliquam quos eaque aliquid autem quam nisi vero suscipit consectetur.',
          body: 'Aliquam quos eaque aliquid autem quam nisi vero suscipit consectetur.',
          tagList: [
            'Et consectetur ratione ratione quidem error culpa quae ducimus fuga.',
          ],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(postNewArticleResponse.status()).toEqual(201);
  const postNewArticleResponseData = await postNewArticleResponse.json();

  //delete article through api
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${postNewArticleResponseData.article.slug}`,
    {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(deleteArticleResponse.status()).toEqual(204);

  //assert article is not found from home authenticatedPage
  await authenticatedPage.goto('https://conduit.bondaracademy.com');
  await expect(
    authenticatedPage.getByRole('heading', {
      hasText: postNewArticleResponseData.article.title,
    })
  ).not.toBeVisible();

  //assert article is not found from profile authenticatedPage
  await authenticatedPage.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await expect(
    authenticatedPage.getByRole('heading', {
      hasText: postNewArticleResponseData.article.title,
    })
  ).not.toBeVisible();
});
test('Mark Article as Favorite', async ({
  request,
  accessToken,
  authenticatedPage,
}) => {
  // create new article via API
  const postNewArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          title: 'Future Web Representative',
          description: 'Ratione alias esse.',
          body: 'Quasi ad ea natus.',
          tagList: [
            'Nemo molestiae mollitia quisquam possimus dolor accusamus.',
          ],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(postNewArticleResponse.status()).toEqual(201);
  const postNewArticleResponseData = await postNewArticleResponse.json();

  // assert article is not marked as favorite from home global feed
  await authenticatedPage.goto('https://conduit.bondaracademy.com');
  await authenticatedPage.locator('.article-preview').last().waitFor();
  const articleContainer = authenticatedPage.locator('.article-preview', {
    has: authenticatedPage.locator('h1', {
      hasText: postNewArticleResponseData.article.title,
    }),
  });
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('0');

  // mark article as favorite via API
  const favoriteArticleResponse = await request.post(
    `https://conduit-api.bondaracademy.com/api/articles/${postNewArticleResponseData.article.slug}/favorite`,
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
  await authenticatedPage.locator('.article-preview').last().waitFor();
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('1');

  // assert article is marked as favorite from profile authenticatedPage
  await authenticatedPage.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await authenticatedPage.locator('.article-preview').last().waitFor();
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('1');
});
test('Post Comment on Personal Article', async ({
  request,
  accessToken,
  authenticatedPage,
}) => {
  // create new article via API
  const postNewArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          title: 'National Division Officer',
          description:
            'Ipsum accusamus debitis deleniti adipisci distinctio totam voluptatem ad ratione.',
          body: 'Illo voluptatem illum a ex vero nostrum tempore culpa.',
          tagList: [
            'Tempora consectetur est doloribus laudantium dolor repudiandae in labore.',
          ],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(postNewArticleResponse.status()).toEqual(201);
  const postNewArticleResponseJson = await postNewArticleResponse.json();
  const articleSlug = postNewArticleResponseJson.article.slug;
  const userName = postNewArticleResponseJson.article.author.username;

  // post comment via API
  const commentOwnArticleResponse = await request.post(
    `https://conduit-api.bondaracademy.com/api/articles/${articleSlug}/comments`,
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
    `https://conduit.bondaracademy.com/article/${articleSlug}`
  );

  // iterate over card containers in case there's more than one find the matching one
  await authenticatedPage.locator('[class="card"]').waitFor();
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
