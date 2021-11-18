import React from "react";
import {
	Card,
	CardImg,
	CardText,
	div,
	CardTitle,
	CardSubtitle,
	Button,
	Col,
	Row,
} from "reactstrap";

// IMG
import exploredata from "../../../assets/images/dashboardVendor/exploredata.png";
import faq from "../../../assets/images/dashboardVendor/faq.png";
import sitematchmaking from "../../../assets/images/dashboardVendor/sitematchmaking.png";

export default function CardFitur() {
	return (
		<div className="container text-center">
			<Row>
				<Col sm="12" md="4">
					<a className="text-dark" href="/vendor/explore-data">
						<Card style={{ border: "solid 1px", borderColor: "#D6D6D6" }}>
							<div
								style={{
									height: "240px",
									borderBottom: "solid 1px",
									borderColor: "#ECBB30",
								}}
							>
								<CardImg
									top
									width="100%"
									src={exploredata}
									alt="explore data"
								/>
							</div>

							<div className="my-2">
								<CardTitle>Explore Data</CardTitle>
							</div>
						</Card>
					</a>
				</Col>
				<Col sm="12" md="4">
					<a className="text-dark" href="/vendor/site-matchmaking">
						<Card style={{ border: "solid 1px", borderColor: "#D6D6D6" }}>
							<div
								style={{
									height: "240px",
									borderBottom: "solid 1px",
									borderColor: "#ECBB30",
								}}
							>
								<CardImg
									top
									width="100%"
									src={sitematchmaking}
									alt="site matchmaking"
								/>
							</div>
							<div className="my-2">
								<CardTitle>Site matchmaking</CardTitle>
							</div>
						</Card>
					</a>
				</Col>
				<Col sm="12" md="4">
					<a className="text-dark" href="/vendor/faq">
						<Card style={{ border: "solid 1px", borderColor: "#D6D6D6" }}>
							<div
								style={{
									height: "240px",
									borderBottom: "solid 1px",
									borderColor: "#ECBB30",
								}}
							>
								<CardImg top width="100%" src={faq} alt="faq" />
							</div>
							<div className="my-2">
								<CardTitle>FAQ</CardTitle>
							</div>
						</Card>
					</a>
				</Col>
			</Row>
		</div>
	);
}
