import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import './App.css';
import AccountFormPage from './components/AccountFormPage';
import IdentityPage from './components/IdentityPage';
import LandingPage from './components/LandingPage';
import Failure from './components/Failure';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />{' '}
          {/* Specify the element */}
          <Route path="/identityPage" element={<IdentityPage />} />{' '}
          {/* Specify the element */}
          <Route path="/accountForm" element={<AccountFormPage />} />{' '}
          {/* Specify the element */}
          <Route path="/failure" element={<Failure />} />{' '}
          {/* Specify the element */}
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
