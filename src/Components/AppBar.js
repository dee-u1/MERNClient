import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from './Login';
import Books from './Books';
import Students from './Students';
import ReservedBooks from './ReservedBooks';
import AddEditStudent from './AddEditStudent';
import SearchBook from './SearchBook'
import SearchResult from './SearchResult';
import StudentReservedBooks from './StudentReservedBooks';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, logOutStudent } from '../redux/reducers/student-reducer';
import { logoutUser } from '../redux/reducers/user-reducer';
import Tab from '@mui/material/Tab';

export default function ButtonAppBar() {
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();

  let currentUser = useSelector(state => state.user.user);

  const addNewStudent = (student) => {
    dispatch(addStudent(student));
  }

  const logoutHandler = () => {
    if (currentUser.isAdmin === false)
        dispatch(logOutStudent());
    dispatch(logoutUser());
  }

  const setBookSearchResult = (data) => {
    setSearchResult(data);
  }

  return (
    <Router>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box component="div" sx={{ flexGrow: 1 }}>
          
            <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Online Public Access Catalogue  
            </Typography>
          {currentUser.username.length > 0 && currentUser.isAdmin === true ?
                <>
                <Tab label='Books' to='/books' component={Link} />
                <Tab label='Students' to='/students' component={Link} />
                <Tab label='Reserved Books' to='/reservedBooks' component={Link} />
                </> : null
            }
            {currentUser.username.length > 0 && currentUser.isAdmin === false ?
                <Tab label='Reserved Books'  to='/reservations' component={Link} />
                : null
            }
          </Box>
          {currentUser.username.length > 0  ?
                <>
                    <Button color="inherit" onClick={logoutHandler} component={Link} to="/" >Log-out {currentUser.username}</Button>
                </> :
                <>
                    <Button color="inherit" component={Link} to="/register" >Register</Button>
                    <Button color="inherit" component={Link} to="/login" >Login</Button>                      
                </>
            }
          
        </Toolbar>
      </AppBar>
    </Box>
    <Switch>
      <Route path="/login">
          <Login open={true} />
      </Route>
      <Route path="/register">
        <AddEditStudent show={true} addStudent={addNewStudent} />
      </Route>
      <Route path="/books">
          <Books  />
      </Route>
      <Route path="/students">
          <Students />
      </Route>
      <Route path="/reservedBooks">
        <ReservedBooks />
      </Route>
      <Route path="/searchresult">
          <SearchResult searchBooks={searchResult} />
      </Route>
      <Route path="/reservations">
          <StudentReservedBooks />
      </Route>
      <Route path="/">
        <SearchBook BookSearchResult={setBookSearchResult} />
      </Route>
    </Switch>
    </Router>
  );
}
