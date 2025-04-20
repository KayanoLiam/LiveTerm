import { writeArticle, saveArticle, cancelArticle, deleteArticle } from './article_commands';

// Map hyphenated command names to camelCase function names
const commandMapping: Record<string, Function> = {
  'write-article': writeArticle,
  'save-article': saveArticle,
  'cancel-article': cancelArticle,
  'delete-article': deleteArticle
};

export default commandMapping;
