// Prop types will be implemented here

import "./SearchResults.scss";

function SearchResults({ results }) {
	return (
		<div className="searchResults">
			{!results.length ? (
				<p>Нет результатов</p>
			) : (
				results.map((card) => (
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
