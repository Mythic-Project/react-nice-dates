import React, { useMemo } from 'react'
import { eachDayOfInterval, endOfWeek, startOfWeek, format, Locale, startOfDay } from 'date-fns'

export interface CalendarWeekHeaderProps {
  locale: Locale
  weekdayFormat?: string
}

export function CalendarWeekHeader({
  locale,
  weekdayFormat = 'eee'
}: CalendarWeekHeaderProps): React.JSX.Element {
  const today = startOfDay(new Date()).getDate()

  const weekDays = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(today, { locale }),
        end: endOfWeek(today, { locale })
      }).map(date => format(date, weekdayFormat, { locale })),
    [today, locale, weekdayFormat]
  )

  return (
    <div className='nice-dates-week-header'>
      {weekDays.map(day => (
        <span key={day} className='nice-dates-week-header_day'>
          {day}
        </span>
      ))}
    </div>
  )
}
