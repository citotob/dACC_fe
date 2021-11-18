import React from "react";
import { Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import BatchDetailTab from "../../../components/Admin/SiteMatchmaking/BatchDetail";

const BatchDetail = (props) => {
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<BatchDetailTab />
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default BatchDetail;
