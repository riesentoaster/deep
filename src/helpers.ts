export const shuffleArray = <T>( array: T[] ): T[] => {
  array = array.slice()
  for ( let i = array.length - 1; i > 0; i-- ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [ array[i], array[j] ] = [ array[j], array[i] ]
  }
  return array
}

export const tamedRandom: <T>(
  tameness: number, // between 0 and 1, with 1 being all random
  mapper: ( e: T ) => number // assumption: steps between results of 1
) => ( a: T, b: T ) => number
= ( tameness, mapper ) =>
  ( a, b ) =>
    tameness > Math.random() ?
      Math.random() - 0.5 :
      mapper( a ) - mapper( b ) + ( Math.random() / 10 - 0.05 ) // last part is if the two have the same value

export const unique: <Type>( e: Type, i: number, a: Type[] ) => boolean = ( e, i, a ) => a.indexOf( e ) === i
