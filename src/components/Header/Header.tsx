import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import ProfileControls from "../ProfileControls/ProfileControls";

import "./header.scss";

function Header() {
	return (
		<header className="header">
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
