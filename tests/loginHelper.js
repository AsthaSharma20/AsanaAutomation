const { expect } = require('@playwright/test');

// Configuration object for login credentials and locators
const config = {
    url: 'https://app.asana.com/-/login',
    credentials: {
        email: 'ben+pose@workwithloop.com',
        password: 'Password123',
    },
    locators: {
        emailField: 'Email address',
        continueButton: { role: 'button', name: 'Continue', exact: true },
        passwordField: { label: 'Password', exact: true },
        loginButton: { role: 'button', name: 'Log in' },
    },
};

// Function to log in to the Asana application
async function login(page) {
    // Navigate to the login page
    await page.goto(config.url);

    // Interact with the email field
    await page.getByLabel(config.locators.emailField).click();
    await page.getByLabel(config.locators.emailField).fill(config.credentials.email);

    // Click the "Continue" button
    await page.getByRole(config.locators.continueButton.role, {
        name: config.locators.continueButton.name,
        exact: config.locators.continueButton.exact,
    }).click();

    // Interact with the password field
    await page.getByLabel(config.locators.passwordField.label, { exact: config.locators.passwordField.exact }).fill(config.credentials.password);

    // Click the "Log in" button
    await page.getByRole(config.locators.loginButton.role, { name: config.locators.loginButton.name }).click();

    // Wait for the page to finish loading
    await page.waitForLoadState('networkidle');
}

// Export the login function for use in other test scripts
module.exports = { login };
