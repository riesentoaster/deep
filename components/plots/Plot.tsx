import dynamic from 'next/dynamic'
import { Layout } from 'plotly.js'

const PlotlyPlot = dynamic( () => import( 'react-plotly.js' ), { ssr: false } )

const defaultLayout: Partial<Layout> = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  legend: { font: { color: 'white' } },
  font: { color: 'white' },
  margin: { t: 0, b: 0, l: 0, r: 0 },
  xaxis: { showgrid: false, automargin: true },
  yaxis: { showgrid: false, rangemode: 'tozero', automargin: true },
}

export type PlotDataProp = {label: string|number; value: number}
export type PlotDataProps = PlotDataProp[]

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
