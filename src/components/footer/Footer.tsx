import { Ellipsis } from '../shared/Ellipsis'
import { LanguageSettings } from './LanguageSettings'

export const Footer = (): JSX.Element => (
  <footer className='flex flex-row justify-space flex-wrap justify-center p-5 gap-5'>
    <LanguageSettings/>
    <Ellipsis>
      <p>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
    </Ellipsis>
  </footer>
)
