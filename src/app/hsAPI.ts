import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface SingleCardResponse {
	cardId: string;
	name: string;
	img: string;
	[propName: string]: any;
}

const API_KEY = {
	header: "X-RapidAPI-Key",
	key: "f5a34a1d05msh6cefd8e196dee44p1bb0b5jsnae588fd2281a",
};

const API_HOST = {
	header: "X-RapidAPI-Host",
	key: "omgvamp-hearthstone-v1.p.rapidapi.com",
};

export const hsApi = createApi({
	reducerPath: "hsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://omgvamp-hearthstone-v1.p.rapidapi.com",
		prepareHeaders: (headers) => {
			headers.set(API_KEY.header, API_KEY.key);
			headers.set(API_HOST.header, API_HOST.key);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		fetchCard: builder.query<[SingleCardResponse], string>({
			query: (cardName) => ({
				url: `/cards/${cardName}`,
				method: "GET",
				params: {
					collectible: 1,
					locale: "ruRU",
				},
			}),
		}),
		fetchInfo: builder.query({
			query: (lang: string) => ({
				url: `/info`,
				method: "GET",
				params: {
					locale: lang || "enUS",
				},
			}),
		}),
		searchCard: builder.query({
			query: (name: string) => ({
				url: `/cards/search/${name}`,
				method: "GET",
				params: {
					locale: "ruRU",
				},
			}),
			transformResponse: (response: Array<SingleCardResponse>) => {
				return response
					.filter((el) => el.img && el.playerClass && el.rarity)
					.map((el) => {
						return {
							cardId: el.cardId,
							name: el.name,
							img: el.img,
							playerClass: el.playerClass,
							rarity: el.rarity,
							type: el.type,
							cost: el.cost,
						};
					});
			},
		}),
	}),
});
