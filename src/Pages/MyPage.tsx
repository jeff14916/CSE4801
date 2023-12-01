import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const MyPage: React.FC = () => {
	const [username, setUsername] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		const fetchUser = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				setUsername(user.username);
			} catch (e) {
				console.error("Error fetching user: ", e);
				if (isMounted) {
					alert("Please log in before using my page!");
					navigate("/login");
				}
			}
		};

		fetchUser();
		return () => {
			isMounted = false;
		};
	}, [navigate]);

	useEffect(() => {
		document.title = "My Page";
	}, []);

	return (
		<div>
			{username && <h2>Hello, {username}!</h2>}
			<h1>My Page</h1>
		</div>
	);
};

export default MyPage;
