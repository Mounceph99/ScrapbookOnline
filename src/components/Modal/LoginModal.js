import React from 'react';
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions }
    from '@material-ui/core';

export default function newLoginModal(props) {

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
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
                    />
                    <TextField
                        id='password-text-field'
                        label='Password: '
                        type='password'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={send}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}