import React,{useState,useEffect} from 'react'
import api from '../Api/privet'
import {useParams}from 'react-router-dom'
import TablePagination from './Mui/TablePagination/index'
const Adminpage = () => {
 const [users, setusers] = useState([])
 const [page, setpage] = useState(0) 
const [limt, setlimt] = useState(2)
 var {id}=useParams()

 useEffect(() => {
 const  fetch=async()=>{

   try{
      const respons=await api.get(`/controlusers?page=${page}&limt=${limt}`,
      { headers: {'auth_token' :`Bearer ${id}`}})
   setusers(respons.data)
   console.log('controll',respons.data)

   }
   catch(err){
    console.log(err)
   }
  }

  fetch()
   
 }, [id])

  return (
    <div>admincontrool
          <TablePagination page={page} lim={limt} />

    </div>
  )
}

export default Adminpage