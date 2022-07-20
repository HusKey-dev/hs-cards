import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";

const ProfileControls = () => {
	return (
		<div>
			<ButtonGroup variant="contained">
				<Button component={Link} to="/signin">
					Вход
				</Button>
				<Button component={Link} to="/signup">
					Регистрация
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default ProfileControls;
