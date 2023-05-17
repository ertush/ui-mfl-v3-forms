
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
} from '@heroicons/react/solid';

import Select from 'react-select';

import { FormContext } from './Forms';

import { useReducer, useContext, useEffect, useRef } from 'react'


export function BasicDetailsForm() {

    // Form Context
    const setFormId = useContext(FormContext);

    const initialFormState = {
        official_name: "",
        name: "",
        facility_type: "",
        facility_type_details: "",
        operation_status: "",
        date_established: "",
        accredited_lab_iso_15189: null,
        owner_type: "",
        owner: "",
        keph_level: "",
        number_of_beds: null,
        number_of_inpatient_beds: null,
        number_of_cots: null,
        number_of_emergency_casualty_beds: null,
        number_of_icu_beds: null,
        number_of_hdu_beds: null,
        number_of_maternity_beds: null,
        number_of_isolation_beds: null,
        number_of_general_theatres: null,
        number_of_maternity_theatres: null,
        facility_catchment_population: null,
        reporting_in_dhis: null,
        admission_status: "",
        nhif_accreditation: null,
        is_classified: null,
        open_whole_day: null,
        open_late_night: null,
        open_public_holidays: null,
        open_weekends: null,
        open_normal_day: null,
        county_id: "",
        sub_county_id: "",
        constituency_id: "",
        ward: "",
        town_name: "",
        plot_number: "",
        nearest_landmark: "",
        location_desc: "",
        facility_checklist_document: null

    }

    // Refs

    const facilityTypeRef = useRef(null);
    const facilityTypeDetailsRef = useRef(null);
    const operationStatusRef = useRef(null);
    const ownerCategoryRef = useRef(null);
    const ownerDetailsRef = useRef(null);
    const kephLevelRef = useRef(null);
    const facilityAdmissionsRef = useRef(null);
    const countyRef = useRef(null);
    const subCountyRef = useRef(null);
    const constituencyRef = useRef(null);
    const wardRef = useRef(null);

    // Form State

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

    // Side Effects

    useEffect(() => {
        if (window && window.localStorage.getItem('basicDetailsForm') !== null) {
            Object.keys(initialFormState).forEach((field) => {
                dispatch({ type: `${field}`, value: JSON.parse(window.localStorage.getItem('basicDetailsForm'))[`${field}`] })
            })
        }

        if (facilityTypeRef.current !== null) {
            facilityTypeRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.facility_type, 'set-value')
        }


        if (facilityTypeDetailsRef.current !== null) {
            facilityTypeDetailsRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.facility_type_details, 'set-value')
        }

        if (operationStatusRef.current !== null) {
            operationStatusRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.operation_status, 'set-value')
        }

        if (ownerCategoryRef.current !== null) {
            ownerCategoryRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.owner_type, 'set-value')
        }

        if (ownerDetailsRef.current !== null) {
            ownerDetailsRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.owner, 'set-value')
        }

        if (kephLevelRef.current !== null) {
            kephLevelRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.keph_level, 'set-value')
        }

        if (facilityAdmissionsRef.current !== null) {
            facilityAdmissionsRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.admission_status, 'set-value')
        }

        if (countyRef.current !== null) {
            countyRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.county_id, 'set-value')
        }

        if (subCountyRef.current !== null) {
            subCountyRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.sub_county_id, 'set-value')
        }

        if (constituencyRef.current !== null) {
            constituencyRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.constituency_id, 'set-value')
        }

        if (wardRef.current !== null) {
            wardRef.current.setValue(JSON.parse(window.localStorage.getItem('basicDetailsForm'))?.ward, 'set-value')
        }
    }, [])


    useEffect(() => {

        const storeFields = {};

        Object.keys(initialFormState).forEach((field) => {

            storeFields[`${field}`] = formState[`${field}`];

            if (
                window &&
                formState[`${field}`] !== '' &&
                formState[`${field}`] !== null 
            ) {
                window.localStorage.setItem('basicDetailsForm', JSON.stringify(storeFields))
            }
        })


    }, (() => Object.keys(initialFormState).map((field) => formState[`${field}`]))())

    // Form handlers

    const handleSubmit = () => {
        console.log({ ...formState })
        setFormId(prev => (prev + 1))
    }


    const handlePrevious = () => {
        setFormId(prev => (prev - 1))
    }

    // Render
    return (
        <>
            <h4 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
                Facility Basic Details
            </h4>
            <form

                className='flex flex-col w-full items-start justify-start gap-3'
                onSubmit={handleSubmit}>

                {/* Facility Official Name */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='official_name'
                        className='text-gray-600 capitalize text-sm'>
                        Facility Official Name
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='text'
                        value={formState.official_name}
                        onChange={(e) => { dispatch({ type: e.target.name, value: e.target.value }) }}
                        name='official_name'
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                </div>
                {/* Facility Unique Name  */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='name'
                        className='text-gray-600 capitalize text-sm'>
                        Facility Unique Name
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='text'
                        value={formState.name}
                        onChange={(e) => { dispatch({ type: e.target.name, value: e.target.value }) }}
                        name='name'
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                </div>
                {/* Facility Type */}

                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='facility_type'
                        className='text-gray-600 capitalize text-sm'>
                        Facility Type{' '}
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>

                    <Select
                        ref={facilityTypeRef}
                        options={[{ value: 1, label: "MOH" }, { value: 2, label: "Private" }, { value: 3, label: "NGO" }]}
                        required
                        placeholder='Select a facility type...'
                        onChange={(option) => {
                            dispatch({ type: 'facility_type', value: { label: option?.label, value: option?.value } })
                        }}
                        name='facility_type'
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />
                </div>

                {/* Facility Type Details */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='facility_type_details'
                        className='text-gray-600 capitalize text-sm'>
                        Facility Type Details
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <Select
                        ref={facilityTypeDetailsRef}
                        options={[{ value: 1, label: "gov" }, { value: 2, label: "phamarcy" }, { value: 3, label: "clinic" }]}
                        required
                        placeholder='Select a facility type details...'
                        onChange={(option) => {
                            dispatch({ type: 'facility_type_details', value: { label: option?.label, value: option?.value } })
                        }}
                        name='facility_type_details'
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />

                </div>

                {/* Operation Status */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='operation_status'
                        className='text-gray-600 capitalize text-sm'>
                        Operation Status{' '}
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <Select
                        ref={operationStatusRef}
                        options={[
                            {
                                value: '190f470f-9678-47c3-a771-de7ceebfc53c',
                                label: 'Non-Operational',
                            },
                            {
                                value: 'ae75777e-5ce3-4ac9-a17e-63823c34b55e',
                                label: 'Operational',
                            },
                        ]}
                        required
                        onChange={(option) => {
                            dispatch({ type: 'operation_status', value: { label: option?.label, value: option?.value } })
                        }}
                        placeholder='Select an operation status...'
                        name='operation_status'
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />
                </div>

                {/* Date Established */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='date_established'
                        className='text-gray-600 capitalize text-sm'>
                        Date Established
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        onChange={(e) => { dispatch({ type: e.target.name, value: e.target.value }) }}
                        value={formState.date_established}
                        type='date'
                        name='date_established'
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                </div>

                {/* Is Facility accredited */}
                <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                    <label
                        htmlFor='accredited_lab_iso_15189'
                        className='text-gray-700 capitalize text-sm flex-grow'>
                        *Is the facility accredited Lab ISO 15189?{' '}
                    </label>
                    <span className='flex items-center gap-x-1'>
                        <input
                            type='radio'
                            name='accredited_lab_iso_15189'
                            id='open_whole_day_yes'
                            checked={formState.accredited_lab_iso_15189 !== null ? Boolean(formState.accredited_lab_iso_15189) : false}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: true })
                            }}
                        />
                        <small className='text-gray-700'>Yes</small>
                    </span>
                    <span className='flex items-center gap-x-1'>
                        <input
                            type='radio'
                            name='accredited_lab_iso_15189'
                            id='open_whole_day_no'
                            checked={formState.accredited_lab_iso_15189 !== null ? !Boolean(formState.accredited_lab_iso_15189) : false}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: false })
                            }}
                        />
                        <small className='text-gray-700'>No</small>
                    </span>
                </div>

                {/* Owner Category */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='owner_type'
                        className='text-gray-600 capitalize text-sm'>
                        Owner Category
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <Select
                        ref={ownerCategoryRef}
                        options={[{ value: 1, label: "FBO" }, { value: 2, label: "HDU" }, { value: 3, label: "XBO" }]}
                        required
                        placeholder='Select owner..'
                        name='owner_type'
                        onChange={(option) => {
                            dispatch({ type: 'owner_type', value: { label: option?.label, value: option?.value } })
                        }}
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />
                </div>

                {/* Owner Details */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='owner'
                        className='text-gray-600 capitalize text-sm'>
                        Owner Details
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <Select
                        ref={ownerDetailsRef}
                        options={[{ value: 1, label: "JKO" }, { value: 2, label: "CLB" }, { value: 3, label: "TYO" }]}
                        required
                        placeholder='Select an owner..'
                        onChange={(option) => {
                            dispatch({ type: 'owner', value: { label: option?.label, value: option?.value } })
                        }}
                        name='owner'
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />
                </div>

                {/* KEPH Level */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='keph_level'
                        className='text-gray-600 capitalize text-sm'>
                        KEPH Level
                    </label>
                    <Select
                        ref={kephLevelRef}
                        options={[{ value: 1, label: "DLP" }, { value: 2, label: "XRT" }, { value: 3, label: "NGO" }]}
                        isOptionDisabled={(option) => true}
                        onChange={(option) => {
                            dispatch({ type: 'owner', value: { label: option?.label, value: option?.value } })
                        }}
                        placeholder='Select a KEPH Level..'
                        name='keph_level'
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />
                </div>

                {/* Total Functional In-patient Beds */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Total Functional In-patient Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_beds}
                        readOnly

                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />


                </div>


                {/* No of General In-patient Beds */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_inpatient_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Number of General In-patient Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_inpatient_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_inpatient_beds}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>


                </div>

                {/* No. Functional cots */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_cots'
                        className='text-gray-600 capitalize text-sm'>
                        Number of Functional Cots
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_cots'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_cots}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>
                </div>

                {/* No. Emergency Casulty Beds */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_emergency_casualty_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Number of Emergency Casulty Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_emergency_casualty_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_emergency_casualty_beds}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>


                {/* No. Intensive Care Unit Beds */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_icu_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Number of Intensive Care Unit (ICU) Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_icu_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_icu_beds}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>


                {/* No. High Dependency Unit HDU */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_hdu_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Number of High Dependency Unit (HDU) Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_hdu_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_hdu_beds}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>

                {/* No. of maternity beds */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_maternity_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Number of Maternity Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_maternity_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_maternity_beds}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>

                {/* No. of Isolation Beds */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_isolation_beds'
                        className='text-gray-600 capitalize text-sm'>
                        Number of Isolation Beds
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_isolation_beds'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_isolation_beds}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>

                {/* No. of General Theatres */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_general_theatres'
                        className='text-gray-600 capitalize text-sm'>
                        Number of General Theatres
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_general_theatres'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_general_theatres}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>

                {/* No. of Maternity Theatres */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='number_of_maternity_theatres'
                        className='text-gray-600 capitalize text-sm'>
                        Number of Maternity Theatres
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <input
                        required
                        type='number'
                        min={0}
                        name='number_of_maternity_theatres'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.number_of_maternity_theatres}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>

                {/* Facility Catchment Population */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='facility_catchment_population'
                        className='text-gray-600 capitalize text-sm'>
                        Facility Catchment Population
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}

                        </span>
                    </label>
                    <input

                        type='number'
                        min={0}
                        name='facility_catchment_population'
                        onChange={(e) => {
                            dispatch({ type: e.target.name, value: e.target.value })
                        }}
                        value={formState.facility_catchment_population}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

                </div>

                {/* Is Reporting DHIS2 */}
                <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                    <label
                        htmlFor='reporting_in_dhis'
                        className='text-gray-700 capitalize text-sm flex-grow'>
                        *Should this facility have reporting in DHIS2?{' '}
                    </label>
                    <span className='flex items-center gap-x-1'>
                        <input
                            type='radio'
                            checked={formState.reporting_in_dhis !== null ? Boolean(formState.reporting_in_dhis) : false}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: true })
                            }}
                            name='reporting_in_dhis'
                            id='reporting_in_dhis_yes'

                        />
                        <small className='text-gray-700'>Yes</small>
                    </span>
                    <span className='flex items-center gap-x-1'>
                        <input
                            type='radio'
                            checked={formState.reporting_in_dhis !== null ? !Boolean(formState.reporting_in_dhis) : false}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: false })
                            }}
                            name='reporting_in_dhis'
                            id='reporting_in_dhis_no'

                        />
                        <small className='text-gray-700'>No</small>
                    </span>
                </div>

                {/* Facility Admissions */}
                <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                    <label
                        htmlFor='admission_status'
                        className='text-gray-600 capitalize text-sm'>
                        Facility admissions
                        <span className='text-medium leading-12 font-semibold'>
                            {' '}
                            *
                        </span>
                    </label>
                    <Select
                        ref={facilityAdmissionsRef}
                        options={[{ value: 1, label: "Not admitting" }, { value: 2, label: "Admission" }, { value: 3, label: "None" }]}
                        required
                        placeholder='Select an admission status..'
                        onChange={(option) => {
                            dispatch({ type: 'admission_status', value: { label: option?.label, value: option?.value } })
                        }}
                        name='admission_status'
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                    />
                </div>

                {/* Is NHIF accredited */}
                <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                    <label
                        htmlFor='nhif_accreditation'
                        className='text-gray-700 capitalize text-sm flex-grow'>
                        {' '}
                        *Does this facility have NHIF accreditation?{' '}
                    </label>
                    <span className='flex items-center gap-x-1'>
                        <input
                            type='radio'
                            checked={formState.nhif_accreditation !== null ? Boolean(formState.nhif_accreditation) : false}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: true })
                            }}
                            name='nhif_accreditation'
                            id='nhif_accreditation_yes'

                        />
                        <small className='text-gray-700'>Yes</small>
                    </span>
                    <span className='flex items-center gap-x-1'>
                        <input
                            type='radio'
                            checked={formState.nhif_accreditation !== null ? !Boolean(formState.nhif_accreditation) : false}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: false })
                            }}
                            name='nhif_accreditation'
                            id='nhif_accreditation_no'

                        />
                        <small className='text-gray-700'>No</small>
                    </span>
                </div>

                {/* Armed Forces Facilities */}

                <div className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50 h-auto'>
                    <h4 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
                        Armed Forces Facilities
                    </h4>
                    <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                        <input
                            type='checkbox'
                            checked={formState.is_classified}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.checked })
                            }}
                            name='is_classified'
                            id='is_armed_forces'

                        />
                        <label
                            htmlFor='is_classified'
                            className='text-gray-700 capitalize text-sm flex-grow'>
                            {' '}
                            Is this an Armed Force facility?{' '}
                        </label>
                    </div>
                </div>

                {/* Hours/Days of Operation */}

                <div className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50 h-auto'>
                    <h4 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
                        Hours/Days of Operation
                    </h4>
                    <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                        <input
                            type='checkbox'

                            name='open_whole_day'
                            id='open_24hrs'
                            checked={formState.open_whole_day}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.checked })
                            }}

                        />
                        <label
                            htmlFor='open_24hrs'
                            className='text-gray-700 capitalize text-sm flex-grow'>
                            {' '}
                            Open 24 hours
                        </label>
                    </div>

                    <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                        <input
                            type='checkbox'

                            name='open_late_night'
                            id='open_late_night'
                            checked={formState.open_late_night}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.checked })
                            }}


                        />
                        <label
                            htmlFor='open_late_night'
                            className='text-gray-700 capitalize text-sm flex-grow'>
                            {' '}
                            Open Late Night
                        </label>
                    </div>

                    <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                        <input
                            type='checkbox'

                            name='open_public_holidays'
                            id='open_public_holidays'
                            checked={formState.open_public_holidays}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.checked })
                            }}


                        />
                        <label
                            htmlFor='open_public_holidays'
                            className='text-gray-700 capitalize text-sm flex-grow'>
                            {' '}
                            Open on public holidays
                        </label>
                    </div>

                    <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                        <input
                            type='checkbox'

                            name='open_weekends'
                            id='open_weekends'
                            checked={formState.open_weekends}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.checked })
                            }}

                        />
                        <label
                            htmlFor='open_weekends'
                            className='text-gray-700 capitalize text-sm flex-grow'>
                            {' '}
                            Open during weekends
                        </label>
                    </div>

                    <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                        <input
                            type='checkbox'

                            name='open_normal_day'
                            id='open_8_5'
                            checked={formState.open_normal_day}
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.checked })
                            }}

                        />
                        <label
                            htmlFor='open_normal_day'
                            className='text-gray-700 capitalize text-sm flex-grow'>
                            {' '}
                            Open from 8am to 5pm
                        </label>
                    </div>
                </div>

                {/* Location Details */}
                <div className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50 h-auto'>
                    <h4 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
                        Location Details
                    </h4>
                    <div className='grid grid-cols-4 place-content-start gap-3 w-full'>
                        {/* County  */}
                        <div className='col-start-1 col-span-1'>
                            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                                <label
                                    htmlFor='county_id'
                                    className='text-gray-600 capitalize text-sm'>
                                    County
                                    <span className='text-medium leading-12 font-semibold'>
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <Select
                                    ref={countyRef}
                                    options={[{ value: 1, label: "Kericho" }, { value: 2, label: "Nairobi" }, { value: 3, label: "Machakos" }]}
                                    required
                                    placeholder='Select County'
                                    onChange={(option) => {
                                        dispatch({ type: 'county_id', value: { label: option?.label, value: option?.value } })
                                    }}

                                    name='county_id'
                                    className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                                />
                            </div>
                        </div>

                        {/* Sub-county */}
                        <div className='col-start-2 col-span-1'>
                            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                                <label
                                    htmlFor='sub_county_id'
                                    className='text-gray-600 capitalize text-sm'>
                                    Sub-county
                                    <span className='text-medium leading-12 font-semibold'>
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <Select
                                    ref={subCountyRef}
                                    options={[{ value: 1, label: "Chepalungu" }, { value: 2, label: "Moiben" }, { value: 3, label: "Kapasaret" }]}
                                    required
                                    placeholder='Select Sub County'
                                    onChange={(option) => {
                                        dispatch({ type: 'sub_county_id', value: { label: option?.label, value: option?.value } })
                                    }}
                                    name='sub_county_id'

                                    className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                                />
                            </div>
                        </div>

                        {/* Constituency */}
                        <div className='col-start-3 col-span-1'>
                            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                                <label
                                    htmlFor='constituency_id'
                                    className='text-gray-600 capitalize text-sm'>
                                    Constituency
                                    <span className='text-medium leading-12 font-semibold'>
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <Select
                                    ref={constituencyRef}
                                    options={[{ value: 1, label: "Chepalungu" }, { value: 2, label: "Moiben" }, { value: 3, label: "Kapasaret" }]}
                                    required
                                    placeholder='Select Constituency'
                                    onChange={(option) => {
                                        dispatch({ type: 'constituency_id', value: { label: option?.label, value: option?.value } })
                                    }}
                                    name='constituency_id'
                                    className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                                />
                            </div>
                        </div>

                        {/* Ward */}
                        <div className='col-start-4 col-span-1'>
                            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                                <label
                                    htmlFor='ward'
                                    className='text-gray-600 capitalize text-sm'>
                                    Ward
                                    <span className='text-medium leading-12 font-semibold'>
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <Select
                                    ref={wardRef}
                                    options={[{ value: 1, label: "Chepalungu" }, { value: 2, label: "Moiben" }, { value: 3, label: "Kapasaret" }]}
                                    required
                                    placeholder='Select Ward'
                                    onChange={(option) => {
                                        dispatch({ type: 'ward', value: { label: option?.label, value: option?.value } })
                                    }}
                                    name='ward'
                                    className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nearest Town/Shopping Centre */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                        <label
                            htmlFor='town_name'
                            className='text-gray-600 capitalize text-sm'>
                            Nearest Town/Shopping Centre
                            <span className='text-medium leading-12 font-semibold'>
                                {' '}

                            </span>
                        </label>
                        <input
                            type='text'
                            onChange={(e) => {

                                dispatch({ type: e.target.name, value: e.target.value })
                            }}
                            value={formState.town_name}
                            name='town_name'
                            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                        />
                    </div>

                    {/* Plot Number */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                        <label
                            htmlFor='plot_number'

                            className='text-gray-600 capitalize text-sm'>
                            Plot number
                            <span className='text-medium leading-12 font-semibold'>
                                {' '}

                            </span>
                        </label>
                        <input

                            type='text'
                            onChange={(e) => {

                                dispatch({ type: e.target.name, value: e.target.value })
                            }}
                            value={formState.plot_number}
                            name='plot_number'
                            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                        />
                    </div>

                    {/* Nearest landmark */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                        <label
                            htmlFor='nearest_landmark'
                            className='text-gray-600 capitalize text-sm'>
                            Nearest landmark
                            <span className='text-medium leading-12 font-semibold'>
                                {' '}

                            </span>
                        </label>
                        <input

                            type='text'
                            name='nearest_landmark'
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.value })
                            }}
                            value={formState.nearest_landmark}
                            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                        />
                    </div>

                    {/* Location Description */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                        <label
                            htmlFor='location_desc'
                            className='text-gray-600 capitalize text-sm'>
                            location description
                            <span className='text-medium leading-12 font-semibold'>
                                {' '}

                            </span>
                        </label>
                        <input

                            type='text'
                            onChange={(e) => {
                                dispatch({ type: e.target.name, value: e.target.value })
                            }}
                            value={formState.location_desc}
                            name='location_desc'
                            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                        />
                    </div>
                </div>

                {/* check file upload */}
                <div className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50 h-auto'>
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                        <label
                            htmlFor='facility_checklist_document'
                            className='text-gray-600 capitalize text-sm'>
                            checklist file upload
                            <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                            </span>
                        </label>

                        <input
                            required

                            type='file'
                            onChange={(e) => null}
                            name='facility_checklist_document'
                            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                        />
                    </div>
                </div>

                {/* Cancel & Geolocation */}
                <div className='flex justify-between items-center w-full'>
                    <button onClick={handlePrevious} className='flex items-center justify-start space-x-2 p-1 border-2 border-black rounded px-2'>
                        <ChevronDoubleLeftIcon className='w-4 h-4 text-black' />
                        <span className='text-medium font-semibold text-black '>
                            Cancel
                        </span>
                    </button>
                    <button
                        type='submit'
                        className='flex items-center justify-start space-x-2 bg-indigo-500 rounded p-1 px-2'>
                        <span className='text-medium font-semibold text-white'>
                            Geolocation
                        </span>
                        <ChevronDoubleRightIcon className='w-4 h-4 text-white' />
                    </button>
                </div>
            </form>
        </>
    )
}