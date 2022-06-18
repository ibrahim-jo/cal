import * as React from 'react'
import '../index.css';
import {useNavigate } from 'react-router-dom'
import UseAuth from "../hooks/UseAuth";
import CssBaseline from '@mui/material/CssBaseline';
import {Container,Box,TextField,Typography,Avatar,Grid,Button} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {Form,Formik,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup';
import api from '../Api/subroute'
const theme=createTheme();



const SignUp = () => {
  const navigate=useNavigate()
  const {setAuth}=UseAuth()
const initalValues={firstName:'',lastName:'',password:'',email:''}
const validationSchema=Yup.object({
  firstName:Yup.string().required('Required'),
  lastName:Yup.string().required('Required'),
  email:Yup.string().email('Invalid email address').required('Required'),
  password:Yup.string().required('Required').min(7),
})
  const handleSubmit = async(values,formikhelper) => {
    try{

          const {data}= await  api.post('/register',values)
           
            console.log(data._doc.firstName)
            setAuth({name:data._doc.firstName,email:data._doc.email,token:data.token})

         navigate(`/caloris/${data.token}`)
   

     formikhelper.setSubmitting(false);

    }

    catch(err){
          console.log(`Error:${{message:err.message}}`)
    }

     

    
  };
  return (
    <Formik  
    initialValues={initalValues}
    validationSchema={validationSchema}
     onSubmit={handleSubmit} >
    <ThemeProvider theme={theme}>

  

     <CssBaseline />
    <Container     component='main'  maxWidth='sm' >
      out1
      <Box   className= 'box'   >

      <Avatar className='avatar'>
      <EmojiEmotionsIcon />
          </Avatar>
      <Typography component="h1"  variant="h5">
            Sign up
          </Typography>
        <Box  sx={{mt:3}}>
        <Form>    
         <Grid  container spacing={2}>
           <Grid item xs={12} sm={6} >
           <   Field as={TextField} 
             name='firstName' 
           fullWidth
         id='firstName'
         label='First Name'
         />
         <ErrorMessage name='firstName'   />

             </Grid>
         <Grid item xs={12} sm={6}>
         <Field as= {TextField}   name='lastName' 
         fullWidth
         id='lastName' 
         label='Last Name'/>
   <ErrorMessage name='lastName' />

         </Grid>
         <Grid item xs={12}>
           
          < Field as={TextField}   name='email' 
          fullWidth
         id='email'
         label='Email'/>
            <ErrorMessage name='email' />

         </Grid>
         <Grid item xs={12} >
         <  Field  as={TextField}  name='password' 
         fullWidth
         type="password"
         id='password' 
         label='Password'/>
   <ErrorMessage name='password'  />

         </Grid>
         </Grid>
         <Button 
         type='submit'
         fullWidth
         variant='contained'
         sx={{mt:3,mb:2}}
         >
           SignUp
         </Button>
          
         </Form>

        </Box>  
      </Box>
    </Container>
    </ThemeProvider>
    </Formik>


    
  )
}

export default SignUp