import type { State, ComponentProps, Prop } from "./SignUp";

interface CreateErrMessage {
	(prop: Prop, state: State, props: ComponentProps): string;
}

export const createErrMessage: CreateErrMessage = (prop, state, props) => {
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
		console.log(state, props);
		// only showing error before we touch it to change
		return `Такой пользователь уже существет`;
	} else if (
		prop === "password1" &&
		!state.password2IsTouched &&
		state.password1 !== state.password2
	) {
		return "";
	} else if (prop === "password1" && state.password2 === "") {
		return "";
	} else if (
		prop === "password2" &&
		state[`${prop}IsTouched`] &&
		state.password1 !== state.password2
	) {
		return "Пароли должны совпадать";
	} else {
		return "";
	}
};
