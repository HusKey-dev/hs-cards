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
import SingleCard from "./components/SingleCard";
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
	// This part is temporary exaple of api usage and will be moved to redux
	const BASE_URL: string = "https://omgvamp-hearthstone-v1.p.rapidapi.com";
	const options = {
		headers: {
			"X-RapidAPI-Key":
				"f5a34a1d05msh6cefd8e196dee44p1bb0b5jsnae588fd2281a",
			"X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
			locale: "ruRU",
		},
		params: {
			name: "корольfjfhg ан",
			collectible: "1",
			locale: "ruRU",
		},
	};
	const handleClick = async () => {
		let res = await axios.get(
			`${BASE_URL}/cards/search/${options.params.name}`,
			options
		);
		console.log(res);
		// res = await axios.get(`${BASE_URL}/info`, options);
		// console.log(res);
	};

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
