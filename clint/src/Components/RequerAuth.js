import React from 'react'
import {Navigate,useLocation,Outlet} from 'react-router-dom'
import UseAuth from '../hooks/UseAuth'

const RequerAuth = () => {
    const location=useLocation()
    const {auth}=UseAuth()
  return (
       auth.name?<Outlet />:<Navigate to='/login' state={{from:location}} replace />
  )
}

export default RequerAuth