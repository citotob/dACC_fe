import React from "react";
import { Row, Col } from "reactstrap";
import AddBatch from "../../../components/Admin/SiteMatchmaking/StepWizardAddBatch";

const BuatBatch = (props) => {
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<AddBatch />
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default BuatBatch;
