import { useTranslation } from 'next-i18next'
import { TriStateSwitchState } from './TriStateSwitch'
import { Question, questions as allQuestions } from '../../public/questions'
import { useEffect } from 'react'
import { unique } from '../../helpers/helpers'
import { FormProvider, useForm } from 'react-hook-form'
import { updatedDiff } from 'deep-object-diff'
import { useRouter } from 'next/router'
import qs from 'qs'
import defaultsDeep from 'lodash.defaultsdeep'
import { ErrorMessage } from '../ErrorMessage'
import 'rc-slider/assets/index.css'
import { TagsFilter } from './form-elements/TagsFilter'
import { DeepnessFilter } from './form-elements/DeepnessFilter'
import { OrderFilter } from './form-elements/OrderFilter'
import { AuthorFilter } from './form-elements/AuthorFilter'
import {
  concretizePathname,
  decodeBooleanAndNumbers,
  filterQuestions,
  reduceToObject,
  updateQuery
} from './filtersHelpers'

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
  allQuestions: Question[]
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

const defaultValues: FiltersObject = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
  deepness: { min: minDeepness, max: maxDeepness },
  randomness: 0,
  sets: false,
  showAuthors: true,
}

export const Filters = ( {
  allQuestions,
  currentQuestions,
  setQuestions,
  setShowAuthors
}: FiltersProps ): JSX.Element => {

  const { t } = useTranslation( 'common', { keyPrefix: 'filters' } )
  const { replace, query, pathname } = useRouter()
  const form = useForm<FiltersObject>( { defaultValues } )
  const { handleSubmit, watch, reset, getValues } = form

  useEffect( () => {
    const subscription = watch( ( value ) => {
      setQuestions( filterQuestions( allQuestions, value ) )
      if ( value.showAuthors !== undefined ) setShowAuthors( value.showAuthors )
      updateQuery( query, defaultValues, value )
      const concretizedPathname = concretizePathname( pathname, query )

      replace(
        { pathname: concretizedPathname, query },
        { pathname: concretizedPathname, query },
        { scroll: false, shallow: true }
      )
    } )
    return () => subscription.unsubscribe()
  }, [allQuestions, pathname, query, replace, setQuestions, setShowAuthors, watch] )

  useEffect( () => {
    const fromURL = typeof query[QUERY_INDEX] === 'string' ?
      qs.parse( query[QUERY_INDEX], { decoder: decodeBooleanAndNumbers } ) :
      {}
    if ( Object.keys( updatedDiff( fromURL, getValues() ) ).length > 0 )
      reset( defaultsDeep( fromURL, defaultValues ) )
  }, [reset, query, getValues] )

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
