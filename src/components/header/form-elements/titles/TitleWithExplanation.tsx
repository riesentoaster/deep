import { ExplanationPopUp } from './ExplanationPopUp'

interface FiltersTitleProps {
    titleText: string
    explanation: JSX.Element
    size?: number
  }

const getTitle = ( text: string, size: number ): JSX.Element => {
  switch ( size ) {
    case 1: return ( <h1 className='mx-auto'>{text}</h1> )
    case 3: return ( <h3 className='mx-auto'>{text}</h3> )
    case 4: return ( <h4 className='mx-auto'>{text}</h4> )
    default: return ( <h2 className='mx-auto'>{text}</h2> )
  }
}

export const TitleWithExplanation = ( { titleText, explanation, size = 2 }: FiltersTitleProps ): JSX.Element => {
  return (
    <div className='flex flex-row'>
      { getTitle( titleText, size ) }
      <ExplanationPopUp>{explanation}</ExplanationPopUp>
    </div>

  )
}
