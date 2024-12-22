import { useNavigate } from "react-router-dom"
import Navbar from "../Shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import useGetAllCompanies from "@/hooks/useGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AdminJobsTable from "./AdminJobsTable"
import useGetAdminJobs from "@/hooks/useGetAdminJobs"
import { setSearchJobByText } from "@/redux/jobSlice"

const AdminJobs = () => {
    useGetAllCompanies();
    useGetAdminJobs();
    const Navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByText(input));
  },[input]);
  return (
    <div>
      <Navbar/>

      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
            <Input className='w-fit' placeholder='Filter by Name,role' onChange={(e) => setInput(e.target.value)}/>

            <Button onClick = {()=>Navigate('/admin/jobs/create')}>Post a new Job</Button>
            

        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs
