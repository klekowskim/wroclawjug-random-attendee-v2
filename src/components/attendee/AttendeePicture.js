// @flow
/** @jsx jsx */
import React from "react";
import type { Attendee as AttendeeType } from "../api/Api";
import { jsx } from "@emotion/core";

type Props = {
	attendee: AttendeeType
}

const style = {
	container: {
		width: "100%",
		height: "100%",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center"
	}
};

class AttendeePicture extends React.Component<Props> {
	render() {
		const { attendee } = this.props;
		const photoUrl = attendee.member.photo.photo_link;
		return (
			<div css={[
				style.container,
				{ backgroundImage: `url(${photoUrl})` }
			]} />
		);
	}
}

export default AttendeePicture;
