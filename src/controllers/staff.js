import Staff from '../models/staff';
import Helper from '../utils/Helper';
import Assignments from '../models/assignment';
import Enroll from '../models/enrollment';
import Users from '../models/user';

/**
 * @class
 * @description A container class for all controllers
 * @exports UserController
 */
export default class StaffController {

/**
   * @method addInstructor
   * @description Admin can add instructors
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async addInstructor(req, res) {
    let { fullName, password, email, phoneNumber, course } = req.body;
    course = course.split(',');
    let instructor = {
      fullName, password, email, phoneNumber, course
    };
    let isAdmin = req.user.isAdmin;
     if (!isAdmin) {
      console.log("isAdmin", isAdmin);
      res.status(403).json({
      status: 403,
      error: 'Unauthorized!, contact your admin',
    });
  }
  await Staff.findOne({ email: email.trim().toLowerCase() }).then(response=>{
    if(!response){
      let newInstructor = new Staff(instructor);
      console.log("course",newInstructor);
      newInstructor.save((err, data)=>{
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
  else{
    res.status(403).json({
      status: 403, 
      error: 'Instructor already exist'
    })
  }
})
} 

/**
   * @method allInstructors
   * @description Admin can see all intructors.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async allInstructors(req, res) {
      await Staff.find({}, (error, instructors) => {
        let instructorMap = {};
        console.log(instructors);
        jobs.forEach((instructor) => {
          instructorMap[instructor.fullName] = instructor;
        });
        if(error){
          res.status(500).send({
            error: error,
            message: "Something went wrong"
          })
        }
        else{
          res.status(200).send({
            data: instructorMap
          })
        }
     
       }) 
    
     }

/**
   * @method loginInstructors
   * @description intructors can login.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static loginInstructors(req, res) {
    let { email } = req.body;
    email = email.trim().toLowerCase();
     Staff.findOne({ email }).then(response => {
        const token = Helper.generateToken({ _id: response._id, email: response.email, 
          createdAt: response.dateAdded });
        return res.status(200).json({
          status: 200, 
          message:'Login successful.', 
          data: response,
          token: token
        });
      }).catch((err) => {
          console.log(err)
        return res.status(500).json({
          status: 500, 
          error:'database error'
        });
      });
    
}

/**
   * @method postAssignment
   * @description intructors can post assignments.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async postAssignment(req, res) {
    let ass = req.body;
    let instructor = req.user._id;
    ass["instructor"] = instructor;
    let newAss = new Assignments(ass);
      newAss.save().then((data)=>{            
            Assignments.findOne({_id: data.id}).populate("instructor").then((data)=>{
            data['instructorName'] = data['instructor']['fullName'];
            data.save((err,data)=>{
              if(err){
                res.status(500).send({
                  error: err,
                  message: 'Database error'
                })
               }else{
                res.status(200).send({
                  data: data
                })
              }
            })
          })
          .catch(err=>{
              res.status(500).json({
              error: err
            })
          })
        })
       .catch(err=>{
          res.status(500).json({
          error: err,
          status: 500
     })
    })

  }

  /**
   * @method viewAssignment
   * @description instructors can view previous assignments.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async viewAssignment(req, res) {
    Assignments.find({}, (error, assignment) => {
      let assMap = {};
      assignment.forEach((ass) => {
        assMap[ass.course] = ass;
      });
      if(error){
        res.status(500).send({
          error: error,
          message: "Something went wrong"
        })
      }
      else{
        res.status(200).send({
          data: assMap
        })
      }
   
     }) 
  }

/**
   * @method getInstructorsCourses
   * @description intructors can see the courses they tutor.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async getInstructorsCourses(req, res) {
    let id = req.user._id;
    Staff.findOne({_id: id}).then((response) => {
    let courses = response.course;
    if (courses){
      res.status(200).json({
        userId: id,
        data: courses
      })
    }
    else{
      res.status(400).json({
        message: "Instructor has not been assigned",
      })
    }

    }).catch(err => {
       res.status(500).json({
         error: err
       })
    }) 

  }

  /**
   * @method forwardAssignments
   * @description intructors can forward assignments.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async forwardAssignments(req, res) {
    //find assignment by id
    //the data return contains a course field
    //store the course field in a variable
    //get people that are taking that particular course
    //create assignment field in user schema, should be an array of objects
    //find students taking courses using courseName
    //for each students, push the assignment gotten by id to the assignment field
   let id = req.params.id;
   Assignments.findOne({_id: id}).then(response =>{
     let userCourse = response.course;
      Enroll.find({ courseName: userCourse }, (err, data)=>{
        if(err){
          console.log(err);
          res.status(500).json({
            error: err,
            message: "Database error"
          })
        }
        else{
          let emails = data.map((x) =>x.email);
          for(y in emails){
            Users.findOne({email: emails[y]}).then(data=>{
              data["assignment"]["description"] = response.description;
              data["assignment"]["title"] =response.title;
              data["assignment"]["course"] = response.course;
            }).then(resp=>{
              res.status(200).json({
                resp
            })
           }).catch(err=>{
              res.status(500).json({
                error: err,
                message: "database error"
              })
            }).catch(err=>{
              res.status(500).json({
                error: err,
                message: "database error"
              })
            });
          }

        }
      })
   }).catch(err=>{
    res.status(500).json({
      error: err,
      message: "database error"
    })
  })


  }
/**
   * @method deleteAssignments
   * @description intructors can delete assignments.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async deleteAssignments(req, res) {
    let id = req.params.id;
    Assignments.deleteOne({ _id: id }, (err, result) => {
      if(err){
        res.status(500).json({
          message: "Database error",
          error: err
        })
      }
      else{
        res.status(200).json({
          message: "Assignment successfully deleted",
        })
      }

    })

  }

  /**
   * @method uploadCourseMaterials
   * @description intructors can upload course materials.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async uploadCourseMaterials(req, res) {
    

  }

  /**
   * @method deleteCourseMaterials
   * @description intructors can delete course materials.
   * @static
   * @param {object}
   * @returns {object} JSON response
   */
  static async deleteCourseMaterials(req, res) {
    

  }


   
}

