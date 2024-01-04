import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../router/config.js";


const nodeconfig = {
    host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
   
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodeconfig);


var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
       
    }
});

export const registerMail =async (req,res)=>{
const {username,userMail,text,subject} = req.body;

//body of the mail
const mail = {
    body:{
        name:username,
        intro:text || "Welcome, we are excited to have you on board.",
        outro:"need help or have questions? just replay to this mail "
    }
}
var mailBody = mailGenerator.generate(mail);

let message = {
    from:ENV.EMAIL,
    to:userMail,
    subject:subject,
    html:mailBody
}


//send mail
transporter.sendMail(message)
.then(()=>{
    return res.status(200).send({msg:"You should recieve an email from us "})
})
.catch(error => res.status(500).send({error}))

}