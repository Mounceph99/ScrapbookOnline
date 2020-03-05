import React, { useState } from 'react';
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions }
    from '@material-ui/core';
import axios from 'axios';

export default function LoginModal(props) {

    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Mutators
    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.password);
    };

    // API
    const handleSubmit = () => {
        axios
        .post('/login', {
            email: email,
            password: password
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            clearForm();
            console.log(err)
        });
    };

    const clearForm = () => {
        document.getElementById('email-text-field').value = '';
        document.getElementById('password-text-field').value = '';
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleCloseLoginModal}>
                <DialogTitle id='login-dialog'>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your email address and password to login to Scapbook Online.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id='email-text-field'
                        label='Email: '
                        type='email'
                        fullWidth
                        onChange={handleChangeEmail}
                    />
                    <TextField
                        id='password-text-field'
                        label='Password: '
                        type='password'
                        fullWidth
                        onChange={handleChangePassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}