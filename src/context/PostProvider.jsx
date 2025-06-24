import React, { createContext, useState, useEffect, useCallback } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('userPosts');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [viewCounts, setViewCounts] = useState(() => {
    const savedViews = localStorage.getItem('viewCounts');
    return savedViews ? JSON.parse(savedViews) : {};
  });

  // Persist posts and user
  useEffect(() => {
    localStorage.setItem('userPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Persist viewCounts
  useEffect(() => {
    localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
  }, [viewCounts]);

  // Add view count updater
  const incrementViewCount = useCallback((index) => {
    setViewCounts((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
  }, []);

  const addPost = (post) => {
    setPosts(prev => [...prev, post]);
  };

  const deletePost = (index) => {
    const updated = [...posts];
    updated.splice(index, 1);
    setPosts(updated);
  };

  const editPost = (index, updatedPost) => {
    const updated = [...posts];
    updated[index] = updatedPost;
    setPosts(updated);
  };

  return (
    <PostContext.Provider value={{
      posts, addPost, deletePost, editPost,
      currentUser, setCurrentUser,
      viewCounts, incrementViewCount
    }}>
      {children}
    </PostContext.Provider>
  );
};
