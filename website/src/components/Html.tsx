export function Html({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
        <link
          href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,700|IBM+Plex+Sans:400,400i,700|Poppins:700&display=swap'
          rel='stylesheet'
        />
        <link rel='shortcut icon' type='image/png' href='/favicon.png' />

        <title>React Nice Dates</title>

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://reactnicedates.hernansartorio.com/' />
        <meta property='og:title' content='React Nice Dates' />
        <meta
          property='og:description'
          content='A responsive, touch-friendly, and modular date picker library for React.'
        />
        <meta
          property='og:image'
          content='https://reactnicedates.hernansartorio.com/favicon.2e70f008.png'
        />
        <meta name='twitter:card' content='summary' />
      </head>
      <body>
        {children}
        <script async src='https://www.googletagmanager.com/gtag/js?id=UA-142836683-2'></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-142836683-2');
          `}
        </script>
      </body>
    </html>
  )
}
