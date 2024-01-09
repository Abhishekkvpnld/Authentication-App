import React from 'react';
import '../styles/password.css';
import toast, {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import {resetPasswordValidation} from "../helper/Validate"
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch_hook.jsx'

function Reset() {

const navigate = useNavigate();
const {username} = useAuthStore(state => state.auth)
const [{isLoading,status,serverError}] = useFetch('createResetSession')

  const formik = useFormik({

    initialValues:{
      password:'',
      confirm_password:''
    },
    validateOnBlur:false,
    validateOnChange:false,
    validate:resetPasswordValidation,
    onSubmit: async values =>{
      const resetPromise = resetPassword({username,password:values.password})
      toast.promise(resetPromise,{
        loading:'Updating',
        success:<b>Reset Successfully...!</b>,
        error:<b>Could not Reset...!</b>
      })
      resetPromise.then(()=>{
        navigate('/')
      })
    }
  }); 

  if(isLoading)return <h1 className='text-2xl font-bold'>isLoading</h1>
if(serverError)return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
if(status && status !== 201)return <Navigate to={'/password'} replace={true}></Navigate>

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