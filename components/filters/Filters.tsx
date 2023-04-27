import { useTranslation } from 'next-i18next'
import { TriStateSwitchState } from './TriStateSwitch'
import { Question, questions as allQuestions } from '../../public/questions'
import { useEffect } from 'react'
import { DeepPartial, reduceToObject, unique } from '../../helpers/helpers'
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

const possibleDeepnessLevels = allQuestions.map( e => e.deepness ).filter( unique ).sort()
const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'
export const allTags = allQuestions.filter( e => Array.isArray( e.tags ) ).map( e => e.tags as string[] ).flat().filter( unique )
export const QUERY_INDEX = 'filters'

export interface FiltersProps {
  allQuestions: Question[]
  currentQuestions: Question[]
  setQuestions( q: Question[] ): void
  setShowAuthors( showAuthor: boolean ): void
}

interface FiltersObject {
  tags: Record<string, TriStateSwitchState>
  deepness: {min: number, max: number}
  randomness: number
  sets: boolean
  showAuthors: boolean
}

const defaultValues: FiltersObject = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
  deepness: { min: Math.min( ...possibleDeepnessLevels ), max:Math.max( ...possibleDeepnessLevels ) },
  randomness: 0,
  sets: false,
  showAuthors: true,
}

const filterQuestions = ( questions: Question[], value: DeepPartial<FiltersObject> ): Question[] => {
  const { deepness, tags, randomness, sets } = value
  let filtered = questions
  if ( deepness ) {
    filtered = filtered.filter( e => deepness.min === undefined || e.deepness >= deepness.min )
    filtered = filtered.filter( e => deepness.max === undefined || e.deepness <= deepness.max )
  }
  if ( tags )
    filtered = filtered.filter( e => filterTags( e, tags ) )
  if ( !sets ) {
    filtered.sort( ( ) => Math.random() - 0.5 )
    if ( randomness )
      filtered.sort( ( a,b ) =>
        randomness > Math.random() ?
          Math.random() - 0.5 :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      )
  }
  return filtered
}

const filterTags = ( q: Question, tags: Record<string, TriStateSwitchState|undefined> ): boolean => {
  const requiredTags = Object.entries( tags ).filter( e => e[1] === 'REQUIRE' ).map( e => e[0] )
  const prohibitedTags = Object.entries( tags ).filter( e => e[1] === 'PROHIBIT' ).map( e => e[0] )
  if ( !requiredTags.every( tag => q.tags?.includes( tag ) ) ) return false
  if ( prohibitedTags.some( tag => q.tags?.includes( tag ) ) ) return false
  return true
}

export const Filters = ( { allQuestions, currentQuestions, setQuestions, setShowAuthors }: FiltersProps ): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters' } )
  const { replace, query, pathname } = useRouter()
  const form = useForm<FiltersObject>( { defaultValues } )
  const { handleSubmit, watch, reset, getValues } = form

  useEffect( () => {
    const subscription = watch( ( value ) => {
      setQuestions( filterQuestions( allQuestions, value ) )
      if ( value.showAuthors !== undefined ) setShowAuthors( value.showAuthors )
      const diff = updatedDiff( defaultValues, value )
      if ( Object.keys( diff ).length > 0 )
        query[QUERY_INDEX] = qs.stringify( diff, {} )
      else
        delete query[QUERY_INDEX]

      replace( { pathname, query }, { pathname, query }, { scroll: false, shallow: true } )
    } )
    return () => subscription.unsubscribe()
  }, [allQuestions, pathname, query, replace, setQuestions, setShowAuthors, watch] )

  useEffect( () => {
    const fromURL = typeof query[QUERY_INDEX] === 'string' ?
      qs.parse( query[QUERY_INDEX] ,
        {
          decoder: ( str, defaultDecoder, charset, type ) => {
            if ( type === 'value' ) {
              if ( str === 'true' || str === 'false' )
                return str === 'true'
              else if ( /^[\d-]+$/.test( str ) )
                return Number.parseInt( str )
              else if ( /^[\d.-]+$/.test( str ) )
                return Number.parseFloat( str )
            }
            return defaultDecoder( str )
          }
        }
      ) :
      {}
    if ( Object.keys( updatedDiff( fromURL, getValues() ) ).length > 0 )
      reset( defaultsDeep( fromURL, defaultValues ) )
  } , [reset, query, getValues] )

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
