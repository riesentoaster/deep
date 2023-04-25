interface EllipsisSwitchProps<T extends string> {
    elements: Record<T,string> // key, stringToDisplay
    state: T | undefined
    setState: ( state: T ) => void
}

export const EllipsisSwitch = <T extends string,>( { elements, state, setState }: EllipsisSwitchProps<T> ): JSX.Element => {
  return (
    <div className='flex flex-row border rounded-full m-5'>
      {
        Object.entries( elements ).map( ( [k,v] ) => (
          <button
            className={`px-5 rounded-full basis-0 grow ${state === k && 'bg-accentColorDarkBlue border rounded-full'}`}
            key={k}
            onClick={(): void => setState( k as T ) }
          >{v as string}</button>
        )
        )
      }
    </div>
  )
}
