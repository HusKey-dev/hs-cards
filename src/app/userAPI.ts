export interface User {
	login: string;
	password: string;
}

export const delay: number = 300;

export const userApi = {
	get(user: User) {
		return new Promise((resolve, reject) => {
			const localStorageData: string | null = localStorage.getItem(
				user.login
			);
			const localStoragePassword: string =
				localStorageData && JSON.parse(localStorageData).password;
			setTimeout(() => {
				if (!localStoragePassword) {
					reject("Неверный логин");
				} else if (localStoragePassword !== user.password) {
					reject("Неверный пароль");
				} else if (localStoragePassword) {
					resolve(user.login);
				} else reject("Нет ответа от сервера");
			}, delay);
		});
	},

	post(user: User) {
		return new Promise((resolve, reject) => {
			const isLoginTaken: boolean = !!localStorage.getItem(user.login);
			setTimeout(() => {
				if (isLoginTaken) {
					reject("Такой пользователь уже существует");
				} else if (!isLoginTaken) {
					localStorage.setItem(
						user.login,
						JSON.stringify({ password: user.password })
					);
					resolve(user.login);
				} else reject("Нет ответа от сервера");
			}, delay);
		});
	},
};
