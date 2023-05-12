"use client"
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import Alert from '@mui/material/Alert';
import { handleSubmit } from '../_action';

import {useReducer} from 'react';

export function GeolocationForm ({setFormId}) {

const formReducer = (state, action) => {
    switch(action.type){
        case "longitude":
            return {
                ...state,
                longitude: state.val
            }

        case "latitude":
            return {
                ...state,
                latitude: state.val
            }
        case "collection_date":
            return {
                ...state,
                latitude: state.value
            }

        default:
            return state
}
} 

const [formState, dispatch] = useReducer(formReducer, {
    longitude:"",
    latitude: "",
    collection_date: new Date()
})

const handlePrevious = () => {
    setFormId(prev => (prev - 1))
}

const handleFormSubmit = () => {
    setFormId(prev => (prev + 1))
}

return (
    <form
    action={handleSubmit(handleFormSubmit)}
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
            value={formState.collection_date}
            onChange={(e) => {dispatch({type: "collection_date", value: e.target.value})}}    
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
                value={formState.longitude}    
                onChange={(e) => {dispatch({type: "longitude", val: e.target.value})}}
                name="longitude"
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
                value={formState.latitude}
                onChange={(e) => {dispatch({type: "latitude", val: e.target.value})}}
                name="latitude"
                className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
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