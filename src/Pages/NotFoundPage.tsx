import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	useEffect(() => {
		document.title = "Page Not Found";
	}, []);

	return (
		<div>
			<h1>404: Page Not Found</h1>
			<p>Sorry, the page you're looking for doesn't exist.</p>
			<Button onClick={handleGoBack}>Go Back</Button>
		</div>
	);
};

export default NotFoundPage;
