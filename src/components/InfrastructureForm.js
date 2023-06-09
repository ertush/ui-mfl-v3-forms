
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useEffect, useState, useRef, useContext } from 'react';
import Select from '../components/formComponents/FromikSelect';
import { FormOptionsContext } from '@/pages';
import  useSWR  from 'swr';


function RenderForm() {


  // Context

  const options = useContext(FormOptionsContext)

  const {values} = useFormikContext();

   // Refs

   const facilityTypeRef = useRef(null);
   const facilityTypeDetailsRef = useRef(null);
   const kephLevelRef = useRef(null);

 

  // Form Options

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

    if(facilityTypeRef.current !== null) {

      // console.log(facilityTypeRef.current?.value)
      switch (facilityTypeRef.current?.value) {
        // STAND ALONE 
        case '85f2099b-a2f8-49f4-9798-0cb48c0875ff':
          return all_ftypes[0].map(({ id: value, name: label }) => ({ label, value }))
        // DISPENSARY
        case '87626d3d-fd19-49d9-98da-daca4afe85bf':
          return all_ftypes[1].map(({ id: value, name: label }) => ({ label, value }))
        // MEDICAL CLINIC
        case '8949eeb0-40b1-43d4-a38d-5d4933dc209f':
          return all_ftypes[2].map(({ id: value, name: label }) => ({ label, value }))
        // NURSING HOME
        case '0b7f9699-6024-4813-8801-38f188c834f5':
          return all_ftypes[3].map(({ id: value, name: label }) => ({ label, value }))
        // HOSPITALS
        case '1f1e3389-f13f-44b5-a48e-c1d2b822e5b5':
          return all_ftypes[4].map(({ id: value, name: label }) => ({ label, value }))
        // HEALTH CENTER
        case '9ad22615-48f2-47b3-8241-4355bb7db835':
          return all_ftypes[5].map(({ id: value, name: label }) => ({ label, value }))
        // MEDICAL CENTER
        case 'df69577d-b90f-4b66-920a-d0f3ecd95191':
          return all_ftypes[5].map(({ id: value, name: label }) => ({ label, value }))
        default:
          return all_ftypes.map(arr => ({
            label: arr[0]?.sub_division,
            value: arr[0]?.parent
          }));

      }
    }

  })()

  // Effects

useEffect(() => {
  if (window && window.sessionStorage.getItem('infra_form')) {
    values.facility_type_details = JSON.parse(window.sessionStorage.getItem('infra_form')).facility_type_details ;
  }
},[])

 
 useEffect(() => {
  
  values.number_of_beds = (Number(values.number_of_inpatient_beds) ?? 0) + 
                          (Number(values.number_of_icu_beds) ?? 0) + 
                          (Number(values.number_of_hdu_beds) ?? 0) + 
                          (Number(values.number_of_maternity_beds) ?? 0) +
                          (Number(values.number_of_emergency_casualty_beds) ?? 0);
    
    
 },[
  values.number_of_inpatient_beds,
  values.number_of_icu_beds,
  values.number_of_hdu_beds,
  values.number_of_maternity_beds,
  values.number_of_emergency_casualty_beds
]
)



  return (
    <>
              <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
              <label
                htmlFor='collection_date'
                className='text-gray-600 capitalize text-sm'>
                Collection date:
                <span className='text-medium leading-12 font-semibold'>
                  {' '}
                  *
                </span>
              </label>
              <Field
                type="date"
                required
                name="collection_date"
                className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
              />
            </div>

            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3 col-start-2'>
              <label
                htmlFor='latitude'
                className='text-gray-600 capitalize text-sm'>
                Latitude
                <span className='text-medium leading-12 font-semibold'>
                  {' '}
                  *
                </span>
              </label>
              <Field
                type="text"
                required
                name="latitude"
                className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
              />
            </div>

            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3 col-start-2'>
              <label
                htmlFor='longitude'
                className='text-gray-600 capitalize text-sm'>
                Longitude
                <span className='text-medium leading-12 font-semibold'>
                  {' '}
                  *
                </span>
              </label>
              <Field
                type="text"
                required
                name="longitude"
                className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
              />
            </div>

            <div className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50 h-auto'>
              <h4 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
                Armed Forces Facilities
              </h4>
              <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
                <Field
                  type="checkbox"
                  name='is_classified'
                />
                <label
                  htmlFor='is_classified'
                  className='text-gray-700 capitalize text-sm flex-grow'>
                  {' '}
                  Is this an Armed Force facility?{' '}
                </label>
              </div>
            </div>

            <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
              <label
                htmlFor='accredited_lab_iso_15189'
                className='text-gray-700 capitalize text-sm flex-grow'>
                *Is the facility accredited Lab ISO 15189?{' '}
              </label>
              <span className='flex items-center gap-x-1'>
                <Field
                  type='radio'
                  name='accredited_lab_iso_15189'
                  value="true"

                />
                <small className='text-gray-700'>Yes</small>
              </span>
              <span className='flex items-center gap-x-1'>
                <Field
                  type='radio'
                  name='accredited_lab_iso_15189'
                  value="false"

                />
                <small className='text-gray-700'>No</small>
              </span>
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_inpatient_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_cots'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_emergency_casualty_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_icu_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_hdu_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_maternity_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_isolation_beds'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_general_theatres'
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
                    <Field
                        required
                        type='number'
                        min={0}
                        name='number_of_maternity_theatres'
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                    />
                    <label className='text-red-500 mt-1'></label>

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
                options={facilityTypeOptions}
                placeholder="Select a facility type..."
                required
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
                ref={facilityTypeDetailsRef}
                options={facilityTypeDetailOptions ?? [{label:'A', value: 0}, {label:'B', value: 1}, {label:'C', value: 2}]}
                placeholder="Select facility type details..."
                required
                name='facility_type_details'

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
                options={options['4']?.keph}
                placeholder="Select a KEPH Level.."
                name='keph_level'

              />
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
                                    options={options['6']?.counties}
                                    required
                                    placeholder="Select County ..."
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
                                    options={options['7']?.sub_counties}
                                    required
                                    placeholder="Select Sub County..."
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
                                    options={options['8']?.constituencies}
                                    required
                                    placeholder="Select Constituency..."
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
                                    options={options['9']?.wards}
                                    required
                                    placeholder="Select Ward ..."
                                    name='ward'
                                    
                                />
                            </div>
                        </div>
                    </div>

                   
                </div>


            <button onClick={() => { setFormId(prev => (prev - 1)) }}>Previous</button>
            <button type="submit">Submit</button>
    </>
  )
}

export function InfrastructureForm() {

  // State

  const [initialValues, setInitialValues] = useState({
    collection_date: "",
    longitude: "",
    latitude: "",
    facility_type: "",
    facility_type_details:"",
    keph_level:"",
    is_classified: "",
    accredited_lab_iso_15189: "",
    number_of_beds: "",
    number_of_inpatient_beds: "",
    number_of_cots: "",
    number_of_emergency_casualty_beds: "",
    number_of_icu_beds: "",
    number_of_hdu_beds: "",
    number_of_maternity_beds: "",
    number_of_isolation_beds: "",
    number_of_general_theatres: "",
    number_of_maternity_theatres: ""
  })
  

  // Effects

  useEffect(() => {
    if (window && window.sessionStorage.getItem('infra_form')) {
      setInitialValues(JSON.parse(window.sessionStorage.getItem('infra_form')))
    }
  }, [])

 
  // Render

  return (
    <>
      {/* Check if initialValues was updated by sessionStorage */}
      {console.log('Rendering ....')}
      {
        initialValues.collection_date !== "" &&

        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (window) {
              window.sessionStorage.setItem('infra_form', JSON.stringify({ ...values }))
            }
            console.log({ ...values })
          }}>

          <Form
            name='infrastructure_form'
            className='flex flex-col w-full items-start justify-start gap-3'
          >

          <RenderForm  />


          </Form>
        </Formik>
      }

      {
              initialValues.collection_date == "" &&

              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  if (window) {
                    window.sessionStorage.setItem('infra_form', JSON.stringify({ ...values }))
                  }
                  console.log({ ...values })
                }}>

                <Form
                  name='infrastructure_form'
                  className='flex flex-col w-full items-start justify-start gap-3'
                >

                <RenderForm />


                </Form>
              </Formik>
            }
      
    </>
  )
}



