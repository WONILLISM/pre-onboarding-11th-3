import React, { ReactNode, createContext } from 'react';
import useGithubAPI from '../hook/useGitHubAPI';

export interface Repository {
  id: number;
  name: string;
}

export interface Issue {
  id: number;
  title: string;
}

export interface GitHubState {
  repository: Repository | null;
  issues: Issue[];
  loading: boolean;
  error: any;
}

export type GitHubAction =
  | { type: 'FETCH_REPO_SUCCESS'; payload: Repository }
  | { type: 'FETCH_ISSUES_SUCCESS'; payload: Issue[] }
  | { type: 'FETCH_ERROR'; payload: any };

export const defualtGitHubState: GitHubState = {
  repository: null,
  issues: [],
  loading: true,
  error: null,
};

export const GitHubContext = createContext<GitHubState>(defualtGitHubState);

export const GitHubProvider = ({ children }: { children: ReactNode }) => {
  const githubAPI = useGithubAPI('facebook', 'react');
  return (
    <GitHubContext.Provider value={githubAPI}>
      {children}
    </GitHubContext.Provider>
  );
};
