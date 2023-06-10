
"use client"

import {useState, createContext, useContext} from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { BasicDetailsForm } from './BasicDeatilsForm';
import { GeolocationForm } from './GeolocationForm';
import { FacilityContactsForm } from './FacilityContactsForm';
import { HumanresourcesForm } from './HumanresourcesForm';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'





// import { FacilityContactsForm } from './FacilityContactsForm';

export const FormContext  = createContext(() => null)
export const FacilityDeptContext = createContext(null)
export const FacilityContactsContext = createContext(null)
export const EditFacilityContactsContext = createContext(null)

// const queryClient = new QueryClient()


export function Form () {

  // const queryClient = new QueryClient()


  const [formId, setFormId] = useState(0); //1

  const steps = [
    'Basic Details',
    'Geolocation',
    'Facility Contacts',
    'Regulation',
    'Services',
    'Infrastructure',
    'Human resources'
];

    return (
       <div className='border border-gray-200 rounded p-3 pb-4 flex flex-col justify-center items-center w-full'>
      	{/* Stepper Header */}
        <div className='flex flex-col justify-center items-center px-1 md:px-4 w-full m-6'>
								<Box sx={{ width: '100%' }}>
									<Stepper activeStep={parseInt(formId)} alternativeLabel>
										{steps.map((label) => (
											<Step key={label}>
												<StepLabel>
													
													{
														label === "Basic Details" ?
														<span className='cursor-pointer hover:text-indigo-600' onClick={
															() => {
																setFormId(0)
																window.sessionStorage.setItem('formId', 0)
															}
														} >{label}</span>
														:
														label
													}
													
													</StepLabel>
											</Step>
										))}
									</Stepper>
								</Box>
							</div>

              {/* Stepper Body */}
              <div className='flex flex-col justify-center items-start px-1 md:px-4 w-full '>
                  <FormContext.Provider value={setFormId}>
                      <div
                        className=' w-full flex flex-col items-start justify-start p-3 rounded border border-gray-300/70 bg-gray-50'
                        style={{ minHeight: '250px' }}>
                           {
                                formId == 0 && 
                                // <QueryClientProvider client={queryClient}>

                                  <BasicDetailsForm />
                                // </QueryClientProvider>
                              }
                              {
                                  formId == 1 && 
                                  <HumanresourcesForm />   
                              } 
                              {
                                  formId == 2 &&    
                                  <FacilityContactsForm />
                                
                              } 
                             
                          
                        </div>
                    </FormContext.Provider>
                </div>

    </div>
    )
}