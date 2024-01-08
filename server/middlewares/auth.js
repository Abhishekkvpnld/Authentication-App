import jwt from 'jsonwebtoken';
import JWT_token from "../router/config.js"

/**auth middleware */
export default async function Auth(req,res,next){
try{
    console.log('auth file')
    /**access autherize header to validate request */
   const token = req.headers.authorization.split(" ")[1];

console.log(token);
    /**retrive the user details for the logged in user */

const decodedToken = jwt.verify(token,JWT_token.JWT_SECRET)

if(token){
    req.user =decodedToken;
// res.json(decodedToken)
next()
}else{
    alert('no data')
}

}catch(error){
    return res.status(401).json({error:"Authentication Failed"})
}
}


export async function localVariables(req,res,next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}