import React,{useState,useEffect} from "react";
import { format } from "date-fns";
import PropTypes from 'prop-types';
import api from '../Api/privet'
import {useParams}from 'react-router-dom'

import {
  Container,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  IconButton,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import {
 DoNotDisturbAlt,
DoneAll,
KeyboardArrowLeft,
KeyboardArrowRight,
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme,styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { parseISO } from "date-fns/esm";



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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  
}));

///for table pagination
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
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

  return (
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
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

///   for editcell
const CustomTableCell=({row,name,onChange})=>{
   const {isEditmode}=row
  return(
           
    <StyledTableCell align="left" >

      {
    
    isEditmode  ?
       name==='time'?
       
       <TextField 
       variant="standard"
       value={format(new Date(row[name]), "hh:mm")}
       name={name}
       onChange={e=>onChange(e,row)}
        
       />:
       name==='dateTime'?
       <TextField 
       variant="standard"
       value={format(new Date(row[name]), "MM/dd/yyyy")}
       name={name}
       onChange={e=>onChange(e,row)}
       
       />
       
       :
       <TextField
       variant="standard" 
       value={row[name]}
       name={name}
       onChange={e=>onChange(e,row)}
       
       />
       :
       name==='dateTime'?
       format(new Date(row[name]), "MM/dd/yyyy")
       :
       name==='time'?
       format(new Date(row[name]), "hh:mm")
       :
       row[name]
    }
    </StyledTableCell>
       
  )
   
}


const Listofcaloris = ({ items }) => {
  /////add editable option 
  var {id}=useParams()
  items.map(item=> {
      
    return  item.time=item.dateTime,item.isEditmode=false}
    )

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setrows] = useState([])
  const [previous, setprevious] = useState({})
   

   useEffect(() => {

    setrows(items)
   
   }, [items])
   console.log('x',rows)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /////togleEdit
  const onTegoleEdit= (id)=>{
   
     setrows((state)=>{
      return   rows.map((row ) =>{
           
        if(row._id===id){
         // console.log({...row,isEditmode:!row.isEditmode})
          return {...row,isEditmode:!row.isEditmode} 
          
        }
        return row
           
     })
     })

  
}

  ////change fir edit cell
  const onChange=(e,row)=>{
       const date=new Date(row.dateTime)
       //date.setHours(e.target.value)

     if(!previous[row._id]){
         setprevious(state=>{
          return {...state,[row._id]:row}
         })}
       
         if(e.target.name==='time' ){
         date.setHours(parseInt( e.target.value))
        
         const value= date
         const name=e.target.name
         console.log(name,value)
         const {_id}=row
        const newRows=rows.map(row=>{
                  if(row._id===_id){
                     return {...row,[name]:value}
                   }
                   return row   })
         setrows(newRows)
         }
       else{
        const value= e.target.value
        const name=e.target.name
        const {_id}=row
       const newRows=rows.map(row=>{
                 if(row._id===_id){
                    return {...row,[name]:value}
                  }
                  return row   })
        setrows(newRows)
       }
   
  }
   const updatehandel=async(row)=>{
        console.log(row)
        onTegoleEdit(row._id)
  //  try{
  //   const respons= await api.patch(`/meal/${row._id}`,{meal:row.meal,
  //     ncal:row.ncal,
  //     },
  //   { headers: {'auth_token' : `Bearer ${id}`}})

  //    console.log(respons.data)
  //    onTegoleEdit(row._id)
  //  }
  //  catch(error){
  //    console.log(error)

  //  }


   }
  return (
    <ThemeProvider theme={theme}>

    <Container fixed>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
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
            {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : 

            rows).map((row) => (
              <StyledTableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CustomTableCell {...{row,name:'meal',onChange}} />
                <CustomTableCell {...{row,name:'dateTime',onChange}} />
                <CustomTableCell {...{row,name:'time',onChange}} />
                <CustomTableCell {...{row,name:'ncal',onChange}} />

                <StyledTableCell align="left" sx={{ width: 200 }} >
               {row.isEditmode ?
               <>
               <IconButton  aria-label="done" onClick={()=>updatehandel(row)}>
                  <DoneAll />
               </IconButton> 
               <IconButton   aria-label="revent" onClick={()=>console.log('Revent')} >
                <DoNotDisturbAlt />
               </IconButton>
               </>
               :
               <>
                 <Button variant='contained' sx={{mx:0.5}} onClick={()=>onTegoleEdit(row._id) }>
                  <EditIcon />
                  </Button>
                  <Button variant='contained'  sx={{mx:0.5}} >
                    <DeleteOutlineIcon />
                    </Button>
                </>
                }
                  
                </StyledTableCell>
                {/* <StyledTableCell align="left" >{item.meal}</StyledTableCell>
                <StyledTableCell align="left">
                  {format(new Date(item.dateTime), "MM/dd/yyyy")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {format(new Date(item.dateTime), "hh:mm")}
                </StyledTableCell>
                <StyledTableCell align="left"> {item.ncal}</StyledTableCell>
                <StyledTableCell align="left" sx={{ width: 200 }} >
                  <Button variant='contained' sx={{mx:0.5}}>{<EditIcon /> }</Button>
                  <Button variant='contained'  sx={{mx:0.5}} >{<DeleteOutlineIcon />}</Button>
                </StyledTableCell>  */}
                  

              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}

          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
    </Container>
    </ThemeProvider>


   
  );
};

export default Listofcaloris;
