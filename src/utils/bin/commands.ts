// List of commands that do not require API calls

import * as bin from './index';

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
  // 检查环境变量是否存在
  if (!process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    return 'GitHub username not configured in environment variables.';
  }

  // 使用环境变量中的用户名
  window.open(`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories`);
  return 'Opening Github repositories...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  // 检查是否有足够的环境变量来显示个人信息
  if (!process.env.NEXT_PUBLIC_NAME) {
    return 'Personal information not configured in environment variables. Please set NEXT_PUBLIC_NAME.';
  }

  return `Hi, I am ${process.env.NEXT_PUBLIC_NAME}.
Welcome to my terminal website!

<b>About Me</b>
- Education: ${process.env.NEXT_PUBLIC_EDUCATION || 'Not configured'}
- Languages: ${process.env.NEXT_PUBLIC_LANGUAGES || 'Not configured'}
- Skills: ${process.env.NEXT_PUBLIC_SKILLS || 'Not configured'}

<b>Project Experience</b>
- ${process.env.NEXT_PUBLIC_PROJECTS || 'Not configured'}
- Personal Terminal Website: This interactive terminal-style website built with Next.js and LiveTerm

<b>Available Commands</b>
- 'help' - list all available commands
- 'resume' - view my detailed resume
- 'repo' - visit my GitHub repositories
- 'email' - contact me via email
- 'ai [question]' - chat with AI assistant`;
};

export const resume = async (args: string[]): Promise<string> => {
  // 检查是否有足够的环境变量来显示简历
  if (!process.env.NEXT_PUBLIC_NAME) {
    return 'Resume information not configured in environment variables. Please set NEXT_PUBLIC_NAME.';
  }

  return `
  <u><b>${process.env.NEXT_PUBLIC_NAME}'s Resume</b></u>

  <b>Education</b>
  - ${process.env.NEXT_PUBLIC_EDUCATION || 'Not configured'}

  <b>Skills</b>
  - <b>Backend Development</b>: ${process.env.NEXT_PUBLIC_SKILLS || 'Not configured'}
  - <b>Languages</b>: ${process.env.NEXT_PUBLIC_LANGUAGES || 'Not configured'}

  <b>Project Experience</b>
  - ${process.env.NEXT_PUBLIC_PROJECTS || 'Not configured'}
  - <b>Personal Terminal Website</b>: An interactive terminal-style personal website built with Next.js and LiveTerm
  - <b>Other Projects</b>: Please visit my GitHub repositories for more projects

  <b>Contact Information</b>
  - Email: ${process.env.NEXT_PUBLIC_EMAIL || 'Not configured'}
  - GitHub: ${process.env.NEXT_PUBLIC_GITHUB_USERNAME ? `github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}` : 'Not configured'}
  `;
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  // 检查是否有足够的环境变量来显示捐赠信息
  if (!process.env.NEXT_PUBLIC_PAYPAL_URL && !process.env.NEXT_PUBLIC_PATREON_URL) {
    return 'Donation information not configured in environment variables. Please set NEXT_PUBLIC_PAYPAL_URL or NEXT_PUBLIC_PATREON_URL.';
  }

  let donationLinks = 'thank you for your interest.\nhere are the ways you can support my work:';

  if (process.env.NEXT_PUBLIC_PAYPAL_URL) {
    donationLinks += `\n- <u><a class="text-light-blue dark:text-dark-blue underline" href="${process.env.NEXT_PUBLIC_PAYPAL_URL}" target="_blank">paypal</a></u>`;
  }

  if (process.env.NEXT_PUBLIC_PATREON_URL) {
    donationLinks += `\n- <u><a class="text-light-blue dark:text-dark-blue underline" href="${process.env.NEXT_PUBLIC_PATREON_URL}" target="_blank">patreon</a></u>`;
  }

  return donationLinks;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  // 检查环境变量是否存在
  if (!process.env.NEXT_PUBLIC_EMAIL) {
    return 'Email not configured in environment variables.';
  }

  // 使用环境变量中的邮箱
  window.open(`mailto:${process.env.NEXT_PUBLIC_EMAIL}`);
  return `Opening mailto:${process.env.NEXT_PUBLIC_EMAIL}...`;
};

export const github = async (args: string[]): Promise<string> => {
  // 检查环境变量是否存在
  if (!process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    return 'GitHub username not configured in environment variables.';
  }

  // 使用环境变量中的用户名
  window.open(`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/`);
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
  return `${process.env.NEXT_PUBLIC_PS1_USERNAME || 'visitor'}`;
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


export const twitter = async (args: string[]): Promise<string> => {
  // 检查环境变量是否存在
  if (!process.env.NEXT_PUBLIC_TWITTER_URL) {
    return 'Twitter profile not configured in environment variables.';
  }

  // 使用环境变量中的 URL
  window.open(process.env.NEXT_PUBLIC_TWITTER_URL);
  return 'Opening Twitter...';
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


Welcome to ${process.env.NEXT_PUBLIC_NAME || 'User'}'s terminal website!

Type 'help' to see the list of available commands.
Type 'about' to learn more about me.
`;
};
