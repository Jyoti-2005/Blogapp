import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import { PostContext } from '../../context/PostProvider';

const Detail = () => {
 const { posts, viewCounts } = useContext(PostContext);
  const { id } = useParams();
  const index = parseInt(id);
  const selectedPost = posts[index];
  
  const views = viewCounts?.[index] || 0;

  return (
    <div className='param'>
      <h2>Post Details</h2>
        <>
        <p><strong>Views:</strong> {views}</p>
          <p><strong>Title:</strong> {selectedPost.title}</p>
          <p><strong>Body:</strong> {selectedPost.body}</p>
          {selectedPost.image && <img src={selectedPost.image} width="300" />}

          <p><strong>Comments:</strong> very good post</p>
        </>
  
    </div>
  );
};

export default Detail;

