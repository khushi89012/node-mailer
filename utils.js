const transporter = require("./configs/mail");

const sendMail = async ({
  from,
  to,
  subject,
  text,
  html,
}) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  });
};

const confirmationMail = async ({from, to, user}) => {
  await sendMail({
    from,
    to,
    subject: `Welcome to ABC system  ${user.first_name} ${user.last_name}`,
    text: `Hi ${user.first_name}, please confirm your email`,
    
});
};

const welcomeMail = async ({ from, to, user }) => {
  await sendMail({
    from,
    to ,
    subject: `${user.first_name} ${user.last_name} has registered with us`,
    text: `Please Welcome ${user.first_name} ${user.last_name} `,
  });
};

module.exports = { sendMail, confirmationMail, welcomeMail };
