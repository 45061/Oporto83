const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_MAIL_USER,
    pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
  },
});

exports.verify = async (transporter) => {
  const connection = await transporter.verify();
  if (connection) {
    console.log("Mail server is ready");
  }
};
