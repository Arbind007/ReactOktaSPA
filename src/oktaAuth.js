import { OktaAuth } from '@okta/okta-auth-js';

var config = {
  issuer: 'https://dev-75519399.okta.com/oauth2/default',
  clientId: '0oahrhqj0yoMuXEo15d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email', 'address', 'phone'],
  tokenManager: {
      storage: 'localStorage',
  },
};

const oktaAuth = new OktaAuth(config);

export default oktaAuth;

