import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  PlusIcon,
} from '@heroicons/react/solid';

import Select from 'react-select';

import { FacilityContact } from './formComponents/FacilityContacts';
import { OfficerContactDetails } from './formComponents/FacilityContacts';

import React, { useState, useReducer, useContext } from 'react';

import { FacilityContactsContext } from './Forms';
import { FormOptionsContext } from '@/pages';
import { FormContext } from './Forms';

export function FacilityContactsForm() {
  
  const contactIndexReducer = (state, action) => {
     switch(action.type){
      case "facility":
        return {
          ...state,
          facility: action.value
        }
      case "officer":
          return {
            ...state,
            officer: action.value
          }
      default:
        return state

     }
  }

  
  const [contactIndex, dispatchContactIndex] = useReducer(contactIndexReducer, {
    facility: 1,
    officer: 1
  })


  const contactFields = [...Array(contactIndex.facility).keys()].map(i => ({
    ['contact_type_'+i]: "",
    ['contact_'+i]: ""
  
  }))

  const officerFields =  [...Array(contactIndex.officer).keys()].map(i => ({
    ['officer_details_contact_type_'+i]: "",
    ['officer_details_contact_'+i]: ""
  }))


  const initialFormState =  {
      officer_name:"",
      officer_reg_no:"",
      officer_title:"" 
  }

  contactFields.forEach((obj, i) => {
    initialFormState[Object.keys(obj)[0]] = Object.values(obj)[0]
  })

  officerFields.forEach((obj, i) => {
    initialFormState[Object.keys(obj)[0]] = Object.values(obj)[0]
  })
  
  
  console.log({initialFormState})

  
  // const formReducer = (state, action) => {
  //   if (Object.keys(initialFormState).includes(action.type)) {
  //     return {
  //       ...state,
  //       [action.type]: action.value
  //     }
  //   } else {
  //     return state
  //   }
  // }

  const setFormId = useContext(FormContext)
  
  const options = useContext(FormOptionsContext)
  

  const [facilityContacts, setFacilityContacts] = useState([
    (() => (
      <FacilityContact
        contactTypeOptions={options['11']?.contact_types}
        fieldNames={['contact_type', 'contact']}
        setFacilityContacts={() => null}
        setIndex={() => null}
        contacts={[null, null, null]}
        index={0}
      />
    ))()
  ])

  const [officerContactDetails, setOfficerContactDetails] = useState([
    (() => (
      <OfficerContactDetails
        contactTypeOptions={options['11']?.contact_types}
        fieldNames={['officer_details_contact_type', 'officer_details_contact']}
        contacts={[null, null, null]}
        setIndex={() => null}
        setFacilityContacts={() => null}
        index={0}
      />
    ))()
  ])

  const formReducer = (state, action) => {
    if (Object.keys(initialFormState).includes(action.type)) {
      return {
          ...state,
          [action.type]: action.value
      }
  } else {
      return state
  }
}
  
const [formState, dispatch] = useReducer(formReducer, initialFormState)


useEffect(() => {

  if (window && window.sessionStorage.getItem('facilityContactForm') !== null) {
      Object.keys(initialFormState).forEach((field) => {
         
            dispatch({ type: `${field}`, value: JSON.parse(window.sessionStorage.getItem('facilityContactForm'))[`${field}`] })

      })
  
  if (facilityTypeRef.current !== null) {
      facilityTypeRef.current.setValue(JSON.parse(window.sessionStorage.getItem('facilityContactForm'))?.facility_type, 'set-value')
  
  }


  if (facilityTypeDetailsRef.current !== null) {
      facilityTypeDetailsRef.current.setValue(JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.facility_type_details, 'set-value')
  }

}

// Initialize Select Options

}, [])


  const handleSubmit = () => {
    console.log({ ...formState })
    setFormId(prev => (prev + 1))
}


const handlePrevious = () => {
    setFormId(prev => (prev - 1))
}

// Ref

const officerTitleRef = useRef();


  return (
    <form

      className='flex flex-col w-full items-start justify-start gap-3'
      name='facility_contacts_form'
      onSubmit={handleSubmit}>
      {/* Contacts */}

      <div
        className='grid grid-cols-2 place-content-start gap-3 w-full border-2 border-gray-200 rounded p-3'
      >
        {/* Contact Headers */}
        <h3 className='text-medium font-semibold text-blue-900'>
          Contact Type
        </h3>
        <h3 className='text-medium font-semibold text-blue-900'>
          Contact Details
        </h3>
        <hr className='col-span-2' />

        {/* Contact Type / Contact Details */}


        {/* add other fields */}
        <div className='col-span-2 flex-col w-full items-start justify-start gap-y-3 '>
          {
            facilityContacts.map((facilityContact, i) => (
              <React.Fragment key={i}>
                {facilityContact}
              </React.Fragment>

            ))
          }
        </div>

      </div>

      <div className='w-full flex justify-end items-center'>
        <button
          onClick={(e) => {
            e.preventDefault();

            setFacilityContacts([
              ...facilityContacts,
              (() => {
                dispatchContactIndex({type:"facility", value: (contactIndex.facility + 1)})
                return (
                <FacilityContactsContext.Provider value={facilityContacts} key={contactIndex.facility}>
                  <FacilityContact
                    contactTypeOptions={options['11']?.contact_types}
                    setFacilityContacts={setFacilityContacts}
                    contacts={[null, null, null]}
                    setIndex={dispatchContactIndex}
                    count={facilityContacts.length}
                    dispatch={dispatch}
                    index={contactIndex.facility}

                  />
                </FacilityContactsContext.Provider>
                )
          })()


            ])
          }}
          className='flex items-center space-x-1 bg-indigo-500 p-1 rounded'>
          <PlusIcon className='w-4 h-4 text-white' />
          <p className='text-medium font-semibold text-white'>
            Add
          </p>
        </button>
      </div>

      {/* Facility Officer In-charge Details */}

      <h5 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
        Facility Officer In-Charge Details
      </h5>
      <div className='flex flex-col items-start justify-start gap-1 w-full rounded h-auto'>
        {/*  Name  */}
        <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
          <label
            htmlFor='name'
            className='text-gray-600 capitalize text-sm'>
            Name
            <span className='text-medium leading-12 font-semibold'>
              {' '}
              *
            </span>
          </label>
          <input
            required
            type='text'
            name='officer_name'
            onChange={() => {dispatch({ type: e.target.name, value: e.target.value })}}
            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
          />
        </div>

        {/*  Registration Number */}
        <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
          <label
            htmlFor='reg_no'
            className='text-gray-600 capitalize text-sm'>
            Registration Number/License Number{' '}
          </label>
          <input
            type='text'
            name='officer_reg_no'
            onChange={() => {dispatch({ type: e.target.name, value: e.target.value })}}
            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
          />
        </div>

        {/* Job Title */}
        <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
          <label
            htmlFor='title'
            className='text-gray-600 capitalize text-sm'>
            Job Title
            <span className='text-medium leading-12 font-semibold'>
              {' '}
              *
            </span>{' '}
          </label>
          <Select
            ref={officerTitleRef} 
            options={options['10']?.job_titles}
            required
            placeholder="Select Job Title"
            name="officer_title"
            className="flex-none col-start-1 w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
        </div>

        {/* Facility Officer Contact Type / Contact Details */}

        <div
          className='grid grid-cols-2 place-content-start gap-3 w-full border-2 border-gray-200 rounded p-3'
        >
          {/* Contact Headers */}
          <h3 className='text-medium font-semibold text-blue-900'>
            Contact Type
          </h3>
          <h3 className='text-medium font-semibold text-blue-900'>
            Contact Details
          </h3>
          <hr className='col-span-2' />

          {/* Contact Type / Contact Details */}



          <div className='col-span-2 flex-col w-full items-start justify-start gap-y-3 '>
            {
              officerContactDetails.map((officerDetailContact, i) => (
                <React.Fragment key={i}>
                 {officerDetailContact}
                 </React.Fragment>
              ))
            }
          </div>

        </div>

        <div className='w-full flex justify-end items-center mt-2'>
          <button
            onClick={
              (e) => {
                e.preventDefault();
                setOfficerContactDetails([
                  ...officerContactDetails,
                  (() => {
                  dispatchContactIndex({type:"officer", value:(officerContactDetails.length + 1) - 1})
                    
                    return(
                    <FacilityContactsContext.Provider value={officerContactDetails} key={(officerContactDetails.length + 1) - 1}>
                      <OfficerContactDetails
                        contactTypeOptions={options['11']?.contact_types}
                        setFacilityContacts={setOfficerContactDetails}
                        contacts={[null, null, null]}
                        setIndex={dispatchContactIndex}
                        dispatch={dispatch}
                        index={contactIndex.officer}

                      />
                    </FacilityContactsContext.Provider>
                    )
              })()

                  /*(facilityDepts[facilityDepts.length - 1] + facilityDepts.length)*/
                ])
              }}
            className='flex items-center space-x-1 bg-indigo-500 p-1 rounded'>
            <PlusIcon className='w-4 h-4 text-white' />
            <p className='text-medium font-semibold text-white'>
              Add
            </p>
          </button>
        </div>
      </div>

      <div className='flex justify-between items-center w-full'>
        <button
          onClick={handlePrevious}
          className='flex items-center justify-start space-x-2 p-1 border-2 border-black rounded px-2'>
          <ChevronDoubleLeftIcon className='w-4 h-4 text-black' />
          <span className='text-medium font-semibold text-black '>
            Geolocation
          </span>
        </button>
        <button
          type='submit'
          className='flex items-center justify-start space-x-2 bg-indigo-500 rounded p-1 px-2'>
          <span className='text-medium font-semibold text-white'>
            Regulation
          </span>
          <ChevronDoubleRightIcon className='w-4 h-4 text-white' />
        </button>
      </div>
    </form>
  )
}

