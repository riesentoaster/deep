import { LanguageSettings } from './LanguageSettings'

export const Footer = (): JSX.Element => (
  <footer className='flex flex-row justify-space flex-wrap justify-center'>
    <LanguageSettings/>
    <p className='border rounded-full px-5 m-5'>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
  </footer>

)
