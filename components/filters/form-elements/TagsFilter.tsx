import { useTranslation } from 'next-i18next'
import { allTags } from '../Filters'
import { FiltersTitle } from '../FiltersTitle'
import { Tags } from '../explanations/Tags'
import { TriStateSwitch, TriStateSwitchState } from '../TriStateSwitch'
import { Controller } from 'react-hook-form'

export const TagsFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common' )

  return (
    <fieldset>
      <FiltersTitle titleText={t( 'filters.tags.title' )} explanation={<Tags />} />
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
    </fieldset>

  )
}

