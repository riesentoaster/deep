import { useTranslation } from 'react-i18next'
import { TagsExplanation } from './TagsExplanation'
import { Controller } from 'react-hook-form'
import { TriStateSwitch, TriStateSwitchState } from '../../generic/TriStateSwitch'
import { WithExplanation } from '../../generic/WithExplanation'
import { FC, ReactElement } from 'react'
import { allTags } from '../../questions/questions'

export const TagsFilter: FC = () => {
  const { t: commonT } = useTranslation( 'common' )
  const { t: tagT } = useTranslation( 'tags' )

  return (
    <>
      <WithExplanation closedElement={<h3>{commonT( 'header.tags.title' )}</h3>}explanation={<TagsExplanation />} />
      {allTags.map( tag => (
        <Controller
          name={`tags.${tag}`}
          key={tag}
          render={( { field: { value, onChange } } ): ReactElement => (
            <TriStateSwitch
              text={tagT( tag )}
              state={value}
              setIfUnchanged={false}
              setState={( newState: TriStateSwitchState ): void => onChange( newState )} />
          )} />
      ) )}
    </>
  )
}

