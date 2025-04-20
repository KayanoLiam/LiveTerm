import * as bin from './bin';
import commandMapping from './bin/command_mapping';

export const commandExists = (command: string) => {
  const commands = ['clear', ...Object.keys(bin), ...Object.keys(commandMapping)];
  return commands.indexOf(command.split(' ')[0].toLowerCase()) !== -1;
};
