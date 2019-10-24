const senderEmail = process.env.EMAIL;

const sendEmail = (transport, emailData) => new Promise((resolve, reject) => {
  transport.sendMail({
    from: `"Tech Academy"<${senderEmail}>`, // sender address
    to: `${emailData.recipientEmail}`,
    subject: `${emailData.subject}`, // Subject line
    html: `${emailData.body}`
  }, (err, info) => {
    if(err){
      console.log(err);
    }
    else{
    console.log(info);
    }
  });
});

export default sendEmail;