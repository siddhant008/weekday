//@ts-ignore
import React, { useState } from "react";
import {
	OutlinedInput,
	InputLabel,
	MenuItem,
	Select,
	FormControl,
	Stack,
	Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function MultipleSelectChip({ multiple, label, options }) {
	const [selectedNames, setSelectedNames] = useState([]);

	function handleChange(event) {
		setSelectedNames(event?.target.value ?? []);
	}
	return (
		<FormControl sx={{ m: 1, width: "max-content", minWidth: "200px" }}>
			<InputLabel>{label}</InputLabel>
			<Select
				multiple={multiple}
				value={selectedNames}
				onChange={(e) => handleChange(e)}
				input={<OutlinedInput label={label} />}
				renderValue={(selected) => (
					<Stack gap={1} direction="row" flexWrap="wrap">
						{multiple
							? selected.map((value) => (
									<Chip
										key={value}
										label={value}
										onDelete={() => {
											setSelectedNames(
												selectedNames.filter((item) => item !== value)
											);
											handleChange(label);
										}}
										deleteIcon={
											<CancelIcon
												onMouseDown={(event) => event.stopPropagation()}
											/>
										}
									/>
							  ))
							: selected}
					</Stack>
				)}
			>
				{options.map((name) => (
					<MenuItem
						key={name}
						value={name}
						sx={{ justifyContent: "space-between" }}
					>
						{name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
