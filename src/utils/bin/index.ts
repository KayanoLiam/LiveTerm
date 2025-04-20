import * as commands from './commands';
import * as apiCommands from './api_commands';
import * as aiCommands from './ai_commands';
import { aiChat as aiChatStream } from './ai_commands_stream';
import commandAliases from './command_aliases';

// Create a merged export object
const allCommands = {
  ...commands,
  ...apiCommands,
  ...aiCommands,
  ...commandAliases,
  // 添加流式版本的AI命令
  'ai-stream': aiChatStream
};

// Export everything
export default allCommands;

// Re-export individual modules
export * from './commands';
export * from './api_commands';
export * from './ai_commands';
