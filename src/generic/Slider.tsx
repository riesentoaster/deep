import RCSlider from 'rc-slider'
import style from './Slider.module.scss'
import { nonBreakingSpace } from './Question'
import { Controller } from 'react-hook-form'

interface SliderProps {
  name: string
  textLeft: string
  textRight: string
  min: number
  max: number
  step: number
  onChangeMapper?: ( value: number | number[] ) => any
  valueMapper?: ( value: any ) => number|number[]
  range?: boolean
  dots?: boolean
  allowCross?: boolean
}

export const Slider = ( {
  name,
  textLeft,
  textRight,
  min,
  max,
  step,
  onChangeMapper = ( value ): number|number[] => value,
  valueMapper = ( value ): number|number[] => value,
  range = false,
  dots = false,
  allowCross = false
}: SliderProps ): JSX.Element => (
  <Controller
    name={name}
    render={( { field: { value, onChange } } ): JSX.Element => (
      <div className='mx-2 mt-3 mb-2' >
        <RCSlider
          className={style.slider}
          range={range}
          dots={dots}
          allowCross={allowCross}
          min={min}
          max={max}
          step={step}
          marks={{
            [min]: ( <p className={style.textMin}>{ textLeft.replaceAll( ' ', nonBreakingSpace )}</p> ),
            [max]: ( <p className={style.textMax}><span>{ textRight.replaceAll( ' ', nonBreakingSpace ) }</span></p> )
          }}
          value={valueMapper( value )}
          onChange={( e ): void => onChange( onChangeMapper( e ) )} />
      </div>
    )}/>
)