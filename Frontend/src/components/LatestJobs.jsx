import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const navigate = useNavigate();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs?.jobs?.slice(0, 6).map((value) => (
          <LatestJobCard
            key={value._id}
            onClick={() => navigate(`/description/${value._id}`)}
            job={value}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
