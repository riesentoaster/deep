export const unique: <Type>( e: Type, i: number, a: Type[] ) => boolean = ( e,i,a ) => a.indexOf( e ) === i
export interface CumsumData {
value: number
[others: string]: any
}
export const getCumsumMapperTypeMapper: () => ( e: CumsumData ) => CumsumData = () =>{
  const m = ( sum: number ) => ( e: CumsumData )=> ( { ...e, value: sum += e.value } )
  return m( 0 )
}
export const getCumSumNumberMapper: ( ) => ( n: number ) => number = () => {
  const m = ( ( sum: number ) => ( value: number ): number => sum += value )
  return m( 0 )
}