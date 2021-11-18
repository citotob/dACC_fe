import React, { useState } from "react";
import { Card, CardTitle, Row, Col } from "reactstrap";

// COMPONENTS
import CardLayer from "./CardLayer";
// import CardAreaPotensial from "./CardAreaPotensial";

export default function CardExploreData(props) {
	//handle change tab
	const [activeTab, setActiveTab] = useState("1");
	// const handleChangeTab = (tab) => {
	// 	setActiveTab(tab);
	// };
	props.setActiveTab(activeTab);

	// const tabStyle = {
	// 	color: "#c42127",
	// };
	// const customStyle = {
	// 	border: "1px solid #073030",
	// 	borderRadius: "20px",
	// 	backgroundColor: "#F1F8FF",
	// 	color: "#19324A",
	// };
	const containerCSS = {
		width: "30vw",
		fontSize: "12px",
	};

	return (
		<div style={containerCSS}>
			<Row>
				{/* <Button onClick={()=>{props.changeBasemap()}}/> */}
				<Col lg={7}>
					<Card
						body
						style={{
							// backgroundColor: "#f2f2f2",
							borderRadius: "10px",
							margin: "2px",
						}}
					>
						<CardTitle
							className="text-center"
							style={{ fontSize: "20px", color: "#073030" }}
						>
							EXPLORE DATA
						</CardTitle>
						<Row>
							<CardLayer
								addLayerRL={props.actionRL}
								addLayerFO={props.actionFO}
								addLayerVSAT={props.actionVSAT}
								removeLayer={props.reaction}
								addLayerDummy={props.actionDummy}
								removeLayerDummy={props.reactionDummy}
								removeLayerFO={props.reactionFO}
								removeLayerVSAT={props.reactionVSAT}
								showLayer={props.showLayer}
								hideLayer={props.hideLayer}
								changeColorPointRL={props.changeColorPointRL}
								changeColorPointFO={props.changeColorPointFO}
								changeColorPointVSAT={props.changeColorPointVSAT}
								setDummy={props.setDummy}
								setLongLat={props.setLongLat}
							/>
							{/* <Row>
							<MDBNav className="container-fluid" classicTabs>
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
							</MDBNav>

							<MDBTabContent activeItem={activeTab} className="mx-auto mt-3">
								<MDBTabPane tabId="1">
									{activeTab === "1" && (
										<CardLayer
											addLayerRL={props.actionRL}
											addLayerFO={props.actionFO}
											addLayerVSAT={props.actionVSAT}
											removeLayer={props.reaction}
											addLayerDummy={props.actionDummy}
											removeLayerDummy={props.reactionDummy}
											removeLayerFO={props.reactionFO}
											removeLayerVSAT={props.reactionVSAT}
											showLayer={props.showLayer}
											hideLayer={props.hideLayer}
											changeColorPointRL={props.changeColorPointRL}
											changeColorPointFO={props.changeColorPointFO}
											changeColorPointVSAT={props.changeColorPointVSAT}
											setDummy={props.setDummy}
											setLongLat={props.setLongLat}
										/>
									)}
								</MDBTabPane>
								<MDBTabPane tabId="2">
									{activeTab === "2" && <CardAreaPotensial />}
								</MDBTabPane>
							</MDBTabContent>
						</Row> */}
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
