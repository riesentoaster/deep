import { useFormContext } from 'react-hook-form'
import { AuthorExplanation } from './AuthorExplanation'
import { useTranslation } from 'react-i18next'
import { WithExplanation } from '../../generic/WithExplanation'

export const ShowAuthorSettings = (): JSX.Element => {
  const { register } = useFormContext()
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return ( <>
    <WithExplanation closedElement={<h3>{t( 'authors' )}</h3>} explanation={<AuthorExplanation />} />
    <label className='w-max mx-auto mt-1 w-max'>
      {t( 'showAuthors' )}
      <input
        type='checkbox'
        {...register( 'showAuthors' )}
        className='ml-3' />
    </label>
  </>
  )
}
