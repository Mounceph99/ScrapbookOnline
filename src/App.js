import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom"; // [npm i react-router-dom]

import PostList from "./components/PostList";
import Post from "./components/Post";
import Header from "./components/Header";
import UtilityFloat from "./components/UtilityFloat";
import NewPostModal from "./components/Modal/NewPostModal";
import CommentList from "./components/CommentList";
import Comment from "./components/Comment";

function App() {
  const [posts, setPosts] = useState([
    {
      userName: "user1",
      picture: "pic1",
      date: "2019-01-01",
      comments: ["wow", "nice"]
    },
    { userName: "user1", picture: "pic2", date: "2019-01-02" },
    { userName: "user1", picture: "pic3", date: "2019-01-03" }
  ]);
  const [openNewPostModal, setOpenNewPostModal] = useState(false);

  const renderPosts = () => {
    return posts.map((post, index) => {
      return <Post post={post} key={index}></Post>;
    });
  };

  const handleOpenNewPostModal = e => {
    console.log(
      "App.handleOpenNewPostModal() from openNewPostModal==" + openNewPostModal
    );
    setOpenNewPostModal(true);
  };
  const handleCloseNewPostModal = e => {
    setOpenNewPostModal(false);
  };

  return (
    <Router>
      <div className="App">
        {/* <Button classNameName={classNamees.root}>Hook</Button>; */}
        <div className="Header">
          <Header></Header>
        </div>
        <div className="MainWrapper">
          <div className="PostWrapper" position>
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
            ></NewPostModal>
          </div>
          <div className="PostModal"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
