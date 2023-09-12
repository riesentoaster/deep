import { Question as QuestionComponent } from '../generic/Question'
import { NoQuestionsLeft } from '../generic/NoQuestionsLeft'
import { FilteredAndOrderedQuestionsContext } from './Layout'
import { usePlayers } from '../usePlayers'
import { HorizontalEntry } from '../generic/HorizontalEntry'
import { useContext } from 'react'
import { Ellipsis } from '../generic/Ellipsis'
import { useTranslation } from 'react-i18next'

export const AllQuestions = ( ): JSX.Element => {
  const questions = useContext( FilteredAndOrderedQuestionsContext )
  const { t } = useTranslation( 'common' )

  const { currentPlayer, shouldDisplay, nextPlayer } = usePlayers()

  if ( questions.length === 0 )
    return ( <NoQuestionsLeft/> )

  return (
    <>
      {
        shouldDisplay &&
          <HorizontalEntry
            onMoveToLeft={(): void => {}}
            onMoveToRight={nextPlayer}
            leftDisabled
            className='mb-10'
          >
            <div className='mx-auto w-fit'>
              {t( 'players.currentPlayer' )}:
              <Ellipsis className='inline ml-5'>{currentPlayer}</Ellipsis>

            </div>
          </HorizontalEntry>
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
