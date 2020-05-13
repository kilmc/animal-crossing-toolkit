import { useState } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  localStorageKey: string
) {
  const load = () => {
    if (!window.localStorage.getItem(localStorageKey)) {
      save(initialState);
    }

    return JSON.parse(window.localStorage.getItem(localStorageKey) || "");
  };
  const save = (state: T) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  };

  const [state, setState] = useState<T>(load());
  const setStateAndSave = (newState: T) => {
    setState(newState);
    save(newState);
  };

  return [state, setStateAndSave] as [typeof state, typeof setStateAndSave];
}
