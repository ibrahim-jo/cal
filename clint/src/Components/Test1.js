import React,{useState,useEffect} from 'react'
import DatePicker from './Mui/Datapicker'
import {Time} from './Mui/Datapicker'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import  {format}from 'date-fns'
import {
  Container,
  Box,
  TextField,
  Typography,
  Avatar,
  Grid,
  Button,
  TablePagination,
  Pagination
} from "@mui/material";/////
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme,styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import  * as yup from 'yup'
import { FitnessCenterSharp } from '@mui/icons-material'
const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
/////table pagination action

function TablePaginationActions (props){
  const theme = useTheme()
  const {count, page, rowsPerPage, onPageChange }=props
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event,0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return(
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
       <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )

}

TablePaginationActions.propTypes = {
  count: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Test1 =({items,t,p}) => {
     const  x=items.result
    
     const n= Number(items.len||0)
     
    
     x && x.map(item=> {
      return  item.time=item.dateTime,item.isEditmode=false}
      )

      const [page, setpage] = useState(p)
      const [rowsperpage, setrowsperpage] = useState(5)
      const [rows, setrows] = useState([])
useEffect(() => {
  const fetch=()=>{
    setrows(x)
  }
  fetch()
  
}, [x])



  console.log('page',page)
  console.log('leingth',n)

  ///pagt 
 const handleChangePage=(e,newPage)=>{
  setpage(newPage)
  console.log('pagein fron',newPage)
  t(newPage,rowsperpage)
 }
 const  handleChangeRowsPerPage=(e,)=>{
  setrowsperpage(parseInt(e.target.value, 5));
  setpage(0);

 }

  return(
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
      <TableRow>
              <StyledTableCell align="left">Meal </StyledTableCell>
              <StyledTableCell align="left">Date </StyledTableCell>
              <StyledTableCell align="left">Time </StyledTableCell>
              <StyledTableCell align="left">Caloris </StyledTableCell>
              <StyledTableCell align="left">Edit </StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {rows && rows.map(t=>(
          <TableRow  key={t._id} >
           <TableCell>
           {t.meal}
           </TableCell>

          </TableRow>
          
           ))}
        </TableBody>

        <TableFooter>
          <TableRow>
        <TablePagination 
         count={n} 
         page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsperpage}
      onRowsPerPageChange={handleChangeRowsPerPage}
         shape="rounded" 
         SelectProps={{
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
        }}
        
        ActionsComponent={TablePaginationActions}
        
        />
      </TableRow>
       </TableFooter>
      </Table>
    </TableContainer>

  )
//   const initalValues={date: format (new Date(),'MM/dd/yyyy'),
//   time:new Date(),
//   meal: '' ,
//   calories:''}

//   const  validationSchema= yup.object({
//     date:yup.string().required('Required'),
//     meal:yup.string().required('Required'),
//     calories:yup.number().required('Required')
//   })

//    const onSubmit=(values, { setSubmitting }) => {

//      const t=format(values.time,'HH:mm a' )
//        const n={t,...values}
//     setTimeout(() => {
//       setSubmitting(false);
//       alert(JSON.stringify(n, null, 2));
//       console.log('Timef', format (values.time,'hh:mm a'))
//     }, 500);
//   }

//   return (
//     <Formik
//     initialValues={initalValues}
//      validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//         <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Container component="main"  >
//         <Box  sx={{ mt: 3 }}>

//       <Form >
//      < Grid container spacing={1} >
//      <Grid item xs={3}>
//      <  DatePicker   name='date' 
//         label='Date' 
//           />

//      </Grid>
//     <Grid item xs={3}>
//     <Time  name='time' 
//     label='Time' 
//      />

//     </Grid>
//       <Grid item xs={3}>
//         <Field  as={TextField}
//         name='meal'
//         label='Meal'
//         variant='outlined'
//         />
//     <ErrorMessage  name='meal' />

//       </Grid>
//       <Grid item xs={3}>
//         <Field  as={TextField}
//         name='calories'
//         label='Calories'
//         variant='outlined' />
//         <ErrorMessage  name='calories'  />
       
//       </Grid>
//     </Grid>
// <Button 
//          type='submit'
//          fullWidth
//          variant='contained'
//          sx={{mt:3,mb:2}}
//          >
//            Submit
//          </Button>
//       </Form>
//       </Box>
//       </Container>
//       </ ThemeProvider>
     

//     </Formik>
 // )

}

export default Test1