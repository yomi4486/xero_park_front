// App.tsx
import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from '../lib/AuthContext';
import PrivateRoute from './PrivateRoute';
import { useNavigate } from 'react-router-dom';
import { parseFragmentString, saveOAuthParams, getSavedOAuthParams } from '../lib/oauthUtils';
import EditPage from './Edit';
import AppBar from './assets/AppBar';
import ReadPage from './Read';
import { HelmetProvider } from "react-helmet-async";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173';

type OAuthParams = {
  [key: string]: string;
};

const MainApp: React.FC = () => {
  const { handleAuthSuccess } = useAuth();
  const navigate = useNavigate();

  const performGoogleAuth = useCallback(() => {
    const params = getSavedOAuthParams();
    if (params && params['access_token']) {
      const xhr = new XMLHttpRequest();
      console.log(params);
      xhr.open('GET', `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${params['access_token']}`);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const userInfo = JSON.parse(xhr.responseText);
          const user = {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
          };
          handleAuthSuccess(user);
          navigate('/Dashboard'); // ログイン成功時に/Dashboardに遷移
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
      oauth2SignIn();
    }
  }, [handleAuthSuccess, navigate]);

  const oauth2SignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params: OAuthParams = {
      'client_id': `${GOOGLE_CLIENT_ID}`,
      'redirect_uri': REDIRECT_URI,
      'scope': 'https://www.googleapis.com/auth/userinfo.profile',
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

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return width;
  };

  const bodyStyle = {
    backgroundColor: "#FEFFFE",
    width: useWindowWidth(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
  };
  const buttonStyle = {
    backgroundColor: "#4285f4",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "2px",
    fontSize: "18px",
    cursor: "pointer",
  };

  const centerContainer: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }

  const Home: React.FC = () => (
    <body style={bodyStyle}>
      <AppBar />
      <div style={centerContainer}>
        <h1 style={{ textAlign: "center" }}>XeroParkへようこそ！</h1>
        <p style={{ textAlign: "center", marginBottom: 30 }}>あなたの素晴らしい実績をここに書き残しましょう！</p>
        <button style={buttonStyle} onClick={performGoogleAuth}>ログイン</button>
      </div>
    </body>
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
      <Route
        path="/Edit"
        element={<PrivateRoute><EditPage /></PrivateRoute>}
      />
      <Route path="/:id" Component={ReadPage} />
    </Routes>
  );

};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <HelmetProvider>
          <MainApp />
        </HelmetProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
