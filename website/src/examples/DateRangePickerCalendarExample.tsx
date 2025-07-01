'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangeFocus, DateRangePickerCalendar, START_DATE } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangeFocus, DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import 'react-nice-dates/style.css'

export function DateRangePickerCalendarExample() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [focus, setFocus] = useState<DateRangeFocus>(START_DATE)

  const handleFocusChange = (newFocus: DateRangeFocus | null) => {
    setFocus(newFocus || START_DATE)
  }

  return (
    <>
      <p>
        Selected start date:{' '}
        {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>
      <p>
        Selected end date: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>
      <p>Currently selecting: {focus}.</p>

      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      />
    </>
  )
}
`

export function DateRangePickerCalendarExample() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [focus, setFocus] = useState<DateRangeFocus>(START_DATE)

  const handleFocusChange = (newFocus: DateRangeFocus | null) => {
    setFocus(newFocus || START_DATE)
  }

  return (
    <Example code={code}>
      <p>
        Selected start date:{' '}
        {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>
      <p>
        Selected end date: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>
      <p>Currently selecting: {focus}.</p>

      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      />
    </Example>
  )
}
