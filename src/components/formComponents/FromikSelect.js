import {Field} from 'formik'
import { forwardRef } from 'react'


const Select = forwardRef(function Select(props, ref) {

    return (
        <Field
          innerRef={ref}
          as="select"
          {...props}
          className='flex-none w-full p-2 border-2 border-gray-200 bg-[#f9fafb] rounded flex-grow  placeholder-gray-100 focus:bg-white focus:border-gray-600 outline-none'>
          {
            ((_options) => _options.map(({ value, label }, i) =>
              <option className={`py-1 hover:bg-red-300 text-normal font-normal ${i == 0 ? 'text-gray-300' : ''}`} key={i} value={value}>{label}</option>
            ))(props.options?.length ? [{label:props.placeholder ??  "Select option..", value:""}, ...props.options] : [])
          }
        </Field>
    )
});

export default Select