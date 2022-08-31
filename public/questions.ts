export interface Question {
  index: string;
  tags: string[];
  deepness: number;
}

export const questions: Question[] = [
  {
    index: 'q1',
    tags: ['tag1'],
    deepness: 1,
  },
  {
    index: 'q2',
    tags: ['tag1'],
    deepness: 3
  },
  {
    index: 'q3',
    tags: ['tag2', 'tag3'],
    deepness: 5
  },
]
