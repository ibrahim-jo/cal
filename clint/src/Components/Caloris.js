import React,{useState,useEffect} from 'react'
import api from '../Api/privet'
import  InputCaloris from './InputCaloris'
import  Listofcaloris  from './Listofcaloris'
import {useParams}from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();
const Caloris = () => {

  const [ismounted, setismounted] = useState(true)
  const [items, setitems] = useState([])
  var {id}=useParams()
  useEffect(() => {
      
        const fetchData= async()=>{
          if(ismounted){
            try{
              const respons= await api.get('/meals',
           { headers: {'auth_token' : `Bearer ${id}`}})
    
            console.log(respons.data)
            setitems(respons.data)
            setismounted(false)
        
          
            }
            catch(error){
             
              console.log('err',error);
    
            }
          }
          
    }
    fetchData()

  }, [id,ismounted])
  
   const test =()=>{
     setismounted(true)
   }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
    <InputCaloris   id={id}   t={test}   />
    <Listofcaloris  items={items} />
    </ThemeProvider>
    
  )
  
}

export default Caloris