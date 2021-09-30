import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentReservationsInvididual } from '../redux/reducers/book-reducer';
import { cancelReservedBook } from '../redux/reducers/book-reducer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const StudentReservedBooks = (props) => {

    const books = useSelector(state => state.libro.allReservedBooks)
    let currentStudent = useSelector(state => state.students.IDNum);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchStudentReservationsInvididual(currentStudent));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    
    let currentIDNum = useSelector(state => state.students.IDNum);
    let currentFirstName = useSelector(state => state.students.firstName);
    let currentLastName = useSelector(state => state.students.lastName);

    let reservedBooksDisplay = [];

    if (Array.isArray(books.data)) {
        reservedBooksDisplay = books.data.map(book => {
            return {
                _id: book._id,
                IDNum: currentIDNum,
                firstName: currentFirstName,
                lastName: currentLastName,
                ISBN: book.ISBN,
                title: book.title,
            }
        }
    )};

    const deleteBtnClickHandler = (e) => {
        const bookToCancel = {
            ISBN: e.ISBN,
            IDNum: currentIDNum
        };

        dispatch(cancelReservedBook(bookToCancel));
    }

    const renderDetailsButton = (params) => {
        return (
            <>
            <IconButton aria-label="delete" color="error" onClick={ () => deleteBtnClickHandler(params.row)  } ><CancelIcon /></IconButton>
            </>
        );
    }
  
    const columns = [
        { field: '_id', hide: true  },
        { field: 'IDNum', headerName: 'ID No.', flex: .5, disableClickEventBubbling: true, },
        { field: 'firstName', headerName: 'First Name', flex: .5, disableClickEventBubbling: true, },
        { field: 'lastName', headerName: 'Last Name', flex: 1, disableClickEventBubbling: true, },
        { field: 'ISBN', headerName: 'ISBN', flex: .5, disableClickEventBubbling: true, },
        { field: 'title', headerName: 'Title', flex: .5, disableClickEventBubbling: true, },
        { field: '-', headerName: 'Action', flex: .5, renderCell: renderDetailsButton, disableClickEventBubbling: true, },
      ];    

    return (
        <Box sx={{ m: 2 }}>
            <Grid container justifyContent="space-between" direction="row" alignItems="center" spacing={2}>
                <Grid item >
                    <Typography variant="h4" style={{ fontWeight: 'bold' }} mb={1}>Book Reservations</Typography>
                </Grid>
            </Grid>
            <div style={{ height:650, width: '100%' }}>
                {Array.isArray(reservedBooksDisplay) ?
                    <DataGrid
                      rows={reservedBooksDisplay}
                      columns={columns}
                      getRowId={(row) => row._id}        
                      pageSize={10}        
                      autoHeight
                      disableColumnMenu 
                    /> : null
                }
            </div>
        </Box>
    );
}

export default StudentReservedBooks;