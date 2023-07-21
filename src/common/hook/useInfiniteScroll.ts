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
