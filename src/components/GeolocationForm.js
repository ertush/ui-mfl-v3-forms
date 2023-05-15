import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import Alert from '@mui/material/Alert';
import { useEffect, useReducer, useContext, useRef } from 'react';
import { FormContext } from './Forms';
import Select from 'react-select';


export function GeolocationForm () {

const setFormId = useContext(FormContext);

const facilityTypeRef = useRef(null);
 
const initialFormValues = {
    collection_date: '',
    longitude: '',
    latitude: '',
    facility_type: ''
}
   
const formReducer = (state, action) => {

    if(Object.keys(initialFormValues).includes(action.type)){
        return {
                ...state,
                [action.type]: action.value
            }
    } else{
        return state
    }
}


const [formState, dispatch] = useReducer(formReducer, initialFormValues)
    

useEffect(() => {
   
    if(window){
        dispatch({type:'collection_date', value:JSON.parse(window.localStorage.getItem('geoLocationForm'))?.collection_date })
        dispatch({type:'longitude', value:JSON.parse(window.localStorage.getItem('geoLocationForm'))?.longitude})
        dispatch({type:'latitude', value:JSON.parse(window.localStorage.getItem('geoLocationForm'))?.latitude})
       
    }

    if(facilityTypeRef.current !== null) {
        facilityTypeRef.current.setValue(JSON.parse(window.localStorage.getItem('geoLocationForm'))?.facility_type, 'set-value')
    }


},[])   

useEffect(() => {
  
if( window && 
    formState.collection_date !== '' &&
    formState.longitude !== '' &&
    formState.latitude !== '' &&
    formState.facility_type !== ''
    ){

    // console.log({formState})

    window.localStorage.setItem('geoLocationForm', JSON.stringify({
        collection_date: formState.collection_date,
        longitude: formState.longitude,
        latitude: formState.latitude,
        facility_type: formState.facility_type
    }))

    // console.log({label: formState.facility_type.label, value:formState.facility_type.value})

}

}, [formState.collection_date, formState.longitude, formState.latitude, formState.facility_type])

const handlePrevious = () => {
    setFormId(prev => (prev - 1))
}


const handleSubmit = (e) => {

    e.preventDefault();

    // console.log({...formState});
    setFormId(prev => (prev + 1));
}

return (
    <form
    onSubmit={handleSubmit}
    name='geolocation_form'
    className='flex flex-col w-full items-start justify-start gap-3'
    
    >
    {/* Collection Date */}
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
            onChange={(e) => {
                
                dispatch({type:e.target.name, value: e.target.value})
            }}
            value={formState.collection_date}
            name="collection_date"
            className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
        />
    </div>

    {/* Lon/Lat */}
    <div className='grid grid-cols-2 gap-4 place-content-start w-full'>
        <div className='w-full flex flex-col items-start justify-start gap-1 mb-3 col-start-1'>
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
                onChange={(e) => {
                    
                    dispatch({type:e.target.name, value: e.target.value})
                }}
                value={formState.longitude}
                name="longitude"
                className='flex-none w-full bg-gray-50 roundcollection_dateed p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
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
                onChange={(e) => {
                    dispatch({type:e.target.name, value: e.target.value})
                }}
                value={formState.latitude}
                name="latitude"
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
            ref={facilityTypeRef}
            options={[{value: 1, label:"MOH"}, {value: 2, label:"Private"}, {value: 3, label:"NGO"}]}
            required
            placeholder='Select a facility type...'
            onChange={({label, value}) => {

              
                dispatch({type:'facility_type', value:{label, value}})
            }}
            
            name='facility_type'
            className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
            />
        </div>
    <>{!1 && <Alert severity="error" sx={{width:'100%'}}> Please enter the right coordinates</Alert>}</>
    </div>

    {/* Ward Geo Map */}
    <div className='w-full h-auto'>																		
        <div className='w-full bg-gray-200  rounded flex flex-col items-start justify-center text-left relative'>
            {/* {
                    geoJSON &&

                <Map markerCoordinates={[latitude.length < 4 ? '0.000000' : latitude, longitude.length < 4 ? '0.000000' : longitude]} geoJSON={geoJSON} ward={wardName} center={center} />
        
            }	 */}
            </div>
    </div>

    {/* Next/Previous Form  */}
    <div className='flex justify-between items-center w-full'>
        <button
            onClick={handlePrevious}
            className='flex items-center justify-start space-x-2 p-1 border-2 border-black rounded px-2'>
            <ChevronDoubleLeftIcon className='w-4 h-4 text-black' />
            <span className='text-medium font-semibold text-black '>
                Basic Details
            </span>
        </button>
        <button
            type='submit'
            className='flex items-center justify-start space-x-2 bg-indigo-500 rounded p-1 px-2'>
            <span className='text-medium font-semibold text-white'>
                Facility Contacts
            </span>
            <ChevronDoubleRightIcon className='w-4 h-4 text-white' />
        </button>
    </div>
</form>
 )
}