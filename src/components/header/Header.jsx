import { Box, Button, TextField } from "@mui/material";

import MultipleSelectChip from "./MultipleSelectChip";
import { useDispatch, useSelector } from "react-redux";
import {
	clearFilter,
	updateCompanyName,
	updateIsRemote,
	updateLocation,
	updateMinBasePay,
	updateMinExperience,
	updateRole,
	updateTechStack,
} from "../../store/filterSlice";

const Header = () => {
	const filterData = useSelector((state) => state.data.filterData);
	const filterValues = useSelector((state) => state);
	const handleClearFilter = () => {
		dispatch(clearFilter());
	};
	const dispatch = useDispatch();
	function handleChange(option, event) {
		switch (option) {
			case "Location":
				dispatch(updateLocation(event.target.value ?? ""));
				break;
			case "Company Name":
				dispatch(updateCompanyName(event.target.value ?? ""));
				break;
			case "Role":
				dispatch(updateRole(event.target.value ?? ""));
				break;
			case "Min Exp":
				dispatch(updateMinExperience(event.target.value ?? ""));
				break;
			case "Remote/on-site":
				dispatch(updateIsRemote(event.target.value ?? ""));
				break;
			case "Tech Stack":
				dispatch(updateTechStack(event.target.value ?? ""));
				break;
			case "Min base pay":
				dispatch(updateMinBasePay(event.target.value ?? ""));
				break;
			default:
				break;
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
			}}
		>
			<MultipleSelectChip
				multiple={false}
				label="Min Exp"
				options={filterData.experienceOptions}
				onChange={(e) => handleChange("Min Exp", e)}
				value={filterValues.filter.minExperience}
			/>
			<TextField
				sx={{ margin: "8px" }}
				label="Company Name"
				onChange={(e) => handleChange("Company Name", e)}
				value={filterValues.filter.companyName}
			/>
			<TextField
				label="Location"
				sx={{ marginTop: "8px" }}
				onChange={(e) => handleChange("Location", e)}
				value={filterValues.filter.location}
			/>
			<MultipleSelectChip
				multiple={true}
				label="Remote/on-site"
				options={filterData.remoteOptions}
				onChange={(e) => handleChange("Remote/on-site", e)}
				value={filterValues.filter.remoteOnsite}
			/>
			<MultipleSelectChip
				multiple={true}
				label="Tech Stack"
				options={filterData.techStackOptions}
				onChange={(e) => handleChange("Tech Stack", e)}
				value={filterValues.filter.techStack}
			/>
			<TextField
				label="Role"
				sx={{ marginTop: "8px" }}
				onChange={(e) => handleChange("Role", e)}
				value={filterValues.filter.role}
			/>
			<MultipleSelectChip
				multiple={false}
				label="Min base pay"
				options={filterData.minBasePayOptions}
				onChange={(e) => handleChange("Min base pay", e)}
				value={filterValues.filter.minBasePay}
			/>
			{/* <Box> */}
			<Button
				color="error"
				variant="outlined"
				size="small"
				onClick={handleClearFilter}
				sx={{ margin: "8px 0px" }}
			>
				Clear filter
			</Button>
			{/* </Box> */}
		</Box>
	);
};

export default Header;
