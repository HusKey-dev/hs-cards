import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

//Custom hook, which can be used to guard protected pages
// The application already has a Route-level Guard so this hook is not implemented

export const useGuard = (path = "/"): void => {
	const navigate = useNavigate();
	const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

	if (!isLoggedIn) {
		navigate(path, { replace: true });
	}
};
