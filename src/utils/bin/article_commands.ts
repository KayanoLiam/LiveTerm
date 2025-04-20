import { getArticles, getArticleById, getArticlesByTag, getAllTags, createArticle, deleteArticle as deleteArticleFunc, listArticles } from '../data/articles';
import { marked } from 'marked';

// List all articles
export const articles = async (args: string[]): Promise<string> => {
  const allArticles = getArticles();

  if (allArticles.length === 0) {
    return 'No articles found.';
  }

  let output = '<b>Available Articles:</b>\n\n';

  allArticles.forEach((article, index) => {
    output += `<b>${index + 1}. ${article.title}</b> [${article.date}]\n`;
    output += `ID: ${article.id}\n`;
    output += `Tags: ${article.tags.join(', ')}\n\n`;
  });

  output += "Use 'article [number]' to read a specific article by its number.\n";
  output += "Use 'tags' to see all available tags.\n";
  output += "Use 'tag [name]' to filter articles by tag.\n";
  output += "Use 'write-article [password]' to create a new article (admin only).\n";
  output += "Use 'delete-article [id] [password]' to delete an article (admin only).";

  return output;
};

// Read a specific article
export const article = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return "Please specify an article number or ID. Use 'articles' to see all available articles.";
  }

  const articleIdentifier = args[0];
  const allArticles = getArticles();
  let article;

  // Check if the argument is a number (index) or a string (ID)
  if (/^\d+$/.test(articleIdentifier)) {
    const index = parseInt(articleIdentifier) - 1; // Convert to 0-based index
    if (index >= 0 && index < allArticles.length) {
      article = allArticles[index];
    }
  } else {
    article = getArticleById(articleIdentifier);
  }

  if (!article) {
    return `Article '${articleIdentifier}' not found. Use 'articles' to see all available articles.`;
  }

  // Convert markdown to HTML
  const htmlContent = marked(article.content);

  let output = `<div class="article-container">`;
  output += `<div class="article-header">`;
  output += `<h1>${article.title}</h1>`;
  output += `<p class="article-date">Published on ${article.date}</p>`;
  output += `<p class="article-tags">Tags: ${article.tags.join(', ')}</p>`;
  output += `</div>`;
  output += `<div class="article-content">${htmlContent}</div>`;
  output += `</div>`;

  return output;
};

// List all tags
export const tags = async (args: string[]): Promise<string> => {
  const allTags = getAllTags();

  if (allTags.length === 0) {
    return 'No tags found.';
  }

  let output = '<b>Available Tags:</b>\n\n';
  output += allTags.join(', ') + '\n\n';
  output += "Use 'tag [name]' to see articles with a specific tag.";

  return output;
};

// Filter articles by tag
export const tag = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return "Please specify a tag. Use 'tags' to see all available tags.";
  }

  const tagName = args[0].toLowerCase();
  const articles = getArticlesByTag(tagName);

  if (articles.length === 0) {
    return `No articles found with tag '${tagName}'. Use 'tags' to see all available tags.`;
  }

  let output = `<b>Articles with tag '${tagName}':</b>\n\n`;

  articles.forEach((article, index) => {
    output += `<b>${index + 1}. ${article.title}</b> [${article.date}]\n`;
    output += `ID: ${article.id}\n`;
    output += `Tags: ${article.tags.join(', ')}\n\n`;
  });

  output += "Use 'article [number]' to read a specific article.\n";
  output += "Use 'delete-article [id] [password]' to delete an article (admin only).";

  return output;
};

// Create a new article
export const writeArticle = async (args: string[]): Promise<string> => {
  // Check if password is provided
  if (args.length === 0) {
    return `Usage: write-article [password]\n\nThis command starts an interactive article creation process. You need admin password to create articles.`;
  }

  const password = args[0];

  // Store password in localStorage for later use
  if (typeof window !== 'undefined') {
    localStorage.setItem('article_password', password);
  }

  // Start interactive article creation process
  return `
<b>Article Creation</b> - Admin Mode

To create a new article, please provide the following information:

1. Title: [Enter your article title]
2. Tags: [Enter comma-separated tags]
3. Content: [Enter article content in Markdown format]

When you're done, type 'save-article [title] | [tags] | [content]' to save your article.
Example: save-article My New Article | tag1, tag2 | # Heading\n\nContent here...

Or type 'cancel-article' to cancel.

<b>Article Management</b>
- To delete an article: delete-article [id] [password]
- To view all articles: articles
- To read an article: article [number]
  `;
};

// Save a new article
export const saveArticle = async (args: string[]): Promise<string> => {
  // Join all arguments back into a single string
  const input = args.join(' ');

  // Split by the pipe character
  const parts = input.split('|').map(part => part.trim());

  if (parts.length < 3) {
    return `Error: Invalid format. Please use: save-article [title] | [tags] | [content]`;
  }

  const title = parts[0];
  const tagsString = parts[1];
  const content = parts.slice(2).join('|'); // Rejoin any remaining parts in case content has pipe characters

  // Parse tags
  const tags = tagsString.split(',').map(tag => tag.trim().toLowerCase());

  // Get password from localStorage
  const password = typeof window !== 'undefined' ? localStorage.getItem('article_password') : null;

  if (!password) {
    return `Error: No password provided. Please use 'write-article [password]' first.`;
  }

  // Create the article
  const result = createArticle({ title, tags, content }, password);

  // Clear password from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('article_password');
  }

  if (result.success) {
    return `${result.message}\n\nYou can view it with: article ${result.id}`;
  } else {
    return `Error: ${result.message}`;
  }
};

// Cancel article creation
export const cancelArticle = async (args: string[]): Promise<string> => {
  // Clear password from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('article_password');
  }

  return 'Article creation cancelled.';
};

// Delete an article
export const deleteArticle = async (args: string[]): Promise<string> => {
  if (args.length < 2) {
    return `Usage: delete-article [id] [password]\n\nDeletes an article with the specified ID. Requires admin password.`;
  }

  const id = args[0];
  const password = args[1];

  const result = deleteArticleFunc(id, password);

  if (result.success) {
    return result.message;
  } else {
    return `Error: ${result.message}`;
  }
};
