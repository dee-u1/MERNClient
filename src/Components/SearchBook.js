import React, { useState }   from 'react';
// import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { setSearchCriteria } from '../redux/reducers/search-reducer';

import './opac.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const SearchBook = (props) => {

    const [searchWord, setSearchWord]=useState('');
    const [searchOption, setSearchOption]=useState('title');
        
    const history = useHistory();
    const dispatch = useDispatch();

    const searchOptionSelectChanged = (e) => {
        setSearchOption(e.target.value);
    }

    const searchValueChanged = (e) => {
        setSearchWord(e.target.value);
    }    
    
    const btnSearchClick = () => {
        if (searchWord.trim().length > 0){
             //props.BookSearchResult(searchResult);  
             const search = {
                 word: searchWord,
                 option: searchOption
             }
             dispatch(setSearchCriteria(search));         
             history.push("/searchresult");
        }
    }

    return (
        <div>
            <div className="search-wrapper">
                <div className="search-inner">
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off">
                    <Grid container alignItems="center" direction="row" spacing={0}>
                        <Grid item xs={3}>
                            <FormControl fullWidth >
                                <Select
                                    value={searchOption}
                                    onChange={searchOptionSelectChanged}
                                    size="small"
                                >
                                <MenuItem value="DEFAULT" disabled>
                                    <em>Search Option</em>
                                </MenuItem>
                                <MenuItem value="title">Title</MenuItem>
                                <MenuItem value="author">Author</MenuItem>
                                <MenuItem value="publication">Publication</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                className="searchInput"
                                variant="outlined"
                                size="small"
                                required
                                fullWidth
                                id="ISBN"
                                label="Search"
                                name="Search"
                                value={searchWord}
                                onChange={searchValueChanged}
                            />              
                        </Grid>
                        <Grid item xs={2}>
                         <Button color="success" variant="contained" margin="dense" onClick={btnSearchClick} >Search</Button>
                        </Grid>
                    </Grid>
                </Box>
                </div>
            </div>            
        </div>      
    );
}

export default SearchBook;