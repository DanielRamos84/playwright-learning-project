import { test, expect } from '@playwright/test';
require('dotenv').config();
let accessToken;
test.use({ storageState: 'playwright/.auth/user.json' });
test.beforeAll(async ({ request }) => {
  // login via API get token to use in further requests
  const postAuthorizationResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
      data: {
        user: {
          email: process.env.EMAIL,
          password: process.env.PASSWORD,
        },
      },
    }
  );

  const responseBody = await postAuthorizationResponse.json();
  accessToken = responseBody.user.token;
  expect(postAuthorizationResponse.status()).toEqual(200);

  // get all articles by the user logged in
  const userArticlesResponse = await request.get(
    'https://conduit-api.bondaracademy.com/api/articles?author=Nikita%20Schaefer51',
    {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  const userArticles = await userArticlesResponse.json();
  expect(userArticlesResponse.status()).toEqual(200);

  // delete any article if present
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
test.skip('Creates Article', async ({ page, request }) => {
  // create new article via API
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

  // assert article is visible from home page global feed tab
  await page.goto('https://conduit.bondaracademy.com');

  await page.locator('.article-preview').last().waitFor();
  await expect(
    page.getByRole('heading', { name: /dynamic functionality consultant/i })
  ).toBeVisible();

  // assert article is visible from home page global feed tab
  await page.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await page.locator('.article-preview').last().waitFor();
  await expect(
    page.getByRole('heading', { name: /dynamic functionality consultant/i })
  ).toBeVisible();
});
test.skip('Delete Article', async ({ page, request }) => {
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
  console.log(postNewArticleResponseData.article.slug);

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

  //assert article is not found from home page
  await page.goto('https://conduit.bondaracademy.com');
  await expect(
    page.getByRole('heading', { hasText: /direct applications manager/i })
  ).not.toBeVisible();

  //assert article is not found from profile page
  await page.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await expect(
    page.getByRole('heading', { hasText: /direct applications manager/i })
  ).not.toBeVisible();
});
test.skip('Mark Article as Favorite', async ({ page, request }) => {
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

  // assert article is not marked as favorite from home page
  await page.goto('https://conduit.bondaracademy.com');
  await page.locator('.article-preview').last().waitFor();
  const articleContainer = page.locator('.article-preview', {
    has: page.locator('h1', { hasText: /future web representative/i }),
  });
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('0');

  // mark article as favorite via API
  const favoriteArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/Future-Web-Representative-8414/favorite',
    {
      data: {
        article: {
          id: 83262,
          slug: 'Future-Web-8414',
          title: 'Future Web',
          description: 'Ratione alias esse.',
          body: 'Quasi ad ea natus.',
          createdAt: '2024-09-03T17:25:46.361Z',
          updatedAt: '2024-09-03T17:25:46.361Z',
          authorId: 8414,
          tagList: [
            'Nemo molestiae mollitia quisquam possimus dolor accusamus.',
          ],
          author: {
            username: 'Nikita Schaefer51',
            bio: null,
            image:
              'https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg',
            following: false,
          },
          favoritedBy: [
            {
              id: 8414,
              email: 'your.email+fakedata57790@emial.com',
              username: 'Nikita Schaefer51',
              password:
                '$2a$10$QDHvAXSsiInMz1OFaS1YwuZuXQSDU8Di6Tg7Xw1EKpVZtRNdgGg4u',
              image:
                'https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg',
              bio: null,
              demo: false,
            },
          ],
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

  // assert article is marked as favorite from home page
  await page.goto('https://conduit.bondaracademy.com');
  await page.locator('.article-preview').last().waitFor();
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('1');

  // assert article is marked as favorite from profile page
  await page.goto(
    'https://conduit.bondaracademy.com/profile/Nikita%20Schaefer51'
  );
  await page.locator('.article-preview').last().waitFor();
  await expect(articleContainer.locator('.pull-xs-right')).toHaveText('1');
});
test.skip('Post Comment on Personal Article', async ({ page, request }) => {
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

  await page.goto(`https://conduit.bondaracademy.com/article/${articleSlug}`);

  // iterate over card containers in case there's more than one find the matching one
  await page.locator('[class="card"]').waitFor();
  const commentCards = page.locator('[class="card"]');
  const commentCardsCount = await commentCards.count();

  for (let i = 0; i < commentCardsCount; i++) {
    let text = await commentCards.nth(i).locator('.card-text').textContent();
    if (text.includes(comment)) {
      // assert author and date
      await expect(
        commentCards.nth(i).getByRole('link', { name: userName })
      ).toHaveText(userName);
      await expect(commentCards.nth(i).locator('.date-posted')).toHaveText(
        'September 4, 2024'
      );
    } else {
      console.log('No matching comment found');
      break;
    }
  }
});
