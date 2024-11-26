// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 30000, // Set timeout for each test
    retries: 1, // Retry failing tests once
    use: {
        headless: true, // Run tests in headless mode
    },
    reporter: [['html', { outputFolder: 'playwright-report' }]], // Use the HTML reporter
});
