<<<<<<< HEAD
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
=======
import { Dispatch, ReactNode, Reducer, createContext, useReducer } from 'react';
import { GitHubAction, GitHubState } from '../interface/GitHub';

export interface GitHubContextValues {
  state: GitHubState;
  fetchRepository: () => void;
  fetchIssues: () => void;
}

export const defaultGitHubState: GitHubState = {
  repository: null,
  page: 1,
>>>>>>> 7-feat-add-github-context
  issues: [],
  loading: true,
  error: null,
};

<<<<<<< HEAD
export const GitHubContext = createContext<GitHubState>(defualtGitHubState);

export const GitHubProvider = ({ children }: { children: ReactNode }) => {
  const githubAPI = useGithubAPI('facebook', 'react');
  return (
    <GitHubContext.Provider value={githubAPI}>
      {children}
    </GitHubContext.Provider>
=======
export const gitHubReducer: Reducer<GitHubState, GitHubAction> = (
  state: GitHubState,
  action: GitHubAction,
) => {
  switch (action.type) {
    case 'FETCH_REPO_SUCCESS':
      return {
        ...state,
        repository: action.payload,
        loading: false,
      };
    case 'FETCH_ISSUES_SUCCESS':
      return {
        ...state,
        issues: [...state.issues, ...action.payload],
        loading: false,
        page: state.page + 1,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type.`);
  }
};

export const GitHubStateContext =
  createContext<GitHubState>(defaultGitHubState);

export const GitHubDispatchContext = createContext<
  Dispatch<GitHubAction> | undefined
>(undefined);

export const GitHubProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gitHubReducer, defaultGitHubState);

  return (
    <GitHubStateContext.Provider value={state}>
      <GitHubDispatchContext.Provider value={dispatch}>
        {children}
      </GitHubDispatchContext.Provider>
    </GitHubStateContext.Provider>
>>>>>>> 7-feat-add-github-context
  );
};
