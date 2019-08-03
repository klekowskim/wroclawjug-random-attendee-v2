/* eslint-disable no-restricted-globals */
import React from "react";
import PropTypes from "prop-types";
import Api from "./Api";
import { AuthContext } from "../auth/Auth";

export const ApiContext = React.createContext(null);

class ApiProvider extends React.Component {

	render() {
		return (
			<AuthContext.Consumer>
				{(value) => {
					const api = value ? new Api(value.accessToken, value.tokenType) : null;
					return (
						<ApiContext.Provider value={api}>
							{this.props.children}
						</ApiContext.Provider>
					);
				}}
			</AuthContext.Consumer>
		);
	}
}

ApiProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export default ApiProvider;
