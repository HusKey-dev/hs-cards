import { Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { hsApi } from "../../app/hsAPI";
import { putFavourite } from "../../app/favouritesSlice";

import "./SingleCard.scss";

function SingleCard() {
	const dispatch = useAppDispatch();
	const { isLoggedIn, userName } = useAppSelector((state) => state.login);
	const { data: favourites, error } = useAppSelector(
		(state) => state.favourites
	);

	const { cardId } = useParams();
	const { data: card, isSuccess } = hsApi.useFetchCardQuery(cardId || "", {
		skip: !cardId,
	});

	const showButton =
		isLoggedIn && cardId && !favourites.some((el) => el.id === cardId);

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
					<p>
						<span className="property-name"> Тип:</span> {card.type}
					</p>
					<p>
						<span className="property-name">Редкость: </span>
						{card.rarity}
					</p>
					<p>
						<span className="property-name">Сет: </span>
						{card.cardSet}
					</p>
					<p>
						<span className="property-name">Класс: </span>
						{card.playerClass}
					</p>
					{card.faction ? <p>Фракция: {card.faction}</p> : null}

					<div className="button-container">
						{showButton ? (
							<Button
								variant="contained"
								onClick={() =>
									dispatch(
										putFavourite({
											id: cardId,
											cardName: card.name,
											img: card.img,
										})
									)
								}
							>
								Добавить в избранное
							</Button>
						) : null}
					</div>
				</div>
			</div>
		);

	return (
		<div className="singleCard">
			<h3 style={{ margin: "auto" }}>Загрузка...</h3>
		</div>
	);
}

export default SingleCard;
