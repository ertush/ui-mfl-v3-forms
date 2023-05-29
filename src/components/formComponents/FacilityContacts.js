
import { useRef, useEffect, useContext } from "react" // useContext 
import { XCircleIcon } from '@heroicons/react/outline'
import Select from 'react-select'
import { FacilityContactsContext } from "../../components/Forms"

// import {FacilityCntTypeRefCtx, OfficerCntTypeRefCtx} from '../FacilityContactsForm'
// import { EditFacilityContactsContext } from "../../components/Forms"
// import { useAlert } from "react-alert"


const FacilityContact = ({contactTypeOptions, setFacilityContacts, index, setIndex, fieldValue, dispatch, selectValue, }) => {


    const contactTypes = useContext(FacilityContactsContext)

    const contactTypeRef = useRef(null);
    const contactRef = useRef(null);


    
    // const [contact_type_name, id] = contacts

    useEffect(() => {

    if (contactTypeRef.current !== null && selectValue !== null) {
        contactTypeRef.current.setValue(selectValue, 'set-value')
    }

    if (contactRef?.current){
        contactRef.current.value = fieldValue ?? ""
        }

    
    }, [])

    return (
        <div className="w-full grid grid-cols-2 grid-rows-1 gap-3 mt-3" id={`facility-dept-wrapper-${index}`}> 
            {/* Contact Type */}
            <Select options={contactTypeOptions || []} 
                required
                ref={contactTypeRef}
                id={`facility-contact-type-${index}`}
                placeholder="Select Name"
                onChange={
                    option => {
                        if(contactTypeRef.current && contactTypeOptions){
                        
                            contactTypeRef.current.value = contactTypeOptions.find(({label}) => label === option.label).contact //id
                        }
                        dispatch({ type: `contact_type_${index}`, value: { label: option?.label, value: option?.value } })
                    }
                }
                name={`contact_type_${index}`} 
                className="col-start-1  w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
            
            <div className="w-full col-start-2 flex items-center gap-x-3 justify-between">
                    {/* Contact */}
                    <input id={`facility-contact-detail-${index}`} 
                    ref={contactRef}
                    type="text" 
                    name={`contact_${index}`}
                    onChange={e => { dispatch({ type: e.target.name, value: e.target.value }) }}   
                    className="w-full flex-grow  flex-1 bg-gray-50 rounded p-2 border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none" />
                    
                
                    {/* Delete Btn */}
                    <button 
                    id={`delete-btn-${index}`}
                    onClick={async ev => {
                        ev.preventDefault();
                      
                    
                        let _contacts = contactTypes;

                        _contacts.splice(index, -1);

                        setIndex({type: "facility", value: (index - 1)})

                        setFacilityContacts(_contacts);

                    }}>
                        <XCircleIcon className='w-7 h-7 text-red-400'/>
                    </button>
                
            </div>
        </div>
    )
}

const OfficerContactDetails = ({contactTypeOptions, setFacilityContacts, selectValue, index,  fieldValue, dispatch, setIndex}) => {


    const contactTypes = useContext(FacilityContactsContext)

    // const facilityContactTypeRef = useRef(null)
    // const facilityContactDetailsRef = useRef(null)

    // const [officerContactTypeRef, officerContactDetailsRef] = useContext(OfficerCntTypeRefCtx)

    // const [contact_type_name, contact, id] = contacts

    const contactTypeRef = useRef(null)
    const contactRef = useRef(null)

    useEffect(() => {

        // console.log({contact_type_name});
        // if(officerContactTypeRef.current && contact_type_name && id){

        //     if (officerContactTypeRef?.current){
        //         officerContactTypeRef.current.state.value = contactTypeOptions.filter(({label}) => label === contact_type_name).map(obj => {obj['id'] = id; return obj})
        //     }
        // }

        // if(officerContactDetailsRef.current ){
        //     officerContactDetailsRef.current.value = contact ?? ''
        // }

        if (contactTypeRef.current !== null && selectValue !== null) {
            contactTypeRef.current.setValue(selectValue, 'set-value')
        }

        if (contactRef?.current){
            contactRef.current.value = fieldValue ?? ""
            }
    

    }, [])

    return (
        <div className="w-full grid grid-cols-2 grid-rows-1 gap-3 mt-3" id={`facility-dept-wrapper-${index}`}> 
             {/* { console.log("Add", {index, facilityDepts}) } */}
            {/* Contact Type */}
            <Select options={contactTypeOptions || []} 
                required
                ref={contactTypeRef}
                id={`officer-contact-type-${index}`}
                placeholder="Select Name"
                onChange={
                    option => {
                        if(contactTypeRef.current){
                        
                            contactTypeRef.current.value = contactTypeOptions.find(({label}) => label === option.label).contact //id
                        }

                        dispatch({ type: `officer_details_contact_type_${index}`, value: { label: option?.label, value: option?.value } })
                       
                    }
                }
                name={`officer_details_contact_type_${index}`} 
                className="col-start-1  w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
            

            <div className="w-full col-start-2 flex items-center gap-x-3 justify-between">
                    {/* Contact */}
                    <input 
                    id={`officer-contact-detail-${index}`} 
                    type="text" 
                    ref={contactRef}
                    onChange={e => { dispatch({ type: e.target.name, value: e.target.value }) }}   
                    name={`officer_details_contact_${index}`} 
                    className="w-full flex-grow  flex-1 bg-gray-50 rounded p-2 border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none" />

                    
                
                    {/* Delete Btn */}
                    <button 
                    id={`delete-btn-${index}`}
                    onClick={ev => {
                        ev.preventDefault();

                        let _contacts = contactTypes;

                        _contacts.splice(index, -1);

                        setIndex({type: "officer", value: (index - 1)})

                        setFacilityContacts(_contacts);
                      


                    }}><XCircleIcon className='w-7 h-7 text-red-400'/></button>
                
                </div>
        </div>
    )
}

export {
    FacilityContact,
    OfficerContactDetails
}