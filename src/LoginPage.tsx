import React, { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth, Hub } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        navigate('/'); // Navigate to main page immediately if authenticated
      } catch (e) {
        // If not authenticated, the Authenticator component will be rendered
      }
    };

    // This listener handles the auth state change and navigates the user after login
    const removeAuthListener = Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signIn') {
        navigate('/');
      }
    });

    checkAuthState();

    return () => {
      // Remove the auth listener when the component is unmounted
      removeAuthListener();
    };
  }, [navigate]);

  return <Authenticator />;
};

export default LoginPage;
