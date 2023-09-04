import { useTranslation } from 'react-i18next'
import { TriStateSwitchState } from './TriStateSwitch'
import { Question, questions as allQuestions } from '../../questions'
import { useEffect } from 'react'
import { unique } from '../../helpers'
import { FormProvider, useForm } from 'react-hook-form'
import { updatedDiff } from 'deep-object-diff'
import qs from 'qs'
import defaultsDeep from 'lodash.defaultsdeep'
import { ErrorMessage } from '../ErrorMessage'
import 'rc-slider/assets/index.css'
import { TagsFilter } from './form-elements/TagsFilter'
import { DeepnessFilter } from './form-elements/DeepnessFilter'
import { OrderFilter } from './form-elements/OrderFilter'
import { AuthorFilter } from './form-elements/AuthorFilter'
import {
  decodeBooleanAndNumbers,
  filterQuestions,
  reduceToObject,
} from './filtersHelpers'
import { useSearchParams } from 'react-router-dom'

const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'
const possibleDeepnessLevels = allQuestions.map( e => e.deepness ).filter( unique ).sort()
export const minDeepness = Math.min( ...possibleDeepnessLevels )
export const maxDeepness = Math.max( ...possibleDeepnessLevels )
export const allTags = allQuestions
  .filter( e => Array.isArray( e.tags ) )
  .map( e => e.tags as string[] )
  .flat()
  .filter( unique )
export const QUERY_INDEX = 'filters'

export interface FiltersProps {
  currentQuestions: Question[]
  setQuestions( q: Question[] ): void
  setShowAuthors( showAuthor: boolean ): void
}

export interface FiltersObject {
  tags: Record<string, TriStateSwitchState>
  deepness: {min: number, max: number}
  randomness: number
  sets: boolean
  showAuthors: boolean
}

export const defaultValues: FiltersObject = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
  deepness: { min: minDeepness, max: maxDeepness },
  randomness: 0,
  sets: false,
  showAuthors: true,
}

export const Filters = ( {
  currentQuestions,
  setQuestions,
  setShowAuthors
}: FiltersProps ): JSX.Element => {

  const { t } = useTranslation( 'common', { keyPrefix: 'filters' } )
  const form = useForm<FiltersObject>( { defaultValues } )
  const { handleSubmit, watch, reset, getValues } = form
  const [searchParams, setSearchParams] = useSearchParams()

  // update url params to match form state
  useEffect( () => {
    const subscription = watch( ( value ) => {
      setQuestions( filterQuestions( allQuestions, value ) )
      if ( value.showAuthors !== undefined ) setShowAuthors( value.showAuthors )
      const diff = updatedDiff( defaultValues, value )
      if ( Object.keys( diff ).length > 0 )
        searchParams.set( QUERY_INDEX, qs.stringify( diff, {} ) )
      else
        searchParams.delete( QUERY_INDEX )
      setSearchParams( searchParams )
    } )
    return () => subscription.unsubscribe()
  }, [searchParams, setQuestions, setSearchParams, setShowAuthors, watch] )

  // update form to match url params
  useEffect( () => {
    const fromURL = searchParams.get( QUERY_INDEX )
    const parsed = fromURL ? qs.parse( fromURL, { decoder: decodeBooleanAndNumbers } ) : {}
    if ( Object.keys( updatedDiff( parsed, getValues() ) ).length > 0 )
      reset( defaultsDeep( parsed, defaultValues ), { keepTouched: true } )
  }, [searchParams, getValues, reset] )

  return (
    <FormProvider {...form} >
      <form onSubmit={handleSubmit( () => { } )}>
        <fieldset>
          <h2 className='mx-auto w-fit'>{t( 'title' )}</h2>
          <ErrorMessage
            text={`${currentQuestions.length} ${t( 'questionsLeft' )}`}
            type={currentQuestions.length === 0 ? 'warn' : 'none'}
          />
        </fieldset>
        <TagsFilter/>
        <DeepnessFilter/>
        <OrderFilter/>
        <AuthorFilter/>
      </form>
    </FormProvider>
  )
}
