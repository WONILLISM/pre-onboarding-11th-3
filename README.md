# 원티드 프리온보딩 인턴십 11차 3주차 과제

# 목차

1. [시작하기](#시작하기)  
   1.1. [사용 방법](#사용-방법)  
   1.2. [기술 스택](#기술-스택)
2. [과제](#과제)
3. [구현](#구현)  
   4.1. [version2](#version2)  
   4.2. [version1](#version1)

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

# 폴더 구조

```
├── public
└── src
  ├── components
  │   ├── app
  │   │   └── issues
  │   ├── common
  │   └── layout
  ├── hooks
  ├── lib
  │   ├── api
  │   │   └── github
  │   └── utils
  ├── pages
  └── types

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

## version2

**변경 사항**

- `useGitHubAPI` 삭제 & `GitHubContext` 삭제
  - 서비스코드를 hook으로 관심사 분리해줘야겠다는 생각과, GitHub 관련 데이터를 Context로 관리하기 위함이었는데, 서비스 코드는 서비스 코드대로, GitHub 관련 데이터는 따로 관심사를 분리하는게 맞다고 판단
  - `react-query` 연습을 위해 api 요청 부분은 `react-query`로 대체
  - 전역 상태 혹은 `Context`가 필요한경우 `redux`로 사용해볼 예정
- 레포지토리 검색 기능 추가
  - 기존에는 `facebook/react`의 이슈리스트만 불러왔어서, 좀 더 범용성 있는 프로젝트를 만들고자함.
  - `useSearch` hook 추가
- 추천 검색어 기능 추가
  - 레포지토리 검색시 검색어에 따른 레포지토리 추천 결과를 보여주기 위해 기능 추가
- `useDebounce` Hook 추가
  - 추천 검색어 기능 구현 시, 검색어 입력마다의 빈번한 API 호출을 막기 위함
- `throttle` 함수 추가
  - 무한스크롤 사용 시, 빈번한 이벤트 발생을 막기 위함
- 검색창 외부 클릭시 포커싱 아웃 기능 추가

## version1

<details>
    <summary>
    펼치기 / 접기
    </summary>

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

### 무한 스크롤

- useRef를 사용하여 target ref를 생성하여 페이지의 끝 부분을 가리키는 DOM 요소에 연결시킴
- root, rootMargin, threshold 옵션을 사용하여 observer의 동작을 조절
  - IntersectionObserver 콜백 함수는 관찰 요소들에 대한 정보를 IntersectionObserverEntry 객체의 배열인 entries 를 인자로 받음
  - 이 객체중에 isIntersecting 속성은 관찰 대상 요소가 보이는지 여부를 판단
  - useInfiniteScroll hook 안에서 상태로 관리하여, target ref를 관찰할 때 setTarget을 실행

```js
import { useEffect, useState } from 'react';
import throttle from '../utils/throttle';

interface Props {
  fetchNextPage: () => void;
  threshold?: number;
}
function useInfiniteScroll({ fetchNextPage, threshold }: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = throttle((entries) => {
    if (entries[0].isIntersecting) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCallback, {
      // root: null,
      rootMargin: '100px',
      threshold,
    });

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
}

export default useInfiniteScroll;
```

</details>
