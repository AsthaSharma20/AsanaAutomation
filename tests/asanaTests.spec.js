const { test, expect } = require('@playwright/test');
const { login } = require('./loginHelper'); // Import the login helper function
const testCases = require('./tests.json'); // Import test cases from a JSON file

// Configuration for locators and constants
const locators = {
    sectionText: (section) => `text=${section}`,
    columnHeader: (column) => ({ role: 'heading', name: column }),
    columnAncestor: 'xpath=../..',
    taskByTitle: (task) => `.BoardCardLayout-title:has-text("${task}")`,
    taskParent: (task) => `.BoardCardLayout-contentAboveSubtasks:has-text("${task}")`,
    tagLocator: (tag) => `.BoardCardCustomPropertiesAndTags:has-text("${tag}")`,
};

// Describe the test suite for Asana Task Verification
test.describe('Asana Task Verification', () => {
    // Before each test, perform the login operation
    test.beforeEach(async ({ page }) => {
        await login(page); // Log in to Asana using the helper function
    });

    // Loop through each test case in the provided JSON file
    for (const { testName, section, task, column, tags } of testCases) {
        test(testName, async ({ page }) => {
            // Step 1: Navigate to the specified section (e.g., project or board)
            await page.click(locators.sectionText(section));

            // Step 2: Locate the column header by its role and name (e.g., "To do")
            const columnHeaderLocator = page.getByRole('heading', locators.columnHeader(column));
            await expect(columnHeaderLocator).toBeVisible(); // Verify that the column header is visible

            // Step 3: Find the parent column container for the header
            // Use XPath to navigate two levels up in the DOM hierarchy
            const columnLocator = columnHeaderLocator.locator(locators.columnAncestor);
            await expect(columnLocator).toBeVisible(); // Verify the column container is visible

            // Step 4: Locate the specific task within the column
            // The task is identified by its text (e.g., "Draft project brief")
            const taskLocator = columnLocator.locator(locators.taskByTitle(task));
            await expect(taskLocator).toBeVisible(); // Verify the task is visible

            // Step 5: Find the task's parent container for further verification
            // The parent contains subtasks and other details
            const taskParentLocator = columnLocator.locator(locators.taskParent(task));

            // Step 6: Verify that the associated tags for the task are visible
            // Iterate through the list of tags provided in the test case
            for (const tag of tags) {
                const tagLocator = taskParentLocator.locator(locators.tagLocator(tag));
                await expect(tagLocator).toBeVisible(); // Verify each tag is visible
            }
        });
    }
});
