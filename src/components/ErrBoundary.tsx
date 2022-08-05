import { PropsFor } from "@mui/system";
import React, { Component, ReactNode } from "react";
import { runInThisContext } from "vm";

interface Props {
	children?: ReactNode;
}
interface State {
	hasError: boolean;
}

class ErrBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyItems: "center",
						color: "blue",
					}}
				>
					<h2>Упс... Что-то сломалось</h2>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrBoundary;
