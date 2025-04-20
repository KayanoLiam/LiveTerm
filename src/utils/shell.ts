import React from 'react';
import * as bin from './bin';
import commandMapping from './bin/command_mapping';

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
  } else if (Object.keys(bin).indexOf(args[0]) === -1 && !Object.keys(commandMapping).includes(args[0])) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    // Check if command exists in bin or in commandMapping
    const command = Object.keys(bin).indexOf(args[0]) !== -1 ? bin[args[0]] : commandMapping[args[0]];
    const output = await command(args.slice(1));
    setHistory(output);
  }

  setCommand('');
};
