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

/**Register mail function */
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  console.log(req.body);

  // Body of the mail
  const mailContent = {
      body: {
          name: username,
          intro: text || "Welcome, we are excited to have you on board.",
          outro: "Need help or have questions? Just reply to this email."
      }
  };

  const mailBody = await mailGenerator.generate(mailContent);

  const message = {
      from: ENV.EMAIL,
      to: userEmail,  // Corrected variable name
      subject: subject,
      html: mailBody
  };

  try {
      await transporter.sendMail(message);
      return res.status(200).send({ msg: "You should receive an email from us" });
  } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ error: 'An error occurred while sending the email. Please try again.' });
  }
};
