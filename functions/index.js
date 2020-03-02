const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express =require('express');

const app = express();

admin.initializeApp();

app.get('/signup', (req, rest) =>{
    firebase.auth()
    .createUserWithEmailAndPassword(req.email, req.password)
    .catch(function(error) {
        var code = error.code;
        var msg = error.messagel
        if(code == 'auth/email-already-in-use') {
            alert("Email address is associated with another account.");
        }
        else{
            alert(msg);
        }
    })
    // TODO will this put user into our db?
});

app.get('/users', (req, res) =>{
    admin
    .firestore()
    .collection('users')
    .get()
    .then(data =>{
        let users =[];
        data.forEach(doc=>{
            users.push(doc.data());
        });
        return res.json(users);
        
    })
    .catch(err=>console.error(err));
    

});

app.get('/getAllPosts',(req, res)=>{
    admin
    .firestore()
    .collection('posts')
    .orderBy('createdOn', 'desc')
    .get()
    .then(data =>{
        let allPosts = [];
        data.forEach(doc =>{
            allPosts.push(doc.data());
        });
        return res.json(allPosts);
    })
    .catch(err=>console.error(err));
});

app.post('/newPost', (req, res)=>{
    var newPost = {
        comments: req.body.comments,
        createdOn: new Date().toISOString(),
        description: req.body.description,
        owner: req.body.owner
    };
    admin
    .firestore()
    .collection('posts')
    .add(newPost)
    .then((doc) => {
        res.json({message: 'created new post  succesfully'});
    })
    .catch((err) =>{
        res.status(500).json({error: 'error in server'});
        console.error(err);
    });
});
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// exports.getUsers = functions.https.onRequest((req, res) => {
//     admin.firestore().collection('users').get()
//     .then(data =>{
//         let users =[];
//         data.forEach(doc=>{
//             users.push(doc.data())
//         });
//         return res.json(users);
        
//     })
//     .catch(err=>console.error(err));
    
    
//     // res.send("Hello from Firebase!");
//    });

//    exports.createPost = functions.https.onRequest((req, res)=>{
//        const newPost = {

//        };
//    });
exports.api = functions.https.onRequest(app);