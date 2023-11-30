import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import "./NavBar.css";

const NavBar: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		checkUserAuthentication();
		const removeAuthListener = Hub.listen(
			"auth",
			({ payload: { event } }) => {
				if (event === "signIn") {
					checkUserAuthentication();
				} else if (event === "signOut") {
					setUsername(null);
					setIsAuthenticated(false);
					window.location.reload();
				}
			}
		);

		return () => removeAuthListener();
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
			} catch (error) {
				console.error("Error signing out: ", error);
			}
		} else {
			navigate("/login");
		}
	};

	return (
		<nav className="titlebar">
			<div className="nav-container">
				<Link to="/" className="title">
					<h1 className="title_text">
						All about Camera:<br></br>
						For Beginners
					</h1>
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
				<div className="right-nav">
					{isAuthenticated && (
						<h2 className="greeting">Hello, {username}!</h2>
					)}
					<button onClick={handleAuthAction} className="authbutton">
						{isAuthenticated ? "Logout" : "Login"}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
