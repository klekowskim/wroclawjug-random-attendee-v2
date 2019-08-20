/** @jsx jsx */
import React from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/core";

const style = {
	container: {
		position: "fixed",
		backgroundColor: "white",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "contain",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		textAlign: "center"
	},
	text: {
		fontSize: "10vh",
		textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
	}
};

class FullMemberPreview extends React.Component {

	getPhotoUrl = () => {
		const { attendee } = this.props;
		if (attendee.member.photo) {
			return attendee.member.photo.highres_link || attendee.member.photo.photo_link;
		}
		return "";
	};

	render() {
		const { attendee, onClose } = this.props;

		return (
			<div css={[style.container, {
				backgroundImage: `url(${this.getPhotoUrl()})`
			}]} onClick={onClose}>
				<h1 css={style.text}>{attendee.member.name}</h1>
			</div>
		);
	}
}

FullMemberPreview.propTypes = {
	attendee: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired
};

export default FullMemberPreview;
