// App.tsx
import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { AuthProvider,useAuth } from '../lib/AuthContext';
import PrivateRoute from './PrivateRoute';
import { useNavigate } from 'react-router-dom';

import { parseFragmentString, saveOAuthParams, getSavedOAuthParams } from '../lib/oauthUtils';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173';

type OAuthParams = {
  [key: string]: string;
};

const buttonStyle = {
  backgroundColor: "#4285f4",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "2px",
  fontSize: "18px",
  cursor: "pointer",
  top: "50px",
  left: "50%",
  transform: "translateX(-50%)",
};

const MainApp: React.FC = () => {
  const { handleAuthSuccess, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const performGoogleAuth = useCallback(() => {
    const params = getSavedOAuthParams();
    if (params && params['access_token']) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${params['access_token']}`);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          handleAuthSuccess();
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
      oauth2SignIn();
    }
  }, [handleAuthSuccess]);

  const oauth2SignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params: OAuthParams = {
      'client_id': `${GOOGLE_CLIENT_ID}`,
      'redirect_uri': REDIRECT_URI,
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'state': 'perform_google_auth',
      'include_granted_scopes': 'true',
      'response_type': 'token'
    };

    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    for (const p in params) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    function handleHashChange() {
      const fragmentString = window.location.hash.substring(1);
      const params = parseFragmentString(fragmentString);
  
      if (Object.keys(params).length > 0) {
        saveOAuthParams(params);
        if (params['state'] && params['state'] === 'perform_google_auth') {
          performGoogleAuth();
        }
      }
    }
  
    handleHashChange();
  
    window.addEventListener('hashchange', handleHashChange);
  
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [performGoogleAuth]);
  
  const Home: React.FC = () => (
    <button style={buttonStyle} onClick={performGoogleAuth}>Google認証</button>
  );

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Home />} 
      />
      
      <Route 
        path="/Dashboard" 
        element={<PrivateRoute><Dashboard /></PrivateRoute>} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
};

export default App;
