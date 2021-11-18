export const drawPolygon = (mapref, name, popup, color) => {
	let hoveredStateId = null;
	// const DATA = import(`../files/${name}.json`);
	const DATA = import(`../files/INDONESIA.json`);
	DATA.then((result) => {
		switch (name) {
			case "INDONESIA":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer(
					{
						id: `${name}Layer`,
						type: "fill",
						maxzoom: 10,
						source: `${name}Source`,
						layout: {
							visibility: "visible",
						},
						paint: {
							"fill-color": "#ffb95a",
							"fill-opacity": [
								"case",
								["==", ["feature-state", "hover"], "hover"],
								0.3,
								["==", ["feature-state", "hover"], "default"],
								0.5,
								0.5,
							],
						},
					},
					"pointRLLayer"
				);
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;
			case "pointPenduduk":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer(
					{
						id: `${name}Layer`,
						type: "fill",
						maxzoom: 10,
						source: `${name}Source`,
						layout: {
							visibility: "none",
						},
						paint: {
							"fill-color": "green",
							"fill-opacity": [
								"case",
								["==", ["feature-state", "hover"], "hover"],
								0.3,
								["==", ["feature-state", "hover"], "default"],
								0.5,
								0.5,
							],
						},
					},
					"pointRLLayer"
				);
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Penduduk: 525.000<h6>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;
			case "pointSebaranInternet":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer(
					{
						id: `${name}Layer`,
						type: "fill",
						maxzoom: 10,
						source: `${name}Source`,
						layout: {
							visibility: "none",
						},
						paint: {
							"fill-color": "purple",
							"fill-opacity": [
								"case",
								["==", ["feature-state", "hover"], "hover"],
								0.3,
								["==", ["feature-state", "hover"], "default"],
								0.5,
								0.5,
							],
						},
					},
					"pointRLLayer"
				);
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Titik: 350<h6>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;
			case "pointSebaranBTS":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer(
					{
						id: `${name}Layer`,
						type: "fill",
						maxzoom: 10,
						source: `${name}Source`,
						layout: {
							visibility: "none",
						},
						paint: {
							"fill-color": "blue",
							"fill-opacity": [
								"case",
								["==", ["feature-state", "hover"], "hover"],
								0.3,
								["==", ["feature-state", "hover"], "default"],
								0.5,
								0.5,
							],
						},
					},
					"pointRLLayer"
				);
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>BTS: 200<h6>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;

			default:
				break;
		}
	});
	// .then((x)=>{
	// 	mapref.moveLayer(`${name}Layer`)
	// });
};

export const drawGeoPoint = (mapref, name, dataTitikInternet) => {
	if (dataTitikInternet === null) return alert("Internal Server Error");
	switch (name) {
		case "pointRL":
			var geojsonRL = {
				type: "FeatureCollection",
				name: "merged",
				crs: {
					type: "name",
					properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
				},
				features: dataTitikInternet
					.filter((e) => {
						return e.teknologi === "RL";
					})
					.map((e) => ({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [e.longitude, e.latitude],
						},
					})),
			};

			mapref.addSource(`${name}Source`, {
				type: "geojson",
				data: geojsonRL,
			});

			mapref.addLayer({
				id: `${name}Layer`,
				type: "circle",
				source: `${name}Source`,
				layout: {
					visibility: "none",
				},
				paint: {
					"circle-radius": 5,
					"circle-color": "#F36666",
				},
			});

			break;
		case "pointFO":
			var geojsonFO = {
				type: "FeatureCollection",
				name: "merged",
				crs: {
					type: "name",
					properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
				},
				features: dataTitikInternet
					.filter((e) => {
						return e.teknologi === "FO";
					})
					.map((e) => ({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [e.longitude, e.latitude],
						},
					})),
			};

			mapref.addSource(`${name}Source`, {
				type: "geojson",
				data: geojsonFO,
			});

			mapref.addLayer({
				id: `${name}Layer`,
				type: "circle",
				source: `${name}Source`,
				layout: {
					visibility: "none",
				},
				paint: {
					"circle-radius": 5,
					"circle-color": "#D7C843",
				},
			});
			// mapref.moveLayer(`${name}Layer`)
			break;
		case "pointVSAT":
			var geojsonVSAT = {
				type: "FeatureCollection",
				name: "merged",
				crs: {
					type: "name",
					properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
				},
				features: dataTitikInternet
					.filter((e) => {
						return e.teknologi === "VSAT-GS";
					})
					.map((e) => ({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [e.longitude, e.latitude],
						},
					})),
			};

			mapref.addSource(`${name}Source`, {
				type: "geojson",
				data: geojsonVSAT,
			});

			mapref.addLayer({
				id: `${name}Layer`,
				type: "circle",
				source: `${name}Source`,
				layout: {
					visibility: "none",
				},
				paint: {
					"circle-radius": 5,
					"circle-color": "#5EA2F2",
				},
			});
			// mapref.moveLayer(`${name}Layer`)
			break;

		default:
			break;
	}
};
export const drawHeatmap = (mapref, name, dataTitikInternet) => {
	if (dataTitikInternet === null) return alert("Internal Server Error");
	var geojson = {
		type: "FeatureCollection",
		name: "merged",
		crs: {
			type: "name",
			properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
		},
		features: dataTitikInternet.map((e) => ({
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [e.longitude, e.latitude],
			},
		})),
	};

	mapref.addSource(`${name}Source`, {
		type: "geojson",
		data: geojson,
	});

	mapref.addLayer({
		id: `${name}Layer`,
		type: "heatmap",
		source: `${name}Source`,
		layout: {
			visibility: "none",
		},
		maxzoom: 15,
		paint: {
			// increase weight as diameter breast height increases
			"heatmap-weight": {
				property: "dbh",
				type: "exponential",
				stops: [
					[1, 0],
					[62, 1],
				],
			},
			// increase intensity as zoom level increases
			"heatmap-intensity": {
				stops: [
					[11, 1],
					[15, 3],
				],
			},
			// assign color values be applied to points depending on their density
			"heatmap-color": [
				"interpolate",
				["linear"],
				["heatmap-density"],
				0,
				"rgba(236,222,239,0)",
				0.2,
				"#FFD445",
				0.4,
				"#FE9901",
				0.6,
				"#FE9901",
				0.8,
				"#FF9212",
			],
			// increase radius as zoom increases
			"heatmap-radius": {
				stops: [
					[11, 15],
					[15, 20],
				],
			},
			// decrease opacity to transition into the circle layer
			"heatmap-opacity": {
				default: 1,
				stops: [
					[14, 1],
					[15, 0],
				],
			},
		},
	});
};
export const drawAreaPotensial = (mapref, name, popup, color) => {};

// DUMMY SITE
// export const addDummyPoint = (mapRef, features) => {
export const addDummyPoint = (mapRef, longlat) => {
	var geojsonDummy = {
		type: "FeatureCollection",
		name: "merged",
		crs: {
			type: "name",
			properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
		},
		// features: features
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: longlat,
				},
			},
		],
	};
	mapRef.current.state.map.addSource("SourceDummy", {
		type: "geojson",
		data: geojsonDummy,
	});

	mapRef.current.state.map.addLayer({
		id: "LayerDummy",
		type: "circle",
		source: "SourceDummy",
		layout: {},
		paint: {
			"circle-radius": 8,
			"circle-color": "black",
		},
	});
	mapRef.current.state.map.flyTo({
		center: longlat,
		zoom: 14,
		essential: true,
		// speed: 0.2,
	});
};
export const removeDummyPoint = (mapRef) => {
	// Indonesia long lat center
	const target = [118.0148634, -2.548926];
	mapRef.current.state.map.removeLayer("LayerDummy");
	mapRef.current.state.map.removeSource("SourceDummy");
	mapRef.current.state.map.flyTo({
		center: target,
		zoom: 3.7,
		// essential: true,
	});
};

export const flyToPoint = (mapRef, longlat) => {
	// Indonesia long lat center
	const target = longlat;
	mapRef.current.state.map.flyTo({
		center: target,
		zoom: 15,
		essential: true,
	});
};

export const addGeoPoint = (mapRef, features) => {
	// mapRef.current.state.map.removeLayer("LayerDummy");
	// mapRef.current.state.map.removeSource("SourceDummy");

	var geojsonGeo = {
		type: "FeatureCollection",
		name: "merged",
		crs: {
			type: "name",
			properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
		},
		features: features,
	};
	mapRef.current.state.map.addSource("SourceGeo", {
		type: "geojson",
		data: geojsonGeo,
	});

	mapRef.current.state.map.addLayer({
		id: "LayerGeo",
		type: "circle",
		source: "SourceGeo",
		layout: {},
		paint: {
			"circle-radius": 6,
			"circle-color": "black",
		},
	});

	mapRef.current.state.map.flyTo({
		center: features[0].center,
		zoom: 11,
		essential: true,
		// speed: 0.2,
	});
};

export const removeGeoPoint = (mapRef) => {
	// Indonesia long lat center
	const target = [118.0148634, -2.548926];
	mapRef.current.state.map.removeLayer("LayerGeo");
	mapRef.current.state.map.removeSource("SourceGeo");
	mapRef.current.state.map.flyTo({
		center: target,
		zoom: 3.7,
		// essential: true,
	});
};
export const drawPolygonPotensial = (mapref, name, popup, color) => {
	let hoveredStateId = null;
	// const DATA = import(`../files/${name}.json`);
	const DATA = import(`../files/INDONESIA.json`);
	DATA.then((result) => {
		switch (name) {
			case "INDONESIA":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer({
					id: `${name}Layer`,
					type: "fill",
					maxzoom: 10,
					source: `${name}Source`,
					layout: {
						visibility: "visible",
					},
					paint: {
						"fill-color": "#ffb95a",
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.3,
							["==", ["feature-state", "hover"], "default"],
							0.5,
							0.5,
						],
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;
			case "pointPenduduk":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer({
					id: `${name}Layer`,
					type: "fill",
					maxzoom: 10,
					source: `${name}Source`,
					layout: {
						visibility: "none",
					},
					paint: {
						"fill-color": "green",
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.3,
							["==", ["feature-state", "hover"], "default"],
							0.5,
							0.5,
						],
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Penduduk: 525.000<h6>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;
			case "pointSebaranInternet":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer({
					id: `${name}Layer`,
					type: "fill",
					maxzoom: 10,
					source: `${name}Source`,
					layout: {
						visibility: "none",
					},
					paint: {
						"fill-color": "purple",
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.3,
							["==", ["feature-state", "hover"], "default"],
							0.5,
							0.5,
						],
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Titik: 350<h6>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;
			case "pointSebaranBTS":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: result,
				});

				mapref.addLayer({
					id: `${name}Layer`,
					type: "fill",
					maxzoom: 10,
					source: `${name}Source`,
					layout: {
						visibility: "none",
					},
					paint: {
						"fill-color": "blue",
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.3,
							["==", ["feature-state", "hover"], "default"],
							0.5,
							0.5,
						],
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>BTS: 200<h6>
				`;

					mapref.getCanvas().style.cursor = "pointer";
					if (e.features.length > 0) {
						if (hoveredStateId) {
							mapref.setFeatureState(
								{ source: `${name}Source`, id: hoveredStateId },
								{ hover: "default" }
							);
							popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(mapref);
						}

						hoveredStateId = e.features[0].properties.id;

						mapref.setFeatureState(
							{ source: `${name}Source`, id: hoveredStateId },
							{ hover: "hover" }
						);
					}
				});
				mapref.on("mouseleave", `${name}Layer`, function () {
					mapref.getCanvas().style.cursor = "";
					popup.remove();
				});
				break;

			default:
				break;
		}
	});
	// .then((x)=>{
	// 	mapref.moveLayer(`${name}Layer`)
	// });
};
