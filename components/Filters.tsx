import { Bars3Icon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { TriStateSwitch, TriStateSwitchState } from './TriStateSwitch'

const possibleDeepnessLevels = Array( 5 ).fill( 0 ).map( ( _, i ) => i+1 )

interface FiltersProps {
    tags: string[];
    tagStates: TriStateSwitchState[];
    setTagStates: ( newTagStates: TriStateSwitchState[] ) => void;
    minDeepness: number;
    setMinDeepness: ( newDeepness: number ) => void;
    maxDeepness: number;
    setMaxDeepness: ( newDeepness: number ) => void;
}

export const Filters = ( {
  tags,
  tagStates,
  setTagStates,
  minDeepness,
  setMinDeepness,
  maxDeepness,
  setMaxDeepness
}: FiltersProps ): JSX.Element => {

  const { t } = useTranslation( )

  const [hidden, setHidden] = useState( false )

  return (
    <div className='mx-auto'>
      <div className='flex flex-row mx-auto w-min justify-center border px-7 rounded-full' onClick={(): void => setHidden( !hidden )}>
        <h2>{t( 'filters' )}</h2>
        <Bars3Icon className='h-8 inline pl-5 my-auto'/>
      </div>
      <div className={`mx-auto w-max ${hidden && 'hidden'}`}>
        {tags.map( ( e,i ) => (
          <TriStateSwitch
            key={e}
            text={e}
            state={tagStates[i]}
            setState={( newState: TriStateSwitchState ): void => {
              const newTagStates = tagStates.map( e => e )
              newTagStates[i] = newState
              setTagStates( newTagStates )
            }}
          /> )
        )}
      </div>

      <form className='mx-auto flex flex-row flex-wrap justify-center'>
        <div className='flex flex-col m-3'>
          <p className='w-max'>{t( 'minDeepness' )}</p>
          <select defaultValue={minDeepness} onChange={( e ): void => setMinDeepness( Number.parseInt( e.target.value ) )}>
            {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e > maxDeepness}>{e}</option> ) )}
          </select>
        </div>
        <div className='flex flex-col m-3'>
          <p className='w-max'>{t( 'maxDeepness' )}</p>
          <select defaultValue={maxDeepness} onChange={( e ): void => setMaxDeepness( Number.parseInt( e.target.value ) )}>
            {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e < minDeepness}>{e}</option> ) )}
          </select>
        </div>
      </form>
    </div>
  )
}
