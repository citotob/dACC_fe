import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
// import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import React, { Component } from "react";
// import style from "../style.module.css";
import { LocalContext } from "../LocalContext";
import { drawPolygonPotensial } from "./maphelper";
import API from "../../../../services";

import "./style.css";

// import Axios from "axios";

// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";

const Map = ReactMapboxGl({
	maxZoom: 7,
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
			dataPenduduk: [],
			dataAI: [],
			dataBTS: [],
			loadingPenduduk: true,
			loadingAI: true,
			loadingBTS: true,
		};
	}

	componentDidMount() {
		const { loadingDeflayer, mapRef, defaultLayers, basemap } = this.context;
		this.setState({
			mapRef: mapRef,
			loadingLayers: loadingDeflayer,
			mapLayers: defaultLayers,
		});
		API.getDataKepadatanPenduduk()
			.then((res) => {
				if (res.data.success) {
					this.setState({
						dataPenduduk: res.data.values,
						loadingPenduduk: false,
					});
				} else {
					this.setState({
						dataPenduduk: [],
						loadingPenduduk: false,
					});
				}
				API.getDataAI()
					.then((res) => {
						if (res.data.success) {
							this.setState({
								dataAI: res.data.values,
								loadingAI: false,
							});
						} else {
							this.setState({
								dataAI: [],
								loadingAI: false,
							});
						}
						API.getDataBTS()
							.then((res) => {
								if (res.data.success) {
									this.setState({
										dataBTS: res.data.values,
										loadingBTS: false,
									});
								} else {
									this.setState({
										dataBTS: [],
										loadingBTS: false,
									});
								}
							})
							.catch((err) => {
								this.setState({
									dataBTS: null,
									loadingBTS: false,
								});
							});
					})
					.catch((err) => {
						this.setState({
							dataAI: null,
							loadingAI: false,
						});
					});
			})
			.catch((err) => {
				this.setState({
					dataPenduduk: null,
					loadingPenduduk: false,
				});
			});
	}

	render() {
		const { defaultLayersPotensial } = this.context;
		const layersPotensial = defaultLayersPotensial.map((datum) => {
			return { ...datum };
		});

		const popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false,
		});

		return (
			<>
				{!this.state.loadingPenduduk &&
				!this.state.loadingAI &&
				!this.state.loadingBTS ? (
					this.state.dataPenduduk &&
					this.state.dataAI &&
					this.state.dataBTS &&
					this.state.dataPenduduk.length != 0 &&
					this.state.dataAI.length != 0 &&
					this.state.dataBTS.length != 0 ? (
						<Map
							ref={this.state.mapRef}
							zoom={[2]}
							center={[118.0148634, -2.548926]}
							maxBounds={[
								[86.160622, -17.545353],
								[149.441872, 18.118934],
							]}
							// trackResize={true}
							style={"mapbox://styles/mapbox/streets-v11"}
							containerStyle={{ height: "100%", width: "100%" }}
							onStyleLoad={async (map, load) => {
								// MAPBOX GEOCODING
								// map.addControl(
								// 	new MapboxGeocoder({
								// 		accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
								// 		mapboxgl: mapboxgl,
								// 	})
								// );
								map.addControl(new mapboxgl.FullscreenControl());
								map.addControl(new mapboxgl.NavigationControl());
								// if (layers) {
								// 	layers.forEach((layer) => {
								// 		switch (layer.type) {
								// 			case "polygon":
								// 				drawPolygon(map, layer.name, popup);
								// 				break;
								// 			case "marker":
								// 				drawGeoPoint(map, layer.name, this.state.dataPenduduk);
								// 				break;
								// 			case "heatmap":
								// 				drawHeatmap(map, layer.name, this.state.dataPenduduk);
								// 				break;
								// 			// case "point":
								// 			// 	return "Light";
								// 			default:
								// 				return "";
								// 		}
								// 	});
								// }
								if (layersPotensial) {
									layersPotensial.forEach((layer) => {
										switch (layer.type) {
											case "polygon":
												drawPolygonPotensial(
													map,
													layer.name,
													popup,
													this.state.dataPenduduk,
													this.state.dataAI,
													this.state.dataBTS
												);
												break;
											// case "marker":
											// 	drawGeoPoint(map, layer.name, this.state.dataPenduduk);
											// 	break;
											// case "heatmap":
											// 	drawHeatmap(
											// 		map,
											// 		layer.name,
											// 		this.state.dataPenduduk
											// 	);
											// 	break;
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
						alert("Terjadi Kesalahan Pada Server BPS")
					)
				) : (
					""
				)}
			</>
		);
	}
}

export default MapBase;
