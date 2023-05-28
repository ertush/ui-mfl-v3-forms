
import { useRef, useContext, useEffect } from "react" // useContext 
import { XCircleIcon } from '@heroicons/react/outline'
import Select from 'react-select'
import { FacilityContactsContext } from "../../components/Forms"

// import { EditFacilityContactsContext } from "../../components/Forms"
// import { useAlert } from "react-alert"


const FacilityContact = ({contactTypeOptions, setFacilityContacts, index, setIndex, dispatch, contacts}) => {


    const contactTypes = useContext(FacilityContactsContext)


    // const editContacts = useContext(EditFacilityContactsContext)

    // const alert = useAlert()

    const contactTypeRef = useRef(null)
    const contactDetailsRef = useRef(null)
    
    const [contact, contact_type_name, id] = contacts

    useEffect(() => {

        if(contactTypeRef.current && contact_type_name && id){
            
            if (contactTypeRef?.current){ 
                
                contactTypeRef.current.state.value = contactTypeOptions.filter(({label}) => label === contact_type_name).map(obj => {obj['id'] = id; return obj})
             }
           
            // console.log({val: contactTypeRef.current?.state?.value})
        }

        if(contactDetailsRef.current ){
            contactDetailsRef.current.value = contact ?? null;
        }

     

    }, [])

    return (
        <div className="w-full grid grid-cols-2 grid-rows-1 gap-3 mt-3" id={`facility-dept-wrapper-${index}`}> 
             {/* { console.log("Add", {index, facilityDepts}) } */}
            {/* Name */}
            <Select options={contactTypeOptions || []} 
                required
                ref={contactTypeRef}
                id={`facility-contact-type-${index}`}
                placeholder="Select Name"
                onChange={
                    e => {
                        if(contactTypeRef.current && contactTypeOptions){
                        
                            contactTypeRef.current.value = contactTypeOptions.find(({label}) => label === e.label).contact //id
                        }
                    }
                }
                name={`contact_type_${index}`} 
                className="col-start-1  w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
            
            <div className="w-full col-start-2 flex items-center gap-x-3 justify-between">
                    {/* Regulatory Body */}
                    <input ref={contactDetailsRef} id={`facility-contact-detail-${index}`} 
                    type="text" 
                    name={`contact_${index}`} 
                    onChange={() => {dispatch({ type: e.target.name, value: e.target.value })}}
                    
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

const OfficerContactDetails = ({contactTypeOptions, setFacilityContacts, contacts, index, dispatch, setIndex}) => {


    const contactTypes = useContext(FacilityContactsContext)

    const contactTypeRef = useRef(null)
    const contactDetailsRef = useRef(null)
    
    const [contact_type_name, contact, id] = contacts

    useEffect(() => {

        // console.log({contact_type_name});
        if(contactTypeRef.current && contact_type_name && id){

            if (contactTypeRef?.current){
            contactTypeRef.current.state.value = contactTypeOptions.filter(({label}) => label === contact_type_name).map(obj => {obj['id'] = id; return obj})
            }
        }

        if(contactDetailsRef.current ){
            contactDetailsRef.current.value = contact ?? ''
        }

     

    }, [])

    return (
        <div className="w-full grid grid-cols-2 grid-rows-1 gap-3 mt-3" id={`facility-dept-wrapper-${index}`}> 
             {/* { console.log("Add", {index, facilityDepts}) } */}
            {/* Name */}
            <Select options={contactTypeOptions || []} 
                required
                ref={contactTypeRef}
                id={`officer-contact-type-${index}`}
                placeholder="Select Name"
                onChange={
                    e => {
                        if(contactTypeRef.current){
                        
                            contactTypeRef.current.value = contactTypeOptions.find(({label}) => label === e.label).contact //id
                        }
                    }
                }
                name={`officer_details_contact_type_${index}`} 
                className="col-start-1  w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
            
            <div className="w-full col-start-2 flex items-center gap-x-3 justify-between">
                    {/* Regulatory Body */}
                    <input ref={contactDetailsRef} id={`officer-contact-detail-${index}`} 
                    type="text" 
                    onChange={() => {dispatch({ type: e.target.name, value: e.target.value })}}  
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