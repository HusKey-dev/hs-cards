import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteFavourite } from "../../app/favouritesSlice";

import "./Favourites.scss";

function Favourites() {
	const dispatch = useAppDispatch();
	const { data, error } = useAppSelector((state) => state.favourites);

	return (
		<div className="favourites">
			{data.length ? (
				<>
					{data.map((el) => (
						<div key={el.id} className="favourites__result">
							<Link to={`../card/${el.id}`} key={el.id}>
								<img src={el.img} alt={el.cardName} />
								<p>{el.cardName}</p>
							</Link>
							<IconButton
								sx={{ alignSelf: "center" }}
								color="primary"
								aria-label="delete"
								size="large"
								onClick={() => dispatch(deleteFavourite(el.id))}
							>
								<DeleteIcon fontSize="inherit" />
							</IconButton>
						</div>
					))}
				</>
			) : (
				<h3 className="no-result">Список пуст</h3>
			)}
		</div>
	);
}

export default Favourites;
