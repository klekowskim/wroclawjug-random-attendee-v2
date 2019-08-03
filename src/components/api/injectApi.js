/* eslint-disable no-restricted-globals */
import React from "react";
import { ApiContext } from "./ApiProvider";

export default function injectApi(WrappedComponent) {
	return function (props) {
		return (
			<ApiContext.Consumer>
				{api => (
					<WrappedComponent api={api} {...props} />
				)}
			</ApiContext.Consumer>
		);
	}
};
