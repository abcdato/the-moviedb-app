import { useEffect, useState } from 'react';

export function useDebounce(value, wait = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, wait]);

  return debounceValue;
}

export default useDebounce;
