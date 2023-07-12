/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GITHUB_API_URL: string;
    REACT_APP_GITHUB_ACCESS_TOKEN: string;
  }
}
