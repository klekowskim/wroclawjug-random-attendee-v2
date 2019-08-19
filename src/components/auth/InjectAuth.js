/* eslint-disable no-restricted-globals */
import React from "react";
import { AuthContext } from "./Auth";

export default function injectAuth(WrappedComponent) {
	return function (props) {
		return (
			<AuthContext.Consumer>
				{auth => (
					<WrappedComponent auth={auth} {...props} />
				)}
			</AuthContext.Consumer>
		);
	}
};
