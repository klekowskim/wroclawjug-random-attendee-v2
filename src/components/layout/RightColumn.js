import React from "react";
import PropTypes from "prop-types";
import "./RightColumn.css";

function RightColumn({ children }) {
	return (
		<div className="RightColumn">
			{children}
		</div>
	);
}

RightColumn.propTypes = {
	children: PropTypes.node.isRequired
};

export default RightColumn;
