import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Assets/profile.png';
import '../styles/profile.css';
import  toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import {profileValidation} from "../helper/Validate"
import convertToBase64  from "../helper/convert"
import useFetch from '../hooks/fetch_hook.jsx';
import { updateUser } from '../helper/helper.jsx';
// import { useAuthStore } from '../store/store.js';

function Profile() {  

const navigate = useNavigate();
// const {username} = useAuthStore(state=>state.auth);

const [{ isLoading, apiData, serverError }] = useFetch();

  const [file,setFile] = useState()
  
  const formik = useFormik({
   
    initialValues:{
      firstName:apiData?.data.firstName || '',
      lastName:apiData?.data.lastName || '',
      email:apiData?.data.email || '',
      mobile:apiData?.data.mobile ||'',
      adress: apiData?.data.address ||''
    },
    enableReinitialize:true,
    validateOnBlur:false,
    validateOnChange:false,
    validate:profileValidation,
    onSubmit: async values =>{
      values = Object.assign(values,{profile:file || apiData?.data.profile || ''})
      let updatePromise = updateUser(values)

      toast.promise(updatePromise,{
        loading:'Updating...!',
        success:<b>Update Successfully...!</b>,
        error:<b>Could not Update...!</b>
      })
      // console.log(values)
    }
  }); 

  /**converting file to base64 format */
const onUpload = async e =>{
  const base64 = await convertToBase64(e.target.files[0])
  setFile(base64)
}

if(isLoading)return <h1 className='text-2xl font-bold'>isLoading</h1>
if(serverError)return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

//Logout handler function
function userLogout() {
  localStorage.removeItem('token')
  navigate('/')
}

  return ( 
    <div className="container mx-auto username-container">
      <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
              <img src={apiData?.data.profile|| file || Avatar} alt="Avatar" className="profile_img" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex gap-10">
              <input{...formik.getFieldProps('firstName')} type="text" placeholder="FirstName*" className="input-box textbox" />
            <input{...formik.getFieldProps('lastName')} type="text" placeholder="LastName*" className="input-box textbox" />
              </div>

              <div className="name flex  gap-10">
              <input{...formik.getFieldProps('mobile')} type="text" placeholder="Mobile No" className="input-box textbox" />
            <input{...formik.getFieldProps('email')} type="text" placeholder="Email*" className="input-box textbox" />
              </div>


            <input{...formik.getFieldProps('adress')} type="text" placeholder="Adress" className="input-box textbox" />
            <button type="submit" className="btn">
             Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-grey-500">
               Come back later?{' '}
             <button className='text-red-500' to='/' onClick={userLogout}>Logout</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;