import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import jobsSlice from "./jobsSlice";

const rootReducer = combineReducers({
	data: jobsSlice,
	filter: filterSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
