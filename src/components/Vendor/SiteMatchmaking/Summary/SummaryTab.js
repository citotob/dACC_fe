import React from "react";
import {
	Row,
	Col,
	CardBody,
	CardTitle,
	CardSubtitle,
	Nav,
	NavItem,
	NavLink,
	Card,
	TabPane,
	TabContent,
	CardText,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import TableSummary from "../Table/TableSummary";
import MapSummary from "../Map/MapPageSummary";

const SummaryTab = (props) => {
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
											<TableSummary />
										</Col>
									</Row>
								</TabPane>
								<TabPane tabId="2" className="p-3">
									<Row>
										<Col sm="12" style={{ minHeight: "80vh" }}>
											{/* <MapSummary activeTab={activeTab} /> */}
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

export default SummaryTab;
