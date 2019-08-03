import React from "react";
import Auth from "./components/auth/Auth";
import ApiProvider from "./components/api/ApiProvider";
import Content from "./components/content/Content";

function App() {
	return (
		<Auth>
			<ApiProvider>
				<Content />
			</ApiProvider>
		</Auth>
	);
}

export default App;
