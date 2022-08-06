import { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../app/store";
import { forceLogIn, logOut } from "../app/loginSlice";
import { getFavourites } from "../app/favouritesSlice";
import { getHistory } from "../app/historySlice";

// This component re-initialisates the store in case of user reloads page

class Auth extends Component<PropsFromRedux> {
	componentDidMount() {
		const login = sessionStorage.getItem("login");
		if (login) {
			this.props.forceLogIn(login);
		}
	}

	componentDidUpdate(prevProps: PropsFromRedux) {
		if (this.props.userName !== prevProps.userName) {
			if (this.props.isLoggedIn) {
				sessionStorage.setItem("login", this.props.userName);
				this.props.getFavourites();
				this.props.getHistory();
			} else {
				sessionStorage.clear();
			}
		}
	}

	render() {
		return <div style={{ display: "none" }}>Auth</div>;
	}
}
const mapStateToProps = (state: RootState) => {
	return state.login;
};
export type ComponentProps = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps, {
	forceLogIn,
	logOut,
	getFavourites,
	getHistory,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Auth);
