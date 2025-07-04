import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { format, startOfMonth, subMonths } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import { DatePickerCalendar } from '../src/DatePickerCalendar'

describe('DatePickerCalendar', () => {
  it('should render', () => {
    const { getAllByText } = render(<DatePickerCalendar locale={locale} />)

    expect(getAllByText('1').length).toBeGreaterThan(0)
  })

  it('should call onDateChange on date selection', () => {
    const handleDateChange = jest.fn()

    const { getAllByText } = render(
      <DatePickerCalendar locale={locale} onDateChange={handleDateChange} />
    )

    fireEvent.click(getAllByText('1')[0] as HTMLElement)

    expect(handleDateChange).toHaveBeenCalledTimes(1)
  })

  it('should display selected date', () => {
    const { getAllByText } = render(
      <DatePickerCalendar locale={locale} date={startOfMonth(new Date())} />
    )

    expect(getAllByText('1')[0]?.parentElement).toHaveClass('-selected')
  })

  it("should display pre-selected date's month on initial render", () => {
    const pastDate = subMonths(new Date(), 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getAllByText } = render(<DatePickerCalendar locale={locale} date={pastDate} />)

    const results = getAllByText(monthName, { exact: false })
    expect(results.length).toBe(2)
    expect(results[0]).toHaveClass('nice-dates-navigation_current')
    expect(results[1]).toHaveClass('nice-dates-day_month')
  })

  it("should maintain the selected date's time when selecting a new date", () => {
    const handleDateChange = jest.fn()
    const date = new Date(2020, 1, 24, 18, 30)

    const { getByText } = render(
      <DatePickerCalendar locale={locale} date={date} onDateChange={handleDateChange} />
    )

    fireEvent.click(getByText('25'))

    expect(handleDateChange).toHaveBeenCalledWith(new Date(2020, 1, 25, 18, 30))
  })
})
