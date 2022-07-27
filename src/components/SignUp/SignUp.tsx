import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { createUser, logIn, logOut } from "../../app/loginSlice";
import { RootState } from "../../app/store";
import { createErrMessage } from "./createErrMessage";

import "./SignUp.scss";

export interface State {
	login: string;
	loginIsTouched: boolean;
	loginFocus: boolean;
	password1: string;
	password1IsTouched: boolean;
	password1Focus: boolean;
	password2: string;
	password2IsTouched: boolean;
	password2Focus: boolean;
	showPassword: boolean;
}

export type Prop = "login" | "password1" | "password2";

function SignUp(props: PropsFromRedux) {
	const [state, setState] = useState<State>({
		login: "",
		loginIsTouched: false,
		loginFocus: false,
		password1: "",
		password1IsTouched: false,
		password1Focus: false,
		password2: "",
		password2IsTouched: false,
		password2Focus: false,
		showPassword: false,
	});

	useEffect(() => {
		console.log("first render");
		props.logOut();
	}, []);

	const getErrMessage = (prop: Prop): string =>
		createErrMessage(prop, state, props);

	const handlePasswordIconClick = () => {
		setState({ ...state, showPassword: !state.showPassword });
	};
	const handleInputFocus =
		(prop: Prop) => (e: React.FocusEvent<HTMLInputElement>) => {
			setState({ ...state, [`${prop}Focus`]: true });
		};
	const handleInputBlur =
		(prop: Prop) => (e: React.FocusEvent<HTMLInputElement>) => {
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
		(prop: Prop) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
		setState({
			...state,
			password1IsTouched: false,
			loginIsTouched: false,
		});
		props.createUser({ login: state.login, password: state.password1 });
		console.log({ login: state.login, password: state.password1 });
	};

	return (
		<form className="signUp" onSubmit={handleSubmit}>
			<TextField
				margin="dense"
				label="Имя пользователя"
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
				value={state.password1}
				type={state.showPassword ? "text" : "password"}
				error={!!getErrMessage("password1")}
				helperText={getErrMessage("password1")}
				onChange={handleChange("password1")}
				onKeyDown={handleKeyDown}
				onFocus={handleInputFocus("password1")}
				onBlur={handleInputBlur("password1")}
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
			<TextField
				margin="dense"
				label="Повторите пароль"
				value={state.password2}
				type={state.showPassword ? "text" : "password"}
				error={!!getErrMessage("password2")}
				helperText={getErrMessage("password2")}
				onChange={handleChange("password2")}
				onKeyDown={handleKeyDown}
				onFocus={handleInputFocus("password2")}
				onBlur={handleInputBlur("password2")}
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
					!!props.userName ||
					state.password1 !== state.password2 ||
					!(state.login && state.password1 && state.password2) ||
					!!(
						getErrMessage("login") ||
						getErrMessage("password1") ||
						getErrMessage("password2")
					)
				}
				variant="contained"
				type="submit"
			>
				Создать пользователя
			</Button>
			{!props.userName ? null : (
				<div className="background-alpha">
					<p>Пользователь успешно зарегистрирован</p>
					<div>
						<Button
							color="secondary"
							variant="contained"
							size="large"
							onClick={() =>
								props.logIn({
									login: props.userName,
									password: state.password1,
								})
							}
						>
							Войти
						</Button>
					</div>
				</div>
			)}
		</form>
	);
}

const mapStateToProps = (state: RootState) => {
	return state.login;
};

export type ComponentProps = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps, { createUser, logIn, logOut });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignUp);
