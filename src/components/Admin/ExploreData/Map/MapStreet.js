import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import React, { Component } from "react";
// import style from "../style.module.css";
import { LocalContext } from "../LocalContext";
import { drawPolygon, drawGeoPoint, drawHeatmap } from "./maphelper";
// import LayerBox from "./Card/ExploreData/CardExploreData";
import API from "../../../../services";
import { Spinner } from "reactstrap";

import "./style.css";

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
		this.state = {
			colorPointRL: "#F36666",
			colorPointFO: "#D7C843",
			colorPointVSAT: "#5EA2F2",
			colorPointDummy: "#ff8000",
			// basemap: "streets-v11",
			mapRef: "",
			mapLayers: false,
			loadingLayers: false,
			value: null,
			dataTitikInternet: [],
			loading: true,
		};
	}

	componentDidMount() {
		const {
			loadingDeflayer,
			mapRef,
			defaultLayers,
			setShowDataODP,
			setDataTitik,
		} = this.context;
		this.setState({
			mapRef: mapRef,
			loadingLayers: loadingDeflayer,
			mapLayers: defaultLayers,
		});
		API.getTitikInternet()
			.then((res) => {
				if (res.data.success) {
					this.setState({
						dataTitikInternet: res.data.values,
						loading: false,
					});
					setShowDataODP(true);
					setDataTitik(res.data.values);
				} else {
					this.setState({
						dataTitikInternet: [],
						loading: false,
					});
					setShowDataODP(false);
					setDataTitik([]);
				}
			})
			.catch((err) => {
				this.setState({
					dataTitikInternet: null,
					loading: false,
				});
				setShowDataODP(false);
				setDataTitik(null);
			});
	}

	render() {
		const { defaultLayers, basemap } = this.context;
		const layers = defaultLayers.map((datum) => {
			return { ...datum };
		});

		const popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false,
		});

		// const onSelect = (value) => {
		// 	this.setState({ value: value });
		// };
		// console.log('state basemap', basemap)
		return (
			<>
				{this.state.loading ? (
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="text-center">
							<div>
								<Spinner />
							</div>
							<div className="my-2">Loading...</div>
						</div>
					</div>
				) : this.state.dataTitikInternet ? (
					<Map
						ref={this.state.mapRef}
						zoom={[4.2]}
						center={[118.0148634, -2.548926]}
						maxBounds={[
							[86.160622, -17.545353],
							[149.441872, 18.118934],
						]}
						trackResize={true}
						style={"mapbox://styles/mapbox/streets-v11"}
						containerStyle={{ height: "100%", width: "100%" }}
						onStyleLoad={async (map, load) => {
							map.addControl(
								new MapboxGeocoder({
									accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
									mapboxgl: mapboxgl,
									countries: "ID",
								})
							);
							map.addControl(new mapboxgl.FullscreenControl());
							map.addControl(new mapboxgl.NavigationControl());
							if (layers) {
								layers.forEach((layer) => {
									switch (layer.type) {
										case "polygon":
											drawPolygon(map, layer.name, popup);
											break;
										case "marker":
											drawGeoPoint(
												map,
												layer.name,
												this.state.dataTitikInternet
											);
											break;
										// case "heatmap":
										// 	drawHeatmap(map, layer.name, this.state.dataTitikInternet);
										// break;
										// case "point":
										// 	return "Light";
										default:
											return "";
									}
								});
							}
						}}
					/>
				) : (
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="text-center">
							{/* <div>
								<Spinner />
							</div> */}
							<div className="my-2">
								Terjadi kesalahan, silahkan dicoba beberapa saat lagi
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

export default MapBase;
