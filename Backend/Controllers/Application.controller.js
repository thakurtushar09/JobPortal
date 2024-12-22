import { Application } from "../Models/application.model.js";
import { Job } from "../Models/jobs.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        status: false,
      });
    }
    //check if applied already or not

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "Job is already applied by this user",
        status: false,
      });
    }

    //check if job exist

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job does not exist ",
        status: false,
      });
    }

    //create new application

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "Job applied successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//check how many user have applied
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById( jobId ).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const updateStatus = async(req,res)=>{
     
   try {
    
       const {status} = req.body;
       const applicationId = req.params.id;
       if(!status){
           return res.status(404).json({
               message: "Status is required",
               success: false,
           });
       }
    
       //find application with application id
    
       const application = await Application.findOne({_id:applicationId});
       if(!application){
           return res.status(404).json({
               message: "Application id not found",
               success: false,
           });
       }
    
       //update status
    
       application.status = status.toLowerCase();
       await application.save();
    
       return res.status(200).json({
           message:"Status update successfully",
           success:true
       })
   } catch (error) {
    console.log(error);
    
   } 

}