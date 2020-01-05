import Jobs from '../models/jobs';

/**
 * @class
 * @description A container class for all controllers
 * @exports Companies
 */
export default class Companies {
    /**
      * @method
      * @description companies can post jobs
      * @static
      * @param {string} 
      * @returns {object} object
     */
   
     static postJobs(req, res){
      let job = req.body;
      job["company"] = req.params.id;
      let newJob = new Jobs(job);
      newJob.save().then((data)=>{            
            Jobs.findOne({_id: data.id}).populate("company").then((data)=>{
            data['companyName'] = data['company']['companyName'];
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
              res.send({
              error: err
            })
          })
        })
       .catch(err=>{
          res.status(500).send({
          error: err,
          status: 500
     })
    })
  }

  

}