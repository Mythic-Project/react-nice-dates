import { Locale } from 'date-fns'
import { ChangeEvent } from 'react'

export interface InputProps {
  ref: React.RefObject<HTMLInputElement>
  placeholder: string
  type: string
  value: string
  onBlur: () => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  readOnly?: boolean
}

export type DefaultModifiers = 'disabled' | 'selected' | 'today'
export type ModifierMatcher = (date: Date) => boolean

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type Modifiers = { [key in DefaultModifiers | string]: ModifierMatcher }
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ModifiersClassNames = { [key in DefaultModifiers | string]: string }

export interface CommonProps {
  locale: Locale
  minimumDate?: Date
  maximumDate?: Date
  modifiers?: Modifiers
  modifiersClassNames?: ModifiersClassNames
  weekdayFormat?: string
}

export type DateRangeFocus = 'startDate' | 'endDate'

export type DateChangeCallBack<TDate extends Date | null = Date | null> = (date: TDate) => void
