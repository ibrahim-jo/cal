import React,{useState,useEffect}from 'react';
import {AppBar,MenuItem,Menu,Box,Toolbar,Typography
  ,Button,MenuIcon,IconButton} from '@mui/material';
  import AccountCircle from '@mui/icons-material/AccountCircle';
import UseAuth from '../hooks/UseAuth'
import api from '../Api/privet'

import {Link} from 'react-router-dom'
const Header=()=> {
  const {auth,setAuth}=UseAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [isAdmin, setisAdmin] = useState(false)
  const openMenu=Boolean(anchorEl)
    
     
    console.log('Header',auth.token)

useEffect(() => {
     const fetchData=async()=>{
      if(auth.token!=undefined){
        try{
        const respons=await api.get('/admin',{headers: {'auth_token' : `Bearer ${auth.token}`}})
         console.log('isAdminfrom server',respons.data)
         setisAdmin(respons.data)
     }
     
     catch(error){
       console.log('err',error);
     }
      }
      else{
           setisAdmin(false)
      }
 
    }
    fetchData()

}, [auth])


console.log('stateofisadmin',isAdmin);

    const handleMenu=(e)=>{
     setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { auth && auth.name?auth.name:<p>Guste</p>}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls='basic-menu'
            aria-haspopup='true'
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
           <AccountCircle />

          </IconButton>
          <Menu
                id="menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
          
                <MenuItem onClick={handleClose}>Profile</MenuItem>
               { isAdmin?<MenuItem onClick={handleClose}>
                <Link to={`/admin/${auth.token}`}>Admin </Link>
                </MenuItem>:null}
                 <MenuItem onClick={handleClose}>
                <Link to={'/'}  onClick={()=>setAuth('')} >Logout </Link>
                </MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header