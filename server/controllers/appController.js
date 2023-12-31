
import userSchema from "../model/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../router/config.js'
import otpGenerator from 'otp-generator'


/**Middleware for verifyUser */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == 'GET' ? req.query : req.body;

        /**check the user existence */
        let exist = await userSchema.findOne({username})
        if (!exist) return res.status(404).send({ error: "Can't find user" });
        next()

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check existing username
        const existUsername = await userSchema.findOne({ username });
        if (existUsername) {
            return res.status(400).send({ error: 'Please use a unique username' }); 
        }

        // Check existing email
        const existEmail = await userSchema.findOne({ email });
        if (existEmail) {
            return res.status(400).send({ error: 'Please use a unique email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user instance
        const user = new userSchema({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
        });

        // Save user to the database
        const result = await user.save();

        // Send success response
        res.status(201).send({ msg: 'User registration successful', user: result });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

/**Login */
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userSchema.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(400).send({ error: "Password does not match" });
        }

        const token = jwt.sign({ 
            userId: user._id,
            username: user.username
        }, JWT_SECRET.JWT_SECRET, { expiresIn: "24h" });

        return res.status(200).send({
            msg: "Login successful",
            username: user.username,
            token
        });
    } catch (error) { 
        return res.status(500).send({ error: "Internal server error" });
    }
}


export async function getUser(req, res) {

    const { username } = req.params
    try {
        if (!username) return res.status(501).send({ error: "Invalid Username" });

       const data = await userSchema.findOne({ username });
    //    console.log('userdata-------'+data)
       return res.status(201).send({data})


    } catch (error) {
        return res.status(408).send({
            error: "Can't Find User Data"
        })
    }
}

export async function updateUser(req, res) {
    try {
      const { userId } = req.user;
      const updateData = req.body;
 console.log(userId);
      if (!userId) {
        return res.status(401).send({ error: "User Not Found....!" });
      }
  
      // Use findOneAndUpdate with promises
      const updatedUser = await userSchema.findOneAndUpdate(
        { _id: userId }, // Find the user by its _id
        updateData,      // Update the user with the provided data
        { new: true }    // Return the modified document
      );
      
      console.log(updateUser);
      if (!updatedUser) {
        return res.status(404).send({ error: "User not found" });
      }
  
      return res.status(201).send({ msg: "Record Updated...!", updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
  

export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
  console.log(req.app.locals.OTP);
    res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) == parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true // start session for reset password
        return res.status(201).send({ msg: "verify Successfully...!" })
    }
    return res.status(400).send({ error: "Invalid OTP" })
}

export async function createResetSession(req, res) {

    if (req.app.locals.resetSession) {

        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}

export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });
        const { username, password } = req.body
        // console.log(req.body)

        try {
            const user = await userSchema.findOne({ username });
          
            if (!user) {
              return res.status(404).send({ error: "Username not found....!!" });
            }
          
            const hashedPassword = await bcrypt.hash(password, 10);
          
            await userSchema.updateOne({ username: user.username }, { password: hashedPassword });
          
            return res.status(201).send({ msg: "Record Updated...!" });
          } catch (error) {
            console.error("Error updating password:", error);
            return res.status(500).send({ error: "Internal Server Error...!!" });
          }

    } catch (error) {
        return res.status(401).send({ error })
    }
}