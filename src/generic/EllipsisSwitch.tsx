import { ReactElement } from 'react'

interface EllipsisSwitchProps<T extends string> {
  elements: Record<T, string> // key, stringToDisplay
  state: T | undefined
  setState: ( state: T ) => void
  className?: string
}

export const EllipsisSwitch = <T extends string, >( {
  elements,
  state,
  setState,
  className = ''
}: EllipsisSwitchProps<T> ): ReactElement => {
  return (
    <div className={`flex flex-row border rounded-full h-fit ${className}`}>
      {
        Object.entries( elements ).map( ( [ k, v ] ) => (
          <button
            type="button"
            className={`px-5 rounded-full basis-0 grow ${
              state === k && 'bg-accentColorBackground border-x-[1px] rounded-full'}`}
            key={k}
            onClick={(): void => setState( k as T ) }
          >{v as string}</button>
        )
        )
      }
    </div>
  )
}
