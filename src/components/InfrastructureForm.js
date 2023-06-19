
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useEffect, useState, useRef, useContext } from 'react';
import Select from '../components/formComponents/FromikSelect';
import { FormOptionsContext } from '@/pages';


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
                options={facilityTypeDetailOptions}
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
    accredited_lab_iso_15189: ""
  })
  

  // Effects

  useEffect(() => {
    console.log('inside effect...')
    if (window && window.sessionStorage.getItem('infra_form')) {
      setInitialValues(JSON.parse(window.sessionStorage.getItem('infra_form')))
    }
  }, [])


  // useEffect(() => {
  //   console.log("running facility Type effect...")
  //    if(facilityTypeRef.current !== null){
  //   console.log({facility_type: facilityTypeRef.current?.value})

  // }

  // }, [])

 
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

          <RenderForm />


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



