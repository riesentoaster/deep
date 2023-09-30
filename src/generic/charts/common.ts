export const colors = [
  '#f94144',
  '#f8961e',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590',
  '#277da1'
]

export const getYTicks = ( maxValue: number ): number[] => {
  const orderOfMagnitude = Math.floor( Math.log10( maxValue ) )
  const firstDigit = Math.floor( maxValue / ( 10 ** orderOfMagnitude ) )
  let yTickDiff: number
  if ( firstDigit === 1 ) yTickDiff = ( 10 ** orderOfMagnitude ) / 5
  else if ( firstDigit <= 4 ) yTickDiff = ( 10 ** orderOfMagnitude ) / 2
  else yTickDiff = ( 10 ** orderOfMagnitude )

  const yTicks = Array( Math.floor( maxValue / yTickDiff ) + 1 )
    .fill( 1 )
    .map( ( _, i ) => i * yTickDiff )
    .filter( e => e === Math.floor( e ) ) // filtering for whole numbers
  yTicks.push( maxValue )
  console.log( maxValue, yTicks )
  return yTicks
}
