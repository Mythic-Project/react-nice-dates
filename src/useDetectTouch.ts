import { useEffect, useState } from 'react'

export function useDetectTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const handleTouch = () => setIsTouch(true)

    document.addEventListener('touchstart', handleTouch, {
      passive: true,
      once: true
    })
    return () => document.removeEventListener('touchstart', handleTouch)
  }, [])

  return isTouch
}
