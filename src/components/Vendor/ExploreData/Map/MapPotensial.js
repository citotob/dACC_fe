import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import React, { Component, useContext } from "react";
import style from "../style.module.css";
import { LocalContext } from "../LocalContext";
import { drawPolygonPotensial, drawGeoPoint, drawHeatmap } from "./maphelper";
// import LayerBox from "./Card/ExploreData/CardExploreData";
import API from "../../../../services";

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
		};
	}

	componentDidMount() {
		const { loadingDeflayer, mapRef, defaultLayers, basemap } = this.context;
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
					});
				} else {
					this.setState({
						dataTitikInternet: [],
					});
				}
			})
			.catch((err) => {
				this.setState({
					dataTitikInternet: null,
				});
			});
	}

	render() {
		const { defaultLayers, defaultLayersPotensial, basemap } = this.context;
		// const layers = defaultLayers.map((datum) => {
		// 	return { ...datum };
		// });
		const layersPotensial = defaultLayersPotensial.map((datum) => {
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
				<Map
					ref={this.state.mapRef}
					zoom={[4.2]}
					center={[118.0148634, -2.548926]}
					maxBounds={[
						[86.160622, -17.545353],
						[149.441872, 18.118934],
					]}
					trackResize={true}
					style={"mapbox://styles/mapbox/" + basemap}
					containerStyle={{ height: "100%", width: "100%" }}
					onStyleLoad={async (map, load) => {
						map.addControl(
							new MapboxGeocoder({
								accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
								mapboxgl: mapboxgl,
							})
						);
						map.addControl(new mapboxgl.FullscreenControl());
						map.addControl(new mapboxgl.NavigationControl());
						// if (layers) {
						// 	layers.forEach((layer) => {
						// 		switch (layer.type) {
						// 			case "polygon":
						// 				drawPolygon(map, layer.name, popup);
						// 				break;
						// 			case "marker":
						// 				drawGeoPoint(map, layer.name, this.state.dataTitikInternet);
						// 				break;
						// 			case "heatmap":
						// 				drawHeatmap(map, layer.name, this.state.dataTitikInternet);
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
										drawPolygonPotensial(map, layer.name, popup);
										break;
									// case "marker":
									// 	drawGeoPoint(map, layer.name, this.state.dataTitikInternet);
									// 	break;
									case "heatmap":
										drawHeatmap(map, layer.name, this.state.dataTitikInternet);
										break;
									// case "point":
									// 	return "Light";
									default:
										return "";
								}
							});
						}
					}}
				/>
			</>
		);
	}
}

export default MapBase;
