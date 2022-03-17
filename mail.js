
const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "2aab7897e064c0", // generated ethereal user
      pass: "312c7e0bc01201", // generated ethereal password
    },
  });
