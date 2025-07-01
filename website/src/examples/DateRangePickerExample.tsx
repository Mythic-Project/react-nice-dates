'use client'

import { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates/index.mjs'
import { Example } from '../components/Example'

const code = `
import { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/style.css'

export function DateRangePickerExample() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      minimumDate={new Date()}
      minimumLength={1}
      format='dd MMM yyyy'
      locale={enGB}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Start date'
          />
          <span className='date-range_arrow' />
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='End date'
          />
        </div>
      )}
    </DateRangePicker>
  )
}
`

export function DateRangePickerExample() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  return (
    <Example code={code}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format='dd MMM yyyy'
        locale={enGB}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className='date-range'>
            <input
              className={'input' + (focus === START_DATE ? ' -focused' : '')}
              {...startDateInputProps}
              placeholder='Start date'
            />
            <span className='date-range_arrow' />
            <input
              className={'input' + (focus === END_DATE ? ' -focused' : '')}
              {...endDateInputProps}
              placeholder='End date'
            />
          </div>
        )}
      </DateRangePicker>
    </Example>
  )
}
