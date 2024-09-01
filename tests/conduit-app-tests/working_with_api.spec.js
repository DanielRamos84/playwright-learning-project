import { test, expect } from '@playwright/test';
require('dotenv').config();
let accessToken;
test.use({ storageState: 'playwright/.auth/user.json' });
test.beforeEach(async({request}) => {
    // login via API get token to use in further requests
    const postAuthorizationResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD
            }
        }

    });

    const responseBody = await postAuthorizationResponse.json();
    accessToken = responseBody.user.token;
    await expect(postAuthorizationResponse).toBeOK();

    // get all articles by the user logged in
    const userArticlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?author=Nikita%20Schaefer51', {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });

    const userArticles = await userArticlesResponse.json();
    await expect(userArticlesResponse).toBeOK();

    // Iterate over the articles and delete them one by one
    if (userArticles.articles.length > 0) {
        for (const article of userArticles.articles) {
            const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${article.slug}`, {
                headers: {
                    Authorization: `Token ${accessToken}`
                }
            });
            if (!deleteResponse.ok()) {
                console.log(`Failed to delete article: ${article.slug}`);
            } else {
                console.log(`Start with clean slate deleted article: ${article.slug}`);
            }
        }
    } else {
        console.log("No articles found for the user.");
    }
})

test.skip('Create a New Article', async ({ page, request }) => {  
    // create new article via API    
    const postNewArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {
                title: "Dynamic Functionality Consultant",
                description: "Aliquid vitae pariatur nam dignissimos est tempore quam qui aspernatur.",
                body: "Soluta consectetur esse aliquid nostrum neque maxime.",
                tagList: [
                    "Ea maiores quo veritatis laborum."
                ]
            }
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })

    await expect(postNewArticleResponse).toBeOK();

    await page.goto('https://conduit.bondaracademy.com');
    await expect(page.getByRole('heading', { name: 'Dynamic Functionality Consultant' })).toBeVisible()
});

test.skip('Delete Article', async ({ page, request }) => {
    // create article via API
    const postNewArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {
                title: "Dynamic Functionality Consultant",
                description: "Aliquid vitae pariatur nam dignissimos est tempore quam qui aspernatur.",
                body: "Soluta consectetur esse aliquid nostrum neque maxime.",
                tagList: [
                    "Ea maiores quo veritatis laborum."
                ]
            }
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })

    await expect(postNewArticleResponse).toBeOK();

    await page.goto('https://conduit.bondaracademy.com');
    await (page.getByText('Dynamic Functionality Consultant')).click();

    // delete article through ui
    await (page.getByRole('button', { name: /delete article/i })).first().click();
    await expect(page.getByText(/global feed/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dynamic Functionality Consultant' })).not.toBeVisible()
})