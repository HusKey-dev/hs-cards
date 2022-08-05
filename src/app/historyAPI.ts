const delay = 100;

const maxLength = 30;

export interface HistRecord {
	input: string;
	queryString: string;
	date: string;
}

export const historyAPI = {
	get: (login: string) =>
		new Promise<HistRecord[]>((resolve, reject) => {
			const dataString = localStorage.getItem(login);
			setTimeout(() => {
				if (!dataString) reject("Пользователь не существует");
				const {
					history: localHistory,
					...rest
				}: { history: HistRecord[]; rest: object } = JSON.parse(
					dataString as string
				);
				if (!localHistory) {
					localStorage.setItem(
						login,
						JSON.stringify({ ...rest, history: [] })
					);
					resolve([]);
				} else {
					resolve(localHistory);
				}
			}, delay);
		}),
	post: (login: string, record: HistRecord) =>
		new Promise<HistRecord>((resolve, reject) => {
			const dataString = localStorage.getItem(login);
			setTimeout(() => {
				if (!dataString) reject("Пользователь не существует");
				const {
					history: localHistory,
					...rest
				}: { history: HistRecord[]; rest: object } = JSON.parse(
					dataString as string
				);
				if (!localHistory) {
					localStorage.setItem(
						login,
						JSON.stringify({ ...rest, history: [record] })
					);
					resolve(record);
				} else {
					localStorage.setItem(
						login,
						JSON.stringify({
							...rest,
							history: [...localHistory, record],
						})
					);
					resolve(record);
				}
			}, delay);
		}),
	delete: (login: string) =>
		new Promise<boolean>((resolve, reject) => {
			const dataString = localStorage.getItem(login);
			setTimeout(() => {
				if (!dataString) reject("Пользователь не существует");
				const {
					history,
					...rest
				}: { history: HistRecord[]; rest: object } = JSON.parse(
					dataString as string
				);

				localStorage.setItem(
					login,
					JSON.stringify({ ...rest, history: [] })
				);
				resolve(true);
			}, delay);
		}),
};
