import Auth from '../middleware/Auth';
import express from 'express';
import userValidations from '../middleware/userValidation';
import Courses from '../controllers/courses';
import User from '../controllers/userController';


const adminRoute = express.Router();

adminRoute.post('/admin/courses',
Auth.userAuth,
userValidations.validateUser('courses'),
Courses.AddCourses
);

adminRoute.post('/admin/add/instructors',
Auth.userAuth,
User.addInstructor
);



export default adminRoute;
