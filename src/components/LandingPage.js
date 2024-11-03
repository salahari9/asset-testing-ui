import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';

const LandingPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { formData, updateFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/accountForm'); // Navigate to the new page
  };

  useEffect(() => {
    console.log('env ', process.env);
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/auth/login?userName=test',
          {
            // Replace with your API URL
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        updateFormData({ token: result.token });
      } catch (error) {
        setError(error.message);
        navigate('/failure');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to My App</h1>
      <h1>Environment: {process.env.REACT_APP_ENVIRONMENT}</h1>
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default LandingPage;
