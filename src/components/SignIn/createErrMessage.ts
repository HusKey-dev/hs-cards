import type { State, ComponentProps } from "./SignIn";

interface CreateErrMessage {
	(prop: "login" | "password", state: State, props: ComponentProps): string;
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
