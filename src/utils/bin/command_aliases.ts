import { aiChat, clearAiChat } from './ai_commands';

// 命令别名映射
const commandAliases = {
  'ai': aiChat,
  'ai-clear': clearAiChat
};

export default commandAliases;
