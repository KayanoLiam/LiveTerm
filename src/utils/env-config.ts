// 从环境变量读取配置，如果不存在则使用默认值或 config.json 中的值
import defaultConfig from '../../config.json';

// 个人信息
export const name = process.env.NEXT_PUBLIC_NAME || defaultConfig.name;
export const title = process.env.NEXT_PUBLIC_TITLE || defaultConfig.title;
export const email = process.env.NEXT_PUBLIC_EMAIL || defaultConfig.email;
export const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || defaultConfig.social?.github;
export const ps1Username = process.env.NEXT_PUBLIC_PS1_USERNAME || defaultConfig.ps1_username;
export const ps1Hostname = process.env.NEXT_PUBLIC_PS1_HOSTNAME || defaultConfig.ps1_hostname;
export const readmeUrl = process.env.NEXT_PUBLIC_README_URL || defaultConfig.readmeUrl;
export const repoUrl = process.env.NEXT_PUBLIC_REPO_URL || defaultConfig.repo;
export const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || defaultConfig.resume_url;

// 捐赠链接
export const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_URL || defaultConfig.donate_urls?.paypal;
export const patreonUrl = process.env.NEXT_PUBLIC_PATREON_URL || defaultConfig.donate_urls?.patreon;

// 简历信息
export const education = process.env.NEXT_PUBLIC_EDUCATION || '';
export const languages = process.env.NEXT_PUBLIC_LANGUAGES || '';
export const skills = process.env.NEXT_PUBLIC_SKILLS || '';
export const projects = process.env.NEXT_PUBLIC_PROJECTS || '';

// 创建一个完整的配置对象，用于兼容现有代码
const envConfig = {
  name,
  title,
  email,
  social: {
    github: githubUsername
  },
  ps1_username: ps1Username,
  ps1_hostname: ps1Hostname,
  readmeUrl,
  repo: repoUrl,
  resume_url: resumeUrl,
  donate_urls: {
    paypal: paypalUrl,
    patreon: patreonUrl
  },
  // 保留原始配置中的其他字段
  ascii: defaultConfig.ascii,
  colors: defaultConfig.colors
};

export default envConfig;
