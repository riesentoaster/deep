import { Language } from './language'

export type HandPutTag = 'christians' | 'twoPeople' | 'philosophy' | 'sex' | 'dating' | 'v'
export type Tag = HandPutTag | 'hasAuthor'

export const tagTranslations: Record<Language, Record<Tag, String>> = {
  de: {
    'christians': 'Für Christen',
    'twoPeople': 'Für 2 Personen',
    'philosophy': 'Philosophie',
    'sex': 'Sexualität',
    'hasAuthor': 'Hat Autor:in',
    'dating': 'Für Paare',
    'v': 'Valentins Favoriten'
  },
  en: {
    'christians': 'For Christians',
    'twoPeople': 'For 2 People',
    'philosophy': 'Philosophy',
    'sex': 'Sexuality',
    'hasAuthor': 'Has Author',
    'dating': 'For Couples',
    'v': 'Valentin\'s Favourites'
  }
}
