import { Ghost } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{job.company.name}</h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>

      <div>
        <h1 className="font-bold text-lg">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={Ghost}>
          {job.position} Position
        </Badge>
        <Badge className={"text-[#f83002] font-bold"} variant={Ghost}>
          Full Time
        </Badge>
        <Badge className={"text-[#720b97] font-bold"} variant={Ghost}>
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
