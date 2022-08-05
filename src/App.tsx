import axios from "axios";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import "./app.scss";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Favourites from "./components/Favourites/Favourites";
import History from "./components/History/History";
import Guard from "./components/Guard";
import SingleCard from "./components/SingleCard/SingleCard";
import Auth from "./components/Auth";
import ErrBoundary from "./components/ErrBoundary";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#9c27b0",
		},
	},
});

function App() {
	return (
		<div className="App">
			<Router>
				<ThemeProvider theme={theme}>
					<Header />
					<div className="content">
						<div className="container">
							<Routes>
								<Route path="/" element={<Main />} />
								<Route path="/search" element={<Main />} />
								<Route
									path="/card/:cardId"
									element={
										<ErrBoundary>
											<SingleCard />
										</ErrBoundary>
									}
								/>
								<Route path="/signin" element={<SignIn />} />
								<Route path="/signup" element={<SignUp />} />
								<Route
									path="/favourites"
									element={
										<Guard>
											<Favourites />
										</Guard>
									}
								/>
								<Route
									path="/history"
									element={
										<Guard>
											<History />
										</Guard>
									}
								/>
								{/* <Route
									path="*"
									element={<Navigate replace to="/" />}
								/> */}
							</Routes>
						</div>
					</div>
					<Auth />
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
