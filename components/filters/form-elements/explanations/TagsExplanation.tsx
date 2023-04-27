import { useTranslation } from 'next-i18next'
import { TriStateSwitch, TriStateSwitchState } from '../../TriStateSwitch'
import { useState } from 'react'

export const TagsExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.tags' } )
  const [state, setState] = useState<TriStateSwitchState>( 'IGNORE' )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation.overview' )}</p>
      <div className='w-fit mx-auto my-4'>
        <TriStateSwitch text={t( 'explanation.example-tag' )} state={state} setState={setState}/>
      </div>
      <p>
        {state === 'IGNORE' && t( 'explanation.state-ignore' )}
        {state === 'REQUIRE' && t( 'explanation.state-require' )}
        {state === 'PROHIBIT' && t( 'explanation.state-prohibit' )}
      </p>
    </>
  )
}
