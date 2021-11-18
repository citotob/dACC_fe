import React from "react";

const EditButton = ({ onClick }) => {
	return (
		<svg
			style={{ cursor: "pointer" }}
			onClick={onClick}
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10 1.85629L8.22857 0L0.742857 7.24551L0 9.7006L0.228571 10L2.85714 9.34132L10 1.85629Z"
				fill="#19324A"
			/>
		</svg>
	);
};

export default EditButton;
