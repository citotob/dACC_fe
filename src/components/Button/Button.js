import React, { useState } from "react";
import styled from "styled-components";

const BasicButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-radius: 2px;
	height: max-content;
	width: max-content;
	transition: 0.5s;
	padding: 0.5rem 2rem;
	box-shadow: ${(props) => (props.hover ? "0px 3px 10px 0px grey" : "none")};
	color: ${(props) =>
		props.affirmative
			? "white"
			: props.fontcolor
			? props.fontcolor
			: "#19324A"};
	background-color: ${(props) =>
		props.affirmative ? "#19324A" : props.color ? props.color : "white"};
`;

const Button = ({ affirmative, name, onClick, size }) => {
	const [hover, setHover] = useState(false);
	const toggle = () => setHover(!hover);
	return (
		<>
			<BasicButton
				affirmative={affirmative}
				hover={hover}
				onClick={onClick}
				style={{ width: "100%" }}
				onMouseEnter={toggle}
				onMouseLeave={toggle}
			>
				<span>{name}</span>
			</BasicButton>
		</>
	);
};

Button.defaultProps = {
	affirmative: false,
	onClick: () => console.log("BUTTON CLICKED"),
};

export default Button;
