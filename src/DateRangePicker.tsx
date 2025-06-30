import React, { useState } from 'react'
import { isRangeLengthValid } from './utils'
import { START_DATE, END_DATE } from './constants'
import { useDateInput } from './useDateInput'
import { useOutsideClickHandler } from './useOutsideClickHandler'
import { useDetectTouch } from './useDetectTouch'
import { DateRangePickerCalendar } from './DateRangePickerCalendar'
import { Popover } from './Popover'
import { CommonProps, DateChangeCallBack, DateRangeFocus, InputProps } from './types'

export interface DateRangePickerChildrenProps {
  startDateInputProps: InputProps
  endDateInputProps: InputProps
  focus?: DateRangeFocus | null
}

export interface DateRangePickerProps extends CommonProps {
  children: (props: DateRangePickerChildrenProps) => React.ReactNode
  startDate?: Date | null
  endDate?: Date | null
  minimumLength?: number
  maximumLength?: number
  onStartDateChange?: DateChangeCallBack
  onEndDateChange?: DateChangeCallBack
  format?: string
  touchDragEnabled?: boolean
}

const defaultListener = () => {}

export function DateRangePicker({
  children,
  locale,
  startDate = null,
  endDate = null,
  onStartDateChange = defaultListener,
  onEndDateChange = defaultListener,
  format,
  minimumDate,
  maximumDate,
  minimumLength = 0,
  maximumLength,
  modifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled
}: DateRangePickerProps): React.JSX.Element {
  const [focus, setFocus] = useState<DateRangeFocus | null>(null)
  const [month, setMonth] = useState<Date | null>(() => startDate || endDate || new Date())
  const isTouch = useDetectTouch()

  const [startDateInputRef, endDateInputRef, popoverRef] = useOutsideClickHandler<
    HTMLInputElement,
    HTMLInputElement,
    HTMLDivElement
  >(() => setFocus(null))

  const startDateInputProps = useDateInput({
    date: startDate,
    format,
    locale,
    maximumDate,
    minimumDate,
    onDateChange: date => {
      onStartDateChange(date)
      if (date) {
        setMonth(date)
      }
    },
    validate: date =>
      !endDate || isRangeLengthValid({ startDate: date, endDate }, { minimumLength, maximumLength })
  })

  const endDateInputProps = useDateInput({
    date: endDate,
    format,
    locale,
    maximumDate,
    minimumDate,
    onDateChange: date => {
      onEndDateChange(date)
      if (date) {
        setMonth(date)
      }
    },
    validate: date =>
      !startDate ||
      isRangeLengthValid({ startDate, endDate: date }, { minimumLength, maximumLength })
  })

  return (
    <div className='nice-dates'>
      {children({
        startDateInputProps: {
          ...startDateInputProps,
          onFocus: () => {
            startDateInputProps.onFocus()
            setFocus(START_DATE)

            if (isTouch && startDateInputRef.current) {
              startDateInputRef.current.blur()
            }
          },
          ref: startDateInputRef,
          readOnly: isTouch
        },
        endDateInputProps: {
          ...endDateInputProps,
          onFocus: () => {
            endDateInputProps.onFocus()
            setFocus(END_DATE)

            if (isTouch && endDateInputRef.current) {
              endDateInputRef.current.blur()
            }
          },
          ref: endDateInputRef,
          readOnly: isTouch
        },
        focus
      })}

      <Popover open={!!focus} ref={popoverRef}>
        <DateRangePickerCalendar
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          month={month}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onFocusChange={setFocus}
          onMonthChange={setMonth}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          minimumLength={minimumLength}
          maximumLength={maximumLength}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          weekdayFormat={weekdayFormat}
          touchDragEnabled={touchDragEnabled}
        />
      </Popover>
    </div>
  )
}
