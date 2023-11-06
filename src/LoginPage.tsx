import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {!isAuthenticated && <Authenticator />}
    </div>
  );
};

export default LoginPage;
