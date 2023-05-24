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

  const setFormId = useContext(FormContext)
  
  const options = useContext(FormOptionsContext)
  

  const [facilityContacts, setFacilityContacts] = useState([
    (() => (
      <FacilityContact
        contactTypeOptions={options['11']?.contact_types}
        fieldNames={['contact_type', 'contact']}
        setFacilityContacts={() => null}
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
        setFacilityContacts={() => null}
        index={0}
      />
    ))()
  ])

  const handleSubmit = () => {
    console.log({ ...formState })
    setFormId(prev => (prev + 1))
}


const handlePrevious = () => {
    setFormId(prev => (prev - 1))
}


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

              facilityContact

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
              (() => (
                <FacilityContactsContext.Provider value={facilityContacts} key={(facilityContacts.length + 1) - 1}>
                  <FacilityContact
                    contactTypeOptions={options['11']?.contact_types}
                    setFacilityContacts={setFacilityContacts}
                    contacts={[null, null, null]}
                    fieldNames={['contact_type', 'contact']}
                    index={(facilityContacts.length + 1) - 1}

                  />
                </FacilityContactsContext.Provider>
              ))()


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
          <Select options={options['12']?.job_titles}
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
                <React.Fragment id={i} >
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
                  (() => (
                    <FacilityContactsContext.Provider value={officerContactDetails} key={(officerContactDetails.length + 1) - 1}>
                      <OfficerContactDetails
                        contactTypeOptions={options['11']?.contact_types}
                        setFacilityContacts={setOfficerContactDetails}
                        contacts={[null, null, null]}
                        fieldNames={['officer_details_contact_type', 'officer_details_contact']}
                        index={(officerContactDetails.length + 1) - 1}

                      />
                    </FacilityContactsContext.Provider>
                  ))()

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

