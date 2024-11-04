import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import { FormContext } from '../context/FormContext';

const AccountFormPage = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [accountNumber, setAccountNumber] = useState('');
  const [institute, setInstitute] = useState('');
  const [marriedFlag, setMarriedFlag] = useState('');
  const [missingFields, setMissingFields] = useState([]);
  const { formData, updateFormData } = useContext(FormContext);

  const accountRef = useRef(null);
  const instituteRef = useRef(null);
  const marriedRef = useRef(null);
  const accountInputRef = useRef(null);
  const instituteInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = [];
    if (!accountNumber) fields.push('Account Number');
    if (!institute) fields.push('Institute');
    if (marriedFlag === '') fields.push('Married Status');

    if (fields.length > 0) {
      setMissingFields(fields);
      return;
    }

    // Clear the missing fields if all are filled
    setMissingFields([]);
    const m = marriedFlag === 'yes' ? true : false;
    updateFormData({ accountNumber: accountNumber });
    updateFormData({ institute: institute });
    updateFormData({ married: m });

    // Prepare the data for the API call
    const data = {
      accountNumber,
      institute,
      married: m,
    };

    try {
      //   Make an API call to save the data
      const response = await fetch('http://localhost:30649/api/assets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: formData.token,
          userName: 'test',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      // Optionally handle the response
      const result = await response.json();
      console.log('Data saved:', result);
      updateFormData({ assetId: result.assetId });
      // Navigate to a new page upon successful saving
      navigate('/identityPage'); // Change '/success' to your desired route
    } catch (error) {
      console.error('Error:', error);
      // Optionally display an error message to the user
    }
    navigate('/identityPage');
  };

  const scrollToField = (field) => {
    if (field === 'Account Number') {
      accountRef.current.scrollIntoView({ behavior: 'smooth' });
      accountInputRef.current.focus();
    } else if (field === 'Institute') {
      instituteRef.current.scrollIntoView({ behavior: 'smooth' });
      instituteInputRef.current.focus();
    } else if (field === 'Married Status') {
      marriedRef.current.scrollIntoView({ behavior: 'smooth' });
      const radioButtons = marriedRef.current.querySelectorAll(
        'input[type="radio"]'
      );
      if (radioButtons.length > 0) {
        radioButtons[0].focus(); // Focus the first radio button
      }
    }
  };

  return (
    <div>
      <h1>Account Information</h1>
      {missingFields.length > 0 && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <p>Please fill out the following fields:</p>
          <ul>
            {missingFields.map((field, index) => (
              <li key={index}>
                <button
                  style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => scrollToField(field)}
                >
                  {field}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div ref={accountRef}>
          <label style={{ color: accountNumber ? 'black' : 'red' }}>
            Account Number:{' '}
            {!accountNumber && <span style={{ color: 'red' }}>*</span>}
            <input
              type="text"
              ref={accountInputRef}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div ref={instituteRef}>
          <label style={{ color: institute ? 'black' : 'red' }}>
            Institute: {!institute && <span style={{ color: 'red' }}>*</span>}
            <input
              type="text"
              ref={instituteInputRef}
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              required
            />
          </label>
        </div>
        <div ref={marriedRef}>
          <label>Married:</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={marriedFlag === 'yes'}
                onChange={(e) => setMarriedFlag(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={marriedFlag === 'no'}
                onChange={(e) => setMarriedFlag(e.target.value)}
              />
              No
            </label>
            {marriedFlag === '' && <span style={{ color: 'red' }}>*</span>}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AccountFormPage;
