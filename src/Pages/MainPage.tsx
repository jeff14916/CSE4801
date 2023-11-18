import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
// import { useNavigate} from 'react-router-dom';
// import { Button } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

const MainPage: React.FC = () => {
	// const navigate = useNavigate();
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

	// const goToPage = (path: string) => {
	//   navigate(path);
	// };

	useEffect(() => {
		document.title = "Main Page";
	}, []);

	return (
		<div>
			{username && <h2>Hello, {username}!</h2>}
			<h1>Welcome to the Main Page</h1>
		</div>
	);
};

export default MainPage;
