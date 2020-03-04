const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express =require('express');

const app = express();

admin.initializeApp();

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
            // allPosts.push(doc.data());
            allPosts.push({
                userName: "user1",
                picture: doc.data().imageUrl,
                date: doc.data().createdOn,
                comments: doc.data().comments
            });

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
        owner: req.body.owner,
        imageUrl: req.body.imageUrl
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

app.get('/getComments', (req, res)=>{
    admin
    .firestore()
    .collection(comments)
    .then(data =>{
        let allComments = [];
        data.forEach(doc =>{
            allComments.push({
                message: doc.data().message,
                date: doc.data().createdOn,
                userName: doc.data().owner,
                postID: doc.data().postID
            });
        return res.json(allComments);
    })
    .catch(err=>console.error(err));
});

app.post('/newComment', (req, res)=>{
    var newComment = {
        message: req.body.message,
        createdOn: new Date().toISOString(),
        postID: req.body.postID,
        owner: req.body.owner,
    };
    admin
    .firestore()
    .collection('comments')
    .add(newComment)
    .then((doc) => {
        res.json({message: 'created new comment succesfully'});
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