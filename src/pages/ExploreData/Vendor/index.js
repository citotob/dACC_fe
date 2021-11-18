import React from "react";
import { Row, Col } from "reactstrap";
import ExploreData from "../../../components/Vendor/ExploreData";
// import Header from "../../../components/HorizontalLayout/CustomHeaderVendor";
import Header from "../../../components/VerticalLayout/Header";
import Navbar from "../../../components/HorizontalLayout/CustomNavbar";

const ExploreDataAdmin = (props) => {
	return (
		<>
			<div className="container-fluid">
				<Header />
			</div>
			<ExploreData />
		</>
	);
};

export default ExploreDataAdmin;
