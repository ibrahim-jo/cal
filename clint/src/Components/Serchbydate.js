import DateTimePicker from './Mui/DateTimePicker'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {Form,Formik} from 'formik'
import {
  Container,
  Box,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();

const Serchbydate = ({fromdate,todate,dateRange}) => {

const initalValues={fromdate,todate}
const onSubmit= (values, {resetForm,setSubmitting }) => {
    const a= values.fromdate
    const b= values.todate
    console.log(values.fromdate)
    dateRange(a,b)

}
    


  return (
    
    <Formik
    initialValues={initalValues}
    //  validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
              <ThemeProvider theme={theme}>

      <CssBaseline />

      <Container component='main'>

          <Box xs={4}>

        <Form>
  <Grid container spacing={3}>
    <Grid item xs={3}>
    <DateTimePicker name='fromdate'   label='FromDatePicker'/> 
    </Grid>

    <Grid item xs={3}>
    <DateTimePicker    name='todate'   label='ToDatePicker' />
    </Grid>


<Grid item xs={3} >

<Button 
type='submit'
variant='contained'
sx={{ m: 1 }}
>
 <SearchIcon />
</Button>
</Grid>
</Grid>
        </Form>
        </Box>
        </Container>
        </ThemeProvider>
    </Formik>
  )
}

export default Serchbydate