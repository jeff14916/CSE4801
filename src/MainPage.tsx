import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate, useLocation } from 'react-router-dom';
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
        console.error('Error fetching user: ', e);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLogIn = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      {username ? <h2>Hello, {username}!</h2> : <Button onClick={handleLogIn}>Log In</Button>}
      {username && <Button onClick={handleLogout}>Log Out</Button>}
    </div>
  );
};

export default MainPage;
