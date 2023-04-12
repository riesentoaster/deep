
import { Plot, PlotDataProps } from './Plot'

interface BarPlotProps {
    data: PlotDataProps
}
export const BarPlot = ( { data }: BarPlotProps ): JSX.Element => {

  return <Plot
    data={[{
      type: 'bar',
      x: data.map( e => e.label ),
      y: data.map( e => e.value ),
      text: data.map( e => `${e.value}` ),
    }]}
  />

}
