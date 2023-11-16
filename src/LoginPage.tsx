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
        navigate('/');
      } catch (e) {
        console.error("Authentication error: ", e);
      }
    };

    const removeAuthListener = Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signIn') {
        navigate('/');
      }
    });

    checkAuthState();

    return () => removeAuthListener();
  }, [navigate]);

  return <Authenticator />;
};

export default LoginPage;
