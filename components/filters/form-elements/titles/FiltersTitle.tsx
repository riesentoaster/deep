import { PopUp } from './PopUp'

interface FiltersTitleProps {
    titleText: string
    explanation: JSX.Element
}
export const FiltersTitle = ( { titleText, explanation }: FiltersTitleProps ): JSX.Element => {
  return (
    <div className='flex flex-row'>
      <h3 className='mx-auto'>{titleText}</h3>
      <PopUp>{explanation}</PopUp>
    </div>

  )
}
