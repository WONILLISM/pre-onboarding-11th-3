import { useEffect, useState } from 'react';

interface UseDebounceArg {
  value: string;
  delay?: number;
}

const useDebounce = ({ value, delay = 500 }: UseDebounceArg) => {
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timer);
      setDebouncedValue('');
    };
  }, [delay, value, setDebouncedValue, setIsDebouncing]);

  return {
    isDebouncing,
    debouncedValue,
  };
};

export default useDebounce;
