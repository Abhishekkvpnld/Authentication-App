import axios from "axios";
import { jwtDecode } from 'jwt-decode';

/********Setting baseUrl********/
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

/**Make api Requests */


/**To get user name from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token)return Promise.reject('Cannot find Token')
    let decode = jwtDecode(token)
console.log(decode)
return decode;
}

/**Authenticate function */
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username doesn't exist...!" }
    }
}

/**get user details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`)
        return { data }
    } catch (error) {
        return { error: "Password doesn't match...!" }
    }
}

/**register user function */
export async function registerUser(credential) {
    try {

        const { data: { msg }, status } = await axios.post(`/api/register`, credential)

        let { username, email } = credential;

        /**send email */
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail:email, text:msg })
        }

    } catch (error) {
        return Promise.reject({ error })
    }
}

/**Login function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match...!" })
    }
}

/**update user profile function */
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token')
        const data = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } })

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error: "Couldn't update Profile...!" })
    }
}

/**generate OTP */
export async function generateOTP(username) {
    try {

        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } })

        /**send mail with OTP */
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your password Recovery OTP is ${code}.Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" })
        }

        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({ error })
    }
}

/**verify OTP */
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error)
    }
}

/**reset password */
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}