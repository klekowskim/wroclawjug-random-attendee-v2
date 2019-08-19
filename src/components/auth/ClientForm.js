import React from "react";
import PropTypes from "prop-types";
import "./ClientForm.css";

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
			<div className="ClientForm">
				<form onSubmit={this.onSubmit} autoComplete="off">

					<p>Click button below to log in with your meetup account</p>

					<div className="form-group">
						<label htmlFor="clientSecret">Remember me</label>
						<input
							type="checkbox"
							id="rememberMe"
							name="rememberMe"
							checked={rememberMe}
							onChange={this.onRememberMeChange} />
					</div>

					<button type="submit">Log in</button>
				</form>
			</div>
		);
	}
}

ClientForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default ClientForm;
