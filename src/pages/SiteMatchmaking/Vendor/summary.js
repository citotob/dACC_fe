import React from "react";
import { Row, Col } from "reactstrap";
import SummaryTab from "../../../components/Vendor/SiteMatchmaking/Summary/SummaryTab"

const SiteMatchmakingVendorSummary = (props) => {
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<SummaryTab />
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default SiteMatchmakingVendorSummary;
