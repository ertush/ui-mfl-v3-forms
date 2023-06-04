import {useContext, useEffect, useRef} from 'react';
import { FormContext } from './Forms';
import { useFormik } from 'formik';


export function HumanresourcesForm() {

const setFormId = useContext(FormContext);

const formik = useFormik({
  initialValues:{
    collection_date:"",
    longitude:"",
    latitude:"",
    facility_type:"",
    is_classified: "",
  },
  onSubmit: values => console.log({...values})
  
});

// On mount

useEffect(() => {
  if(window && window.sessionStorage.getItem('hrForm')){

    formik.setValues(JSON.parse(window.sessionStorage.getItem('hrForm')))

    if(facilityTypeRef.current !== null) {
    
        facilityTypeRef.current.value = JSON.parse(window.sessionStorage.getItem('hrForm'))?.facility_type;
    }


  }
}, []);

// Side effect for updating sessionStorage
useEffect(() => {
  console.log(formik.values.is_classified)
      if(window &&
        formik.values.collection_date !== '' &&
        formik.values.longitude !== '' &&
        formik.values.latitude !== '' &&
        formik.values.facility_type !== '' &&
        formik.values.is_classified !== "") {
        window.sessionStorage.setItem('hrForm', JSON.stringify({...formik.values}))
      }
}, [
  formik.values.collection_date,
  formik.values.latitude,
  formik.values.longitude,
  formik.values.facility_type,
  formik.values.is_classified

]);


// refs

const facilityTypeRef = useRef(null);


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
            
            <select
            ref={facilityTypeRef}
            name="facility_type" 
            onChange={formik.handleChange}
            className='flex-none w-full p-2 border-2 border-gray-200 bg-[#f9fafb] rounded flex-grow  placeholder-gray-100 focus:bg-white focus:border-gray-600 outline-none' >
                {
                  ((options) => options.map(({value, label}, i) =>
                    <option className='py-1 hover:bg-red-300 text-normal font-normal' key={i} value={value}>{label}</option>
                  ))([{label:"Select facility type...", value: 0}, {label:"school", value: 1}, {label:"class", value: 2}])
                }
            </select>
        </div>

        <div className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50 h-auto'>
            <h4 className='text-lg uppercase pb-2 border-b border-gray-100 w-full mb-4 font-semibold text-blue-900'>
            Armed Forces Facilities
            </h4>
            <div className='w-full flex flex-row items-center px-2 justify-  gap-1 gap-x-3 mb-3'>
            <input
                type='checkbox'
                checked={formik.values.is_classified}
          
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
        
    <button onClick={() => {setFormId(prev => (prev - 1))}}>Previous</button>
    <button type="submit">Submit</button>

    </form>
  )
}

