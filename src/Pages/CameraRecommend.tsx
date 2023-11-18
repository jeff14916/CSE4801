import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

const CameraRecommend: React.FC = () => {
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

	useEffect(() => {
		document.title = "Camera Recommend";
	}, []);

	return (
		<div>
			{username && <h2>Hello, {username}!</h2>}
			<h1>Camera Recommend</h1>
		</div>
	);
};

export default CameraRecommend;
