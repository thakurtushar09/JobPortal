import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name : "job",
    initialState:{
        allJobs : [],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery :""
    },
    reducers:{
        setAllJobs : (state,action) =>{
            state.allJobs = action.payload
        },
        setSingleJob : (state,action) =>{
            console.log("Updating singleJob in Redux:", action.payload);
            state.singleJob = action.payload
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSeachedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
    }
});
export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSeachedQuery} = jobSlice.actions;
export default jobSlice.reducer;