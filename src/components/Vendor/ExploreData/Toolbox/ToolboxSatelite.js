import React, { useState, useContext } from "react";
import { Card, CardTitle, Row, Col, Collapse, CardBody } from "reactstrap";
import {
	MDBContainer,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBDataTable,
	MDBTable,
	MDBTableBody,
	MDBTableHead,
} from "mdbreact";
import style from "../style.module.css";
import { LocalContext } from "../LocalContext";
import AddDummySite from "./AddDummySite";
import SearchGeo from "./SearchGeocoding";

export default function CardExploreData(props) {
	const [activeTab, setActiveTab] = useState("1");
	const handleChangeTab = (tab) => {
		setActiveTab(tab);
	};
	// setActiveTab(activeTab);
	const header = [
		{
			label: "",
			field: "visibility",
		},
		{
			label: " ",
			field: "layer",
			minimal: "lg",
			class: "text-muted",
		},
		{
			label: "",
			field: "edit",
			minimal: "sm",
		},
		{
			label: "",
			field: "table",
			minimal: "sm",
		},
	];
	const { layerList } = useContext(LocalContext);
	const [col1, setcol1] = useState(true);

	const customStyle = {
		border: "1px solid #073030",
		borderRadius: "20px",
		backgroundColor: "#F1F8FF",
		color: "#19324A",
	};
	return (
		<div className={style.toolbox}>
			{/* <Card> */}
			<Card style={{ maxHeight: "54vh", overflowY: "auto" }}>
				<CardBody>
					<CardTitle>
						<div
							onClick={() => {
								setcol1(!col1);
							}}
							className={style.toolboxheader}
						>
							<span>DATA EXPLORER</span>
							<i
								className={`mdi ${
									!col1
										? "mdi-arrow-down-bold-box"
										: "mdi-arrow-up-bold-box-outline"
								}`}
							/>
						</div>
					</CardTitle>
					<Collapse isOpen={col1}>
						<Row>
							{/* <MDBNav className="container-fluid" classicTabs>
								<Col md={12} lg={5}>
									<MDBNavItem>
										<MDBNavLink
											link
											to="#"
											active={activeTab === "1"}
											onClick={() => handleChangeTab("1")}
											className="text-center font-weight-bold"
											style={
												activeTab === "1" ? customStyle : { color: "#19324A" }
											}
										>
											Layer
										</MDBNavLink>
									</MDBNavItem>
								</Col>
								<Col md={12} lg={7}>
									<MDBNavItem>
										<MDBNavLink
											link
											to="#"
											active={activeTab === "2"}
											onClick={() => handleChangeTab("2")}
											className="text-center font-weight-bold"
											style={
												activeTab === "2" ? customStyle : { color: "#19324A" }
											}
										>
											Area Potensial
										</MDBNavLink>
									</MDBNavItem>
								</Col>
							</MDBNav> */}

							{/* <MDBTabContent activeItem={activeTab} className="mx-auto">
								<MDBTabPane tabId="1">
									{activeTab === "1" && (
										<> */}
							<MDBTable responsive borderless className={"text-left"}>
								<MDBTableHead columns={header} />
								<MDBTableBody rows={layerList} />
							</MDBTable>
							{/* <SearchGeo /> */}
							{/* </>
									)}
								</MDBTabPane>
							</MDBTabContent> */}
						</Row>
						{/* <Row className="justify-content-center">
							<AddDummySite setLongLat={props.setLongLat} />
						</Row> */}
					</Collapse>
				</CardBody>
			</Card>
		</div>
	);
}
