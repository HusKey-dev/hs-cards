import { Link } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { clearHistory } from "../../app/historySlice";

import "./History.scss";

function History() {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.history);

	return (
		<div className="history">
			{data.length ? (
				<>
					<Button
						color="secondary"
						variant="contained"
						sx={{ marginBottom: "1.5rem" }}
						endIcon={<DeleteIcon />}
						onClick={() => dispatch(clearHistory())}
					>
						Очистить историю{" "}
					</Button>
					{data
						.map((el, index) => (
							// it is safe to use index as key since we can either clear all or push to the end
							<div key={index} className="history__result">
								<p>Дата: {el.date}</p>
								<p>Запрос: {el.input}</p>
								<Button
									component={Link}
									to={`../search?${el.queryString}`}
									variant="contained"
									endIcon={<ArrowForwardRoundedIcon />}
								>
									Перейти
								</Button>
							</div>
						))
						.reverse()}
				</>
			) : (
				<h3
					style={{
						alignSelf: "center",
						justifySelf: "center",
						textAlign: "center",
					}}
				>
					Список пуст
				</h3>
			)}
		</div>
	);
}

export default History;
