import React, { MouseEvent, TouchEvent } from 'react'
import { getDate, format, isToday } from 'date-fns'
import classNames from 'classnames'

const defaultModifiersClassNames = {
  today: '-today',
  outside: '-outside',
  wide: '-wide',
  disabled: '-disabled',
  selected: '-selected',
  selectedStart: '-selected-start',
  selectedMiddle: '-selected-middle',
  selectedEnd: '-selected-end'
}

export interface CalendarDayProps {
  date: Date
  height: number
  locale: object
  modifiers?: Record<string, boolean>
  modifiersClassNames?: Record<string, string>
  onClick?: (date: Date) => void
  onHover?: (date: Date | null) => void
}

const defaultModifiers: Record<string, boolean> = {}
const defaultEventHandler = () => {}

export function CalendarDay({
  date,
  height,
  locale,
  modifiers: receivedModifiers = defaultModifiers,
  modifiersClassNames: receivedModifiersClassNames,
  onClick = defaultEventHandler,
  onHover = defaultEventHandler
}: CalendarDayProps): React.JSX.Element {
  const dayOfMonth = getDate(date)
  const dayClassNames: Record<string, boolean> = {}
  const modifiers: Record<string, boolean> = {
    today: isToday(date),
    ...receivedModifiers
  }
  const modifiersClassNames: Record<string, string> = {
    ...defaultModifiersClassNames,
    ...receivedModifiersClassNames
  }

  Object.keys(modifiers).forEach(name => {
    dayClassNames[modifiersClassNames[name]] = modifiers[name]
  })

  const handleClick = (event: MouseEvent | TouchEvent) => {
    onClick(date)
    event.preventDefault()
  }

  const handleMouseEnter = () => {
    onHover(date)
  }

  const handleMouseLeave = () => {
    onHover(null)
  }

  return (
    <span
      className={classNames('nice-dates-day', dayClassNames)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleClick}
      style={{ height }}
    >
      {dayOfMonth === 1 && (
        <span className='nice-dates-day_month'>{format(date, 'LLL', { locale })}</span>
      )}
      <span className='nice-dates-day_date'>{dayOfMonth}</span>
    </span>
  )
}
