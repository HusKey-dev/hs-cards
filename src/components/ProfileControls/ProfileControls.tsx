import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { Avatar, Button, ButtonGroup } from "@mui/material";

import { logOut } from "../../app/loginSlice";
import { RootState } from "../../app/store";

import "./profileControls.scss";

const ProfileControls = (props: PropsFromRedux) => {
	return (
		<div className="profileControls">
			{!props.isLoggedIn ? (
				<ButtonGroup variant="contained">
					<Button component={Link} to="/signin">
						Вход
					</Button>
					<Button component={Link} to="/signup">
						Регистрация
					</Button>
				</ButtonGroup>
			) : (
				<>
					<Avatar>{props.userName.slice(0, 2)}</Avatar>
					<div>{props.userName}</div>
					<ButtonGroup variant="contained">
						<Button component={Link} to="/favourites">
							Избранное
						</Button>
						<Button component={Link} to="/history">
							История
						</Button>
						<Button onClick={() => props.logOut()}>Выход</Button>
					</ButtonGroup>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		isLoggedIn: state.login.isLoggedIn,
		userName: state.login.userName,
	};
};

// export type ComponentProps = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps, { logOut });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileControls);
