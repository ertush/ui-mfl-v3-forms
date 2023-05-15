import {useContext} from 'react';
import { FormContext } from './Forms';

export function HumanresourcesForm() {

const setFormId = useContext(FormContext)

  return (
    <div>
        <p>HumanresourcesForm</p>
        <br/>
        <button onClick={() => {setFormId(prev => (prev - 1))}}>Previous</button>
    </div>
  )
}

