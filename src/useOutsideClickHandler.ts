import { useRef, useEffect } from 'react'

export function useOutsideClickHandler<
  TRefA extends Element = Element,
  TRefB extends Element = Element,
  TRefC extends Element = Element
>(callback: () => void): [React.RefObject<TRefA>, React.RefObject<TRefB>, React.RefObject<TRefC>] {
  const refA = useRef<TRefA>(null)
  const refB = useRef<TRefB>(null)
  const refC = useRef<TRefC>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (
        (!refA.current || ('contains' in refA.current && !refA.current.contains(target))) &&
        (!refB.current || ('contains' in refB.current && !refB.current.contains(target))) &&
        (!refC.current || ('contains' in refC.current && !refC.current.contains(target)))
      ) {
        callbackRef.current()
      }
    }

    document.addEventListener('click', handleOutsideClick, { passive: true })

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  return [refA, refB, refC]
}
