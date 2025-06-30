import React from 'react'
import { isSameDay, startOfMonth } from 'date-fns'
import { isSelectable, mergeModifiers, setTime } from './utils'
import { useControllableState } from './useControllableState'
import { Calendar } from './Calendar'
import { CommonProps, DateChangeCallBack } from './types'

export interface DatePickerCalendarProps extends CommonProps {
  date?: Date | null
  month?: Date | null
  onDateChange?: DateChangeCallBack<Date>
  onMonthChange?: DateChangeCallBack<Date>
  touchDragEnabled?: boolean
}

export function DatePickerCalendar({
  locale,
  date: selectedDate = null,
  month: receivedMonth = null,
  onDateChange,
  onMonthChange,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled
}: DatePickerCalendarProps): React.JSX.Element {
  const isSelected = (date: Date) =>
    Boolean(
      selectedDate &&
        isSameDay(date, selectedDate) &&
        isSelectable(date, { minimumDate, maximumDate })
    )
  const modifiers = mergeModifiers(
    { selected: isSelected, disabled: isSelected },
    receivedModifiers
  )
  const [month, setMonth] = useControllableState(
    receivedMonth,
    onMonthChange,
    startOfMonth(selectedDate || new Date())
  )

  const handleDateChange = (date: Date) => {
    onDateChange?.(selectedDate ? setTime(date, selectedDate) : date)
  }

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={setMonth}
      onDayClick={handleDateChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekdayFormat={weekdayFormat}
      touchDragEnabled={touchDragEnabled}
    />
  )
}
