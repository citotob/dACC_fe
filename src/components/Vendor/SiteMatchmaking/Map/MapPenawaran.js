import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { withRouter } from "react-router";
import React, { Component, useContext } from "react";
import { Button, Row, Card, CardTitle, CardBody, Spinner } from "reactstrap";
import Skleton from "react-loading-skeleton";
// import style from "../style.module.css";

// COMPONENTS
import { LocalContext } from "../LocalContext";
import { drawGeoPoint, flyToPoint } from "./maphelper";
import SideList from "./SideList";
// import ModalDetailVendor from "../Modal/DetailVendorGantt";

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
		const batch_id = window.localStorage.getItem("batch_id");
		const { id, judul } = this.props.match.params;
		function createData(kt, prov, kk, kec, des, lng, lat, listVendor) {
			return { kt, prov, kk, kec, des, lng, lat, listVendor };
		}
		this.setState({
			mapRef: mapRef,
			// dataTitikInternet: allSiteMap,
		});
		API.postVendorSM({
			penyedia: role,
			batch: batch_id,
		})
			// .then((res) => {
			// console.log("data batch admin", res.data.values);
			// });
			.then((res) => {
				let indexData = res.data.values.findIndex(
					(dataPenawaran) => dataPenawaran.id === id
				);
				if (
					res.data.values[indexData].judul.toLowerCase() ===
						judul.replaceAll("%20", " ").replaceAll("%24", "/").toLowerCase() &&
					res.data.values[indexData].id === id
				) {
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
						let dats = res.data.values.filter(
							(dataPenawaran) => dataPenawaran.id === id
						);
						this.setState({
							dataBatch: dats[0],
						});
						for (let i of dats[0].sites) {
							listData.push(
								createData(
									i.siteid.unik_id,
									i.siteid.provinsi.name,
									i.siteid.kabupaten === null
										? i.siteid.kota.name
										: i.siteid.kabupaten.name,
									i.siteid.kecamatan.name,
									i.siteid.desa_kelurahan.name,
									i.siteid.longitude,
									i.siteid.latitude,
									i.rfi_score
									// listVendor
								)
							);
						}
						this.setState({
							dataTitikInternet: listData,
							loadingLayers: false,
						});
					}
				} else {
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
				}
			})
			.catch((err) => {
				this.setState({
					dataTitikInternet: null,
					loadingLayers: false,
				});
				// console.log(err);
			});
	}

	render() {
		const popup = new mapboxgl.Popup();

		return (
			<>
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
								/>
							</>
						)}
					</div>
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
									this.state.dataTitikInternet
									// toggleDetail
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
