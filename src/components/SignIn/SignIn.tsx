import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { logIn, logOut } from "../../app/loginSlice";
import { RootState } from "../../app/store";

import "./SignIn.scss";

interface State {
	login: string;
	loginIsTouched: boolean;
	loginFocus: boolean;
	password: string;
	passwordIsTouched: boolean;
	passwordFocus: boolean;
	showPassword: boolean;
}

function SignIn(props: PropsFromRedux) {
	const [state, setState] = useState<State>({
		login: "",
		loginIsTouched: false,
		loginFocus: false,
		password: "",
		passwordIsTouched: false,
		passwordFocus: false,
		showPassword: false,
	});

	useEffect(() => {
		props.logOut();
	}, []);

	const getErrMessage = (prop: "login" | "password"): string => {
		if (state[`${prop}Focus`]) {
			// when we focus input, it will not show errors
			return "";
		} else if (!state[prop] && state[`${prop}IsTouched`]) {
			// when we are leaving input with empty value
			return "Обязательное поле";
		} else if (
			prop === "login" &&
			!state[`${prop}IsTouched`] &&
			props.err[`${prop}Err`]
		) {
			// only showing error before we touch it to change
			return `Неверное имя пользователя`;
		} else if (
			prop === "password" &&
			!state[`${prop}IsTouched`] &&
			props.err[`${prop}Err`]
		) {
			return "Неверный пароль";
		} else {
			return "";
		}
	};

	const handlePasswordIconClick = () => {
		setState({ ...state, showPassword: !state.showPassword });
	};
	const handleInputFocus =
		(prop: "login" | "password") =>
		(e: React.FocusEvent<HTMLInputElement>) => {
			setState({ ...state, [`${prop}Focus`]: true });
		};
	const handleInputBlur =
		(prop: "login" | "password") =>
		(e: React.FocusEvent<HTMLInputElement>) => {
			setState({ ...state, [`${prop}Focus`]: false });
			if (!state[`${prop}IsTouched`]) {
				setState({
					...state,
					[`${prop}IsTouched`]: true,
					[`${prop}Focus`]: false,
				});
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
		// changing state to make fields ready to show erorrs from api
		setState({ ...state, passwordIsTouched: false, loginIsTouched: false });
		props.logIn({ login: state.login, password: state.password });
		console.log({ login: state.login, password: state.password });
	};

	return (
		<form className="signIn" onSubmit={handleSubmit}>
			<TextField
				margin="dense"
				label="Логин"
				value={state.login}
				error={!!getErrMessage("login")}
				helperText={getErrMessage("login")}
				onChange={handleChange("login")}
				onBlur={handleInputBlur("login")}
				onFocus={handleInputFocus("login")}
				onKeyDown={handleKeyDown}
				fullWidth
			/>
			<br />
			<TextField
				margin="dense"
				label="Пароль"
				value={state.password}
				type={state.showPassword ? "text" : "password"}
				error={!!getErrMessage("password")}
				helperText={getErrMessage("password")}
				onChange={handleChange("password")}
				onKeyDown={handleKeyDown}
				onFocus={handleInputFocus("password")}
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
				disabled={
					(!state.login && !state.password) ||
					!!(getErrMessage("login") || getErrMessage("password"))
				}
				variant="contained"
				type="submit"
			>
				Войти
			</Button>
		</form>
	);
}

const mapStateToProps = (state: RootState) => {
	return state.login;
};

const connector = connect(mapStateToProps, { logIn, logOut });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignIn);
