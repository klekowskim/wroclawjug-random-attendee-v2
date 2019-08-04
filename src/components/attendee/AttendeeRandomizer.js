import React from "react";
import PropTypes from "prop-types";
import injectApi from "../api/injectApi";
import Attendee from "./Attendee";

function randomNumber(size) {
	return Math.floor(Math.random() * size - 1) + 1;
}

class AttendeeRandomizer extends React.Component {

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
		const { attendees, winners, losers } = this.state;

		return (
			<div>
				<div>
					<span>Number of attendees:</span>
					<span>{attendees.length}</span>
				</div>
				<div>
					<button onClick={this.randomAttendee}>Random attendee</button>
					<button onClick={this.clear}>Clear</button>
					<button onClick={this.markLastAttendeeAsLooser}>Last not present</button>
				</div>
				<div>
					<div>
						Winners:
					</div>
					<div>
						{winners.map(attendee => (
							<Attendee attendee={attendee} key={attendee.member.id} />
						))}
					</div>
					<div>
						Guys who missed their opportunity :):
					</div>
					<div>
						{losers.map(attendee => (
							<Attendee attendee={attendee} key={attendee.member.id} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

AttendeeRandomizer.propTypes = {
	api: PropTypes.object.isRequired,
	event: PropTypes.object.isRequired
};

export default injectApi(AttendeeRandomizer);
