import StaffController from '../controllers/staff';
import Auth from '../middleware/Auth';
import express from 'express';
import userValidations from '../middleware/userValidation';

const staffRoute = express.Router();

staffRoute.post('/staff/signin',
  userValidations.validateUser('signin'),
  userValidations.validateStaffLogin,
  StaffController.loginInstructors);

staffRoute.post('/staff/assignments',
  Auth.userAuth,
  StaffController.postAssignment
);

staffRoute.get('/staff/assignments',
  Auth.userAuth,
  StaffController.viewAssignment
);

staffRoute.get('/staff/courses',
  Auth.userAuth,
  StaffController.getInstructorsCourses
);

staffRoute.delete('/staff/assignments/:id',
  Auth.userAuth,
  StaffController.deleteAssignments
);

staffRoute.post('/staff/forward_assignments/:id',
  Auth.userAuth,
  StaffController.forwardAssignments
)


export default staffRoute;
