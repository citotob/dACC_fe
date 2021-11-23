import React, { useState, useEffect } from "react";
import { Alert, Modal, Card, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  setSection1,
  setSection2,
  setSection3,
  setSection4,
  setSection5,
  setSection6,
  setSection7,
  setSection8,
  setSection9,
  setSection10,
  setSection11,
  setSection12,
  setSection13,
  setSection14,
  setSection15,
  setSection16,
  setSection17,
  setSection18,
  setSection19,
  setSection20,
  setSection22,
} from "../../../store/formSurveyStaff/action";
import { setShowAlertSent } from "../../../store/simpanFormAlert/action";
// IMPORT STYLE
import style from "./style.module.scss";

// import icons
// import mapIcon from "../../../assets/icons/map-icon.svg";

//import API
import API from "../../../services";

function CardConfirm(props) {
  // location
  const location = useLocation();
  const locationKodeSurvey = location.state.datatable._id;

  // imports
  const history = useHistory();
  const dispatch = useDispatch();

  // local storage
  let role = window.localStorage.getItem("roleName");
  const userid = window.localStorage.getItem("userid");
  const orgid = window.localStorage.getItem("org");

  // location state
  const activeTab = props?.activeTab?.toLowerCase() ?? "";
  const data = props.datatable;
  const kodeSurvey = data?.kode;
  const latitude = data?.data[0]?.latitude;
  const longitude = data?.data[0]?.longitude;

  // modal states
  const [modalConfirmSubmit, setModalConfirmSubmit] = useState(false);

  // fill input state
  const [allFilled, setAllFilled] = useState(false);

  // redux
  const section1 = useSelector((state) => state.FormSurveyStaff.section1);
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);
  const section3 = useSelector((state) => state.FormSurveyStaff.section3);
  const section4 = useSelector((state) => state.FormSurveyStaff.section4);
  const section5 = useSelector((state) => state.FormSurveyStaff.section5);
  const section6 = useSelector((state) => state.FormSurveyStaff.section6);
  const section7 = useSelector((state) => state.FormSurveyStaff.section7);
  const section8 = useSelector((state) => state.FormSurveyStaff.section8);
  const section9 = useSelector((state) => state.FormSurveyStaff.section9);
  const section10 = useSelector((state) => state.FormSurveyStaff.section10);
  const section11 = useSelector((state) => state.FormSurveyStaff.section11);
  const section12 = useSelector((state) => state.FormSurveyStaff.section12);
  const section13 = useSelector((state) => state.FormSurveyStaff.section13);
  const section14 = useSelector((state) => state.FormSurveyStaff.section14);
  const section15 = useSelector((state) => state.FormSurveyStaff.section15);
  const section16 = useSelector((state) => state.FormSurveyStaff.section16);
  const section17 = useSelector((state) => state.FormSurveyStaff.section17);
  const section18 = useSelector((state) => state.FormSurveyStaff.section18);
  const section19 = useSelector((state) => state.FormSurveyStaff.section19);
  const section20 = useSelector((state) => state.FormSurveyStaff.section20);
  const section22 = useSelector((state) => state.FormSurveyStaff.section22);

  // section strings
  // let strSection1 = "section1";
  // let strSection2 = "section2";
  // let strSection3 = "section3";
  // let strSection4 = "section4";
  // let strSection5 = "section5";
  // let strSection6 = "section6";
  // let strSection7 = "section7";
  // let strSection8 = "section8";
  // let strSection9 = "section9";
  // let strSection10 = "section10";
  // let strSection11 = "section11";
  // let strSection12 = "section12";
  // let strSection13 = "section13";
  // let strSection14 = "section14";
  // let strSection1505 = "section1505";
  // let strSection155 = "section155";
  // let strSection16 = "section16";
  // let strSection17 = "section17";
  // let strSection18 = "section18";
  // let strSection19 = "section19";
  // let strSection20 = "section20";
  // let strSection22 = "section22";

  // const idSurvey = location.state.datatable._id;

  // let localSection1 = JSON.parse(
  //   window.localStorage.getItem(strSection1.concat(idSurvey))
  // );
  // let localSection2 = JSON.parse(
  //   window.localStorage.getItem(strSection2.concat(idSurvey))
  // );
  // let localSection3 = JSON.parse(
  //   window.localStorage.getItem(strSection3.concat(idSurvey))
  // );
  // let localSection4 = JSON.parse(
  //   window.localStorage.getItem(strSection4.concat(idSurvey))
  // );
  // let localSection5 = JSON.parse(
  //   window.localStorage.getItem(strSection5.concat(idSurvey))
  // );
  // let localSection6 = JSON.parse(
  //   window.localStorage.getItem(strSection6.concat(idSurvey))
  // );
  // let localSection7 = JSON.parse(
  //   window.localStorage.getItem(strSection7.concat(idSurvey))
  // );
  // let localSection8 = JSON.parse(
  //   window.localStorage.getItem(strSection8.concat(idSurvey))
  // );
  // let localSection9 = JSON.parse(
  //   window.localStorage.getItem(strSection9.concat(idSurvey))
  // );
  // let localSection10 = JSON.parse(
  //   window.localStorage.getItem(strSection10.concat(idSurvey))
  // );
  // let localSection11 = JSON.parse(
  //   window.localStorage.getItem(strSection11.concat(idSurvey))
  // );
  // let localSection12 = JSON.parse(
  //   window.localStorage.getItem(strSection12.concat(idSurvey))
  // );
  // let localSection13 = JSON.parse(
  //   window.localStorage.getItem(strSection13.concat(idSurvey))
  // );
  // let localSection14 = JSON.parse(
  //   window.localStorage.getItem(strSection14.concat(idSurvey))
  // );
  // let localSection1505 = JSON.parse(
  //   window.localStorage.getItem(strSection1505.concat(idSurvey))
  // );
  // let localSection155 = JSON.parse(
  //   window.localStorage.getItem(strSection155.concat(idSurvey))
  // );
  // let localSection16 = JSON.parse(
  //   window.localStorage.getItem(strSection16.concat(idSurvey))
  // );
  // let localSection17 = JSON.parse(
  //   window.localStorage.getItem(strSection17.concat(idSurvey))
  // );
  // let localSection18 = JSON.parse(
  //   window.localStorage.getItem(strSection18.concat(idSurvey))
  // );
  // let localSection19 = JSON.parse(
  //   window.localStorage.getItem(strSection19.concat(idSurvey))
  // );
  // let localSection20 = JSON.parse(
  //   window.localStorage.getItem(strSection20.concat(idSurvey))
  // );
  // let localSection22 = JSON.parse(
  //   window.localStorage.getItem(strSection22.concat(idSurvey))
  // );

  // modal functions
  function tog_setuju() {
    setModalConfirmSubmit(!modalConfirmSubmit);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // handleApprove
  const handleSubmitForm = () => {
    let params1 = {
      user_id: userid,
      organization_id: orgid,
      kode_survei_short: kodeSurvey.split("-")[2],
      kode_survei: kodeSurvey,
      latitude: latitude,
      longitude: longitude,
      kategori: "Kantor Desa",
      page1: {
        disiapkanoleh: section1.disiapkanoleh,
        namaproject: section1.namaproject,
        tanggalkunjungan: section1.tanggalkunjungan,
        namasurveyor: section1.namasurveyor,
        nomortelepon: section1.nomortelepon,
        email: section1.email,
        statussite: section1.statussite,
      },
      page2: {
        namasite: section2.namasite,
        tipesite: section2.tipesite,
        tipecakupansite: section2.tipecakupansite,
        alamat: section2.alamat,
        namapicdaerah: section2.namapicdaerah,
        nomorteleponpic: section2.nomorteleponpic,
        alamatpicdaerah: section2.alamatpicdaerah,
        akseskelokasi: section2.akseskelokasi,
        jarakdarisitekajalanutama: section2.jarakdarisitekajalanutama,
        luasaksesjalan: section2.luasaksesjalan,
        kondisiaksesjalan: section2.kondisiaksesjalan,
        aksesdarat: section2.aksesdarat,
        aksessungailaut: section2.aksessungailaut,
        jaraktempuh: section2.jaraktempuh,
        perizinanakseskesite: section2.perizinanakseskesite,
        jarakdarikotakelokasidannamakota:
          section2.jarakdarikotakelokasidannamakota,
        kondisiperalatan: section2.kondisiperalatan,
        pilihtipeantena: section2.pilihtipeantena,
      },
      page3: {
        tinggitowerpole: section3.tinggitowerpole,
        tipetower: section3.tipetower,
        "koordinatgpswgs84-lat": section3.koordinatgpswgs84_lat,
        "koordinatgpswgs84-long": section3.koordinatgpswgs84_long,
        "koordinatgpswgs84-height": section3.koordinatgpswgs84_height,
      },
      page4: {
        penempatanantena: section4.penempatanantena,
        alasantena: section4.alasantena,
        diameterantena: section4.diameterantena,
        penggunaansatelit: section4.penggunaansatelit,
        azimuth: section4.azimuth,
        elevasi: section4.elevasi,
      },
      page5: {
        ketinggiantowerpole: section5.ketinggiantowerpole,
        kepemilikanlahan: section5.kepemilikanlahan,
        namapemiliklahan: section5.namapemiliklahan,
        nomorpemiliklahan: section5.nomorpemiliklahan,
        kondisilahan: section5.kondisilahan,
        kondisisosial: section5.kondisisosial,
        keamanan: section5.keamanan,
        luaslahan: section5.luaslahan,
      },
    };

    API.createSurveyBTSPart1(params1)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          console.log("API SUCCESS Submit Part 1 :  > ", res);
          let surveyID = res.data.values.post_id.$oid;
          console.log("masuk post id: ", surveyID);
          let params2 = {
            id: surveyID,
            data: {
              page6: {
                kemampuanjarakradius5kmdarisite:
                  section6.kemampuanjarakradius5kmdarisite,
                tipesinyalyangtersedia: section6.tipesinyalyangtersedia,
                levelsinyal4gjikaadajangkauan:
                  section6.levelsinyal4gjikaadajangkauan,
                calldisite: section6.calldisite,
                smsdisite: section6.smsdisite,
                namaoperator: section6.namaoperator,
              },
              page7: {
                topografiumum: section7.topografiumum,
                deskripsiareajangkauan: section7.deskripsiareajangkauan,
                tipeproperty: section7.tipeproperty,
                statuslahan: section7.statuslahan,
                pengurusanimb: section7.pengurusanimb,
                landclassification: section7.landclassification,
                obyekpenghalang: section7.obyekpenghalang,
                kondisiperubahanlahan: section7.kondisiperubahanlahan,
                tipetanah: section7.tipetanah,
                dekatlautsungai: section7.dekatlautsungai,
                resikobencana: section7.resikobencana,
                materialsetempat: section7.materialsetempat,
                resikorelokasi: section7.resikorelokasi,
                resikokeluhan: section7.resikokeluhan,
              },
              page8: {
                sumberdaya: section8.sumberdaya,
                kemampuankelistrikan: section8.kemampuankelistrikan,
                kekuatankelistrikan: section8.kekuatankelistrikan,
                jumlahjamketersediaanlistrik:
                  section8.jumlahjamketersediaanlistrik,
                jarakdarisumberdayalistrik: section8.jarakdarisumberdayalistrik,
                generatorbackup: section8.generatorbackup,
                kemampuanbahanbensin: section8.kemampuanbahanbensin,
                tipebahanbakaryangtersedia: section8.tipebahanbakaryangtersedia,
                hargabbmdilokasi: section8.hargabbmdilokasi,
                listrikbisadigunakanuntukalat:
                  section8.listrikbisadigunakanuntukalat,
              },
              page9: {
                suratkepimilikantanah: section9.suratkepimilikantanah,
                kebutuhanizin: section9.kebutuhanizin,
              },
              page10: {
                populasiorangkk: section10.populasiorangkk,
                kepadatanpopulasi: section10.kepadatanpopulasi,
                distribusipopulasi: section10.distribusipopulasi,
                desaterdekat: section10.desaterdekat,
                jarakdesaterdekat: section10.jarakdesaterdekat,
                livelihood: section10.livelihood,
                populasipenggunatelfongenggam:
                  section10.populasipenggunatelfongenggam,
                tipepenggunatelfongenggam: section10.tipepenggunatelfongenggam,
                simcardyangtersedia: section10.simcardyangtersedia,
                pendudukyangbisadilatihuntukmenggunakanprodukjasa:
                  section10.pendudukyangbisadilatihuntukmenggunakanprodukjasa,
                rumahyangmempunyaigenerator:
                  section10.rumahyangmempunyaigenerator,
                catatanlainnya: section10.catatanlainnya,
                aksesinternet: section10.aksesinternet,
              },
            },
          };

          let params3 = {
            id: surveyID,
            data: {
              page11: [
                {
                  foto: section11.foto,
                  lat: section11.lat,
                  lon: section11.lon,
                  deskripsi: section11.deskripsi,
                },
              ],
              page12: {
                layoutsite: {
                  foto: section12.layoutsite.foto,
                  lat: section12.layoutsite.lat,
                  lon: section12.layoutsite.lon,
                  deskripsi: section12.layoutsite.deskripsi,
                },
                towerkesumberdaya: section12.towerkesumberdaya,
                towerkeantenavsat: section12.towerkeantenavsat,
                towerkesolarpanel: section12.towerkesolarpanel,
              },
              page13: {
                gambarlahan: {
                  foto: section13.gambarlahan.foto,
                  lat: section13.gambarlahan.lat,
                  lon: section13.gambarlahan.lon,
                  deskripsi: section13.gambarlahan.deskripsi,
                },
                makinggps: {
                  foto: section13.makinggps.foto,
                  lat: section13.makinggps.lat,
                  lon: section13.makinggps.lon,
                  deskripsi: section13.makinggps.deskripsi,
                },
                fotosisiutara: {
                  foto: section13.fotosisiutara.foto,
                  lat: section13.fotosisiutara.lat,
                  lon: section13.fotosisiutara.lon,
                  deskripsi: section13.fotosisiutara.deskripsi,
                },
                fotosisitimur: {
                  foto: section13.fotosisitimur.foto,
                  lat: section13.fotosisitimur.lat,
                  lon: section13.fotosisitimur.lon,
                  deskripsi: section13.fotosisitimur.deskripsi,
                },
                fotosisiselatan: {
                  foto: section13.fotosisiselatan.foto,
                  lat: section13.fotosisiselatan.lat,
                  lon: section13.fotosisiselatan.lon,
                  deskripsi: section13.fotosisiselatan.deskripsi,
                },
                fotosisibarat: {
                  foto: section13.fotosisibarat.foto,
                  lat: section13.fotosisibarat.lat,
                  lon: section13.fotosisibarat.lon,
                  deskripsi: section13.fotosisibarat.deskripsi,
                },
              },
              page14: {
                coverageandobstacleinformation:
                  section14.coverageandobstacleinformation[0].derajat === "" &&
                  section14.coverageandobstacleinformation[0].deskripsi ===
                    "" &&
                  section14.coverageandobstacleinformation[0].jarak === ""
                    ? section14.coverageandobstacleinformation.slice(1)
                    : section14.coverageandobstacleinformation,
              },
              page15: {
                photocapturegnettrack05km: section15.photocapturegnettrack05km,
                photocapturegnettrack5km: section15.photocapturegnettrack5km,
              },
            },
          };

          let params4 = {
            id: surveyID,
            data: {
              page16: {
                photocapturegnettrackroadroute:
                  section16.photocapturegnettrackroadroute,
              },
              page17: {
                locationmapping: {
                  foto: section17.locationmapping.foto,
                  lat: section17.locationmapping.lat,
                  lon: section17.locationmapping.lon,
                  deskripsi: section17.locationmapping.deskripsi,
                },
                posisiyangditawarkan: {
                  foto: section17.posisiyangditawarkan.foto,
                  lat: section17.posisiyangditawarkan.lat,
                  long: section17.posisiyangditawarkan.long,
                  elevasi: section17.posisiyangditawarkan.elevasi,
                },
                kandidat1: {
                  lat: section17.kandidat1.lat,
                  long: section17.kandidat1.long,
                  elevasi: section17.kandidat1.elevasi,
                },
                kandidat2: {
                  lat: section17.kandidat2.lat,
                  long: section17.kandidat2.long,
                  elevasi: section17.kandidat2.elevasi,
                },
              },
              page18: {
                sector0: {
                  topografi: section18.sector0.topografi,
                  topografiIndex: section18.sector0.topografiIndex,
                  landscape: section18.sector0.landscape,
                  landscapeIndex: section18.sector0.landscapeIndex,
                  demografi: section18.sector0.demografi,
                  demografiIndex: section18.sector0.demografiIndex,
                },
                sector45: {
                  topografi: section18.sector45.topografi,
                  topografiIndex: section18.sector45.topografiIndex,
                  landscape: section18.sector45.landscape,
                  landscapeIndex: section18.sector45.landscapeIndex,
                  demografi: section18.sector45.demografi,
                  demografiIndex: section18.sector45.demografiIndex,
                },
                sector90: {
                  topografi: section18.sector90.topografi,
                  topografiIndex: section18.sector90.topografiIndex,
                  landscape: section18.sector90.landscape,
                  landscapeIndex: section18.sector90.landscapeIndex,
                  demografi: section18.sector90.demografi,
                  demografiIndex: section18.sector90.demografiIndex,
                },
                sector135: {
                  topografi: section18.sector135.topografi,
                  topografiIndex: section18.sector135.topografiIndex,
                  landscape: section18.sector135.landscape,
                  landscapeIndex: section18.sector135.landscapeIndex,
                  demografi: section18.sector135.demografi,
                  demografiIndex: section18.sector135.demografiIndex,
                },
                sector180: {
                  topografi: section18.sector180.topografi,
                  topografiIndex: section18.sector180.topografiIndex,
                  landscape: section18.sector180.landscape,
                  landscapeIndex: section18.sector180.landscapeIndex,
                  demografi: section18.sector180.demografi,
                  demografiIndex: section18.sector180.demografiIndex,
                },
                sector225: {
                  topografi: section18.sector225.topografi,
                  topografiIndex: section18.sector225.topografiIndex,
                  landscape: section18.sector225.landscape,
                  landscapeIndex: section18.sector225.landscapeIndex,
                  demografi: section18.sector225.demografi,
                  demografiIndex: section18.sector225.demografiIndex,
                },
                sector270: {
                  topografi: section18.sector270.topografi,
                  topografiIndex: section18.sector270.topografiIndex,
                  landscape: section18.sector270.landscape,
                  landscapeIndex: section18.sector270.landscapeIndex,
                  demografi: section18.sector270.demografi,
                  demografiIndex: section18.sector270.demografiIndex,
                },
                sector315: {
                  topografi: section18.sector315.topografi,
                  topografiIndex: section18.sector315.topografiIndex,
                  landscape: section18.sector315.landscape,
                  landscapeIndex: section18.sector315.landscapeIndex,
                  demografi: section18.sector315.demografi,
                  demografiIndex: section18.sector315.demografiIndex,
                },
              },
            },
          };

          let params5 = {
            id: surveyID,
            data: {
              page19: {
                sector0gambarlahan: {
                  foto: section19.sector0gambarlahan.foto,
                  lat: section19.sector0gambarlahan.lat,
                  lon: section19.sector0gambarlahan.lon,
                  deskripsi: section19.sector0gambarlahan.deskripsi,
                },
                sector45gambarlahan: {
                  foto: section19.sector45gambarlahan.foto,
                  lat: section19.sector45gambarlahan.lat,
                  lon: section19.sector45gambarlahan.lon,
                  deskripsi: section19.sector45gambarlahan.deskripsi,
                },
                sector90gambarlahan: {
                  foto: section19.sector90gambarlahan.foto,
                  lat: section19.sector90gambarlahan.lat,
                  lon: section19.sector90gambarlahan.lon,
                  deskripsi: section19.sector90gambarlahan.deskripsi,
                },
                sector135gambarlahan: {
                  foto: section19.sector135gambarlahan.foto,
                  lat: section19.sector135gambarlahan.lat,
                  lon: section19.sector135gambarlahan.lon,
                  deskripsi: section19.sector135gambarlahan.deskripsi,
                },
                sector180gambarlahan: {
                  foto: section19.sector180gambarlahan.foto,
                  lat: section19.sector180gambarlahan.lat,
                  lon: section19.sector180gambarlahan.lon,
                  deskripsi: section19.sector180gambarlahan.deskripsi,
                },
                sector225gambarlahan: {
                  foto: section19.sector225gambarlahan.foto,
                  lat: section19.sector225gambarlahan.lat,
                  lon: section19.sector225gambarlahan.lon,
                  deskripsi: section19.sector225gambarlahan.deskripsi,
                },
                sector270gambarlahan: {
                  foto: section19.sector270gambarlahan.foto,
                  lat: section19.sector270gambarlahan.lat,
                  lon: section19.sector270gambarlahan.lon,
                  deskripsi: section19.sector270gambarlahan.deskripsi,
                },
                sector315gambarlahan: {
                  foto: section19.sector315gambarlahan.foto,
                  lat: section19.sector315gambarlahan.lat,
                  lon: section19.sector315gambarlahan.lon,
                  deskripsi: section19.sector315gambarlahan.deskripsi,
                },
                tempatpengambilanfoto: section19.tempatpengambilanfoto,
              },
              page20: {
                aksessite1gambarlahan: {
                  foto: section20.aksessite1gambarlahan.foto,
                  lat: section20.aksessite1gambarlahan.lat,
                  lon: section20.aksessite1gambarlahan.lon,
                  deskripsi: section20.aksessite1gambarlahan.deskripsi,
                },
                aksessite2gambarlahan: {
                  foto: section20.aksessite2gambarlahan.foto,
                  lat: section20.aksessite2gambarlahan.lat,
                  lon: section20.aksessite2gambarlahan.lon,
                  deskripsi: section20.aksessite2gambarlahan.deskripsi,
                },
                aksessite3gambarlahan: {
                  foto: section20.aksessite3gambarlahan.foto,
                  lat: section20.aksessite3gambarlahan.lat,
                  lon: section20.aksessite3gambarlahan.lon,
                  deskripsi: section20.aksessite3gambarlahan.deskripsi,
                },
                aksessite4gambarlahan: {
                  foto: section20.aksessite4gambarlahan.foto,
                  lat: section20.aksessite4gambarlahan.lat,
                  lon: section20.aksessite4gambarlahan.lon,
                  deskripsi: section20.aksessite4gambarlahan.deskripsi,
                },
              },
              page21: {
                generalcomment: section22.generalcomment,
              },
            },
          };

          API.createSurveyBTSPart2(params2)
            .then((res) => {
              if (res.data.success && res.status === 200) {
                console.log("API SUCCESS createSurveyBTSPart2 :  > ", res);
              }
            })
            .catch((err) => {
              console.error("API FAIL :  > ", err.response);
            });

          API.createSurveyBTSPart3(params3)
            .then((res) => {
              if (res.data.success && res.status === 200) {
                console.log("API SUCCESS createSurveyBTSPart3 :  > ", res);
              }
            })
            .catch((err) => {
              console.error("API FAIL :  > ", err);
            });

          API.createSurveyBTSPart4(params4)
            .then((res) => {
              if (res.data.success && res.status === 200) {
                console.log("API SUCCESS createSurveyBTSPart4 :  > ", res);
              }
            })
            .catch((err) => {
              console.error("API FAIL :  > ", err.response);
            });
          API.createSurveyBTSPart5(params5)
            .then((res) => {
              if (res.data.success && res.status === 200) {
                console.log("API SUCCESS createSurveyBTSPart5 :  > ", res);
              }
            })
            .catch((err) => {
              console.error("API FAIL :  > ", err.response);
            });
        }
        dispatch(setShowAlertSent(true));
        setTimeout(() => {
          dispatch(setShowAlertSent(false));
        }, 3000);
        setTimeout(() => {
          history.push(`/adminsurveyor/hasil-survey/`);
        }, 3500);
      })
      .catch((err) => {
        console.error("API FAIL Submit Part 1 :  > ", err.response);
      });
  };

  const handleResetRedux = () => {
    dispatch(
      setSection1({
        disiapkanoleh: "",
        namaproject: "",
        tanggalkunjungan: "",
        namasurveyor: "",
        nomortelepon: "",
        email: "",
        statussite: "",
      })
    );

    dispatch(
      setSection2({
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
        // jarakdarikotakelokasidannamakota: "",
        lamaperjalanankekotaterdekat: "", //new
        keberangkatandarikotaterdekat: "", //new
        kondisiperalatan: "",
        pilihtipeantena: "",
      })
    );

    dispatch(
      setSection3({
        tinggitowerpole: "",
        tipetower: "",
        koordinatgpswgs84_lat: "",
        koordinatgpswgs84_long: "",
        koordinatgpswgs84_height: "",
      })
    );

    dispatch(
      setSection4({
        penempatanantena: "",
        alasantena: "",
        diameterantena: "",
        penggunaansatelit: "",
        azimuth: "",
        elevasi: "",
      })
    );

    dispatch(
      setSection5({
        ketinggiantowerpole: "",
        kepemilikanlahan: "",
        namapemiliklahan: "",
        nomorpemiliklahan: "",
        keamanan: "",
        luaslahan: "",
        kondisilahan: "",
        kondisisosial: "",
      })
    );

    dispatch(
      setSection6({
        kemampuanjarakradius5kmdarisite: "",
        tipesinyalyangtersedia: "",
        levelsinyal4gjikaadajangkauan: "",
        levelsinyal4gjikaadajangkauaninput: "",
        calldisite: "",
        smsdisite: "",
        namaoperator: [],
      })
    );

    dispatch(
      setSection7({
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
      })
    );
    dispatch(
      setSection8({
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
      })
    );
    dispatch(
      setSection9({
        suratkepimilikantanah: "",
        kebutuhanizin: "",
      })
    );
    dispatch(
      setSection10({
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
      })
    );
    dispatch(
      setSection11({
        foto: "",
        lat: "",
        lon: "",
        deskripsi: "",
      })
    );
    dispatch(
      setSection12({
        layoutsite: {
          foto: "",
          lat: "",
          lon: "",
          deskripsi: "",
        },
        towerkesumberdaya: "",
        towerkeantenavsat: "",
        towerkesolarpanel: "",
      })
    );
    dispatch(
      setSection13({
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
      })
    );
    dispatch(
      setSection14({
        coverageandobstacleinformation: [
          {
            data: {
              derajat: "",
              jarak: "",
              deskripsi: "",
            },
          },
        ],
      })
    );
    dispatch(
      setSection15({
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
      })
    );
    dispatch(
      setSection16({
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
      })
    );
    dispatch(
      setSection17({
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
      })
    );
    dispatch(
      setSection18({
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
      })
    );
    dispatch(
      setSection19({
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
        sector90gambarlahan: {
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
      })
    );
    dispatch(
      setSection20({
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
      })
    );
    dispatch(
      setSection22({
        generalcomment: "",
      })
    );
  };

  // const handleResetLocalStorage = () => {
  //   // resets
  //   window.localStorage.removeItem(strSection1.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection2.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection3.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection4.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection5.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection6.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection7.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection8.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection9.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection10.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection11.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection12.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection13.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection14.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection1505.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection155.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection16.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection17.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection18.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection19.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection20.concat(locationKodeSurvey));
  //   window.localStorage.removeItem(strSection22.concat(locationKodeSurvey));
  // };

  const checkSemuaTerisi = () => {
    if (
      section1?.disiapkanoleh === "" ||
      section1?.namaproject === "" ||
      section1?.tanggalkunjungan === "" ||
      section1?.namasurveyor === "" ||
      section1?.nomortelepon === "" ||
      section1?.email === "" ||
      section1?.statussite === "" ||
      section2?.namasite === "" ||
      section2?.tipesite === "" ||
      section2?.tipecakupansite === "" ||
      section2?.alamat === "" ||
      section2?.namapicdaerah === "" ||
      section2?.nomorteleponpic === "" ||
      section2?.alamatpicdaerah === "" ||
      section2?.akseskelokasi === "" ||
      section2?.jarakdarisitekajalanutama === "" ||
      section2?.luasaksesjalan === "" ||
      section2?.kondisiaksesjalan === "" ||
      section2?.aksesdarat === "" ||
      section2?.aksessungailaut === "" ||
      section2?.jaraktempuh === "" ||
      section2?.perizinanakseskesite === "" ||
      // section2?.jarakdarikotakelokasidannamakota === "" ||
      section2?.lamaperjalanankekotaterdekat === "" ||
      section2?.keberangkatandarikotaterdekat === "" ||
      section2?.kondisiperalatan === "" ||
      section2?.pilihtipeantena === "" ||
      section3?.tinggitowerpole === "" ||
      section3?.tipetower === "" ||
      section3?.koordinatgpswgs84_lat === "" ||
      section3?.koordinatgpswgs84_long === "" ||
      section3?.koordinatgpswgs84_height === "" ||
      section4?.penempatanantena === "" ||
      section4?.alasantena === "" ||
      section4?.diameterantena === "" ||
      section4?.penggunaansatelit === "" ||
      section4?.azimuth === "" ||
      section4?.elevasi === "" ||
      section5?.ketinggiantowerpole === "" ||
      section5?.kepemilikanlahan === "" ||
      section5?.namapemiliklahan === "" ||
      section5?.nomorpemiliklahan === "" ||
      section5?.keamanan === "" ||
      section5?.luaslahan === "" ||
      section5?.kondisilahan === "" ||
      section5?.kondisisosial === "" ||
      section6?.kemampuanjarakradius5kmdarisite === "" ||
      section6?.tipesinyalyangtersedia === "" ||
      section6?.levelsinyal4gjikaadajangkauan === "" ||
      section6?.calldisite === "" ||
      section6?.smsdisite === "" ||
      section6?.namaoperator === [] ||
      section7?.topografiumum === "" ||
      section7?.deskripsiareajangkauan === "" ||
      section7?.tipeproperty === "" ||
      section7?.statuslahan === "" ||
      section7?.pengurusanimb === "" ||
      section7?.landclassification === "" ||
      section7?.obyekpenghalang === "" ||
      section7?.kondisiperubahanlahan === "" ||
      section7?.tipetanah === "" ||
      section7?.dekatlautsungai === "" ||
      section7?.resikobencana === "" ||
      section7?.materialsetempat === "" ||
      section7?.resikorelokasi === "" ||
      section7?.resikokeluhan === "" ||
      section8?.sumberdaya === "" ||
      section8?.kemampuankelistrikan === "" ||
      section8?.kekuatankelistrikan === "" ||
      section8?.jumlahjamketersediaanlistrik === "" ||
      section8?.jarakdarisumberdayalistrik === "" ||
      section8?.generatorbackup === "" ||
      section8?.kemampuanbahanbensin === "" ||
      section8?.tipebahanbakaryangtersedia === "" ||
      section8?.hargabbmdilokasi === "" ||
      section8?.listrikbisadigunakanuntukalat === "" ||
      section9?.suratkepimilikantanah === "" ||
      section9?.kebutuhanizin === "" ||
      section10?.populasiorangkk === "" ||
      section10?.kepadatanpopulasi === "" ||
      section10?.distribusipopulasi === "" ||
      section10?.desaterdekat === "" ||
      section10?.jarakdesaterdekat === "" ||
      section10?.livelihood === "" ||
      section10?.populasipenggunatelfongenggam === "" ||
      section10?.tipepenggunatelfongenggam === [] ||
      section10?.simcardyangtersedia === [] ||
      section10?.pendudukyangbisadilatihuntukmenggunakanprodukjasa === "" ||
      section10?.rumahyangmempunyaigenerator === "" ||
      section10?.catatanlainnya === "" ||
      section10?.aksesinternet === "" ||
      // section11?.foto === "" ||
      section11?.lat === "" ||
      section11?.lon === "" ||
      section11?.deskripsi === "" ||
      section12?.towerkesumberdaya === "" ||
      section12?.towerkeantenavsat === "" ||
      section12?.towerkesolarpanel === "" ||
      // section12?.layoutsite.foto === "" ||
      section12?.layoutsite.lat === "" ||
      section12?.layoutsite.lon === "" ||
      section12?.layoutsite.deskripsi === "" ||
      // section13?.gambarlahan.foto === "" ||
      section13?.gambarlahan.lat === "" ||
      section13?.gambarlahan.lon === "" ||
      section13?.gambarlahan.deskripsi === "" ||
      // section13?.makinggps.foto === "" ||
      section13?.makinggps.lat === "" ||
      section13?.makinggps.lon === "" ||
      section13?.makinggps.deskripsi === "" ||
      // section13?.fotosisiutara.foto === "" ||
      section13?.fotosisiutara.lat === "" ||
      section13?.fotosisiutara.lon === "" ||
      section13?.fotosisiutara.deskripsi === "" ||
      // section13?.fotosisitimur.foto === "" ||
      section13?.fotosisitimur.lat === "" ||
      section13?.fotosisitimur.lon === "" ||
      section13?.fotosisitimur.deskripsi === "" ||
      // section13?.fotosisiselatan.foto === "" ||
      section13?.fotosisiselatan.lat === "" ||
      section13?.fotosisiselatan.lon === "" ||
      section13?.fotosisiselatan.deskripsi === "" ||
      // section13?.fotosisibarat.foto === "" ||
      section13?.fotosisibarat.lat === "" ||
      section13?.fotosisibarat.lon === "" ||
      section13?.fotosisibarat.deskripsi === "" ||
      // section14?.coverageandobstacleinformation === [] ||
      // // section15?.photocapturegnettrack05km === [] ||
      // // section15?.photocapturegnettrack5km === [] ||
      // // section16?.photocapturegnettrackroadroute === [] ||
      // // section17?.locationmapping.foto === "" ||
      // section17?.locationmapping.lat === "" ||
      // section17?.locationmapping.lon === "" ||
      // // section17.locationmapping.deskripsi === "" ||
      // // section17.posisiyangditawarkan.foto === "" ||
      // section17?.posisiyangditawarkan.lat === "" ||
      // section17?.posisiyangditawarkan.lon === "" ||
      // section17?.posisiyangditawarkan.deskripsi === "" ||
      // // section17.kandidat1.foto === "" ||
      // section17?.kandidat1.lat === "" ||
      // section17?.kandidat1.lon === "" ||
      // section17?.kandidat1.deskripsi === "" ||
      // // section17.kandidat2.foto === "" ||
      // section17?.kandidat2.lat === "" ||
      // section17?.kandidat2.lon === "" ||
      // section17?.kandidat2.deskripsi === "" ||
      section18?.sector0.topografi === "" ||
      section18?.sector0.landscape === "" ||
      section18?.sector0.demografi === "" ||
      section18?.sector45.topografi === "" ||
      section18?.sector45.landscape === "" ||
      section18?.sector45.demografi === "" ||
      section18?.sector90.topografi === "" ||
      section18?.sector90.landscape === "" ||
      section18?.sector90.demografi === "" ||
      section18?.sector135.topografi === "" ||
      section18?.sector135.landscape === "" ||
      section18?.sector135.demografi === "" ||
      section18?.sector180.topografi === "" ||
      section18?.sector180.landscape === "" ||
      section18?.sector180.demografi === "" ||
      section18?.sector225.topografi === "" ||
      section18?.sector225.landscape === "" ||
      section18?.sector225.demografi === "" ||
      section18?.sector270.topografi === "" ||
      section18?.sector270.landscape === "" ||
      section18?.sector270.demografi === "" ||
      section18?.sector315.topografi === "" ||
      section18?.sector315.landscape === "" ||
      section18?.sector315.demografi === "" ||
      // // section19?.sector0gambarlahan.foto === "" ||
      // section19?.sector0gambarlahan.lat === "" ||
      // section19?.sector0gambarlahan.lon === "" ||
      // section19?.sector0gambarlahan.deskripsi === "" ||
      // // section19?.sector45gambarlahan.foto === "" ||
      // section19?.sector45gambarlahan.lat === "" ||
      // section19?.sector45gambarlahan.lon === "" ||
      // section19?.sector45gambarlahan.deskripsi === "" ||
      // // section19?.sector90gambarlahan.foto === "" ||
      // section19?.sector90gambarlahan.lat === "" ||
      // section19?.sector90gambarlahan.lon === "" ||
      // section19?.sector90gambarlahan.deskripsi === "" ||
      // // section19?.sector135gambarlahan.foto === "" ||
      // section19?.sector135gambarlahan.lat === "" ||
      // section19?.sector135gambarlahan.lon === "" ||
      // section19?.sector135gambarlahan.deskripsi === "" ||
      // // section19?.sector180gambarlahan.foto === "" ||
      // section19?.sector180gambarlahan.lat === "" ||
      // section19?.sector180gambarlahan.lon === "" ||
      // section19?.sector180gambarlahan.deskripsi === "" ||
      // // section19?.sector225gambarlahan.foto === "" ||
      // section19?.sector225gambarlahan.lat === "" ||
      // section19?.sector225gambarlahan.lon === "" ||
      // section19?.sector225gambarlahan.deskripsi === "" ||
      // // section19?.sector270gambarlahan.foto === "" ||
      // section19?.sector270gambarlahan.lat === "" ||
      // section19?.sector270gambarlahan.lon === "" ||
      // section19?.sector270gambarlahan.deskripsi === "" ||
      // // section19?.sector315gambarlahan.foto === "" ||
      // section19?.sector315gambarlahan.lat === "" ||
      // section19?.sector315gambarlahan.lon === "" ||
      // section19?.sector315gambarlahan.deskripsi === "" ||
      // // section20?.aksessite1gambarlahan.foto === "" ||
      // section20?.aksessite1gambarlahan.lat === "" ||
      // section20?.aksessite1gambarlahan.lon === "" ||
      // section20?.aksessite1gambarlahan.deskripsi === "" ||
      // // section20?.aksessite2gambarlahan.foto === "" ||
      // section20?.aksessite2gambarlahan.lat === "" ||
      // section20?.aksessite2gambarlahan.lon === "" ||
      // section20?.aksessite2gambarlahan.deskripsi === "" ||
      // // section20?.aksessite3gambarlahan.foto === "" ||
      // section20?.aksessite3gambarlahan.lat === "" ||
      // section20?.aksessite3gambarlahan.lon === "" ||
      // section20?.aksessite3gambarlahan.deskripsi === "" ||
      // // section20?.aksessite4gambarlahan.foto === "" ||
      // section20?.aksessite4gambarlahan.lat === "" ||
      // section20?.aksessite4gambarlahan.lon === "" ||
      // section20?.aksessite4gambarlahan.deskripsi === "" ||
      section22?.generalcomment === ""
    ) {
      // console.log("FORM ADM EDIT : ada yang belum keisi");
      setAllFilled(false);
    } else {
      // console.log("FORM ADM EDIT : semuanya teriisi");
      setAllFilled(true);
    }
  };

  useEffect(() => {
    checkSemuaTerisi();
  }, [
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8,
    section9,
    section10,
    section11,
    section12,
    section13,
    section14,
    section15,
    section16,
    section17,
    section18,
    section19,
    section20,
    section22,
    checkSemuaTerisi,
  ]);

  const ModalConfirmSubmit = () => {
    return (
      <Modal
        isOpen={modalConfirmSubmit}
        centered={true}
        toggle={() => {
          tog_setuju();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Kirim Form Survey?</h5>
          <div>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_setuju();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              <button
                type='button'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={async () => {
                  await handleSubmitForm();
                  await handleResetRedux();
                  // await handleResetLocalStorage();
                  await tog_setuju();

                  // window.location.reload();
                  // return false;
                }}
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // alert state
  const [alertSetujui, setalertSetujui] = useState(style.alertOff);
  const [alertMessage, setalertMessage] = useState(true);

  return (
    <div>
      <div className={`${alertSetujui}`}>
        {alertMessage ? (
          <Alert color='success'>Form Berhasil Dikirimkan</Alert>
        ) : (
          <Alert color='danger'>Form Gagal Dikirimkan</Alert>
        )}
      </div>
      <ModalConfirmSubmit />
      <Card>
        <CardBody className={style.cardBody}>
          {!allFilled && (
            <div className='w-100 d-flex justify-content-center align-items-center'>
              <b>
                Catatan: Pastikan semua data pada section 1 - section 22 sudah
                terisi semua dan sudah tersimpan sebelum mengklik tombol "Kirim
                Data".
              </b>
            </div>
          )}
          <div className='d-flex justify-content-center p-2'>
            <button
              onClick={() => {
                if (role === "admin") {
                  history.push(`/admin/hasil-survey/`);
                } else if (role === "adminsurveyor") {
                  history.push(`/adminsurveyor/hasil-survey/`);
                }
              }}
              className={style.buttonKembali}
            >
              Kembali
            </button>
            {allFilled ? (
              <button
                onClick={() => tog_setuju()}
                className={style.buttonSetuju}
              >
                Kirim Data
              </button>
            ) : (
              <button
                className={style.buttonSetuju}
                onClick={() => tog_setuju()}
              >
                Kirim Data
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardConfirm;

// ======================================= handle submit pakai redux:
// const handleSubmitForm = () => {
//   let params1 = {
//     user_id: userid,
//     organization_id: orgid,
//     kode_survei_short: kodeSurvey.split("-")[2],
//     kode_survei: kodeSurvey,
//     latitude: latitude,
//     longitude: longitude,
//     kategori: "Kantor Desa",
//     page1: {
//       disiapkanoleh: section1.disiapkanoleh,
//       namaproject: section1.namaproject,
//       tanggalkunjungan: section1.tanggalkunjungan,
//       namasurveyor: section1.namasurveyor,
//       nomortelepon: section1.nomortelepon,
//       email: section1.email,
//       statussite: section1.statussite,
//     },
//     page2: {
//       namasite: section2.namasite,
//       tipesite: section2.tipesite,
//       tipecakupansite: section2.tipecakupansite,
//       alamat: section2.alamat,
//       namapicdaerah: section2.namapicdaerah,
//       nomorteleponpic: section2.nomorteleponpic,
//       alamatpicdaerah: section2.alamatpicdaerah,
//       akseskelokasi: section2.akseskelokasi,
//       jarakdarisitekajalanutama: section2.jarakdarisitekajalanutama,
//       luasaksesjalan: section2.luasaksesjalan,
//       kondisiaksesjalan: section2.kondisiaksesjalan,
//       aksesdarat: section2.aksesdarat,
//       aksessungailaut: section2.aksessungailaut,
//       jaraktempuh: section2.jaraktempuh,
//       perizinanakseskesite: section2.perizinanakseskesite,
//       jarakdarikotakelokasidannamakota:
//         section2.jarakdarikotakelokasidannamakota,
//       kondisiperalatan: section2.kondisiperalatan,
//       pilihtipeantena: section2.pilihtipeantena,
//     },
//     page3: {
//       tinggitowerpole: section3.tinggitowerpole,
//       tipetower: section3.tipetower,
//       "koordinatgpswgs84-lat": section3.koordinatgpswgs84_lat,
//       "koordinatgpswgs84-long": section3.koordinatgpswgs84_long,
//       "koordinatgpswgs84-height": section3.koordinatgpswgs84_height,
//     },
//     page4: {
//       penempatanantena: section4.penempatanantena,
//       alasantena: section4.alasantena,
//       diameterantena: section4.diameterantena,
//       penggunaansatelit: section4.penggunaansatelit,
//       azimuth: section4.azimuth,
//       elevasi: section4.elevasi,
//     },
//     page5: {
//       ketinggiantowerpole: section5.ketinggiantowerpole,
//       kepemilikanlahan: section5.kepemilikanlahan,
//       namapemiliklahan: section5.namapemiliklahan,
//       nomorpemiliklahan: section5.nomorpemiliklahan,
//       kondisilahan: section5.kondisilahan,
//       kondisisosial: section5.kondisisosial,
//       keamanan: section5.keamanan,
//       luaslahan: section5.luaslahan,
//     },
//   };

//   API.createSurveyBTSPart1(params1)
//     .then((res) => {
//       if (res.data.success && res.status === 200) {
//         console.log("API SUCCESS Submit Part 1 :  > ", res);
//         let surveyID = res.data.values.post_id.$oid;
//         console.log("masuk post id: ", surveyID);
//         let params2 = {
//           id: surveyID,
//           data: {
//             page6: {
//               kemampuanjarakradius5kmdarisite:
//                 section6.kemampuanjarakradius5kmdarisite,
//               tipesinyalyangtersedia: section6.tipesinyalyangtersedia,
//               levelsinyal4gjikaadajangkauan:
//                 section6.levelsinyal4gjikaadajangkauan,
//               calldisite: section6.calldisite,
//               smsdisite: section6.smsdisite,
//               namaoperator: section6.namaoperator,
//             },
//             page7: {
//               topografiumum: section7.topografiumum,
//               deskripsiareajangkauan: section7.deskripsiareajangkauan,
//               tipeproperty: section7.tipeproperty,
//               statuslahan: section7.statuslahan,
//               pengurusanimb: section7.pengurusanimb,
//               landclassification: section7.landclassification,
//               obyekpenghalang: section7.obyekpenghalang,
//               kondisiperubahanlahan: section7.kondisiperubahanlahan,
//               tipetanah: section7.tipetanah,
//               dekatlautsungai: section7.dekatlautsungai,
//               resikobencana: section7.resikobencana,
//               materialsetempat: section7.materialsetempat,
//               resikorelokasi: section7.resikorelokasi,
//               resikokeluhan: section7.resikokeluhan,
//             },
//             page8: {
//               sumberdaya: section8.sumberdaya,
//               kemampuankelistrikan: section8.kemampuankelistrikan,
//               kekuatankelistrikan: section8.kekuatankelistrikan,
//               jumlahjamketersediaanlistrik:
//                 section8.jumlahjamketersediaanlistrik,
//               jarakdarisumberdayalistrik: section8.jarakdarisumberdayalistrik,
//               generatorbackup: section8.generatorbackup,
//               kemampuanbahanbensin: section8.kemampuanbahanbensin,
//               tipebahanbakaryangtersedia: section8.tipebahanbakaryangtersedia,
//               hargabbmdilokasi: section8.hargabbmdilokasi,
//               listrikbisadigunakanuntukalat:
//                 section8.listrikbisadigunakanuntukalat,
//             },
//             page9: {
//               suratkepimilikantanah: section9.suratkepimilikantanah,
//               kebutuhanizin: section9.kebutuhanizin,
//             },
//             page10: {
//               populasiorangkk: section10.populasiorangkk,
//               kepadatanpopulasi: section10.kepadatanpopulasi,
//               distribusipopulasi: section10.distribusipopulasi,
//               desaterdekat: section10.desaterdekat,
//               jarakdesaterdekat: section10.jarakdesaterdekat,
//               livelihood: section10.livelihood,
//               populasipenggunatelfongenggam:
//                 section10.populasipenggunatelfongenggam,
//               tipepenggunatelfongenggam: section10.tipepenggunatelfongenggam,
//               simcardyangtersedia: section10.simcardyangtersedia,
//               pendudukyangbisadilatihuntukmenggunakanprodukjasa:
//                 section10.pendudukyangbisadilatihuntukmenggunakanprodukjasa,
//               rumahyangmempunyaigenerator:
//                 section10.rumahyangmempunyaigenerator,
//               catatanlainnya: section10.catatanlainnya,
//               aksesinternet: section10.aksesinternet,
//             },
//           },
//         };

//         let params3 = {
//           id: surveyID,
//           data: {
//             page11: [
//               {
//                 foto: section11.foto,
//                 lat: section11.lat,
//                 lon: section11.lon,
//                 deskripsi: section11.deskripsi,
//               },
//             ],
//             page12: {
//               layoutsite: {
//                 foto: section12.layoutsite.foto,
//                 lat: section12.layoutsite.lat,
//                 lon: section12.layoutsite.lon,
//                 deskripsi: section12.layoutsite.deskripsi,
//               },
//               towerkesumberdaya: section12.towerkesumberdaya,
//               towerkeantenavsat: section12.towerkeantenavsat,
//               towerkesolarpanel: section12.towerkesolarpanel,
//             },
//             page13: {
//               gambarlahan: {
//                 foto: section13.gambarlahan.foto,
//                 lat: section13.gambarlahan.lat,
//                 lon: section13.gambarlahan.lon,
//                 deskripsi: section13.gambarlahan.deskripsi,
//               },
//               makinggps: {
//                 foto: section13.makinggps.foto,
//                 lat: section13.makinggps.lat,
//                 lon: section13.makinggps.lon,
//                 deskripsi: section13.makinggps.deskripsi,
//               },
//               fotosisiutara: {
//                 foto: section13.fotosisiutara.foto,
//                 lat: section13.fotosisiutara.lat,
//                 lon: section13.fotosisiutara.lon,
//                 deskripsi: section13.fotosisiutara.deskripsi,
//               },
//               fotosisitimur: {
//                 foto: section13.fotosisitimur.foto,
//                 lat: section13.fotosisitimur.lat,
//                 lon: section13.fotosisitimur.lon,
//                 deskripsi: section13.fotosisitimur.deskripsi,
//               },
//               fotosisiselatan: {
//                 foto: section13.fotosisiselatan.foto,
//                 lat: section13.fotosisiselatan.lat,
//                 lon: section13.fotosisiselatan.lon,
//                 deskripsi: section13.fotosisiselatan.deskripsi,
//               },
//               fotosisibarat: {
//                 foto: section13.fotosisibarat.foto,
//                 lat: section13.fotosisibarat.lat,
//                 lon: section13.fotosisibarat.lon,
//                 deskripsi: section13.fotosisibarat.deskripsi,
//               },
//             },
//             page14: {
//               coverageandobstacleinformation:
//                 section14.coverageandobstacleinformation,
//             },
//             page15: {
//               photocapturegnettrack05km: section15.photocapturegnettrack05km,
//               photocapturegnettrack5km: section15.photocapturegnettrack5km,
//             },
//           },
//         };

//         let params4 = {
//           id: surveyID,
//           data: {
//             page16: {
//               photocapturegnettrackroadroute:
//                 section16.photocapturegnettrackroadroute,
//             },
//             page17: {
//               locationmapping: {
//                 foto: section17.locationmapping.foto,
//                 lat: section17.locationmapping.lat,
//                 lon: section17.locationmapping.lon,
//                 deskripsi: section17.locationmapping.deskripsi,
//               },
//               posisiyangditawarkan: {
//                 foto: section17.posisiyangditawarkan.foto,
//                 lat: section17.posisiyangditawarkan.lat,
//                 long: section17.posisiyangditawarkan.long,
//                 elevasi: section17.posisiyangditawarkan.elevasi,
//               },
//               kandidat1: {
//                 lat: section17.kandidat1.lat,
//                 long: section17.kandidat1.long,
//                 elevasi: section17.kandidat1.elevasi,
//               },
//               kandidat2: {
//                 lat: section17.kandidat2.lat,
//                 long: section17.kandidat2.long,
//                 elevasi: section17.kandidat2.elevasi,
//               },
//             },
//             page18: {
//               sector0: {
//                 topografi: section18.sector0.topografi,
//                 topografiIndex: section18.sector0.topografiIndex,
//                 landscape: section18.sector0.landscape,
//                 landscapeIndex: section18.sector0.landscapeIndex,
//                 demografi: section18.sector0.demografi,
//                 demografiIndex: section18.sector0.demografiIndex,
//               },
//               sector45: {
//                 topografi: section18.sector45.topografi,
//                 topografiIndex: section18.sector45.topografiIndex,
//                 landscape: section18.sector45.landscape,
//                 landscapeIndex: section18.sector45.landscapeIndex,
//                 demografi: section18.sector45.demografi,
//                 demografiIndex: section18.sector45.demografiIndex,
//               },
//               sector90: {
//                 topografi: section18.sector90.topografi,
//                 topografiIndex: section18.sector90.topografiIndex,
//                 landscape: section18.sector90.landscape,
//                 landscapeIndex: section18.sector90.landscapeIndex,
//                 demografi: section18.sector90.demografi,
//                 demografiIndex: section18.sector90.demografiIndex,
//               },
//               sector135: {
//                 topografi: section18.sector135.topografi,
//                 topografiIndex: section18.sector135.topografiIndex,
//                 landscape: section18.sector135.landscape,
//                 landscapeIndex: section18.sector135.landscapeIndex,
//                 demografi: section18.sector135.demografi,
//                 demografiIndex: section18.sector135.demografiIndex,
//               },
//               sector180: {
//                 topografi: section18.sector180.topografi,
//                 topografiIndex: section18.sector180.topografiIndex,
//                 landscape: section18.sector180.landscape,
//                 landscapeIndex: section18.sector180.landscapeIndex,
//                 demografi: section18.sector180.demografi,
//                 demografiIndex: section18.sector180.demografiIndex,
//               },
//               sector225: {
//                 topografi: section18.sector225.topografi,
//                 topografiIndex: section18.sector225.topografiIndex,
//                 landscape: section18.sector225.landscape,
//                 landscapeIndex: section18.sector225.landscapeIndex,
//                 demografi: section18.sector225.demografi,
//                 demografiIndex: section18.sector225.demografiIndex,
//               },
//               sector270: {
//                 topografi: section18.sector270.topografi,
//                 topografiIndex: section18.sector270.topografiIndex,
//                 landscape: section18.sector270.landscape,
//                 landscapeIndex: section18.sector270.landscapeIndex,
//                 demografi: section18.sector270.demografi,
//                 demografiIndex: section18.sector270.demografiIndex,
//               },
//               sector315: {
//                 topografi: section18.sector315.topografi,
//                 topografiIndex: section18.sector315.topografiIndex,
//                 landscape: section18.sector315.landscape,
//                 landscapeIndex: section18.sector315.landscapeIndex,
//                 demografi: section18.sector315.demografi,
//                 demografiIndex: section18.sector315.demografiIndex,
//               },
//             },
//           },
//         };

//         let params5 = {
//           id: surveyID,
//           data: {
//             page19: {
//               sector0gambarlahan: {
//                 foto: section19.sector0gambarlahan.foto,
//                 lat: section19.sector0gambarlahan.lat,
//                 lon: section19.sector0gambarlahan.lon,
//                 deskripsi: section19.sector0gambarlahan.deskripsi,
//               },
//               sector45gambarlahan: {
//                 foto: section19.sector45gambarlahan.foto,
//                 lat: section19.sector45gambarlahan.lat,
//                 lon: section19.sector45gambarlahan.lon,
//                 deskripsi: section19.sector45gambarlahan.deskripsi,
//               },
//               sector90gambarlahan: {
//                 foto: section19.sector90gambarlahan.foto,
//                 lat: section19.sector90gambarlahan.lat,
//                 lon: section19.sector90gambarlahan.lon,
//                 deskripsi: section19.sector90gambarlahan.deskripsi,
//               },
//               sector135gambarlahan: {
//                 foto: section19.sector135gambarlahan.foto,
//                 lat: section19.sector135gambarlahan.lat,
//                 lon: section19.sector135gambarlahan.lon,
//                 deskripsi: section19.sector135gambarlahan.deskripsi,
//               },
//               sector180gambarlahan: {
//                 foto: section19.sector180gambarlahan.foto,
//                 lat: section19.sector180gambarlahan.lat,
//                 lon: section19.sector180gambarlahan.lon,
//                 deskripsi: section19.sector180gambarlahan.deskripsi,
//               },
//               sector225gambarlahan: {
//                 foto: section19.sector225gambarlahan.foto,
//                 lat: section19.sector225gambarlahan.lat,
//                 lon: section19.sector225gambarlahan.lon,
//                 deskripsi: section19.sector225gambarlahan.deskripsi,
//               },
//               sector270gambarlahan: {
//                 foto: section19.sector270gambarlahan.foto,
//                 lat: section19.sector270gambarlahan.lat,
//                 lon: section19.sector270gambarlahan.lon,
//                 deskripsi: section19.sector270gambarlahan.deskripsi,
//               },
//               sector315gambarlahan: {
//                 foto: section19.sector315gambarlahan.foto,
//                 lat: section19.sector315gambarlahan.lat,
//                 lon: section19.sector315gambarlahan.lon,
//                 deskripsi: section19.sector315gambarlahan.deskripsi,
//               },
//               tempatpengambilanfoto: section19.tempatpengambilanfoto,
//             },
//             page20: {
//               aksessite1gambarlahan: {
//                 foto: section20.aksessite1gambarlahan.foto,
//                 lat: section20.aksessite1gambarlahan.lat,
//                 lon: section20.aksessite1gambarlahan.lon,
//                 deskripsi: section20.aksessite1gambarlahan.deskripsi,
//               },
//               aksessite2gambarlahan: {
//                 foto: section20.aksessite2gambarlahan.foto,
//                 lat: section20.aksessite2gambarlahan.lat,
//                 lon: section20.aksessite2gambarlahan.lon,
//                 deskripsi: section20.aksessite2gambarlahan.deskripsi,
//               },
//               aksessite3gambarlahan: {
//                 foto: section20.aksessite3gambarlahan.foto,
//                 lat: section20.aksessite3gambarlahan.lat,
//                 lon: section20.aksessite3gambarlahan.lon,
//                 deskripsi: section20.aksessite3gambarlahan.deskripsi,
//               },
//               aksessite4gambarlahan: {
//                 foto: section20.aksessite4gambarlahan.foto,
//                 lat: section20.aksessite4gambarlahan.lat,
//                 lon: section20.aksessite4gambarlahan.lon,
//                 deskripsi: section20.aksessite4gambarlahan.deskripsi,
//               },
//             },
//             page21: {
//               generalcomment: section22.generalcomment,
//             },
//           },
//         };

//         API.createSurveyBTSPart2(params2)
//           .then((res) => {
//             if (res.data.success && res.status === 200) {
//               console.log("API SUCCESS createSurveyBTSPart2 :  > ", res);
//             }
//           })
//           .catch((err) => {
//             console.error("API FAIL :  > ", err.response);
//           });
//         API.createSurveyBTSPart3(params3)
//           .then((res) => {
//             if (res.data.success && res.status === 200) {
//               console.log("API SUCCESS createSurveyBTSPart3 :  > ", res);
//             }
//           })
//           .catch((err) => {
//             console.error("API FAIL :  > ", err.response);
//           });
//         API.createSurveyBTSPart4(params4)
//           .then((res) => {
//             if (res.data.success && res.status === 200) {
//               console.log("API SUCCESS createSurveyBTSPart4 :  > ", res);
//             }
//           })
//           .catch((err) => {
//             console.error("API FAIL :  > ", err.response);
//           });
//         API.createSurveyBTSPart5(params5)
//           .then((res) => {
//             if (res.data.success && res.status === 200) {
//               console.log("API SUCCESS createSurveyBTSPart5 :  > ", res);
//             }
//           })
//           .catch((err) => {
//             console.error("API FAIL :  > ", err.response);
//           });
//       }
//     })
//     .catch((err) => {
//       console.error("API FAIL Submit Part 1 :  > ", err.response);
//     });
// };
