// @flow
/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import { Button, ShadowBox } from "../layout";

type Props = {
	selectedEvent: ?Object,
	onClear: () => void
};

const style = {
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	eventDescription: {
		flex: "1 0 0",
	},
	header: {
		lineHeight: 1.1,
		fontSize: 14,
		fontWeight: 600,
		color: "rgb(72, 72, 72)",
		margin: 0
	}
};

function SelectedEvent({ selectedEvent, onClear }: Props) {
	if (selectedEvent === null || selectedEvent === undefined) {
		return null;
	}

	return (
		<ShadowBox css={style.container} onClick={onClear}>
			<div css={style.eventDescription}>
				<div css={style.header}>Selected event:</div>
				<div>{selectedEvent.name}</div>
			</div>
			<Button type="secondary">Change</Button>
		</ShadowBox>
	);
}

export default SelectedEvent;
