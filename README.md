# 원티드 프리온보딩 인턴십 11차 3주차 과제
# 목차
1. [시작하기](#시작하기)  
  1.1. [사용 방법](#사용-방법)  
  1.2. [기술 스택](#기술-스택)  
3. [과제](#과제)  
4. [구현](#구현)  
  4.1. [구현 전략](#구현-전략)  

# 시작하기  

```
git clone https://github.com/WONILLISM/pre-onboarding-11th-3.git
```

`.env` 파일을 `root` 폴더에 생성합니다.

```.env
REACT_APP_GITHUB_ACCESS_TOKEN = <your github token>
REACT_APP_GITHUB_API_URL = "https://api.github.com"
```

`root` 폴더에서 실행합니다.

```
yarn install
yarn start
```




## 사용 방법  



## 기술 스택
<div>
<img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=flat&logo=visualstudiocode&logoColor=white" /> <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
</div>
<div>
<img src="https://img.shields.io/badge/Node.js-v18.16.1-339933?style=flat&logo=Node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" /> 
</div>  

# 과제
## 과제 task
- [x] Context API
- [x] 이슈 목록 페이지 구현
  - [x] 다섯번째 셀마다 광고 이미지 출력
  - [x] 무한 스크롤
- [x] 이슈 상세 페이지 구현
  - [x] 데이터 요청 중 로딩 표시

# 구현  
## 구현 전략  

### Context API

- Context API와 useReducer를 사용하여 상태 관리
- repository, issues, page, loading, error 상태 관리

```jsx
// GitHubContext.jsx

export const defaultGitHubState = {
  repository: null,
  page: 1,
  issues: [],
  loading: false,
  error: null,
};

export const gitHubReducer = (state, action) => {
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

export const GitHubStateContext = createContext(defaultGitHubState);

export const GitHubDispatchContext = createContext(undefined);

export const GitHubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gitHubReducer, defaultGitHubState);

  return (
    <GitHubStateContext.Provider value={state}>
      <GitHubDispatchContext.Provider value={dispatch}>
        {children}
      </GitHubDispatchContext.Provider>
    </GitHubStateContext.Provider>
  );
};
```

### useGitHubAPI

- API를 요청하는 service 코드를 useGitHubAPI로 묶어서 관리

```jsx
// useGitHubAPI

const fetchRepository = async () => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const repositoryResponse = await githubAPI.get(`/repos/${owner}/${repo}`);

    dispatch({
      type: 'FETCH_REPO_SUCCESS',
      payload: repositoryResponse.data,
    });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error });
  }
};

const fetchIssues = async () => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const issuesResponse = await githubAPI.get(
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
```
