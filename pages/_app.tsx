import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { LanguageSettings } from '../components/LanguageSettings'

function MyApp( { Component, pageProps }: AppProps ): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <footer><LanguageSettings/></footer>
    </>
  )
}

export default appWithTranslation( MyApp )

