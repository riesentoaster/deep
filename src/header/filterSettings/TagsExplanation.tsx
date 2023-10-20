import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'
import { TriStateSwitch, TriStateSwitchState } from '../../generic/TriStateSwitch'

export const TagsExplanation: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.tags' } )
  const [ state, setState ] = useState<TriStateSwitchState>( 'IGNORE' )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation.overview' )}</p>
      <div className='w-fit mx-auto my-4'>
        <TriStateSwitch
          displayText={t( 'explanation.example-tag' )}
          inputAttrs={( value ): React.InputHTMLAttributes<HTMLInputElement> => ( {
            checked: value === state,
            onChange: ( e ): void => setState( e.target.value as TriStateSwitchState )
          } )}
        />
      </div>
      <p>
        {state === 'IGNORE' && t( 'explanation.state-ignore' )}
        {state === 'REQUIRE' && t( 'explanation.state-require' )}
        {state === 'PROHIBIT' && t( 'explanation.state-prohibit' )}
      </p>
    </>
  )
}
