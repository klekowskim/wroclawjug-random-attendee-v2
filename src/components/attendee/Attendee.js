import React from "react";
import PropTypes from "prop-types";
import FullMemberPreview from "./FullMemberPreview";

class Attendee extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fullPreviewVisible: false
		}
	}

	showFullPreview = () => {
		this.setState({ fullPreviewVisible: true })
	};

	hideFullPreview = () => {
		this.setState({ fullPreviewVisible: false })
	};

	render() {
		const { attendee } = this.props;
		return (
			<React.Fragment>
				<div onClick={this.showFullPreview}>
					{attendee.member.photo && (
						<div>
							<img src={attendee.member.photo.thumb_link} alt={attendee.member.name} />
						</div>
					)}
					{attendee.member.name}
				</div>
				{this.state.fullPreviewVisible && (
					<FullMemberPreview attendee={attendee} onClose={this.hideFullPreview} />
				)}
			</React.Fragment>
		);
	}
}

Attendee.propTypes = {
	attendee: PropTypes.object.isRequired
};

export default Attendee;
