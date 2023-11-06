import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate, useLocation  } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user.username);
      } catch (e) {
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLogIn = async () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      {username && <h2>Hello, {username}!</h2>}
      {!username && <Button onClick={handleLogIn}>LogIn</Button>}
      {username && <Button onClick={handleLogout}>Logout</Button>}
      
    </div>
  );
};

export default MainPage;
