import allCommands from './bin';

export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  // Get all available commands
  const commands = Object.keys(allCommands);

  // Filter commands that start with the current input
  const matchingCommands = commands.filter((entry) =>
    entry.startsWith(command),
  );

  if (matchingCommands.length === 1) {
    setCommand(matchingCommands[0]);
  }
};
