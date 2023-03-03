import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Alerts() {
    return (
        <Alert severity="success" sx={{ 
            position: 'absolute',
            top: '3%',
            width: '40%',
            right: '1%'
         }}>
            <AlertTitle>Đăng nhập thành công</AlertTitle>
        </Alert>

    );
}
