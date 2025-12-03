// useInfiniteScroll.ts
import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  threshold = 1.0,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const observe = useCallback(() => {
    if (loading || !hasMore || !sentinelRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        threshold,
      }
    );

    observerRef.current.observe(sentinelRef.current);
  }, [hasMore, loading, onLoadMore, threshold]);

  useEffect(() => {
    observe();
    return () => {
      observerRef.current?.disconnect();
    };
  }, [observe]);

  return sentinelRef;
}
