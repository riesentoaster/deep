import { DeepPartial, DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { updatedDiff } from 'deep-object-diff'
import qs from 'qs'
import defaultsDeep from 'lodash.defaultsdeep'
import { decodeBooleanAndNumbers } from './settingsHelpers'

interface FormProps <T extends object>{
  queryIndex: string
  defaultT: DefaultValues<T>
  update( newT: DeepPartial<T> ): void
  children: JSX.Element
}

export function Form<T extends object>( { queryIndex, defaultT, update, children }: FormProps<T> ): JSX.Element {

  const form = useForm<T>( { defaultValues: defaultT } )
  const { handleSubmit, watch, reset, getValues } = form

  const [searchParams, setSearchParams] = useSearchParams()

  // update url params to match form state
  useEffect( () => {
    const subscription = watch( ( value ) => {
      update( value )
      const diff = updatedDiff( defaultT, value )
      if ( Object.keys( diff ).length > 0 )
        searchParams.set( queryIndex, qs.stringify( diff, {} ) )
      else
        searchParams.delete( queryIndex )
      setSearchParams( searchParams )
    } )
    return () => subscription.unsubscribe()
  }, [update, searchParams, setSearchParams, watch, defaultT, queryIndex] )

  // update form to match url params
  useEffect( () => {
    const fromURL = searchParams.get( queryIndex )
    const parsed = fromURL ? qs.parse( fromURL, { decoder: decodeBooleanAndNumbers } ) : {}
    if ( Object.keys( updatedDiff( parsed, getValues() ) ).length > 0 )
      reset( defaultsDeep( parsed, defaultT ), { keepTouched: true } )
  }, [searchParams, getValues, reset, defaultT, queryIndex] )

  return (
    <FormProvider {...form} >
      <form onSubmit={handleSubmit( () => { } )}>
        {children}
      </form>
    </FormProvider>
  )
}
