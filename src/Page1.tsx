import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

const Page1: React.FC = () => {
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Page1</h1>
      <Button onClick={() => goToPage('/')}>Go to Main Page</Button>
      <Button onClick={() => goToPage('/page1')}>Go to Page 1</Button>
    </div>
  );
};

export default Page1;
