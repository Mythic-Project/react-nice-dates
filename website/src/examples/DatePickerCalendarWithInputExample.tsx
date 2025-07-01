'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar, useDateInput } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar, useDateInput } from 'react-nice-dates'
import 'react-nice-dates/style.css'

export function DatePickerCalendarWithInputExample() {
  const [date, setDate] = useState<Date | null>(null)

  const inputProps = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  return (
    <>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <input className='input' {...inputProps} />
      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </>
  )
}
`

export function DatePickerCalendarWithInputExample() {
  const [date, setDate] = useState<Date | null>(null)

  const inputProps = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  return (
    <Example code={code}>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <input className='input' {...inputProps} />
      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </Example>
  )
}
