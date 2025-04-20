import * as commands from './commands';
import * as apiCommands from './api_commands';

// Create a merged export object
const allCommands = {
  ...commands,
  ...apiCommands
};

// Export everything
export default allCommands;

// Re-export individual modules
export * from './commands';
export * from './api_commands';
