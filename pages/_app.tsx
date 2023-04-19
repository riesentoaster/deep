import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Analytics } from '@vercel/analytics/react'

function MyApp( { Component, pageProps }: AppProps ): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default appWithTranslation( MyApp )

