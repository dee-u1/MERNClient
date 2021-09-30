import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authenticated from '../HOC/authenticated';
import { fetchStudentReservations } from '../redux/reducers/book-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ReservedBooks = (props) => {

    const books = useSelector(state => state.libro.allReservedBooks)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchStudentReservations()); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const columns = [
        { field: 'IDNum', headerName: 'ID No.', flex: .5, disableClickEventBubbling: true, },
        { field: 'firstName', headerName: 'First Name', flex: 1, disableClickEventBubbling: true, },
        { field: 'lastName', headerName: 'Last Name', flex: 1, disableClickEventBubbling: true, },
        { field: 'ISBN', headerName: 'ISBN', flex: .5, disableClickEventBubbling: true, },
        { field: 'title', headerName: 'Title', flex: 1, disableClickEventBubbling: true, },
      ];

    return (
        <Box sx={{ m: 2 }}>
            <Grid container justifyContent="space-between" direction="row" alignItems="center" spacing={2}>
                <Grid item >
                    <Typography variant="h4" style={{ fontWeight: 'bold' }} mb={1}>Book Reservations</Typography>
                </Grid>
            </Grid>
            <div style={{ height:650, width: '100%' }}>
                {Array.isArray(books.data) ?
                    <DataGrid
                      rows={books.data}
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

export default authenticated(ReservedBooks);