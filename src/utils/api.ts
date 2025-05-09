import axios from 'axios';
import envConfig from './env-config';

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${envConfig.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  const { data } = await axios.get(envConfig.readmeUrl);
  return data;
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuote = async () => {
  const { data } = await axios.get('https://api.quotable.io/random');
  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};
