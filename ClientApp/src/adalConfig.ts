import { MsalConfig, AuthenticationContext } from 'react-msal';

export const endpoint = 'https://rnwdev.crm11.dynamics.com/';
// App Registration ID
const appId = 'db5b7e2f-434f-4bdb-8530-201f1a3cef71';

export const adalConfig: MsalConfig = {
  cacheLocation: 'localStorage',
  clientId: appId,
  endpoints: {
      api:endpoint
  },
  postLogoutRedirectUri: window.location.origin/*,
  tenant: 'rnwsolutionsltd.onmicrosoft.com'*/
};

export const authContext = new AuthenticationContext(adalConfig);