import jwt from 'jsonwebtoken';
import JWT_token from "../router/config.js"

/**auth middleware */
export default async function Auth(req,res,next){
try{
    console.log('auth file')
    /**access autherize header to validate request */
    const token = req.headers.autherization.split("")[1]
    /**retrive the user details for the logged in user */

const decodedToken = await jwt.verify(token,JWT_token.JWT_SECRET)

req.user =decodedToken;

// res.json(decodedToken)
next()
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