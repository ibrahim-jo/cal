import React from 'react'
import api from '../Api/privet'
import DatePicker from './Mui/Datapicker'
import {Time} from './Mui/Datapicker'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import  {format}from 'date-fns'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import  * as yup from 'yup'
const theme = createTheme();
const InputCaloris = ({id,t}) => {

    const initalValues={date: format (new Date(),'MM/dd/yyyy'),
  time:new Date(),
  meal: '' ,
  ncal:''
   }

  const  validationSchema= yup.object({
    date:yup.string().required('Required'),
    meal:yup.string().required('Required'),
    ncal:yup.number().required('Required')
  })

   const onSubmit= async(values, {resetForm,setSubmitting }) => {

      try{
            console.log(values.meal)
          await api.post('/meals',{meal:values.meal,
            ncal:values.ncal,
            date:values.date,
            time:values.time},
          { headers: {'auth_token' : `Bearer ${id}`,
          'Content-Type': 'application/json',
         }

        })
       
        setSubmitting(false);
        resetForm();
        t();
       

      }
      catch(err){
       
        console.log(`Error:${{message:err.message}}`)
      }
    
      
  }
  return (
    <Formik
    initialValues={initalValues}
     validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main"  >
        <Box  sx={{ mt: 3 }}>

      <Form >
     < Grid container spacing={1} >
     <Grid item xs={3}>
     <  DatePicker   name='date' 
        label='Date' 
          />

     </Grid>
    <Grid item xs={3}>
    <Time  name='time' 
    label='Time' 
     />

    </Grid>
      <Grid item xs={3}>
        <Field  as={TextField}
        name='meal'
        label='Meal'
        variant='outlined'
        />
    <ErrorMessage  name='meal' />

      </Grid>
      <Grid item xs={3}>
        <Field  as={TextField}
        name='ncal'
        label='Calories'
        variant='outlined' />
        <ErrorMessage  name='ncal'  />
       
      </Grid>
    </Grid>
<Button 
         type='submit'
         fullWidth
         variant='contained'
         sx={{mt:3,mb:2}}
         >
           Submit
         </Button>
      </Form>
      </Box>
      </Container>
      </ ThemeProvider>
     

    </Formik>
  )
}

export default InputCaloris