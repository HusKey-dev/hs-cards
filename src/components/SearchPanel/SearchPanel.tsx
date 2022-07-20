import { TextField, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";

const StyledTextField = styled(TextField)(() => ({
	"& fieldset": {
		borderTopRightRadius: "0px",
		borderBottomRightRadius: "0px",
	},
}));

function SearchPanel() {
	const inputEl = useRef<any>(null);
	const [height, setHeight] = useState<string>("0px");

	useEffect(() => {
		if (height === "0px") {
			setHeight(inputEl.current?.clientHeight + "px");
		}
	}, []);

	return (
		<div>
			<StyledTextField
				label="Поиск"
				variant="outlined"
				inputRef={inputEl}
				sx={{
					width: "400px",
				}}
				// inputProps={{ classes: { input: { height: 40 } } }}
			/>
			<Button
				variant="contained"
				sx={(() => {
					console.log(height);
					return {
						height,
						borderTopLeftRadius: "0px",
						borderBottomLeftRadius: "0px",
					};
				})()}
			>
				<SearchIcon />
			</Button>
		</div>
	);
}

export default SearchPanel;
