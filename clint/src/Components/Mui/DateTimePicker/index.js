import React ,{useState}from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Stack,TextField} from '@mui/material';
import {useField,useFormikContext} from 'formik'
const index = ({...props}) => {
    const {setFieldValue}=useFormikContext()
    const    [field]=useField(props)

    const handleChange = (newValue) => {
        setFieldValue(field.name,newValue)
      // console.log(field.name,field.value)  
      };
  return (

    <Stack spacing={3}>
         <DateTimePicker
           {...field}
           {...props} 
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
</Stack>
  )
}

export default index