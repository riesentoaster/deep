export interface Question {
    translations: Record<string, string>;
    tags?: string[]
}

export const languages = {
  'de': 'Deutsch',
  'en': 'English'
}

export const questions: Question[] = [
  {
    translations: {
      'de': 'Frage 1',
      'en': 'Question 1'
    }
  },
  {
    translations: {
      'de': 'Frage 2',
      'en': 'Question 2'
    },
    tags: ['tag1', 'tag2']
  },
  {
    translations: {
      'de': 'Frage 3',
      'en': 'Question 3'
    },
    tags: ['tag1']
  }
]
