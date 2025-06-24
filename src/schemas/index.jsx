import * as Yup from "yup";

export const logInschema =Yup.object({  
     username: Yup.string().required('Username is required'),
     mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Mobile number is required'),
     role: Yup.string().required('Role is required'),
     otp: Yup.string().matches(/^[0-9]{4}$/, 'OTP must be exactly 4 digits').required('OTP is required'),
});

export const postschema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    image: Yup.mixed().required('Image is required'),
  });

