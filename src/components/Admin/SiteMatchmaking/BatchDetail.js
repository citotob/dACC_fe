import React, { useEffect } from "react";
import {
	Row,
	Col,
	CardBody,
	Nav,
	NavItem,
	NavLink,
	Card,
	TabPane,
	TabContent,
} from "reactstrap";
import { useLocation, useParams } from "react-router-dom";
import classnames from "classnames";
import SiteList from "./Table/SiteList";
import Map from "./Map/MapPage";

const BatchDetail = (props) => {
	let { id, judul } = useParams();
	// const location = useLocation();
	// const id = location.state.params;
	const [activeTab, setactiveTab] = React.useState("1");

	function toggle(tab) {
		if (activeTab !== tab) {
			setactiveTab(tab);
		}
	}

	return (
		<>
			<Row>
				<Col lg={12}>
					<Card>
						<CardBody>
							<Nav tabs>
								<NavItem>
									<NavLink
										style={{ cursor: "pointer" }}
										className={classnames({
											active: activeTab === "1",
										})}
										onClick={() => {
											toggle("1");
										}}
									>
										Table View
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										style={{ cursor: "pointer" }}
										className={classnames({
											active: activeTab === "2",
										})}
										onClick={(e) => {
											// toggle("2");
											alert("Sedang dalam maintenance");
											e.preventDefault();
										}}
									>
										Map View
									</NavLink>
								</NavItem>
							</Nav>

							<TabContent activeTab={activeTab}>
								<TabPane tabId="1" className="p-3">
									<Row>
										<Col sm="12">
											<SiteList batch_id={id} judul={judul} />
										</Col>
									</Row>
								</TabPane>
								<TabPane tabId="2" className="p-3">
									<Row>
										<Col sm="12" style={{ minHeight: "80vh" }}>
											{/* <Map batch_id={id} judul={judul} activeTab={activeTab} /> */}
										</Col>
									</Row>
								</TabPane>
							</TabContent>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default BatchDetail;
