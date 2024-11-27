# AsanaAutomation

Test Automation for Asana using Playwright

This project automates the task verification process for Asana using Playwright. It includes functionality to log in to Asana, navigate to projects, and verify specific tasks along with their associated tags.

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- Asana account credentials

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/AsthaSharma20/AsanaAutomation.git
cd asana-automation
```
### 2. Install Dependencies
Install the required dependencies for the project:

```bash
Copy code
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the root of your project to store sensitive information such as your Asana login credentials.

Example .env file:

```bash
ASANA_EMAIL=your-email@example.com
ASANA_PASSWORD=your-password
```
Important: Ensure the .env file is not committed to version control. It is recommended to add .env to your .gitignore file to keep sensitive data secure.

```bash
npm install dotenv // install this to use the variables
```
### 4. Run the Tests
After setting up the .env file, you can run the tests using Playwright’s test runner.

```bash
npx playwright test
```
This command will run the automation tests defined in asanaTests.spec.js and verify tasks across different sections in your Asana projects.

### 5. Customizing the Tests
You can modify the test cases by editing the tests.json file, where each test case includes:

- testName: The name of the test
- section: The section of the Asana project
- task: The task to verify
- column: The column where the task should appear
- tags: The tags to verify associated with the task
Example of a test case in tests.json:

```bash

[
    {
        "testName": "Verify 'Draft project brief' in 'To do' column",
        "section": "Cross-functional project plan, Project",
        "task": "Draft project brief",
        "column": "To do",
        "tags": ["Non-Priority", "On track"]
    }
]
```

Project Structure
The project is organized into the following directory structure:

```bash

asana-automation/
├── .env                  # Stores environment variables like email and password for login
├── node_modules/          # Node.js modules installed by npm
├── tests/                 # Directory containing the test scripts
│   ├── asanaTests.spec.js # Main test script with Playwright tests
│   ├── loginHelper.js     # Helper function for logging into Asana
│   └── tests.json         # JSON file containing the test cases
├── package.json           # Project metadata and dependencies
├── playwright.config.js   # Playwright configuration file
└── README.md              # Project documentation (this file)
```

File Descriptions
- tests/: This directory contains all the testing-related files.
- asanaTests.spec.js: The main test file, where the Playwright test suite is defined. It includes the test logic for verifying tasks in Asana.
- loginHelper.js: A helper file containing the login function, which automates the login process for Asana.
- tests.json: This JSON file contains an array of test cases, each of which specifies the section, task, column, and tags to verify.
- .env: Contains sensitive information like your Asana login credentials. These values are loaded into the application via process.env.
- package.json: The Node.js project configuration file, which defines dependencies and scripts.
- playwright.config.js: The configuration file for Playwright, where test settings like timeouts, base URL, and global setup can be defined.
- README.md: The documentation file providing an overview of the project, setup instructions, and usage.

How It Works
- Login: The login function automates the login process to Asana using the credentials from the .env file.
- Test Execution: Each test case navigates to a specified Asana project, locates tasks based on their column and tags, and verifies their presence.
- Test Results: The test results will indicate whether the tasks and their associated tags are correctly displayed in the specified columns.