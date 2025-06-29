import { MouseEvent, TouchEvent } from 'react'
import classNames from 'classnames'
import { addMonths, getYear, startOfMonth, subMonths, format, isSameMonth, Locale } from 'date-fns'

export interface CalendarNavigationProps {
  locale: Locale
  month: Date
  minimumDate?: Date
  maximumDate?: Date
  onMonthChange: (month: Date) => void
}

export function CalendarNavigation({
  locale,
  month,
  minimumDate,
  maximumDate,
  onMonthChange
}: CalendarNavigationProps): React.JSX.Element {
  const handlePrevious = (event: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) => {
    onMonthChange(startOfMonth(subMonths(month, 1)))
    event.preventDefault()
  }

  const handleNext = (event: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) => {
    onMonthChange(startOfMonth(addMonths(month, 1)))
    event.preventDefault()
  }

  return (
    <div className='nice-dates-navigation'>
      <a
        className={classNames('nice-dates-navigation_previous', {
          '-disabled': minimumDate != null && isSameMonth(month, minimumDate)
        })}
        onClick={handlePrevious}
        onTouchEnd={handlePrevious}
      />

      <span className='nice-dates-navigation_current'>
        {format(month, getYear(month) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy', { locale })}
      </span>

      <a
        className={classNames('nice-dates-navigation_next', {
          '-disabled': maximumDate != null && isSameMonth(month, maximumDate)
        })}
        onClick={handleNext}
        onTouchEnd={handleNext}
      />
    </div>
  )
}
