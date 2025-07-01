'use client'

import React from 'react'
import { CodeBlock } from './CodeBlock'

export interface ExampleProps {
  children: React.ReactNode
  code: string
}

export function Example({ children, code }: ExampleProps) {
  return (
    <div className='example'>
      <div className='example_preview'>{children}</div>

      <CodeBlock code={code} />
    </div>
  )
}
