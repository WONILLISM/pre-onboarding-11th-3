import { useEffect, useState } from 'react';
import throttle from '../lib/utils/throttle';

interface Options {
  root?: Element | Document;
  rootMargin?: string;
  threshold: number | number[];
}

interface Props {
  fetchNextPage: () => void;
  options?: Options;
}
function useInfiniteScroll({ fetchNextPage, options }: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = throttle((entries) => {
    if (entries[0].isIntersecting) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCallback, options);

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [observerCallback, options, target]);

  return { setTarget };
}

export default useInfiniteScroll;
