import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT} from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAdminJobs = async()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`,{withCredentials:true});
                if(res.data.success){
                    console.log(res.data);
                    
                     dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchAdminJobs();
    },[])
  return (
    <div>
      
    </div>
  )
}

export default useGetAdminJobs;
