import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {

  const [storedValue, setStoredValue] = useState(JSON.parse(window.localStorage.getItem("carts")) ? JSON.parse(window.localStorage.getItem("carts")) :[]);
  const setValue = (value) => {
      window.localStorage.setItem(key,JSON.stringify(value))
      setStoredValue(value);  
  }

  return [storedValue, setValue];
}