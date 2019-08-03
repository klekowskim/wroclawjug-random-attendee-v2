import React from "react";
import PropTypes from "prop-types";
import injectApi from "../api/injectApi";

class AttendeeRandomizer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			attendees: [],
			winners: []
		}
	}

	componentDidMount() {
		const { api, event } = this.props;
		api.getAttendees(event)
			.then((attendees) => {
				this.setState({ attendees })
			});
	}

	render() {
		const { attendees } = this.state;

		return (
			<div>
				<div>
					<span>Number of attendees:</span>
					<span>{attendees.length}</span>
				</div>
				<div>

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
