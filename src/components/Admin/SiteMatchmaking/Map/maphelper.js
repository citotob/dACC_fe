export const drawGeoPoint = (mapRef, popup, dataTitikInternet) => {
	if (dataTitikInternet === null) return alert("Internal Server Error");
	var geojson = {
		type: "FeatureCollection",
		name: "merged",
		crs: {
			type: "name",
			properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
		},
		features:
			dataTitikInternet !== ""
				? dataTitikInternet.map((e) => ({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [e.lng, e.lat],
						},
						properties: {
							kt: e.kt,
							prov: e.prov,
							kk: e.kk,
							kec: e.kec,
							des: e.des,
						},
				  }))
				: "",
	};
	mapRef.addSource("SourceSMM", {
		type: "geojson",
		data: geojson,
	});

	mapRef.addLayer({
		id: "LayerSMM",
		type: "circle",
		source: "SourceSMM",
		layout: {
			visibility: "visible",
		},
		paint: {
			"circle-radius": 7,
			"circle-color": "red",
		},
	});

	mapRef.on("click", "LayerSMM", function (e) {
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description = `
		<table>
			<tr>
				<th>Kode Titik</th>
				<th> : </th>
				<th>${e.features[0].properties.kt}</th>
			</tr>
			<tr>
				<td>Provinsi</td>
				<td> : </td>
				<td>${e.features[0].properties.prov}</td>
			</tr>
			<tr>
				<td>Kab/Kot </td>
				<td> : </td>
				<td>${e.features[0].properties.kk}</td>
			</tr>
			<tr>
				<td>Kecamatan </td>
				<td> : </td>
				<td>${e.features[0].properties.kec}</td>
			</tr>
			<tr>
				<td>Desa </td>
				<td> : </td>
				<td>${e.features[0].properties.des}</td>
			</tr>
		</table>
		
		`;

		// Ensure that if the mapRef is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates).setHTML(description).addTo(mapRef);
	});

	// Change the cursor to a pointer when the mouse is over the places layer.
	mapRef.on("mouseenter", "LayerSMM", function () {
		mapRef.getCanvas().style.cursor = "pointer";
	});

	// Change it back to a pointer when it leaves.
	mapRef.on("mouseleave", "LayerSMM", function () {
		mapRef.getCanvas().style.cursor = "";
	});
};

export const flyToPoint = (mapRef, longlat, popup) => {
	// Indonesia long lat center
	const target = longlat;
	mapRef.current.state.map.flyTo({
		center: target,
		zoom: 15,
		essential: true,
		speed: 1.5,
	});
	// mapRef.current.state.map.on('click', 'LayerSMM', function(e) {
	// 	popup
	// 	.setLngLat(longlat)
	// 	.setHTML(`Country name: asdasdadas`)
	// 	.addTo(mapRef);
	// 	});
};
