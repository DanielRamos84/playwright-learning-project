import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { PageObjectManager } from './pageObjectManager';
import * as dotenv from 'dotenv';
import { DeleteArticlesApi, CreateArticleApi } from '../types/fixtures';
import { ArticleData, ArticleResponse } from '../types/article';

dotenv.config();

export const expect = baseExpect;

export const test = baseTest.extend<{
  authenticatedPage: any;
  accessToken: string;
  pageObjectManager: PageObjectManager;
  deleteArticlesApi: (accessToken: string) => Promise<void>;
  createArticleApi: CreateArticleApi;
}>({
  // Define 'accessToken' fixture
  accessToken: async ({ request }, use) => {
    let token = '';

    // Fetch the token by logging in if not already available
    if (!token) {
      const response = await request.post(
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

      const responseBody = await response.json();
      token = responseBody.user?.token || ''; // Use optional chaining and default value
      expect(response.status()).toEqual(200);

      if (!token) {
        throw new Error('Failed to retrieve token from login response');
      }
    }

    // Provide the token to the test
    await use(token);
  },

  // Define 'authenticatedPage' fixture
  authenticatedPage: async ({ page, accessToken }, use) => {
    if (accessToken) {
      // Simulate user being logged in by setting token in localStorage
      await page.goto('https://conduit.bondaracademy.com');
      await page.evaluate((token) => {
        localStorage.setItem('jwtToken', token);
      }, accessToken);
      await page.reload();
    }

    // Provide the authenticated page to the test
    await use(page);
  },

  // POM PageObjectManager fixture
  pageObjectManager: async ({ page }, use) => {
    await use(new PageObjectManager(page));
  },

  // API Deletes All Articles fixture
  deleteArticlesApi: async ({ request }, use) => {
    const deleteArticles: DeleteArticlesApi = async (accessToken: string) => {
      const userArticlesResponse = await request.get(
        'https://conduit-api.bondaracademy.com/api/articles?author=Nikita%20Schaefer51',
        {
          headers: {
            Authorization: `Token ${accessToken}`,
          },
        }
      );

      if (userArticlesResponse.status() !== 200) {
        throw new Error('Failed to fetch user articles');
      }

      const userArticles = await userArticlesResponse.json();

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
            console.error(`Failed to delete article: ${article.slug}`);
          } else {
            console.log(`Deleted article: ${article.slug}`);
          }
        }
      } else {
        console.log('No articles found for the user.');
      }
    };

    // Use the fixture in tests
    await use(deleteArticles);
  },

  // API Creates Article fixture
  createArticleApi: async ({ request }, use) => {
    const createArticle: CreateArticleApi = async (
      accessToken: string,
      articleData: ArticleData
    ): Promise<ArticleResponse> => {
      const postNewArticleResponse = await request.post(
        'https://conduit-api.bondaracademy.com/api/articles/',
        {
          data: {
            article: articleData,
          },
          headers: {
            Authorization: `Token ${accessToken}`,
          },
        }
      );

      expect(postNewArticleResponse.status()).toEqual(201);
      return postNewArticleResponse.json() as Promise<ArticleResponse>;
    };

    await use(createArticle);
  },
});
