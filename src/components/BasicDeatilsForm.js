
import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
} from '@heroicons/react/solid';
import Select from '../components/formComponents/Select';
import { FormContext } from './Forms';
import { useContext, useEffect, useRef } from 'react';
import { FormOptionsContext } from '@/pages';
import { useFormik } from 'formik';




export function BasicDetailsForm() {

     // Options Context
     const options = useContext(FormOptionsContext)

    // Form Context
    const setFormId = useContext(FormContext);



    const initialFormState = {
        official_name: "",
        name: "",
        facility_type: "",
        facility_type_details: "",
        operation_status: "",
        date_established: "",
        accredited_lab_iso_15189: undefined,
        owner_type: "",
        owner: "",
        keph_level: "",
        number_of_beds: "",
        number_of_inpatient_beds: "",
        number_of_cots: "",
        number_of_emergency_casualty_beds: "",
        number_of_icu_beds: "",
        number_of_hdu_beds: "",
        number_of_maternity_beds: "",
        number_of_isolation_beds: "",
        number_of_general_theatres: "",
        number_of_maternity_theatres: "",
        facility_catchment_population: "",
        reporting_in_dhis: undefined,
        admission_status: "",
        nhif_accreditation: undefined,
        is_classified: undefined,
        open_whole_day: undefined,
        open_late_night: undefined,
        open_public_holidays: undefined,
        open_weekends: undefined,
        open_normal_day: undefined,
        county_id: "",
        sub_county_id: "",
        constituency_id: "",
        ward: "",
        town_name: "",
        plot_number: "",
        nearest_landmark: "",
        location_desc: "",
        facility_checklist_document: undefined

    }

    const formik = useFormik({
        initialValues: initialFormState,
        onSubmit: values => console.log({ ...values })
    
      });

    // Options
    const facilityTypeOptions = (() => {
        const f_types = [
            'STAND ALONE',
            'DISPENSARY',
            'MEDICAL CLINIC',
            'NURSING HOME',
            'HOSPITALS',
            'HEALTH CENTRE',
            'MEDICAL CENTER'
        ]

        const all_ftypes = []

        for (let type in f_types) all_ftypes.push(options['0']?.facility_types.filter(({ sub_division }) => sub_division === f_types[type]))

        return all_ftypes.map(arr => ({
            label: arr[0]?.sub_division,
            value: arr[0]?.parent
        }));

    })()

    const ownerDetailsOption = (() => {
    	
        const label = options['3']?.owner_types.find(({value}) => value == formik.values.owner_type)?.label;
        					
        switch(label){
            case "Private Practice":


                return [
                    options['2']?.owners.filter(({label}) => label == "Private Practice- Pharmacist")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice - Private Company")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice Lab Technician/Technologist")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice - Nurse / Midwifery")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice - Medical Specialist")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice - General Practitioner")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice - Clinical Officer")[0] || {},
                    options['2']?.owners.filter(({label}) => label == "Private Practice - Private Institution Academic")[0] || {}
                
                     ] 
                
            case 'Non-Governmental Organizations':
                return  options['2']?.owners.filter(({label}) => label == 'Non-Governmental Organizations') || []
                

            case 'Ministry of Health':

                return [
                    options['2']?.owners.filter(({label}) => label == "Public Institution - Parastatal")[0] || {},
                    options['2']?.owners.filter(({label}) => label == 'Ministry of Health')[0] || {},
                    options['2']?.owners.filter(({label}) => label == 'Armed Forces')[0] || {},
                    options['2']?.owners.filter(({label}) => label == 'Kenya Police Service')[0] || {},
                    options['2']?.owners.filter(({label}) => label == 'National Youth Service')[0] || {},
                    options['2']?.owners.filter(({label}) => label == 'Prisons')[0] || {}

                ]																				
                
            case 'Faith Based Organization':																		
            handlde
                return [
                            options['2']?.owners.filter(({label}) => label == 'Seventh Day Adventist')[0] || {},
                            options['2']?.owners.filter(({label}) => label == 'Supreme Council for Kenya Muslims')[0] || {},
                            options['2']?.owners.filter(({label}) => label == 'Other Faith Based')[0] || {},
                            options['2']?.owners.filter(({label}) => label == 'Kenya Episcopal Conference-Catholic Secretariat')[0] || {},
                            options['2']?.owners.filter(({label}) => label == 'Christian Health Association of Kenya')[0] || {},
                        ]
                    

              default:
                return []          

            
        }
    })();

    const operationStatusOptions = [
        {
            value: '190f470f-9678-47c3-a771-de7ceebfc53c',
            label: 'Non-Operational',
        },
        {
            value: 'ae75777e-5ce3-4ac9-a17e-63823c34b55e',
            label: 'Operational',
        },
    ]

    const facilityTypeDetailOptions = (() => {
        const f_types = [
            'STAND ALONE',
            'DISPENSARY',
            'MEDICAL CLINIC',
            'NURSING HOME',
            'HOSPITALS',
            'HEALTH CENTRE',
            'MEDICAL CENTER'
        ]

        const all_ftypes = []

        for (let type in f_types) all_ftypes.push(options['0']?.facility_types.filter(({ sub_division }) => sub_division === f_types[type]))

        // console.log({all_ftypes});

        switch(formik.values.facility_type){
                // STAND ALONE 
                case '85f2099b-a2f8-49f4-9798-0cb48c0875ff':
                    return all_ftypes[0].map(({id:value, name:label}) => ({label, value}))
                // DISPENSARY
                case '87626d3d-fd19-49d9-98da-daca4afe85bf':
                    return all_ftypes[1].map(({id:value, name:label}) => ({label, value}))
                // MEDICAL CLINIC
                case '8949eeb0-40b1-43d4-a38d-5d4933dc209f':
                    return all_ftypes[2].map(({id:value, name:label}) => ({label, value}))
                // NURSING HOME
                case '0b7f9699-6024-4813-8801-38f188c834f5':
                    return all_ftypes[3].map(({id:value, name:label}) => ({label, value}))
                // HOSPITALS
                case '1f1e3389-f13f-44b5-a48e-c1d2b822e5b5':
                    return all_ftypes[4].map(({id:value, name:label}) => ({label, value}))
                // HEALTH CENTER
                case '9ad22615-48f2-47b3-8241-4355bb7db835':
                    return all_ftypes[5].map(({id:value, name:label}) => ({label, value}))
                // MEDICAL CENTER
                case 'df69577d-b90f-4b66-920a-d0f3ecd95191':
                    return all_ftypes[5].map(({id:value, name:label}) => ({label, value}))
                default:
                    return  all_ftypes.map(arr => ({
                        label: arr[0]?.sub_division,
                        value: arr[0]?.parent
                    }));

        }

    })()

    // Side Effects
    // onMount
    useEffect(() => {

        if (window && window.sessionStorage.getItem('basicDetailsForm')) {
        
        formik.setValues(JSON.parse(window.sessionStorage.getItem('basicDetailsForm')))

         
        if (facilityTypeRef.current !== null) {
            facilityTypeRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.facility_type
        
        }


        if (facilityTypeDetailsRef.current !== null) {
            // console.log({facility_type_details: JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.facility_type_details})

            facilityTypeDetailsRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.facility_type_details;
        }

        if (operationStatusRef.current !== null) {
            operationStatusRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.operation_status;
        }

        if (ownerCategoryRef.current !== null) {
            ownerCategoryRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.owner_type;
        }

        if (ownerDetailsRef.current !== null) {
            ownerDetailsRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.owner;
        }

        if (kephLevelRef.current !== null) {
            kephLevelRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.keph_level;
        }

        if (facilityAdmissionsRef.current !== null) {
            facilityAdmissionsRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.admission_status;
        }

        if (countyRef.current !== null) {
            countyRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.county_id;
        }

        if (subCountyRef.current !== null) {
            subCountyRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.sub_county_id;
        }

        if (constituencyRef.current !== null) {
            constituencyRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.constituency_id;
        }

        if (wardRef.current !== null) {
            wardRef.current.value = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.ward;
        }

        // Updating radio inputs

        if(accreditedYesRef.current !== null
            && accreditedNoRef.current !== null
            ){
              const yes = Boolean(JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.accredited_lab_iso_15189);
              const no = !yes
            
            console.log({yes, no})
            accreditedYesRef.current.checked = yes;
            accreditedNoRef.current.checked = no;
          }

          if(nhifYesRef.current !== null
            && nhifNoRef.current !== null
            ){
              const yes = Boolean(JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.nhif_accreditation);
              const no = !yes
            
            console.log({yes, no})
            nhifYesRef.current.checked = yes;
            nhifNoRef.current.checked = no;
          }

           if(reportingDHISYesRef.current !== null
            && reportingDHISNoRef.current !== null
            ){
              const yes = Boolean(JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.reporting_in_dhis);
              const no = !yes
            
            console.log({yes, no})
            reportingDHISYesRef.current.checked = yes;
            reportingDHISNoRef.current.checked = no;
          }

          // Updating checkboxes
      
          if(isClassifiedRef.current !== null) {
            isClassifiedRef.current.checked = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.is_classified;
          }

          if(open24hrsRef.current !== null) {
            open24hrsRef.current.checked = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.open_whole_day;
          }

          if(openLateNightRef.current !== null) {
            openLateNightRef.current.checked = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.open_late_night;
          }

          if(openPublicHdaysRef.current !== null) {
            openPublicHdaysRef.current.checked = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.open_public_holidays;
          }

          if(openNormalDayRef.current !== null) {
            openNormalDayRef.current.checked = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.open_normal_day;
          }

          if(openWeekendsRef.current !== null) {
            openWeekendsRef.current.checked = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))?.open_weekends;
          }
    }

 

    }, [])

    // Update Session storage

    useEffect(() => {

        // console.log(formik.values.is_classified)

        Object.keys(initialFormState).forEach((field) => {

            if (
                window &&
                formik.values.official_name !== "" ||
                formik.values. name !== "" ||
                formik.values.facility_type !== "" ||
                formik.values.facility_type_details !== "" ||
                formik.values.operation_status !== "" ||
                formik.values.date_established !== "" ||
                formik.values.accredited_lab_iso_15189 !== undefined ||
                formik.values.owner_type !== "" ||
                formik.values.owner !== "" ||
                formik.values.keph_level !== "" ||
                formik.values.number_of_beds !== "" ||
                formik.values.number_of_inpatient_beds !== "" ||
                formik.values.number_of_cots !== "" ||
                formik.values.number_of_emergency_casualty_beds !== "" ||
                formik.values.number_of_icu_beds !== "" ||
                formik.values.number_of_hdu_beds !== "" ||
                formik.values.number_of_maternity_beds !== "" ||
                formik.values.number_of_isolation_beds !== "" ||
                formik.values.number_of_general_theatres !== "" ||
                formik.values.number_of_maternity_theatres !== "" ||
                formik.values.facility_catchment_population !== "" ||
                formik.values.reporting_in_dhis !== undefined ||
                formik.values.admission_status !== "" ||
                formik.values.nhif_accreditation !== undefined ||
                formik.values.is_classified !== undefined ||
                formik.values.open_whole_day !== undefined ||
                formik.values.open_late_night !== undefined ||
                formik.values.open_public_holidays !== undefined ||
                formik.values.open_weekends !== undefined ||
                formik.values.open_normal_day !== undefined ||
                formik.values.county_id !== "" ||
                formik.values.sub_county_id !== "" ||
                formik.values.constituency_id !== "" ||
                formik.values.ward !== "" ||
                formik.values.town_name !== "" ||
                formik.values.plot_number !== "" ||
                formik.values.nearest_landmark !== "" ||
                formik.values.location_desc !== "" ||
                formik.values.facility_checklist_document !== undefined 
            ) {
                window.sessionStorage.setItem('basicDetailsForm', JSON.stringify({...formik.values}))
            }
        })


    }, (() => Object.keys(initialFormState).map((field) => formik.values[`${field}`]))())

    // Update keph level drop down
    useEffect(() => {
        switch(formik.values.facility_type){
            // STAND ALONE 
            case '85f2099b-a2f8-49f4-9798-0cb48c0875ff':
                const keph_value = options['4']?.keph.find(({label}) => label === 'Level 2')?.value;
                if(kephLevelRef.current !== null) kephLevelRef.current.value = keph_value;
                if(window && window.sessionStorage.getItem('basicDetailsForm').includes('keph_level')){
                    const basicDetailsForm = JSON.parse(window.sessionStorage.getItem('basicDetailsForm'))
                    basicDetailsForm.keph_level =  keph_value;
                    console.log({level_2: keph_value})
                    window.sessionStorage.setItem('basciDetailsForm', JSON.stringify(basicDetailsForm))
                }

                break;
            // DISPENSARY
            case '87626d3d-fd19-49d9-98da-daca4afe85bf':
                if(kephLevelRef.current !== null) kephLevelRef.current.value = options['4']?.keph.find(({label}) => label === 'Level 2')?.value
                break;

            // MEDICAL CLINIC
            case '8949eeb0-40b1-43d4-a38d-5d4933dc209f':
                if(kephLevelRef.current !== null) kephLevelRef.current.value = options['4']?.keph.find(({label}) => label === 'Level 2')?.value
                break;

            // NURSING HOME
            case '0b7f9699-6024-4813-8801-38f188c834f5':
                if(kephLevelRef.current !== null) kephLevelRef.current.value = options['4']?.keph.find(({label}) => label === 'Level 2')?.value
                break;

            // HEALTH CENTER
            case '9ad22615-48f2-47b3-8241-4355bb7db835':
                if(kephLevelRef.current !== null) kephLevelRef.current.value = options['4']?.keph.find(({label}) => label === 'Level 3')?.value
                break;

            // MEDICAL CENTER
            case 'df69577d-b90f-4b66-920a-d0f3ecd95191':
                if(kephLevelRef.current !== null) kephLevelRef.current.value = options['4']?.keph.find(({label}) => label === 'Level 3')?.value
                break;
            }
            
    },[formik.values.facility_type])

    // Form handlers

    const handleSubmit = () => {
        console.log({ ...formik.values })
        setFormId(prev => (prev + 1))
    }


    const handlePrevious = () => {
        setFormId(prev => (prev - 1))
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
    const accreditedYesRef = useRef(null);
    const accreditedNoRef = useRef(null);
    const nhifYesRef = useRef(null);
    const nhifNoRef = useRef(null);
    const reportingDHISYesRef = useRef(null);
    const reportingDHISNoRef = useRef(null);
    const open24hrsRef = useRef(null);
    const openLateNightRef = useRef(null);
    const openPublicHdaysRef = useRef(null);
    const openWeekendsRef = useRef(null);
    const openNormalDayRef = useRef(null);
    const isClassifiedRef = useRef(null);



    return (
        <>

        {
            // debug area for form
            console.log('Rerendering Basic Details form....')
        
            
        }
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
                        onChange={formik.handleChange}
                        value={formik.values.official_name}
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
                        onChange={formik.handleChange}
                        value={formik.values.name}
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
                        selectref={facilityTypeRef}
                        options={facilityTypeOptions}
                        placeholder="Select a facility type..."
                        required
                        onChange={formik.handleChange}                      
                        name='facility_type'
                        
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
                        selectref={facilityTypeDetailsRef}
                        options={facilityTypeDetailOptions}
                        placeholder="Select facility type details..."
                        required
                        onChange={formik.handleChange}
                        name='facility_type_details'
                        
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
                        selectref={operationStatusRef}
                        options={operationStatusOptions}
                        required
                        onChange={formik.handleChange}
                        placeholder='Select an operation status...'
                        name='operation_status'
                        
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
                        onChange={formik.handleChange}
                        value={formik.values.date_established}
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
                            ref={accreditedYesRef}
                            type='radio'
                            name='accredited_lab_iso_15189'
                            id='accredited_lab_iso_15189_yes'
                            value={formik.values.accredited_lab_iso_15189 !== undefined ? Boolean(formik.values.accredited_lab_iso_15189) : false}
                            onChange={formik.handleChange}
                        />
                        <small className='text-gray-700'>Yes</small>
                    </span>
                    <span className='flex items-center gap-x-1'>
                        <input
                            ref={accreditedNoRef}
                            type='radio'
                            name='accredited_lab_iso_15189'
                            id='accredited_lab_iso_15189_no'
                            value={formik.values.accredited_lab_iso_15189 !== undefined ? !Boolean(formik.values.accredited_lab_iso_15189) : false}
                            onChange={formik.handleChange}
            
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
                        selectref={ownerCategoryRef}
                        options={options['3']?.owner_types} //formState.owner_type_options
                        required
                        placeholder="Select owner.."
                        name='owner_type'
                        onChange={formik.handleChange}
                        
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
                        selectref={ownerDetailsRef} 
                        options={ownerDetailsOption}
                        placeholder="Select owner detail..."
                        required
                        onChange={formik.handleChange}
                        name='owner'
                        
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
                        selectref={kephLevelRef}
                        options={options['4']?.keph}
                        placeholder="Select a KEPH Level.."
                        
                        onChange={formik.handleChange}
                        name='keph_level'
                        
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_inpatient_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_cots}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_emergency_casualty_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_icu_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_hdu_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_maternity_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_isolation_beds}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_general_theatres}
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
                        onChange={formik.handleChange}
                        value={formik.values.number_of_maternity_theatres}
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
                        onChange={formik.handleChange}
                        value={formik.values.facility_catchment_population}
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
                            ref={reportingDHISYesRef}
                            type='radio'
                            value={formik.values.reporting_in_dhis !== undefined ? Boolean(formik.values.reporting_in_dhis) : false}
                            onChange={formik.handleChange}
                            name='reporting_in_dhis'
                            id='reporting_in_dhis_yes'

                        />
                        <small className='text-gray-700'>Yes</small>
                    </span>
                    <span className='flex items-center gap-x-1'>
                        <input
                            ref={reportingDHISNoRef}
                            type='radio'
                            value={formik.values.reporting_in_dhis !== undefined ? !Boolean(formik.values.reporting_in_dhis) : false}
                            onChange={formik.handleChange}
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
                        selectref={facilityAdmissionsRef}
                        options={options['5']?.facility_admission_status}
                        required
                        placeholder="Select an admission status..."
                        onChange={formik.handleChange}
                        name='admission_status'
                        
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
                            ref={nhifYesRef}
                            type='radio'
                            value={formik.values.nhif_accreditation !== undefined ? Boolean(formik.values.nhif_accreditation) : false}
                            onChange={formik.handleChange}
                            name='nhif_accreditation'
                            id='nhif_accreditation_yes'

                        />
                        <small className='text-gray-700'>Yes</small>
                    </span>
                    <span className='flex items-center gap-x-1'>
                        <input
                            ref={nhifNoRef}
                            type='radio'
                            value={formik.values.nhif_accreditation !== undefined ? !Boolean(formik.values.nhif_accreditation) : false}
                            onChange={formik.handleChange}
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
                            ref={isClassifiedRef}
                            type='checkbox'
                            value={formik.values.is_classified}
                            onChange={formik.handleChange}
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
                            ref={open24hrsRef}
                            type='checkbox'
                            name='open_whole_day'
                            id='open_24hrs'
                            value={formik.values.open_whole_day}
                            onChange={formik.handleChange}

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
                            ref={openLateNightRef}
                            type='checkbox'
                            name='open_late_night'
                            id='open_late_night'
                            value={formik.values.open_late_night}
                            onChange={formik.handleChange}


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
                            ref={openPublicHdaysRef}
                            type='checkbox'
                            name='open_public_holidays'
                            id='open_public_holidays'
                            value={formik.values.open_public_holidays}
                            onChange={formik.handleChange}


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
                            ref={openWeekendsRef}
                            type='checkbox'
                            name='open_weekends'
                            id='open_weekends'
                            value={formik.values.open_weekends}
                            onChange={formik.handleChange}

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
                            ref={openNormalDayRef}
                            type='checkbox'
                            name='open_normal_day'
                            id='open_8_5'
                            value={formik.values.open_normal_day}
                            onChange={formik.handleChange}

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
                                    selectref={countyRef}
                                    options={options['6']?.counties}
                                    required
                                    placeholder="Select County ..."
                                    onChange={formik.handleChange}
                                    name='county_id'
                                    
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
                                    selectref={subCountyRef}
                                    options={options['7']?.sub_counties}
                                    required
                                    placeholder="Select Sub County..."
                                    onChange={formik.handleChange}
                                    name='sub_county_id'

                                    
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
                                    selectref={constituencyRef}
                                    options={options['8']?.constituencies}
                                    required
                                    placeholder="Select Constituency..."
                                    onChange={formik.handleChange}
                                    name='constituency_id'

                                    
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
                                    selectref={wardRef}
                                    options={options['9']?.wards}
                                    required
                                    placeholder="Select Ward ..."
                                    onChange={formik.handleChange}
                                    name='ward'
                                    
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
                            onChange={formik.handleChange}
                            value={formik.values.town_name}
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
                            onChange={formik.handleChange}
                            value={formik.values.plot_number}
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
                            onChange={formik.handleChange}
                            value={formik.values.nearest_landmark}
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
                            onChange={formik.handleChange}
                            value={formik.values.location_desc}
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
                            value={formik.values.facility_checklist_document}
                            type='file'
                            onChange={formik.handleChange}
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
