import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const LogoutPage: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;

		const logout = async () => {
			try {
				await Auth.signOut();
				if (isMounted) {
					navigate(-1);
				}
			} catch (e) {
				console.error("Error during sign out:", e);
			}
		};

		logout();

		return () => {
			isMounted = false;
		};
	}, [navigate]);

	useEffect(() => {
		document.title = "Logging out..";
	}, []);

	return <div>Logging out...</div>;
};

export default LogoutPage;
