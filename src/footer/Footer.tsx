import i18next from 'i18next'
import { Ellipsis } from '../generic/Ellipsis'
import { showTranslations } from 'translation-check'

export const Footer = (): JSX.Element => (
  <footer className='flex flex-row justify-space flex-wrap justify-center p-5 gap-5'>
    <Ellipsis>
      <p>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
    </Ellipsis>
    {process.env.NODE_ENV !== 'production' &&
     <Ellipsis>
       <button type='button' onClick={(): void => showTranslations( i18next ) } >
          Show Translations
       </button>
     </Ellipsis> }
  </footer>
)
