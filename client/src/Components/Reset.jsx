import React from 'react';
import '../styles/password.css';
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import {resetPasswordValidation} from "../helper/Validate"

function Reset() {
  const formik = useFormik({

    initialValues:{
      password:'',
      confirm_password:''
    },
    validateOnBlur:false,
    validateOnChange:false,
    validate:resetPasswordValidation,
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
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Enter new password
            </span>
          </div>

          <form className="pt-6 " onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input{...formik.getFieldProps('password')} type="text" placeholder="New Password" className="input-box textbox" />
              <input{...formik.getFieldProps('confirm_password')} type="text" placeholder="Confirm Password" className="input-box textbox" />

              <button type="submit" className="btn">
               Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Reset