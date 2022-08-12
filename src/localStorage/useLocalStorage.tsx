import { useState, useEffect } from "react"

//T is any type(CarItem), initialValue is either T type 
//or functiton return T type
export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    //if locastorage is not empty
    if (jsonValue !== null) return JSON.parse(jsonValue);

    //if locastorage is  empty
    if (typeof initialValue === "function") {
      //return function T type
      return (initialValue as () => T)()
    } else {
      return initialValue
    }

  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))

  }, [key, value])//redender based on key and value changes
  return [value, setValue] as [typeof value, typeof setValue]
}
