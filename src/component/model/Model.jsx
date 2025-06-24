import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import './model.css'


function Model({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {createPortal(<>
        <div className='box-container'>
          <div className='logout-box'>
            <h1 className='text-log'>Are you sure you want to logout?</h1>
            <div className='btn-grp'>
              <button type='button' className='btn-cancel' onClick={onClose} >Cancel</button>
              <button type='button' className='btn-logout' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </>, document.getElementById('model'))}
    </>
  )
}

export default Model
