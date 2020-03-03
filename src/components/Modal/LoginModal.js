import React, { useState } from 'react';
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions }
    from '@material-ui/core';

export default function LoginModal(props) {


    // State
    const [emial, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Mutators
    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.password);
    };

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
                    <Button>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}