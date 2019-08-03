import React from "react";
import Container from "../layout/Container";
import LeftColumn from "../layout/LeftColumn";
import RightColumn from "../layout/RightColumn";
import EventsSelector from "../events/EventsSelector";
import AttendeeRandomizer from "../attendee/AttendeeRandomizer";

class Content extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedEvent: null,
			attendees: []
		};
	}

	onEventSelect = (event) => {
		this.setState({ selectedEvent: event });
	};

	render() {
		const { selectedEvent } = this.state;

		return (
			<Container>
				<LeftColumn>
					{selectedEvent !== null && (
						<div>
							<div>Selected event:</div>
							<div>{selectedEvent.name}</div>
						</div>
					)}
				</LeftColumn>
				<RightColumn>
					{selectedEvent === null && (
						<EventsSelector onSelect={this.onEventSelect} />
					)}
					{selectedEvent !== null && (
						<AttendeeRandomizer event={selectedEvent} />
					)}
				</RightColumn>
			</Container>
		);
	}
}

export default Content;
