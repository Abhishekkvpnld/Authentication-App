import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Assets/profile.png';
import '../styles/password.css';
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import {passwordValidate} from "../helper/Validate"

function Password() {
  const formik = useFormik({

    initialValues:{
      password:''
    },
    validateOnBlur:false,
    validateOnChange:false,
    validate:passwordValidate,
    onSubmit: async values =>{
      console.log(values)
    }
  }); 

  return ( 
    <div className="container mx-auto username-container">
      <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={Avatar} alt="Avatar" className="profile_img" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input{...formik.getFieldProps('password')} type="text" placeholder="password" className="input-box textbox" />
              <button type="submit" className="btn">
               Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-grey-500">
                Forgot Password?{' '}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password