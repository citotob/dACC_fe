import foImg from "../../../../assets/images/FO.png";
import rlImg from "../../../../assets/images/RL.png";
import vsatImg from "../../../../assets/images/VSATIcon.png";
import custom_marker from "../../../../assets/images/custom_marker.png";

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
							"fill-color": "#d1d1d1",
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

export const drawGeoPoint = (mapref, name, dataTitikInternet, resFilter) => {
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

			// CIRCLE MARKER //
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

			// ICON MARKER //
			// mapref.loadImage(vsatImg, function (error, image) {
			// 	if (error) throw error;
			// 	mapref.addImage("vsat", image);
			// 	mapref.addSource(`${name}Source`, {
			// 		type: "geojson",
			// 		data: geojsonVSAT,
			// 	});
			// 	mapref.addLayer({
			// 		id: `${name}Layer`,
			// 		type: "symbol",
			// 		source: `${name}Source`,
			// 		layout: {
			// 			"icon-image": "vsat",
			// 			"icon-size": 0.5,
			// 			// "icon-color": "#5EA2F2",
			// 			visibility: "none",
			// 		},
			// 		// paint: {
			// 		// 	"icon-color": "red",
			// 		// },
			// 	});
			// });
			// mapref.moveLayer(`${name}Layer`)
			break;
		case "pointPenyedia":
			var geojsonPenyedia = {
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
					properties: {
						teknologi: e.teknologi,
						penyedia: e.vendor_name,
					},
				})),
			};

			// ICON MARKER //
			mapref.loadImage(rlImg, function (error, image) {
				if (error) throw error;
				mapref.addImage("RL", image, { sdf: true });
			});
			mapref.loadImage(foImg, function (error, image) {
				if (error) throw error;
				mapref.addImage("FO", image, { sdf: true });
			});
			mapref.loadImage(vsatImg, function (error, image) {
				if (error) throw error;
				mapref.addImage("VSAT", image, { sdf: true });
			});

			mapref.addSource(`${name}Source`, {
				type: "geojson",
				data: geojsonPenyedia,
			});
			mapref.addLayer({
				id: `${name}Layer`,
				type: "symbol",
				source: `${name}Source`,
				layout: {
					// "icon-image": [
					// 	"match",
					// 	["get", "teknologi"],
					// 	"RL",
					// 	"RL",
					// 	"FO",
					// 	"FO",
					// 	"VSAT",
					// 	"VSAT",
					// 	"RL",
					// ],
					// "icon-size": 0.45,
					visibility: "none",
					"text-field": ["get", "penyedia"],
					"text-variable-anchor": ["top", "bottom", "left", "right"],
					"text-radial-offset": 1,
					"text-justify": "auto",
					"text-size": 10,
					"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
				},
				// layout: {
				// 	"icon-image": ["concat", ["get", "icon"], "-15"],
				// },
				paint: {
					"icon-color": [
						"match",
						["get", "teknologi"],
						"RL",
						"red",
						"FO",
						"blue",
						"VSAT",
						"green",
						"black",
					],
					"text-color": [
						"match",
						["get", "penyedia"],
						"TELKOM",
						"black",
						"YUDHAWIRA",
						"blue",
						"TELENET",
						"green",
						"TANGARA",
						"pink",
						"SIMS",
						"#610a00",
						"SCM",
						"#eb8934",
						"PT. Adiputra",
						"#d3eb34",
						"PSN",
						"#44cf50",
						"PRIMACOM",
						"#44cfc6",
						"MTD",
						"#449ecf",
						"MORATEL",
						"#3c6ebd",
						"MMP",
						"#4545d1",
						"LINTASARTA",
						"#6f45d1",
						"KTP",
						"#922cdb",
						"IPT",
						"#7d1e87",
						"INFOKOM",
						"#e374c5",
						"INET",
						"#e36868",
						"ICON+",
						"#ffb5b5",
						"GOMEDS",
						"#7d7d7d",
						"DTP",
						"#5e00b0",
						"BKU",
						"#476100",
						"BAKTI",
						"#b5ffd6",
						"ARTACOM",
						"#910094",
						"APNGV2",
						"#c389c9",
						"AKSES ARTHA MEDIA",
						"#e67c70",
						"AJN",
						"#e67c70",
						"#757d20",
					],
					"text-halo-color": "#fff",
					"text-halo-width": 2,
				},
			});
			// mapref.moveLayer(`${name}Layer`)
			break;
		case "pointFilterKab":
			var geojsonFilterKab = {
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
					properties: {
						teknologi: e.teknologi,
						penyedia: e.vendor_name,
						kab_kota: e.kabupaten_name,
					},
				})),
			};

			// ICON MARKER //
			// mapref.current.state.map.loadImage(rlImg, function (error, image) {
			// 	if (error) throw error;
			// 	mapref.current.state.map.addImage("RL", image, { sdf: true });
			// });
			// mapref.current.state.map.loadImage(foImg, function (error, image) {
			// 	if (error) throw error;
			// 	mapref.current.state.map.addImage("FO", image, { sdf: true });
			// });
			// mapref.current.state.map.loadImage(vsatImg, function (error, image) {
			// 	if (error) throw error;
			// 	mapref.current.state.map.addImage("VSAT", image, { sdf: true });
			// });

			mapref.current.state.map.addSource(`pointFilterKabSource`, {
				type: "geojson",
				data: geojsonFilterKab,
			});

			// resFilter &&
			mapref.current.state.map.addLayer({
				id: `pointFilterKabLayer`,
				type: "symbol",
				source: `pointFilterKabSource`,
				layout: {
					// "icon-image": [
					// 	"match",
					// 	["get", "teknologi"],
					// 	"RL",
					// 	"RL",
					// 	"FO",
					// 	"FO",
					// 	"VSAT",
					// 	"VSAT",
					// 	"RL",
					// ],
					// "icon-size": ["match", ["get", "kab_kota"], resFilter, 0.45, "none"],
					// "icon-size": 1,
					visibility: "visible",
					"text-field": ["get", "penyedia"],
					"text-variable-anchor": ["top", "bottom", "left", "right"],
					"text-radial-offset": 1,
					"text-justify": "auto",
					"text-size": ["match", ["get", "kab_kota"], resFilter, 14, 0],
					"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
				},
				// layout: {
				// 	"icon-image": ["concat", ["get", "icon"], "-15"],
				// },
				paint: {
					"icon-color": [
						"match",
						["get", "teknologi"],
						"RL",
						"red",
						"FO",
						"blue",
						"VSAT",
						"green",
						"black",
					],
					"text-color": [
						"match",
						["get", "penyedia"],
						"TELKOM",
						"black",
						"YUDHAWIRA",
						"blue",
						"TELENET",
						"green",
						"TANGARA",
						"pink",
						"SIMS",
						"#610a00",
						"SCM",
						"#eb8934",
						"PT. Adiputra",
						"#d3eb34",
						"PSN",
						"#44cf50",
						"PRIMACOM",
						"#44cfc6",
						"MTD",
						"#449ecf",
						"MORATEL",
						"#3c6ebd",
						"MMP",
						"#4545d1",
						"LINTASARTA",
						"#6f45d1",
						"KTP",
						"#922cdb",
						"IPT",
						"#7d1e87",
						"INFOKOM",
						"#e374c5",
						"INET",
						"#e36868",
						"ICON+",
						"#ffb5b5",
						"GOMEDS",
						"#7d7d7d",
						"DTP",
						"#5e00b0",
						"BKU",
						"#476100",
						"BAKTI",
						"#b5ffd6",
						"ARTACOM",
						"#910094",
						"APNGV2",
						"#c389c9",
						"AKSES ARTHA MEDIA",
						"#e67c70",
						"AJN",
						"#e67c70",
						"#757d20",
					],
					"text-halo-color": "#fff",
					"text-halo-width": 2,
				},
			});
			// mapref.moveLayer(`${name}Layer`)
			break;

		default:
			break;
	}
};

export const drawGeoPointFilter = (
	mapref,
	dataTitikInternet,
	resFilter,
	kab_kec
) => {
	if (!dataTitikInternet) return alert("Internal Server Error");

	var geojsonFilterKab = {
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
			properties: {
				teknologi: e.teknologi,
				penyedia: e.vendor_name,
				kab_kota: e.kabupaten_name,
				kecamatan: e.kecamatan_name,
			},
		})),
	};

	// if (layer) {
	// 	mapref.current.state.map.removeLayer("pointFilterKabLayer");
	// 	mapref.current.state.map.removeSource("pointFilterKabSource");
	// }

	// ICON MARKER //
	// mapref.current.state.map.loadImage(rlImg, function (error, image) {
	// 	if (error) throw error;
	// 	mapref.current.state.map.addImage("RL", image, { sdf: true });
	// });
	// mapref.current.state.map.loadImage(foImg, function (error, image) {
	// 	if (error) throw error;
	// 	mapref.current.state.map.addImage("FO", image, { sdf: true });
	// });
	// mapref.current.state.map.loadImage(vsatImg, function (error, image) {
	// 	if (error) throw error;
	// 	mapref.current.state.map.addImage("VSAT", image, { sdf: true });
	// });
	mapref.current.state.map.loadImage(custom_marker, function (error, image) {
		if (error) throw error;
		mapref.current.state.map.addImage("custom_marker", image, { sdf: true });
	});

	mapref.current.state.map.addSource(`pointFilterKabSource`, {
		type: "geojson",
		data: geojsonFilterKab,
	});
	// console.log(resFilter);

	resFilter &&
		mapref.current.state.map.addLayer({
			id: `pointFilterKabLayer`,
			type: "symbol",
			source: `pointFilterKabSource`,
			// filter: ["has", "singles_count"],
			layout: {
				// "icon-image": [
				// 	"match",
				// 	["get", "teknologi"],
				// 	"RL",
				// 	"RL",
				// 	"FO",
				// 	"FO",
				// 	"VSAT",
				// 	"VSAT",
				// 	"RL",
				// ],
				"icon-image": "custom_marker",
				"icon-size": [
					"match",
					["get", kab_kec === "kabupaten" ? "kab_kota" : "kecamatan"],
					resFilter,
					0.6,
					0,
				],
				// "icon-size": 0.45,
				// visibility: "visible",
				"text-field": ["get", "penyedia"],
				"text-variable-anchor": ["top", "bottom", "left", "right"],
				"text-radial-offset": 1,
				"text-justify": "auto",
				"text-size": [
					"match",
					["get", kab_kec === "kabupaten" ? "kab_kota" : "kecamatan"],
					resFilter,
					12,
					0,
				],
				"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
				// ...(lokasi !== "Semua Lokasi"
				// 	? {
				// 			"icon-size": ["match", ["get", "kab_kota"], resFilter, 0.6, 0],
				// 	  }
				// 	: {
				// 			"icon-size": ["match", ["get", "kecamatan"], resFilter, 0.6, 0],
				// 	  }),
			},
			// layout: {
			// 	"icon-image": ["concat", ["get", "icon"], "-15"],
			// },
			paint: {
				"icon-color": [
					"match",
					["get", "teknologi"],
					"RL",
					"#F36666",
					"FO",
					"#D7C843",
					"VSAT",
					"#5EA2F2",
					"black",
				],
				"text-color": [
					"match",
					["get", "penyedia"],
					"TELKOM",
					"black",
					"YUDHAWIRA",
					"blue",
					"TELENET",
					"green",
					"TANGARA",
					"pink",
					"SIMS",
					"#610a00",
					"SCM",
					"#eb8934",
					"PT. Adiputra",
					"#d3eb34",
					"PSN",
					"#44cf50",
					"PRIMACOM",
					"#44cfc6",
					"MTD",
					"#449ecf",
					"MORATEL",
					"#3c6ebd",
					"MMP",
					"#4545d1",
					"LINTASARTA",
					"#6f45d1",
					"KTP",
					"#922cdb",
					"IPT",
					"#7d1e87",
					"INFOKOM",
					"#e374c5",
					"INET",
					"#e36868",
					"ICON+",
					"#ffb5b5",
					"GOMEDS",
					"#7d7d7d",
					"DTP",
					"#5e00b0",
					"BKU",
					"#476100",
					"BAKTI",
					"#b5ffd6",
					"ARTACOM",
					"#910094",
					"APNGV2",
					"#c389c9",
					"AKSES ARTHA MEDIA",
					"#e67c70",
					"AJN",
					"#e67c70",
					"#757d20",
				],
				"text-halo-color": "#fff",
				"text-halo-width": 2,
			},
		});
	// mapref.moveLayer(`${name}Layer`)
};
export const removeGeoPointFilter = (mapref) => {
	mapref.current.state.map.removeLayer("pointFilterKabLayer");
	mapref.current.state.map.removeSource("pointFilterKabSource");
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

		// zoom speed default:1
		speed: 3,
	});
};

export const flyToPointZoom = (mapRef, longlat, kab_kec) => {
	// Indonesia long lat center
	const target = longlat;
	mapRef.current.state.map.flyTo({
		center: target,
		zoom: kab_kec === "kabupaten" ? 9 : 11,
		speed: 1,
		essential: true,
	});
};
export const resetZoom = (mapRef, longlat) => {
	// Indonesia long lat center
	mapRef.current.state.map.flyTo({
		center: [118.0148634, -2.548926],
		zoom: 4.2,
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
export const drawPolygonPotensial = (
	mapref,
	name,
	popup,
	dataPenduduk,
	dataAI,
	dataBTS
) => {
	let hoveredStateId = null;
	if (!dataPenduduk || !dataAI) {
		alert("Terjadi Kesalahan");
	}
	// const DATA = import(`../files/${name}.json`);
	const DATA = import(`../files/INDONESIA.json`);
	DATA.then((result) => {
		let polygon_penduduk = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensi = dataPenduduk.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi: filterPotensi
							? filterPotensi.length !== 0
								? filterPotensi[0].potensi ?? ""
								: ""
							: "",
						kepadatan_penduduk: filterPotensi
							? filterPotensi.length !== 0
								? filterPotensi[0].jumlah_penduduk ?? ""
								: ""
							: "",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};
		let polygon_AI = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensi = dataAI.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi: filterPotensi
							? filterPotensi[0]
								? filterPotensi[0].potensi
								: "-"
							: "-",
						total_ai: filterPotensi
							? filterPotensi[0]
								? filterPotensi[0].total
								: "-"
							: "-",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};
		let polygon_BTS = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensi = dataBTS.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi: filterPotensi
							? filterPotensi[0]
								? filterPotensi[0].potensi
								: "-"
							: "-",
						total_bts: filterPotensi
							? filterPotensi[0]
								? filterPotensi[0].total
								: "-"
							: "-",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};
		let polygon_Penduduk_AI = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensiPenduduk = dataPenduduk.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				const filterPotensiAI = dataAI.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});

				const resPotensi =
					0.57 *
						(filterPotensiPenduduk
							? filterPotensiPenduduk.length !== 0
								? filterPotensiPenduduk[0].nilai ?? 0
								: 0
							: 0) +
					0.43 *
						(filterPotensiAI
							? filterPotensiAI.length !== 0
								? filterPotensiAI[0].nilai ?? 0
								: 0
							: 0);

				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi:
							resPotensi < 0.3
								? "high"
								: 0.3 < resPotensi < 0.6
								? "mid"
								: "low",
						kepadatan_penduduk: filterPotensiPenduduk
							? filterPotensiPenduduk.length !== 0
								? filterPotensiPenduduk[0].jumlah_penduduk ?? ""
								: ""
							: "",
						total_ai: filterPotensiAI
							? filterPotensiAI.length !== 0
								? filterPotensiAI[0].total ?? ""
								: ""
							: "",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};
		let polygon_Penduduk_BTS = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensiPenduduk = dataPenduduk.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				const filterPotensiBTS = dataBTS.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});

				const resPotensi =
					0.57 *
						(filterPotensiPenduduk
							? filterPotensiPenduduk.length !== 0
								? filterPotensiPenduduk[0].nilai ?? 0
								: 0
							: 0) +
					0.43 *
						(filterPotensiBTS
							? filterPotensiBTS.length !== 0
								? filterPotensiBTS[0].nilai ?? 0
								: 0
							: 0);

				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi:
							resPotensi < 0.3
								? "high"
								: 0.3 < resPotensi < 0.6
								? "mid"
								: "low",
						kepadatan_penduduk: filterPotensiPenduduk
							? filterPotensiPenduduk.length !== 0
								? filterPotensiPenduduk[0].jumlah_penduduk ?? ""
								: ""
							: "",
						total_bts: filterPotensiBTS
							? filterPotensiBTS.length !== 0
								? filterPotensiBTS[0].total ?? ""
								: ""
							: "",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};
		let polygon_AI_BTS = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensiAI = dataAI.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				const filterPotensiBTS = dataBTS.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});

				const resPotensi =
					0.5 *
						(filterPotensiAI
							? filterPotensiAI.length !== 0
								? filterPotensiAI[0].nilai ?? 0
								: 0
							: 0) +
					0.5 *
						(filterPotensiBTS
							? filterPotensiBTS.length !== 0
								? filterPotensiBTS[0].nilai ?? 0
								: 0
							: 0);

				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi:
							resPotensi < 0.3
								? "high"
								: 0.3 < resPotensi < 0.6
								? "mid"
								: "low",
						total_ai: filterPotensiAI
							? filterPotensiAI.length !== 0
								? filterPotensiAI[0].total ?? ""
								: ""
							: "",
						total_bts: filterPotensiBTS
							? filterPotensiBTS.length !== 0
								? filterPotensiBTS[0].total ?? ""
								: ""
							: "",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};
		let polygon_Penduduk_AI_BTS = {
			type: "FeatureCollection",
			name: "merged",
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
			},
			features: result.features.map((e, i) => {
				const filterPotensiPenduduk = dataPenduduk.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				const filterPotensiAI = dataAI.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});
				const filterPotensiBTS = dataBTS.filter((f) => {
					return (
						f.provinsi.toLowerCase() === e.properties.idfetch.toLowerCase()
					);
				});

				const resPotensi =
					0.4 *
						(filterPotensiPenduduk
							? filterPotensiPenduduk.length !== 0
								? filterPotensiPenduduk[0].nilai ?? 0
								: 0
							: 0) +
					0.3 *
						(filterPotensiAI
							? filterPotensiAI.length !== 0
								? filterPotensiAI[0].nilai ?? 0
								: 0
							: 0) +
					0.3 *
						(filterPotensiBTS
							? filterPotensiBTS.length !== 0
								? filterPotensiBTS[0].nilai ?? 0
								: 0
							: 0);

				return {
					type: e.type,
					id: e.id,
					properties: {
						id: e.properties.id,
						pk: e.properties.pk,
						south: e.properties.south,
						west: e.properties.west,
						north: e.properties.north,
						east: e.properties.east,
						code: e.properties.code,
						idfetch: e.properties.idfetch,
						provinsi: e.properties.provinsi,
						potensi:
							resPotensi < 0.3
								? "high"
								: 0.3 < resPotensi < 0.6
								? "mid"
								: "low",
						kepadatan_penduduk: filterPotensiPenduduk
							? filterPotensiPenduduk.length !== 0
								? filterPotensiPenduduk[0].jumlah_penduduk ?? ""
								: ""
							: "",
						total_ai: filterPotensiAI
							? filterPotensiAI.length !== 0
								? filterPotensiAI[0].total ?? ""
								: ""
							: "",
						total_bts: filterPotensiBTS
							? filterPotensiBTS.length !== 0
								? filterPotensiBTS[0].total ?? ""
								: ""
							: "",
					},
					geometry: {
						type: e.geometry.type,
						coordinates: e.geometry.coordinates,
					},
				};
			}),
		};

		// console.log("penduduk", dataPenduduk);
		// console.log("ai", dataAI);
		// console.log("bts", dataBTS);

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
					data: polygon_penduduk,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					// let kep_penduduk =
					// 	dataPenduduk.length !== 0 &&
					// 	dataPenduduk.filter(
					// 		(dat) =>
					// 			dat.label.toLowerCase() ==
					// 			e.features[0].properties.idfetch.toLowerCase()
					// 	);
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Penduduk: 
					${(e.features[0].properties.kepadatan_penduduk * 1000).toLocaleString()}
				<h6>
				<h6>Potensi: 
					${e.features[0].properties.potensi}
				<h6>
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
					data: polygon_AI,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
					<h5>${e.features[0].properties.provinsi}<h5>
					<h6>Total AI: 
						${e.features[0].properties.total_ai.toLocaleString()}
					<h6>
					<h6>Potensi: 
						${e.features[0].properties.potensi}
					<h6>
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
					data: polygon_BTS,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					let popInfo = `
					<h5>${e.features[0].properties.provinsi}<h5>
					<h6>Total BTS: 
						${e.features[0].properties.total_bts.toLocaleString()}
					<h6>
					<h6>Potensi: 
						${e.features[0].properties.potensi}
					<h6>
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
			case "pointPendudukDanAI":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: polygon_Penduduk_AI,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					// let kep_penduduk =
					// 	dataPenduduk.length !== 0 &&
					// 	dataPenduduk.filter(
					// 		(dat) =>
					// 			dat.label.toLowerCase() ==
					// 			e.features[0].properties.idfetch.toLowerCase()
					// 	);
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Penduduk: 
					${(e.features[0].properties.kepadatan_penduduk * 1000).toLocaleString()}
				<h6>
				<h6>Total AI: 
					${e.features[0].properties.total_ai.toLocaleString()}
				<h6>
				<h6>Potensi: 
					${e.features[0].properties.potensi}
				<h6>
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
			case "pointPendudukDanBTS":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: polygon_Penduduk_BTS,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					// let kep_penduduk =
					// 	dataPenduduk.length !== 0 &&
					// 	dataPenduduk.filter(
					// 		(dat) =>
					// 			dat.label.toLowerCase() ==
					// 			e.features[0].properties.idfetch.toLowerCase()
					// 	);
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Penduduk: 
					${(e.features[0].properties.kepadatan_penduduk * 1000).toLocaleString()}
				<h6>
				<h6>Total BTS: 
					${e.features[0].properties.total_bts.toLocaleString()}
				<h6>
				<h6>Potensi: 
					${e.features[0].properties.potensi}
				<h6>
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
			case "pointAIDanBTS":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: polygon_AI_BTS,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					// let kep_penduduk =
					// 	dataPenduduk.length !== 0 &&
					// 	dataPenduduk.filter(
					// 		(dat) =>
					// 			dat.label.toLowerCase() ==
					// 			e.features[0].properties.idfetch.toLowerCase()
					// 	);
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Total AI: 
					${e.features[0].properties.total_ai.toLocaleString()}
				<h6>
				<h6>Total BTS: 
					${e.features[0].properties.total_bts.toLocaleString()}
				<h6>
				<h6>Potensi: 
					${e.features[0].properties.potensi}
				<h6>
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
			case "pointPendudukAIBTS":
				mapref.addSource(`${name}Source`, {
					type: "geojson",
					data: polygon_Penduduk_AI_BTS,
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
						"fill-color": [
							"match",
							["get", "potensi"],
							"low",
							"#FD2D2D",
							"mid",
							"#fe981b",
							"high",
							"#fcd303",
							"#d1d1d1",
						],
						"fill-opacity": [
							"case",
							["==", ["feature-state", "hover"], "hover"],
							0.7,
							["==", ["feature-state", "hover"], "default"],
							1,
							1,
						],
						"fill-outline-color": "black",
					},
				});
				mapref.on("mousemove", `${name}Layer`, function (e) {
					// let kep_penduduk =
					// 	dataPenduduk.length !== 0 &&
					// 	dataPenduduk.filter(
					// 		(dat) =>
					// 			dat.label.toLowerCase() ==
					// 			e.features[0].properties.idfetch.toLowerCase()
					// 	);
					let popInfo = `
				<h5>${e.features[0].properties.provinsi}<h5>
				<h6>Penduduk: 
					${(e.features[0].properties.kepadatan_penduduk * 1000).toLocaleString()}
				<h6>
				<h6>Total AI: 
					${e.features[0].properties.total_ai.toLocaleString()}
				<h6>
				<h6>Total BTS: 
					${e.features[0].properties.total_bts.toLocaleString()}
				<h6>
				<h6>Potensi: 
					${e.features[0].properties.potensi}
				<h6>
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
