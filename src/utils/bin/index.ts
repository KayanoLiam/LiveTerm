import * as commands from './commands';
import * as apiCommands from './api_commands';
import * as articleCommands from './article_commands';
import commandMapping from './command_mapping';

// Create a merged export object
const allCommands = {
  ...commands,
  ...apiCommands,
  ...articleCommands,
  ...commandMapping
};

// Export everything
export default allCommands;

// Re-export individual modules
export * from './commands';
export * from './api_commands';
export * from './article_commands';
