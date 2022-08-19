import React,{useState}from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function index({page,lim}) {
  const [page, setPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(lim);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
