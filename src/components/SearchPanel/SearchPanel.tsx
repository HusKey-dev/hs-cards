import { Autocomplete, TextField, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";

const StyledTextField = styled(TextField)(() => ({
	"& fieldset": {
		borderTopRightRadius: "0px",
		borderBottomRightRadius: "0px",
	},
}));

interface SearchPanelProps {
	value: string;
	onChange?: (event: React.SyntheticEvent, newValue: string) => void;
	suggests?: Array<string>;
}

function SearchPanel({ value, suggests, onChange }: SearchPanelProps) {
	const inputEl = useRef<any>(null);
	const [height, setHeight] = useState<string>("0px");

	// useEffect(() => {
	// 	if (height === "0px") {
	// 		setHeight(inputEl.current?.clientHeight + "px");
	// 	}
	// }, []);

	return (
		<div>
			<Autocomplete
				blurOnSelect={true}
				freeSolo
				sx={{
					width: "400px",
				}}
				options={(value.length > 1 && suggests) || []}
				inputValue={value}
				onInputChange={onChange}
				renderInput={(params) => (
					<TextField {...params} label="Поиск" />
				)}
			/>

			<Button
				variant="contained"
				sx={{
					height,
					borderTopLeftRadius: "0px",
					borderBottomLeftRadius: "0px",
				}}
			>
				<SearchIcon />
			</Button>
		</div>
	);
}

export default SearchPanel;
