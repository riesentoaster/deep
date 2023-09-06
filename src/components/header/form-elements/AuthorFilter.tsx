import { useFormContext } from 'react-hook-form'
import { TitleWithExplanation } from './titles/TitleWithExplanation'
import { AuthorExplanation } from './explanations/AuthorExplanation'
import { useTranslation } from 'react-i18next'

export const AuthorFilter = (): JSX.Element => {
  const { register } = useFormContext()
  const { t } = useTranslation( 'common', { keyPrefix: 'header.authors' } )

  return (
    <>
      <TitleWithExplanation titleText={t( 'title' )} explanation={<AuthorExplanation />} />
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
