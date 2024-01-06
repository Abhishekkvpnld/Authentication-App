import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/recovery.css';
import toast, {Toaster} from "react-hot-toast";
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';

function Recovery() {

  const navigate = useNavigate();

  const {username} = useAuthStore(state=> state.auth)
const [OTP,setOTP] = useState()

useEffect(()=>{
  generateOTP(username).then(()=>{
    console.log(OTP)
    if(OTP)return toast.success('OTP has been send to your email')
    return toast.error('Problem while generating OTP')
  })
},[username])


async function onSubmit(e){
e.preventDefault();

try{

  let {status} = await verifyOTP({username, code:OTP})
  if(status === 201){
    toast.success('Verify Successfully...!')
    return navigate('/reset')
  }
  

}catch(error){
  return toast.error('Wrong OTP! Check email again...!')
}

}

//handler function for resend OTP
function resendOTP(){
  let sendPromise = generateOTP(username)

  toast.promise(sendPromise,{
    loading:'Sending...!',
    success:<b>OTP has been send to your email..!</b>,
    error:<b>Could not send it...!</b>
  })
// sendPromise.then(OTP => 
//   console.log(OTP))

}

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

          <form className="pt-5 " onSubmit={onSubmit}>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">

              <span className='py-2 text-sm text-left text-grey-500'>Enter 6 digit OTP sent to your email adress</span>
              <input onChange={(e)=>setOTP(e.target.value)} type="text" placeholder="Enter OTP" className="input-box textbox" />
              </div>
           
              <button type="submit" className="btn">
               Recover
              </button>
            </div>

          </form>
          
          <div className="text-center py-4">
              <span className="text-grey-500">
                Can't get OTP?{' '}
                <button onClick={resendOTP} className="text-red-500">
                  Resend
                </button>
              </span>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Recovery;