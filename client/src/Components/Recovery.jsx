import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/recovery.css';
import {Toaster} from "react-hot-toast";
// import {useFormik} from "formik"
// import {passwordValidate} from "../helper/Validate"

function Recovery() {
  // const formik = useFormik({

  //   initialValues:{
  //     password:''
  //   },
  //   validateOnBlur:false,
  //   validateOnChange:false,
  //   validate:passwordValidate,
  //   onSubmit: async values =>{
  //     console.log(values)
  //   }
  // }); 

  return ( 
    <div className="container mx-auto username-container">
      <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="pt-5 ">

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">

              <span className='py-2 text-sm text-left text-grey-500'>Enter 6 digit OTP sent to your email adress</span>
              <input type="text" placeholder="Enter OTP" className="input-box textbox" />
              </div>
           
              <button type="submit" className="btn">
               Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-grey-500">
                Can't get OTP?{' '}
                <button className="text-red-500">
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;