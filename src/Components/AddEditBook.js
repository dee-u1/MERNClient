import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../redux/reducers/book-reducer';
import BootstrapDialogTitle from './Common/BootstrapDialogTitle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
    padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
    padding: theme.spacing(1),
    },
}));

const AddEditBook = (props) => {
    const [show, setShow] = useState(props.show);
    const [book, setBook] = useState({
            ISBN: '',
            title : '',
            author: '',
            edition: '',
            publication: ''
        }
    );
    const [isInEdit, setEditMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.editItem) {
            setEditMode(true);
            setBook({
                ISBN: props.editItem.ISBN,
                title : props.editItem.title,
                author: props.editItem.author,
                edition: props.editItem.edition,
                publication: props.editItem.publication
            });
        }
    },[props.editItem]);

    const handleClose = () => {
        setShow(false);
        props.handleClose(false);
    };

    const clearInputs = () => {
        setBook({
            ISBN: '',
            title : '',
            author: '',
            edition: '',
            publication: ''
        })
    }

    const addItem = (e) => {
        let newItem ={
            ...book,
            reservedBy: ''
        }

        clearInputs(); 
        dispatch(addBook(newItem));
        props.handleClose(false,true);
    }

    const updateItem = (e) => {
        let newItem = {
            ISBN: book.ISBN,
            title : book.title,
            author: book.author,
            edition: book.edition,
            publication: book.publication
        }            
        //props.saveUpdate(newItem);
        dispatch(updateBook(newItem));
        clearInputs();
        setEditMode(false);
        props.handleClose(false,true);
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
                    {isInEdit ? 'Update Book' : 'Add New Book'}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {  isInEdit  ?
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            size="small"
                            id="ISBN"
                            label="ISBN"
                            name="ISBN"
                            value={book.ISBN}
                            onChange={inputChangeHandler}
                        /> : 
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            id="ISBN"
                            label="ISBN"
                            name="ISBN"
                            value={book.ISBN}
                            onChange={inputChangeHandler}
                        />
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="title"
                        label="Title"
                        name="title"
                        value={book.title}
                        onChange={inputChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="author"
                        label="Author"
                        name="author"
                        value={book.author}
                        onChange={inputChangeHandler} 
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="edition"
                        label="Edition"
                        name="edition"
                        value={book.edition}
                        onChange={inputChangeHandler} 
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        type="text"
                        id="publication"
                        label="Publication"
                        name="publication"
                        value={book.publication}
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

export default AddEditBook