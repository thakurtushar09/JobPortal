import { useNavigate } from "react-router-dom"
import Navbar from "../Shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CompaniesTable from "./CompaniesTable"
import useGetAllCompanies from "@/hooks/useGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"

const Companies = () => {
  useGetAllCompanies();
    const Navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
  },[input]);
  return (
    <div>
      <Navbar/>

      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
            <Input className='w-fit' placeholder='Filter by Name' onChange={(e) => setInput(e.target.value)}/>

            <Button onClick = {()=>Navigate('/admin/company/create')}>New Company</Button>
            

        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
