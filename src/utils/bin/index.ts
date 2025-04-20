import * as commands from './commands';
import * as apiCommands from './api_commands';
import * as aiCommands from './ai_commands';
import commandAliases from './command_aliases';

// Create a merged export object
const allCommands = {
  ...commands,
  ...apiCommands,
  ...aiCommands,
  ...commandAliases
};

// Export everything
export default allCommands;

// Re-export individual modules
export * from './commands';
export * from './api_commands';
export * from './ai_commands';
