import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { hsApi } from "../../app/hsAPI";
import CustomSelect from "../CustomSelect/CustomSelect";
import SearchPanel from "../SearchPanel/SearchPanel";
import SearchResults from "../SearchResults/SearchResults";
import { postHistory } from "../../app/historySlice";

import "./Main.scss";

interface Filters {
	playerClass: string;
	rarity: string;
	type: string;
}

function Main() {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [input, setInput] = useState(searchParams.get("input") || "");
	const [debouncedInput, setDebouncedInput] = useState("");
	const paramsInput = searchParams.get("input");
	const paramsClass = searchParams.get("class");
	const paramsRarity = searchParams.get("rarity");
	const paramsType = searchParams.get("type");

	const [filters, setFilters] = useState<Filters>({
		playerClass: paramsClass || "Все",
		rarity: paramsRarity || "Все",
		type: paramsType || "Все",
	});

	const { data: info, isSuccess: infoStatus } = hsApi.useFetchInfoQuery("");
	const { data: infoRus, isSuccess: infoStatusRus } =
		hsApi.useFetchInfoQuery("ruRU");
	const {
		data: cardResults,
		error,
		isSuccess,
	} = hsApi.useSearchCardQuery(debouncedInput, {
		skip: !(debouncedInput.length > 1),
	});

	const initialized = !!(cardResults || error);

	const translateFilter = (filter: string): string => {
		if (!info || !infoRus) return "Все";
		for (let property in infoRus) {
			let i = infoRus[property].indexOf(filter);
			if (i > -1) return info[property][i];
		}
		return "Все";
	};

	const date: string = new Date()
		.toLocaleString("ru", {
			day: "numeric",
			month: "2-digit",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
		})
		.replaceAll(".", "/");

	useEffect(() => {
		if (searchParams && infoStatus && infoStatusRus) {
			setFilters({
				playerClass: paramsClass || "Все",
				rarity: paramsRarity || "Все",
				type: paramsType || "Все",
			});
			setInput(searchParams.get("input") || "");
		}
	}, [paramsClass, paramsRarity, paramsType, infoStatus, infoStatusRus]);

	// If we navigate back through history, component will update its state
	if (debouncedInput) {
		if (paramsInput !== debouncedInput) {
			setInput(paramsInput || "");
			setDebouncedInput(paramsInput || "");
			setFilters({
				playerClass: paramsClass || "Все",
				rarity: paramsRarity || "Все",
				type: paramsType || "Все",
			});
		}
	}

	useEffect(() => {
		console.log("рендер");
		console.log(searchParams);
	}, []);

	// debouncing search query
	useEffect(() => {
		// will not search if query is too short or empty
		if (input.length > 1) {
			const timeout = setTimeout(() => {
				const params = {
					class: filters.playerClass,
					rarity: filters.rarity,
					type: filters.type,
					input,
				};
				setSearchParams(params);
				setDebouncedInput(input);
				dispatch(
					postHistory({
						input,
						queryString: new URLSearchParams(params).toString(),
						date,
					})
				);
			}, 1000);
			return () => clearTimeout(timeout);
		}
	}, [input]);

	const handleInputChange = (e: React.SyntheticEvent, newValue: string) => {
		setInput(newValue);
	};

	const handleSelect =
		(prop: "playerClass" | "rarity" | "type") => (e: any) => {
			setFilters({ ...filters, [prop]: e.target.value });
		};

	return (
		<div className="padding-1 main">
			<p className="hero">
				Введите название карты, например "Король-лич"
			</p>
			<div className="main__filters">
				<CustomSelect
					value={filters.playerClass || "Все"}
					id="class"
					label="Класс"
					requiredOption="Все"
					options={
						infoStatusRus ? infoRus?.classes : [filters.playerClass]
					}
					onChange={handleSelect("playerClass")}
				/>
				<CustomSelect
					value={filters.rarity || "Все"}
					id="rarity"
					label="Редкость"
					requiredOption="Все"
					options={
						infoStatusRus ? infoRus?.qualities : [filters.rarity]
					}
					onChange={handleSelect("rarity")}
				/>
				<CustomSelect
					value={filters.type || "все"}
					id="type"
					label="Тип карты"
					requiredOption="Все"
					options={infoStatus ? infoRus?.types : [filters.type]}
					onChange={handleSelect("type")}
				/>
			</div>
			<SearchPanel
				value={input}
				onChange={handleInputChange}
				suggests={
					cardResults &&
					cardResults
						.map((card) => card.name)
						.filter((el, i, arr) => i === arr.lastIndexOf(el))
						.slice(-5)
				}
			/>

			{initialized && (
				<SearchResults
					filters={{
						playerClass: translateFilter(filters.playerClass),
						rarity: translateFilter(filters.rarity),
						type: translateFilter(filters.type),
					}}
					results={error ? [] : cardResults}
				/>
			)}
		</div>
	);
}

export default Main;
