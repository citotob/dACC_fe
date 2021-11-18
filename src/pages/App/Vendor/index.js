import React from "react";
import { Container } from "reactstrap";
// import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

const Dashboard = (props) => {
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>KONTEN HERE</Container>
			</div>
		</React.Fragment>
	);
};

export default withNamespaces()(Dashboard);
