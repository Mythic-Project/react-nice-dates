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

export function DatePickerExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker date={date} onDateChange={setDate} locale={enGB}>
      {({ inputProps, focused }) => (
        <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
      )}
    </DatePicker>
  )
}
`

export function DatePickerExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Example code={code}>
      <DatePicker date={date} onDateChange={setDate} locale={enGB}>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>
    </Example>
  )
}
