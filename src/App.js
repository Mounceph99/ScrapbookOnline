import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom"; // [npm i react-router-dom]
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";
import Header from "./components/Header";
import UtilityFloat from "./components/UtilityFloat";

// import PostModal from "./components/Modal/PostModal";
import NewPostModal from "./components/Modal/NewPostModal";
import CommentList from "./components/CommentList";
import Comment from "./components/Comment";
import axios from 'axios';

function App() {

  /* 
   * DATA STATE
   */
  const [user] = useState([
    {  UID: 1, userName: "Jack" },
    { UID: 2, userName: "Rose" }
  ])


  const getAllPosts = () =>{
    axios
    .get('/getAllPosts')
    .then((res)=>{
      console.log(res.data);
      return res.data;
    })
    .catch((err)=>{
      console.log("Cannot get the posts");
    });

  };

  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(true);

  const [openCommentDisplay, setOpenCommentDisplay] = useState(false);

  useEffect(()=>{
    if(update)
    {
      axios
      .get('/getAllPosts')
      .then((res)=>{
        console.log(res.data);
        setPosts(res.data);
        setUpdate(false);
      })
      .catch((err)=>{
        console.log("Cannot get the posts");
      });

    }
  
  });

  /* 
   * COMPONENT STATE 
   */

  /* modal toogle */
  const [openNewPostModal, setOpenNewPostModal] = useState(false);   
  /* uploaded file */
  const [file, setFile] = useState(null);
  const [description, setDescription] = React.useState(null);


  /* FUNCTION */
  const renderPosts = () => {
    return posts.map((post, index) => {
      return <Post post={post} key={index}></Post>;
    });
  };

  const handleOpenNewPostModal = e => {
    setOpenNewPostModal(true);
  };

  const handleCloseNewPostModal = e => {
    setOpenNewPostModal(false);
  }; 

  const addPosts = () => { 
    console.log("App.addPosts()");  
    console.log(file);
    /* converte image to base64 format */
    var img = new Image();
    img.src = file;
    img.crossOrigin = 'Anonymous'; 
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'); 
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0); 
    var b64 = canvas.toDataURL('image/png').replace(/^data:image.+;base64,/, '');
    console.log("b64");
    console.log(b64); 
    b64 = "data:image/jpeg;base64,"+b64; 
    /* update post */
    // const newPost = {userName: "newUser", picture: b64, date: "2020-01-01", comments: null};
    const newPost = {userName: "newUser", picture: b64, date: "2020-01-01", comments: null};

    setPosts([newPost, ...posts]);
    // setUpdate(true);
    handleCloseNewPostModal();
    const newPostData ={
      comments: "eeee",
      description: "description",
      owner: "david100",
      imageUrl: file

    };
  
    axios
    .post('/newPost', newPostData)
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log("There is an error");
    });
    // axios
    // .get('/users')
    // .then((res)=>{
    //   console.log(res.data);
    // })
    // .catch((err)=>{
    //   console.log("There is an error");
    // });


    
  }
 
  // const handleChange = (e) => {
  //   console.log("handleChange()") 
  //   console.log(URL.createObjectURL(e.target.files[0]))
  //   setFile(URL.createObjectURL(e.target.files[0]))  
  // } 
 

  return (
    <Router>
      <div className="App">
        <div className="Header">
          <Header></Header>
        </div>
        <div className="MainWrapper" style={{backgroundColor:'#eeeeee'}}>
 

        {/* <div className="test" style={{border: "1px gray solid"}}>
          <input type="file" id="imageFile" name="imageFile" onChange={handleChange}></input>  
          <div style={{hidden:"true"}}>Image preview: <div><img style={{width:"50px"}} src={file}></img></div></div>
          <div><button onClick={e => addPosts()}>POST</button></div>
        </div> */}
 

        <div className="PostWrapper" >
          <PostList renderPosts={renderPosts}></PostList>
        </div>  
        </div>
        <div className="FloatButton" onClick={e => handleOpenNewPostModal()}>
          <UtilityFloat></UtilityFloat>
        </div>

        <div className="Modal">
          <div className="NewPostModal">
            <NewPostModal
              open={openNewPostModal}
              handleCloseNewPostModal={handleCloseNewPostModal}
              addPosts={addPosts}
              setFile={setFile}
              setPosts={setPosts}
              posts={posts}
              // description={description}
            />
          </div>
          <div className="PostModal"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
