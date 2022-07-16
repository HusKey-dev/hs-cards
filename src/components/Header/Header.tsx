import React from "react";
import Logo from "../Logo/Logo";
import ProfileControls from "../ProfileControls/ProfileControls";

import "./header.scss";

function Header() {
	return (
		<header className="header">
			<div className="container header__content">
				<Logo />
				<ProfileControls />
			</div>
		</header>
	);
}

export default Header;
