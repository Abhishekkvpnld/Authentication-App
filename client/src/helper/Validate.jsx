import toast from "react-hot-toast";


/**Username validation */

export async function usernameValidate(values){
    const error = usernameVerify({},values)
    return error;
}

function usernameVerify(errors = {}, values) {
    if (!values.username) {
      errors.username = toast.error("Username Required...!");
    } else if (!values.username.trim()) {
      errors.username = toast.error("Invalid Username...!");
    } else if (values.username.length < 4) {
      errors.username = toast.error("Username must be more than 3 characters long");
    }
  
    return errors;
  }
  
/** Password validation */

export async function passwordValidate (values){
    const error = passwordVerify({},values)
    return error
}

function passwordVerify(errors = {}, values) {
    // const specialCharacters = /[ `!@#$%^&?|*()-_=+[]{};:'",<.>\/]/;
  
    if (!values.password) {
      errors.password = toast.error("Password Required....!");
    } else if (!values.password.trim()) {
      errors.password = toast.error("Wrong Password...!");
    } else if (values.password.length < 4) {
      errors.password = toast.error("Password Must be more than 4 characters long");
    } 
    // else if (!specialCharacters.test(values.password)) {
    //   errors.password = toast.error("Password must have special characters");
    // }

    return errors;
  }
  
  /*******Reset password validate */
  export async function resetPasswordValidation(values){
const errors = passwordVerify({},values)
if(values.password !== values.confirm_password){
errors.exit = toast.error("Password not match...!");
return errors;
}
  }