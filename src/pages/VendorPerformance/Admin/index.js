import React from "react";
import { Row, Col } from "reactstrap";
import VendorPerformanceTable from "../../../components/Admin/VendorPerformance/Table";

const VendorPerformancePage = (props) => {
	// console.log('vendorPerformance')
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<VendorPerformanceTable />
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default VendorPerformancePage;
