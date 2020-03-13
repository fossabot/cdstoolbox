import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, mergeStyles, DefaultButton } from 'office-ui-fabric-react';
import * as serviceWorker from './serviceWorker';
import { AzureAD, IAzureADFunctionProps, AuthenticationState } from 'react-aad-msal';
import { loadClientOptionsAsync} from './clientOptions';

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


loadClientOptionsAsync().then(clientOptions => {
  ReactDOM.render(
    (<App clientoptions={clientOptions} />),
    document.getElementById('root')
  );
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
