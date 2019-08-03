import React from "react";
import PropTypes from "prop-types";
import injectApi from "../api/injectApi";

class EventsSelector extends React.Component {

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
		const { events } = this.state;

		return (
			<div>
				{events.map(event => (
					<div key={event.id}>
						<span onClick={() => {
							this.props.onSelect(event)
						}}>{event.name}</span>
					</div>
				))}
			</div>
		);
	}
}

EventsSelector.propTypes = {
	api: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired
};

export default injectApi(EventsSelector);
