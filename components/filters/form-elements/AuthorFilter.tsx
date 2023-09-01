import { useFormContext } from 'react-hook-form'
import { FiltersTitle } from './titles/FiltersTitle'
import { AuthorExplanation } from './explanations/AuthorExplanation'
import { useTranslation } from 'i18next-ssg'

export const AuthorFilter = (): JSX.Element => {
  const { register } = useFormContext()
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.authors' } )

  return (
    <fieldset>
      <FiltersTitle titleText={t( 'title' )} explanation={<AuthorExplanation />} />
      <label className='w-max mx-auto mt-1 w-max'>
        {t( 'showAuthors' )}
        <input
          type='checkbox'
          {...register( 'showAuthors' )}
          className='ml-3' />
      </label>
    </fieldset>
  )
}
