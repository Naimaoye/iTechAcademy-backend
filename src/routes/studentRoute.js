import express from 'express';
import StudentsController from '../controllers/students'
import userValidations from '../middleware/userValidation';

const studentRoute = express.Router();

studentRoute.post('/students/enroll',
  userValidations.validateUser('enroll'),
  StudentsController.enrollStudents);

studentRoute.post('/students/confirmPay',
  
)


  export default studentRoute;