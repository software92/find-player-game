import { useEffect, useState } from 'react'

function useDebouncedValue<T>(value: T, ms: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(prev => (Object.is(prev, value) ? prev : value))
    }, ms)

    return () => clearTimeout(timer)
  }, [value, ms])

  return debouncedValue
}

export default useDebouncedValue
