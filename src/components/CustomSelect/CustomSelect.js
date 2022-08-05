import PropTypes from "prop-types";
import { Select, InputLabel, MenuItem, FormControl } from "@mui/material";

// propTypes are implemented here

CustomSelect.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
	id: PropTypes.string,
	requiredOption: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
};

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
