import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

import { hsApi } from "../../app/hsAPI";
import CustomSelect from "../CustomSelect";
import SearchPanel from "../SearchPanel/SearchPanel";
import SearchResults from "../SearchResults";
import SingleCard from "../SingleCard";
import { useSearchParams } from "react-router-dom";

interface Filters {
	playerClass: string;
	rarity: string;
	type: string;
}

function Main() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [input, setInput] = useState(searchParams.get("input") || "");
	const [debouncedInput, setDebouncedInput] = useState("");
	const [filters, setFilters] = useState<Filters>({
		playerClass: searchParams.get("class") || "Все",
		rarity: searchParams.get("rarity") || "Все",
		type: searchParams.get("type") || "Все",
	});

	const { data: info, isSuccess: infoStatus } = hsApi.useFetchInfoQuery("");
	const { data: infoRus, isSuccess: infoStatusRus } =
		hsApi.useFetchInfoQuery("ruRU");
	const { data: cardResults, isSuccess } = hsApi.useSearchCardQuery(
		debouncedInput,
		{
			skip: !(debouncedInput.length > 1),
		}
	);

	const translateFilter = (filter: string): string => {
		if (!info || !infoRus) return "Все";
		for (let property in infoRus) {
			let i = infoRus[property].indexOf(filter);
			if (i > -1) return info[property][i];
		}
		return "Все";
	};

	// useEffect(() => {
	// 	if (searchParams) {
	// 		setFilters({
	// 			playerClass: searchParams.get("class") || "Все",
	// 			rarity: searchParams.get("rarity") || "Все",
	// 			type: searchParams.get("type") || "Все",
	// 		});
	// 		setInput(searchParams.get("input") || "");
	// 	}
	// }, []);

	const paramsInput = searchParams.get("input");
	if (debouncedInput) {
		if (!paramsInput) {
			setInput("");
			setDebouncedInput("");
		} else if (paramsInput !== debouncedInput) {
			setInput(paramsInput);
			setDebouncedInput(paramsInput);
		}
	}
	useEffect(() => {
		console.log("рендер");
		console.log();
	}, []);

	// debouncing search query
	useEffect(() => {
		// will not search if query is too short or empty
		if (input.length > 1) {
			const timeout = setTimeout(() => {
				setSearchParams({
					class: filters.playerClass,
					rarity: filters.rarity,
					type: filters.type,
					input,
				});
				setDebouncedInput(input);
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
		<div className="padding-1">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Laboriosam perspiciatis, saepe pariatur doloremque est molestias
				fuga commodi similique, ea nisi odit distinctio sapiente facilis
				harum autem? Delectus assumenda aspernatur, iste quos placeat
				fugiat nihil laboriosam eaque molestiae temporibus sit error!
			</p>
			<br />
			<CustomSelect
				value={filters.playerClass || "Все"}
				id="class"
				label="Класс"
				requiredOption="Все"
				options={infoStatusRus ? infoRus?.classes : []}
				onChange={handleSelect("playerClass")}
			/>
			<CustomSelect
				value={filters.rarity || "Все"}
				id="rarity"
				label="Редкость"
				requiredOption="Все"
				options={infoStatusRus ? infoRus?.qualities : []}
				onChange={handleSelect("rarity")}
			/>
			<CustomSelect
				value={filters.type || "все"}
				id="type"
				label="Тип карты"
				requiredOption="Все"
				options={infoStatus ? infoRus?.types : []}
				onChange={handleSelect("type")}
			/>

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

			{/* This button is temporary and will be removed */}
			<Button
				onClick={() => {
					console.log(info);
					console.log(infoRus);
					console.log(cardResults);
				}}
			>
				Нажми на меня
			</Button>
			<SearchResults
				filters={{
					playerClass: translateFilter(filters.playerClass),
					rarity: translateFilter(filters.rarity),
					type: translateFilter(filters.type),
				}}
				results={cardResults && cardResults.length ? cardResults : []}
			/>
		</div>
	);
}

export default Main;
