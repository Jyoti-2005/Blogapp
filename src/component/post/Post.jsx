import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
import { PostContext } from '../../context/PostProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { postschema } from '../../schemas';

const Post = () => {
  const { currentUser, addPost, editPost } = useContext(PostContext);
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state || {};
  const { post, index, isEditing } = editingData;

  const [preview, setPreview] = useState(post?.image || null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Only admins can create or edit posts.');
      navigate('/');
    }
  }, [currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      title: post?.title || '',
      body: post?.body || '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema: postschema,
    onSubmit: (values) => {
      if (!values.title || !values.body) {
        alert('Please fill all fields');
        return;
      }

      const imageUrl = values.image
        ? URL.createObjectURL(values.image)
        : preview;

      const newPost = {
        title: values.title,
        body: values.body,
        image: imageUrl,
      };

      if (isEditing) {
        editPost(index, newPost);
      } else {
        addPost(newPost);
      }

      navigate('/');
    },
  });
  

  return (
    <div className="post-container">
      <h2>{isEditing ? 'Edit Post' : 'Create Post'}</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title && <p className="error">{formik.errors.title}</p>}

        <textarea
          name="body"
          placeholder="Body"
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        {formik.errors.body && <p className="error">{formik.errors.body}</p>}

        <input
          type="file"
          name="image"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            formik.setFieldValue('image', file);
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              setPreview(previewUrl);
            }
          }}
        />
        {formik.errors.image && <p className="error">{formik.errors.image}</p>}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            width="200"
            style={{ marginTop: '10px' }}
          />
        )}

        <button type="submit">
          {isEditing ? 'Update Post' : 'Add Post'}
        </button>
      </form>
    </div>
  );
};

export default Post;
