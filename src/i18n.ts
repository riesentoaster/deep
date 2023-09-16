import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import { translations } from './questions'
import deCommon from './locales/de/common.json'

i18n
  .use( LanguageDetector )
  .use( initReactI18next ) // passes i18n down to react-i18next
  .init( {
    // the translations
    // (tip move them in a JSON file and import them
    resources: {
      en: {
        common: enCommon,
        questions: translations.en
      },
      de: {
        common: deCommon,
        questions: translations.de
      }
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  } )
