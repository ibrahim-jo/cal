import React from 'react'
import {Stack,TextField} from '@mui/material';
import {DatePicker,TimePicker,DateTimePicker} from '@mui/lab'
import {useFormikContext,useField} from 'formik'
import { format } from 'date-fns'
const Datepic = ({...props}) => {

  const {setFieldValue}=useFormikContext()

   const    [field]=useField(props)

 const handleChangeDate = (val)=>{
   setFieldValue(field.name,format(val,'MM/dd/yyyy'))
     console.log('D',field.value)

 }

  return (
 
    <Stack  spacing={3}  sx={{width:'250px'}}>
       <DatePicker 
        {...field}
        {...props}  
        renderInput={(params)=><TextField {...params} />}
        onChange={handleChangeDate}
       
         />
         </Stack>
  )
}


export const Time =({...props})=>{
const {setFieldValue}= useFormikContext()
  const [field] =useField(props)


  const handelChangeTime=(val)=>{
   
    setFieldValue(field.name,val)
     
 
  }
  
  return (
    <Stack  spacing={3}  sx={{width:'250px'}}>
    
      <TimePicker 
      {...field}
      {...props}
     
      onChange={handelChangeTime}
      renderInput={(params)=><TextField {...params}/>}
      />
   </Stack>
  )
}


  export const DateTime=({...props})=>{
     const {setFieldValue} =useFormikContext()
     const [field]=useField(props)
      const handelchangeDateTime=(val)=>{
        setFieldValue(field.name,val)

      }

  return(
   <DateTimePicker 
      {...field} 
      {...props}
      onChange={handelchangeDateTime}
      renderInput={(params)=><TextField {...params}/>}


   />
  )
}

export default Datepic