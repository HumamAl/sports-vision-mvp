"use client";

import { useState, useEffect, useCallback } from "react";
import { getItem, setItem } from "@/lib/storage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const value = getItem<T>(key, initialValue);
    setStoredValue(value);
    setHydrated(true);
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        setItem(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [storedValue, setValue, hydrated];
}
