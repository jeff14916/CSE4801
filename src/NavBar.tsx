import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./NavBar.css"; // Import your CSS file
import { useNavigate, useLocation } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const NavBar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				setUsername(user.username);
			} catch (e) {
				console.error("Error fetching user: ", e);
			}
		};

		fetchUser();
	}, []);

	const handleAuthAction = async () => {
		if (username) {
			try {
				await Auth.signOut();
				setUsername(null);
			} catch (error) {
				console.error("Error signing out: ", error);
			}
		} else {
			navigate("/login", { state: { from: location.pathname } });
		}
	};

	return (
		<div className="navbar">
			<Link to="/" className="nav-title">
				THE TITLE
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
			{username && <h2>Hello, {username}!</h2>}
			<button onClick={handleAuthAction} className="nav-item">
				{username ? "Logout" : "Login"}
			</button>
		</div>
	);
};

export default NavBar;
