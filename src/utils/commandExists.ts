import allCommands from './bin';

export const commandExists = (command: string) => {
  const commands = ['clear', ...Object.keys(allCommands)];
  return commands.indexOf(command.split(' ')[0].toLowerCase()) !== -1;
};
