import { useContext, useEffect, useRef } from 'react';
import { FormContext } from './Forms';
import { useFormik } from 'formik';
import  Select  from '../components/formComponents/Select';


export function HumanresourcesForm() {

  const setFormId = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      collection_date: "",
      longitude: "",
      latitude: "",
      facility_type: "",
      is_classified: undefined,
      accredited_lab_iso_15189: undefined
    },
    onSubmit: values => console.log({ ...values })

  });

  // On mount

  useEffect(() => {
    if (window && window.sessionStorage.getItem('hrForm')) {

      formik.setValues(JSON.parse(window.sessionStorage.getItem('hrForm')))

      if (facilityTypeRef.current !== null) {
        facilityTypeRef.current.value = JSON.parse(window.sessionStorage.getItem('hrForm'))?.facility_type;
      }

      if(isClassifiedRef.current !== null) {
        isClassifiedRef.current.checked = JSON.parse(window.sessionStorage.getItem('hrForm'))?.is_classified;
      }

      if(accreditedYesRef.current !== null
        && accreditedNoRef.current !== null
        ){
          const yes = Boolean(JSON.parse(window.sessionStorage.getItem('hrForm'))?.accredited_lab_iso_15189);
          const no = !yes
        
        console.log({yes, no})
        accreditedYesRef.current.checked = yes;
        accreditedNoRef.current.checked = no;
      }

     



    }
  }, []);

  // Side effect for updating sessionStorage
  useEffect(() => {
    console.log(formik.values.is_classified)
    if (window &&
      formik.values.collection_date !== '' ||
      formik.values.longitude !== '' ||
      formik.values.latitude !== '' ||
      formik.values.facility_type !== '' ||
      formik.values.is_classified !== undefined ||
      formik.values.accredited_lab_iso_15189 !== undefined) {
      window.sessionStorage.setItem('hrForm', JSON.stringify({ ...formik.values }))
    }
  }, [
    formik.values.collection_date,
    formik.values.latitude,
    formik.values.longitude,
    formik.values.facility_type,
    formik.values.is_classified,
    formik.values.accredited_lab_iso_15189

  ]);


  // refs

  const facilityTypeRef = useRef(null);
  const isClassifiedRef = useRef(null);
  const accreditedYesRef = useRef(null);
  const accreditedNoRef = useRef(null);

  return (
    <form onSubmit={formik.handleSubmit}
      name='hr_form'
      className='flex flex-col w-full items-start justify-start gap-3'
    >
      {
        console.log('rerendering...')
      }
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
        <input
          type="date"
          required
          onChange={formik.handleChange}
          value={formik.values.collection_date}
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
        <input
          type="text"
          required
          onChange={formik.handleChange}
          value={formik.values.latitude}
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
        <input
          type="text"
          required
          onChange={formik.handleChange}
          value={formik.values.longitude}
          name="longitude"
          className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
        />
      </div>

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
          selectRef={facilityTypeRef}
          required
          onChange={formik.handleChange} 
          name="facility_type"
          options={[{ label: "Select facility type...", value: 0 }, { label: "school", value: 1 }, { label: "class", value: 2 }]}
        />
        
      </div>

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
          <input
            ref={accreditedYesRef}
            type='radio'
            name='accredited_lab_iso_15189'
            id='open_whole_day_yes'
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
            id='open_whole_day_no'
            value={formik.values.accredited_lab_iso_15189 !== undefined ? !Boolean(formik.values.accredited_lab_iso_15189) : false}
            onChange={formik.handleChange}
            
          />
          <small className='text-gray-700'>No</small>
        </span>
      </div>

      <button onClick={() => { setFormId(prev => (prev - 1)) }}>Previous</button>
      <button type="submit">Submit</button>

    </form>
  )
}

