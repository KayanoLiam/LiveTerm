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
    const output = await command(args.slice(1));
    setHistory(output);
  }

  setCommand('');
};
