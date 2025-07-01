'use client'

import { useState } from 'react'
import { getDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { getDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/style.css'

const modifiers = {
  disabled: (date: Date) => getDay(date) === 6, // Disables Saturdays
  highlight: (date: Date) => getDay(date) === 2 // Highlights Tuesdays
}

const modifiersClassNames = {
  highlight: '-highlight'
}

export function ModifiersExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePickerCalendar
      date={date}
      onDateChange={setDate}
      locale={enGB}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
  )
}

// In your CSS:
// .nice-dates-day.-highlight { color: orange; }
`

const modifiers = {
  disabled: (date: Date) => getDay(date) === 6, // Disables Saturdays
  highlight: (date: Date) => getDay(date) === 2 // Highlights Tuesdays
}

const modifiersClassNames = {
  highlight: '-highlight'
}

export function ModifiersExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Example code={code}>
      <DatePickerCalendar
        date={date}
        onDateChange={setDate}
        locale={enGB}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </Example>
  )
}
