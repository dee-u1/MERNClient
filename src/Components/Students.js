import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authenticated from '../HOC/authenticated';
import { fetchStudents } from '../redux/reducers/student-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Students = (props) => {

    const students = useSelector(state => state.students.students)
    const dispatch = useDispatch();

    useEffect(()=> {        
        dispatch(fetchStudents());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const columns = [
        { field: '_id', hide: true  },
        { field: 'IDNum', headerName: 'ID No.', flex: .5, disableClickEventBubbling: true, },
        { field: 'firstName', headerName: 'First Name', flex: 1, disableClickEventBubbling: true, },
        { field: 'lastName', headerName: 'Last Name', flex: 1, disableClickEventBubbling: true, },
        { field: 'userName', headerName: 'Username', flex: .5, disableClickEventBubbling: true, },
      ];

    return (
        <Box sx={{ m: 2 }}>
            <Grid container justifyContent="space-between" direction="row" alignItems="center" spacing={2}>
                <Grid item >
                    <Typography variant="h4" style={{ fontWeight: 'bold' }} mb={1}>Students</Typography>
                </Grid>
            </Grid>
            <div style={{ height:650, width: '100%' }}>
                {Array.isArray(students.data) ?
                    <DataGrid
                      rows={students.data}
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

export default authenticated(Students);