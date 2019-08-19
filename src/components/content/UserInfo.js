// @flow
/** @jsx jsx */
import * as React from "react";
import injectAuth from "../auth/InjectAuth";
import injectApi from "../api/injectApi";
import type { User } from "../api/Api";
import Api from "../api/Api";
import { jsx } from "@emotion/core";
import { Button, ShadowBox } from "../layout";

type Props = {
	auth: Object,
	api: Api
};

type State = {
	user: ?User
};

const style = {
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	photo: {
		maxWidth: 36,
		maxHeight: 36,
		marginRight: 10
	},
	name: {
		flex: "1 0 0",
	}
};

class UserInfo extends React.Component<Props, State> {

	constructor(props) {
		super(props);
		this.state = {
			user: null
		};
	}

	componentDidMount(): void {
		this.props.api.getLoggedUserProfile()
			.then((user) => {
				this.setState({ user })
			});
	}

	logOut = () => {
		this.props.auth.logOut();
	};

	render() {
		const { user } = this.state;
		if (user === null || user === undefined) {
			return null;
		}

		return (
			<ShadowBox css={style.container}>
				<img src={user.photo.thumb_link} alt="Logged user" css={style.photo} />
				<div css={style.name}>{user.name}</div>

				<Button type="danger" onClick={this.logOut}>Log out</Button>
			</ShadowBox>
		);
	}
}

export default injectAuth(injectApi(UserInfo));
