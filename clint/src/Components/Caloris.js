import React,{useState,useEffect} from 'react'
import api from '../Api/privet'
import  InputCaloris from './InputCaloris'
import  Listofcaloris  from './Listofcaloris'
import  Test from './Test1'
import {useParams}from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();

const Caloris = () => {

  const [ismounted, setismounted] = useState(true)
  const [items, setitems] = useState([])
  const [page, setpage] = useState(0)
  const [limt, setlimt] = useState(5)
  var {id}=useParams()
  useEffect(() => {
      
        const fetchData= async()=>{
          if(ismounted){
            try{
             console.log('calorispage is',page)
              const respons= await api.get(`/meals?page=${page}&limt=${limt}`,
           { headers: {'auth_token' : `Bearer ${id}`}})
    
           console.log( `/meals?page=${page}&limt=${limt}`,respons.data)
             setitems( respons.data)
            setismounted(false)
        
          
            }
            catch(error){
             
              console.log('err',error);
    
            }
          }
          
    }
    fetchData()

  }, [id,ismounted])
  
  console.log('itemscaloris',items)
   const test =(p,l)=>{
     setismounted(true)
     setpage(p)
     setlimt(l)
   }
  // console.log('boom',items)

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
    <InputCaloris   id={id}   t={test}   />
       { <Listofcaloris  items={items} p={page} t={test} /> }
     
    {/* { <Test   items={items} p={page} t={test} />} */}
   
    </ThemeProvider>
    
  )
  
}

export default Caloris