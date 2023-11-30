import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import "./NavBar.css";

const NavBar: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		checkUserAuthentication();
		const removeAuthListener = Hub.listen(
			"auth",
			({ payload: { event } }) => {
				if (event === "signIn") {
					checkUserAuthentication();
				} else if (event === "signOut") {
					setIsAuthenticated(false);
					window.location.reload();
				}
			}
		);

		return () => removeAuthListener();
	}, []);

	const checkUserAuthentication = async () => {
		try {
			await Auth.currentAuthenticatedUser();
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	return (
		<nav className="titlebar">
			<Link to="/" className="title">
				<h1 className="title_text">
					All about Camera:<br></br>
					For Beginners
				</h1>
			</Link>
			<Link to="/camerainfo" className="linkitem">
				Camera Info
			</Link>
			/
			<Link to="/camerarecommend" className="linkitem">
				Camera Recommendation
			</Link>
			/
			<Link to="/photoguide" className="linkitem">
				Photo Guide
			</Link>
			/
			<Link to="/photogallery" className="linkitem">
				Photo Gallery
			</Link>
			{isAuthenticated && "/"}
			{isAuthenticated && (
				<Link to="/mypage" className="linkitem">
					My Page
				</Link>
			)}
			/
			{isAuthenticated && (
				<Link to="/logout" className="linkitem">
					Logout
				</Link>
			)}
			{!isAuthenticated && (
				<Link to="/login" className="linkitem">
					Login
				</Link>
			)}
		</nav>
	);
};

export default NavBar;
