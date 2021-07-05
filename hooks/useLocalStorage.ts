import { useCallback, useEffect, useState } from 'react';

interface Options {
  removeEmpty?: boolean;
}

const defaultOptions: Options = {
  removeEmpty: true,
};

export default function useLocalStorageState<T extends unknown>(
  key: string,
  defaultValue: T = null,
  { removeEmpty } = defaultOptions,
): [T, (value: T | null | undefined) => void] {
  const [current, setCurrent] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      //  Unavailable for SSR
      setCurrent((localStorage.getItem(key) as T | null) || defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = useCallback(
    (value: T | null | undefined) => {
      if (typeof window !== 'undefined') {
        if (value === null || value === undefined || (removeEmpty && !value)) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value as string);
        }
      }
      setCurrent(value);
    },
    [key, removeEmpty],
  );

  return [current, set];
}