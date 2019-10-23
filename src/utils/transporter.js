import nodemailer from 'nodemailer';

const senderEmail = process.env.EMAIL;

const transporter = () => nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: senderEmail,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default transporter;