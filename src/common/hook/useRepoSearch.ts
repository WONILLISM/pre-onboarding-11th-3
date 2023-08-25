import { ChangeEvent, useEffect, useState } from 'react';
import { SearchParams, SearchRepo, getSearchList } from '../api/github';

const useRepoSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    per_page: 5,
  });
  const [searchList, setSearchList] = useState<SearchRepo[]>([]);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const search = async () => {
    setIsLoading(true);
    try {
      const { data } = await getSearchList(searchParams);
      setSearchList(data.items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocus = (value: boolean) => {
    setIsFocus(value);
  };

  // debounce
  useEffect(() => {
    if (searchInput === '') {
      setSearchList([]);
      setSearchParams({ q: '', per_page: 5 });
      return;
    }
    const timer = setTimeout(() => {
      setSearchParams({ ...searchParams, q: searchInput });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, setSearchParams]);

  useEffect(() => {
    if (searchParams.q === '') return;

    search();
  }, [searchParams.q]);

  return {
    isLoading,
    isFocus,
    handleFocus,
    searchInput,
    searchList,
    inputChange,
  };
};

export default useRepoSearch;
