import Courses from '../models/courses';

/**
 * @class
 * @description A container class for all controllers
 * @exports AllCourses
 */
export default class AllCourses {
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
   let isAdmin = req.user.isAdmin;
   if (!isAdmin) {
    console.log("isAdmin", isAdmin);
    res.status(403).json({
      status: 403,
      error: 'Unauthorized!, contact your admin',
    });
  }
  Courses.findOne({ courseName: courseName.trim().toLowerCase() }).then(response=>{
    if(!response){
    let newCourse = new Courses(course);
    newCourse.save((err, data)=>{
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
  else{
    res.status(403).json({
      status: 403, 
      error: 'course already exist'
    })
}
})
}




}