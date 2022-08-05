import { useContext } from "react";
import { ColorContext } from "../../App";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import ProfileControls from "../ProfileControls/ProfileControls";

import "./header.scss";

function Header() {
	const color = useContext(ColorContext);
	return (
		<header className="header" style={{ backgroundColor: color }}>
			<div className="container header__content">
				<Link to="/">
					<Logo />
				</Link>
				<ProfileControls />
			</div>
		</header>
	);
}

export default Header;
