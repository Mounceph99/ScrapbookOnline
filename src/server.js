var firebase= require('firebase');
var express = require('express');
var admin = require('firebase-admin');
var functions = require('firebase-functions');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const firebaseConfig = {
    apiKey: "AIzaSyD6FIlucyC8lbLIS-YppgxgvkHzcy2Mg4I",
    authDomain: "socialplatform-801be.firebaseapp.com",
    databaseURL: "https://socialplatform-801be.firebaseio.com",
    projectId: "socialplatform-801be",
    storageBucket: "socialplatform-801be.appspot.com",
    messagingSenderId: "457884456666",
    appId: "1:457884456666:web:a0706cfbb7c0efd6bab7e3",
    measurementId: "G-N0HXJLFLZX"
  };

// firebase.initializeApp(firebaseConfig);
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });




// app.get('/go', function (req, res){
//     console.log("get data");
//     firebase.database
//     res.send("working");
// });

// app.listen(3000,function(){
//     console.log("Server started");
// });
