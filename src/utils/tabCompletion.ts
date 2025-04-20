import * as bin from './bin';
import commandMapping from './bin/command_mapping';

export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  // Combine commands from bin and commandMapping
  const allCommands = [...Object.keys(bin), ...Object.keys(commandMapping)];

  // Filter commands that start with the current input
  const matchingCommands = allCommands.filter((entry) =>
    entry.startsWith(command),
  );

  if (matchingCommands.length === 1) {
    setCommand(matchingCommands[0]);
  }
};
