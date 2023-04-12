import { Plot, PlotDataProps } from './Plot'

interface PiePlottProps {
    data: PlotDataProps
}
export const PiePlot = ( { data }: PiePlottProps ): JSX.Element => (
  <Plot
    data={[{
      labels: data.map( e => e.label ) ,
      values: data.map( e => e.value ),
      sort: false,
      type: 'pie'
    }] }
  />
)
