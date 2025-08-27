/**
 * 
 * Utilities for Articles
 */

async function createArticle(I, article) {
    I.say("Filling out the article form");
    I.fillField("Article Title", article.title);
    I.fillField("What's this article about?", article.description);
    I.fillField("Write your article (in markdown)", article.body);
    I.fillField("Enter tags", article.tags);

    I.say("Publishing the article");
    I.click("Publish Article");

}

module.exports = {
  createArticle,
};