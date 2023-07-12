import axios from 'axios';

export const githubAPI = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
});
