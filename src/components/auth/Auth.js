/* eslint-disable no-restricted-globals */
import React from "react";
import PropTypes from "prop-types";
import ClientOAuth2 from "client-oauth2";
import ClientForm from "./ClientForm";

const CLIENT_CONFIG = {
	accessTokenUri: "https://secure.meetup.com/oauth2/access",
	authorizationUri: "https://secure.meetup.com/oauth2/authorize",
	redirectUri: "klekowskim.github.io/wroclawjug-random-attendee-v2",
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

		this.meetupClient = new ClientOAuth2({
			clientId: null,
			clientSecret: null,
			...CLIENT_CONFIG
		});

		this.readAccessTokenFromUrl();
	}

	onFormSubmit = (values) => {
		this.meetupClient = new ClientOAuth2({
			clientId: values.clientId,
			clientSecret: values.clientSecret,
			...CLIENT_CONFIG
		});

		window.open(this.meetupClient.token.getUri(), "_self");
	};

	readAccessTokenFromUrl = () => {
		const url = location.href;
		location.hash = "";
		this.meetupClient.token
			.getToken(url)
			.then((token) => {
				this.setState({
					accessToken: token.accessToken,
					tokenType: token.tokenType,
					expires: token.expires
				});
			}, (reason) => {
				console.error(reason);
			});
	};

	isLoggedIn = () => {
		const { accessToken, expires } = this.state;
		return accessToken !== null && expires > new Date();
	};

	render() {
		if (!this.isLoggedIn()) {
			return (
				<ClientForm onSubmit={this.onFormSubmit} />
			)
		}

		const { accessToken, tokenType } = this.state;
		return (
			<AuthContext.Provider value={{ accessToken, tokenType }}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

Auth.propTypes = {
	children: PropTypes.node.isRequired
};

export default Auth;
