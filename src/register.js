import React from 'react';
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core';
import './App.css';

var username;
var password;
var confirm;

function handleSubmit(e) {
  if(!(validateUsername() && validatePassword())){
    return;
  }
  // TODO rest of submission logic
}

function validateUsername() {
  if((/^[\S]+$/).test(username)) { // TODO accepts the empty string
    // TODO change username text field style to error
    return false;
  }
  return true;
}

function validatePassword() {
  if(password != confirm) {
    // TODO clear password and confirm text fields
    // TODO change password text field style to error
    return false;
  }
  return true;
}

function updateUsername(e) {
  username = e.target.value;
  console.log(username);
  console.log(validateUsername());
}

function updatePassword(e) {
  password = e.target.value;
}

function updateConfirm(e) {
  confirm = e.target.value;
}

function makeForm() {
  return (
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
        <TextField
          id="confirm"
          name="confirm"
          label="confirm password"
          onBlur={updateConfirm}
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