import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./styles.css";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	Row,
	Col,
	Spinner,
} from "reactstrap";
import {
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
} from "mdbreact";
import SimpleBar from "simplebar-react";
import moment from "moment";
import { connect } from "react-redux";
import { getDatasNotif } from "../../../store/data/action";
import ListNotif from "./ListNotif";
//API
import API from "../../../services";

// import dummy from "../Data/notifDummy.json"

const Notification = (props) => {
	const [menu, setMenu] = useState(false);
	const [data, setData] = useState([]);
	let [dataClicked, setDataClicked] = useState([]);
	let [dataNotClicked, setDataNotClicked] = useState([]);
	const [newNotif, setNewNotif] = useState("");
	let oldNotifGet = localStorage.getItem("oldNotif");
	let iduser = localStorage.getItem("userId");
	let oldNotif = oldNotifGet !== null ? oldNotifGet.split(",") : null;

	const getNotif = () => {
		setData(props.data);
		setDataClicked(props.dataClicked);
		setDataNotClicked(props.dataNotClicked);
		if (props.data) {
			setNewNotif(props.data[0]?.id);
		}
	};
	useEffect(() => {
		getNotif();
		return () => {};
	}, [props.dataClicked, props.dataNotClicked, props.data]);

	const handleNotif = () => {
		if (props.data.length !== 0) {
			localStorage.setItem("oldNotif", props.data[0].id + "," + iduser);
		}
	};

	const ceknotif = window.localStorage.getItem("notif");

	const NotifUnclickedLength = (props) => {
		let { dataNotClicked } = props;
		if(typeof data !== "undefined"){
			if (data.length !== 0) {
				if (oldNotifGet !== null) {
					if (dataNotClicked !== 0) {
						return (
							<span className="badge badge-danger badge-pill">
								{dataNotClicked ? dataNotClicked : 0}
							</span>
						);
					} else {
						return <div />;
					}
				} else {
					//condition if no new notif and dataNotClicked more than 1
					if (dataNotClicked !== 0) {
						return (
							<span className="badge badge-danger badge-pill">
								{dataNotClicked ? dataNotClicked : 0}
							</span>
						);
					} else {
						return <div />;
					}
				}
			} else {
				if (dataNotClicked !== 0) {
					return (
						<span className="badge badge-danger badge-pill">
							{dataNotClicked ? dataNotClicked : 0}
						</span>
					);
				} else {
					return <div />;
				}
			}
		}
	};

	return (
		<Dropdown
			isOpen={menu}
			toggle={() => setMenu(!menu)}
			className="dropdown d-inline-block"
			tag="li"
		>
			<DropdownToggle
				className="btn header-item noti-icon waves-effect"
				tag="button"
				id="page-header-notifications-dropdown"
				// onClick={manipulationBadges}
				onClick={() => {
					handleNotif();
				}}
			>
				{data.length !== 0 ? (
					props.data !== undefined &&
					ceknotif !==
						(props
							? props.data[0]
								? props.data[0]._id
									? ""
									: ""
								: ""
							: "") ? (
						<i className="bx bx-bell bx-tada"></i>
					) : (
						<i className="bx bx-bell"></i>
					)
				) : (
					<div />
				)}
				{dataNotClicked.length !== 0 && (
					<NotifUnclickedLength
						dataNotClicked={
							dataNotClicked.length !== 0 ? dataNotClicked.length : 0
						}
					/>
				)}
			</DropdownToggle>

			<DropdownMenu className="dropdown-menu dropdown-menu-lg p-0" right>
				<div className="p-3">
					<Row className="align-items-center">
						<Col>
							{/* <h6 className="m-0"> {props.t("Notifications")} </h6> */}
							<h6 className="m-0"> Notification </h6>
						</Col>
						{/* <div className="col-auto">
								<a href="#!" className="small">
									{" "}
									View All
								</a>
							</div> */}
					</Row>
				</div>

				<SimpleBar style={{ height: "230px" }}>
					<ListNotif
						data={data}
						dataClicked={dataClicked}
						dataNotClicked={dataNotClicked}
						setDataClicked={setDataClicked}
						setDataNotClicked={setDataNotClicked}
						setNewNotif={setNewNotif}
					/>
				</SimpleBar>
				{/* <div className="p-2 border-top">
						<Link
							className="btn btn-sm btn-link font-size-14 btn-block text-center"
							to="#"
						>
							{" "}
							{props.t("View all")}{" "}
						</Link>
					</div> */}
			</DropdownMenu>
		</Dropdown>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { getDatasNotif })(
	withRouter(Notification)
);
