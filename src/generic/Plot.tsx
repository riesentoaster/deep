import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Question } from '../questions/types'
import { unique } from '../helpers'
import { FC } from 'react'

interface RechartsPlotProps {
  questions: Question[]
  groupBy: ( q: Question ) => string | string[]
  cumsum?: boolean
}

const colors = ['#00af54', '#ffd639', '#ffbd74', '#8090b7', '#007cbe']
const formatter = ( e: number ): string => new Date( e ).toLocaleDateString()

export const RechartsPlot: FC<RechartsPlotProps> = ( { questions, groupBy, cumsum = false } ) => {
  const uniqueGroups = questions.flatMap( e => groupBy( e ) ).filter( unique ).sort()

  const data: {date: number, [key: string]: number}[] = questions
    .map( e => e.date )
    .filter( unique )
    .sort()
    .map( date => ( {
      date: new Date( date ).getTime(),
      ...questions
        .filter( q => q.date === date )
        .flatMap( q => groupBy( q ) )
        .reduce( ( acc, cur ) => ( acc[cur] += 1, acc ),
          Object.fromEntries( uniqueGroups.map( g => ( [g, 0] ) ) ) )
    } ) )

  const sums = Object.fromEntries( uniqueGroups.map( g => [g, 0] ) )
  if ( cumsum )
    for ( const d of data )
      for ( const g of uniqueGroups ) {
        const presum = sums[g]
        sums[g] += d[g]
        d[g] = presum
      }

  return (
    <ResponsiveContainer width={'100%'} height={500} className={'my-10'}>
      <AreaChart data={data} margin={{ bottom: 70 }}>
        <XAxis
          dataKey={'date'}
          type={'number'}
          angle={90}
          domain={['dataMin', 'dataMax']}
          textAnchor='start'
          tickFormatter={formatter}
        />
        <YAxis/>
        <Tooltip
          labelFormatter={formatter}
          contentStyle={{ background: 'black' }}
          labelClassName={'text-white'}
          itemSorter={( i ): number => typeof i.dataKey === 'string' ? -( uniqueGroups.indexOf( i.dataKey ) ) : 0}
        />
        {
          uniqueGroups.map( ( e, i ) => (
            <Area
              key={e}
              //   type="monotone"
              fill={colors[i % ( colors.length )]}
              stroke={colors[i % ( colors.length )]}
              dataKey={e}
              stackId={'1'}
            />
          ) )
        }
      </AreaChart>
    </ResponsiveContainer>
  )
}
