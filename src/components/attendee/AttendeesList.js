// @flow
/** @jsx jsx */
import React from "react";
import type { Attendee as AttendeeType } from "../api/Api";
import { jsx } from "@emotion/core";
import Attendee from "./Attendee";

type Props = {
	attendees: Array<AttendeeType>
}

const style = {
	container: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-end"
	},
	attendeeContainer: {
		padding: 8
	},
	emptyList: {
		fontStyle: "italic",
		color: "rgb(72, 72, 72)"
	}
};

function AttendeesList({ attendees }: Props) {
	if (attendees.length === 0) {
		return (
			<div css={style.emptyList}>
				Empty list
			</div>
		);
	}

	return (
		<div css={style.container}>
			{attendees.map((attendee, idx) => (
				<div css={style.attendeeContainer} key={attendee.member.id}>
					<Attendee attendee={attendee} big={idx === 0} />
				</div>
			))}
		</div>
	);
}

export default AttendeesList;
