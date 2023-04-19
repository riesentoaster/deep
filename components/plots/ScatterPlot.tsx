import { Plot, PlotDataProps } from './Plot'

interface ScatterPlotProps {
    data: PlotDataProps
}
export const ScatterPlot = ( { data }: ScatterPlotProps ): JSX.Element => {

  return <Plot
    data={[ {
      type: 'scatter',
      x: data.map( e => e.label ),
      y: data.map( e => e.value ),
      text: data.map( e => `${e.value}` ),
      mode: 'text+lines+markers',
      textposition: 'top center',
    }]}
  />

}
