// @flow
/** @jsx jsx */
import React from "react";
import injectApi from "../api/injectApi";
import { Button } from "../layout";
import type { Attendee as AttendeeType, Event } from "../api/Api";
import Api from "../api/Api";
import { jsx } from "@emotion/core";
import Summary from "./Summary";
import AttendeesList from "./AttendeesList";

function randomNumber(size) {
	return Math.floor(Math.random() * size - 1) + 1;
}

type Props = {
	api: Api,
	event: Event
}
type State = {
	attendees: Array<AttendeeType>,
	attendeesToRandom: Array<AttendeeType>,
	winners: Array<AttendeeType>,
	losers: Array<AttendeeType>
}

const style = {
	buttonsContainer: {
		"> *": {
			margin: 10
		}
	}
};

class AttendeeRandomizer extends React.Component<Props, State> {

	constructor(props) {
		super(props);
		this.state = {
			attendees: [],
			attendeesToRandom: [],
			winners: [],
			losers: []
		}
	}

	componentDidMount() {
		const { api, event } = this.props;
		api.getAttendees(event)
			.then((attendees) => {
				this.setState({
					attendees,
					attendeesToRandom: [...attendees]
				})
			});
	}

	randomAttendee = () => {
		const { attendeesToRandom, winners } = this.state;
		if (attendeesToRandom.length > 0) {
			const index = randomNumber(attendeesToRandom.length);
			this.setState({
				attendeesToRandom: [
					...attendeesToRandom.slice(0, index),
					...attendeesToRandom.slice(index + 1, attendeesToRandom.length)
				],
				winners: [...winners, attendeesToRandom[index]]
			})
		}
	};

	clear = () => {
		this.setState({
			attendeesToRandom: [...this.state.attendees],
			winners: [],
			losers: []
		})
	};

	markLastAttendeeAsLooser = () => {
		const { winners, losers } = this.state;
		if (winners.length > 0) {
			this.setState({
				winners: winners.slice(0, -1),
				losers: [...losers, winners[winners.length - 1]]
			})
		}
	};

	render() {
		const { attendees, attendeesToRandom, winners, losers } = this.state;

		return (
			<div>
				<h1>Let's random!</h1>

				<Summary all={attendees.length} available={attendeesToRandom.length} />
				<div css={style.buttonsContainer}>
					<Button onClick={this.randomAttendee}>
						Random attendee
					</Button>
					<Button onClick={this.markLastAttendeeAsLooser}>
						Last not present
					</Button>
					<Button type="danger" onClick={this.clear}>
						Clear
					</Button>
				</div>
				<div>

					<h2>Winners</h2>
					<AttendeesList attendees={winners.slice().reverse()} />

					<h2>Guys who missed their opportunity</h2>
					<AttendeesList attendees={losers.slice().reverse()} />
				</div>
			</div>
		);
	}
}

export default injectApi(AttendeeRandomizer);
