import React, { useRef, useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { logInschema } from '../../schemas';
import { useContext } from 'react';
import { PostContext } from '../../context/PostProvider';

const initialValues = {
  username: '',
  mobile: '',
  role: '',
  otp: '',
};

const Login = () => {
  const nav = useNavigate();
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const { setCurrentUser } = useContext(PostContext);

  const [generatedOtp, setGeneratedOtp] = useState('');

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
    setGeneratedOtp(otp);
    alert(`Your OTP is: ${otp}`);
  };

  const { values, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: logInschema,
    onSubmit: (values, action) => {
      if (values.otp !== generatedOtp) {
        alert("Invalid OTP");
        action.resetForm();
        return;
      }

      if (values.username && values.role) {
        const user = {
          username: values.username,
          role: values.role,
        };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        nav('/');
      } else {
        alert("Fill the data");
      }

      action.resetForm();
      setGeneratedOtp(''); 
    },
  });

  const handleOtpChange = (e, index) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;

    const otpArray = values.otp.padEnd(4, ' ').split('');
    otpArray[index] = val;
    const newOtp = otpArray.join('').trim();

    setFieldValue('otp', newOtp);
    if (index < 3 && val) {
      otpRefs[index + 1].current.focus();
    }
  };

  const renderOtpInputs = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <input
        key={i}
        type="text"
        maxLength="1"
        ref={otpRefs[i]}
        onChange={(e) => handleOtpChange(e, i)}
        onBlur={handleBlur}
        className="otp-input"
        value={values.otp[i] || ''}
      />
    ));

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.username && <p className="form-error">{errors.username}</p>}

        <input
          name="mobile"
          placeholder="Mobile"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.mobile && <p className="form-error">{errors.mobile}</p>}

        <select
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="form-error">{errors.role}</p>}

        <label>OTP</label><br />
        <button type="button" onClick={generateOtp} className="btn-send-otp">Send OTP</button>
        <div className="otp-container">{renderOtpInputs()}</div>
        {errors.otp && <p className='form-error'>{errors.otp}</p>}

        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default Login;
