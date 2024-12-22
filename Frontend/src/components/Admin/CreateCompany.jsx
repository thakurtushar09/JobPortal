import { useNavigate } from "react-router-dom"
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CreateCompany = () => {
    const[companyName,setCompanyName] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerCompany = async ()=>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    "Content-Type":'application/json'
                },
                withCredentials:true
            });

            if(res.data?.success){
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                dispatch(setSingleCompany(res.data.company))
                navigate(`/admin/company/${companyId}`);
            }
            
        } catch (error) {
            toast.error(error.Response.data.message);
            console.log(error);
            
        }
    }
  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
            <h1 className="font-bold text-2xl">Your Company Name</h1>
            <p className="text-gray-500">What would you like to name your company? you can change it later</p>
        </div>

        <Label>Company Name</Label>
        <Input onChange={(e)=>setCompanyName(e.target.value)}type='text' className='my-2' placeholder='JobHunt,Microsoft etc'/>
        <div className="flex items-center gap-2 my-10">
            <Button variant = 'outline' onClick={()=>navigate('/admin/companies')} >Cancel</Button>
            <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany
