import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'carlo-clamucha.auth0.com',
    clientID: 'd6xx5DWqYiqEZPLK3Trl4X0HEdgtzEMP',
    redirectUri: 'http://localhost:3000/login',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = callback => {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResults.accessToken);
        localStorage.setItem('id_token', authResults.idToken);
        localStorage.setItem('expires_at', expiresAt);
        callback();
      } else {
        return null;
      }
    });
  };

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}
