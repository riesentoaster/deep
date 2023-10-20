import RCSlider from 'rc-slider'
import style from './Slider.module.scss'
import { nonBreakingSpace } from './Question'
import { Controller } from 'react-hook-form'
import { ReactElement } from 'react'

interface SliderProps<T> {
  name: string
  textLeft: string
  textRight: string
  min: number
  max: number
  step: number
  onChangeMapper?: ( value: number | number[] ) => T | number | number[]
  valueMapper?: ( value: T ) => number|number[]
  range?: boolean
  dots?: boolean
  allowCross?: boolean
}

export const Slider = <T, >( {
  name,
  textLeft,
  textRight,
  min,
  max,
  step,
  onChangeMapper = ( value ): number|number[] => value,
  valueMapper = ( value ): number|number[] => value as number,
  range = false,
  dots = false,
  allowCross = false
}: SliderProps<T> ): ReactElement => {
  return (
    <Controller
      name={name}
      render={( { field: { value, onChange } } ): ReactElement => (
        <div className='ml-4 mr-2 mt-6 mb-2' >
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
}
