import { Ellipsis } from './Ellipsis'
import { LanguageSettings } from './LanguageSettings'

export const Footer = (): JSX.Element => (
  <footer className='flex flex-row justify-space flex-wrap justify-center'>
    <LanguageSettings/>
    <Ellipsis className='m-5'>
      <p>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
    </Ellipsis>
  </footer>

)
