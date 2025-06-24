import React, { useState, useEffect } from 'react'
import './Explor.css'


const Explor = () => {
  const [apiPosts, setApiPosts] = useState([]);

  async function fetchdata() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const result = await response.json();
    setApiPosts(result.slice(0, 9));
  };
  useEffect(() => { fetchdata() }, [])
  return (
    <>
      <h1 className='explore-btn'>Explore Posts</h1>

      {apiPosts.length > 0 && <h2 className='section-title'>API Posts</h2>}

      <div className="home-container">
        {apiPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
       <div>
            <h1 style={{textAlign:'center'}}>💗Thank you Visit My Blog💗</h1>
          </div>
    </>
  )
};

export default Explor
