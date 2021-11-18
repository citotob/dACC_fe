import React from "react";
import { Row, Col } from "reactstrap";
import SMVTable from "../../../components/Vendor/SiteMatchmaking/Table/TableBatch";

const SiteMatchmakingVendor = (props) => {
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<SMVTable/>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default SiteMatchmakingVendor;
