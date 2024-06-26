import { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import JobsCard from "./JobsCard";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredJdList } from "../../store/filterSelector";
import { setJobs } from "../../store/jobsSlice";

const Jobs = () => {
	const dispatch = useDispatch();

	const jobs = useSelector((state) => selectFilteredJdList(state));

	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const jobsRef = useRef(null);

	const fetchJobs = async () => {
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
		setOffset((prevOffset) => prevOffset + 10);
		return response.json();
	};

	useEffect(() => {
		loadInitialJobs();
	}, []);

	const loadInitialJobs = async () => {
		setLoading(true);
		// fetching initial data
		const initialJobs = await fetchJobs();
		dispatch(setJobs(initialJobs.jdList));
		setLoading(false);
	};

	useEffect(() => {
		const handleScroll = async () => {
			if (loading) return; // Avoid multiple calls when already loading

			const { scrollTop, scrollHeight, clientHeight } = jobsRef.current;
			if (scrollTop + clientHeight >= scrollHeight - 5) {
				// when scroll is Near the bottom
				setLoading(true);
				const moreJobs = await fetchJobs(); // Fetch more jobs
				dispatch(setJobs([...moreJobs.jdList]));
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
	}, [loading]);

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
				!loading && <Typography variant="h5">No Data Available</Typography>
			)}
			<Box>
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
