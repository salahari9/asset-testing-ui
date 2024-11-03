import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import { FormContext } from '../context/FormContext';

const IdentityPage = () => {
  const { formData, updateFormData } = useContext(FormContext);
  return <div> IdentityPage :: {formData.assetId}</div>;
};
export default IdentityPage;
