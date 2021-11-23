import React, { useState, useEffect } from "react";
import { Alert, Modal, Card, CardBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// import {
//   setSection1,
//   setSection2,
//   setSection3,
//   setSection4,
//   setSection5,
//   setSection6,
//   setSection7,
//   setSection8,
//   setSection9,
//   setSection10,
//   setSection11,
//   setSection12,
//   setSection13,
//   setSection14,
//   setSection15,
//   setSection16,
//   setSection17,
//   setSection18,
//   setSection19,
//   setSection20,
//   setSection22,
// } from "../../../store/formSurveyStaff/action";
// IMPORT STYLE
import style from "./style.module.scss";
import { setShowAlertSent } from "../../../store/simpanFormAlert/action";

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
  const userid = window.localStorage.getItem("userid");
  const orgid = window.localStorage.getItem("org");

  // location state
  const data = props.datatable;
  const kodeSurvey = data?.kode;
  const latitude = data?.lokasisurvey?.latitude;
  const longitude = data?.lokasisurvey?.longitude;

  // modal states
  const [modalConfirmSubmit, setModalConfirmSubmit] = useState(false);

  // fill input state
  const [allFilled, setAllFilled] = useState(false);

  // section strings
  let strSection1 = "section1";
  let strSection2 = "section2";
  let strSection3 = "section3";
  let strSection4 = "section4";
  let strSection5 = "section5";
  let strSection6 = "section6";
  let strSection7 = "section7";
  let strSection8 = "section8";
  let strSection9 = "section9";
  let strSection10 = "section10";
  let strSection11 = "section11";
  let strSection12 = "section12";
  let strSection13 = "section13";
  let strSection14 = "section14";
  let strSection1505 = "section1505";
  let strSection155 = "section155";
  let strSection16 = "section16";
  let strSection17 = "section17";
  let strSection18 = "section18";
  let strSection19 = "section19";
  let strSection20 = "section20";
  let strSection22 = "section22";

  const idSurvey = location.state.datatable._id;

  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(idSurvey))
  );

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
      batch: "Batch 2",
      page1: localBtsMain.section1,
      page2: localBtsMain.section2,
      page3: localBtsMain.section3,
      page4: localBtsMain.section4,
      page5: localBtsMain.section5,
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
              page6: localBtsMain.section6,
              page7: localBtsMain.section7,
              page8: localBtsMain.section8,
              page9: localBtsMain.section9,
              page10: localBtsMain.section10,
            },
          };

          let params3 = {
            id: surveyID,
            data: {
              page11: localBtsMain.section11,
              page12: localBtsMain.section12,
              page13: localBtsMain.section13,
              page14: localBtsMain.section14,
              page15: localBtsMain.section15,
            },
          };

          let params4 = {
            id: surveyID,
            data: {
              page16: localBtsMain.section16,
              page17: localBtsMain.section17,
              page18: localBtsMain.section18,
            },
          };

          let params5 = {
            id: surveyID,
            data: {
              page18: localBtsMain.section18,
              page19: localBtsMain.section19,
              page20: localBtsMain.section20,
              page21: localBtsMain.section21,
            },
          };
          let params6 = {
            id: surveyID,
            data: {
              page22: localBtsMain.section22,
              page23: localBtsMain.section23,
              page24: localBtsMain.section24,
              page25: localBtsMain.section25,
              page26: localBtsMain.section26,
              page27: localBtsMain.section27,
              page28: localBtsMain.section28,
              page29: localBtsMain.section29,
              page30: localBtsMain.section30,
              page31: localBtsMain.section31,
              page32: localBtsMain.section32,
              page33: localBtsMain.section33,
              page34: localBtsMain.section34,
              page35: localBtsMain.section35,
              page36: localBtsMain.section36,
              page37: localBtsMain.section37,
              page38: localBtsMain.section38,
              page39: localBtsMain.section39,
              page41: localBtsMain.section41,
              page42: localBtsMain.section42,
              page43: localBtsMain.section43,
              page44: localBtsMain.section44,
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

              dispatch(setShowAlertSent(true));
              setTimeout(() => {
                dispatch(setShowAlertSent(false));
              }, 3000);
              setTimeout(() => {
                history.push(`/staffsurveyor/penugasan/`);
              }, 3500);
            })
            .catch((err) => {
              console.error("API FAIL :  > ", err.response);
            });
        }
      })
      .catch((err) => {
        console.error("API FAIL Submit Part 1 :  > ", err.response);
      });
  };

  const handleResetLocalStorage = () => {
    window.localStorage.removeItem(strBtsMain.concat(idSurvey));
  };

  const checkSemuaTerisi = () => {
    if (
      localBtsMain.section1.tipe === "" ||
      localBtsMain.section1.siteid === "" ||
      localBtsMain.section1.kontraktor === "" ||
      localBtsMain.section1.namaproject === "" ||
      localBtsMain.section1.dokumenno === "" ||
      localBtsMain.section1.rev === "" ||
      localBtsMain.section1.tanggalsurvey === "" ||
      localBtsMain.section1.namasurveyor === "" ||
      localBtsMain.section1.nomortelepon === "" ||
      localBtsMain.section1.email === "" ||
      localBtsMain.section1.statussite === "" ||
      localBtsMain.section1.fotoktp === "" ||
      localBtsMain.section1.filesitesurveyreportdanapproval === "" ||
      localBtsMain.section2.namasite === "" ||
      localBtsMain.section2.tipesite === "" ||
      localBtsMain.section2.tipecoverageareasite === "" ||
      localBtsMain.section2.alamatdankodepos === "" ||
      localBtsMain.section2.latitude === "" ||
      localBtsMain.section2.longitude === "" ||
      localBtsMain.section2.contactpersonpemilik === "" ||
      localBtsMain.section2.notlp === "" ||
      localBtsMain.section2.alamatcontactperson === "" ||
      localBtsMain.section2.akseskelokasisite === "" ||
      localBtsMain.section2.jarakdarilokasisitekejalurutama === "" ||
      localBtsMain.section2.akseskelokasisitejarak === "" ||
      localBtsMain.section2.kondisijalanakseslokasi === "" ||
      localBtsMain.section2.jalanakseslokasi === "" ||
      localBtsMain.section2.aksessungaiataulaut === "" ||
      localBtsMain.section2.waktuperjalanan === "" ||
      localBtsMain.section2.ijinkelokasi === "" ||
      localBtsMain.section2.lamaperjalanankekotaterdekat === "" || //new
      localBtsMain.section2.keberangkatandarikotaterdekat === "" || //new
      localBtsMain.section2.tinggitimur === "" ||
      localBtsMain.section2.tinggiselatan === "" ||
      localBtsMain.section2.tinggibarat === "" ||
      localBtsMain.section2.tinggiutara === "" ||
      localBtsMain.section2.jaraktimur === "" ||
      localBtsMain.section2.jarakselatan === "" ||
      localBtsMain.section2.jarakbarat === "" ||
      localBtsMain.section2.jarakutara === "" ||
      localBtsMain.section2.kondisigudangpenyimpanan === "" ||
      localBtsMain.section2.tipeantenna === "" ||
      localBtsMain.section2.ketinggianomni === "" ||
      localBtsMain.section3.koordinatgpswgs84latitude === "" ||
      localBtsMain.section3.koordinatgpswgs84longitude === "" ||
      localBtsMain.section3.altitudeasl === "" ||
      localBtsMain.section3.tinggitowerpole === "" ||
      localBtsMain.section3.tipetower === "" ||
      localBtsMain.section4.penempatanantenna === "" ||
      localBtsMain.section4.mountingantenna === "" ||
      localBtsMain.section4.diameterantenna === "" ||
      localBtsMain.section4.tipeantennasatelit === "" ||
      localBtsMain.section4.satelityangakandigunakan === "" ||
      localBtsMain.section4.lampiranprintscreen === "" ||
      localBtsMain.section4.azimuth === "" ||
      localBtsMain.section4.elevasi === "" ||
      localBtsMain.section4.obstacle === "" ||
      localBtsMain.section5.posisitowerpole === "" ||
      localBtsMain.section5.statuskepemilikanlahan === "" ||
      localBtsMain.section5.namapemiliklahan === "" ||
      localBtsMain.section5.namapemiliklahan2 === "" ||
      localBtsMain.section5.nomorpemiliklahan === "" ||
      localBtsMain.section5.nomorpemiliklahan2 === "" ||
      localBtsMain.section5.statuskondisilahan === "" ||
      localBtsMain.section5.kondisisosial === "" ||
      localBtsMain.section5.keamanan === "" ||
      localBtsMain.section5.panjang === "" ||
      localBtsMain.section5.lebar === ""
    ) {
      console.log("ada yang belum keisi");
      setAllFilled(false);
    } else {
      console.log("semuanya teriisi");
      setAllFilled(true);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem(strBtsMain.concat(idSurvey))) {
      checkSemuaTerisi();
    } else {
      setAllFilled(false);
    }
  }, [localBtsMain]);

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
                  // await handleResetRedux();
                  // await handleResetLocalStorage();
                  await tog_setuju();
                  // setTimeout(() => {
                  //   history.push(`/staffsurveyor/penugasan/`);
                  // }, 2000);
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
                Catatan: Pastikan semua data pada section 1 - section 5 sudah
                terisi semua dan sudah tersimpan sebelum mengklik tombol "Kirim
                Data".
              </b>
            </div>
          )}
          <div className='d-flex justify-content-center p-2'>
            <button
              onClick={() => history.push(`/admin/hasil-survey/`)}
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
              <button className={style.buttonSetuju} disabled>
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
