
import { useDispatch, useSelector } from 'react-redux';
import Job from './Job';
import Navbar from './Shared/Navbar'
import { useEffect } from 'react';
import { setSeachedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSeachedQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.jobs.length})</h1>
        <div className="grid grid-cols-3 gap-3">
          {
            allJobs.jobs.map((val, index) => {
              return <Job key={index} job={val} />;
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Browse
