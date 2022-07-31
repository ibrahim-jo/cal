import React,{useState,useEffect} from 'react'
import api from '../Api/privet'
import  InputCaloris from './InputCaloris'
import  Listofcaloris  from './Listofcaloris'
import  Test from './Test1'
import subDays from 'date-fns/subDays'
import Serchbydate from './Serchbydate'
import {useParams}from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();

const Caloris = () => {

  const [ismounted, setismounted] = useState(true)
  const [items, setitems] = useState([])
  const [page, setpage] = useState(0)
  const [limt, setlimt] = useState(5)
  const [startt, setstartt] = useState(subDays(new Date(), 3))
  const [endt, setendt] = useState(new Date())

  var {id}=useParams()
  useEffect(() => {
      
        const fetchData= async()=>{
          if(ismounted){
            try{
             console.log('calorispage is',page)
             console.log('from is',startt)
              const respons= await api.get(`/meals?page=${page}&limt=${limt}
              &startt=${startt}&endt=${endt}`,
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
 const dateRange=(fromdate,todate)=>{
  setstartt(fromdate)
  setendt(todate)
  setismounted(true)
 }

  return (
    <ThemeProvider theme={theme} >
        <CssBaseline />
    <InputCaloris   id={id}   t={test}   />
    <Serchbydate  fromdate={startt} todate ={endt}  dateRange={dateRange}/>
       <Listofcaloris  items={items} p={page} t={test} /> 
     
    {/* { <Test   items={items} p={page} t={test} />} */}
   
    </ThemeProvider>
    
  )
  
}

export default Caloris