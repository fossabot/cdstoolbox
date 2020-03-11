import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, mergeStyles } from 'office-ui-fabric-react';
import * as serviceWorker from './serviceWorker';
import { AzureAD, IAzureADFunctionProps, AuthenticationState } from 'react-aad-msal';
import { authProvider } from './authProvider';

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#root)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});


ReactDOM.render(
  (<AzureAD provider={authProvider} forceLogin={false}>
    {({
      login,
      logout,
      accountInfo,
      authenticationState,
      error
    }: IAzureADFunctionProps) => {

      if (authenticationState == AuthenticationState.InProgress) {
        login();
      return <h1>Logging in...</h1>;
      }
      return (<App />);

    }
    }
  </AzureAD>),
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
