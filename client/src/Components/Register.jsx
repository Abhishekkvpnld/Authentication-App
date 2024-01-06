import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Avatar from '../Assets/profile.png';
import '../styles/register.css';
import  toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import {registerValidation} from "../helper/Validate"
import convertToBase64  from "../helper/convert"
import {registerUser} from '../helper/helper.jsx'

function Register() {

  const navigate = useNavigate();
  const [file,setFile] = useState()
  const formik = useFormik({
   
    initialValues:{
      email:'admin@gmail.com',
      username:'example123',
      password:'admin@123'
    },
    validateOnBlur:false,
    validateOnChange:false,
    validate:registerValidation,
    onSubmit: async values =>{
      values = Object.assign(values,{profile:file || ''})
      let registerPromise = registerUser(values);
      toast.promise(registerPromise,{
        loading:'Creating...!',
        success:<b>Register Successfully...!</b>,
        error:<b>Could not Register...!</b>
      })
console.log(registerPromise);
registerPromise.then(() => {
 
    navigate('/');
 
}).catch((error) => {
  console.error('Error during registration:', error);
  // Handle the error as needed
  toast.error('An error occurred during registration. Please try again.');
});

      console.log(values)
    }
  }); 

  /**converting file to base64 format */
const onUpload = async e =>{
  const base64 = await convertToBase64(e.target.files[0])
  setFile(base64)
}

  return ( 
    <div className="container mx-auto username-container">
      <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
              <img src={file|| Avatar} alt="Avatar" className="profile_img" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
            <input{...formik.getFieldProps('email')} type="text" placeholder="Email*" className="input-box textbox" />
            <input{...formik.getFieldProps('username')} type="text" placeholder="Username*" className="input-box textbox" />
              <input{...formik.getFieldProps('password')} type="text" placeholder="Password*" className="input-box textbox" />
              <button type="submit" className="btn">
               Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-grey-500">
               Already Register?{' '}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;