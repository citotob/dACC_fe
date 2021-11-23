import {
  SET_STATE_AISECTION1,
  SET_STATE_AISECTION2,
  SET_STATE_AISECTION3,
} from "./actionTypes";

const initialState = {
  aisection1: {
    kategori: "",
    namaPic: "",
    phonePic: "",
    tanggalPelaksanaan: "",
    namaLokasi: "",
    latitude: "",
    longitude: "",
    darat: [],
    daratinput: "",
    laut: [],
    lautinput: "",
    udara: [],
    udarainput: "",
    durasiPerjalanan: "",
    namaKotaKecamatan: "",
    elevation: "",
    tipeBisnis: "",
    alamatLokasi: "",
    idPelangganPLN: "",
    sumber_listrik: "",
    kapasitas_listrik: "",
    sumber_cadangan: "",
    jamOperasionalListrikmulai: "",
    jamOperasionalListrikselesai: "",
    jamOperasionalLokalmulai: "",
    jamOperasionalLokalselesai: "",
    note: "",
  },
  aisection2: {
    pc: "",
    tablet: "",
    smartPhone: "",
    laptop: "",
    lainnya1Name: "",
    lainnya1Qty: "",
    lainnya2Name: "",
    lainnya2Qty: "",
  },
  aisection3: {
    fileAkses: "",
    fileAksesname: "",
    filePlang: "",
    filePlangname: "",
    fileMarking: "",
    fileMarkingname: "",
    filePln: "",
    filePlnname: "",
    fileDenah: "",
    fileDenahname: "",
    fileLanskap: "",
    fileLanskapname: "",
    download: "",
    upload: "",
    tipenetwork: "",
  },
};

const formSurveyStaffAI = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE_AISECTION1:
      state = {
        ...state,
        aisection1: action.payload,
      };
      break;
    case SET_STATE_AISECTION2:
      state = {
        ...state,
        aisection2: action.payload,
      };
      break;
    case SET_STATE_AISECTION3:
      state = {
        ...state,
        aisection3: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default formSurveyStaffAI;
