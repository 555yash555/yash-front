import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPostById,getAllPosts } from "../actions/postsAction";
import PostsCard from "./PostsCard";

const SinglePostCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  dispatch(getPostById(id));
 
  const post = useSelector((state) => state.getPostReducer);
  // const { posts, loading } = useSelector((state) => state.getAllPosts);
  // console.log("Redux State:", posts);
  
  // const post = posts.find((post) => Number(post.post_id) === Number(id));
  
  // useEffect(() => {
  //   // Fetch the post details using postId and render them
   
  // }, [dispatch, id]);
  console.log("posttttt");
  console.log(post);
  

  return (
    <div>
      <h1>Single Post Page</h1>
      <p>Post ID: {id}</p>
      {post ? (
        <PostsCard townHall={post}  showId={null} setShowId={() => {}} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SinglePostCard;
