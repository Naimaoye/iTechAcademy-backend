import mailerGun from 'nodemailer-mailgun-transport';
import nodemailer from 'nodemailer'


const transporter = () => nodemailer.createTransport(mailerGun({
    auth:{
        domain: process.env.domain,
        api_key: process.env.api_key
    }
}));


export default transporter;