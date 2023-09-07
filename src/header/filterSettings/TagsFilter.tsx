import { useTranslation } from 'react-i18next'
import { TagsExplanation } from './TagsExplanation'
import { Controller } from 'react-hook-form'
import { allTags } from '../settingsHelpers'
import { TriStateSwitch, TriStateSwitchState } from '../../generic/TriStateSwitch'
import { WithExplanation } from '../../generic/WithExplanation'

export const TagsFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common' )

  return (
    <>
      <WithExplanation closedElement={<h3>{t( 'header.tags.title' )}</h3>}explanation={<TagsExplanation />} />
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
      ) )}
    </>
  )
}

