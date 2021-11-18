import React, { createContext, useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";
import "firebase/database";
import "firebase/storage";
import { useList, useObject } from "react-firebase-hooks/database";
import fbinit from "../../../../helpers/fbinit";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button, Spinner } from "reactstrap";
import styles from "./style.module.css"

//init firebase
const db = fbinit.database();
const storage = fbinit.storage().ref();

// Create Context
export const LocalContext = createContext([]);
const userid = localStorage.getItem("userId");

const DeleteButton = ({ unikid }) => {
	const [toggle, setToggle] = useState(false);
	const displayToggle = () => {
		setToggle((prevState) => !prevState);
	};

	function removeTask() {
		var query = db.ref(`users/${userid}/sites`).orderByKey();
		query.once("value").then(function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				const data = childSnapshot.val();
				var pkey = childSnapshot.key;
				//check if remove this child
				if (childSnapshot.val().id === unikid) {
					db.ref(`users/${userid}/sites/${pkey}`).remove();
				}
			});
		});
	}
	return (
		<div>
			<Button onClick={displayToggle} size={"sm"} className={"ml-2"}>
				Delete
			</Button>
			<MDBContainer>
				<MDBModal
					size="lg"
					isOpen={toggle}
					toggle={displayToggle}
					centered={true}
				>
					<MDBModalHeader toggle={displayToggle}>
						Delete Site
					</MDBModalHeader>
					<MDBModalBody>
						<center className="container-popup">
							<div className={styles.text}>Anda Yakin Untuk Menghapus Site ini?</div>
							<Row>
								<Col xs={{size: 4, offset: 2}}>
									<Button
										color=""
										className={styles.btn_nope}
										onClick={displayToggle}
									>
										Tidak
									</Button>
								</Col>
								<Col xs="4">
									<Button
										color=""
										className={styles.btn_confirm}
										onClick={removeTask}
									>
										Ya
									</Button>
								</Col>
							</Row>
						</center>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		</div>
	);
};


//Provider Components
export const LocalProvider = ({ children }) => {
	const [selectedVendor, setSelectedVendor] = React.useState([]);
	const [allBatch, setAllBatch] = React.useState([]);
	const [allDataBatch, setAllDataBatch] = useState([]);
	const [allSiteMap, setAllSiteMap] = useState([]);
	const batchRef = db.ref(`users/${userid}/basicbatch`);
	const sitesRef = db.ref(`users/${userid}/sites`);
	const invitationRef = db.ref(`users/${userid}/invitation`);
	const adminBatchDocRef = storage.child(`${userid}/doc/batchdoc.pdf`);
	const adminBatchDoc = storage.child(`${userid}/doc`);

	const [sites, loadingSites, errorSites] = useList(sitesRef);
	const [invitation, loadingInvitation, errorInvitation] = useList(
		invitationRef
	);
	const [batchinfo, loadingBatch, errorBatch] = useObject(batchRef);

	const siteList = sites.map((data) => {
		return { ...data.val(), act: <DeleteButton unikid={data.val().unikid} /> };
	});

	const invitedVendor = invitation.map((data) => {
		return { ...data.val() };
	});

	const basicBatchInfo = () => {
		if (batchinfo) {
			if (!batchinfo.val()) {
				updateBatchInfoField("tipe", "Non-VIP");
			}
			return batchinfo.val();
		}
	};

	const setInvitationList = (e) => {
		const data = selectedVendor;
		if(e.target.checked === false){
			setSelectedVendor(prevState => {
				let data = [...prevState];
				data = data.filter(i => i !== e.target.value);
				return data
			})
		} else if (e.target.checked === true) {
			setSelectedVendor(prevState => {
				let data = [...prevState];
				data.push(e.target.value)
				return data;
			})
		}
	}

	const updateBatchInfoField = (field, data) => {
		const ref = db.ref(`users/${userid}/basicbatch/${field}`);
		return ref.set(data);
	};

	const mapRef = useRef(null);

	return (
		<LocalContext.Provider
			value={{
				db,
				siteList,
				basicBatchInfo: basicBatchInfo(),
				sitesRef,
				batchRef,
				updateBatchInfoField,
				adminBatchDocRef,
				adminBatchDoc,
				allBatch,
				allDataBatch,
				invitationRef,
				invitedVendor,
				allSiteMap,
				mapRef,
				setSelectedVendor,
				setInvitationList,
				selectedVendor,
			}}
		>
			{children}
		</LocalContext.Provider>
	);
};
