import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

function MyApp( { Component, pageProps }: AppProps ): JSX.Element {
  return (
    <Component {...pageProps} />

  )
}

export default appWithTranslation( MyApp )

