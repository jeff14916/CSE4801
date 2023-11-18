import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./NavBar.css";

const NavBar: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		checkUserAuthentication();
	}, []);

	const checkUserAuthentication = async () => {
		try {
			await Auth.currentAuthenticatedUser();
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	const handleAuthAction = async () => {
		if (isAuthenticated) {
			try {
				await Auth.signOut();
				setIsAuthenticated(false);
			} catch (error) {
				console.error("Error signing out: ", error);
			}
		} else {
			// Redirect to login page
			// Assuming you're using react-router-dom for navigation
			window.location.href = "/login";
		}
	};

	return (
		<div className="navbar">
			<Link to="/" className="nav-title">
				TITLE OF THE PAGE
			</Link>
			<div className="nav-links">{/* Navigation Links */}</div>
			<button onClick={handleAuthAction} className="nav-item">
				{isAuthenticated ? "Logout" : "Login"}
			</button>
		</div>
	);
};

export default NavBar;
