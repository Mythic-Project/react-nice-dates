'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDateInput } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDateInput } from 'react-nice-dates'

export function StandaloneInputExample() {
  const [date, setDate] = useState<Date | null>(null)

  const inputProps = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  const handleReset = () => {
    setDate(new Date())
  }

  return (
    <>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <p>
        <button type='button' onClick={handleReset}>
          Set today
        </button>
      </p>
      <input className='input' {...inputProps} />
    </>
  )
}
`

export function StandaloneInputExample() {
  const [date, setDate] = useState<Date | null>(null)

  const inputProps = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  const handleReset = () => {
    setDate(new Date())
  }

  return (
    <Example code={code}>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <p>
        <button type='button' onClick={handleReset}>
          Set today
        </button>
      </p>
      <input className='input' {...inputProps} />
    </Example>
  )
}
