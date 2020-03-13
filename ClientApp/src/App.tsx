import React, { FunctionComponent, StatelessComponent } from 'react';
import { IDropdownOption, Stack, Text, Link, Image, ImageFit, FontWeights, DefaultButton, PrimaryButton, Nav, ScrollablePane, Sticky, StickyPositionType, IconButton, Dropdown, HighContrastSelectorWhite, Panel, INavLink, INavStyleProps, INavStyles, IScrollablePaneProps } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import AzureAD, { IAccountInfo, MsalAuthProvider, AuthenticationState, IAzureADFunctionProps, LoginType } from 'react-aad-msal';
import axios from 'axios'
import ClientOptions from './clientOptions';
import { AppCore } from './AppCore';

initializeIcons();



interface IAppProps {
    clientoptions: ClientOptions
}

interface IAppState {
    authProvider: MsalAuthProvider
}

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props)

        this.render = this.render.bind(this);

        this.state = {
            authProvider: new MsalAuthProvider({
                auth: {
                    authority: 'https://login.microsoftonline.com/organizations/',
                    clientId: this.props.clientoptions.aadClientId
                },
                cache: {
                    cacheLocation: "localStorage" as const,
                    storeAuthStateInCookie: true
                }
            },
                {
                    scopes: [
                        'https://globaldisco.crm.dynamics.com/user_impersonation'
                    ]
                },
                {
                    loginType: LoginType.Redirect,
                    tokenRefreshUri: window.location.origin + '/auth.html'
                }
            )
        };

    }



    render() {
        
        return (

            <AzureAD provider={this.state.authProvider} forceLogin={false}>
                {({
                    login,
                    logout,
                    accountInfo,
                    authenticationState,
                    error
                }: IAzureADFunctionProps) => {

                    if (authenticationState === AuthenticationState.Unauthenticated) {

                        return (<div><div>Error: {error && error.message}</div><DefaultButton onClick={login}>Login</DefaultButton></div>);
                    } else if (authenticationState === AuthenticationState.InProgress) {
                        return (<h1>Logging in...</h1>);
                    } else {
                        return <AppCore authProvider={this.state.authProvider} />

                    }
                }
                }
            </AzureAD>
        );
    }
}
