'use client'

import { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/style.css'

export function DatePickerWithTimeExample() {
  const [date, setDate] = useState<Date | null>(() => new Date(2020, 1, 24, 18, 15))

  return (
    <DatePicker date={date} onDateChange={setDate} locale={enGB} format='dd/MM/yyyy HH:mm'>
      {({ inputProps, focused }) => (
        <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
      )}
    </DatePicker>
  )
}
`

export function DatePickerWithTimeExample() {
  const [date, setDate] = useState<Date | null>(() => new Date(2020, 1, 24, 18, 15))

  return (
    <Example code={code}>
      <DatePicker date={date} onDateChange={setDate} locale={enGB} format='dd/MM/yyyy HH:mm'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>
    </Example>
  )
}
