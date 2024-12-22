import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function useGetAllJobs() {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job)
    const {allJobs} = useSelector(store=>store.job);
  useEffect(()=>{
    const fetchAllJobs = async()=>{
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                console.log(res.data);
                
                dispatch(setAllJobs(res.data));
            }
        } catch (error) {
            console.log(error);
            
        }
        console.log(allJobs);
    }

    fetchAllJobs();
  },[])
}

export default useGetAllJobs
