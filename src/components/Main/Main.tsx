import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

import { hsApi } from "../../app/hsAPI";
import CustomSelect from "../CustomSelect";
import SearchPanel from "../SearchPanel/SearchPanel";
import SearchResults from "../SearchResults";

function Main() {
	const [input, setInput] = useState("");
	const debouncedInput = useRef("");

	const cardName = "Порождение тьмы"; //temporary hardcoded value
	const { data } = hsApi.useFetchCardQuery(cardName);
	const { data: info, isSuccess: infoStatus } = hsApi.useFetchInfoQuery("");
	const { data: infoRus, isSuccess: infoStatusRus } =
		hsApi.useFetchInfoQuery("ruRU");
	const { data: cardResults, isSuccess } = hsApi.useSearchCardQuery(
		debouncedInput.current,
		{
			skip: !debouncedInput.current,
		}
	);

	// debouncing search query
	useEffect(() => {
		// will not search if query is too short or empty
		if (input.length > 1) {
			const timeout = setTimeout(() => {
				debouncedInput.current = input;
			}, 1000);
			return () => clearTimeout(timeout);
		}
	}, [input]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
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
				value="Все"
				id="class"
				label="Класс"
				requiredOption="Все"
				options={infoStatusRus ? infoRus?.classes : []}
			/>
			<CustomSelect
				value="Все"
				id="qualities"
				label="Редкость"
				requiredOption="Все"
				options={infoStatusRus ? infoRus?.qualities : []}
			/>
			<CustomSelect
				value="Все"
				id="type"
				label="Тип карты"
				requiredOption="Все"
				options={infoStatus ? infoRus?.types : []}
			/>

			<SearchPanel value={input} onChange={handleInputChange} />

			{/* This button is temporary and will be removed */}
			<Button
				onClick={() => {
					console.log(data);
					console.log(info);
					console.log(infoRus);
					console.log(cardResults);
				}}
			>
				Нажми на меня
			</Button>
			<SearchResults
				results={cardResults && cardResults.length ? cardResults : []}
			/>
		</div>
	);
}

export default Main;
