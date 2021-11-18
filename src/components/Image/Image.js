import React from "react";

const Image = (props) => {
	return (
		<>
			<div className={"fadeInAnimation"}>
				<img src={props.source} alt={props.alt} />
			</div>
		</>
	);
};

export default Image;
