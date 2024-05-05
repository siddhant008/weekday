import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	minExperience: "",
	companyName: "",
	location: "",
	remoteOnsite: [],
	techStack: [],
	role: "",
	minBasePay: "",
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		updateMinExperience(state, action) {
			state.minExperience = action.payload;
		},
		updateCompanyName(state, action) {
			state.companyName = action.payload;
		},
		updateLocation(state, action) {
			state.location = action.payload;
		},
		updateIsRemote(state, action) {
			state.remoteOnsite = action.payload;
		},
		updateTechStack(state, action) {
			state.techStack = action.payload;
		},
		updateRole(state, action) {
			state.role = action.payload;
		},
		updateMinBasePay(state, action) {
			state.minBasePay = action.payload;
		},
		clearFilter(state, action) {
			state = initialState;
		},
	},
});

export const {
	updateFilterData,
	updateMinExperience,
	updateCompanyName,
	updateLocation,
	updateIsRemote,
	updateTechStack,
	updateRole,
	updateMinBasePay,
	clearFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
