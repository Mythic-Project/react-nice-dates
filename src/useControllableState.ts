import { useState } from 'react'

export function useControllableState<T>(
  value: T,
  onChange: ((value: T) => void) | null | undefined
): [T, (value: T) => void]
export function useControllableState<T>(
  value: T | undefined,
  onChange: ((value: T) => void) | null | undefined,
  initialValue: T
): [T, (value: T) => void]
export function useControllableState<T>(
  value: T,
  onChange: ((value: T) => void) | null | undefined,
  initialValue?: T
): [T, (value: T) => void] {
  const [state, setState] = useState(initialValue)

  return onChange
    ? [initialValue != null && value == null ? initialValue : value, onChange]
    : [state as T, setState]
}
