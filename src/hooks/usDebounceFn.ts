import { useRef } from 'react'

type TUseDebounceCb = <T extends (...args: any[]) => any >(
  callback: T,
  delay?: number
) => (...args: Parameters<T>) => void

export const useDebounceFn: TUseDebounceCb = (callback, delay = 500) => {
  const timerIdRef = useRef<number>(0)

  return (...args) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current)
    }

    timerIdRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
