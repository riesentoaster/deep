import {
  Area,
  AreaChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Question } from '../../questions/questions'
import { unique } from '../../helpers'
import { FC } from 'react'
import { colors, getYTicks } from './common'

interface LinePlotProps {
  questions: Question[]
  groupBy: ( q: Question ) => string | string[]
}

const formatter = ( e: number ): string => new Date( e ).toLocaleDateString()

export const LinePlot: FC<LinePlotProps> = ( { questions, groupBy } ) => {
  const flatGroupings = questions.flatMap( e => groupBy( e ) )
  const uniqueGroups = flatGroupings.filter( unique ).sort()

  const data: {date: number, [key: string]: number}[] = questions
    .map( e => e.date )
    .filter( unique )
    .sort()
    .map( date => ( {
      date: new Date( date ).getTime(),
      ...questions
        .filter( q => q.date <= date )
        .flatMap( q => groupBy( q ) )
        .reduce( ( acc, cur ) => {
          acc[cur] += 1
          return acc
        },
        Object.fromEntries( uniqueGroups.map( g => ( [ g, 0 ] ) ) ) )
    } ) )

  const maxValue = flatGroupings.length

  return (
    <ResponsiveContainer width={'100%'} height={500} className={'my-10'}>
      <AreaChart data={data} margin={{ bottom: 70 }}>
        <XAxis
          dataKey={'date'}
          type={'number'}
          angle={90}
          domain={[ 'dataMin', 'dataMax' ]}
          textAnchor='start'
          tickFormatter={formatter}
          tickCount={11}
        />
        <YAxis ticks={getYTicks( maxValue )}/>
        <Legend verticalAlign='top'/>
        <Tooltip
          labelFormatter={formatter}
          contentStyle={{ background: 'black' }}
          labelClassName={'text-white'}
          itemSorter={( i ): number => typeof i.dataKey === 'string' ? -( uniqueGroups.indexOf( i.dataKey ) ) : 0}
        />
        <ReferenceLine y={maxValue} strokeDasharray='3 3'/>
        {
          uniqueGroups.map( ( e, i ) => (
            <Area
              key={e}
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
