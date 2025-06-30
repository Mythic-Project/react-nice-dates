import { ChangeEvent, useEffect, useState } from 'react'
import { format, parse, isValid, Locale } from 'date-fns'
import { isSelectable } from './utils'

export interface UseDateInputProps {
  date?: Date | null
  format?: string
  locale: Locale
  minimumDate?: Date
  maximumDate?: Date
  onDateChange: (date: Date | null) => void
  validate?: (date: Date) => boolean
}

export interface UseDateInputReturn {
  onFocus: () => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  placeholder: string
  type: 'text'
  value: string
}

export function useDateInput({
  date: selectedDate,
  format: receivedFormatString,
  locale,
  minimumDate,
  maximumDate,
  onDateChange,
  validate
}: UseDateInputProps): UseDateInputReturn {
  const formatString =
    receivedFormatString || (locale.formatLong?.date({ width: 'short' }) as string)

  const formatDate = (date: Date) => format(date, formatString, { locale })
  const parseDate = (dateString: string) =>
    parse(dateString, formatString, selectedDate || new Date())
  const isValidAndSelectable = (date: Date | null | undefined): date is Date =>
    (isValid as (date: unknown) => date is Date)(date) &&
    isSelectable(date, { minimumDate, maximumDate }) &&
    (!validate || validate(date))

  const [value, setValue] = useState(() =>
    isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : ''
  )
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    setFocused(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const parsedDate = parseDate(newValue)
    setValue(newValue)

    if (isValidAndSelectable(parsedDate)) {
      onDateChange(parsedDate)
    }
  }

  const handleBlur = () => {
    if (value) {
      const parsedDate = parseDate(value)

      if (isValidAndSelectable(parsedDate)) {
        setValue(formatDate(parsedDate))
      } else if (isValidAndSelectable(selectedDate)) {
        setValue(formatDate(selectedDate))
      } else {
        setValue('')
      }
    } else if (selectedDate) {
      onDateChange(null)
    }

    setFocused(false)
  }

  useEffect(() => {
    if (!focused) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setValue(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '')
    }
  }, [selectedDate, focused])

  return {
    onFocus: handleFocus,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: formatString.toLowerCase(),
    type: 'text',
    value
  }
}
