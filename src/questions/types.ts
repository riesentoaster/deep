
export type HandPutTag = 'christians' | 'twoPeople' | 'philosophy' | 'sex' | 'dating' | 'v'
export type Tag = HandPutTag | 'hasAuthor'
export type Language = 'de' | 'en'

export interface Question {
  question: string
  index: number
  deepness: number
  date: string
  tags?: Tag[]
  author?: string
}
