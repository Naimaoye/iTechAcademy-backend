import Helper from '../utils/Helper';
import sendEmail from '../utils/mailer';
import transporter from '../utils/transporter';
import Courses from '../models/courses';
import Enroll from '../models/enrollment';
import Users from '../models/user';
import studentServices from '../services/studentServices'

/**
 * @class
 * @description A container class for all controllers
 * @exports Students
 */
export default class Students {
  /**
   * @method
   * @description compose successful registration message
   * @static
   * @param {string} email
   * @returns {object} object
  */
 static composeEnrollMail(email) {
  return {
    recipientEmail: `${email}`,
    subject: 'Tech academy',
    body: `<p>Your enrollment was successful. You can go ahead and start your courses</p></br>`
  };
}

/**
   * @method
   * @description enroll students and pay
   * @whatTocomplete check for if transaction is successful
   * @whatTocomplete2 update payment status to true on successful enrollment
   * @static
   * @param {string} email
   * @returns {object} object
  */
static enrollStudents(req, res) {
  let { email } = req.body;
  Users.findOne({ email: email.trim().toLowerCase(), isVerified: true }).then(response=>{
  console.log("resp",response)
  let student = req.body
  let newStudent = new Enroll(student);
  console.log("newstd",newStudent);
   newStudent.save((err, data)=>{
     console.log("data", data)
    if(err){
      console.log(error);
      res.status(500).json({
        status: 500, 
        error: 'database error'
      });
    }
    else{
      res.status(201).json({
        status: 201, 
        data: data
      });
      let mailData = Students.composeEnrollMail(data.email);
      sendEmail(transporter(), mailData);
    }
  })
  }).catch(()=>{
    res.status(404).json({
    status: 404, 
    error: 'user not found or not verified'
  })
});

}
/**
   * @method
   * @description 
   * @static
   * @param {string} email
   * @returns {object} object
  */
static viewAssignment(req, res) {
  

}


}



