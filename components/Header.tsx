import { Filters, FiltersProps } from './Filters'
import { Menu } from './Menu'
import { Dropdown } from './Dropdown'
import { useTranslation } from 'next-i18next'

export const Header = ( { allQuestions, currentQuestions, setQuestions, setShowAuthors }: FiltersProps ): JSX.Element => {
  const { t } = useTranslation( 'common' )
  return (
    <header className='p-10 border-b'>
      <Dropdown className='w-full' title={t( 'deep' )}>
        <div className='flex flex-wrap flex-row w-full justify-evenly'>
          <Menu/>
          <Filters
            allQuestions={allQuestions}
            currentQuestions={currentQuestions}
            setQuestions={setQuestions}
            setShowAuthors={setShowAuthors}
          />
        </div>
      </Dropdown>

    </header>
  )

}
