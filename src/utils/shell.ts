import React from 'react';
import allCommands from './bin';

export const shell = async (
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('');
  } else if (!Object.keys(allCommands).includes(args[0])) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    // Get the command function from allCommands
    const command = allCommands[args[0]];

    // 检查是否是AI聊天命令，需要特殊处理流式输出
    if (args[0] === 'ai' && allCommands['ai-stream']) {
      try {
        // 使用流式版本的AI命令
        await allCommands['ai-stream'](args.slice(1), setHistory);
      } catch (error) {
        console.error('Error in AI stream command:', error);
        setHistory(`<span style="color: #fb4934;">Error: AI command failed</span>\n\nDetails: ${error.message || 'Unknown error'}`);
      }
    } else {
      // 常规命令处理
      try {
        const output = await command(args.slice(1));
        setHistory(output);
      } catch (error) {
        console.error('Error in command execution:', error);
        setHistory(`<span style="color: #fb4934;">Error: Command failed</span>\n\nDetails: ${error.message || 'Unknown error'}`);
      }
    }
  }

  setCommand('');
};
