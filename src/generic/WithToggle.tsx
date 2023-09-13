import { Toggle } from './Toggle'

interface WithToggleProps {
  explanation: string
  formName: string
}

export const WithToggle = ( { explanation, formName }: WithToggleProps ): JSX.Element => (
  <div className='flex justify-between mt-2'>
    <p>{explanation}</p>
    <Toggle name={formName}/>
  </div>
)
