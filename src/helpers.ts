export const random: ( a?: any, b?: any ) => number = () => Math.random() - 0.5

export const unique: <Type>( e: Type, i: number, a: Type[] ) => boolean = ( e, i, a ) => a.indexOf( e ) === i

export const reduceToObject = <R extends Record<string, any>> ( acc: R, cur: R ): R => Object.assign( acc, cur )
