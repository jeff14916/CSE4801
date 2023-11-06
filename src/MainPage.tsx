import React from "react";
import { Button, Text } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate("/login"); // Redirect to the login page after successful logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <Text>Welcome to the Main Page!</Text>
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
};

export default MainPage;
