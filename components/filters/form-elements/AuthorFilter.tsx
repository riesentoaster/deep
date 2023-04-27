import { useFormContext } from 'react-hook-form'
import { FiltersTitle } from '../FiltersTitle'
import { Authors } from '../explanations/Authors'
import { useTranslation } from 'next-i18next'

export const AuthorFilter = (): JSX.Element => {
  const { register } = useFormContext()
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.authors' } )

  return (
    <fieldset>
      <FiltersTitle titleText={t( 'title' )} explanation={<Authors />} />
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
