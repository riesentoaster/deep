import { DeepPartial, DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { ReactElement, ReactNode, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { detailedDiff, updatedDiff } from 'deep-object-diff'
import qs from 'qs'
import defaultsDeep from 'lodash.defaultsdeep'
import merge from 'lodash.merge'
import { decodeBooleanAndNumbers } from './settingsHelpers'

interface FormProps <T extends object>{
  queryIndex: string
  defaultValue: DefaultValues<T>
  update( newT: DeepPartial<T> ): void
  children: ReactNode
}

export function Form<T extends object>( { queryIndex, defaultValue, update, children }: FormProps<T> ): ReactElement {

  const form = useForm<T>( { defaultValues: defaultValue } )
  const { handleSubmit, watch, reset, getValues } = form

  const [searchParams, setSearchParams] = useSearchParams()

  // update url params to match form state
  useEffect( () => {
    const subscription = watch( ( value ) => {
      update( value )
      const diff = detailedDiff( defaultValue, value )
      const merged = merge( diff.added, diff.updated )
      if ( Object.keys( merged ).length > 0 )
        searchParams.set( queryIndex, qs.stringify( merged, {} ) )
      else
        searchParams.delete( queryIndex )
      setSearchParams( searchParams )
    } )
    return () => subscription.unsubscribe()
  }, [update, searchParams, setSearchParams, watch, defaultValue, queryIndex] )

  // update form to match url params
  useEffect( () => {
    const fromURL = searchParams.get( queryIndex )
    const parsed = fromURL ? qs.parse( fromURL, { decoder: decodeBooleanAndNumbers } ) : {}
    if ( Object.keys( updatedDiff( parsed, getValues() ) ).length > 0 )
      reset( defaultsDeep( parsed, defaultValue ), { keepTouched: true } )
  }, [searchParams, getValues, reset, defaultValue, queryIndex] )

  return (
    <FormProvider {...form} >
      <form onSubmit={handleSubmit( () => { } )}>
        {children}
      </form>
    </FormProvider>
  )
}
