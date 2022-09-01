import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { LanguageSettings } from '../components/LanguageSettings'

function MyApp( { Component, pageProps }: AppProps ): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <footer className='flex flex-row justify-space flex-wrap justify-center'>
        <LanguageSettings/>
        <p className='border rounded-full px-5 m-5'>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
      </footer>
    </>
  )
}

export default appWithTranslation( MyApp )

