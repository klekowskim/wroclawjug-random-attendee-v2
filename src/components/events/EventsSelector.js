// @flow
/** @jsx jsx */
import React from "react";
import injectApi from "../api/injectApi";
import { H1 } from "../layout";
import type { Event as EventType } from "../api/Api";
import Api from "../api/Api";
import Event from "./Event";
import { jsx } from "@emotion/core";

type Props = {
	api: Api,
	onSelect: (event: EventType) => void
};

type State = {
	events: Array<EventType>
}

const style = {
	list: {
		border: "1px solid rgba(0,0,0,.12)",
		borderRadius: "3px",
		display: "block",
		listStyle: "none",
		margin: "0 0 16px",
		padding: 0
	}
};

class EventsSelector extends React.Component<Props, State> {

	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	componentDidMount() {
		this.props.api.getEvents()
			.then((events) => {
				this.setState({ events })
			});
	}

	render() {
		const { onSelect } = this.props;
		const { events } = this.state;

		return (
			<div>
				<h1>Choose one of the following events:</h1>
				<ul css={style.list}>
					{events.map(event => (
						<Event event={event} onSelect={onSelect} key={event.id} />
					))}
				</ul>
			</div>
		);
	}
}

export default injectApi(EventsSelector);
