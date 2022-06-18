import React from "react";
import Signup from './Components/Signup'
import Login from "./Components/Login";
import Layout from "./Components/layout";
import Home from './Components/Home'
import Test1 from './Components/Test1'
import Missing from './Components/Missing'
import {Routes,Route} from 'react-router-dom'
import Caloris from "./Components/Caloris";
import  RequerAuth from './Components/RequerAuth'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
function App() {
  return ( 
    <LocalizationProvider  dateAdapter={DateAdapter}>

      <Routes  >
        <Route path='/'  element={<Layout />}>
       {/*public */}
        <Route  path='login' element ={<Login />} />
        <Route   path='signup' element ={<Signup />} />
        <Route path='test1' element={<Test1 />}/>
             {/*privet*/}
             <Route element={<RequerAuth />}>
               <Route path='/'  element={<Home />} />
        <Route  path='/caloris/:id'   element ={< Caloris/>} />
        </Route>
        {/*catch all */}
        <Route path="*"   element={<Missing />} />
        </Route>

      </Routes>
      </LocalizationProvider>


     
  );
}

export default App;
