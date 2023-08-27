import axios from 'axios';

export const githubAPI = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export interface SearchParams {
  q: string;
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  order?: 'desc' | 'asc';
  per_page?: number;
  page?: number;
}

export interface SearchRepo {
  id: number;
  full_name: string;
}

export const getSearchList = async (params: SearchParams) => {
  const response = await githubAPI.get('/search/repositories', {
    params: params,
  });

  return response;
};

export const getIssueList = async (owner: string, repo: string) => {
  const response = await githubAPI.get(`/repos/${owner}/${repo}/issues`);

  return response;
};

export const getIssueDetail = async (
  owner: string,
  repo: string,
  issueNum: number,
) => {
  const response = await githubAPI.get(
    `/repos/${owner}/${repo}/issues/${issueNum}`,
  );

  return response;
};
