'use client'

import { useState } from 'react'
import { enUS, es } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { enUS, es } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/style.css'

export function LocalesExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <>
      <p>US English:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS}>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>

      <br />

      <p>Spanish:</p>

      <DatePicker date={date} onDateChange={setDate} locale={es} format='dd/MM/yyyy'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>
    </>
  )
}
`

export function LocalesExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Example code={code}>
      <p>US English:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS}>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>

      <br />

      <p>Spanish:</p>

      <DatePicker date={date} onDateChange={setDate} locale={es} format='dd/MM/yyyy'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>
    </Example>
  )
}
