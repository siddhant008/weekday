import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import JobsCard from "./JobsCard";

const Jobs = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const jobsRef = useRef(null);
	const loaderRef = useRef(null);

	const fetchJobs = async (offset) => {
		setLoading(true);
		const body = JSON.stringify({
			limit: 10,
			offset: offset,
		});
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		};
		const response = await fetch(
			"https://api.weekday.technology/adhoc/getSampleJdJSON",
			requestOptions
		);
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		return response.json();
	};

	useEffect(() => {
		loadInitialJobs();
	}, []);

	const loadInitialJobs = async () => {
		setLoading(true);
		// Simulate fetching initial data
		const initialJobs = await fetchJobs();
		setJobs(initialJobs.jdList);
		setLoading(false);
	};

	useEffect(() => {
		const handleScroll = async () => {
			if (loading) return; // Avoid multiple calls when already loading

			const { scrollTop, scrollHeight, clientHeight } = jobsRef.current;
			if (scrollTop + clientHeight >= scrollHeight - 5) {
				// Near the bottom
				setLoading(true);
				const moreJobs = await fetchJobs(); // Fetch more jobs
				setJobs((prevJobs) => [...prevJobs, ...moreJobs.jdList]);
				setLoading(false);
			}
		};

		// Attach scroll event listener
		const currentRef = jobsRef.current;
		currentRef.addEventListener("scroll", handleScroll);

		// Clean up the event listener on component unmount
		return () => {
			currentRef.removeEventListener("scroll", handleScroll);
		};
	}, [loading]); // Dependency on loading state

	return (
		<Box
			ref={jobsRef}
			sx={{
				overflowY: "scroll",
				height: "77vh",
				margin: "8px",
				/* width */
				"&::-webkit-scrollbar": {
					width: "10px",
				},

				/* Track */
				"::-webkit-scrollbar-track": {
					background: "#f1f1f1",
					borderRadius: "25px",
				},

				/* Handle */
				"::-webkit-scrollbar-thumb": {
					borderRadius: "25px",
					background: "#888",
				},
				/* Handle on hover */
				"::-webkit-scrollbar-thumb:hover": {
					background: "#555",
				},
			}}
		>
			{jobs.length ? (
				<Grid container spacing={2} sx={{ flexGrow: 1 }}>
					{jobs.map((item) => (
						<Grid item xs={12} sm={12} md={6} lg={4} key={item.jdUid}>
							<Box sx={{ margin: "auto", mt: "8px", width: "fit-content" }}>
								<JobsCard item={item} />
							</Box>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="h5">No Data Available</Typography>
			)}
			<Box ref={loaderRef}>
				{loading && (
					<Typography variant="h6" sx={{ m: "32px auto" }}>
						Loading...
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default Jobs;
