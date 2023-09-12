export const random: () => number = () => Math.random() - 0.5

export const unique: <Type>( e: Type, i: number, a: Type[] ) => boolean = ( e, i, a ) => a.indexOf( e ) === i

export const reduceToObject = <T, R extends {[key: string]: T}> ( acc: R, cur: R ): R => Object.assign( acc, cur )
