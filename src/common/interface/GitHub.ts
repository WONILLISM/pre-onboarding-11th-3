export interface Repository {
  id: number;
  full_name: string;
}

export interface Issue {
  id: number;
  comments: number;
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  body: string;
  created_at: string;
}

export interface GitHubState {
  repository: Repository | null;
  page: number;
  issues: Issue[];
  loading: boolean;
  error: any;
}

export type GitHubAction =
  | { type: 'LOADING' }
  | { type: 'FETCH_REPO_SUCCESS'; payload: Repository }
  | { type: 'FETCH_ISSUES_SUCCESS'; payload: Issue[] }
  | { type: 'FETCH_ERROR'; payload: any };
