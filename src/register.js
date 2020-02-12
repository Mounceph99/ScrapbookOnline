import React from 'react';
import { TextField } from '@material-ui/core';
import './App.css';

var username;
var password;
var confirm;

function handleSubmit(e) {
  validateUsername();
  validatePassword();
  // TODO rest of submission logic
}

function validateUsername() {
  return !(/^[\S]+$/).test(username); // TODO accepts the empty string
}

function validatePassword() {
  return (password === confirm);
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

function App() {
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
    </form>
  );
}

export default App;
import React from 'react';
import { TextField } from '@material-ui/core';
import './App.css';

var username;
var password;
var confirm;

function handleSubmit(e) {
  validateUsername();
  validatePassword();
  // TODO rest of submission logic
}

function validateUsername() {
  return !(/^[\S]+$/).test(username); // TODO accepts the empty string
}

function validatePassword() {
  return (password === confirm);
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

function App() {
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
    </form>
  );
}

export default App;
