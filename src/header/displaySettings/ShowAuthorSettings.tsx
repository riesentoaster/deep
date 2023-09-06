import { useFormContext } from 'react-hook-form'
import { TitleWithExplanation } from '../../generic/TitleWithExplanation'
import { AuthorExplanation } from './AuthorExplanation'
import { useTranslation } from 'react-i18next'

export const ShowAuthorSettings = (): JSX.Element => {
  const { register } = useFormContext()
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return ( <>
    <TitleWithExplanation size={3} titleText={t( 'authors' )} explanation={<AuthorExplanation />} />
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
