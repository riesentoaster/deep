import { Question as QuestionComponent } from '../generic/Question'
import { NoQuestionsLeft } from '../generic/NoQuestionsLeft'
import { FilteredAndOrderedQuestionsContext } from './Layout'
import { usePlayers } from '../usePlayers'
import { HorizontalEntry } from '../generic/HorizontalEntry'
import { useContext } from 'react'

export const AllQuestions = ( ): JSX.Element => {
  const questions = useContext( FilteredAndOrderedQuestionsContext )

  const { currentPlayer, shouldDisplay, nextPlayer } = usePlayers()

  if ( questions.length === 0 )
    return ( <NoQuestionsLeft/> )

  return (
    <>
      {
        shouldDisplay &&
        <>
          <HorizontalEntry
            onMoveToLeft={(): void => {}}
            onMoveToRight={nextPlayer}
            leftDisabled
          >
            <p className='mx-auto w-fit'>{currentPlayer}</p>
          </HorizontalEntry>
          <hr />
        </>
      }
      <ul className='w-fit mx-auto'>
        {questions.map( e =>
          <li
            className='py-2'
            key={e.index}>
            <QuestionComponent question={e}/>
          </li>
        )}
      </ul>
    </> )
}
