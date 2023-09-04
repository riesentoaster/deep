import { useMemo } from 'react'
import { unique } from '../../helpers'
import { MyPlot as Plot } from './Plot'

type SeriesHeader = string|number

export interface StackedTimeSeriesPlotEntry {
  date: string
  series: SeriesHeader
  value?: number
}

export interface StackedTimeSeriesPlotProps {
  entries: StackedTimeSeriesPlotEntry[],
  cumsum?: boolean
}

const identityFunction: <Type>( e: Type ) => Type = e => e
const getValue = ( entries: StackedTimeSeriesPlotEntry[], date: string, series: SeriesHeader ): number =>
  entries
    .filter( e => e.date === date && e.series === series )
    .map( e => e.value === undefined ? 1 : e.value )
    .reduce( ( acc, cur ) => acc + cur, 0 )

const getCumSumNumberMapper: ( ) => ( n: number ) => number = () => {
  const m = ( ( sum: number ) => ( value: number ): number => sum += value )
  return m( 0 )
}

export const StackedTimeSeriesPlot = ( { entries, cumsum = false }: StackedTimeSeriesPlotProps ): JSX.Element => {
  const plotData = useMemo( () => {
    const dates = entries.map( e => e.date ).filter( unique ).sort()
    const series = entries.map( e => e.series ).filter( unique ).sort()
    return series.map( s => ( {
      x: dates.map( e => new Date( e ) ),
      y: dates
        .map( e => getValue( entries, e, s ) )
        .map( cumsum ? getCumSumNumberMapper() : identityFunction ),
      name: s.toString(),
      stackgroup: 'group1'
    } ) )
  }, [entries, cumsum] )

  return <Plot data={ plotData } />
}
