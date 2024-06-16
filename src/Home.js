import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';


const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [tokens, setTokens] = useState({ idToken: null, accessToken: null });
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const getIdAndAccessTokens = async () => {
        try {
          const idToken = await oktaAuth.tokenManager.get('idToken');
          const accessToken = await oktaAuth.tokenManager.get('accessToken');
          setTokens({
            idToken: idToken?.idToken,
            accessToken: accessToken?.accessToken,
          });
          const userInfo = await oktaAuth.token.getUserInfo(accessToken, idToken);
          setUserInfo(userInfo);
        } catch (err) {
          console.error('Error getting tokens or user info:', err);
        }
      };
      getIdAndAccessTokens();
    }
  }, [authState, oktaAuth]);

  const logout = async () => {
    await oktaAuth.signOut();
  };

  const renderUserInfo = (info) => {
    return Object.entries(info).map(([key, value]) => {
      let displayValue;
      if (typeof value === 'object') {
        displayValue = JSON.stringify(value);
      } else if (typeof value === 'boolean') {
        displayValue = value ? 'true' : 'false';
      } else {
        displayValue = value;
      }

      return (
        <tr>
          <td><strong>{key}:</strong></td> 
          <td className='xyz'>{displayValue}</td>
        </tr>
      );
    });
  };

  if (!authState) return <div className="loading">Loading...</div>;

  return authState.isAuthenticated ? (
    <div className="container">
      <div className='container2'>
      <h1>Authenticated</h1>
        {userInfo && (
          <div className="user-info">
            <h2>Hello, {userInfo.name}</h2>
           </div>
        )}
      </div>
      <div className='container3'>
        <h2 style={{textAlign:"center"}}>Tokens</h2>
        <div className="token-info">
          <p><strong>ID Token:</strong> {tokens.idToken}</p>
          <p><strong>Access Token:</strong> {tokens.accessToken}</p>
        </div>
      </div>
      {userInfo && (
        <div className='container3'>
          <div className="user-info">
            <h2>User Info</h2>
            <table class="styleTable">
              <thead>
                <tr>
                  <th> Attribute </th>
                  <th> Value </th>
                </tr>
              </thead>
              <tbody>
                {renderUserInfo(userInfo)}
              </tbody>
            </table>
            
          </div>
        </div>
      )}
      <br/>
      <div className='cntr'>
          <Link to="/tokens"> <button className='oppBtn' type="button"> View Decoded Tokens </button> </Link>
          <button onClick={logout}>Logout</button>
      </div>
      
    </div>
  ) : (
    <div className="container2">
      <h1>You are not logged in</h1>
      <br/>
      <div>
          <Link to="/login"> <button className='oppBtn2' type="button"> Click here to login! </button> </Link>
      </div>
    </div>
  );
};

export default Home;
