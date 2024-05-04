import { Box, Button, TextField } from "@mui/material";
import {
	experienceOptions,
	minBasePayOptions,
	remoteOptions,
	techStackOptions,
} from "../../mockData";

import MultipleSelectChip from "./MultipleSelectChip";

const Header = () => {
	const handleChange = (option, event) => {};
	const handleClearFilter = () => {};
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
				options={experienceOptions}
			/>
			<TextField
				sx={{ margin: "8px" }}
				label="Company Name"
				onChange={(e) => handleChange("Company Name", e)}
			/>
			<TextField
				label="Location"
				sx={{ marginTop: "8px" }}
				onChange={(e) => handleChange("Location", e)}
			/>
			<MultipleSelectChip
				multiple={true}
				label="Remote/on-site"
				options={remoteOptions}
			/>
			<MultipleSelectChip
				multiple={true}
				label="Tech Stack"
				options={techStackOptions}
			/>
			<TextField
				label="Role"
				sx={{ marginTop: "8px" }}
				onChange={(e) => handleChange("Role", e)}
			/>
			<MultipleSelectChip
				multiple={false}
				label="Min base pay"
				options={minBasePayOptions}
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
