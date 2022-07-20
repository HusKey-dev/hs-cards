import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import "./app.scss";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

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
		params: { collectible: "1", locale: "ruRU" },
	};
	const handleClick = async () => {
		let res = await axios.get(`${BASE_URL}/cards/EX1_572`, options);
		console.log(res);
	};

	return (
		<div className="App">
			<Router>
				<ThemeProvider theme={theme}>
					<Header />
					<div className="content">
						<div className="container">
							<Routes>
								<Route path="" element={<Main />} />
								<Route path="/signin" element={<SignIn />} />
								<Route path="/signup" element={<SignUp />} />
							</Routes>
							<button onClick={handleClick}>Click me</button>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
