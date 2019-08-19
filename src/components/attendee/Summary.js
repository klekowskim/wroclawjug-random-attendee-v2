// @flow
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

type Props = {
	all: number,
	available: number
}

class Summary extends React.Component<Props> {

	render() {
		const { all, available } = this.props;

		return (
			<div>
				<span>Available attendees: {available} of {all}</span>
			</div>
		);
	}
}

export default Summary;
