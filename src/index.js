import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Tokens from './Tokens';
import ErrorPage from './ErrorPage';
import oktaAuth from './oktaAuth';
import UserInfo from './UserInfo';
import './App.css'

const AppWraper = () => {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(originalUri || '/');
  };

  return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/tokens" element={<Tokens />} />
          
          <Route path="*" element={<ErrorPage message="Page not found" />} />
        </Routes>
      </Security>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppWraper />
  </Router>
);
