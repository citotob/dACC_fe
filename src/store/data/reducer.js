import {
	DATA_NOTIF,
	DATA_CLUSTER,
	DATA_RECOMMEND,
	DATA_TEKNOLOGI,
	COPY_FORM_VENDOR_PENAWARAN,
	DATA_DOC,
} from "./actionTypes";

const initialState = {
	dataNotif: { data: "empty" },
	dataCluster: { data: "empty" },
	dataRecommend: { data: "empty" },
	dataTeknologi: { data: "empty" },
	dataFormVendorPenawaran: { data: "empty" },
	dataDocUpload: { data: null },
};

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case DATA_NOTIF:
			state = {
				...state,
				dataNotif: { data: action.payload },
			};
		case DATA_CLUSTER:
			state = {
				...state,
				dataCluster: { data: action.payload },
			};
		case DATA_RECOMMEND:
			state = {
				...state,
				dataRecommend: { data: action.payload },
			};
		case DATA_TEKNOLOGI:
			state = {
				...state,
				dataTeknologi: { data: action.payload },
			};
		case COPY_FORM_VENDOR_PENAWARAN:
			state = {
				...state,
				dataFormVendorPenawaran: { data: action.payload },
			};
		case DATA_DOC:
			state = {
				...state,
				dataDocUpload: { data: action.payload },
			};

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default dataReducer;
