import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Button, Chip } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AboutUsModal from "./AboutUsModal";

export default function JobsCard({ item }) {
	const [expanded, setExpanded] = React.useState(false);

	return (
		<Card
			elevation={3}
			sx={{ maxWidth: 345, borderRadius: "25px", pl: "12px", pr: "12px" }}
		>
			<Box sx={{ mt: "16px", ml: "16px", textAlign: "left" }}>
				<Chip
					icon={<HourglassBottomIcon />}
					label="Posted 2 days ago"
					size="small"
					variant="outlined"
				/>
			</Box>
			<CardHeader
				avatar={
					<img src={item?.logoUrl} alt={"logo"} height="64px" width="64px" />
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={<Typography fontWeight="bold">{item?.companyName}</Typography>}
				subheader={
					<>
						<Typography>{item?.jobRole}</Typography>
						<Typography color={"black"} variant="body2">
							{item?.location}
						</Typography>
					</>
				}
			/>
			<CardContent sx={{ textAlign: "left" }}>
				<Typography sx={{ mb: "16px" }}>
					Estimated Salary:{" "}
					{`${item?.salaryCurrencyCode} ${item?.minJdSalary || 0}k - ${
						item?.maxJdSalary
					}k`}
				</Typography>
				<Typography variant="h6">About Company: </Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{
						display: "-webkit-box",
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						textOverflow: "ellipsis",
						WebkitLineClamp: 5,
					}}
				>
					{item?.jobDetailsFromCompany}
				</Typography>
				{item?.jobDetailsFromCompany?.split(" ").length > 50 && ( // Change condition based on your text length or line count
					<>
						<Typography
							sx={{
								position: "relative",
								width: "100%",
								textAlign: "center",
								background: "rgba(255, 255, 255, 0.8)",
								py: 1,
								mt: "-24px",
								zIndex: 99,
								cursor: "pointer",
								color: "#4b45db",
							}}
							onClick={() => setExpanded(true)}
						>
							View Job
						</Typography>
						{expanded && (
							<AboutUsModal
								open={expanded}
								setOpen={setExpanded}
								aboutUs={item.jobDetailsFromCompany}
							/>
						)}
					</>
				)}
				<Typography
					variant="subtitle1"
					fontWeight="bold"
					color="grey"
					sx={{ mt: 2 }}
				>
					Minimum Experience:
				</Typography>
				<Typography>
					{item?.minExp ? `${item?.minExp} years` : "NA"}{" "}
				</Typography>
			</CardContent>

			<CardActions disableSpacing>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
						gap: "8px",
					}}
				>
					<Button
						variant="contained"
						sx={{
							width: "100%",
							backgroundColor: "#54efc3",
							color: "black",
							height: "42px",
						}}
						startIcon={<ElectricBoltIcon />}
						onClick={() => (window.location.href = item?.jdLink)}
					>
						Easy Apply
					</Button>
					<Button
						variant="contained"
						sx={{
							width: "100%",
							backgroundColor: "#4943da",
							height: "42px",
							mb: "16px",
						}}
					>
						<Avatar
							alt="Remy Sharp"
							src="https://imgs.search.brave.com/30jLPEBdsckSq41y95vbuRXXZvqceF0UWjuk2CmzLTc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jcm9w/LWNpcmNsZS5pbWFn/ZW9ubGluZS5jby9p/bWFnZS5wbmc"
							sx={{ width: 24, height: 24, filter: "blur(2px)", mr: "8px" }}
						/>
						<Avatar
							alt="Travis Howard"
							src="https://imgs.search.brave.com/30jLPEBdsckSq41y95vbuRXXZvqceF0UWjuk2CmzLTc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jcm9w/LWNpcmNsZS5pbWFn/ZW9ubGluZS5jby9p/bWFnZS5wbmc"
							sx={{ width: 24, height: 24, filter: "blur(2px)", mr: "8px" }}
						/>
						<Typography variant="caption">Unlock referral asks</Typography>
					</Button>
				</Box>
			</CardActions>
		</Card>
	);
}
