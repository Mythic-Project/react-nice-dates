import { useRef, useLayoutEffect, useEffect, useReducer } from 'react'
import {
  addMonths,
  addWeeks,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameMonth,
  Locale,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns'
import { ORIGIN_BOTTOM, ORIGIN_TOP } from './constants'

const rowsBetweenDates = (startDate: Date, endDate: Date, locale?: Locale) =>
  differenceInCalendarWeeks(endDate, startDate, { locale }) + 1
const rowsInMonth = (date: Date, locale?: Locale) =>
  rowsBetweenDates(startOfMonth(date), endOfMonth(date), locale)
const getStartDate = (date: Date, locale?: Locale) => startOfWeek(startOfMonth(date), { locale })
const getEndDate = (date: Date, locale?: Locale) =>
  endOfWeek(addWeeks(endOfMonth(date), 6 - rowsInMonth(date, locale)), {
    locale
  })

interface GridState {
  startDate: Date
  endDate: Date
  cellHeight: number
  lastCurrentMonth: Date
  offset: number
  origin: string
  transition: boolean
  isWide: boolean
  locale: Locale
}

const createInitialState = (currentMonth: Date, locale: Locale): GridState => {
  return {
    startDate: getStartDate(currentMonth, locale),
    endDate: getEndDate(currentMonth, locale),
    cellHeight: 0,
    isWide: false,
    lastCurrentMonth: currentMonth,
    locale,
    offset: 0,
    origin: ORIGIN_TOP,
    transition: false
  }
}

type GridAction =
  | { type: 'setStartDate'; value: Date }
  | { type: 'setEndDate'; value: Date }
  | { type: 'setRange'; startDate: Date; endDate: Date }
  | { type: 'setCellHeight'; value: number }
  | { type: 'setIsWide'; value: boolean }
  | { type: 'reset'; currentMonth: Date }
  | { type: 'transitionToCurrentMonth'; currentMonth: Date }

const reducer = (state: GridState, action: GridAction): GridState => {
  switch (action.type) {
    case 'setStartDate':
      return { ...state, startDate: action.value }
    case 'setEndDate':
      return { ...state, endDate: action.value }
    case 'setRange':
      return { ...state, startDate: action.startDate, endDate: action.endDate }
    case 'setCellHeight':
      return { ...state, cellHeight: action.value }
    case 'setIsWide':
      return { ...state, isWide: action.value }
    case 'reset':
      return {
        ...createInitialState(action.currentMonth, state.locale),
        cellHeight: state.cellHeight,
        isWide: state.isWide
      }
    case 'transitionToCurrentMonth': {
      const { currentMonth } = action
      const { lastCurrentMonth, startDate, endDate, cellHeight } = state

      const newState = {
        ...state,
        lastCurrentMonth: currentMonth,
        transition: true
      }

      if (isAfter(currentMonth, lastCurrentMonth)) {
        const offset = -(rowsBetweenDates(startDate, currentMonth, state.locale) - 1) * cellHeight

        return {
          ...newState,
          endDate: getEndDate(currentMonth, state.locale),
          offset,
          origin: ORIGIN_TOP
        }
      } else if (isBefore(currentMonth, lastCurrentMonth)) {
        const gridHeight = cellHeight * 6
        const offset =
          rowsBetweenDates(currentMonth, endDate, state.locale) * cellHeight - gridHeight

        return {
          ...newState,
          startDate: getStartDate(currentMonth, state.locale),
          offset,
          origin: ORIGIN_BOTTOM
        }
      }

      return state
    }
    default:
      throw new Error(`Unknown ${(action as GridAction).type} action type`)
  }
}

export type UseGridProps = {
  locale: Locale
  month: Date
  onMonthChange: (month: Date) => void
  transitionDuration?: number
  touchDragEnabled?: boolean
}

export interface UseGridReturn<TRef extends HTMLElement> {
  startDate: Date
  endDate: Date
  cellHeight: number
  containerElementRef: React.RefObject<TRef>
  offset: number
  origin: string
  transition: boolean
  isWide: boolean
}

export function useGrid<TRef extends HTMLElement = HTMLElement>({
  locale,
  month: currentMonth,
  onMonthChange,
  transitionDuration,
  touchDragEnabled
}: UseGridProps): UseGridReturn<TRef> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const containerElementRef = useRef<TRef>(null)
  const initialDragPositionRef = useRef(0)
  const [
    { startDate, endDate, cellHeight, lastCurrentMonth, offset, origin, transition, isWide },
    dispatch
  ] = useReducer(reducer, createInitialState(currentMonth, locale))

  useLayoutEffect(() => {
    const notDragging = !initialDragPositionRef.current

    if (!isSameMonth(lastCurrentMonth, currentMonth) && notDragging) {
      const containerElement = containerElementRef.current
      containerElement?.classList.add('-transition')
      clearTimeout(timeoutRef.current)

      if (Math.abs(differenceInCalendarMonths(currentMonth, lastCurrentMonth)) <= 3) {
        dispatch({ type: 'transitionToCurrentMonth', currentMonth })

        timeoutRef.current = setTimeout(
          () => dispatch({ type: 'reset', currentMonth }),
          transitionDuration
        )
      } else {
        dispatch({ type: 'reset', currentMonth })
      }
    }
  }, [currentMonth])

  useLayoutEffect(() => {
    if (!touchDragEnabled) {
      return
    }

    const containerElement = containerElementRef.current
    const gridHeight = cellHeight * 6
    const halfGridHeight = gridHeight / 2

    if (containerElement) {
      const handleDragStart = (event: TouchEvent) => {
        clearTimeout(timeoutRef.current)
        const computedOffset = Number(
          window.getComputedStyle(containerElement).transform.match(/([-+]?[\d.]+)/g)?.[5]
        )
        let currentMonthPosition = 0

        if (!initialDragPositionRef.current) {
          const newStartDate = getStartDate(subMonths(currentMonth, 1), locale)
          currentMonthPosition =
            (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight
          dispatch({
            type: 'setRange',
            startDate: newStartDate,
            endDate: getEndDate(addMonths(currentMonth, 1), locale)
          })
        }

        if (!event.touches[0]) {
          return
        }
        containerElement.style.transform = `translate3d(0, ${String(
          computedOffset || -currentMonthPosition
        )}px, 0)`
        containerElement.classList.remove('-transition')
        containerElement.classList.add('-moving')
        initialDragPositionRef.current =
          event.touches[0].clientY + (-computedOffset || currentMonthPosition)
      }

      const handleDrag = (event: TouchEvent) => {
        if (!event.touches[0]) {
          return
        }
        const initialDragPosition = initialDragPositionRef.current
        const dragOffset = event.touches[0].clientY - initialDragPosition
        const previousMonth = subMonths(currentMonth, 1)
        const previousMonthPosition =
          (rowsBetweenDates(startDate, previousMonth, locale) - 1) * cellHeight
        const currentMonthPosition =
          (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight
        const nextMonth = addMonths(currentMonth, 1)
        const nextMonthPosition = (rowsBetweenDates(startDate, nextMonth, locale) - 1) * cellHeight

        if (dragOffset < 0) {
          if (
            Math.abs(dragOffset) > currentMonthPosition &&
            isBefore(endDate, addMonths(currentMonth, 2))
          ) {
            dispatch({
              type: 'setEndDate',
              value: getEndDate(nextMonth, locale)
            })
          }
        } else if (dragOffset > 0) {
          const newStartDate = getStartDate(previousMonth, locale)
          const newCurrentMonthPosition =
            (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight
          initialDragPositionRef.current += newCurrentMonthPosition
          dispatch({ type: 'setStartDate', value: newStartDate })
        }

        const shouldChangeToNextMonth = Math.abs(dragOffset) > nextMonthPosition - halfGridHeight
        const shouldChangeToPreviousMonth =
          Math.abs(dragOffset) > previousMonthPosition - halfGridHeight &&
          Math.abs(dragOffset) < currentMonthPosition - halfGridHeight

        if (shouldChangeToNextMonth) {
          onMonthChange(nextMonth)
        } else if (shouldChangeToPreviousMonth) {
          onMonthChange(previousMonth)
        }

        containerElement.style.transform = `translate3d(0, ${String(dragOffset)}px, 0)`
        event.preventDefault()
      }

      const handleDragEnd = (event: TouchEvent) => {
        const currentMonthPosition =
          (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight
        containerElement.style.transform = `translate3d(0, ${String(-currentMonthPosition)}px, 0)`
        containerElement.classList.add('-transition')
        containerElement.classList.remove('-moving')

        timeoutRef.current = setTimeout(() => {
          initialDragPositionRef.current = 0
          containerElement.style.transform = 'translate3d(0, 0, 0)'
          containerElement.classList.remove('-transition')
          dispatch({ type: 'reset', currentMonth: currentMonth })
        }, transitionDuration)

        if (
          event.changedTouches[0] &&
          Math.abs(
            initialDragPositionRef.current - currentMonthPosition - event.changedTouches[0].clientY
          ) > 10
        ) {
          event.preventDefault()
          event.stopPropagation()
        }
      }

      containerElement.addEventListener('touchstart', handleDragStart, {
        passive: true
      })
      containerElement.addEventListener('touchmove', handleDrag, {
        passive: false
      })
      containerElement.addEventListener('touchend', handleDragEnd, {
        passive: false
      })

      return () => {
        containerElement.removeEventListener('touchstart', handleDragStart)
        containerElement.removeEventListener('touchmove', handleDrag)
        containerElement.removeEventListener('touchend', handleDragEnd)
      }
    }
  })

  useEffect(() => {
    const handleResize = () => {
      const containerElement = containerElementRef.current
      if (!containerElement) {
        return
      }

      const containerWidth = containerElement.offsetWidth
      const cellWidth = containerWidth / 7
      let newCellHeight = 1
      let wide = false

      if (cellWidth > 60) {
        newCellHeight += Math.round(cellWidth * 0.75)
        wide = true
      } else {
        newCellHeight += Math.round(cellWidth)
      }

      dispatch({ type: 'setIsWide', value: wide })
      dispatch({ type: 'setCellHeight', value: newCellHeight })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    startDate,
    endDate,
    cellHeight,
    containerElementRef,
    offset,
    origin,
    transition,
    isWide
  }
}
