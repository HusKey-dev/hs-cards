import { Button, ButtonGroup } from "@mui/material";
import React from "react";

const ProfileControls = () => {
	return (
		<div>
			<ButtonGroup variant="contained">
				<Button>Вход</Button>
				<Button>Регистрация</Button>
			</ButtonGroup>
		</div>
	);
};

export default ProfileControls;
