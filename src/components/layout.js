import styled from "@emotion/styled";

export const Container = styled.div({
	display: "flex",
	flexDirection: "row",
	height: "100%"
});

export const LeftColumn = styled.div({
	flex: "1 0 0",
	padding: 10,
	"> :not(:last-child)": {
		marginBottom: 10
	}
});

export const RightColumn = styled.div({
	flex: "3 0 0",
	padding: 10
});

export const ShadowBox = styled.div({
	background: "#ffffff",
	borderRadius: 4,
	padding: 5,
	boxShadow: "0 0px 5px rgba(0,0,0,0.12)"
});

export const Button = styled.button({
	borderRadius: 4,
	fontSize: 12,
	lineHeight: 1.2,
	padding: "6px 12px",
	fontWeight: 800,
	boxShadow: "none",
	backgroundColor: "#548C2F",
	borderWidth: 2,
	borderColor: "transparent",
	color: "#ffffff",
	cursor: "pointer"
}, props => {
	if (props.type === "primary") {
		return { backgroundColor: "#548C2F" };
	} else if (props.type === "secondary") {
		return { backgroundColor: "#FFD449" };
	} else if (props.type === "danger") {
		return { backgroundColor: "#DF2935" };
	}
});
