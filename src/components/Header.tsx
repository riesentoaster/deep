import { Filters, FiltersProps } from './filters/Filters'
import { Menu } from './Menu'
import { Dropdown } from './Dropdown'
import { useTranslation } from 'react-i18next'

export const Header = ( {
  currentQuestions,
  setQuestions,
  setShowAuthors
}: FiltersProps ): JSX.Element => {
  const { t } = useTranslation( 'common' )
  return (
    <header className='p-10 border-b'>
      <Dropdown className='w-full' defaultHiddenState={true} title={t( 'deep' )}>
        <div className='flex flex-wrap flex-row w-full justify-evenly'>
          <Menu/>
          <Filters
            currentQuestions={currentQuestions}
            setQuestions={setQuestions}
            setShowAuthors={setShowAuthors}
          />
        </div>
      </Dropdown>
    </header>
  )
}
