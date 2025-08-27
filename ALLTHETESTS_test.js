// This is the main test file containing scenarios for the RealWorld demo site.
// It includes test cases for user registration, login, and article management.

// Use the Chance.js library for generating random data
const Chance = require("chance");
const chance = new Chance();

// Define a test suite for the RealWorld app
Feature("RealWorld App E2E Tests");

// Define a scenario for user registration
Scenario("should allow a new user to register and log in", ({ I }) => {
  // Generate unique user data
  const user = {
    username: chance.first() + chance.last() + chance.animal(),
    email: chance.email(),
    password: "Password123!",
  };

  I.say("Navigating to the registration page");
  I.amOnPage("/#/register");

  I.say("Filling out the registration form");
  I.fillField("Username", user.username);
  I.fillField("Email", user.email);
  I.fillField("Password", user.password);

  I.say("Clicking the sign up button");

  I.say("Verifying successful registration by checking the profile link");
  I.see(user.username, ".navlink");
});

// Define a scenario for user login and logout
Scenario("should allow an existing user to log in and log out", ({ I }) => {
  // Use a pre-existing user for testing login
  const existingUser = {
    email: "test@test.com",
    password: "password",
    username: "testuser",
  };

  I.amOnPage("/#/login");

  I.click("Sign in");

  I.see(existingUser.username, ".nav-link");

  I.click("Settings");
  I.click("Or click here to logout.");

  I.see("Sign in", ".nav-link");
});

// Define a scenario for article creation and deletion
Scenario(
  "should allow a logged-in user to create and delete an article",
  async ({ I }) => {
    // Generate unique article data
    const article = {
      title: `My New Article: ${chance.sentence({ words: 3 })}`,
      description: chance.sentence({ words: 8 }),
      body: chance.paragraph({ sentences: 5 }),
      tags: "codeceptjs, playwright, automated-test",
    };

    I.say("Navigating to the new article page");
    I.click("New Article");

    I.say("Filling out the article form");
    I.fillField("Article Title", article.title);
    I.fillField("What's this article about?", article.description);
    I.fillField("Write your article (in markdown)", article.body);
    I.fillField("Enter tags", article.tags);

    I.say("Publishing the article");
    I.click("Publish Article");
    I.waitForText("Publish Article", 10, "button");

    I.say("Verifying the article was created successfully");
    I.see(article.title, "h1");

    I.say("Deleting the article");
    // Use a custom locator to find the delete button
    // Wait for the delete button to be visible and enabled
    I.waitForVisible("button.btn-outline-danger", 10);
    I.click("Delete Article");

    I.say("Verifying the article is no longer visible on the home page");
    I.amOnPage("/");
    I.dontSee(article.title);
  }
);
