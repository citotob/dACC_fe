import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import DetailDatePicker from "../DetailDatePicker";
import DetailTimeRangePicker from "../DetailTimeRangePicker";
import DetailCheckbox from "../DetailCheckbox.js";

// import redux
import { setAISection1 } from "../../../../store/formSurveyStaffAI/action";

import { setShowAlert } from "../../../../store/simpanFormAlert/action";

function Section1() {
  // helpers
  const moment = require("moment");
  let today = new Date();
  let todayDate = moment(today).format("YYYY-MM-DD");
  let todayTime = moment(today).format("HH:MM");

  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection1 = "aisection1";
  let localSection1 = JSON.parse(
    window.localStorage.getItem(strSection1.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const aisection1 = useSelector((state) => state.FormSurveyStaffAI.aisection1);

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = () => {
    dispatch(setAISection1({ ...aisection1, latitude: geoLat }));
  };
  const toggleLongValue = () => {
    dispatch(setAISection1({ ...aisection1, longitude: geoLong }));
  };

  useEffect(() => {
    // =========== coba get lat long =========
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude.toFixed(5));
      console.log("Longitude is :", position.coords.longitude.toFixed(5));
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });
    // =========== coba get lat long =========

    if (localSection1 !== null) {
      dispatch(setAISection1(localSection1));
    } else {
      // reset redux store ketika tidak ada local storage terdeteksi
      dispatch(
        setAISection1({
          kategori: "",
          namaPic: "",
          phonePic: "",
          tanggalPelaksanaan: todayDate,
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
          jamOperasionalListrikmulai: todayTime,
          jamOperasionalListrikselesai: todayTime,
          jamOperasionalLokalmulai: todayTime,
          jamOperasionalLokalselesai: todayTime,
          note: "",
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection1.concat(kodeSurvey),
      JSON.stringify(aisection1)
    );
  };

  const handleSavedAlert = () => {
    dispatch(setShowAlert(true));
    setTimeout(() => {
      dispatch(setShowAlert(false));
    }, 3000);
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 1</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Data Calon Pelanggan
        </CardTitle>
        <>
          {/* <DetailInput
             label='Kategori'
             section='1'
             value={aisection1.kategori}
             type='text'
             required={true}
           /> */}
          <DetailDropdown
            required={true}
            label='Kategori'
            section='1'
            dropdownItem={[
              { name: "Sekolah", hasInput: false },
              { name: "Kantor Desa", hasInput: false },
              { name: "Puskesmas", hasInput: false },
              { name: "Alun-alun", hasInput: false },
              { name: "Balai Kerja", hasInput: false },
              { name: "Kantor Polsek", hasInput: false },
              { name: "Kantor Babinsa", hasInput: false },
              { name: "Lainya", hasInput: false },
            ]}
            value={aisection1.kategori}
          />
          <DetailInput
            label='Nama PIC'
            section='1'
            value={aisection1.namaPic}
            type='text'
            required={true}
          />
          <DetailInput
            label='Nomor Telepon PIC'
            section='1'
            value={aisection1.phonePic}
            type='number'
            required={true}
          />
          <DetailDatePicker
            label='Tanggal Kunjungan'
            section='1'
            value={aisection1.tanggalPelaksanaan}
          />
          <DetailInput
            label='Nama Lokasi'
            section='1'
            value={aisection1.namaLokasi}
            type='text'
            required={true}
          />
        </>
        {/* ================================================================ BATAS LATITUDE LONGITUDE ===============  */}
        <div className={`d-flex flex-row align-items-end gap16`}>
          <DetailInput
            label='Latitude'
            section='1'
            type='number'
            required={true}
            value={aisection1?.latitude?.replace(/(\.\d{5})\d+/g, "$1") ?? ""}
            message={
              aisection1.latitude < -90 || aisection1.latitude > 90
                ? "Must be between -90 an 90!"
                : ""
            }
            inputWidth='40%'
          />
          <button
            className={`${style.buttonAutofill} px-2 py-1`}
            onClick={() => {
              toggleLatValue();
            }}
          >
            Get Latitude
          </button>
        </div>
        {/* ================================================================ BATAS LATITUDE  ===============  */}
        {/* ================================================================ BATAS LONGITUDE ===============  */}
        <div className={`d-flex flex-row align-items-end gap16`}>
          <DetailInput
            label='Longitude'
            section='1'
            type='number'
            required={true}
            value={aisection1?.longitude?.replace(/(\.\d{5})\d+/g, "$1") ?? ""}
            message={
              aisection1.longitude < -180 || aisection1.longitude > 180
                ? "Must be between -180 an 180!"
                : ""
            }
            inputWidth='40%'
          />
          <button
            className={`${style.buttonAutofill} px-2 py-1`}
            onClick={() => {
              toggleLongValue();
            }}
          >
            Get Longitude
          </button>
        </div>
        {/* ================================================================ BATAS LONGITUDE ===============  */}
        <>
          <DetailCheckbox
            label='Akses Darat'
            section='1'
            placeholder='Lainnya...'
            // name={["Sewa/Travel", "Bis", "Ojek", "Lainnya"]}
            name={["Sewa/Travel", "Bis", "Ojek"]}
            required={true}
          />
          <DetailInput
            label='Akses Darat Lainnya'
            // label=''
            placeholder='Lainnya...'
            section='1'
            value={aisection1.daratinput}
            type='text'
          />

          <DetailCheckbox
            label='Akses Laut'
            section='1'
            // name={["Feri", "SpeedBoat", "Sampan", "Lainnya"]}
            name={["Feri", "SpeedBoat", "Sampan"]}
            required={true}
          />
          <DetailInput
            label='Akses Laut Lainnya'
            // label=''
            placeholder='Lainnya...'
            section='1'
            value={aisection1.lautinput}
            type='text'
          />

          <DetailCheckbox
            label='Akses Udara'
            section='1'
            // name={["Pesawat", "Helicopter", "Lainnya"]}
            name={["Pesawat", "Helicopter"]}
            required={true}
          />
          <DetailInput
            label='Akses Udara Lainnya'
            // label=''
            placeholder='Lainnya...'
            section='1'
            value={aisection1.udarainput}
            type='text'
          />

          <DetailInput
            label='Durasi Perjalanan Dari Kota Kecamatan'
            section='1'
            value={aisection1.durasiPerjalanan}
            type='number'
            satuan='jam'
          />
          <DetailInput
            label='Nama Kota Kecamatan'
            section='1'
            value={aisection1.namaKotaKecamatan}
            type='text'
            required={true}
          />
          <DetailInput
            label='Ketinggian Tempat (Meter)'
            section='1'
            value={aisection1.elevation}
            type='number'
            satuan='meter'
          />
          <DetailDropdown
            label='Tipe Bisnis'
            section='1'
            dropdownItem={[
              { name: "Corporate", hasInput: false },
              { name: "Personal", hasInput: false },
              { name: "Lainnya", hasInput: true },
            ]}
            value={aisection1.tipeBisnis}
          />
          <DetailInput
            label='Alamat'
            section='1'
            value={aisection1.alamatLokasi}
            type='text'
            required={true}
          />
          <DetailDropdown
            label='Sumber Listrik'
            section='1'
            dropdownItem={[
              { name: "PLN", hasInput: false },
              { name: "Genset", hasInput: false },
              { name: "Sollar Cell", hasInput: false },
              { name: "Lainnya", hasInput: true },
            ]}
            value={aisection1.sumber_listrik}
            required={true}
          />
          {/* ########### show custom input for dropdown ############ */}
          {aisection1.sumber_listrik === "Genset" ||
          aisection1.sumber_listrik === "Sollar Cell" ||
          aisection1.sumber_listrik === "Lainnya" ||
          aisection1.sumber_listrik === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='ID Pelanggan PLN'
                value={
                  aisection1.idPelangganPLN === "PLN"
                    ? ""
                    : aisection1.idPelangganPLN
                }
                onChange={(e) => {
                  dispatch(
                    setAISection1({
                      ...aisection1,
                      idPelangganPLN: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}

          <DetailDropdown
            label='Kapasitas Listrik'
            section='1'
            dropdownItem={[
              { name: "450VA", hasInput: false },
              { name: "900VA", hasInput: false },
              { name: "1300VA", hasInput: false },
              { name: "2200VA", hasInput: true },
              { name: ">3500VA", hasInput: true },
            ]}
            value={aisection1.kapasitas_listrik}
            required={true}
          />
          <DetailDropdown
            label='Sumber Listrik Cadangan'
            section='1'
            dropdownItem={[
              { name: "Genset", hasInput: false },
              { name: "Tidak Ada", hasInput: false },
              { name: "Lainnya", hasInput: true },
            ]}
            value={aisection1.sumber_cadangan}
          />
          <div className='d-flex flex-row w-100 gap16'>
            <DetailTimeRangePicker
              section='1'
              label='Jam Operasional Listrik (Mulai)'
              value={aisection1.jamOperasionalListrikmulai}
            />
            <DetailTimeRangePicker
              section='1'
              label='Jam Operasional Listrik (Selesai)'
              value={aisection1.jamOperasionalListrikselesai}
            />
          </div>
          <div className='d-flex flex-row w-100 gap16'>
            <DetailTimeRangePicker
              section='1'
              label='Jam Operasional Local (Mulai)'
              value={aisection1.jamOperasionalLokalmulai}
            />
            <DetailTimeRangePicker
              section='1'
              label='Jam Operasional Local (Selesai)'
              value={aisection1.jamOperasionalLokalselesai}
            />
          </div>
          <DetailInput
            label='Catatan'
            section='1'
            value={aisection1.note}
            type='text'
            required={true}
          />
        </>
      </>
      <Col lg={12} className='px-0 py-2'>
        <div
          className={`d-flex flex-row mx-auto justify-content-end ${style.modalButtonWrapper}`}
        >
          <button
            className={`${style.yesButton}`}
            onClick={() => {
              handleSimpanLocalStorage();
              handleSavedAlert();
            }}
          >
            Simpan
          </button>
        </div>
      </Col>
    </CardBody>
  );
}

export default Section1;
