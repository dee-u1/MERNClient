import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import BootstrapDialogTitle from './Common/BootstrapDialogTitle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
    padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
    padding: theme.spacing(1),
    },
}));

const AddEditStudent = (props) => {
    const [show, setShow] = useState(props.show);
    const [book, setBook] = useState({
            IDNum: '',
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            confirmpassword: ''
        }
    );
    const [isInEdit, setEditMode] = useState(false);
    
    const history = useHistory();

    useEffect(() => {
        if (props.editItem) {
            setEditMode(true);
            setBook({
                IDNum: props.editItem.IDNum,
                firstName : props.editItem.firstName,
                lastName : props.editItem.lastName,
                userName : props.editItem.userName,
                password : props.editItem.password,
                confirmpassword: props.editItem.confirmpassword
            });
        }
    },[props.editItem]);

    const handleClose = () => {
        setShow(false);
        //props.handleClose(false);
        history.push("/");
    };

    const addItem = (e) => {
        let newItem = book;
        props.addStudent(newItem);
        clearInputs(); 
        //props.handleClose(false);
        setShow(false);
        history.push("/");
    }

    const clearInputs = () => {
        setBook({
            IDNum: '',
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            confirmpassword: ''
        })
    }

    const updateItem = (e) => {
        let newItem = {
            IDNum: book.IDNum,
            firstName: book.firstName,
            lastName: book.lastName,
            userName: book.userName,
            password: book.password,
            confirmpassword: book.confirmpassword
        }            
        props.saveUpdate(newItem);
        clearInputs();
        setEditMode(false);
        props.handleClose(false);
    }

    const btnClickHandler = () => {
        if (isInEdit) {
            updateItem();
        }
        else {
            addItem();
        }
    }

    const inputChangeHandler = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }

    return(
        <> 
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={show}
                maxWidth={'xs'}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {isInEdit ? 'Update Student Data' : 'Add New Student'}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {   isInEdit  ?
                        <TextField
                            variant="outlined"
                            margin="normal"
                            disabled
                            required
                            fullWidth
                            size="small"
                            id="IDNum"
                            label="IDNum"
                            name="IDNum"
                            autoFocus
                            value={book.IDNum}
                            onChange={inputChangeHandler}
                        /> : 
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            id="IDNum"
                            label="IDNum"
                            name="IDNum"
                            autoFocus
                            value={book.IDNum}
                            onChange={inputChangeHandler}
                        />
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={book.firstName}
                        onChange={inputChangeHandler} 
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={book.lastName}
                        onChange={inputChangeHandler} 
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="userName"
                        label="UserName"
                        name="userName"
                        value={book.userName}
                        onChange={inputChangeHandler} 
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        type="password"
                        id="password"
                        label="Password"
                        name="password"
                        value={book.password}
                        onChange={inputChangeHandler} 
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        type="password"
                        id="password"
                        label="Confirm Password"
                        name="confirmpassword"
                        value={book.confirmpassword}
                        onChange={inputChangeHandler} 
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button autoFocus onClick={btnClickHandler}>OK</Button>
                </DialogActions>
            </BootstrapDialog>    
        </>
    )
}

export default AddEditStudent