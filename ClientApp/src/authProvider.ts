import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: 'db5b7e2f-434f-4bdb-8530-201f1a3cef71'
  },
  cache: {
    cacheLocation: "localStorage" as const,
    storeAuthStateInCookie: true
  }
} ;
 
const authenticationParameters = {
  scopes: [
    'user.read'
  ]
};
 
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)