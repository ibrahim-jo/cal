import  React,{useState} from "react";
import UseAuth from "../hooks/UseAuth";
import { Link ,useNavigate} from "react-router-dom";
import "../index.css";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Box,
  TextField,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../Api/subroute";

const theme = createTheme();

const Login = () => {
  const {setAuth}=UseAuth()
  const [messagge, setmessagge] = useState('')
  const navigate=useNavigate()
  const initialValues = { email:  "", password: ""};
  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string()
      .required("Required")
      .min(7),
  });
  const handelsubmit = async (values, formikhelper) => {
    console.log("login", values.email);
    try{
      const {data} = await api.post('/login',{email:values.email,password:values.password});
       console.log('serverdata',data)
       setAuth({name:data.firstName,email:data.email,token:data.token})
       setmessagge('')
       navigate(`/caloris/${data.token}`)
    }
     catch(err){
         //console.log( 'err',err.response.data.message)
          const error =err.response.data.message
           setmessagge(error)
          
    }
  
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelsubmit}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm">
          <div >{messagge}</div>
          <Box className="box">
            <Avatar className="avatar">
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LogIn
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      id="email"
                      label="Email"
                      fullWidth
                    />
                    <ErrorMessage name="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                    />
                    <ErrorMessage name="password" />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  LogIn
                </Button>
              </Form>
            </Box>
          </Box>

          <Link to="/signup"> Dont have an account Sign up </Link>
        </Container>
      </ThemeProvider>
    </Formik>
  );
};

export default Login;
