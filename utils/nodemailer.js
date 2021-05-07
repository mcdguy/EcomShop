var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EP
  }
});

const orderEmail = (name,orderId) =>{
    return `hey ${name}, your order was successfull. Your order id is: ${orderId}`
}
const forgotPassword = (name,link) =>{
  return `hey ${name}, you can reset your password here: ${link}`
} 
module.exports = {
  orderEmail,
  forgotPassword,
  transporter,
  // mailOptions
}

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });