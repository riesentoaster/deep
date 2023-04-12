import dynamic from 'next/dynamic'
import { Layout } from 'plotly.js'

const PlotlyPlot = dynamic( () => import( 'react-plotly.js' ) , { ssr: false } )

const defaultLayout: Partial<Layout> = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  legend: {
    font: {
      color: 'white'
    }
  },
  font: {
    color: 'white'
  },
  xaxis: { showgrid: false },
  yaxis: { showgrid: false, rangemode: 'tozero' },
}

export type PlotDataProps = {label: string|number; value: number}[]

interface PlotParams {
  data: Plotly.Data[];
}

export const Plot = ( { data }: PlotParams ): JSX.Element => (
  <PlotlyPlot
    data={ data }
    layout={ defaultLayout }
    className='w-full'
  />
)
