// @flow
/** @jsx jsx */
import React from "react";
import FullMemberPreview from "./FullMemberPreview";
import type { Attendee as AttendeeType } from "../api/Api";
import { jsx } from "@emotion/core";
import AttendeePicture from "./AttendeePicture";

type Props = {
	attendee: AttendeeType,
	big: boolean
}

type State = {
	fullPreviewVisible: boolean
}

const computeStyles = (big: boolean) => ({
	container: {
		width: big ? 192 : 144,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(235, 235, 235)",
		borderRadius: 0,
		"&:hover": {
			boxShadow: "rgb(0,0,0,.12) 0 0 12px"
		}
	},
	photo: {
		height: big ? 240 : 180
	},
	nameContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: "8px 4px",
		minHeight: 52,
	},
	name: {
		textAlign: "center",
		verticalAlign: "center"
	}
});

class Attendee extends React.Component<Props, State> {

	static defaultProps = {
		big: true
	};

	constructor(props: Props) {
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
		const { attendee, big } = this.props;

		const style = computeStyles(big);
		return (
			<React.Fragment>
				<div onClick={this.showFullPreview} css={style.container}>
					<div css={style.photo}>
						{attendee.member.photo && (
							<AttendeePicture attendee={attendee} />
						)}
					</div>
					<div css={style.nameContainer}>
						<span css={style.name}>{attendee.member.name}</span>
					</div>
				</div>

				{this.state.fullPreviewVisible && (
					<FullMemberPreview attendee={attendee} onClose={this.hideFullPreview} />
				)}

			</React.Fragment>
		);
	}
}

export default Attendee;
