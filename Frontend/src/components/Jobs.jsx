import { useSelector } from "react-redux";
import FilterCard from "./filterCard";
import Job from "./job";
import Navbar from "./Shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs(); // Ensure this is called
  const { allJobs } = useSelector((store) => store.job);
  console.log(allJobs.jobs);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {allJobs.jobs.length <= 0 ? (
            <span>No job available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.jobs.map((val)=>(
                  <Job job={val} key={val._id}/>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
