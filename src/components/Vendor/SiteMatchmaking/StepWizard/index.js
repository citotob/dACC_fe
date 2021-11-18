import React, { useState, useContext, useEffect, useCallback } from "react";
import {
	Row,
	Col,
	Card,
	CardBody,
	TabContent,
	TabPane,
	NavItem,
	NavLink,
	Label,
	Input,
	FormGroup,
	Progress,
	UncontrolledTooltip,
	Spinner,
} from "reactstrap";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import { LocalContext, LocalProvider } from "../LocalContext";
// import { RecordBatchToDB } from "./helper"; //Use from local index.js because there's an error when use history inside the helper.js
import Summary from "./summary";
import TabPenawaran from "../StepWizard/Tab";
import styles from "./style.module.css";
import API from "../../../../services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDoc } from "../../../../store/actions";
import ModalBantuan from "../Modal/ModalBantuan";

//todo
// validator
// import { ValidateInput } from "../../../Common/ValidateInput"

const FormWizard = (props) => {
	let dispatch = useDispatch();
	let { id } = useParams();
	const userid = localStorage.getItem("userId");
	var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
	const siteListA = sitesData.map((data) => {
		return { ...data };
	});

	// console.log("sitelistA", siteListA.length);
	// const [docUrl, setDocUrl] = useState("");
	// const [docUpload, setDocUpload] = useState("");
	const docUpload = useSelector(
		(state) => state.dataReducer.dataDocUpload.data
	);

	useEffect(() => {}, [docUpload]);
	const [isLoading, setIsLoading] = useState(false);
	const [tblePenawaran, setTblePenawaran] = useState("");
	// const {
	//  // db,
	//  siteList,
	//  basicBatchInfo,
	//  sitesRef,
	//  batchRef,
	//  // updateBatchInfoField,
	//  // vendorBatchDocRef,
	//  // vendorBatchDoc,
	// } = useContext(LocalContext);

	// useEffect(() => {
	//  vendorBatchDoc.listAll().then(function (res) {
	//      if (res.items.length !== 0) {
	//          vendorBatchDocRef
	//              .getDownloadURL()
	//              .then((data) => {
	//                  setDocUrl(data);
	//              })
	//              .catch((error) => console.log("NO UPLOADED BATCH DOC"));
	//      }
	//  });
	// }, [docUrl]);

	const [tanggalAwal, setTanggalAwal] = useState("");
	const [minTanggalAkhir, setMinTanggalAkhir] = useState("");

	const [today, setToday] = useState("");
	const history = useHistory();
	const [activeTabProgress, setactiveTabProgress] = useState(1);
	const [progressValue, setprogressValue] = useState(0);

	const [responsed, setResponsed] = useState(false);
	const [error, setError] = useState({
		ns: "",
	});

	function handleChange(e) {
		switch (e.target.name) {
			case "ns":
				localStorage.setItem("nomorSuratRespon", e.target.value);
				// updateBatchInfoField("nomorSuratRespon", e.target.value);
				break;
			case "mw":
				localStorage.setItem("material_warehouse", e.target.value);
				// updateBatchInfoField("nomorSuratRespon", e.target.value);
				break;
			case "mp":
				localStorage.setItem("material_packing", e.target.value);
				// updateBatchInfoField("nomorSuratRespon", e.target.value);
				break;
			case "md":
				localStorage.setItem("material_delivery", e.target.value);
				// updateBatchInfoField("nomorSuratRespon", e.target.value);
				break;
		}
	}

	const checkInput = async (nsr) => {
		let result = await API.postCheckRFIVendor({ rfi: nsr })
			.then((res) => {
				if (res.data.success === true) {
					setError((prev) => ({ ...prev, ns: "" }));
					return true;
				} else if (res.data.success === false) {
					setError((prev) => ({ ...prev, ns: "Nomor Surat RFI sudah Ada" }));
					return false;
				}
			})
			.catch((res) => {
				setError((prev) => ({ ...prev, ns: "Nomor Surat RFI sudah Ada" }));
				return false;
			})
			.finally((res) => {
				return false;
			});

		return result;
	};

	const tabChangeCondition = async (activeTabProgress) => {
		const taV = localStorage.getItem("tanggalAwalVendor");
		const tiV = localStorage.getItem("tanggalAkhirVendor");
		const nsr = localStorage.getItem("nomorSuratRespon");
		// console.log("no surat response", nsr);
		var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
		const siteListA = sitesData.map((data) => {
			return { ...data };
		});

		if (activeTabProgress === 1) {
			// console.log("siteListA)", siteListA.length);
			// console.log("tblePenawaran", tblePenawaran);
			if (siteListA.length === 0) {
				alert("Harap isi Penawaran");
				return false;
			} else {
				return true;
			}
		} else if (activeTabProgress === 2) {
			// console.log("responsed nih", responsed);
			if (responsed) {
				return true;
			} else {
				//null
				if (nsr === null) {
					alert(`Harap isi Surat Respon RFI`);
					return false;
				}
				//empty
				else if (nsr === "") {
					alert(`Harap lengkapi Surat Respon RFI`);
					return false;
				}
				if (nsr !== nsr) {
					alert("Nomor Surat yang anda masukan sudah ada!");
					return false;
				} else {
					let res = await checkInput(nsr);
					if (res) {
						return true;
					} else {
						return false;
					}
				}
			}
		} else {
			return true;
		}
	};

	const progressChangeCondition = (activeTabProgress) => {
		const taV = localStorage.getItem("tanggalAwalVendor");
		const tiV = localStorage.getItem("tanggalAkhirVendor");
		const nsr = localStorage.getItem("nomorSuratRespon");
		const mw = localStorage.getItem("material_warehouse");
		const mp = localStorage.getItem("material_packing");
		const md = localStorage.getItem("material_delivery");
		var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
		const siteListA = sitesData.map((data) => {
			return { ...data };
		});
		if (activeTabProgress === 1) {
			if (siteListA.length === 0) {
				return false;
			} else {
				return true;
			}
		} else if (activeTabProgress === 1) {
			// console.log(responsed)
			if (responsed) {
				return true;
			} else {
				if (taV === null || tiV === null || nsr === null) {
					return false;
				} else if (
					taV === "" ||
					tiV === "" ||
					nsr === "" ||
					typeof docUpload !== "object"
				) {
					return false;
				} else {
					return true;
				}
			}
		} else {
			return true;
		}
	};

	const isBasicBatchInfoSaved = () => {
		var a = localStorage.getItem("nomorSuratRespon");
		var b = localStorage.getItem("tanggalAwalVendor");
		var c = localStorage.getItem("tanggalAkhirVendor");

		if (a === null || b === null || c === null || !docUpload) {
			alert(`Lengkapi Data Terlebih Dahulu`);
			return false;
		}
		if (a === "" || b === "" || c === "" || !docUpload) {
			alert(`Lengkapi Data Terlebih Dahulu`);
			return false;
		}
		if (a === a) {
			alert("test1");
			// alert('Nomor Surat yang anda masukan sudah ada!');
			return false;
		} else {
			return true;
		}
	};

	const toggleTabProgress = async (tab) => {
		if (activeTabProgress !== tab) {
			if (responsed) {
				// console.log('hahaha',responsed)
				if (tab >= 1 && tab <= 2) {
					if (activeTabProgress < tab) {
						let check = await tabChangeCondition(activeTabProgress);
						if (!check) {
							return;
						}
					}
					setactiveTabProgress(tab);
				}
			} else {
				if (tab >= 1 && tab <= 3) {
					if (activeTabProgress < tab) {
						let check = await tabChangeCondition(activeTabProgress);
						if (!check) {
							return;
						}
					}
					setactiveTabProgress(tab);
				}
			}
		}
		// if (activeTabProgress !== tab) {
		// 	if (tab >= 1 && tab <= 3) {
		// 		// PENGECEKAN BUAT NEXT TAB/WIZARD JIKA DATA TERISI MAKA NEXT
		// 		if (isBasicBatchInfoSaved()) {
		// 			setactiveTabProgress(tab);
		// 		}

		// 		if (tab === 1) {
		// 			setprogressValue(33.3);
		// 		}
		// 		if (tab === 2) {
		// 			// PENGECEKAN BUAT NEXT TAB/WIZARD JIKA DATA TERISI MAKA PROGRESS VALUE JADI 40%
		// 			if (isBasicBatchInfoSaved()) {
		// 				setprogressValue(66,6);
		// 			}
		// 		}
		// 		if (tab === 3) {
		// 			setprogressValue(100);
		// 		}
		// 		// if (tab === 4) {
		// 		// 	setprogressValue(80);
		// 		// }
		// 		// if (tab === 5) {
		// 		// 	setprogressValue(100);
		// 		// }
		// 	}
		// }
	};

	// async function checkResponse() {
	//  const role = window.localStorage.getItem("companyId");
	//  API.getVendorApp(role, id)
	//      .then((res) => {
	//          console.log(res)
	//          if (res.data.values.length === 0) {
	//              setResponsed(false);
	//          } else {
	//              setResponsed(true);
	//          }
	//      })
	//      .catch((err) => {
	//          console.log(err);
	//      });
	// }

	useEffect(() => {
		if (activeTabProgress === 1) {
			setprogressValue(0);
		}
		if (activeTabProgress === 2) {
			if (progressChangeCondition()) {
				if (responsed) {
					setprogressValue(100);
				} else {
					setprogressValue(50);
				}
			}
		}
		if (activeTabProgress === 3) {
			if (progressChangeCondition()) {
				setprogressValue(100);
			}
		}
	}, [activeTabProgress]);

	useEffect(() => {
		if (tanggalAwal !== "") {
			setMinTanggalAkhir(moment(tanggalAwal).format("YYYY-MM-DD"));
		}
	}, [tanggalAwal]);

	//Record Data (Helper)
	async function RecordBatchToDB(batch, sites, doc) {
		const userid = localStorage.getItem("userId");
		// const taV = localStorage.getItem("tanggalAwalVendor");
		// const tiV = localStorage.getItem("tanggalAkhirVendor");
		const nsr = localStorage.getItem("nomorSuratRespon");
		var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
		const siteListA = sitesData.map((data) => {
			return { ...data };
		});

		let Condition = "";
		let count = 0;

		async function postSite() {
			for (let i of siteListA) {
				await API.postVendorPenawaran({
					siteid: i.siteid,
					batchid: i.batchid,
					vendorid: i.vendorid,
					teknologi: i.teknologi,
					tanggal_mulai: i.tanggal_awal_penawaran + " 00:00:00",
					tanggal_selesai: i.tanggal_akhir_penawaran + " 23:59:59",
					harga_perangkat: i.harga_perangkat,
					harga_instalasi: i.harga_instalasi,
					harga_om: i.harga_om,
					userfrom: userid,
					tim: i.team, ///add this
				})
					.then((res) => {
						if (res.data.success === true) {
							count = count + 1;
						} else {
							alert("Nomor Surat Respon RFI Sudah Ada");
						}
					})
					.catch((err) => {
						// console.log(err);
						return "FAIL";
					});
			}
			// console.log(count + "==" + siteListA.length)
			if (count === siteListA.length) {
				return "SUCCESS";
			} else {
				return "FAIL";
			}
		}

		// if (responsed) {
		//  if (siteListA.length > 0) {
		//      await postSite().then((res => {
		//          Condition = "SUCCESS"
		//      })).catch((err => {
		//          Condition = "FAIL"
		//      }))
		//      return Condition;
		//  }else {
		//      return "EMPTY"
		//  }
		// } else {
		if (
			// taV === null ||
			// tiV === null ||
			nsr === null &&
			siteListA.length === 0
		) {
			return "EMPTY";
		} else if (
			// taV === "" ||
			// tiV === "" ||
			nsr === "" ||
			(typeof docUpload !== "object" && siteListA.length === 0)
		) {
			return "EMPTY";
		} else {
			// let tanggalAwalPost = moment(taV).format("YYYY-MM-DD 00:00:00");
			// let tanggalAkhirPost = moment(tiV).format("YYYY-MM-DD 23:59:59");

			var bodyFormData = new FormData();
			bodyFormData.append("batch", id);
			// bodyFormData.append("tanggal_mulai_sla", tanggalAwalPost);
			// bodyFormData.append("tanggal_selesai_sla", tanggalAkhirPost);
			bodyFormData.append("doc", docUpload);
			bodyFormData.append("rfi_no", nsr);
			bodyFormData.append("userid", userid);

			await API.postVendorRespon(bodyFormData)
				.then((res) => {
					if (res.data.success === true) {
						Condition = "SUCCESS";
					} else {
						Condition = "FAIL";
					}
				})
				.catch((err) => {
					// console.log(err);
					Condition = "FAIL";
				});
			if (Condition === "SUCCESS") {
				// console.log("ajsdoiasodha aisdoahsdoa ohasodaoda");
				// console.log(siteListA);
				await postSite().then((res) => {
					// console.log(res)
					Condition = res;
				});
			} else {
				Condition = "FAIL";
			}
			return Condition;
		}
		return Condition;
	}
	// }

	// modal bantuan (bawaan upload document)
	let [modalBantuan, setModalBantuan] = useState(false);
	const showModalBantuan = () => {
		setModalBantuan(true);
	};
	const closeModalBantuan = () => {
		setModalBantuan(false);
	};
	const toggleModalBantuan = () => {
		setModalBantuan(!modalBantuan);
	};

	return (
		<Col lg="12">
			<ModalBantuan
				modalBantuan={modalBantuan}
				showModalBantuan={showModalBantuan}
				closeModalBantuan={closeModalBantuan}
				toggleModalBantuan={toggleModalBantuan}
			/>
			<Card>
				<CardBody>
					<div id="progrss-wizard" className="twitter-bs-wizard">
						<ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
							<NavItem
								style={{
									display: "flex",
									justifyContent: "flex-end",
									alignItems: "center",
								}}
							>
								<NavLink
									className={classnames({
										active: activeTabProgress === 1,
									})}
									onClick={() => {
										toggleTabProgress(1);
									}}
								>
									<span
										className="step-number mr-2"
										style={{
											backgroundColor:
												activeTabProgress === 1 ? "#F99746" : "#C4C4C4",
											color: activeTabProgress === 1 ? "#19324A" : "white",
											border: "1px solid #19324A",
										}}
									>
										1
									</span>
									<span
										style={{
											color: activeTabProgress === 1 ? "#F99746" : "#19324A",
										}}
									>
										PENAWARAN
									</span>
								</NavLink>
							</NavItem>
							<NavItem
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<NavLink
									className={classnames({
										active: activeTabProgress === 2,
									})}
									onClick={() => {
										toggleTabProgress(2);
									}}
								>
									<span
										className="step-number mr-2"
										style={{
											backgroundColor:
												activeTabProgress === 2 ? "#F99746" : "#C4C4C4",
											color: activeTabProgress === 2 ? "#19324A" : "white",
											border: "1px solid #19324A",
										}}
									>
										2
									</span>
									<span
										style={{
											color: activeTabProgress === 2 ? "#F99746" : "#19324A",
										}}
									>
										SURAT RESPON RFI
									</span>
								</NavLink>
							</NavItem>
							<NavItem
								style={{
									display: "flex",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<NavLink
									className={classnames({
										active: activeTabProgress === 3,
									})}
									onClick={() => {
										toggleTabProgress(3);
									}}
								>
									<span
										className="step-number mr-2"
										style={{
											backgroundColor:
												activeTabProgress === 3 ? "#F99746" : "#C4C4C4",
											color: activeTabProgress === 3 ? "#19324A" : "white",
											border: "1px solid #19324A",
										}}
									>
										3
									</span>
									<span
										style={{
											color: activeTabProgress === 3 ? "#F99746" : "#19324A",
										}}
									>
										SUMMARY
									</span>
								</NavLink>
							</NavItem>
						</ul>

						<div id="bar" className="mt-4">
							<Progress
								color="success"
								striped
								animated
								value={progressValue}
							/>
							<div className="progress-bar bg-success progress-bar-striped progress-bar-animated"></div>
						</div>
						<TabContent
							activeTab={activeTabProgress}
							className="twitter-bs-wizard-tab-content"
						>
							<TabPane tabId={1}>
								<TabPenawaran setTblePenawaran={setTblePenawaran} />
							</TabPane>
							<TabPane tabId={2}>
								<div>
									<div className={"d-flex justify-content-start"}>
										<Col lg="12">
											<Row>
												<Col lg="12">
													<FormGroup>
														<Label for="basicpill-firstname-input14">
															Nomor Surat Respon RFI
														</Label>
														<Input
															type="text"
															className="form-control"
															name="ns"
															placeholder="Nomor Surat Respon RFI"
															onChange={handleChange}
															defaultValue={localStorage.getItem(
																"nomorSuratRespon"
															)}
														/>
														{error.ns !== "" && (
															<div
																style={{
																	color: "red",
																	fontSize: "12px",
																	paddingTop: "5px",
																}}
															>
																{error.ns}
															</div>
														)}
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col lg="12">
													<FormGroup>
														<Label for="basicpill-firstname-input14">
															Unggah Surat Penawaran RFI{" "}
															<span
																id="tooltipHelp"
																className="mdi mdi-help-circle-outline"
																style={{ cursor: "pointer" }}
																onClick={() => showModalBantuan()}
															/>
															<UncontrolledTooltip
																placement="right"
																target="tooltipHelp"
															>
																klik untuk membuka bantuan
															</UncontrolledTooltip>
														</Label>
														<Input
															type="file"
															className="form-control"
															name="dokumen"
															accept="application/pdf"
															onChange={(e) => {
																// console.log("file", e.target.files[0])
																dispatch(getDoc(e.target.files[0]));
															}}
															style={{
																display: "flex",
																justifyItems: "center",
																alignItems: "center",
																height: "43px",
															}}
														/>
													</FormGroup>
												</Col>
											</Row>
											{/* <Row>
												<Col lg="12">
													<Label for="basicpill-phoneno-input16">
														{"Time Frame"}
													</Label>
												</Col>
												<Col lg="6">
													<FormGroup>
														<div style={{ color: "#767676" }}>
															Tanggal Awal :
														</div>
														<Input
															className="form-control"
															name={"ta"}
															placeholder="dd/mm/yyyy"
															type="date"
															onChange={handleChange}
															min={moment(Date()).format("YYYY-MM-DD")}
														/>
													</FormGroup>
												</Col>
												<Col lg="6">
													<FormGroup>
														<div style={{ color: "#767676" }}>
															Tanggal Akhir :
														</div>
														<Input
															className="form-control"
															name="ti"
															placeholder="dd/mm/yyyy"
															type="date"
															onChange={handleChange}
															min={minTanggalAkhir}
															disabled={tanggalAwal === "" ? true : false}
														/>
													</FormGroup>
												</Col>
											</Row> */}
										</Col>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3}>
								<div>
									<Summary responsed={responsed} />
								</div>
							</TabPane>
						</TabContent>
						<ul className="pager wizard twitter-bs-wizard-pager-link">
							<li className={"previous"}>
								<Link
									className={
										activeTabProgress === 1
											? styles.buttonCancel
											: styles.buttonPrevious
									}
									to="#"
									onClick={() => {
										if (activeTabProgress === 1) {
											// localStorage.removeItem("sitesData");
											// localStorage.removeItem("tanggalAwalVendor");
											// localStorage.removeItem("tanggalAkhirVendor");
											// localStorage.removeItem("nomorSuratRespon");
											history.push("/vendor/site-matchmaking");
										}
										toggleTabProgress(activeTabProgress - 1);
									}}
								>
									{activeTabProgress === 1 ? (
										"Batal"
									) : (
										<span className={styles.centerElementSpan}>
											<i className="mdi mdi-24px mdi-chevron-left" />
											Kembali
										</span>
									)}
								</Link>
							</li>
							<li className={activeTabProgress === 3 ? "next" : "next"}>
								<a
									className={
										activeTabProgress === 3
											? styles.buttonSubmit
											: styles.buttonNext
									}
									onClick={() => {
										if (isLoading) {
										} else {
											if (activeTabProgress === 3) {
												setIsLoading(true);
												RecordBatchToDB(docUpload).then(async (res) => {
													// console.log('tab3', res);
													setIsLoading(false);
													if (res === "SUCCESS") {
														await API.postSentNotifPenawaran({
															batchid: siteListA[0].batchid,
															userfrom: userid,
														});
														alert("Berhasil Melakukan Penawaran");
														history.push("/vendor/site-matchmaking");
													} else if (res === "FAIL") {
														alert("Terjadi Kesalahan");
													} else if (res === "EMPTY") {
														alert("Silahkan Lengkapi Data Terlebih Dahulu");
													}
												});
											}
											toggleTabProgress(activeTabProgress + 1);
										}
									}}
								>
									{activeTabProgress === 3 ? (
										isLoading ? (
											<Spinner></Spinner>
										) : (
											"SUBMIT"
										)
									) : (
										<span
											className={styles.centerElementSpan}
											onClick={() =>
												activeTabProgress === 1 && setModalBantuan(true)
											}
										>
											Selanjutnya
											<i className="mdi mdi-24px mdi-chevron-right" />
										</span>
									)}
								</a>
							</li>
						</ul>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

// responsed ? (
//  <Col lg="12">
//      <Card>
//          <CardBody>
//              <div id="progrss-wizard" className="twitter-bs-wizard">
//                  <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
//                      <NavItem
//                          style={{
//                              display: "flex",
//                              justifyContent: "flex-end",
//                              alignItems: "center",
//                          }}
//                      >
//                          <NavLink
//                              className={classnames({
//                                  active: activeTabProgress === 1,
//                              })}
//                          >
//                              <span
//                                  className="step-number mr-2"
//                                  style={{
//                                      backgroundColor:
//                                          activeTabProgress === 1 ? "#F99746" : "#C4C4C4",
//                                      color: activeTabProgress === 1 ? "#19324A" : "white",
//                                      border: "1px solid #19324A",
//                                  }}
//                              >
//                                  1
//                              </span>
//                              <span
//                                  style={{
//                                      color: activeTabProgress === 1 ? "#F99746" : "#19324A",
//                                  }}
//                              >
//                                  PENAWARAN
//                              </span>
//                          </NavLink>
//                      </NavItem>
//                      <NavItem
//                          style={{
//                              display: "flex",
//                              justifyContent: "flex-start",
//                              alignItems: "center",
//                          }}
//                      >
//                          <NavLink
//                              className={classnames({
//                                  active: activeTabProgress === 2,
//                              })}
//                          >
//                              <span
//                                  className="step-number mr-2"
//                                  style={{
//                                      backgroundColor:
//                                          activeTabProgress === 2 ? "#F99746" : "#C4C4C4",
//                                      color: activeTabProgress === 2 ? "#19324A" : "white",
//                                      border: "1px solid #19324A",
//                                  }}
//                              >
//                                  2
//                              </span>
//                              <span
//                                  style={{
//                                      color: activeTabProgress === 3 ? "#F99746" : "#19324A",
//                                  }}
//                              >
//                                  SUMMARY
//                              </span>
//                          </NavLink>
//                      </NavItem>
//                  </ul>

//                  <div id="bar" className="mt-4">
//                      <Progress
//                          color="success"
//                          striped
//                          animated
//                          value={progressValue}
//                      />
//                      <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"></div>
//                  </div>
//                  <TabContent
//                      activeTab={activeTabProgress}
//                      className="twitter-bs-wizard-tab-content"
//                  >
//                      <TabPane tabId={1}>
//                          <TabPenawaran />
//                      </TabPane>
//                      <TabPane tabId={2}>
//                          <div>
//                              <Summary responsed={responsed} />
//                          </div>
//                      </TabPane>
//                  </TabContent>
//                  <ul className="pager wizard twitter-bs-wizard-pager-link">
//                      <li className={"previous"}>
//                          <Link
//                              className={
//                                  activeTabProgress === 1
//                                      ? styles.buttonCancel
//                                      : styles.buttonPrevious
//                              }
//                              to="#"
//                              onClick={() => {
//                                  if (activeTabProgress === 1) {
//                                      batchRef.remove();
//                                      sitesRef.remove();
//                                      history.push("/vendor/site-matchmaking");
//                                  }
//                                  toggleTabProgress(activeTabProgress - 1);
//                              }}
//                          >
//                              {activeTabProgress === 1 ? (
//                                  "Batal"
//                              ) : (
//                                  <span className={styles.centerElementSpan}>
//                                      <i className="mdi mdi-24px mdi-chevron-left" />
//                                      Kembali
//                                  </span>
//                              )}
//                          </Link>
//                      </li>
//                      <li className={activeTabProgress === 2 ? "next" : "next"}>
//                          <Link
//                              className={
//                                  activeTabProgress === 2
//                                      ? styles.buttonSubmit
//                                      : styles.buttonNext
//                              }
//                              to={
//                                  activeTabProgress === 2 ? "/vendor/site-matchmaking" : "#"
//                              } //-/vendor/site-matchmaking
//                              onClick={() => {
//                                  if (activeTabProgress === 2) {
//                                      RecordBatchToDB(basicBatchInfo, siteList, docUpload);
//                                      batchRef.remove();
//                                      sitesRef.remove();
//                                  }
//                                  toggleTabProgress(activeTabProgress + 1);
//                              }}
//                          >
//                              {activeTabProgress === 2 ? (
//                                  "Submit"
//                              ) : (
//                                  <span className={styles.centerElementSpan}>
//                                      Selanjutnya
//                                      <i className="mdi mdi-24px mdi-chevron-right" />
//                                  </span>
//                              )}
//                          </Link>
//                      </li>
//                  </ul>
//              </div>
//          </CardBody>
//      </Card>
//  </Col>
// ) :

const WizardWrapper = (props) => {
	return (
		<LocalProvider>
			<FormWizard />
		</LocalProvider>
	);
};

export default WizardWrapper;
