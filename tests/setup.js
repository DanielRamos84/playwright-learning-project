import { test as setup, expect } from '@playwright/test';
import user from '../playwright/.auth/user.json';
import fs from 'fs';
require('dotenv').config();

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
    const loginPayload = {
        "user": {
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }
    }

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',
        {
            data: loginPayload

        }
    )
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    const token = responseJson.user.token;
    user.origins[0].localStorage[0].value = token;

    fs.writeFileSync(authFile, JSON.stringify(user));
})


