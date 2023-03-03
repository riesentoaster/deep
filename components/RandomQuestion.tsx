import { QuestionDisplayProps } from '../pages'
import { BestOfN } from './BestOfN'

export const RandomQuestion = ( qdp: QuestionDisplayProps ): JSX.Element => BestOfN( { n:1,qdp } )
