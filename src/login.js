import React from "react";
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import './App.css';

var username;
var password;

function handleSubmit(e){
    if(!validateUsername()) {
        return;
    }
}

function validateUsername() {
    if((/^[\S]+$/).test(username)){
        // TODO clear fields and display error
        return false;
    }
    return true;
}

function updateUsername(e){
    username = e.target.value;
}

function updatePassword(e) {
    password = e.target.value;
}

function makeForm() {
    return(
        <form autoComplete="off" className="register" noValidate onSubmit={handleSubmit}>
        <div>
          <TextField
            autoFocus={true}
            id="username"
            name="username"
            label="username"
            onBlur={updateUsername}
            required={true}
          />
        </div>
        <div>
          <TextField
            id="password"
            name="password"
            label="password"
            onBlur={updatePassword}
            required={true}
            type="password"
          />
        </div>
        <div>
            <Button type="submit">
                submit
            </Button>
        </div>
      </form>
    );
}
