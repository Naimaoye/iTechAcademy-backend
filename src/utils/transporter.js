import mailerGun from 'nodemailer-mailgun-transport';


const transporter = () => nodemailer.createTransport(mailerGun({
    auth:{
        domain: process.env.domain,
        api_key: process.env.api_key
    }
}));


export default transporter;