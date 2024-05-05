import { createSelector } from "reselect";

const selectFilterState = (state) => state.filter;

const selectJdList = (state) => state.data.jdList;

export const selectFilteredJdList = createSelector(
	[selectFilterState, selectJdList],
	(filterState, jdList) => {
		return jdList.filter((item) => {
			if (
				filterState.minExperience &&
				item.minExp < filterState.minExperience
			) {
				return false;
			}

			if (
				filterState.companyName &&
				!item?.companyName
					?.toLocaleLowerCase()
					?.includes(filterState.companyName?.toLocaleLowerCase())
			) {
				return false;
			}

			if (
				filterState.location?.toLocaleLowerCase() &&
				!item.location
					?.toLocaleLowerCase()
					?.includes(filterState.location?.toLocaleLowerCase())
			) {
				return false;
			}

			if (
				filterState?.remoteOnsite?.length > 0 &&
				filterState.remoteOnsite.includes("Remote") &&
				!item?.location?.toLocaleLowerCase()?.includes("remote")
			) {
				return false;
			}

			if (
				filterState.techStack &&
				filterState.techStack.length > 0 &&
				!filterState.techStack.some((stack) => item.jobRole.includes(stack))
			) {
				return false;
			}

			if (
				filterState.role &&
				!item?.jobRole
					?.toLocaleLowerCase()
					?.includes(filterState.role.toLocaleLowerCase())
			) {
				return false;
			}

			if (
				filterState.minBasePay &&
				item.minJdSalary < parseFloat(filterState.minBasePay.toString())
			) {
				return false;
			}

			return true;
		});
	}
);
