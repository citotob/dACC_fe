import React from "react";
import { Row, Col } from "reactstrap";
import ExploreData from "../../../components/Admin/ExploreData";
import Map from "../../../components/Map/MapBasic";
// import Header from "../../../components/HorizontalLayout/CustomHeaderExe";
import Header from "../../../components/VerticalLayout/Header";
import Navbar from "../../../components/HorizontalLayout/CustomNavbar";

const ExploreDataExecutive = (props) => {
	return (
		<>
			<div className="container-fluid">
				<Header />
			</div>
			<ExploreData />
		</>
	);
};

export default ExploreDataExecutive;
