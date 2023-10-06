
import nodemailer,{Transporter} from "nodemailer";

// Rest of your code here
// export default function emailService(userMail:string){
//     const transporter = nodemailer.createTransport({
//         host: 'Gmail',
//       //   port: 465,
//       //   secure: true,
//         auth: {
//           user: 'screenblitz456@gmail.com',
//           pass: 'hwgfgeukrxtpaxcs'
//         }
//       });
      
//       // async..await is not allowed in global scope, must use a wrapper
//       async function main() {
//         // send mail with defined transport object
//         const info = await transporter.sendMail({
//           from: '"Fred Foo 👻" <foo@example.com>', // sender address
//           to: `${userMail}`, // list of receivers
//           subject: "Hello ✔", // Subject line
//           text: "Hello world?", // plain text body
//         //   html: "<b>Hello world?</b>", // html body
//         });
      
//         console.log("Message sent: %s", info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
//         //
//         // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//         //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//         //       <https://github.com/forwardemail/preview-email>
//         //
//       }
      
//       main().catch(console.error);



// }

export const sendEmailService = () => {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'screenblitz456@gmail.com',
      pass: 'hwgfgeukrxtpaxcs',
    },
    // Add the tls option to trust the self-signed certificate
    tls: {
      rejectUnauthorized: false, // Set to false to trust self-signed certificates
    },
  });

  const sendEmail = (email: string, subject: string, text: string) => {
    const mailOptions = {
      from: 'avp.twinbldes@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };

  return {
    sendEmail,
  };
};
