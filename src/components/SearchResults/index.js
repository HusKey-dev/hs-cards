// Prop types will be implemented here

import "./SearchResults.scss";

function SearchResults({ results, filters }) {
	let filteredResults = [...results];
	for (let filter in filters) {
		filteredResults = filteredResults.filter(
			(el) => filters[filter] === "Все" || filters[filter] === el[filter]
		);
	}

	return (
		<div className="searchResults">
			{!results.length ? (
				<p>Нет результатов</p>
			) : (
				filteredResults.map((card) => (
					<div className="result" key={card.cardId}>
						<img
							src={card.img}
							style={{ height: "300px" }}
							alt={card.name}
						/>
						<p>{card.name}</p>
					</div>
				))
			)}
		</div>
	);
}

export default SearchResults;
