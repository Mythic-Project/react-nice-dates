'use client'

import { Highlight } from 'prism-react-renderer'
import { themes } from 'prism-react-renderer'

export interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  return (
    <Highlight code={code.trim()} language={language} theme={themes.github}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                // eslint-disable-next-line @eslint-react/no-array-index-key
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
