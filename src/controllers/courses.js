import Courses from '../models/courses';

/**
 * @class
 * @description A container class for all controllers
 * @exports Courses
 */
export default class Courses {
 /**
   * @method
   * @description compose successful registration message
   * @static
   * @param {string} email
   * @returns {object} object
  */

  static AddCourses (req, res){
   let { courseName, courseCode } = req.body;
   let course = { courseName, courseCode };
   if (!req.user.isAdmin) {
    return res.status(403).json({
      status: 403,
      error: 'Unauthorized!, contact your admin',
    });
  }
  Courses.findOne({ name: name.trim().toLowerCase() }).then(response=>{
    if(response.name){
      res.status(403).json({
        status: 403, 
        error: 'course already exist'
      })
    }
    else{
    let newCourse = new Courses(course);
    console.log("course",newCourse);
    newCourse.save((err, data)=>{
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
    }
  })
}
})
}



}