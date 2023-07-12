import { githubAPI } from '.';

export const getRepository = async (path: string) => {
  const response = await githubAPI.get('/repos' + path);

  return response.data;
};

export const getIssues = async (path: string, queries?: string) => {
  const response = await githubAPI.get(`/repos${path}/issues?${queries}`);

  return response.data;
};

export const getIssue = async (id: number, path: string, queries?: string) => {
  const response = await githubAPI.get(`/repos${path}/issues/${id}?${queries}`);

  return response.data;
};
