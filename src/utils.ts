import { differenceInDays, isAfter, isBefore, startOfDay, set } from 'date-fns'
import { ModifierMatcher } from './types'

export const isSelectable = (
  date: Date,
  {
    minimumDate,
    maximumDate
  }: {
    minimumDate?: Date
    maximumDate?: Date
  }
): boolean =>
  Boolean(
    minimumDate &&
      maximumDate &&
      !isBefore(date, startOfDay(minimumDate)) &&
      !isAfter(date, maximumDate)
  )

export const mergeModifiers = (
  baseModifiers: Record<string, ModifierMatcher>,
  newModifiers?: Record<string, ModifierMatcher>
): Record<string, ModifierMatcher> => {
  if (!newModifiers) {
    return baseModifiers
  }

  return Object.fromEntries(
    Object.entries(newModifiers).map(([name, newModifier]) => [
      name,
      baseModifiers[name] ? date => baseModifiers[name](date) || newModifier(date) : newModifier
    ])
  )
}

export const setTime = (date: Date, dateWithTime: Date): Date =>
  set(date, {
    hours: dateWithTime.getHours(),
    minutes: dateWithTime.getMinutes(),
    seconds: dateWithTime.getSeconds()
  })

export const isRangeLengthValid = (
  { startDate, endDate }: { startDate: Date; endDate: Date },
  { minimumLength, maximumLength }: { minimumLength: number; maximumLength?: number }
): boolean =>
  differenceInDays(startOfDay(endDate), startOfDay(startDate)) >= minimumLength &&
  (!maximumLength || differenceInDays(startOfDay(endDate), startOfDay(startDate)) <= maximumLength)
