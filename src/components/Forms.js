
"use client"

import {useState, createContext} from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { BasicDetailsForm } from './BasicDeatilsForm';
import { GeolocationForm } from './GeolocationForm';
import { HumanresourcesForm } from './HumanresourcesForm';

// import { FacilityContactsForm } from './FacilityContactsForm';

export const FormContext  = createContext(() => null)

export function Form () {

  const [formId, setFormId] = useState(1);

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
                                <BasicDetailsForm />
                              }
                              {
                                  formId == 1 && 
                                  <GeolocationForm />   
                              } 
                              {
                                  formId == 2 &&    
                                  <HumanresourcesForm />
                                
                              } 
                              {/* {     
                              case 'Facility Contacts':
                                return <FacilityContactsForm />
                              case 'Regulation':
                                return <RegulationFrom />
                              case 'Services':
                                return <ServicesFrom />
                              case 'Infrastructure':
                                return <InfrastructureForm />
                              case 'Human resources':
                                return <HumanresourcesForm />
                              default:
                                  return <div className='hidden'></div>
                            }
                        */}
                          
                        </div>
                    </FormContext.Provider>
                </div>

    </div>
    )
}