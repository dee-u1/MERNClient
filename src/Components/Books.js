import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, removeBook } from '../redux/reducers/book-reducer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import authenticated from '../HOC/authenticated';
import AddEditBook from './AddEditBook';
import Snackbar from '@mui/material/Snackbar';
import Alert from './Common/Alert';

const Books = (props) => {
    const [showDataEntry, setShowDataEntry]=useState(false);
    const [editItem, setEditItem]=useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const mgaLibro = useSelector(state => state.libro.books);
    const currentUser = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchBooks());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const displayDataEntry = () =>{
        setEditItem(null);
        setShowDataEntry(true);
    }

    const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };
    
    const handleClose = (e,f) => {
        setShowDataEntry(e);
        if (f === true){
          setAlertMessage('Record was successfully saved');
          setOpenAlert(true);
        }   
    };
    
    const editBook = (book, ISBN) => {
        setEditItem(book);
        setShowDataEntry(true);
    }
    
    const editBtnClickHandler = (e) => {       
        editBook(e, e.ISBN)
    }
 
    const deleteBtnClickHandler = (e) => {
        dispatch(removeBook(e._id));
        setAlertMessage('Record was successfully removed');
        setOpenAlert(true);
    }

    const renderDetailsButton = (params) => {
        return (
            <>
            <IconButton aria-label="edit" color="primary"  onClick={ () => editBtnClickHandler(params.row) } ><EditIcon /></IconButton>{' | '}
            <IconButton aria-label="delete" color="error" onClick={ () => deleteBtnClickHandler(params.row)  } ><DeleteIcon /></IconButton>
            </>
        );
    }

    const columns = [
        { field: '_id', hide: true  },
        { field: 'ISBN', headerName: 'ISBN', flex: .5, disableClickEventBubbling: true, },
        { field: 'title', headerName: 'Title', flex: 1, disableClickEventBubbling: true, },
        { field: 'author', headerName: 'Author', flex: 1, disableClickEventBubbling: true, },
        { field: 'edition', headerName: 'Edition', flex: .5, disableClickEventBubbling: true, },
        { field: 'publication', headerName: 'Publication', flex: 1, disableClickEventBubbling: true,},
        { field: '-', headerName: 'Action', flex: .5, renderCell: renderDetailsButton, disableClickEventBubbling: true, },
      ];    

    return (
        <Box sx={{ m: 2 }} >
         <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleAlertClose} >
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
         </Snackbar>
        {showDataEntry ?
          <AddEditBook show={showDataEntry} handleClose={handleClose} editItem={editItem} /> : ''
        }
        <Grid container justifyContent="space-between" direction="row" alignItems="center" spacing={2}>
          <Grid item >
            <Typography variant="h4" style={{ fontWeight: 'bold' }} mb={1}>Books</Typography>
          </Grid>
          <Grid item >
            {currentUser.username.length > 0 && currentUser.isAdmin === true  ? 
              <Button onClick={displayDataEntry} margin="normal" variant="contained" >Add New Entry</Button> : null }   
          </Grid>
        </Grid>
          <div style={{ height:650, width: '100%' }}>
                {Array.isArray(mgaLibro.data) ?
                    <DataGrid
                      rows={mgaLibro.data}
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

export default authenticated(Books);