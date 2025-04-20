// List of commands that do not require API calls

import * as bin from './index';
import envConfig from '../env-config';
import { education, languages, skills, projects } from '../env-config';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }
  return `Available commands:
\n${c}\n
<b>Navigation</b>
[tab]: trigger completion
[ctrl+l]/clear: clear terminal

<b>Key Commands</b>
'about' - learn more about me
'resume' - view my detailed resume
'repo' - visit my GitHub repositories
'email' - contact me via email

<b>AI Chat</b>
'ai [question]' - chat with AI assistant
'ai-clear' - clear AI chat history
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${envConfig.social.github}?tab=repositories`);
  return 'Opening Github repositories...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${envConfig.name}.
Welcome to my terminal website!

<b>About Me</b>
- Education: ${education}
- Languages: ${languages}
- Skills: ${skills}

<b>Project Experience</b>
- ${projects}
- Personal Terminal Website: This interactive terminal-style website built with Next.js and LiveTerm

<b>Available Commands</b>
- 'help' - list all available commands
- 'resume' - view my detailed resume
- 'repo' - visit my GitHub repositories
- 'email' - contact me via email
- 'ai [question]' - chat with AI assistant`;
};

export const resume = async (args: string[]): Promise<string> => {
  return `
  <u><b>KayanoHaruka's Resume</b></u>

  <b>Education</b>
  - ${education}
  - Japanese Language Proficiency: JLPT N2 Certificate

  <b>Skills</b>
  - <b>Backend Development</b>: Java, SpringBoot, Python, Rust, Actix-web, Kotlin
  - <b>Frontend Development</b>: JavaScript, Vue
  - <b>Tools</b>: Git, VS Code, IntelliJ IDEA
  - <b>Languages</b>: ${languages}

  <b>Project Experience</b>
  - <b>Hospital Management System</b>: ${projects}
  - <b>Personal Terminal Website</b>: An interactive terminal-style personal website built with Next.js and LiveTerm
  - <b>Other Projects</b>: Please visit my GitHub repositories for more projects

  <b>Contact Information</b>
  - Email: ${envConfig.email}
  - GitHub: github.com/${envConfig.social.github}
  `;
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest.
here are the ways you can support my work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${envConfig.donate_urls.paypal}" target="_blank">paypal</a></u>
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${envConfig.donate_urls.patreon}" target="_blank">patreon</a></u>
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${envConfig.email}`);
  return `Opening mailto:${envConfig.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${envConfig.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  return 'Sorry, I currently do not have a LinkedIn account.';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${envConfig.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
██╗  ██╗ █████╗ ██╗   ██╗ █████╗ ███╗   ██╗ ██████╗    ██╗  ██╗ █████╗ ██████╗ ██╗   ██╗██╗  ██╗ █████╗
██║ ██╔╝██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║██╔═══██╗   ██║  ██║██╔══██╗██╔══██╗██║   ██║██║ ██╔╝██╔══██╗
█████╔╝ ███████║ ╚████╔╝ ███████║██╔██╗ ██║██║   ██║   ███████║███████║██████╔╝██║   ██║█████╔╝ ███████║
██╔═██╗ ██╔══██║  ╚██╔╝  ██╔══██║██║╚██╗██║██║   ██║   ██╔══██║██╔══██║██╔══██╗██║   ██║██╔═██╗ ██╔══██║
██║  ██╗██║  ██║   ██║   ██║  ██║██║ ╚████║╚██████╔╝██╗██║  ██║██║  ██║██║  ██║╚██████╔╝██║  ██╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝


Welcome to ${envConfig.name}'s terminal website!

Type 'help' to see the list of available commands.
Type 'about' to learn more about me.
`;
};
