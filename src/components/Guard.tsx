import { useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

function Guard({
	path = "/",
	children,
}: {
	path?: string;
	children: React.ReactNode;
}) {
	const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to={path} state={{ from: location }} replace />;
	}

	return <>{children}</>;
}

export default Guard;
