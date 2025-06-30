/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enGB } from 'date-fns/locale'
import { useDateInput } from '../src/useDateInput'

describe('useDateInput', () => {
  test('should return input props', () => {
    const { result } = renderHook(() =>
      useDateInput({
        locale: enGB,
        onDateChange: () => {}
      })
    )

    expect(result.current).toMatchObject({
      onFocus: expect.any(Function),
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
      placeholder: (enGB.formatLong?.date({ width: 'short' }) as string).toLowerCase(),
      type: 'text',
      value: ''
    })
  })
})
