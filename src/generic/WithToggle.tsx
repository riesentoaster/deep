import { FC } from 'react'
import { Toggle } from './Toggle'

interface WithToggleProps {
  explanation: string
  formName: string
  className?: string
}

export const WithToggle: FC<WithToggleProps> = ( { explanation, formName, className = '' } ) => (
  <div className={`flex justify-between mt-2 ${className}`}>
    <p>{explanation}</p>
    <Toggle name={formName}/>
  </div>
)
