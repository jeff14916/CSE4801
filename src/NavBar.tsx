import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./NavBar.css";

const NavBar: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		checkUserAuthentication();
	}, []);

	const checkUserAuthentication = async () => {
		try {
			const user = await Auth.currentAuthenticatedUser();
			setUsername(user.username);
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	const handleAuthAction = async () => {
		if (isAuthenticated) {
			try {
				await Auth.signOut();
				setUsername(null);
				setIsAuthenticated(false);
			} catch (error) {
				console.error("Error signing out: ", error);
			}
		} else {
			window.location.href = "/login";
		}
	};

	return (
		<div className="navbar">
			<Link to="/" className="nav-title">
				TITLE OF THE PAGE
			</Link>
			<div className="nav-links">
				<Link to="/camerainfo" className="nav-item">
					Camera Info
				</Link>
				<Link to="/camerarecommend" className="nav-item">
					Camera Recommendation
				</Link>
				<Link to="/photoguide" className="nav-item">
					Photo Guide
				</Link>
				<Link to="/photogallery" className="nav-item">
					Photo Gallery
				</Link>
			</div>
			{isAuthenticated && <h2>Hello, {username}!</h2>}
			<button onClick={handleAuthAction} className="nav-item">
				{isAuthenticated ? "Logout" : "Login"}
			</button>
		</div>
	);
};

export default NavBar;
