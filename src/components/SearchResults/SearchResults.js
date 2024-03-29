import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./SearchResults.scss";

SearchResults.propTypes = {
	results: PropTypes.arrayOf(PropTypes.object),
	filters: PropTypes.objectOf(PropTypes.string),
};

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
					<Link
						to={`./card/${card.cardId}`}
						className="result"
						key={card.cardId}
					>
						<img
							src={card.img}
							style={{ height: "300px" }}
							alt={card.name}
						/>
						<p className="card__name">{card.name}</p>
					</Link>
				))
			)}
		</div>
	);
}

export default SearchResults;
