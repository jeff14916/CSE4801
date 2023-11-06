import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    checkAuthState();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, location.state]);

  return (
    <div>
      {!isAuthenticated && <Authenticator />}
    </div>
  );
};

export default LoginPage;
