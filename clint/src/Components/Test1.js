import React from 'react'
import DatePicker from './Mui/Datapicker'
import {Time} from './Mui/Datapicker'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import  {format}from 'date-fns'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  TextField,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import  * as yup from 'yup'
const theme = createTheme();


const Test1 = () => {
  const initalValues={date: format (new Date(),'MM/dd/yyyy'),
  time:new Date(),
  meal: '' ,
  calories:''}

  const  validationSchema= yup.object({
    date:yup.string().required('Required'),
    meal:yup.string().required('Required'),
    calories:yup.number().required('Required')
  })

   const onSubmit=(values, { setSubmitting }) => {

     const t=format(values.time,'HH:mm a' )
       const n={t,...values}
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(n, null, 2));
      console.log('Timef', format (values.time,'hh:mm a'))
    }, 500);
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
        name='calories'
        label='Calories'
        variant='outlined' />
        <ErrorMessage  name='calories'  />
       
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

export default Test1