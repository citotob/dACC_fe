import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl, { MapboxGeocoder } from "mapbox-gl";
import React, { Component, Fragment } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import INDONESIA from "./files/indonesia.json";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import LayerBox from "./Card/ExploreData/CardExploreData";

import {
	populateLayerField,
	addLayerData,
} from "../../store/map/action/actions";

class MapBase extends Component {
	constructor(props) {
		super();
		this.state = {
			indodata: "",
			isLoading: true,
			colorPointRL: "#F36666",
			colorPointFO: "#D7C843",
			colorPointVSAT: "#5EA2F2",
			colorPointDummy: "#ff8000",
		};
		this.mapRef = React.createRef();
		this.legendRef = React.createRef();
		this.infoWindowRef = React.createRef();
		this.changeBasemap = this.changeBasemap.bind(this);
		// this.zoomIndonesia = this.zoomIndonesia.bind(this);
		// this.addGeoPoints = this.addGeoPoints.bind(this);
		// this.removeGeoPoints = this.removeGeoPoints.bind(this);
		// this.addGeoPoints2 = this.addGeoPoints2.bind(this);
		// this.removeGeoPoints2 = this.removeGeoPoints2.bind(this);
	}

	// zoomIndonesia(val) {
	//   this.mapRef.current.state.map.flyTo({
	//     center: [118.0148634,-2.548926 ],
	//     zoom:3.7,
	//     essential: true,
	//   });
	//   this.mapRef.current.state.map.setMaxBounds(undefined)
	//   this.mapRef.current.state.map.setLayoutProperty(`indonesiaLayer`, 'visibility', 'visible');
	//   this.mapRef.current.state.map.setLayoutProperty(`indonesiaLayer`, 'visibility', 'visible');
	//   this.mapRef.current.state.map.removeLayer(`${val}Layer`)
	//   this.mapRef.current.state.map.removeSource(`${val}Source`)

	// }

	addGeoPointsRL = (layerData) => {
		var geojsonRL = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: [
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [110.4262088, -7.8753849],
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [106.845172, -6.211544],
					},
				},
			],
		};
		this.mapRef.current.state.map.addSource("SourceRL", {
			type: "geojson",
			data: geojsonRL,
		});

		this.mapRef.current.state.map.addLayer({
			id: "LayerRL",
			type: "circle",
			source: "SourceRL",
			layout: {},
			paint: {
				"circle-radius": 8,
				"circle-color": this.state.colorPointRL,
			},
		});
	};
	addGeoPointsFO = (layerData) => {
		var geojsonFO = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: [
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [119.2320784, -2.8441371],
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [121.4456179, -1.4300254],
					},
				},
			],
		};
		this.mapRef.current.state.map.addSource("SourceFO", {
			type: "geojson",
			data: geojsonFO,
		});

		this.mapRef.current.state.map.addLayer({
			id: "LayerFO",
			type: "circle",
			source: "SourceFO",
			layout: {},
			paint: {
				"circle-radius": 8,
				"circle-color": this.state.colorPointFO,
			},
		});
	};
	addGeoPointsVSAT = (layerData) => {
		var geojsonVSAT = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: [
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [111.4752851, -0.2787808],
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [105.4068079, -4.5585849],
					},
				},
			],
		};
		this.mapRef.current.state.map.addSource("SourceVSAT", {
			type: "geojson",
			data: geojsonVSAT,
		});

		this.mapRef.current.state.map.addLayer({
			id: "LayerVSAT",
			type: "circle",
			source: "SourceVSAT",
			layout: {},
			paint: {
				"circle-radius": 8,
				"circle-color": this.state.colorPointVSAT,
			},
		});
	};

	// DUMMY SITE
	addGeoPointsDummy = (long, lat) => {
		var geojsonDummy = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: [
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [long, lat],
					},
				},
			],
		};
		this.mapRef.current.state.map.addSource("SourceDummy", {
			type: "geojson",
			data: geojsonDummy,
		});

		this.mapRef.current.state.map.addLayer({
			id: "LayerDummy",
			type: "circle",
			source: "SourceDummy",
			layout: {},
			paint: {
				"circle-radius": 8,
				"circle-color": this.state.colorPointDummy,
			},
		});

		this.mapRef.current.state.map.flyTo({
			center: [long, lat],
			zoom: 9,
			essential: true,
		});
	};
	removeGeoPointsDummy = (id) => {
		this.mapRef.current.state.map.removeLayer("LayerDummy");
		this.mapRef.current.state.map.removeSource("SourceDummy");
		this.mapRef.current.state.map.flyTo({
			center: [118.0148634, -2.548926],
			zoom: 3.7,
			essential: true,
		});
	};

	filterLayer = () => {
		// console.log("IN MAP");
		const filter = ["all", ["in", "status", "OTG"], ["in", "hasil", "positif"]];
		this.mapRef.current.state.map.setFilter("P1_Layer", filter);
	};

	removeGeoPoints = (id) => {
		this.mapRef.current.state.map.removeLayer("Layer" + id);
		this.mapRef.current.state.map.removeSource("Source" + id);
	};
	// removeGeoPointsFO = (id) => {
	// 	this.mapRef.current.state.map.removeLayer("LayerFO");
	// 	this.mapRef.current.state.map.removeSource("SourceFO");
	// };
	// removeGeoPointsVSAT = (id) => {
	// 	this.mapRef.current.state.map.removeLayer("LayerVSAT");
	// 	this.mapRef.current.state.map.removeSource("SourceVSAT");
	// };

	hideLayer = (id) => {
		this.mapRef.current.state.map.setLayoutProperty(
			"Layer" + id,
			"visibility",
			"none"
		);
	};

	showLayer = (id) => {
		this.mapRef.current.state.map.setLayoutProperty(
			"Layer" + id,
			"visibility",
			"visible"
		);
	};

	changeColorPolygon = (id, color) => {
		this.mapRef.current.state.map.setPaintProperty(
			id + "_Layer",
			"fill-color",
			color
		);
	};

	changeColorPointRL = (color) => {
		// this.setState({ colorPointRL: color });
		this.mapRef.current.state.map.setPaintProperty(
			"LayerRL",
			"circle-color",
			color
		);
	};
	changeColorPointFO = (color) => {
		this.mapRef.current.state.map.setPaintProperty(
			"LayerFO",
			"circle-color",
			color
		);
	};
	changeColorPointVSAT = (color) => {
		this.mapRef.current.state.map.setPaintProperty(
			"LayerVSAT",
			"circle-color",
			color
		);
	};

	changeRadius = (id, radius) => {
		this.mapRef.current.state.map.setPaintProperty(
			id + "_Layer",
			"circle-radius",
			radius
		);
	};

	changeBasemap = () => {
		// console.log("IN");
		this.mapRef.current.state.map.setStyle(
			"mapbox://styles/mapbox/satellite-streets-v11"
		);
	};

	render() {
		const Map = ReactMapboxGl({
			maxZoom: 20,
			minZoom: 1,
			accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
		});
		let hoveredStateId = null;
		const { marker } = this.props.marker;
		const containerCSS = {
			boxSizing: "border-box",
			height: "100%",
			width: "100%",
			backgroundColor: "white",
			display: "block",
		};

		const containerCssMobile = {
			boxSizing: "border-box",
			height: "200px",
			backgroundColor: "white",
			display: "block",
		};

		// console.log("markeeeeeeeeeer", this.props.marker);

		return (
			<Fragment>
				<Map
					ref={this.mapRef}
					zoom={[3.7]}
					center={[118.0148634, -2.548926]}
					// maxBounds={[
					// 	[91.549305, -13.817646],
					// 	[145.909655, 9.339755],
					// ]}
					trackResize={true}
					style={"mapbox://styles/mapbox/" + this.props.basemap}
					containerStyle={containerCSS}
					onStyleLoad={async (map, load) => {
						map.addControl(new mapboxgl.FullscreenControl());
						map.addControl(new mapboxgl.NavigationControl()); // navigation

						// // SOURCE & LAYER TITIK RL
						// map.addSource("pointSourceRL", {
						// 	type: "geojson",
						// 	data: geojsonRL,
						// });
						// map.addLayer({
						// 	id: "pointLayerRL",
						// 	type: "circle",
						// 	source: "pointSourceRL",
						// 	layout: {
						// 		visibility: this.props.marker.statusRL,
						// 	},
						// 	paint: {
						// 		"circle-radius": 8,
						// 		"circle-color": this.props.marker.colorRL,
						// 	},
						// });

						// // this.props.marker.statusRL !== "none" ? this.showLayer("pointLayerRL") : this.hideLayer("pointLayerRL")

						// // SOURCE & LAYER TITIK FO
						// map.addSource("pointSourceFO", {
						// 	type: "geojson",
						// 	data: geojsonFO,
						// });
						// map.addLayer({
						// 	id: "pointLayerFO",
						// 	type: "circle",
						// 	source: "pointSourceFO",
						// 	layout: {
						// 		visibility: this.props.marker.statusFO,
						// 	},
						// 	paint: {
						// 		"circle-radius": 8,
						// 		"circle-color": this.props.marker.colorFO,
						// 	},
						// });

						// // SOURCE & LAYER TITIK VSAT
						// map.addSource("pointSourceVSAT", {
						// 	type: "geojson",
						// 	data: geojsonVSAT,
						// });
						// map.addLayer({
						// 	id: "pointLayerVSAT",
						// 	type: "circle",
						// 	source: "pointSourceVSAT",
						// 	layout: {
						// 		visibility: this.props.marker.statusVSAT,
						// 	},
						// 	paint: {
						// 		"circle-radius": 8,
						// 		"circle-color": this.props.marker.colorVSAT,
						// 	},
						// });

						const popup = new mapboxgl.Popup({
							closeButton: false,
							closeOnClick: false,
						});
						const popupkabkot = new mapboxgl.Popup({
							closeButton: false,
							closeOnClick: false,
						});
						const reference = this.infoWindowRef;
						const refMap = this.mapRef;
					}}
				></Map>
				<div style={{ position: "absolute", top: "70px", left: "20px" }}>
					<LayerBox
						ref={this.legendRef}
						actionRL={this.addGeoPointsRL}
						actionFO={this.addGeoPointsFO}
						actionVSAT={this.addGeoPointsVSAT}
						reaction={this.removeGeoPoints}
						actionDummy={this.addGeoPointsDummy}
						reactionDummy={this.removeGeoPointsDummy}
						// reactionFO={this.removeGeoPointsFO}
						// reactionVSAT={this.removeGeoPointsVSAT}
						showLayer={this.showLayer}
						hideLayer={this.hideLayer}
						changeColorPointRL={this.changeColorPointRL}
						changeColorPointFO={this.changeColorPointFO}
						changeColorPointVSAT={this.changeColorPointVSAT}
						setDummy={this.props.setDummy}
						setActiveTab={this.props.setActiveTab}
						setLongLat={this.props.setLongLat}
						// changeBasemap={this.changeBasemap}
					/>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	marker: state.ColorMarker,
});

export default connect(
	mapStateToProps,
	{ populateLayerField, addLayerData },
	null,
	{
		forwardRef: true,
	}
)(MapBase);

// export default MapBase
