import { useTranslation } from 'react-i18next'
import { TagsExplanation } from './TagsExplanation'
import { TriStateSwitch } from '../../generic/TriStateSwitch'
import { WithExplanation } from '../../generic/WithExplanation'
import { FC } from 'react'
import { allTags } from '../../questions/questions'
import { useFormContext } from 'react-hook-form'

export const TagsFilter: FC = () => {
  const { t: commonT } = useTranslation( 'common' )
  const { t: tagT } = useTranslation( 'tags' )
  const { register } = useFormContext()

  return (
    <>
      <WithExplanation closedElement={<h3>{commonT( 'header.tags.title' )}</h3>}explanation={<TagsExplanation />} />
      {allTags
        .sort( ( a, b ) => tagT( a ).localeCompare( tagT( b ) ) )
        .map( tag => (
          <TriStateSwitch
            key={tag}
            displayText={tagT( tag )}
            inputAttrs={(): React.HTMLAttributes<HTMLInputElement> => register( `tags.${tag}` )}/>
        ) )}
    </>
  )
}

