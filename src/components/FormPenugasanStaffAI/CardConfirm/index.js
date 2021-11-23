import React, { useState, useEffect } from "react";
import { Alert, Modal, Input, Card, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  setAISection1,
  setAISection2,
  setAISection3,
} from "../../../store/formSurveyStaffAI/action";
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
  let role = window.localStorage.getItem("roleName");
  const userid = window.localStorage.getItem("userid");
  const orgid = window.localStorage.getItem("org");

  // location state
  const activeTab = props?.activeTab?.toLowerCase() ?? "";
  const data = props.datatable;
  const kodeSurvey = data?.kode;
  const latitude = data?.lokasisurvey?.latitude;
  const longitude = data?.lokasisurvey?.longitude;

  // fill input state
  const [allAIFilled, setAllAIFilled] = useState(false);

  // modal states
  const [modalConfirmSubmit, setModalConfirmSubmit] = useState(false);

  // redux
  const aisection1 = useSelector((state) => state.FormSurveyStaff.aisection1);
  const aisection2 = useSelector((state) => state.FormSurveyStaff.aisection2);
  const aisection3 = useSelector((state) => state.FormSurveyStaff.aisection3);

  const handleSavedAlert = () => {
    dispatch(setShowAlertSent(true));
    setTimeout(() => {
      dispatch(setShowAlertSent(false));
    }, 3000);
  };

  // section strings
  let strSection1 = "aisection1";
  let strSection2 = "aisection2";
  let strSection3 = "aisection3";

  const idSurvey = location.state.datatable._id;

  let localSection1 = JSON.parse(
    window.localStorage.getItem(strSection1.concat(idSurvey))
  );
  let localSection2 = JSON.parse(
    window.localStorage.getItem(strSection2.concat(idSurvey))
  );
  let localSection3 = JSON.parse(
    window.localStorage.getItem(strSection3.concat(idSurvey))
  );

  // modal functions
  function tog_setuju() {
    setModalConfirmSubmit(!modalConfirmSubmit);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // convert base64 back to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl?.split(","),
      mime = dataurl?.match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // handleApprove
  const handleSubmitForm = () => {
    let formData = new FormData();
    formData.append("userId", userid ?? "");
    formData.append("organization", orgid ?? "");
    formData.append("kodeHasilSurvey", kodeSurvey ?? "");
    formData.append("namaPic", localSection1.namaPic ?? "");
    formData.append("phonePic", localSection1.phonePic ?? "");
    formData.append("kategori", localSection1.kategori ?? "");
    formData.append(
      "tanggalPelaksanaan",
      localSection1.tanggalPelaksanaan + " 00:00:00.000" ?? ""
    );
    formData.append("namaLokasi", localSection1.namaLokasi ?? "");
    formData.append("latitude", localSection1.latitude ?? "");
    formData.append("longitude", localSection1.longitude ?? "");
    formData.append(
      "darat",
      localSection1.darat +
        (localSection1.daratinput ? `, ${localSection1.daratinput ?? "-"}` : "")
    );
    formData.append(
      "laut",
      localSection1.laut +
        (localSection1.lautinput ? `, ${localSection1.lautinput ?? "-"}` : "")
    );
    formData.append(
      "udara",
      localSection1.udara +
        (localSection1.udarainput ? `, ${localSection1.udarainput ?? "-"}` : "")
    );
    formData.append("durasiPerjalanan", localSection1.durasiPerjalanan ?? "");
    formData.append("namaKotaKecamatan", localSection1.namaKotaKecamatan ?? "");
    formData.append("elevation", localSection1.elevation ?? "");
    formData.append("tipeBisnis", localSection1.tipeBisnis ?? "");
    formData.append("alamatLokasi", localSection1.alamatLokasi ?? "");
    formData.append("idPelangganPLN", localSection1.idPelangganPLN ?? "");
    formData.append("sumber_listrik", localSection1.sumber_listrik ?? "");
    formData.append("kapasitas_listrik", localSection1.kapasitas_listrik ?? "");
    formData.append("sumber_cadangan", localSection1.sumber_cadangan ?? "");
    formData.append(
      "jamOperasionalListrik",
      localSection1.jamOperasionalListrikmulai +
        " - " +
        localSection1.jamOperasionalListrikselesai
    );
    formData.append(
      "jamOperasionalLokal",
      localSection1.jamOperasionalLokalmulai +
        " - " +
        localSection1.jamOperasionalLokalselesai
    );
    // ================== section 2
    formData.append("pc", localSection2?.pc ?? "");
    formData.append("tablet", localSection2?.tablet ?? "");
    formData.append("smartPhone", localSection2?.smartPhone ?? "");
    formData.append("laptop", localSection2?.laptop ?? "");
    formData.append("lainnya1Name", localSection2?.lainnya1Name ?? "");
    formData.append("lainnya1Qty", localSection2?.lainnya1Qty ?? "");
    formData.append("lainnya2Name", localSection2?.lainnya2Name ?? "");
    formData.append("lainnya2Qty", localSection2?.lainnya2Qty ?? "");
    formData.append("note", localSection1.note);
    formData.append("tipenetwork", localSection3.tipenetwork ?? "");
    formData.append(
      "download",
      parseFloat(localSection3.download).toFixed(2) ?? ""
    );
    formData.append(
      "upload",
      parseFloat(localSection3.upload).toFixed(2) ?? ""
    );
    // ================== section 3
    formData.append("fileAkses", dataURLtoFile(localSection3.fileAkses));
    formData.append("filePlang", dataURLtoFile(localSection3.filePlang));
    formData.append("fileMarking", dataURLtoFile(localSection3.fileMarking));
    formData.append("filePln", dataURLtoFile(localSection3.filePln));
    formData.append("fileDenah", dataURLtoFile(localSection3.fileDenah));
    formData.append("fileLanskap", dataURLtoFile(localSection3.fileLanskap));

    API.addHasilSurvey(formData)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS :  > ", res);
          handleSavedAlert();
          handleResetRedux();
          handleResetLocalStorage();
          setTimeout(() => {
            history.push(`/staffsurveyor/penugasan/`);
          }, 3000);
        }
      })
      .catch((err) => {
        console.error("API FAIL :  > ", err.response);
        alert("FORM GAGAL DIKIRIM");
      });
  };

  console.log("localsection2" + localSection2);
  const handleResetRedux = () => {
    dispatch(
      setAISection1({
        kategori: "",
        namaPic: "",
        phonePic: "",
        tanggalPelaksanaan: "",
        namaLokasi: "",
        latitude: "",
        longitude: "",
        darat: [],
        laut: [],
        udara: [],
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
      })
    );

    dispatch(
      setAISection2({
        pc: "",
        tablet: "",
        smartPhone: "",
        laptop: "",
        lainnya1Name: "",
        lainnya1Qty: "",
        lainnya2Name: "",
        lainnya2Qty: "",
      })
    );

    dispatch(
      setAISection3({
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
      })
    );
  };

  const handleResetLocalStorage = () => {
    // resets
    window.localStorage.removeItem(strSection1.concat(locationKodeSurvey));
    window.localStorage.removeItem(strSection2.concat(locationKodeSurvey));
    window.localStorage.removeItem(strSection3.concat(locationKodeSurvey));
  };

  const checkSemuaTerisi = () => {
    if (
      localSection1 === null ||
      localSection2 === null ||
      localSection3 === null ||
      localSection1?.kategori === "" ||
      localSection1?.namaPic === "" ||
      localSection1?.phonePic === "" ||
      localSection1?.namaLokasi === "" ||
      localSection1?.latitude === "" ||
      localSection1?.longitude === "" ||
      localSection1?.darat === [] ||
      localSection1?.laut === [] ||
      localSection1?.udara === [] ||
      localSection1?.namaKotaKecamatan === "" ||
      localSection1?.alamatLokasi === "" ||
      localSection1?.sumber_listrik === "" ||
      localSection1?.kapasitas_listrik === "" ||
      localSection1?.note === "" ||
      localSection2?.pc === "" ||
      localSection2?.tablet === "" ||
      localSection2?.smartPhone === "" ||
      localSection2?.laptop === "" ||
      localSection3?.fileAkses === "" ||
      localSection3?.filePlang === "" ||
      localSection3?.fileMarking === "" ||
      localSection3?.filePln === "" ||
      localSection3?.fileDenah === "" ||
      localSection3?.fileLanskap === ""
    ) {
      console.log("ada yang belum keisi");
      setAllAIFilled(false);
      // window.localStorage.setItem("")
    } else {
      console.log("semuanya teriisi");
      setAllAIFilled(true);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem(strSection1.concat(idSurvey))) {
      checkSemuaTerisi();
    } else {
      setAllAIFilled(false);
    }
  }, [localSection1, localSection2, localSection3]);

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
                  // await handleResetRedux(); << dipindahkan ke dalam handlesubmit
                  // await handleResetLocalStorage(); << dipindahkan ke dalam handlesubmit
                  await tog_setuju();
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
          {!allAIFilled && (
            <div className='w-100 d-flex justify-content-center align-items-center'>
              <b>
                Catatan: Pastikan semua data pada section 1 yang bertanda{" "}
                <span style={{ color: "red", fontWeight: "bold" }}> *</span>{" "}
                sudah terisi semua dan sudah tersimpan sebelum mengklik tombol
                "Kirim Data".
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
            {allAIFilled ? (
              <button
                onClick={() => tog_setuju()}
                className={style.buttonSetuju}
              >
                Kirim Data
              </button>
            ) : (
              <button
                onClick={() => tog_setuju()}
                className={style.buttonSetuju}
                disabled
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

// ======================================= handle submit pakai params:
// let params1 = {
//   userId: userid ?? "",
//   organization: orgid ?? "",
//   kodeHasilSurvey: kodeSurvey ?? "",
//   namaPic: localSection1.namaPic ?? "",
//   phonePic: localSection1.phonePic ?? "",
//   kategori: localSection1.kategori ?? "",
//   tanggalPelaksanaan: localSection1.tanggalPelaksanaan ?? "",
//   namaLokasi: localSection1.namaLokasi ?? "",
//   latitude: localSection1.latitude ?? "",
//   longitude: localSection1.longitude ?? "",
//   darat: localSection1.darat ?? "",
//   laut: localSection1.laut ?? "",
//   udara: localSection1.udara ?? "",
//   durasiPerjalanan: localSection1.durasiPerjalanan ?? "",
//   namaKotaKecamatan: localSection1.namaKotaKecamatan ?? "",
//   elevation: localSection1.elevation ?? "",
//   tipeBisnis: localSection1.tipeBisnis ?? "",
//   alamatLokasi: localSection1.alamatLokasi ?? "",
//   idPelangganPLN: localSection1.idPelangganPLN ?? "",
//   sumber_listrik: localSection1.sumber_listrik ?? "",
//   kapasitas_listrik: localSection1.kapasitas_listrik ?? "",
//   sumber_cadangan: localSection1.sumber_cadangan ?? "",
//   jamOperasionalListrik:
//     localSection1.jamOperasionalListrikmulai +
//     " - " +
//     localSection1.jamOperasionalListrikselesai,
//   jamOperasionalLokal:
//     localSection1.jamOperasionalLokalmulai +
//     " - " +
//     localSection1.jamOperasionalLokalselesai,
//   // ================== section 2
//   pc: localSection2.pc ?? "",
//   tablet: localSection2.tablet ?? "",
//   smartPhone: localSection2.smartPhone ?? "",
//   laptop: localSection2.laptop ?? "",
//   lainnya1Name: localSection2.lainnya1Name ?? "",
//   lainnya1Qty: localSection2.lainnya1Qty ?? "",
//   lainnya2Name: localSection2.lainnya2Name ?? "",
//   lainnya2Qty: localSection2.lainnya2Qty ?? "",
//   note: localSection1.note ?? "",
//   tipenetwork: "test",
//   download: "test",
//   upload: "test",
//   // ================== section 3
//   fotoAkses: localSection3.fileAkses ?? "",
//   fotoPlang: localSection3.filePlang ?? "",
//   fotoMark: localSection3.fileMarking ?? "",
//   fotoKWH: localSection3.filePln ?? "",
//   fotoDenah: localSection3.fileDenah ?? "",
//   fotoLanskap: localSection3.fileLanskap ?? "",
// };

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
//               generalcomment: section21.generalcomment,
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
