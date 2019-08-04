import React from "react";
import PropTypes from "prop-types";
import "./FullMemberPreview.css"

class FullMemberPreview extends React.Component {

	render() {
		let { attendee, onClose } = this.props;
		return (
			<div className="FullMemberPreview" onClick={onClose}>
				{attendee.member.photo && (
					<div className="image-container">
						<img src={attendee.member.photo.highres_link} alt={attendee.member.name} />
					</div>
				)}
				<h3>{attendee.member.name}</h3>
			</div>
		);
	}
}

FullMemberPreview.propTypes = {
	attendee: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired
};

export default FullMemberPreview;
