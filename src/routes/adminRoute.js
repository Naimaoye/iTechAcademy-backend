import Auth from '../middleware/Auth';
import express from 'express';
import userValidations from '../middleware/userValidation';
import Courses from '../controllers/courses';
import Staff from '../controllers/staff';

const adminRoute = express.Router();

adminRoute.post('/admin/courses',
Auth.userAuth,
userValidations.validateUser('courses'),
Courses.AddCourses
);

adminRoute.post('/admin/add/instructors',
Auth.userAuth,
Staff.addInstructor
);

adminRoute.get('/admin/instructors',
Auth.userAuth,
Staff.allInstructors
);



export default adminRoute;
