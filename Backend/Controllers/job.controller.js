import { Job } from "../Models/jobs.model.js";

export const postJob = async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,experience,jobType,position,companyId}=req.body;
        const userId = req.id;

        if(!title || !description  || !requirements || !salary || !experience|| !location || !jobType || !position || !companyId){
            return res.status(404).json({
                message:"All Fields are required",
                success:false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        })

        return res.status(200).json({
            message:"New job created Successfully",
            success:true,
            job
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Job Not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const findJobById = async (req,res)=>{

    try {
        
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                messasge:"Job not found",
                success:false
            })
        }
    
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const adminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs =await Job.find({created_by:adminId}).populate({
            path : "company"
        });
        if(!jobs){
            return res.status(404).json({
                messasge:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}