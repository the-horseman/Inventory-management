import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import Category from "./pages/Category";
import User from "./pages/User";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

	// state for user details
	const [userDetails, setUserDetails] = useState({
		isLoggedIn: false,
		username: null,
		id: null,
		email: null,
		phoneNo: null
	})

	const navigate = useNavigate();

	// useEffect for checking if user is logged in
	useEffect(() => {
		axios.get("http://localhost:3001/users/check", {
			headers: {
				accesstoken: localStorage.getItem("accessToken"),
			}
		}).then((response) => {
			if (response.data.error) {
				setUserDetails({
					isLoggedIn: false,
					username: null,
					id: null,
					email: null,
					phoneNo: null
				});
				navigate("/login");
			} else {
				console.log(response);
				setUserDetails({
					isLoggedIn: true,
					username: response.data.username,
					id: response.data.id,
					email: response.data.email,
					phoneNo: response.data.phoneNo
				});
			}
		});
	}, []);

	// Function to show User Details
	function showLogout() {
		console.log("hi");
		return (
			<>
				<button onClick={() => {
					localStorage.removeItem("accessToken");
					setUserDetails({
						isLoggedIn: false,
						username: null,
						id: null,
						email: null,
						phoneNo: null
					});
					navigate("/login");	
				}}>Logout</button><br />
				<Link to="/user">User Details</Link>
			</>
		)
	};

	return (
		<div className="App">
			{userDetails.isLoggedIn ? showLogout() : null}
			<Routes>
				<Route path="/user" element={<User userDetails={userDetails} />} />
				<Route path="/login" element={<Login setUserDetails={setUserDetails} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/category" element={<Category userDetails={userDetails} />} />
				<Route path="/" element={<Inventory userDetails={userDetails} />} />
			</Routes>
		</div>
	);
}

export default App;
