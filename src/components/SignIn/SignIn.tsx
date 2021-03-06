import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./SignIn.scss";

interface State {
	login: string;
	loginIsTouched: boolean;
	loginErr: boolean;
	password: string;
	passwordIsTouched: boolean;
	passwordErr: boolean;
	showPassword: boolean;
}

function SignIn() {
	const [state, setState] = useState<State>({
		login: "",
		loginIsTouched: false,
		loginErr: false,
		password: "",
		passwordIsTouched: false,
		passwordErr: false,
		showPassword: false,
	});

	const handlePasswordIconClick = () => {
		setState({ ...state, showPassword: !state.showPassword });
	};
	const handleInputBlur =
		(prop: "login" | "password") =>
		(e: React.FocusEvent<HTMLInputElement>) => {
			if (!state[`${prop}IsTouched`]) {
				setState({ ...state, [`${prop}IsTouched`]: true });
			}
		};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.target.blur();
		}
	};
	const handleChange =
		(prop: "login" | "password") =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const touchedName: string = prop + "IsTouched";
			setState({
				...state,
				[prop]: e.target.value,
				[touchedName]: false,
			});
		};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log({ login: state.login, password: state.password });
	};

	return (
		<form className="signIn" onSubmit={handleSubmit}>
			<TextField
				margin="dense"
				label="Логин"
				value={state.login}
				error={!(state.login || !state.loginIsTouched)}
				helperText={
					!(state.login || !state.loginIsTouched)
						? "Обязательное поле"
						: ""
				}
				onChange={handleChange("login")}
				onBlur={handleInputBlur("login")}
				onKeyDown={handleKeyDown}
				fullWidth
			/>
			<br />
			<TextField
				margin="dense"
				label="Пароль"
				value={state.password}
				type={state.showPassword ? "text" : "password"}
				error={!(state.password || !state.passwordIsTouched)}
				helperText={
					!(state.password || !state.passwordIsTouched)
						? "Обязательное поле"
						: ""
				}
				onChange={handleChange("password")}
				onKeyDown={handleKeyDown}
				onBlur={handleInputBlur("password")}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={handlePasswordIconClick}>
								{state.showPassword ? (
									<VisibilityOff />
								) : (
									<Visibility />
								)}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<br />
			<br />
			<Button
				disabled={!(state.login && state.password)}
				variant="contained"
				type="submit"
				// onClick={handleSubmit}
			>
				Войти
			</Button>
		</form>
	);
}

export default SignIn;
