import i18next from 'i18next'
import { Ellipsis } from '../generic/Ellipsis'
import { showTranslations } from 'translation-check'
import { FC } from 'react'

export const Footer: FC = () => (
  process.env.NODE_ENV !== 'production' ?
    <footer className='flex flex-row justify-space flex-wrap justify-center p-5 gap-5'>
      <Ellipsis>
        <button type='button' onClick={(): void => showTranslations( i18next ) } >
          Show Translations
        </button>
      </Ellipsis>
    </footer> :
    <></>
)
