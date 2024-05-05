import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	filterData: {
		experienceOptions: [],
		remoteOptions: ["on-site", "Hybrid", "Remote"],
		techStackOptions: [],
		minBasePayOptions: [],
	},
	jdList: [],
	unfilteredjdList: [],
	error: null,
};

const jobsSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setJobs(state, action) {
			state.jdList = [...state.jdList, ...action.payload];
			state.unfilteredjdList = [...state.jdList, ...action.payload];
			const experienceOptions = [];
			const techStackOptions = [];
			const minBasePayOptions = [];
			action.payload.forEach((item) => {
				item.minExp && experienceOptions.push(item.minExp);
				item.jobRole && techStackOptions.push(item.jobRole);
				item.minJdSalary && minBasePayOptions.push(item.minJdSalary);
			});
			state.filterData.experienceOptions = [...new Set(experienceOptions)].sort(
				(a, b) => a - b
			);
			state.filterData.techStackOptions = [...new Set(techStackOptions)];
			state.filterData.minBasePayOptions = [...new Set(minBasePayOptions)].sort(
				(a, b) => a - b
			);
		},
		fetchDataFailure(state, action) {
			state.error = action.payload;
		},
	},
});

export const { setJobs, fetchDataFailure, resetJobsData } = jobsSlice.actions;

export default jobsSlice.reducer;
