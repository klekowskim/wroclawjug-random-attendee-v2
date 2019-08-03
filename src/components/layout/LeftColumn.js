import React from "react";
import PropTypes from "prop-types";
import "./LeftColumn.css";

function LeftColumn({ children }) {
	return (
		<div className="LeftColumn">
			{children}
		</div>
	);
}

LeftColumn.propTypes = {
	children: PropTypes.node.isRequired
};

export default LeftColumn;
