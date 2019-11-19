import express from 'express';
import StudentsController from '../controllers/students';
import userValidations from '../middleware/userValidation';
import Auth from '../middleware/Auth';

const studentRoute = express.Router();

studentRoute.post('/students/enroll',
  Auth.userAuth,
  userValidations.validateUser('enroll'),
  StudentsController.enrollStudents);

studentRoute.post('/students/confirmPay',
  Auth.userAuth,  
);

studentRoute.get('/students/courses',
StudentsController.viewAllCourses
);

studentRoute.get('/students/jobs',
Auth.userAuth,
StudentsController.viewAllJobs
);


export default studentRoute;
  