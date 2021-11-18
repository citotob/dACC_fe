import {
	DATA_NOTIF,
	DATA_CLUSTER,
	DATA_RECOMMEND,
	DATA_TEKNOLOGI,
	COPY_FORM_VENDOR_PENAWARAN,
	DATA_DOC,
} from "./actionTypes";

export const getDatasNotif = (data) => {
	return {
		type: DATA_NOTIF,
		payload: { data },
	};
};

export const changeDataCluster = (prov, kab, kec, empty) => {
	let payload;
	if (empty) {
		/*
		empty if initial render create batch 
		or 
		singleinput/bulk
		*/
		payload = "empty";
	} else {
		//not empty if clustering
		payload = {
			idProv: prov,
			idKab: kab,
			idKec: kec,
		};
	}
	return {
		type: DATA_CLUSTER,
		payload: payload,
	};
};

export const getDataRecommend = (data) => {
	return {
		type: DATA_RECOMMEND,
		payload: { data },
	};
};
export const getDataTeknologi = (data) => {
	return {
		type: DATA_TEKNOLOGI,
		payload: data,
	};
};
export const copyFormVendorPenawaran = (data) => {
	return {
		type: COPY_FORM_VENDOR_PENAWARAN,
		payload: data,
	};
};
export const getDoc = (data) => {
	return {
		type: DATA_DOC,
		payload: data,
	};
};
