import React, { ReactNode } from 'react'
import classNames from 'classnames'

export interface PopoverProps {
  children: ReactNode
  open: boolean
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  { children, open },
  ref
): React.JSX.Element {
  return (
    <div className={classNames('nice-dates-popover', { '-open': open })} ref={ref}>
      {children}
    </div>
  )
})
