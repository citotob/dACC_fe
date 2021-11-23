import {
  SET_STATEIMAGE_SECTION1,
  SET_STATEIMAGE_SECTION2,
  SET_STATEIMAGE_SECTION3,
  SET_STATEIMAGE_SECTION4,
  SET_STATEIMAGE_SECTION5,
  SET_STATEIMAGE_SECTION6,
  SET_STATEIMAGE_SECTION7,
  SET_STATEIMAGE_SECTION8,
  SET_STATEIMAGE_SECTION9,
  SET_STATEIMAGE_SECTION10,
  SET_STATEIMAGE_SECTION11,
  SET_STATEIMAGE_SECTION12,
  SET_STATEIMAGE_SECTION13,
  SET_STATEIMAGE_SECTION14,
  SET_STATEIMAGE_SECTION15,
  SET_STATEIMAGE_SECTION16,
  SET_STATEIMAGE_SECTION17,
  SET_STATEIMAGE_SECTION18,
  SET_STATEIMAGE_SECTION19,
  SET_STATEIMAGE_SECTION20,
  SET_STATEIMAGE_SECTION21,
} from "./actionTypes";

const initialState = {
  section1: {
    disiapkanoleh: "",
    namaproject: "",
    tanggalkunjungan: "",
    namasurveyor: "",
    nomortelepon: "",
    email: "",
    statussite: "",
  },
  section2: {
    namasite: "",
    tipesite: "",
    tipecakupansite: "",
    alamat: "",
    namapicdaerah: "",
    nomorteleponpic: "",
    alamatpicdaerah: "",
    akseskelokasi: "",
    jarakdarisitekajalanutama: "",
    luasaksesjalan: "",
    kondisiaksesjalan: "",
    aksesdarat: "",
    aksessungailaut: "",
    jaraktempuh: "",
    perizinanakseskesite: "",
    jarakdarikotakelokasidannamakota: "",
    kondisiperalatan: "",
    pilihtipeantena: "",
  },
  section3: {
    tinggitowerpole: "",
    tipetower: "",
    koordinatgpswgs84_lat: "",
    koordinatgpswgs84_long: "",
    koordinatgpswgs84_height: "",
  },
  section4: {
    penempatanantena: "",
    alasantena: "",
    diameterantena: "",
    penggunaansatelit: "",
    azimuth: "",
    elevasi: "",
  },
  section5: {
    ketinggiantowerpole: "",
    kepemilikanlahan: "",
    namapemiliklahan: "",
    nomorpemiliklahan: "",
    nomorpemiliklahan: "",
    keamanan: "",
    luaslahan: "",
  },
  section6: {
    kemampuanjarakradius5kmdarisite: "",
    tipesinyalyangtersedia: "",
    levelsinyal4gjikaadajangkauan: "",
    calldisite: "",
    smsdisite: "",
    namaoperator: [],
  },
  section7: {
    topografiumum: "",
    deskripsiareajangkauan: "",
    tipeproperty: "",
    statuslahan: "",
    pengurusanimb: "",
    landclassification: "",
    obyekpenghalang: "",
    kondisiperubahanlahan: "",
    tipetanah: "",
    dekatlautsungai: "",
    resikobencana: "",
    resikobencanainput: "",
    materialsetempat: "",
    resikorelokasi: "",
    resikokeluhan: "",
  },
  section8: {
    sumberdaya: "",
    kemampuankelistrikan: "",
    kekuatankelistrikan: "",
    jumlahjamketersediaanlistrik: "",
    jarakdarisumberdayalistrik: "",
    generatorbackup: "",
    brandgenerator: "",
    inputkapasitas: "",
    kemampuanbahanbensin: "",
    tipebahanbakaryangtersedia: "",
    hargabbmdilokasi: "",
    listrikbisadigunakanuntukalat: "",
  },
  section9: {
    suratkepimilikantanah: "",
    kebutuhanizin: "",
  },
  section10: {
    populasiorangkk: "",
    kepadatanpopulasi: "",
    distribusipopulasi: "",
    desaterdekat: "",
    desaterdekatinput: "",
    jarakdesaterdekat: "",
    livelihood: "",
    populasipenggunatelfongenggam: "",
    tipepenggunatelfongenggam: [],
    simcardyangtersedia: [],
    pendudukyangbisadilatihuntukmenggunakanprodukjasa: "",
    rumahyangmempunyaigenerator: "",
    catatanlainnya: "",
    aksesinternet: "",
    aksesinternetinput: "",
  },
  section11: {
    foto: "",
    lat: "",
    lon: "",
    deskripsi: "",
  },
  section12: {
    layoutsite: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    towerkesumberdaya: "",
    towerkeantenavsat: "",
    towerkesolarpanel: "",
  },
  section13: {
    gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    makinggps: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    fotosisiutara: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    fotosisitimur: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },

    fotosisiselatan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    fotosisibarat: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
  },
  section14: {
    coverageandobstacleinformation: [
      {
        data: {
          derajat: "",
          jarak: "",
          deskripsi: "",
        },
      },
    ],
  },
  section15: {
    photocapturegnettrack05km: [
      {
        data: {
          sector: "",
          jarak: "",
          foto: {
            foto: "",
            lat: "",
            lon: "",
            deskripsi: "",
          },
        },
      },
    ],
    photocapturegnettrack5km: [
      {
        data: {
          sector: "",
          jarak: "",
          foto: {
            foto: "",
            lat: "",
            lon: "",
            deskripsi: "",
          },
        },
      },
    ],
  },
  section16: {
    photocapturegnettrackroadroute: [
      {
        data: {
          sector: "",
          jarak: "",
          foto: {
            foto: "",
            lat: "",
            lon: "",
            deskripsi: "",
          },
        },
      },
    ],
  },
  section17: {
    locationmapping: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    posisiyangditawarkan: {
      foto: "",
      lat: "",
      lon: "",
      elevasi: "",
    },
    kandidat1: {
      foto: "",
      lat: "",
      lon: "",
      elevasi: "",
    },
    kandidat2: {
      foto: "",
      lat: "",
      lon: "",
      elevasi: "",
    },
  },
  section18: {
    sector0: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector45: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector90: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector135: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector180: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector225: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector270: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
    sector315: {
      topografi: "",
      topografiIndex: "",
      landscape: "",
      landscapeIndex: "",
      demografi: "",
      demografiIndex: "",
    },
  },
  section19: {
    sector0gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    sector45gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    sector135gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    sector180gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    sector225gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    sector270gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    sector315gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    tempatpengambilanfoto: "",
  },
  section20: {
    aksessite1gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    aksessite2gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    aksessite3gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
    aksessite4gambarlahan: {
      foto: "",
      lat: "",
      lon: "",
      deskripsi: "",
    },
  },
  section21: {
    generalcomment: "",
  },
};

const formSurveyStaff = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE_SECTION1:
      state = {
        ...state,
        section1: action.payload,
      };
      break;
    case SET_STATE_SECTION2:
      state = {
        ...state,
        section2: action.payload,
      };
      break;
    case SET_STATE_SECTION3:
      state = {
        ...state,
        section3: action.payload,
      };
      break;
    case SET_STATE_SECTION4:
      state = {
        ...state,
        section4: action.payload,
      };
      break;
    case SET_STATE_SECTION5:
      state = {
        ...state,
        section5: action.payload,
      };
      break;
    case SET_STATE_SECTION6:
      state = {
        ...state,
        section6: action.payload,
      };
      break;
    case SET_STATE_SECTION7:
      state = {
        ...state,
        section7: action.payload,
      };
      break;
    case SET_STATE_SECTION8:
      state = {
        ...state,
        section8: action.payload,
      };
      break;
    case SET_STATE_SECTION9:
      state = {
        ...state,
        section9: action.payload,
      };
      break;
    case SET_STATE_SECTION10:
      state = {
        ...state,
        section10: action.payload,
      };
      break;
    case SET_STATE_SECTION11:
      state = {
        ...state,
        section11: action.payload,
      };
      break;
    case SET_STATE_SECTION12:
      state = {
        ...state,
        section12: action.payload,
      };
      break;
    case SET_STATE_SECTION13:
      state = {
        ...state,
        section13: action.payload,
      };
      break;
    case SET_STATE_SECTION14:
      state = {
        ...state,
        section14: action.payload,
      };
      break;
    case SET_STATE_SECTION15:
      state = {
        ...state,
        section15: action.payload,
      };
      break;
    case SET_STATE_SECTION16:
      state = {
        ...state,
        section16: action.payload,
      };
      break;
    case SET_STATE_SECTION17:
      state = {
        ...state,
        section17: action.payload,
      };
      break;
    case SET_STATE_SECTION18:
      state = {
        ...state,
        section18: action.payload,
      };
      break;
    case SET_STATE_SECTION19:
      state = {
        ...state,
        section19: action.payload,
      };
      break;
    case SET_STATE_SECTION20:
      state = {
        ...state,
        section20: action.payload,
      };
      break;
    case SET_STATE_SECTION21:
      state = {
        ...state,
        section21: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default formSurveyStaff;
