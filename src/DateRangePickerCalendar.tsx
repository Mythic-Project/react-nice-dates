import React, { useState } from 'react'
import { differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, startOfDay } from 'date-fns'
import { isRangeLengthValid, isSelectable, mergeModifiers, setTime } from './utils'
import { START_DATE, END_DATE } from './constants'
import { useControllableState } from './useControllableState'
import { Calendar } from './Calendar'
import { CommonProps, DateChangeCallBack, DateRangeFocus } from './types'

export interface DateRangePickerCalendarProps extends CommonProps {
  startDate?: Date
  endDate?: Date
  focus?: DateRangeFocus
  month?: Date
  minimumLength?: number
  maximumLength?: number
  onFocusChange?: (focus: DateRangeFocus | undefined) => void
  onStartDateChange?: DateChangeCallBack
  onEndDateChange?: DateChangeCallBack
  onMonthChange?: DateChangeCallBack
  touchDragEnabled?: boolean
}

const defaultListener = () => {}

export function DateRangePickerCalendar({
  locale,
  startDate,
  endDate,
  focus,
  month: receivedMonth,
  onStartDateChange = defaultListener,
  onEndDateChange = defaultListener,
  onFocusChange = defaultListener,
  onMonthChange,
  minimumDate,
  maximumDate,
  minimumLength = 0,
  maximumLength,
  modifiers: receivedModifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled
}: DateRangePickerCalendarProps): React.JSX.Element {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [month, setMonth] = useControllableState(
    receivedMonth,
    onMonthChange,
    startOfMonth(startDate || endDate || new Date())
  )

  const displayedStartDate =
    focus === START_DATE && !startDate && endDate && hoveredDate && !isSameDay(hoveredDate, endDate)
      ? hoveredDate
      : startOfDay(new Date())

  const displayedEndDate =
    focus === END_DATE && !endDate && startDate && hoveredDate && !isSameDay(hoveredDate, startDate)
      ? hoveredDate
      : startOfDay(new Date())

  const isStartDate = (date: Date) =>
    isSameDay(date, displayedStartDate) && isBefore(date, displayedEndDate)
  const isMiddleDate = (date: Date) =>
    isAfter(date, displayedStartDate) && isBefore(date, displayedEndDate)
  const isEndDate = (date: Date) =>
    isSameDay(date, displayedEndDate) && isAfter(date, displayedStartDate)

  const modifiers = mergeModifiers(
    {
      selected: date =>
        Boolean(
          isSelectable(date, { minimumDate, maximumDate }) &&
            (isStartDate(date) ||
              isMiddleDate(date) ||
              isEndDate(date) ||
              (startDate && isSameDay(date, startDate)) ||
              (endDate && isSameDay(date, endDate)))
        ),
      selectedStart: isStartDate,
      selectedMiddle: isMiddleDate,
      selectedEnd: isEndDate,
      disabled: date =>
        Boolean(
          (focus === START_DATE &&
            endDate &&
            ((differenceInDays(startOfDay(endDate), date) < minimumLength &&
              (!startDate || !isAfter(date, startOfDay(endDate)))) ||
              (!startDate &&
                maximumLength &&
                differenceInDays(startOfDay(endDate), date) > maximumLength))) ||
            (focus === END_DATE &&
              startDate &&
              ((differenceInDays(date, startOfDay(startDate)) < minimumLength &&
                (!endDate || !isBefore(date, startOfDay(startDate)))) ||
                (!endDate &&
                  maximumLength &&
                  differenceInDays(date, startOfDay(startDate)) > maximumLength)))
        )
    },
    receivedModifiers
  )

  const handleSelectDate = (date: Date) => {
    if (focus === START_DATE) {
      const invalidEndDate =
        endDate &&
        !isRangeLengthValid({ startDate: date, endDate }, { minimumLength, maximumLength })

      if (invalidEndDate) {
        onEndDateChange(null)
      }

      onStartDateChange(startDate ? setTime(date, startDate) : date)
      onFocusChange(END_DATE)
    } else if (focus === END_DATE) {
      const invalidStartDate =
        startDate &&
        !isRangeLengthValid({ startDate, endDate: date }, { minimumLength, maximumLength })

      if (invalidStartDate) {
        onStartDateChange(null)
      }

      onEndDateChange(endDate ? setTime(date, endDate) : date)
      onFocusChange(invalidStartDate || !startDate ? START_DATE : undefined)
    }
  }

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={setMonth}
      onDayHover={setHoveredDate}
      onDayClick={handleSelectDate}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekdayFormat={weekdayFormat}
      touchDragEnabled={touchDragEnabled}
    />
  )
}
