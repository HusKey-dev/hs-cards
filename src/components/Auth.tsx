import { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";
import { forceLogIn, logOut } from "../app/loginSlice";
import { getFavourites } from "../app/favouritesSlice";
import { getHistory } from "../app/historySlice";

class Auth extends Component<PropsFromRedux> {
	// constructor(props: PropsFromRedux) {
	// 	super(props);
	// }

	componentDidMount() {
		const login = sessionStorage.getItem("login");
		if (login) {
			console.log("getting login from session storage");
			console.log("forcing log in");
			console.log(this.props);
			this.props.forceLogIn(login);
		}
	}

	componentDidUpdate(prevProps: PropsFromRedux) {
		console.log("render");
		if (this.props.userName !== prevProps.userName) {
			if (this.props.isLoggedIn) {
				console.log("auth", this.props.isLoggedIn);
				sessionStorage.setItem("login", this.props.userName);
				this.props.getFavourites();
				this.props.getHistory();
			} else {
				console.log("session storage cleared");
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
