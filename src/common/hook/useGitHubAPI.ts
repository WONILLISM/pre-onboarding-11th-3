import { Dispatch, useContext } from 'react';
import { githubAPI } from '../api/github';
import { GitHubAction, Issue, Repository } from '../interface/GitHub';
import {
  GitHubDispatchContext,
  GitHubStateContext,
} from '../context/GitHubContext';

const useGithubAPI = (owner: string, repo: string) => {
  const state = useContext(GitHubStateContext);
  const dispatch = useContext(GitHubDispatchContext);

  if (dispatch === undefined) throw new Error('error');

  const fetchRepository = async (): Promise<void> => {
    try {
      const repositoryResponse = await githubAPI.get<Repository>(
        `/repos/${owner}/${repo}`,
      );

      dispatch({
        type: 'FETCH_REPO_SUCCESS',
        payload: repositoryResponse.data,
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  };

  const fetchIssues = async (): Promise<void> => {
    try {
      const issuesResponse = await githubAPI.get<Issue[]>(
        `/repos/${owner}/${repo}/issues?sort=comments&page=${state.page}&per_page=10`,
      );

      dispatch({
        type: 'FETCH_ISSUES_SUCCESS',
        payload: issuesResponse.data,
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  };

  return { fetchRepository, fetchIssues };
};

export default useGithubAPI;
