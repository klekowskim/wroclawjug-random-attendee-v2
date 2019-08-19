// @flow
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import type { Event as EventType } from "../api/Api";

type Props = {
	event: EventType,
	onSelect: (event: Object) => void
}

const style = {
	item: {
		padding: 16,
		fontSize: 16,
		cursor: "pointer",
		":not(:first-of-type)": {
			borderTop: "1px solid rgba(0,0,0,.12)"
		},
		"&:hover": {
			boxShadow: "rgb(0,0,0,.12) 0 0 12px"
		}
	},
	header: {
		lineHeight: 1.4,
		fontSize: 18,
		fontWeight: 600,
		color: "rgb(72, 72, 72)",
		margin: 0
	}
};

class Event extends React.Component<Props> {

	onSelect = () => {
		const { event, onSelect } = this.props;
		onSelect(event);
	};

	render() {
		const { event } = this.props;

		return (
			<li css={style.item} onClick={this.onSelect}>
				<div css={style.header}>{event.name}</div>
				<div>{event.local_date} {event.local_time}</div>
				<div>{event.yes_rsvp_count} Members</div>
			</li>
		);
	}
}

export default Event;
