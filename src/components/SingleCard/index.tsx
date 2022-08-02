import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { hsApi } from "../../app/hsAPI";

import "./SingleCard.scss";

function SingleCard() {
	const { isLoggedIn, userName } = useAppSelector((state) => state.login);
	const { cardId } = useParams();
	const { data, isSuccess } = hsApi.useFetchCardQuery(cardId || "", {
		skip: !cardId,
	});
	const card = data && data[0];

	if (isSuccess && card)
		return (
			<div className="singleCard">
				<img src={card.img} alt={card.name} />
				<div className="description">
					<h2>{card.name}</h2>
					<br />
					{card.flavor ? (
						<h3>
							<em>{card.flavor}</em>
						</h3>
					) : null}
					<br />
					<p>Тип: {card.type}</p>
					<p>Редкость: {card.rarity}</p>
					<p>Сет: {card.cardSet}</p>
					{card.faction ? <p>Фракция: {card.faction}</p> : null}

					<div className="button-container">
						{isLoggedIn ? (
							<Button variant="contained">
								Добавить в избранное
							</Button>
						) : null}
					</div>
				</div>
			</div>
		);

	return <div>cardId</div>;
}

export default SingleCard;
