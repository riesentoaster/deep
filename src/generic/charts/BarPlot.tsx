import { FC } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Question } from '../../questions/types'
import { colors, getYTicks } from './common'

interface BarPlotProps {
  questions: Question[]
  groupBy: ( q: Question ) => string | string[]
  axisMapper: ( toTranslate: string ) => string
}

export const BarPlot: FC<BarPlotProps> = ( { questions, groupBy, axisMapper } ) => {
  const dataObject = questions.reduce( ( acc, cur ): Record<string, number> => {
    const out = groupBy( cur )
    const values = Array.isArray( out ) ? out : [ out ]
    for ( const v of values ){
      if ( v in acc )
        acc[v] = acc[v] + 1
      else
        acc[v] = 1
    }
    return acc
  }, {} as Record<string, number> )
  const data = Object.entries( dataObject )
    .map( ( [ k, v ] ) => ( {
      name: axisMapper( k ),
      value: v,
      rest: questions.length - v
    } ) )
    .sort( ( a, b ) => b.value - a.value )
  console.log( dataObject )
  return (
    <ResponsiveContainer width={'100%'} height={500} className={'my-10'}>
      <BarChart data={data} margin={{ bottom: 130 }} barCategoryGap={'20%'}>
        <Bar dataKey="value" fill={colors[0]} stroke={colors[0]} stackId='stack1' label={{ position: 'top' }}/>
        <Bar dataKey="rest" stroke={colors[0]} fillOpacity={0} stackId='stack1' />
        <YAxis ticks={getYTicks( questions.length )}/>
        <XAxis dataKey="name" angle={90} textAnchor='start'/>
      </BarChart>
    </ResponsiveContainer>
  )
}
