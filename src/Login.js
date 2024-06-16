import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import oktaImg from './Okta.png'

const Login = () => {
  const { oktaAuth } = useOktaAuth();

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  return (
    <div style={{marginBottom:'-5%'}}>
    <div className="container" style={{marginTop:"5%"}}>
      <img src={oktaImg} width="50%" alt='oktaImage' style={{marginLeft:'25%'}}/>
      <div className='container3' style={{textAlign:'center'}}>
        Click the below button to begin the Okta initiated OAuth 2.0 Authorization + refresh token for SPA application
      </div>
      <br/>
      <div style={{textAlign:"center"}}>
        <button style={{width:'100%'}} onClick={login}>Login</button>
      </div>
    </div>
    <div>
      <div className='container' style={{backgroundColor:'#fff',width:'16.5%', marginLeft:'78%', marginTop:'13%'}}>
        <h4 style={{marginTop:"-2%",textAlign:'center'}}>Test User Credential</h4>
        <h5 style={{}}>UserName: arbindtest@mailinator.com</h5>
        <h5 style={{marginBottom:'-2%'}}>Password: Test@123</h5>
      </div>
    </div>
    </div>
  );
};

export default Login;
