import React from 'react'
import { startOfMonth } from 'date-fns'
import { isSelectable, mergeModifiers } from './utils'
import { useControllableState } from './useControllableState'
import { CalendarNavigation } from './CalendarNavigation'
import { CalendarWeekHeader } from './CalendarWeekHeader'
import { CalendarGrid } from './CalendarGrid'
import { CommonProps, DateChangeCallBack } from './types'

export interface CalendarProps extends CommonProps {
  month?: Date
  onMonthChange?: DateChangeCallBack<Date>
  onDayHover?: DateChangeCallBack
  onDayClick?: DateChangeCallBack<Date>
  touchDragEnabled?: boolean
}

export function Calendar({
  locale,
  month: receivedMonth,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onMonthChange,
  onDayHover,
  onDayClick,
  weekdayFormat,
  touchDragEnabled
}: CalendarProps): React.JSX.Element {
  const [month, setMonth] = useControllableState(
    receivedMonth,
    onMonthChange as (month: Date) => void,
    startOfMonth(new Date())
  )

  const modifiers = mergeModifiers(
    { disabled: date => !isSelectable(date, { minimumDate, maximumDate }) },
    receivedModifiers
  )

  return (
    <div>
      <CalendarNavigation
        locale={locale}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={setMonth}
      />

      <CalendarWeekHeader locale={locale} weekdayFormat={weekdayFormat} />

      <CalendarGrid
        locale={locale}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={setMonth}
        onDayHover={onDayHover}
        onDayClick={onDayClick}
        touchDragEnabled={touchDragEnabled}
      />
    </div>
  )
}
