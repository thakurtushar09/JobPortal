import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Navbar from "./Shared/Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobsTable from "./appliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";





const Profile = () => {
  useGetAppliedJobs();
  const[open,setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth)
  return (
    
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-500 bg-white rounded-2xl my-3 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
            </Avatar>
            <div className="p-5">
              <h1 className="font-bold text-xl">{user.fullName}</h1>
              <p className="text-sm">
                {user.profile.bio}
              </p>
            </div>
          </div>
          <div>
            <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
              <Pen />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 my-4">
          <Mail />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-3 my-4">
          <Contact />
          <span>{user.phoneNumber}</span>
        </div>

        <div className="my-5">
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-3 my-3">
            {user.profile.skills.length !== 0 ? (
              user.profile.skills.map((val, index) => (
                <Badge className="px-3 py-2" key={index}>
                  {val}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-lg font-bold">Resume</Label>
          {user.profile.resume ? (
            <a href={user.profile.resume} target="blank" className="text-blue-500 hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : <span>NA</span>}
        </div>

      </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
            <AppliedJobsTable/>
        </div>


          <UpdateProfileDialog open={open} setOpen={setOpen}/>
        
    </div>
  );
};

export default Profile;
