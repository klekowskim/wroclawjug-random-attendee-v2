import React from "react";
import Auth from "./components/auth/Auth";
import ApiProvider from "./components/api/ApiProvider";
import Content from "./components/content/Content";
import { Global } from "@emotion/core"

const globalStyles = {
	body: {
		margin: 0,
		fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
			"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
			sans-serif`
	}
};

function App() {
	return (
		<React.Fragment>
			<Global styles={globalStyles} />
			<Auth>
				<ApiProvider>
					<Content />
				</ApiProvider>
			</Auth>
		</React.Fragment>
	);
}

export default App;
