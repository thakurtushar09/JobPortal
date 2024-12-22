import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setSeachedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const[query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = ()=>{
    dispatch(setSeachedQuery(query));
    navigate('/browse')
  }
  return (
    <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
            <span className="text-[#f83002] font-medium px-4 py-2 mx-auto bg-gray-300 rounded-full ">No. 1 Job Hunting Platform</span>
            <h1 className="text-5xl font-bold">Search, Apply & <br />Get Your<span className="text-[#6A38C2]"> Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque maiores, ipsa odit dolores dicta?</p>
        </div>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full item-center gap-4 mx-auto">
            <input 
            type="text" 
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Find Your Job Here"
            className="outline-none border-none w-full"
            />
            <Button onClick = {searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                <Search className="h-5 w-5"/>
            </Button>
        </div>
    </div>
  )
}

export default HeroSection
