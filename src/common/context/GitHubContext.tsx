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
  issues: [],
  loading: true,
  error: null,
};

export const gitHubReducer: Reducer<GitHubState, GitHubAction> = (
  state: GitHubState,
  action: GitHubAction,
) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
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
  );
};
