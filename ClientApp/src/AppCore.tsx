import React, { FunctionComponent, StatelessComponent } from 'react';
import { IDropdownOption, Stack, Text, Link, Image, ImageFit, FontWeights, DefaultButton, PrimaryButton, Nav, ScrollablePane, Sticky, StickyPositionType, IconButton, Dropdown, HighContrastSelectorWhite, Panel, INavLink, INavStyleProps, INavStyles, IScrollablePaneProps } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import AzureAD, { IAccountInfo, MsalAuthProvider, AuthenticationState, IAzureADFunctionProps, LoginType } from 'react-aad-msal';
import axios from 'axios'
import ClientOptions from './clientOptions';

interface IAppCoreState {
    token: string | null
    navExpanded: boolean
    organizations: IOrganization[]
}

interface IAppCoreProps {
    authProvider: MsalAuthProvider
}

interface IOrganization {

    FriendlyName: string,
    Url: string,
    ApiUrl: string,
    Id: string
}

export class AppCore extends React.Component<IAppCoreProps, IAppCoreState> {

    constructor(props: IAppCoreProps) {
        super(props);
        this.render = this.render.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.getNavStyles = this.getNavStyles.bind(this);
        this.logout = this.logout.bind(this);
        this.getOrganizations = this.getOrganizations.bind(this);

        this.state = {
            navExpanded: true,
            token: null,
            organizations: []
        };
    }

    getOrganizations(): IDropdownOption[] {
        return this.state.organizations.map<IDropdownOption>(o => ({ key: o.Id, text: o.FriendlyName }));
    }

    async componentDidMount() {
        const token = await this.props.authProvider.getAccessToken();

        var response = await axios.get("/api/discovery/v2.0/Instances", {
            baseURL: "https://globaldisco.crm.dynamics.com/",
            headers: { Authorization: 'Bearer ' + token.accessToken },
        });

        this.setState({
            organizations: response.data.value as IOrganization[]
        });

    }



    getNavStyles(item: INavStyleProps): Partial<INavStyles> {
        return {
            root: {
                overflowX: "hidden"
            },

            chevronButton: {
                display: this.state.navExpanded ? "block" : "none"
            },

            link: {
                backgroundColor: item.isSelected ? "white" : "#eeeeee"
            },


            linkText: {
                display: this.state.navExpanded ? "inline" : "none"
            }
        };
    }

    toggleNav() {
        this.setState({
            navExpanded: !this.state.navExpanded
        });
    }

    logout() {
        this.props.authProvider.logout();
    }

    render() {

        return (<Stack
            horizontalAlign="stretch"
            verticalAlign="start"
            verticalFill
            styles={{
                root: {
                    width: '100%',
                    margin: '0 auto',
                    textAlign: 'center',
                    color: '#605e5c'
                }
            }}
            gap={0}
        >
            <Stack.Item styles={{ root: { backgroundColor: "black" } }}>

                <Stack horizontal verticalAlign="center" horizontalAlign="stretch" gap={15}>
                    <Stack.Item><Image src="/logo.png" imageFit={ImageFit.none} alt="Logo" styles={{ root: { padding: "6px" } }} /></Stack.Item>
                    <Stack.Item>
                        <Dropdown styles={{ root: { width: "400px", backgroundColor: "black", color: "white" } }} options={this.getOrganizations()} /></Stack.Item>
                    <Stack.Item grow={1}> </Stack.Item>
                    <Stack.Item>
                        <Persona onClick={this.logout} text={(this.props.authProvider.getAccount() && this.props.authProvider.getAccount().name) || "<none>"} size={PersonaSize.size32} styles={{ primaryText: { color: "white", "selectors": { ":hover": { color: "white" } } } }} ></Persona>
                    </Stack.Item>

                </Stack>







            </Stack.Item>
            <Stack.Item grow={1}>
                <Stack horizontal verticalAlign="stretch" verticalFill gap={15}>
                    <Stack.Item styles={{ root: { backgroundColor: "#eeeeee" } }}>
                        <div style={{ height: "100%", width: this.state.navExpanded ? "300px" : "46px", position: "relative" }}>
                            <ScrollablePane scrollbarVisibility="auto" >
                                <Sticky stickyBackgroundColor={"#eeeeee"} stickyPosition={StickyPositionType.Header}>
                                    <Stack horizontal horizontalAlign="start">
                                        <Stack.Item>
                                            <IconButton onClick={this.toggleNav} iconProps={{ iconName: "GlobalNavButton" }} />
                                        </Stack.Item>
                                        <Stack.Item grow={1}> </Stack.Item>
                                    </Stack>
                                </Sticky>

                                <Nav
                                    styles={this.getNavStyles}
                                    groups={[
                                        {
                                            name: 'Basic components',
                                            links: [
                                                {
                                                    key: 'ActivityItem',
                                                    name: 'ActivityItem',
                                                    icon: 'OEM',
                                                    url: '#/examples/activityitem'
                                                },
                                                {
                                                    key: 'Breadcrumb',
                                                    name: 'Breadcrumb',
                                                    icon: 'Contact',
                                                    url: '#/examples/breadcrumb'
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ScrollablePane>
                        </div>


                    </Stack.Item>
                    <Stack.Item grow={1}>
                        Main
</Stack.Item>
                </Stack>


            </Stack.Item>

        </Stack>);
    }
};