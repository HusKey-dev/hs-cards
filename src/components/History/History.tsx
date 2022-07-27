import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

function History() {
	const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) navigate("/signin");
	}, [isLoggedIn]);

	return <div>History</div>;
}

export default History;
