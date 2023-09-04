import { Layout } from 'plotly.js'

import Plot from 'react-plotly.js'

const defaultLayout: Partial<Layout> = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  legend: { font: { color: 'white' } },
  font: { color: 'white' },
  margin: { t: 0, b: 0, l: 0, r: 0 },
  xaxis: { showgrid: false, automargin: true },
  yaxis: { showgrid: false, automargin: true, rangemode: 'tozero' }
}

export type PlotDataProp = {label: string|number; value: number}
export type PlotDataProps = PlotDataProp[]

interface PlotParams {
  data: Plotly.Data[];
}

export const MyPlot = ( { data }: PlotParams ): JSX.Element => (
  <Plot
    data={ data }
    layout={ defaultLayout }
    config={{ staticPlot: true, responsive: true }}
    className='w-full'
  />
)
