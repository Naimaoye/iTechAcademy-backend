import Courses from '../models/courses';
import Enroll from '../models/enrollment';
import Users from '../models/user';

/**
 * @class
 * @description A class containing all services
 * @exports UserService
 */
export default class StudentService {
    /**
     * @method signup
     * @description Medium between the database and stendentsController
     * @static
     * @param {object} studentCredentials - data object
     * @returns {object} JSON response
     * @memberof UserService
     */
    static async createStudents(studentCredentials) {
      let { 
          fullName, email, phoneNumber, course, amount 
        } = studentCredentials;
      email = email.trim().toLowerCase();
      let student = {
        fullName, email, phoneNumber, course, amount
      };
  
      let newStudent = new Enroll(student);
      console.log("newstd",newStudent);
      return await newStudent.save();
    }
    
}  


