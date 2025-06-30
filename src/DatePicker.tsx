import React, { useState } from 'react'
import { useDateInput } from './useDateInput'
import { useDetectTouch } from './useDetectTouch'
import { useOutsideClickHandler } from './useOutsideClickHandler'
import { DatePickerCalendar } from './DatePickerCalendar'
import { Popover } from './Popover'
import { CommonProps, DateChangeCallBack, InputProps } from './types'

export interface DatePickerChildrenProps {
  inputProps: InputProps
  focused: boolean
}

export interface DatePickerProps extends CommonProps {
  children: (props: DatePickerChildrenProps) => React.ReactNode
  date?: Date | null
  onDateChange?: DateChangeCallBack
  format?: string
  touchDragEnabled?: boolean
}

const defaultOnDateChange = () => {}

export function DatePicker({
  children,
  locale,
  date = null,
  onDateChange = defaultOnDateChange,
  format,
  minimumDate,
  maximumDate,
  modifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled
}: DatePickerProps): React.JSX.Element {
  const [month, setMonth] = useState(() => date || new Date())
  const [focused, setFocused] = useState(false)
  const isTouch = useDetectTouch()

  const [inputRef, popoverRef] = useOutsideClickHandler<HTMLInputElement, HTMLDivElement>(() => {
    if (focused) {
      setFocused(false)
    }
  })

  const inputProps = useDateInput({
    date,
    format,
    locale,
    minimumDate,
    maximumDate,
    onDateChange: date => {
      onDateChange(date)
      if (date) {
        setMonth(date)
      }
    }
  })

  const handleDateChange = (date: Date) => {
    onDateChange(date)
    setFocused(false)
  }

  return (
    <div className='nice-dates'>
      {children({
        inputProps: {
          ...inputProps,
          ref: inputRef,
          onFocus: () => {
            inputProps.onFocus()
            setFocused(true)

            if (isTouch && inputRef.current) {
              inputRef.current.blur()
            }
          },
          readOnly: isTouch
        },
        focused
      })}

      <Popover open={focused} ref={popoverRef}>
        <DatePickerCalendar
          locale={locale}
          date={date}
          month={month}
          onDateChange={handleDateChange}
          onMonthChange={setMonth}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          weekdayFormat={weekdayFormat}
          touchDragEnabled={touchDragEnabled}
        />
      </Popover>
    </div>
  )
}
