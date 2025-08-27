/**
 * 
 * Utilities for users
 */

async function registerUser(I, user) {
  I.amOnPage("/#/register");
  I.fillField("Username", user.username);
  I.fillField("Email", user.email);
  I.fillField("Password", user.password);
  I.click('button[type=submit]');

}

module.exports = {
  registerUser,
};