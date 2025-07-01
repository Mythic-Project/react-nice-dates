'use client'

import { useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/style.css'

// Very rough implementation of multiple date selection
export function CalendarExample() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const modifiers = {
    selected: (date: Date) => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }

  const handleDayClick = (date: Date) => {
    setSelectedDates([...selectedDates, date])
  }

  return (
    <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
  )
}
`

export function CalendarExample() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const modifiers = {
    selected: (date: Date) => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }

  const handleDayClick = (date: Date) => {
    setSelectedDates([...selectedDates, date])
  }

  return (
    <Example code={code}>
      <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
    </Example>
  )
}
