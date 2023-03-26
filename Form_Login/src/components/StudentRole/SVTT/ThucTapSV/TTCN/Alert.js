import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AlertMessage = ({ message }) => {
    return message === null ? null : (
        <Alert severity={message.type} sx={{
            position: 'fixed',
            width: '40%',
            bottom: '0',
            right: '2%',
            zIndex: '1000'
        }}>
            <AlertTitle>{message.text}</AlertTitle>
        </Alert>
    )
}

export default AlertMessage