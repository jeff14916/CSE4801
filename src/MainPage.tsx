import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
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
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLogIn = async () => {
    navigate('/login');
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
