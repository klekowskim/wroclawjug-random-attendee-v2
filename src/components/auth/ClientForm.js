import React from "react";
import PropTypes from "prop-types";
import "./ClientForm.css";

class ClientForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			clientId: "",
			clientSecret: ""
		}
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { clientId, clientSecret } = this.state;

		this.props.onSubmit({ clientId, clientSecret })
	};

	onClientIdChange = (event) => {
		this.setState({ clientId: event.target.value });
	};

	onClientSecretChange = (event) => {
		this.setState({ clientSecret: event.target.value });
	};

	render() {
		const { clientId, clientSecret } = this.state;

		return (
			<div className="ClientForm">
				<form onSubmit={this.onSubmit} autoComplete="off">
					<div className="form-group">
						<label htmlFor="clientId">Client id</label>
						<input
							type="text"
							id="clientId"
							name="clientId"
							value={clientId}
							onChange={this.onClientIdChange}
							data-lpignore="true" />
					</div>

					<div className="form-group">
						<label htmlFor="clientSecret">Client secret</label>
						<input
							type="password"
							id="clientSecret"
							name="clientSecret"
							value={clientSecret}
							onChange={this.onClientSecretChange}
							data-lpignore="true" />
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
