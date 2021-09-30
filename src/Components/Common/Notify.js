import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import { Snackbar } from '@mui/material'

const Notify =(props) => {
    const [show, setShow] = useState(props.show);

    useEffect(()=> {
        setShow(props.open)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShow(false);
    };
    
    return (
        <div>
        alert('test')
        <Snackbar open={show} autoHideDuration={6000} onClose={handleAlertClose} >
            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
        </div>
    )
}

export default Notify;