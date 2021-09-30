import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewReservations, fetchAvailableBooks } from '../redux/reducers/book-reducer';
import { useHistory } from "react-router-dom";
import './opac.css';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SearchResult = (props) => {
    const [selectionModel, setSelectionModel] = useState([]);
    const currentUser = useSelector(state => state.user.user)
    const searchWord = useSelector(state => state.search.word)
    const searchOption = useSelector(state => state.search.option)
  
    const books = useSelector(state => state.libro.books);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=> {
        dispatch(fetchAvailableBooks());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let newSelections = [];
    let currentIDNum = useSelector(state => state.students.IDNum);

    const btnSubmitClickHandler = () => {

        if (selectionModel.length < 1){
            alert("Please make a selection first.");
            return;
        }

        selectionModel.forEach((item, index) => {
            const book = {
                IDNum: currentIDNum,
                _id: item,
            }
            newSelections.push(book);
        });
        
        dispatch(addNewReservations(newSelections));
        history.push("/reservations");
    }

    let searchResult = [];
    if (Array.isArray(books.data)) {
        searchResult = books.data.filter(item => item[searchOption].toLowerCase().indexOf(searchWord) > -1);   
    }
    
    const columns = [        
        { field: 'ISBN', headerName: 'ISBN', flex: .5, disableClickEventBubbling: true, },
        { field: 'title', headerName: 'Title', flex: 1, disableClickEventBubbling: true, },
        { field: 'author', headerName: 'Author', flex: 1, disableClickEventBubbling: true, },
        { field: 'edition', headerName: 'Edition', flex: .5, disableClickEventBubbling: true, },
        { field: 'publication', headerName: 'Publication', flex: 1, disableClickEventBubbling: true,},
        { field: '_id', hide: true, flex: 1  },
      ];    

    return (
        <Box sx={{ m: 2 }}>
            <Grid container justifyContent="space-between" direction="row" alignItems="center" spacing={2}>
                <Grid item >
                    <Typography variant="h4" style={{ fontWeight: 'bold' }} mb={1}>Books containing '{searchWord}' in {searchOption}</Typography>
                </Grid>
            </Grid>
           <div style={{ height:650, width: '100%' }}>
                {searchResult.length > 0 ?
                    <DataGrid
                        checkboxSelection={ currentUser.isAdmin===false && currentUser.username.length > 0 ? true : false}
                        rows={searchResult}
                        columns={columns}
                        getRowId={(row) => row._id}        
                        pageSize={10}        
                        autoHeight
                        disableColumnMenu 
                        onSelectionModelChange={(newSelection) => {
                            setSelectionModel(newSelection);
                        }}
                    /> : null
                }
                { currentUser.isAdmin===false && currentUser.username.length > 0 ?
                <Button variant="contained" onClick={btnSubmitClickHandler}>Submit selection</Button>
                : null }
            </div>

            
        </Box>      
    );
}

export default SearchResult;