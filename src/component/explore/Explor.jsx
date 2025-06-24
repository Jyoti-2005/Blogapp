import React, { useState, useEffect } from 'react';
import './Explor.css';
import { CiSearch } from "react-icons/ci";

const Explor = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setApiPosts(result.slice(0, 9));
    }
    fetchdata();
  }, []);

  
  const filteredPosts = apiPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className='explore-btn'>Explore Posts</h1>

      {apiPosts.length > 0 && <h2 className='section-title'>API Posts</h2>}

      <div className="search-container">
        <div className="search-input-wrapper">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="home-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Ooops!! No posts match your search.</p>
        )}
      </div>

      <div>
        {/* <h1 style={{ textAlign: 'center' }}>💗Thank you Visit My Blog💗</h1> */}
      </div>
    </>
  );
};

export default Explor;
