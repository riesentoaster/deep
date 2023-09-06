import { FiltersObject, FiltersProps, QUERY_INDEX, defaultValues } from './filtersHelpers'
import { Dropdown } from '../shared/Dropdown'
import { useTranslation } from 'react-i18next'

import { questions as allQuestions } from '../../questions'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { updatedDiff } from 'deep-object-diff'
import qs from 'qs'
import defaultsDeep from 'lodash.defaultsdeep'
import { ErrorMessage } from '../shared/ErrorMessage'
import 'rc-slider/assets/index.css'
import {
  decodeBooleanAndNumbers,
  filterQuestions,
} from './filtersHelpers'
import { useSearchParams } from 'react-router-dom'
import { TagsFilter } from './form-elements/TagsFilter'
import { DeepnessFilter } from './form-elements/DeepnessFilter'
import { OrderFilter } from './form-elements/OrderFilter'
import { AuthorFilter } from './form-elements/AuthorFilter'
import { Menu } from './Menu'

export const Header = ( {
  currentQuestions,
  setQuestions,
  setShowAuthors
}: FiltersProps ): JSX.Element => {
  const { t } = useTranslation( 'common' )

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
    <header className='p-10 border-b'>
      <Dropdown className='w-full' defaultHiddenState={true} title={t( 'deep' )}>
        <div className='flex flex-wrap flex-row w-full justify-evenly'>
          <FormProvider {...form} >
            <form onSubmit={handleSubmit( () => { } )}>
              <fieldset><Menu/></fieldset>
              <fieldset>
                <TagsFilter/>
                <DeepnessFilter/>
                <ErrorMessage
                  text={`${currentQuestions.length} ${t( 'header.questionsLeft' )}`}
                  type={currentQuestions.length === 0 ? 'warn' : 'none'}
                />
              </fieldset>
              <fieldset><OrderFilter/></fieldset>
              <fieldset><AuthorFilter/></fieldset>
            </form>
          </FormProvider>

        </div>
      </Dropdown>
    </header>
  )
}
