const delay = 100;
export interface FavRecord {
	id: string;
	cardName: string;
	img: string;
}

interface LocalData {
	[key: string]: any;
}

export const favouritesAPI = {
	get: (login: string) =>
		new Promise<FavRecord[]>((resolve, reject) => {
			const dataString = localStorage.getItem(login);
			console.log(dataString);
			console.log(JSON.parse(dataString as string));
			setTimeout(() => {
				if (!dataString) reject("Пользователь не существует");
				const localFavourites: FavRecord[] | undefined = JSON.parse(
					dataString as string
				).favourites;
				if (!localFavourites) resolve([]);
				resolve(localFavourites as FavRecord[]);
			}, delay);
		}),
	put: (login: string, record: FavRecord) => {
		return new Promise<FavRecord>((resolve, reject) => {
			const dataString = localStorage.getItem(login);
			setTimeout(() => {
				if (!dataString) reject("Пользователь не существует");
				const localData: LocalData = JSON.parse(dataString as string); //if dataString is null, we already rejected
				const localFavourites: undefined | Array<FavRecord> =
					localData.favourites;
				if (localFavourites === undefined) {
					localStorage.setItem(
						login,
						JSON.stringify({ ...localData, favourites: [record] })
					);
				} else if (localFavourites.some((el) => el.id === record.id)) {
					reject("Запись уже существует");
				} else {
					localStorage.setItem(
						login,
						JSON.stringify({
							...localData,
							favourites: [record, ...localFavourites],
						})
					);
				}
				resolve(record);
			}, delay);
		});
	},
	delete: (login: string, record: string) =>
		new Promise<number>((resolve, reject) => {
			const dataString = localStorage.getItem(login);
			setTimeout(() => {
				if (!dataString) reject("Пользователь не существует");
				const {
					favourites: localFavourites,
					...rest
				}: { favourites: FavRecord[]; rest: object } = JSON.parse(
					dataString as string
				);

				if (!localFavourites) reject("Ошибка базы данных");
				const badIndex = localFavourites?.findIndex(
					(el) => el.id === record
				) as number;
				if (badIndex === -1) reject("Запись не найдена");
				localFavourites?.splice(badIndex, 1);
				localStorage.setItem(
					login,
					JSON.stringify({ ...rest, favourites: localFavourites })
				);
				resolve(badIndex);
			}, delay);
		}),
};
