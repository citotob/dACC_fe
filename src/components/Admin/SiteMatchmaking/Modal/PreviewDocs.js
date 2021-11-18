import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import "./style.css";

const ModalPreviewDoc = ({ modalDoc, toggleModalDoc, dataModalDoc }) => {
	let urlDok = dataModalDoc;
	return (
		<MDBContainer>
			<MDBModal
				size="lg"
				// className="modal-xl"
				isOpen={modalDoc}
				toggle={toggleModalDoc}
				centered={true}
			>
				<MDBModalHeader centered toggle={toggleModalDoc}>
					<p>DOKUMEN PENUNJANG</p>
					{/* <p className="textSubTitle">{dataModalDoc}</p> */}
				</MDBModalHeader>
				<MDBModalBody>
					{/* {`${process.env.REACT_APP_BE_URL}${urlDok}`} */}
					<iframe
						src={`${process.env.REACT_APP_BE_URL}/${urlDok}`}
						target="_top"
						className="iframe_doc"
						frameborder="0"
						allowFullScreen
					></iframe>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
};

export default ModalPreviewDoc;
