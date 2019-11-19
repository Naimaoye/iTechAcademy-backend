import Joi from '@hapi/joi';

const name = Joi.string().trim().required().regex(/^[A-Za-z]+$/)
  .min(3);

const fullName = Joi.string().trim().required().regex(/^[A-Z]+ [A-Z]+$/i)
  .min(5)
  .label('full name is required, must be alphabets only and have at least 5 characters');

const amount = Joi.number().positive().precision(2).required()
  .label('amount is required');

const phoneNumber = Joi.string().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/).max(11)
  .label('phone number is required');

const firstName = name
  .label('firstname is required, must be alphabets only and have at least 3 characters');

const lastName = name
  .label('lastname is required, must be alphabets only and have at least 3 characters');

const companyName = name
  .label('company name is required, must be alphabets only and have at least 3 characters');

const email = Joi.string().trim().lowercase().email()
  .required()
  .label('email is required, and should follow this format: myemail@domain.com');

const password = Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/)
  .label('password is required, must be at least 8 characters and must'
    + ' contain at least a number, one lowercase and one uppercase alphabet');

const registerAs = Joi.string()
    .label('Are you registering as a student or company?');

const courseName = Joi.string()
    .label('course name is required');

const courseCode = Joi.string()
    .label('course code is required');

const title = Joi.string()
    .label('title is required');

const description = Joi.string()
    .label('job description is required');

const company = Joi.string()
    .label('company name is required');



export default {
  signup: Joi.object().keys({
    firstName,
    lastName,
    email,
    password,
    registerAs
  }),
  signin: Joi.object().keys({
    email,
    password
  }),
  signupCompany: Joi.object().keys({
    companyName,
    email,
    password
  }),
  updatePassword: Joi.object().keys({
    password
  }),
  enroll: Joi.object().keys({
    fullName,
    email,
    phoneNumber,
    courseName,
    amount
  }),
  courses: Joi.object().keys({
   courseName,
   courseCode
  })
};
