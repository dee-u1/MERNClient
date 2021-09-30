import React, {useState} from "react";
import { setUser } from '../redux/reducers/user-reducer';
import { setStudentData } from "../redux/reducers/student-reducer";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BootstrapDialogTitle from "./Common/BootstrapDialogTitle";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
    padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
    padding: theme.spacing(1),
    },
}));

const Login = (props) => {
    const [open, setOpen] = useState(props.open);
    const [optionSelected, setOptionSelected] = useState('admin');
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const history = useHistory();
    const dispatch = useDispatch();

    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        history.push("/");
    }

    const inputChangeHandler = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        });
    }
    
    const fetchOneUser = (params) => {
        axios.get('/api/users', { params } )
            .then(function(response) {          
                console.log("response", response);
                if (response.data.length > 0){
                    
                    const user = {
                        username: response.data,
                        isAdmin: true
                    };
                    dispatch(setUser(user));      
                    history.push("/");

                }
                else{
                    alert("Wrong username or password");
                }
            }).catch(function(error) {
                console.log('Error on Authentication');
                alert("error");
            });
    }

      const fetchStudentAccount = async params => {

        axios.get('/api/students/checkaccount', { params } )
            .then(function(response) {          
                console.log("response", response.data.data[0].firstName);
                if (response.data.data[0].firstName.length > 0){
                    
                    const user = {
                        username: response.data.data[0].firstName + ' ' + response.data.data[0].lastName,
                        isAdmin: false
                    };

                    dispatch(setUser(user));                    
                    dispatch(setStudentData(response.data.data[0]));
                    history.push("/");
                }
                else{
                    alert("Wrong username or password");
                }
            }).catch(function(error) {
                console.log('Error on Authentication');
                console.log("error", error)
                alert("error");
            });        
    }

    const btnClickHandler = () => {
        const params = {
            username: loginData.username,
            password: loginData.password
            };
        if (optionSelected === "admin")
            fetchOneUser(params);
        else
            fetchStudentAccount(params);
    }

    const handleChange = (event) => {
        setOptionSelected(event.target.value);
    };

    return (
        <div>        
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Log-in
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <RadioGroup 
                        row aria-label="userType"
                        name="row-radio-buttons-group"
                        value={optionSelected}
                        onChange={handleChange}>
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                    </RadioGroup>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={loginData.username}
                        onChange={inputChangeHandler} 
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        size="small"
                        autoComplete="current-password"
                        value={loginData.password}
                        onChange={inputChangeHandler} 
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button autoFocus onClick={btnClickHandler}>OK</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default Login;