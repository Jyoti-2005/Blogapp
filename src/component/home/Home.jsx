import React, { useState } from 'react';
import { useContext } from 'react';
import './Home.css';
import { PostContext } from '../../context/PostProvider';
import { MdDelete, MdEditDocument } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useCallback } from 'react';

const Home = () => {
  const { posts, deletePost, currentUser, incrementViewCount } = useContext(PostContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  // Use useCallback to optimize arrow click handler
  const handleViewDetails = useCallback((index) => {
    incrementViewCount(index);
    navigate(`/details/${index}`);
  }, [incrementViewCount, navigate]);

  const handleEdit = (post, index) => {
    navigate('/create-post', {
      state: {
        post,
        index,
        isEditing: true
      }
    });
  };

  // Filter posts based on search input
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="home-header">
        <h2 style={{ fontSize: '38px'}}>Created Posts</h2>
        <div className="search-container">
          <CiSearch className="search-icon" />
          <input
            type="text"
            className="head"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="home-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {post.image && <img src={post.image} width="200" />}
              {currentUser?.role === 'admin' && (
                <div className='btn-group'>
                  <button style={{ backgroundColor: 'blue' }} className='all-btn' onClick={() => handleEdit(post, index)}>
                    <MdEditDocument />
                  </button>
                  <button style={{ backgroundColor: 'red' }} className='all-btn' onClick={() => deletePost(index)}>
                    <MdDelete />
                  </button>
                  <button style={{ backgroundColor: 'black' }} className='all-btn' onClick={() => handleViewDetails(index)}>
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Ooops!! No posts match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;




