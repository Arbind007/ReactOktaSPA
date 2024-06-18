import React, { useState }  from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const Tokens = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [expiredTokenMessage, setExpiredTokenMessage] = useState('');
  
  if (!authState || !authState.isAuthenticated) {
    return <div className="loading">Loading...</div>;
  }

  const idToken = oktaAuth.tokenManager.getSync('idToken')?.idToken;
  const accessToken = oktaAuth.tokenManager.getSync('accessToken')?.accessToken;
  const refreshToken = oktaAuth.tokenManager.getSync('refreshToken')?.refreshToken;
  if (!idToken || !accessToken) {
    return <div className="loading">Tokens not available</div>;
  }

  const decodedIdToken = jwtDecode(idToken);
  const decodedIdTokenHeader = jwtDecode(idToken, { header: true });
  const decodedAccessToken = jwtDecode(accessToken);
  const decodedAccessTokenHeader = jwtDecode(accessToken, { header: true });
  

  const handleExpiredToken = async () => {
    try {
      await oktaAuth.token.getWithRedirect({
        scopes: ['openid', 'profile', 'email', 'address', 'phone','offline_access'],
        responseType: ['id_token', 'token']
      });
    } catch (err) {
      setExpiredTokenMessage('Failed to refresh tokens. Please login again.');
      console.error('Failed to refresh tokens:', err);
    }
  };

  const renderTokenInfo = (info) => {
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
          <td className='abc'><strong>{key}:</strong></td> 
          <td className='xyz'>{displayValue}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <div className="container2">
        <h1>Decoded Tokens</h1>
      </div>
      <div className="token-info">
        <div className='container3' >
          <h2 style={{textAlign:"center"}}> Decoded ID Token</h2>
          <h3>Decoded ID Token Header</h3>
          <table className="styleTable">
              <thead>
                <tr>
                  <th> Attribute </th>
                  <th> Value </th>
                </tr>
              </thead>
            <tbody>
              {renderTokenInfo(decodedIdTokenHeader)}
            </tbody>
          </table>
          <br/>

          <h3>Decoded ID Token Payload</h3>
          <table  className="styleTable">
              <thead>
                <tr>
                  <th> Attribute </th>
                  <th> Value </th>
                </tr>
              </thead>
              <tbody>
                {renderTokenInfo(decodedIdToken)}
              </tbody>
          </table>
        </div>
        
        
        <div className='container3' >
          <h2 style={{textAlign:"center"}}> Decoded Access Token</h2>
          <h3>Decoded Access Token Header</h3>
          <table className="styleTable">
              <thead>
                <tr>
                  <th> Attribute </th>
                  <th> Value </th>
                </tr>
              </thead>
              <tbody>
                {renderTokenInfo(decodedAccessTokenHeader)}
              </tbody>
          </table>
          <br/>
          
          <h3>Decoded Access Token Payload</h3>
          <table className="styleTable">
              <thead>
                <tr>
                  <th> Attribute </th>
                  <th> Value </th>
                </tr>
              </thead>
              <tbody>
                {renderTokenInfo(decodedAccessToken)}
              </tbody>
          </table>
          <div style={{marginTop:'40px'}}>
              <h3 >Refresh Token</h3>
              {refreshToken}
          </div>
        </div>
      </div>
      <div className='cntr'>
      {expiredTokenMessage && <p className="error-message">{expiredTokenMessage}</p>}
      <button onClick={handleExpiredToken}>Refresh Expired Tokens</button>
      <Link to="/"> <button type="button"> Go Back </button> </Link>
      </div>
    </div>
  );
};

export default Tokens;
