import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
// import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { withRouter } from "react-router";
import React, { Component, useContext } from "react";
import { Row, CardBody, Spinner } from "reactstrap";
import Skleton from "react-loading-skeleton";
// import style from "../style.module.css";

// COMPONENTS
import { LocalContext } from "../LocalContext";
import { drawGeoPoint, flyToPoint } from "./maphelper";
import SideList from "./SideList";
import ModalDetailVendor from "../Modal/DetailVendorGantt";

// API
import API from "../../../../services";

// STYLE
import "./style.css";
import style from "./style.module.css";

// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";

const Map = ReactMapboxGl({
	maxZoom: 20,
	minZoom: 1,
	accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
});

class MapBase extends Component {
	static contextType = LocalContext;
	constructor(props) {
		super();
		this.mapRefAdmin = React.createRef();
		this.state = {
			colorPointRL: "#F36666",
			basemap: "streets-v11",
			mapRef: "",
			mapLayers: false,
			loadingLayers: true,
			value: null,
			// dataTitikInternet: [
			// 	{
			// 		kt: "AI-2293",
			// 		prov: "DKI JAKARTA",
			// 		kk: "JAKARTA TIMUR",
			// 		kec: "CIDENG",
			// 		des: "JATINEGARA",
			// 		lng: "121",
			// 		lat: "-2",
			// 		act: "",
			// 	},
			// ],
			dataTitikInternet: "",
			dataBatch: {},
			dataPenawaran: {},
			modalDetail: false,
			showVendorList: false,
			dataListVendor: [],
			detailVendor: {},
		};
	}

	componentDidMount() {
		const { mapRef, siteList } = this.context;
		const role = window.localStorage.getItem("companyId");
		const { id, judul } = this.props.match.params;
		function createData(kt, prov, kk, kec, des, lng, lat, listVendor) {
			return { kt, prov, kk, kec, des, lng, lat, listVendor };
		}
		this.setState({
			mapRef: mapRef,
			// dataTitikInternet: allSiteMap,
		});
		API.postAdminSM({
			batch: id,
		})
			// .then((res) => {
			// console.log("data batch admin", res.data.values);
			// });
			// .then((res) => {
			// 	console.log("dataaa sitelisttt", res.data.values)
			// 	let indexData = res.data.values.findIndex(
			// 		(dataPenawaran) => dataPenawaran.id === id
			// 	);
			// 	if (
			// 		res.data.values[indexData].judul.toLowerCase() ===
			// 			judul.replace("-", " ").toLowerCase() &&
			// 		res.data.values[indexData].id === id
			// 	) {
			// 		if (res.data.values.length === 0) {
			// 			this.setState({
			// 				dataTitikInternet: [
			// 					{
			// 						kt: "Tidak ada data",
			// 						prov: "",
			// 						kk: "",
			// 						kec: "",
			// 						des: "",
			// 						lng: "",
			// 						lat: "",
			// 						listVendor: [],
			// 					},
			// 				],
			// 				loadingLayers: false,
			// 			});
			// 		} else {
			// 			let listData = [];
			// 			let dats = res.data.values.filter(
			// 				(dataPenawaran) => dataPenawaran.id === id
			// 			);
			// 			this.setState({
			// 				dataBatch: dats[0],
			// 			});
			// 			for (let i of dats[0].sites) {
			// 				listData.push(
			// 					createData(
			// 						i.siteid.unik_id,
			// 						i.siteid.provinsi.name,
			// 						i.siteid.kabupaten === null
			// 							? i.siteid.kota.name
			// 							: i.siteid.kabupaten.name,
			// 						i.siteid.kecamatan.name,
			// 						i.siteid.desa_kelurahan.name,
			// 						i.siteid.longitude,
			// 						i.siteid.latitude,
			// 						i.rfi_score
			// 						// listVendor
			// 					)
			// 				);
			// 			}
			// 			this.setState({
			// 				dataTitikInternet: listData,
			// 				loadingLayers: false,
			// 			});
			// 		}
			// 	} else {
			// 		this.setState({
			// 			dataTitikInternet: [
			// 				{
			// 					kt: "Tidak ada data",
			// 					prov: "",
			// 					kk: "",
			// 					kec: "",
			// 					des: "",
			// 					lng: "",
			// 					lat: "",
			// 					listVendor: [],
			// 				},
			// 			],
			// 			loadingLayers: false,
			// 		});
			// 	}
			// })
			// .catch((err) => {
			// 	this.setState({
			// 		dataTitikInternet: null,
			// 		loadingLayers: false,
			// 	});
			// });
			.then((res) => {
				// console.log("dataaa sitelisttt", res.data.values);
				if (res.data.values.length === 0) {
					this.setState({
						dataTitikInternet: [
							{
								kt: "Tidak ada data",
								prov: "",
								kk: "",
								kec: "",
								des: "",
								lng: "",
								lat: "",
								listVendor: [],
							},
						],
						loadingLayers: false,
					});
				} else {
					let listData = [];
					this.setState({
						dataBatch: res.data.values[0],
					});
					for (let i of res.data.values[0].sites) {
						let act = "";
						// act = (
						// 	<LihatVendor data={i}/>
						// );
						listData.push(
							createData(
								i?.siteid?.unik_id,
								i?.siteid?.provinsi?.name,
								i?.siteid?.kabupaten === null
									? i?.siteid?.kota?.name
									: i?.siteid?.kabupaten?.name,
								i?.siteid?.kecamatan?.name,
								i?.siteid?.desa_kelurahan?.name,
								i?.siteid?.longitude,
								i?.siteid?.latitude,
								i?.rfi_score
								// listVendor
							)
						);
					}
					this.setState({
						dataTitikInternet: listData,
						loadingLayers: false,
					});
				}
			})
			.catch((err) => {
				// console.log(err);
				this.setState({
					dataTitikInternet: null,
					loadingLayers: false,
				});
			});
	}

	render() {
		const popup = new mapboxgl.Popup();
		let toggleDetail = (param) => {
			this.setState({
				modalDetail: !this.state.modalDetail,
			});
			this.setState({
				detailVendor: param,
			});
		};

		const renderPenilaianRFI = () => {
			return this.state.dataListVendor.map((e) => (
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
						className={style.listPenilaianRFI}
						onClick={() => {
							toggleDetail(e.vendor_app);
						}}
					>
						<span>
							{e.vendor_app
								? e.vendor_app.vendorid
									? e.vendor_app.vendorid.name
									: ""
								: ""}
						</span>
						<span
							style={{
								color: "#16C046",
								fontSize: "15px",
								fontWeight: "bold",
							}}
						>
							{e.total_calc
								? (
										(e.total_calc.teknologi +
											e.total_calc.rfi +
											e.total_calc.harga +
											e.total_calc.vp) /
										4
								  ).toFixed(3)
								: 0}
						</span>
					</div>
				</>
			));
		};

		const fnShowListVendor = (listVendor, param) => {
			this.setState({
				showVendorList: true,
			});
			this.setState({
				dataListVendor: listVendor,
			});
			setTimeout(() => {
				flyToPoint(this.mapRefAdmin, param, popup);
			}, 300);
		};

		return (
			<>
				<ModalDetailVendor
					modal={this.state.modalDetail}
					toggle={toggleDetail}
					detailVendor={this.state.detailVendor}
					dataListVendor={this.state.dataListVendor}
				/>

				<div className="sidebarsizemap">
					<div className="text-center">
						<span style={{ fontSize: "19px", fontWeight: "bold" }}>
							KODE TITIK LOKASI
						</span>
					</div>
					<div className="listingsSMM">
						{this.state.loadingLayers ? (
							<Skleton count={5} />
						) : (
							<>
								<SideList
									data={this.state.dataTitikInternet}
									mapRef={this.mapRefAdmin}
									popup={popup}
									showVendorList={fnShowListVendor}
								/>
							</>
						)}
					</div>
					<div className="text-center mt-2">
						<span style={{ fontSize: "19px", fontWeight: "bold" }}>
							SITE MATCHMAKING
						</span>
					</div>
					{this.state.showVendorList ? (
						this.state.dataListVendor.length === 0 ? (
							<div className="text-center mt-3"> Tidak Ada Data</div>
						) : (
							<>
								<div>
									<CardBody
										className="text-center mx-3"
										style={{ borderRadius: "15px", backgroundColor: "#E8E8E8" }}
									>
										<div style={{ fontSize: "16px", fontWeight: "bold" }}>
											{this.state.dataBatch ? this.state.dataBatch.judul : ""}
										</div>
										<div
											className="my-2"
											style={{ fontSize: "16px", fontWeight: "bold" }}
										>
											{this.state.dataBatch ? this.state.dataBatch.type : ""}
										</div>
										<div>
											{this.state.dataBatch
												? this.state.dataBatch.no_doc_permohonan_rfi
												: ""}
										</div>
									</CardBody>
								</div>
								<CardBody className="mx-3">
									<div
										className="my-2 text-center"
										style={{ fontSize: "16px", fontWeight: "bold" }}
									>
										Penilaian RFI Penyedia
									</div>
									<Row style={{ height: "200px" }}>
										<CardBody style={{ height: "100%", overflowY: "auto" }}>
											{renderPenilaianRFI()}
										</CardBody>
									</Row>
								</CardBody>
							</>
						)
					) : (
						<div className="text-center mt-3"> Site belum dipilih </div>
					)}
				</div>

				<div className="mapsize pad-map2" style={{ marginLeft: "5px" }}>
					{this.state.loadingLayers ? (
						<div style={{ marginTop: "30%", textAlign: "center" }}>
							<Spinner type="grow" />
						</div>
					) : (
						<Map
							ref={this.mapRefAdmin}
							zoom={[4.2]}
							center={[118.0148634, -2.548926]}
							maxBounds={[
								[86.160622, -17.545353],
								[149.441872, 18.118934],
							]}
							trackResize={true}
							style={"mapbox://styles/mapbox/" + this.state.basemap}
							containerStyle={{ height: "100%", width: "100%" }}
							onStyleLoad={async (map, load) => {
								// map.addControl(
								// 	new MapboxGeocoder({
								// 		accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
								// 		mapboxgl: mapboxgl,
								// 	})
								// );
								map.addControl(new mapboxgl.FullscreenControl());
								map.addControl(new mapboxgl.NavigationControl());
								drawGeoPoint(
									map,
									popup,
									this.state.dataTitikInternet,
									toggleDetail
								);
							}}
						/>
					)}
				</div>
			</>
		);
	}
}

export default withRouter(MapBase);
