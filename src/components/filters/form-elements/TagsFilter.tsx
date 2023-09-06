import { useTranslation } from 'react-i18next'
import { allTags } from '../filtersHelpers'
import { FiltersTitle } from './titles/FiltersTitle'
import { TagsExplanation } from './explanations/TagsExplanation'
import { TriStateSwitch, TriStateSwitchState } from '../TriStateSwitch'
import { Controller } from 'react-hook-form'

export const TagsFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common' )

  return (
    <>
      <FiltersTitle titleText={t( 'filters.tags.title' )} explanation={<TagsExplanation />} />
      {allTags.map( tag => (
        <Controller
          name={`tags.${tag}`}
          key={tag}
          render={( { field: { value, onChange } } ): JSX.Element => (
            <TriStateSwitch
              text={t( tag, { keyPrefix: 'tags' } )}
              state={value}
              setIfUnchanged={false}
              setState={( newState: TriStateSwitchState ): void => onChange( newState )} />
          )} />
      )
      )}
    </>

  )
}

