/** @jsx jsx */
import React from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/core";
import { Button, ShadowBox } from "../layout";

const style = {
	form: {
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center"
	},
	innerBox: {
		padding: 32
	},
	formGroup: {
		display: "flex",
		alignItems: "center",
		padding: "16px 0",
		"> label": {
			flex: 1,
		},
		"> input": {
			flex: 1
		}
	}
};

class ClientForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rememberMe: false
		}
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { rememberMe } = this.state;

		this.props.onSubmit({ rememberMe })
	};

	onRememberMeChange = (event) => {
		this.setState({ rememberMe: event.target.checked });
	};

	render() {
		const { rememberMe } = this.state;

		return (
			<div css={style.form}>
				<form onSubmit={this.onSubmit} autoComplete="off">
					<ShadowBox>
						<div css={style.innerBox}>
							<p>First you must log in with your meetup account</p>

							<div css={style.formGroup}>
								<label htmlFor="rememberMe">
									Remember me
								</label>

								<input
									type="checkbox"
									id="rememberMe"
									name="rememberMe"
									checked={rememberMe}
									onChange={this.onRememberMeChange} />
							</div>

							<Button type="submit">Log in</Button>
						</div>
					</ShadowBox>
				</form>
			</div>
		);
	}
}

ClientForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default ClientForm;
