import { useState, useEffect } from 'react';
import { githubAPI } from '../api/github';
import { AxiosResponse } from 'axios';

type QueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useGitHubQuery<T>(url: string): QueryResult<T> {
  const [result, setResult] = useState<QueryResult<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await githubAPI.get(url);
        if (isMounted) {
          setResult({
            data: response.data,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setResult({
            data: null,
            isLoading: false,
            error: 'An error occurred',
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, githubAPI]);

  return result;
}

export default useGitHubQuery;
