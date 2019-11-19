import Auth from '../middleware/Auth';
import express from 'express';
import Companies from '../controllers/companies';


const companyRoute = express.Router();

companyRoute.post('/company/jobs/:id',
Auth.userAuth,
Companies.postJobs
);






export default companyRoute;
