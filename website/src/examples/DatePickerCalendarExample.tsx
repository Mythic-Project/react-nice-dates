'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/style.css'

export function DatePickerCalendarExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <p>Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>

    <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
  )
}
`

export function DatePickerCalendarExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Example code={code}>
      <p>Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>

      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </Example>
  )
}
