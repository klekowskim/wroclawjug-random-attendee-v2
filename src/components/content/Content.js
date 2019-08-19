import React from "react";
import EventsSelector from "../events/EventsSelector";
import AttendeeRandomizer from "../attendee/AttendeeRandomizer";
import UserInfo from "./UserInfo";
import SelectedEvent from "./SelectedEvent";
import { Container, LeftColumn, RightColumn } from "../layout";

class Content extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedMeetup: null,
			selectedEvent: null,
			attendees: []
		};
	}

	onEventSelect = (event) => {
		this.setState({ selectedEvent: event });
	};

	onEventClear = () => {
		this.setState({ selectedEvent: null })
	};

	render() {
		const { selectedEvent } = this.state;

		return (
			<Container>
				<LeftColumn>
					<UserInfo />
					<SelectedEvent selectedEvent={selectedEvent} onClear={this.onEventClear} />
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
