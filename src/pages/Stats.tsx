import { useTranslation } from 'react-i18next'
import { LinePlot } from '../generic/charts/LinePlot'
import { FC, useContext } from 'react'
import { Question } from '../questions/questions'
import { FilteredAndOrderedQuestionsContext } from './Layout'
import { BarPlot } from '../generic/charts/BarPlot'

export const Stats: FC = () => {

  const { t: tagsT } = useTranslation( 'tags' )
  const { t: statsT } = useTranslation( 'common', { keyPrefix: 'stats' } )
  const questions = useContext( FilteredAndOrderedQuestionsContext )

  const deepnessGrouper = ( q: Question ): string => q.deepness.toString()
  const tagGrouper = ( q: Question ): string[] => q.tags?.map( tag => tagsT( tag ) ) || []

  return ( <>
    <h2>{statsT( 'deepnesses' )}</h2>
    <LinePlot questions={questions} groupBy={deepnessGrouper} />
    <hr/>
    <h2>{statsT( 'tags' )}</h2>
    <LinePlot questions={questions} groupBy={tagGrouper} />
    <BarPlot questions={questions} groupBy={( q ): string[] => q.tags || []} axisMapper={tagsT}/>
  </>
  )
}

