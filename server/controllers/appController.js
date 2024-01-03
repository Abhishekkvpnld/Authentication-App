
import userSchema from "../module/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../router/config.js'

/**Middleware for verifyUser */
export async function verifyUser(req,res,next){
    try{
        const {username} = req.method == 'GET' ? req.query : req.body;

        /**check the user existence */
let exist =await userSchema.findOne({username})
if(!exist)return res.status(404).send({error:"Can't find user"});
next()

    }catch(error){
        return res.status(404).send({error:"Authentication Error"});
    }
}

export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        /**check the existing user */
        const existUsername = new Promise((resolve, reject) => {
            userSchema.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err))
                if (user) reject({ error: "Please use unique Username" })

                resolve()
            })
        })

        /**check the existing email */
        const existEmail = new Promise((resolve, reject) => {
            userSchema.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Please use unique Email" })

                resolve()
            })
        })


        Promise.all([existUsername, existEmail]).then(() => {

/**make hashed Password */
            if (password) {
                bcrypt.hash(password, 10).then(hashedPassword => {
                    const user = new userSchema({
                        username,
                        password: hashedPassword,
                        profile: profile || '',
                        email: email
                    })

                    /**return save result as a response */
                    user.save()
                        .then(result => { res.status(201).send({ msg: 'User register Successfull' }) })
                        .catch(error => { res.status(500).send({ error }) })

                }).catch(error => {
                    return res.status(500).send({
                        error: "Enable to Hashed Password"
                    })
                })
            }

        }).catch(error => {
            return res.status(500).send({ error })
        })

    } catch (error) {
        return res.status(500).send(error)
    }
}

/**Login */

export async function login(req, res) {
    const {username,password} = req.body;
    try{

userSchema.findOne({username})
.then(user=>{
    bcrypt.compare(password,user.password).then(passwordCheck=>{
if(!passwordCheck)return res.status(400).send({error:"Don't have Password"})

/**Create JWT Token  */
const token = jwt.sign({
    userId:user._id,
    username:user.username
},JWT_SECRET,{expiresIn:"24h"})

return res.status(200).send({
    msg:"Login successful...!",
    username:user.username,
    token
})

    }).catch(error=>{
        return res.status(400).send({error:"Password does not Match"})
    })
})
.catch(error=>{
    return res.status(404).send({error:"username not Found"})
})

    }catch(error){
        return res.status(500).send({error})
    }
}

export async function getUser(req, res) {

    const {username} = req.params
    try{
if(!username)return res.status(501).send({error:"Invalid Username"});

userSchema.findOne({username},(err,user)=>{
    if(err)return res.status(500).send({err})
    if(!user)return res.status(501).send({error:"Couldn'tFind the User"})

    /**remove password from the user **/
    /**mongoose return unnecessary data with object so converted it into json format**/

const {password,...rest} = Object.assign({},user.toJSON());

    return res.status(201).send(rest);
})

    }catch(error){
return res.status(404).send({
    error:"Can't Find User Data"
})
    }
}













export async function uodateUser(req, res) {
    res.json('updateUser route')
}

export async function generateOTP(req, res) {
    res.json('generateOTP route')
}

export async function verifyOTP(req, res) {
    res.json('verifyOTP route')
}

export async function createResetSession(req, res) {
    res.json('createResetSession route')
}

export async function resetPassword(req, res) {
    res.json('resetPassword route')
}