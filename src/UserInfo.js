import React, { useEffect, useState }  from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const UserInfo = () => {
  const { authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const fetchUserInfo = async () => {
        try {
          const accessToken = authState.accessToken.accessToken;
          const response = await axios.get('https://dev-75519399.okta.com/oauth2/default/v1/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setUserInfo(response.data);
        } catch (err) {
          setError('Failed to fetch user info');
          console.error('Error fetching user info:', err);
        }
      };

      fetchUserInfo();
    }
  }, [authState]);

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
          <td className='abc'><strong>{key}:</strong></td> 
          <td className='xyz'>{displayValue}</td>
        </tr>
      );
    });
  };

  if (!authState || !authState.isAuthenticated) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <div className="container2">
        <h1>User Info</h1>
      </div>
      <div className="token-info">
        <div >
        {!userInfo ? <p style={{textAlign:'center'}}>Loading user info...</p> : <p></p>}
        {userInfo && (
        <div className='container3'>
          <div className="user-info">
            <h3>User Information retirived from the 'userinfo' endpoint of Okta</h3>
            <table  className="styleTable">
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
        </div>
      </div>
      <div className='cntr'>
      <Link to="/"> <button type="button"> Go Back </button> </Link>
      </div>
    </div>
  );
};

export default UserInfo;
