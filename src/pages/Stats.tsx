import { useTranslation } from 'react-i18next'
import { RechartsPlot } from '../generic/Plot'
import { FC, useContext } from 'react'
import { Question } from '../questions/types'
import { FilteredAndOrderedQuestionsContext } from './Layout'

export const Stats: FC = () => {

  const { t: tagsT } = useTranslation( 'tags' )
  const { t: statsT } = useTranslation( 'common', { keyPrefix: 'stats' } )
  const questions = useContext( FilteredAndOrderedQuestionsContext )

  const deepnessGrouper = ( q: Question ): string => q.deepness.toString()
  const tagGrouper = ( q: Question ): string[] => q.tags?.map( tag => tagsT( tag ) ) || []

  return ( <>
    <h2>{statsT( 'deepnesses' )}</h2>
    <RechartsPlot questions={questions} groupBy={deepnessGrouper} cumsum/>
    <hr/>
    <h2>{statsT( 'tags' )}</h2>
    <RechartsPlot questions={questions} groupBy={tagGrouper} cumsum/>
  </>
  )
}

