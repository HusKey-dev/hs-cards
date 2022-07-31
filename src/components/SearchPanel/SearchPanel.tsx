import { TextField, Button, styled } from "@mui/material";
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
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchPanel({ value, onChange }: SearchPanelProps) {
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
				value={value}
				onChange={onChange}
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
