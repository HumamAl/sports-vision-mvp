const PREFIX = "sportsvision_";

export function getStorageKey(key: string): string {
  return `${PREFIX}${key}`;
}

export function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(getStorageKey(key));
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch {
    console.warn("Failed to save to localStorage");
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getStorageKey(key));
}
