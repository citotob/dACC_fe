import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBNavLink,
	MDBNav,
	MDBNavItem,
	MDBTabContent,
	MDBTabPane,
} from "mdbreact";
import { Col, Row, Input, Button } from "reactstrap";
import { SketchPicker } from "react-color";

export default function ModalColorChange(props) {
	//handle change tab
	const [selectType, setSelectType] = useState("");
	const [selectData, setSelectData] = useState("");
	const [modalColorRL, setModalColorRL] = useState(false);
	const [modalColorFO, setModalColorFO] = useState(false);
	const [modalColorVSAT, setModalColorVSAT] = useState(false);

	const handleSubmit = () => {
		// if (selectType === "" && selectData === "") {
		// 	alert("SelectType dan Select Data tidak boleh kosong");
		// } else if (selectType === "") {
		// 	alert("Select Type tidak boleh kosong");
		// } else if (selectData === "") {
		// 	alert("Select Data tidak boleh kosong");
		// } else {
		// alert(`SelectType: ${selectType} SelectData: ${selectData}`);
		// }
		props.toggleColorChange();
	};

	const handleCancel = () => {
		props.toggleColorChange();
	};

	const customStyle = {
		borderBottom: "2px solid #E7883A",
		color: "#E7883A",
	};
	const containerCSS = {
		width: "40vw",
	};
	return (
		<MDBContainer>
			<MDBModal
				size="md"
				isOpen={props.modalColorChange}
				toggle={props.toggleColorChange}
				fullHeight={true}
				centered={true}
			>
				<MDBModalHeader toggle={props.toggleColorChange}>
					{/* ADD DUMMY SITE */}
				</MDBModalHeader>
				<MDBModalBody>
					<div className="container">
						<Row className="mt-3 mx-2">
							<span className="mb-1">Select Type</span>
							<Input
								type="text"
								placeholder="Select"
								onChange={(e) => {
									setSelectType(e.target.value);
								}}
							/>
						</Row>
						<Row className="mt-3 mx-2">
							<span className="mb-1">Select Data</span>
							<Input
								type="text"
								placeholder="Select"
								onChange={(e) => {
									setSelectData(e.target.value);
								}}
							/>
						</Row>
						<Row className="mt-3 mx-2">
							<span className="mb-1">Recommended Color</span>
						</Row>
						<Row className="mt-1 mx-2">
							{props.type === "RL" ? (
								<div className="mt-1 d-flex justify-content-center">
									<label
										style={{
											backgroundColor: props.RLColor,
											width: "30px",
											height: "30px",
											borderRadius: "5px",
										}}
										className="my-auto"
									/>
									<a
										href="#"
										onClick={() => {
											setModalColorRL(!modalColorRL);
										}}
										className="ml-3 my-auto text-dark"
									>
										<u>Choose Color</u>
									</a>
								</div>
							) : props.type === "FO" ? (
								<div className="mt-1 d-flex justify-content-center">
									<label
										style={{
											backgroundColor: props.FOColor,
											width: "30px",
											height: "30px",
											borderRadius: "5px",
										}}
										className="my-auto"
									/>
									<a
										href="#"
										onClick={() => {
											setModalColorFO(!modalColorFO);
										}}
										className="ml-3 my-auto text-dark"
									>
										<u>Choose Color</u>
									</a>
								</div>
							) : (
								<div className="mt-1 d-flex justify-content-center">
									<label
										style={{
											backgroundColor: props.VSATColor,
											width: "30px",
											height: "30px",
											borderRadius: "5px",
										}}
										className="my-auto"
									/>
									<a
										href="#"
										onClick={() => {
											setModalColorVSAT(!modalColorVSAT);
										}}
										className="ml-3 my-auto text-dark"
									>
										<u>Choose Color</u>
									</a>
								</div>
							)}
						</Row>

						{modalColorRL && (
							<SketchPicker
								color={props.RLColor}
								onChangeComplete={(color) => {
									props.setRLColor(color.hex);
									// props.changeColorPointRL(color.hex);
								}}
							/>
						)}
						{modalColorFO && (
							<SketchPicker
								color={props.FOColor}
								onChangeComplete={(color) => {
									props.setFOColor(color.hex);
									// props.changeColorPointFO(color.hex);
								}}
							/>
						)}
						{modalColorVSAT && (
							<SketchPicker
								color={props.VSATColor}
								onChangeComplete={(color) => {
									props.setVSATColor(color.hex);
									// props.changeColorPointVSAT(color.hex);
								}}
							/>
						)}
						<Row className="mt-5">
							<Col lg={6} className="d-flex justify-content-center">
								<Button
									style={{
										backgroundColor: "#C4C4C4",
										border: "solid #C4C4C4",
										borderRadius: "5px",
										width: "80%",
									}}
									onClick={handleCancel}
								>
									<span style={{ color: "white", fontWeight: "bold" }}>
										Cancel
									</span>
								</Button>
							</Col>
							<Col lg={6} className="d-flex justify-content-center">
								<Button
									style={{
										backgroundColor: "#073030",
										border: "solid black",
										borderRadius: "5px",
										borderWidth: "1px",
										width: "80%",
									}}
									onClick={handleSubmit}
								>
									<span style={{ color: "white", fontWeight: "bold" }}>
										Add
									</span>
								</Button>
							</Col>
						</Row>
					</div>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
}
