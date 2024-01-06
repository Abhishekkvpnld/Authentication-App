import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Avatar from '../Assets/profile.png';
import '../styles/password.css';
import toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import {passwordValidate} from "../helper/Validate"
import useFetch from '../hooks/fetch_hook';
import { useAuthStore } from '../store/store';
import {verifyPassword} from "../helper/helper.jsx"

function Password() {

  const navigate = useNavigate();
const {username} = useAuthStore(state=>state.auth);

const {isLoading,apiData,serverError} = useFetch(`/user/${username}`);
// console.log(isLoading+'        '+apiData+'       '+serverError);

  const formik = useFormik({

    initialValues:{
      password:'admin@123'
    },
    validateOnBlur:false,
    validateOnChange:false,
    validate:passwordValidate,
    onSubmit: async values =>{
      
let loginPromise = verifyPassword({username,password:values.password})

toast.promise(loginPromise,{
  loading:'Checking...!',
  success:<b>Login Successfull...!</b>,
  error:<b>Password Not Match...!</b>
})

loginPromise
  .then(response => {
    let token = response.data.token;
    localStorage.setItem('token', token);
    navigate('/profile');
  })
  .catch(error => {
    console.error('Login failed:', error);
    // Handle the error, display a message, or redirect to an error page if needed.
  });

    }
  }); 

if(isLoading)return <h1 className='text-2xl font-bold'>isLoading</h1>
if(serverError)return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return ( 
    <div className="container mx-auto username-container">
      <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello {apiData?.firstName || apiData?.username}</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={ apiData?.profile || Avatar} alt="Avatar" className="profile_img" />
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