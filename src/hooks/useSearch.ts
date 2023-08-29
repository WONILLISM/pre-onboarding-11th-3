import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from './useDebounce';

interface UseSearchArgs<T> {
  initialParams?: T;
  options?: {
    debouce: boolean;
  };
}

const useSearch = <T>({ initialParams, options }: UseSearchArgs<T>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchParams, setSearchParams] = useState<T>(
    (initialParams || {}) as T,
  );

  const { isDebouncing, debouncedValue } = useDebounce({ value: searchInput });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFocus = (value: boolean) => {
    setIsFocus(value);
  };

  const handleSearchParams = (params: T) => {
    setSearchParams((prev) => {
      return { ...prev, params };
    });
  };

  useEffect(() => {
    if (options?.debouce) {
      if (debouncedValue !== '') {
        setSearchParams((prev) => {
          return { ...prev, q: debouncedValue };
        });
      }
    }
  }, [options?.debouce, debouncedValue]);

  return {
    isFocus,
    isDebouncing,
    searchInput,
    searchParams,
    handleFocus,
    handleSearchParams,
    handleSearchInputChange,
  };
};

export default useSearch;
