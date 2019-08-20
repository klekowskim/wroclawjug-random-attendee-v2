import React from "react";
import PropTypes from "prop-types";
import ClientOAuth2 from "client-oauth2";
import ClientForm from "./ClientForm";

const REMEMBER_ME_STORAGE_KEY = "rememberMe";
const AUTH_STORAGE_KEY = "auth";

const CLIENT_CONFIG = {
	clientId: "cpft4h30lu74ove69ksqcog7sr",
	accessTokenUri: "https://secure.meetup.com/oauth2/access",
	authorizationUri: "https://secure.meetup.com/oauth2/authorize",
	redirectUri: `${window.location.origin}${window.location.pathname}`,
	scopes: ["basic"]
};

export const AuthContext = React.createContext(null);

class Auth extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			accessToken: null,
			tokenType: null,
			expires: null
		};

		const storedAuthString = sessionStorage.getItem(AUTH_STORAGE_KEY);
		if (storedAuthString) {
			const auth = JSON.parse(storedAuthString);
			this.state.accessToken = auth.accessToken;
			this.state.tokenType = auth.tokenType;
			this.state.expires = auth.expires;
		}

		this.meetupClient = new ClientOAuth2(CLIENT_CONFIG);

		this.readAccessTokenFromUrl();
	}

	onFormSubmit = (values) => {
		localStorage.setItem(REMEMBER_ME_STORAGE_KEY, values.rememberMe);

		window.open(this.meetupClient.token.getUri(), "_self");
	};

	readAccessTokenFromUrl = () => {
		if (window.location.hash.indexOf("access_token") > 0) {
			const url = window.location.href;
			window.location.hash = "";
			this.meetupClient.token
				.getToken(url)
				.then((token) => {
					const auth = {
						accessToken: token.accessToken,
						tokenType: token.tokenType,
						expires: token.expires.getTime()
					};
					this.setState(auth);
					let item = localStorage.getItem(REMEMBER_ME_STORAGE_KEY);
					if (item === "true") {
						sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
					}
				}, (reason) => {
					console.error(reason);
				});
		}
	};

	isLoggedIn = () => {
		const { accessToken, expires } = this.state;
		// todo set timeout for checking logout
		return accessToken !== null && expires - (10 * 1000) > new Date().getTime();
	};

	logOut = () => {
		localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
		sessionStorage.removeItem(AUTH_STORAGE_KEY);
		this.setState({
			accessToken: null,
			tokenType: null,
			expires: null
		});
	};

	render() {
		const { accessToken, tokenType } = this.state;

		if (!this.isLoggedIn()) {
			return (
				<ClientForm onSubmit={this.onFormSubmit} />
			)
		}

		return (
			<AuthContext.Provider value={{ accessToken, tokenType, logOut: this.logOut }}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

Auth.propTypes = {
	children: PropTypes.node.isRequired
};

export default Auth;
