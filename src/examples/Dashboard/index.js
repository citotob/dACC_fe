import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	CardBody,
	CardTitle,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Media,
	Table,
} from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withNamespaces } from "react-i18next";

const Dashboard = (props) => {
	const [modal, setmodal] = useState(false);

	const reports = [
		{ title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },

		{ title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
		{
			title: "Average Price",
			iconClass: "bx-purchase-tag-alt",
			description: "$16.2",
		},
	];
	const email = [
		{ title: "Week", linkto: "#", isActive: false },
		{ title: "Month", linkto: "#", isActive: false },
		{ title: "Year", linkto: "#", isActive: true },
	];

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>KONTEN HERE</Container>
			</div>
		</React.Fragment>
	);
};

export default withNamespaces()(Dashboard);
