import React, { useState, useEffect } from "react";
import MapPage from "./Map/MapPage";
import { LocalProvider } from "./LocalContext";

const ExploreData = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 200);
	}, []);
	return <LocalProvider>{loading ? "" : <MapPage />}</LocalProvider>;
};

export default ExploreData;
