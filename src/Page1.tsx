import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

const Page1: React.FC = () => {
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
      setUsername(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLogIn = () => {
    navigate('/login', { state: { from: location.pathname } });
  };
  
  const goToPage = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
  document.title = "Page 1";
  }, []);


  return (
    <div>
      {username ? <h2>Hello, {username}!</h2> : <Button onClick={handleLogIn}>Log In</Button>}
      <h1>Welcome to the Page 1</h1>
      {username && <Button onClick={handleLogout}>Log Out</Button>}
      <Button onClick={() => goToPage('/')}>Go to Main Page</Button>
      <Button onClick={() => goToPage('/page1')}>Go to Page 1</Button>
    </div>
  );
};

export default Page1;
