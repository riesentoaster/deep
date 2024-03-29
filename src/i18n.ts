import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en.json'
import { DEFAULT_LANGUAGE, questionTranslations } from './questions/language'
import deCommon from './locales/de.json'
import { tagTranslations } from './questions/tags'

i18n.on( 'languageChanged', ( lng ) => ( document.documentElement.lang = lng ) )

i18n
  .use( LanguageDetector )
  .use( initReactI18next ) // passes i18n down to react-i18next
  .init( {
    resources: {
      en: {
        common: enCommon,
        tags: tagTranslations.en,
        questions: questionTranslations.en
      },
      de: {
        common: deCommon,
        tags: tagTranslations.de,
        questions: questionTranslations.de
      }
    },
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false }
  } )

