import React from "react";
import { Row, Col } from "reactstrap";

import DetailBatch from "../../../components/Vendor/SiteMatchmaking/StepWizard";
import SMVTablePenawaran from "../../../components/Vendor/SiteMatchmaking/Table/TablePenawaran";

const SiteMatchmakingVendorPenawaran = (props) => {
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<DetailBatch />
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default SiteMatchmakingVendorPenawaran;
