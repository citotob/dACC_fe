import React, { useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
// import { LocalContext } from "../LocalContext";

// react styled component
const Swatch = styled.div`
  padding: 5px,
  background: #fff,
  borderRadius: 1px,
  boxShadow: 0 0 0 1px rgba(0,0,0,.1),
  display: inline-block,
  cursor: pointer,`;
const Color = styled.div`
	width: 20rem;
	height: 14px;
	borderradius: 2px;
	background: ${(props) => props.color};
`;
const Popover = styled.div`
	position: absolute;
	z-index: 2;
`;
const Cover = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
`;

// react class component
const ColorSwatch = ({ layerName, changeColor, color }) => {
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const handleClick = () => setDisplayColorPicker(!displayColorPicker);
	const handleChange = (color) => changeColor(color.hex);

	return (
		<>
			<Swatch onClick={handleClick}>
				<Color color={color} />
			</Swatch>
			{displayColorPicker ? (
				<Popover>
					<Cover onClick={handleClick} />
					<SketchPicker color={color} onChange={handleChange} />
				</Popover>
			) : null}
		</>
	);
};

ColorSwatch.defaultProps = {
	color: {
		color: "#808080",
		set: (input) => alert(input),
		layer: "#000000",
	},
};

export default ColorSwatch;
