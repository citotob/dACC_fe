import React from "react";
import { Row, Col } from "reactstrap";
import styles from "./usermanagement.module.css";
// import VendorPerformanceTable from "../../../components/Admin/VendorPerformance/Table";
import UserManagementTable from "../../../components/Admin/UserManagement/Table";

const UserManagementAdmin = (props) => {
	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						{/* <Col className="col-12"> */}
						<Col className="col-12">
							{/* <center>userManagementTable</center> */}
							{/* <VendorPerformanceTable /> */}
							<UserManagementTable />
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default UserManagementAdmin;
