import React, { useState, useContext, useEffect } from "react";
import {
	Card,
	CardTitle,
	Row,
	Col,
	Collapse,
	CardBody,
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from "reactstrap";
import {
	MDBContainer,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBTable,
	MDBTableBody,
	MDBTableHead,
	MDBModal,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardHeader,
} from "mdbreact";
import style from "../style.module.css";
import AddDummySite from "./AddDummySite";
// import SearchGeo from "./SearchGeocoding";

// ASSETS
import iconDown from "../../../../assets/images/back.png";

// CONTEXT
import { LocalContext } from "../LocalContext";
import {
	flyToPointZoom,
	resetZoom,
	drawGeoPointFilter,
	removeGeoPointFilter,
} from "../Map/maphelper";

import API from "../../../../services";

import "./style.css";

export default function CardExploreData(props) {
	const [activeTab, setActiveTab] = useState(props.tab);
	const [zoomLongLatKabKot, setZoomLongLatKabKot] = useState("");
	const [zoomLongLatKecamatan, setZoomLongLatKecamatan] = useState("");

	//PROVINCE
	const [listProvince, setListProvince] = useState([]);
	const [titleProvince, setTitleProvince] = useState("");
	const [idProvince, setIdProvince] = useState("");

	// DROPDOWN PROVINCE
	const [dropdownProvinceCond, setDropdownProvinceCond] = useState(false);
	const toggleDropdownProvince = () =>
		setDropdownProvinceCond((prevState) => !prevState);

	//KABUPATEN KOTA
	const [listKabKot, setListKabKot] = useState([]);
	const [titleKabKot, setTitleKabKot] = useState("");
	const [idKabKot, setIdKabKot] = useState("");

	// DROPDOWN KabKot
	const [dropdownKabKotCond, setDropdownKabKotCond] = useState(false);
	const toggleDropdownKabKot = () =>
		setDropdownKabKotCond((prevState) => !prevState);

	// LOCAL CONTEXT
	const {
		layerList,
		potensialList,
		mapRef,
		showDataODP,
		setShowDataODP,
		dataTitik,
		setFilterTable,
	} = useContext(LocalContext);

	// KECAMATAN
	const [listKecamatan, setListKecamatan] = useState([]);
	const [titleKecamatan, setTitleKecamatan] = useState("");
	// DROPDOWN KECAMATAN
	const [dropdownKecamatanCond, setDropdownKecamatanCond] = useState(false);
	const toggleDropdownKecamatan = () =>
		setDropdownKecamatanCond((prevState) => !prevState);

	// MODAL FILTER LOKASI
	const [ModalFilterLokasi, setModalFilterLokasi] = useState(false);
	const toggleModalFilterLokasi = () =>
		setModalFilterLokasi((prevState) => !prevState);

	const handleChangeTab = (tab) => {
		setActiveTab(tab);
		setShowDataODP(false);
		props.setTab(tab);
	};
	// setActiveTab(activeTab);
	const header = [
		{
			label: "",
			field: "visibility",
		},
		{
			label: " ",
			field: "layer",
			minimal: "lg",
			class: "text-muted",
		},
		{
			label: "",
			field: "edit",
			minimal: "sm",
		},
		{
			label: "",
			field: "table",
			minimal: "sm",
		},
	];

	const [col1, setcol1] = useState(true);
	const [checkedPenduduk, setCheckedPenduduk] = useState(false);
	const [checkedAI, setCheckedAI] = useState(false);
	const [checkedBTS, setCheckedBTS] = useState(false);
	const [bpsStatus, setBpsStatus] = useState(false);
	// const [dataTitikStatus, setDataTitikStatus] = useState(false);

	// const [dataTitik, setDataTitik] = useState([]);
	// const [loadingDataTitik, setLoadingDataTitik] = useState(true);

	const [buttonOK, setbuttonOK] = useState(false);

	useEffect(() => {
		API.getDataBTS()
			.then((res) => {
				if (res.data.success) {
					setBpsStatus(true);
				} else {
					setBpsStatus(false);
				}
			})
			.catch((err) => {
				setBpsStatus(false);
			});

		API.getProvinsi()
			.then((res) => {
				if (res.data.success) {
					setListProvince(res.data.data);
				} else {
					setListProvince([{ id: "1", name: "Tidak Ada Data" }]);
				}
			})
			.catch((err) => {
				setListProvince([{ id: "1", name: "Terjadi Kesalahan" }]);
			});

		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, []);

	// DROPDOWN FILTER BERDASARKAN KABUPATEN KOTA
	useEffect(() => {
		setTitleKabKot("");
		setFilterTable("");
		setZoomLongLatKabKot("");
		if (idProvince) {
			API.getKabupatenKota(idProvince)
				.then((res) => {
					if (res.data.success) {
						setListKabKot(res.data.data);
					} else {
						setListKabKot([{ id: "1", name: "Tidak Ada Data" }]);
					}
				})
				.catch((err) => {
					setListKabKot([{ id: "1", name: "Terjadi Kesalahan" }]);
				});
		}

		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, [titleProvince]);

	// DROPDOWN FILTER BERDASARKAN KECAMATAN
	useEffect(() => {
		setTitleKecamatan("");
		setZoomLongLatKecamatan("");
		if (idKabKot) {
			API.getKecamatan(idKabKot)
				.then((res) => {
					if (res.data.success) {
						setListKecamatan(res.data.data);
					} else {
						setListKecamatan([{ id: "1", name: "Tidak Ada Data" }]);
					}
				})
				.catch((err) => {
					setListKecamatan([{ id: "1", name: "Terjadi Kesalahan" }]);
				});
		}

		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, [titleKabKot]);

	const showLayer = () => {
		if (
			checkedPenduduk === true &&
			checkedAI === false &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukLayer",
				"visibility",
				"visible"
			);
		} else if (
			checkedPenduduk === false &&
			checkedAI === true &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranInternetLayer",
				"visibility",
				"visible"
			);
		} else if (
			checkedPenduduk === false &&
			checkedAI === false &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranBTSLayer",
				"visibility",
				"visible"
			);
		} else if (
			checkedPenduduk === true &&
			checkedAI === true &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"visible"
			);
		} else if (
			checkedPenduduk === true &&
			checkedAI === false &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanBTSLayer",
				"visibility",
				"visible"
			);
		} else if (
			checkedPenduduk === false &&
			checkedAI === true &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"visible"
			);
		} else if (
			checkedPenduduk === true &&
			checkedAI === true &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"visible"
			);
		}
	};
	const hideLayer = () => {
		// ALL CONDITION CHECKBOX UNCHECKED HIDE ALL LAYER
		if (
			checkedPenduduk === false &&
			checkedAI === false &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranInternetLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
		// CONDITION CHECKBOX PENDUDUK UNCHECKED, AI, BTS CHECKED. HIDE LAYER PENDUDUK AND LAYER PENDUDUK&AI
		else if (
			checkedPenduduk === false &&
			checkedAI === true &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
		// CONDITION CHECKBOX PENDUDUK & BTS CHECKED, AI UNCHECKED. HIDE LAYER AI, PENDUDUK & AI
		else if (
			checkedPenduduk === true &&
			checkedAI === false &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranInternetLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
		// CONDITION CHECKBOX PENDUDUK CHECKED, AI, BTS UNCHECKED. HIDE LAYER BTS, AI, PENDUDUK & AI
		else if (
			checkedPenduduk === true &&
			checkedAI === false &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranInternetLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
		// CONDITION CHECKBOX AI CHECKED, PENDUDUK, BTS UNCHECKED. HIDE LAYER BTS, PENDUDUK, PENDUDUK & AI
		else if (
			checkedPenduduk === false &&
			checkedAI === true &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
		// CONDITION CHECKBOX BTS CHECKED, PENDUDUK, AI UNCHECKED. HIDE LAYER AI, PENDUDUK, PENDUDUK & AI
		else if (
			checkedPenduduk === false &&
			checkedAI === false &&
			checkedBTS === true
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranInternetLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanAILayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
		// CONDITION CHECKBOX PENDUDUK & AI CHECKED, BTS UNCHECKED. HIDE LAYER BTS.
		else if (
			checkedPenduduk === true &&
			checkedAI === true &&
			checkedBTS === false
		) {
			mapRef.current.state.map.setLayoutProperty(
				"pointSebaranBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointAIDanBTSLayer",
				"visibility",
				"none"
			);
			mapRef.current.state.map.setLayoutProperty(
				"pointPendudukAIBTSLayer",
				"visibility",
				"none"
			);
		}
	};

	const onSubmitShowCheck = () => {
		if (checkedPenduduk === true || checkedAI === true || checkedBTS === true) {
			showLayer();
		}
		if (
			checkedPenduduk === false ||
			checkedAI === false ||
			checkedBTS === false
		) {
			if (mapRef) {
				if (mapRef.current) {
					if (mapRef.current.state.map) {
						hideLayer();
					}
				}
			}
		}
	};

	const dropdownProvince = () => {
		return (
			<ButtonDropdown
				style={{ minWidth: "100%" }}
				isOpen={dropdownProvinceCond}
				toggle={toggleDropdownProvince}
			>
				<DropdownToggle
					style={{
						backgroundColor: "#F8F9FA",
						borderRadius: "5px",
						borderColor: "#2C3280",
						paddingTop: "4px",
						paddingBottom: "4px",
					}}
				>
					<div
						style={{
							color: "#2C3280",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>{titleProvince === "" ? "Provinsi" : titleProvince}</span>
						<img src={iconDown} />
					</div>
				</DropdownToggle>
				<DropdownMenu
					style={{ maxHeight: "300px", minWidth: "100%", overflowY: "auto" }}
				>
					{listProvince.map((e, i) => (
						<DropdownItem
							key={i}
							onClick={() => {
								setTitleProvince(e.name);
								setIdProvince(e.id);
							}}
						>
							{e.name}
						</DropdownItem>
					))}
				</DropdownMenu>
			</ButtonDropdown>
		);
	};

	const dropdownKabKot = () => {
		return (
			<ButtonDropdown
				style={{ minWidth: "100%" }}
				isOpen={dropdownKabKotCond}
				toggle={toggleDropdownKabKot}
				disabled={!idProvince}
			>
				<DropdownToggle
					style={{
						backgroundColor: "#F8F9FA",
						borderRadius: "5px",
						borderColor: "#2C3280",
						paddingTop: "4px",
						paddingBottom: "4px",
					}}
				>
					<div
						style={{
							color: "#2C3280",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>{titleKabKot === "" ? "Kabupaten/Kota" : titleKabKot}</span>
						<img src={iconDown} />
					</div>
				</DropdownToggle>
				<DropdownMenu
					style={{ maxHeight: "300px", minWidth: "100%", overflowY: "auto" }}
				>
					{listKabKot.map((e, i) => (
						<DropdownItem
							key={i}
							onClick={() => {
								setTitleKabKot(e.name);
								setIdKabKot(e.id);
								setZoomLongLatKabKot(e.longlat.coordinates);
							}}
						>
							{e.name}
						</DropdownItem>
					))}
				</DropdownMenu>
			</ButtonDropdown>
		);
	};

	const dropdownKecamatan = () => {
		return (
			<ButtonDropdown
				style={{ minWidth: "100%" }}
				isOpen={dropdownKecamatanCond}
				toggle={toggleDropdownKecamatan}
				disabled={!idKabKot}
			>
				<DropdownToggle
					style={{
						backgroundColor: "#F8F9FA",
						borderRadius: "5px",
						borderColor: "#2C3280",
						paddingTop: "4px",
						paddingBottom: "4px",
					}}
				>
					<div
						style={{
							color: "#2C3280",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>{titleKecamatan === "" ? "Kecamatan" : titleKecamatan}</span>
						<img src={iconDown} />
					</div>
				</DropdownToggle>
				<DropdownMenu
					style={{ maxHeight: "300px", minWidth: "100%", overflowY: "auto" }}
				>
					{listKecamatan.kength === 0 ? (
						<DropdownItem>Tidak Ada Data</DropdownItem>
					) : (
						listKecamatan.map((e, i) => (
							<DropdownItem
								key={i}
								onClick={() => {
									setTitleKecamatan(e.name);
									if (e.longlat) {
										setZoomLongLatKecamatan(e.longlat.coordinates);
									} else {
										setZoomLongLatKecamatan("");
									}
								}}
							>
								{e.name}
							</DropdownItem>
						))
					)}
				</DropdownMenu>
			</ButtonDropdown>
		);
	};

	const handleZoom = (longlat) => {
		if (!zoomLongLatKabKot) {
			return alert("Kabupaten/Kota Belum Dipilih");
		} else {
			if (showDataODP && dataTitik && titleKabKot) {
				if (dataTitik.length !== 0) {
					if (zoomLongLatKecamatan) {
						setTimeout(() => {
							flyToPointZoom(mapRef, longlat, "kecamatan");
						}, 300);
						drawGeoPointFilter(mapRef, dataTitik, titleKecamatan, "kecamatan");
						// setFilterTable(titleKecamatan);
						setFilterTable({ lokasi: titleKecamatan, type: "kec" });
					} else {
						setTimeout(() => {
							flyToPointZoom(mapRef, longlat, "kabupaten");
						}, 300);
						drawGeoPointFilter(mapRef, dataTitik, titleKabKot, "kabupaten");
						setFilterTable({ lokasi: titleKabKot, type: "kab" });
						// setFilterTable(titleKabKot);
					}
				}
			}
			toggleModalFilterLokasi();
			props.fnReset();
		}
	};

	const handleResetFilter = () => {
		resetZoom(mapRef);
		setIdProvince("");
		setIdKabKot("");
		setTitleProvince("");
		setTitleKabKot("");
		setFilterTable("");
		setTitleKecamatan("");
		setZoomLongLatKabKot("");
		setZoomLongLatKecamatan("");
		setbuttonOK(false);
		removeGeoPointFilter(mapRef);
	};

	const ModalProvince = () => {
		return (
			<MDBContainer>
				<MDBModal
					// id="modal-content-detail"
					isOpen={ModalFilterLokasi}
					toggle={toggleModalFilterLokasi}
					size="lg"
					// className="modal-xl"
					centered={true}
				>
					<MDBCard>
						<MDBCardHeader>
							<MDBCardTitle className="text-center">PILIH LOKASI</MDBCardTitle>
						</MDBCardHeader>
						<MDBCardBody>
							<Row className="my-5">
								<Col>{dropdownProvince()}</Col>
								<Col>{dropdownKabKot()}</Col>
								<Col
									lg="1"
									className="d-flex align-items-center justify-content-center"
								>
									atau
								</Col>
								<Col>{dropdownKecamatan()}</Col>
							</Row>
							<div className="text-center my-5">
								<Row className="px-5">
									<Col style={{ display: "flex", justifyContent: "flex-end" }}>
										<Button
											onClick={() => {
												handleZoom(
													zoomLongLatKecamatan
														? zoomLongLatKecamatan
														: zoomLongLatKabKot
												);
												setbuttonOK(true);
											}}
											style={{ minWidth: "50%" }}
											className=" button-pilih-lokasi-ok"
										>
											<span style={{ color: "white" }}>Filter</span>
										</Button>
									</Col>
									<Col
										style={{ display: "flex", justifyContent: "flex-start" }}
									>
										<Button
											onClick={toggleModalFilterLokasi}
											style={{ minWidth: "50%" }}
											className="button-pilih-lokasi-cancel"
										>
											<span style={{ color: "#073030" }}>Cancel</span>
										</Button>
									</Col>
								</Row>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBModal>
			</MDBContainer>
		);
	};

	const customStyle = {
		border: "1px solid #073030",
		borderRadius: "20px",
		backgroundColor: "#F1F8FF",
		color: "#19324A",
	};
	return (
		<div className={style.toolbox}>
			{/* <Card> */}
			{ModalProvince()}
			<Card style={{ maxHeight: "54vh", overflowY: "auto" }}>
				<CardBody>
					<CardTitle>
						<div
							onClick={() => {
								setcol1(!col1);
							}}
							className={style.toolboxheader}
						>
							<span>DATA EXPLORER</span>
							<i
								className={`mdi ${
									!col1
										? "mdi-arrow-down-bold-box"
										: "mdi-arrow-up-bold-box-outline"
								}`}
							/>
						</div>
					</CardTitle>
					<Collapse isOpen={col1}>
						<Row>
							<MDBNav className="container-fluid" classicTabs>
								<Col md={12} lg={5}>
									<MDBNavItem>
										<MDBNavLink
											link
											to="#"
											active={activeTab === "1"}
											onClick={() => handleChangeTab("1")}
											className="text-center font-weight-bold py-0"
											style={
												activeTab === "1" ? customStyle : { color: "#19324A" }
											}
										>
											Layer
										</MDBNavLink>
									</MDBNavItem>
								</Col>
								<Col md={12} lg={7}>
									<MDBNavItem>
										<MDBNavLink
											link
											to="#"
											active={activeTab === "2"}
											onClick={() => handleChangeTab("2")}
											className="text-center font-weight-bold py-0"
											style={
												activeTab === "2" ? customStyle : { color: "#19324A" }
											}
										>
											Area Potensial
										</MDBNavLink>
									</MDBNavItem>
								</Col>
							</MDBNav>

							<MDBTabContent activeItem={activeTab} className="mx-auto">
								<MDBTabPane tabId="1">
									{activeTab === "1" && (
										<>
											{showDataODP ? (
												<>
													<MDBTable
														id="tb-toolbox"
														responsive
														borderless
														className={"text-left"}
													>
														<MDBTableHead columns={header} />
														<MDBTableBody rows={layerList} />
													</MDBTable>
												</>
											) : (
												""
											)}
											{/* <SearchGeo /> */}
										</>
									)}
								</MDBTabPane>
								<MDBTabPane tabId="2">
									{activeTab === "2" && (
										<>
											{bpsStatus ? (
												<>
													<MDBTable
														responsive
														borderless
														className={"text-left"}
													>
														<MDBTableHead columns={header} />
														<div>
															<div className="d-flex align-items-center">
																<input
																	type="checkbox"
																	onChange={(e) =>
																		setCheckedPenduduk(e.target.checked)
																	}
																	checked={checkedPenduduk}
																	className="mr-5 my-2"
																/>
																Kepadatan Penduduk
															</div>
															<div className="d-flex align-items-center">
																<input
																	type="checkbox"
																	onChange={(e) =>
																		setCheckedAI(e.target.checked)
																	}
																	checked={checkedAI}
																	className="mr-5 my-2"
																/>
																Sebaran Titik Akses Internet
															</div>
															<div className="d-flex align-items-center">
																<input
																	type="checkbox"
																	onChange={(e) =>
																		setCheckedBTS(e.target.checked)
																	}
																	checked={checkedBTS}
																	className="mr-5 my-2"
																/>
																Sebaran Titik BTS
															</div>
														</div>
													</MDBTable>
													<div className="text-center">
														<Button
															onClick={onSubmitShowCheck}
															style={{
																borderRadius: "10px",
																padding: "2px 10px 2px 10px",
																backgroundColor: "#073030",
															}}
														>
															Check
														</Button>
													</div>
												</>
											) : (
												""
											)}
											{/* <SearchGeo /> */}
										</>
									)}
								</MDBTabPane>
							</MDBTabContent>
						</Row>
						{/* <Row className="justify-content-center"> */}
						{activeTab === "1" &&
							(showDataODP ? (
								<div>
									<div className="text-center mb-3">
										<Row>
											{buttonOK ? (
												<Col lg="12">
													<Button
														className="button-pilih-lokasi-reset-zoom"
														onClick={() => {
															handleResetFilter();
														}}
													>
														Reset Filter
													</Button>
												</Col>
											) : (
												<Col lg="12">
													<Button
														className="button-pilih-lokasi-zoom"
														onClick={toggleModalFilterLokasi}
													>
														{/* {titleProvince === ""
															? "Perbesar Provinsi"
															: titleProvince} */}
														Filter Lokasi
													</Button>
												</Col>
											)}
										</Row>
									</div>
									<AddDummySite setLongLat={props.setLongLat} />
								</div>
							) : (
								""
							))}
						{/* </Row> */}
					</Collapse>
				</CardBody>
			</Card>
		</div>
	);
}
