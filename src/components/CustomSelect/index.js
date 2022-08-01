import { Select, InputLabel, MenuItem, FormControl } from "@mui/material";

// propTypes will be implemented here

function CustomSelect({
	value,
	label,
	id,
	requiredOption,
	onChange,
	options = [],
}) {
	if (requiredOption) options = [requiredOption, ...options];

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				labelId={id}
				displayEmpty
				label={label}
				value={value}
				onChange={onChange}
			>
				{/* Will not show active value in dropdown options */}
				{options && options.length > 0
					? options.map((el) =>
							el !== value ? (
								<MenuItem key={el} value={el}>
									{el}
								</MenuItem>
							) : (
								<MenuItem
									sx={{ display: "none" }}
									key={el}
									value={el}
								>
									{el}
								</MenuItem>
							)
					  )
					: null}
			</Select>
		</FormControl>
	);
}

export default CustomSelect;
