import axios from "axios";
import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import { savedPosts } from "../../functions/reducers";
import Post from "../../components/post";
import { useEffect } from "react";
import "./savePost.css";

function SavedPost() {
  const [{ loading, error, posts }, dispatch] = useReducer(savedPosts, {
    loading: false,
    posts: [],
    error: "",
  });
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/savedPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const { user } = useSelector((state) => ({ ...state }));
  console.log(posts, "kkkk");

  useEffect(() => {
    getAllPosts();
  },[]);
  return (
    <div className="saved_posts">
      <Header />
      <div className="save_middle">
        
        <div className="post">
          {posts.map((post, i) => (
            <Post key={i} post={post} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedPost;
