const { registerUser } = require("../utils/userUtils");
const { createArticle } = require("../utils/articleUtils");

const Chance = require("chance");
const chance = new Chance();

// This is the main test file containing scenarios for the RealWorld demo site.
// It includes test cases for user registration, login, and article management.

// Use the Chance.js library for generating random data
// Define a test suite for the RealWorld app
Feature("RealWorld App E2E Tests");

const generateRandomUser = () => ({
  username: chance.first() + chance.last() + chance.animal(),
  email: chance.email(),
  password: "Password123!",
});

const getTestUser = () => ({
  email: "test@test.com",
  password: "password",
  username: "testuser",
});


//Define a scenario for user registration
Scenario("should allow a new user to register and log in", ({ I }) => {
  // Generate unique user data
  const user = generateRandomUser();
  // Register a user
  registerUser(I, user);
  // Verify user has been created successfully
  I.say("Verifying successful registration by checking the profile link");
  I.see(user.username, 'a.nav-link');

});

// Define a scenario for user login and logout
Scenario("should allow an existing user to log in and log out", ({ I }) => {
  // Getting existing user ->  To be improved
  const existingUser = getTestUser();
  // Creating a new user
  registerUser(I, existingUser);
  // Navigating to setting to logout
  I.say("Clicking on Settings");
  I.click('Settings')
  I.say("Logging out");
  I.click('button[class="btn btn-outline-danger"]');
  // Verify logout
  I.say("Verify logging out successfully");
  I.see('Sign in');
  I.dontSee(existingUser.username, 'a.nav-link');
});



// Define a scenario for article creation and deletion
Scenario(
  "should allow a logged-in user to create and delete an article",
  async ({ I }) => {
    // Test data
    const existingUser = getTestUser();
    const article = {
      title: `My New Article: ${chance.sentence({ words: 3 })}`,
      description: chance.sentence({ words: 8 }),
      body: chance.paragraph({ sentences: 3 }),
      tags: "codeceptjs, play",
    };

    // Create a user
    registerUser(I, existingUser);
    // Navigate to Article  
    I.say("Navigating to the new article page");
    I.waitForElement('//a[contains(text(), "New Article")]', 20);
    I.click('//a[contains(text(), "New Article")]');
    // Create an Article
    createArticle(I, article);
    I.waitForVisible('//button[contains(text(), "Post Comment")]', 20);
    I.click("Post Comment");
    // Verify Article has been created
    I.say("Verifying the article was created successfully");
    I.see(article.title, "h1");
    // Deleting the article
    I.say("Deleting the article");
    I.waitForVisible("button.btn-outline-danger", 10);
    I.click("Delete Article");
    // Verify article has been deleted successfully
    I.say("Verifying the article is no longer visible on the home page");
    I.amOnPage("/");
    I.dontSee(article.title);
  }
);
