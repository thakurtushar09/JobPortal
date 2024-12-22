import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  // Redux state
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Logs to debug the Redux state
  console.log("Redux singleJob state:", singleJob);
  console.log("Current user:", user);

  // Params and dispatch setup
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Derive the applied status directly from Redux state
  const isApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );

  console.log("Derived isApplied:", isApplied); // Check if the `isApplied` value updates correctly

  // Function to handle job application
  const applyJobHandler = async () => {
    try {
      console.log("Applying for job with ID:", jobId);
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Log API response
        console.log("API Response:", res.data);

        // Update Redux state with the new application
        const updatedApplications = [
          ...singleJob.applications,
          { applicant: user?._id }, // Add the new applicant
        ];
        const updatedSingleJob = {
          ...singleJob,
          applications: updatedApplications,
        };

        console.log("Updated singleJob to dispatch:", updatedSingleJob);

        // Dispatch the updated job to Redux
        dispatch(setSingleJob(updatedSingleJob));

        // Show success toast
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Fetch job details on component mount
  useEffect(() => {
    console.log("Fetching single job...");
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("Fetched single job:", res.data.job);
          dispatch(setSingleJob(res.data.job)); // Update Redux with fetched job
        }
      } catch (error) {
        console.error("Error fetching single job:", error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
