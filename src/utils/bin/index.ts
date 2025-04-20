export * from './commands';
export * from './api_commands';
export * from './article_commands';
import commandMapping from './command_mapping';

// Export mapped commands
Object.entries(commandMapping).forEach(([key, value]) => {
  exports[key] = value;
});
