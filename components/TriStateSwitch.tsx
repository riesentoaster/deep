interface TriStateSwitchProps {
  text: string;
  state: TriStateSwitchState;
  setState: ( state: TriStateSwitchState ) => void;
}


export type TriStateSwitchState = 'REQUIRE' | 'IGNORE' | 'PROHIBIT'
const colors: Record<TriStateSwitchState, string> = {
  'REQUIRE': 'bg-green-200',
  'IGNORE': 'bg-gray-200',
  'PROHIBIT': 'bg-red-200'
}

export const TriStateSwitch = ( { text, state, setState }: TriStateSwitchProps ): JSX.Element => {

  const elementRequire = <p className="block px-3 text-center" onClick={(): void => setState( 'REQUIRE' )}>✔️</p>
  const elementIgnore = <p className="block px-3 text-center" onClick={(): void => setState( 'IGNORE' )}>{text}</p>
  const elementProhibit = <p className="block px-3 text-center" onClick={(): void => setState( 'PROHIBIT' )}>❌</p>

  switch ( state ) {
    case 'REQUIRE':
      return (
        <div className="flex flex-row border-2 rounded-full">
          <div className={`flex flex-row border-black border-2 rounded-full ${colors[state]}`}>
            {elementRequire}
            {elementIgnore}
          </div>
          {elementProhibit}
        </div>
      )
    case 'IGNORE':
      return (
        <div className="flex flex-row border-2 rounded-full">
          {elementRequire}
          <div className={`flex flex-row border-black border-2 rounded-full ${colors[state]}`}>
            {elementIgnore}
          </div>
          {elementProhibit}
        </div>
      )
    case 'PROHIBIT':
      return (
        <div className="flex flex-row border-2 rounded-full">
          {elementRequire}
          <div>
            <div className={`flex flex-row border-black border-2 rounded-full ${colors[state]}`}>
              {elementIgnore}
              {elementProhibit}
            </div>
          </div>
        </div>
      )
  }
}
