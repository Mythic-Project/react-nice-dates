import React from 'react'
import { eachDayOfInterval, isSameMonth, lightFormat, startOfMonth, Locale } from 'date-fns'
import classNames from 'classnames'
import { useGrid } from './useGrid'
import { ORIGIN_BOTTOM, ORIGIN_TOP } from './constants'
import { CalendarDay } from './CalendarDay'
import { ModifierMatcher, Modifiers, ModifiersClassNames } from './types'

function computeModifiers<TKey extends string>(
  modifiers: Record<TKey, ModifierMatcher>,
  date: Date
): Record<TKey, boolean> {
  return Object.fromEntries(
    Object.entries(modifiers as Record<string, ModifierMatcher>).map(([key, modifierMatcher]) => [
      key,
      modifierMatcher(date)
    ])
  ) as Record<TKey, boolean>
}

export interface CalendarGridProps {
  locale: Locale
  month: Date
  modifiers?: Modifiers
  modifiersClassNames?: ModifiersClassNames
  onMonthChange: (month: Date) => void
  onDayHover?: (date: Date | null) => void
  onDayClick?: (date: Date) => void
  transitionDuration?: number
  touchDragEnabled?: boolean
}

const defaultModifiers: Modifiers = {}

export function CalendarGrid({
  locale,
  month,
  modifiers = defaultModifiers,
  modifiersClassNames,
  onMonthChange,
  onDayHover,
  onDayClick,
  transitionDuration = 500,
  touchDragEnabled = true
}: CalendarGridProps): React.JSX.Element {
  const {
    startDate,
    endDate,
    cellHeight,
    containerElementRef,
    isWide,
    offset,
    origin,
    transition
  } = useGrid<HTMLDivElement>({
    locale,
    month: startOfMonth(month),
    onMonthChange,
    transitionDuration,
    touchDragEnabled
  })

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(date => {
    return (
      <CalendarDay
        date={date}
        height={cellHeight}
        key={lightFormat(date, 'yyyy-MM-dd')}
        locale={locale}
        modifiers={{
          ...computeModifiers(modifiers, date),
          outside: !isSameMonth(date, month),
          wide: isWide
        }}
        modifiersClassNames={modifiersClassNames}
        onHover={onDayHover}
        onClick={onDayClick}
      />
    )
  })

  return (
    <div className='nice-dates-grid' style={{ height: cellHeight * 6 }}>
      <div
        className={classNames('nice-dates-grid_container', {
          '-moving': offset,
          '-origin-bottom': origin === ORIGIN_BOTTOM,
          '-origin-top': origin === ORIGIN_TOP,
          '-transition': transition
        })}
        ref={containerElementRef}
        style={{
          transform: `translate3d(0, ${String(offset)}px, 0)`,
          transitionDuration: `${String(transitionDuration)}ms`
        }}
      >
        {days}
      </div>
    </div>
  )
}
