import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "reactstrap";
import classnames from "classnames";
import Resizer from "react-image-file-resizer";

//Import Style
import style from "./style.module.scss";

import DetailInput from "./DetailInput.js";
import DetailDropdown from "./DetailDropdown.js";
import DetailImage from "./DetailImage.js";
import DetailDatePicker from "./DetailDatePicker";
import DetailTimeRangePicker from "./DetailTimeRangePicker";
import DetailCheckbox from "./DetailCheckbox.js";
import DetailRadio from "./DetailRadio";
import PopupImage from "../../PopupImage";
import GetLatLong from "../../GetLatLong";

// import components
import Card1 from "./card1";
import { url } from "../../../services/Config";
import _ from "lodash";

// import redux
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
import { setBtsFormTab } from "../../../store/btsFormTab/action";
import { setShowAlert } from "../../../store/simpanFormAlert/action";

const moment = require("moment");

const Fotolokasi = (props) => {
  return (
    <div className='d-flex flex-column col-6 text-center'>
      <span>{props.title}</span>
      <span>
        <img
          src={`${process.env.REACT_APP_BE_URL}${props.url}`}
          style={{ width: "354px", height: "184px" }}
        />
      </span>
      <span className='mb-4'>
        GPS: {props.lat}, {props.long}
      </span>
    </div>
  );
};

const Section1 = ({ lastData, datatable, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection1 = "section1";
  let localSection1 = JSON.parse(
    window.localStorage.getItem(strSection1.concat("6141c7d7ef769c4beeda8783"))
  );

  // redux
  const dispatch = useDispatch();
  const section1 = useSelector((state) => state.FormSurveyStaff.section1);

  useEffect(() => {
    if (Object.values(section1).every((x) => x === "" || x === [])) {
      dispatch(
        setSection1({
          disiapkanoleh: lastData.page1.disiapkanoleh,
          namaproject: lastData.page1.namaproject,
          tanggalkunjungan: lastData.page1.tanggalkunjungan,
          namasurveyor: lastData.page1.namasurveyor,
          nomortelepon: lastData.page1.nomortelepon,
          email: lastData.page1.email,
          statussite: lastData.page1.statussite,
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection1.concat("6141c7d7ef769c4beeda8783"),
      JSON.stringify(section1)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 1</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Informasi Survey
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailInput
            label='Kontraktor'
            section='1'
            value={section1.disiapkanoleh}
            type='text'
          />
          <DetailInput
            label='Nama Project'
            section='1'
            value={section1.namaproject}
            type='text'
          />
          {/* tanggal pakai date picker  */}
          <DetailDatePicker
            label='Tanggal Survey'
            section='1'
            value={section1.tanggalkunjungan}
          />
          <DetailInput
            label='Nama Surveyor'
            section='1'
            value={section1.namasurveyor}
            type='text'
          />
          <DetailInput
            label='Nomor Telepon'
            section='1'
            value={section1.nomortelepon}
            type='number'
          />
          <DetailInput
            label='Email'
            section='1'
            value={section1.email}
            type='email'
          />
          {/* dropdown status site : OK , ada sinyal */}
          <DetailRadio
            label='Status Site'
            section='1'
            radioItem={[{ name: "OK" }, { name: "ada sinyal" }]}
            value={section1.statussite}
          />
        </div>
      </>
      <Col lg={12} className='px-0 py-2'>
        <div
          className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
        >
          <button
            disabled
            className={`${style.pagingButtons}`}
            onClick={() => {
              setactiveTab("17");
            }}
          >{`< Prev`}</button>
          <button
            className={`${style.yesButton}`}
            onClick={() => {
              // handleSimpanLocalStorage();

              dispatch(setShowAlert(true));
              setTimeout(() => {
                dispatch(setShowAlert(false));
              }, 3000);
            }}
          >
            Simpan
          </button>
          <button
            className={`${style.pagingButtons}`}
            onClick={() => {
              setactiveTab("2");
            }}
          >{`Next >`}</button>
        </div>
      </Col>
    </CardBody>
  );
};

const Section2 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection2 = "section2";
  let localSection2 = JSON.parse(
    window.localStorage.getItem(strSection2.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);

  const [valueTipeSite, setValueTipeSite] = useState("");
  const [valuekondisiaksesjalan, setValuekondisiaksesjalan] = useState("");
  const [valueaksesdarat, setValueaksesdarat] = useState("");
  const [valueaksessungailaut, setValueaksessungailaut] = useState("");
  const [valuejaraktempuh, setValuejaraktempuh] = useState("");

  useEffect(() => {
    if (Object.values(section2).every((x) => x === "" || x === [])) {
      dispatch(
        setSection2({
          namasite: lastData.page2.namasite,
          tipesite: lastData.page2.tipesite,
          tipecakupansite: lastData.page2.tipecakupansite,
          alamat: lastData.page2.alamat,
          namapicdaerah: lastData.page2.namapicdaerah,
          nomorteleponpic: lastData.page2.nomorteleponpic,
          alamatpicdaerah: lastData.page2.alamatpicdaerah,
          akseskelokasi: lastData.page2.akseskelokasi,
          jarakdarisitekajalanutama: lastData.page2.jarakdarisitekajalanutama,
          luasaksesjalan: lastData.page2.luasaksesjalan,
          kondisiaksesjalan: lastData.page2.kondisiaksesjalan,
          aksesdarat: lastData.page2.aksesdarat,
          aksessungailaut: lastData.page2.aksessungailaut,
          jaraktempuh: lastData.page2.jaraktempuh,
          perizinanakseskesite: lastData.page2.perizinanakseskesite,
          jarakdarikotakelokasidannamakota:
            lastData.page2.jarakdarikotakelokasidannamakota,
          kondisiperalatan: lastData.page2.kondisiperalatan,
          pilihtipeantena: lastData.page2.pilihtipeantena,
        })
      );
    }

    // if (localSection2 !== null) {
    //   dispatch(setSection2(localSection2));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection2({
    //       namasite: "",
    //       tipesite: "",
    //       tipecakupansite: "",
    //       alamat: "",
    //       namapicdaerah: "",
    //       nomorteleponpic: "",
    //       alamatpicdaerah: "",
    //       akseskelokasi: "",
    //       jarakdarisitekajalanutama: "",
    //       luasaksesjalan: "",
    //       kondisiaksesjalan: "",
    //       aksesdarat: "",
    //       aksessungailaut: "",
    //       jaraktempuh: "",
    //       perizinanakseskesite: "",
    //       jarakdarikotakelokasidannamakota: "",
    //       kondisiperalatan: "",
    //       pilihtipeantena: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection2.concat(kodeSurvey),
      JSON.stringify(section2)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 2</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Informasi Umum
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailInput
            label='Nama Site'
            section='2'
            type='text'
            value={section2.namasite}
          />
          {/* tipe site harusnya dropdown : perdesaan,perbatasan dengan negara lain, lapangan, atap, lainnya : jadi input */}

          <DetailDropdown
            label='Tipe Site'
            section='2'
            value={section2.tipesite}
            dropdownItem={[
              { name: "Pedesaan" },
              { name: "Perbatasan dengan negara lain" },
              { name: "Lapangan/Greenfield" },
              { name: "Atap/Rooftop" },
              { name: "Lainnya" },
            ]}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section2.tipesite === "Pedesaan" ||
          section2.tipesite === "Perbatasan dengan negara lain" ||
          section2.tipesite === "Lapangan/Greenfield" ||
          section2.tipesite === "Atap/Rooftop" ||
          section2.tipesite === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Tipe Site'
                value={section2.tipesite === "Lainnya" ? "" : section2.tipesite}
                onChange={(e) => {
                  setValueTipeSite(e.target.value);
                  dispatch(
                    setSection2({
                      ...section2,
                      tipesite: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* drodown tipe cakupan site : daerah padat penduduk, daerah penduduk, pinggiran kota, perdesaan, laut */}
          <DetailDropdown
            label='Tipe Coverage Area Site'
            section='2'
            dropdownItem={[
              { name: "Daerah padat Penduduk/Kota Padat" },
              { name: "Daerah penduduk/Perkotaan" },
              { name: "Pinggiran Kota" },
              { name: "Pedesaan" },
              { name: "Kepulauan" },
            ]}
            value={section2.tipecakupansite}
          />
          <DetailInput
            label='Alamat dan Kode Pos'
            section='2'
            type='text'
            value={section2.alamat}
          />
          <DetailInput
            label='Contact Person Pemilik'
            section='2'
            type='text'
            value={section2.namapicdaerah}
          />
          <DetailInput
            label='No Tlp'
            section='2'
            type='text'
            value={section2.nomorteleponpic}
          />
          <DetailInput
            label='Alamat Contact Person'
            section='2'
            type='text'
            value={section2.alamatpicdaerah}
          />
          {/* dropdown akses ke lokasi : jalan darat, jalan laut, lainnya (no input) */}
          <DetailDropdown
            label='Akses ke Lokasi Site'
            section='2'
            dropdownItem={[
              { name: "Akses Darat" },
              { name: "Akses Laut" },
              { name: "Akses Udara" },
              { name: "Lainnya" },
            ]}
            value={section2.akseskelokasi}
          />
          <DetailInput
            label='Jarak Dari Lokasi Site ke Jalur Utama '
            section='2'
            type='number'
            satuan='meter'
            value={section2.jarakdarisitekajalanutama}
          />
          <DetailInput
            label='Akses ke Lokasi Site (jarak)'
            section='2'
            type='number'
            satuan='meter'
            value={section2.luasaksesjalan}
          />
          {/* dropdown kondisi akses jalan : jalan aspal, jalan tanah, jalan baja, jalan setapak, jalan berbatu, lainnya(ada input) */}
          <DetailDropdown
            label='Kondisi Jalan Akses lokasi'
            section='2'
            value={section2.kondisiaksesjalan}
            dropdownItem={[
              { name: "Jalan Aspal" },
              { name: "Jalan Cor" },
              { name: "Jalan Tanah" },
              { name: "Jalan Setapak" },
              { name: "Jalan Berbatu" },
              { name: "Lainnya" },
            ]}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section2.kondisiaksesjalan === "Jalan Aspal" ||
          section2.kondisiaksesjalan === "Jalan Tanah" ||
          section2.kondisiaksesjalan === "Jalan Cor" ||
          section2.kondisiaksesjalan === "Jalan Setapak" ||
          section2.kondisiaksesjalan === "Jalan Berbatu" ||
          section2.kondisiaksesjalan === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Kondisi Jalan Akses lokasi'
                value={
                  section2.kondisiaksesjalan === "Lainnya"
                    ? ""
                    : section2.kondisiaksesjalan
                }
                onChange={(e) => {
                  setValuekondisiaksesjalan(e.target.value);
                  dispatch(
                    setSection2({
                      ...section2,
                      kondisiaksesjalan: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown akses darat : transportasi umum, ojek, lainnya(ada input) */}
          <DetailDropdown
            label='Jalan Akses Lokasi'
            section='2'
            dropdownItem={[
              { name: "Angkutan Umum" },
              { name: "Ojek" },
              { name: "Roda Dua" },
              { name: "Roda Empat" },
              { name: "Lainnya" },
            ]}
            value={section2.aksesdarat}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section2.aksesdarat === "Angkutan Umum" ||
          section2.aksesdarat === "Ojek" ||
          section2.aksesdarat === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Jalan Akses Lokasi'
                value={
                  section2.aksesdarat === "Lainnya" ? "" : section2.aksesdarat
                }
                onChange={(e) => {
                  setValueaksesdarat(e.target.value);
                  dispatch(
                    setSection2({
                      ...section2,
                      aksesdarat: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown akses sunngai laut : kapal biasa, kapal sewa, lainnya(ada input) */}
          <DetailDropdown
            label='Akses Sungai atau Laut'
            section='2'
            dropdownItem={[
              { name: "Kapal Reguler" },
              { name: "Sewa Kapal" },
              { name: "Lainnya" },
            ]}
            value={section2.aksessungailaut}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section2.aksessungailaut === "Kapal Reguler" ||
          section2.aksessungailaut === "Sewa Kapal" ||
          section2.aksessungailaut === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Akses Sungai atau Laut'
                value={
                  section2.aksessungailaut === "Lainnya"
                    ? ""
                    : section2.aksessungailaut
                }
                onChange={(e) => {
                  setValueaksessungailaut(e.target.value);
                  dispatch(
                    setSection2({
                      ...section2,
                      aksessungailaut: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown jarak tempuh : 24 jam, jam kerja, jam tertentu  */}
          <DetailDropdown
            label='Waktu Perjalanan'
            section='2'
            dropdownItem={[
              { name: "24 Jam" },
              { name: "Waktu Kerja" },
              { name: "Jadwal Kapal" },
            ]}
            value={section2.jaraktempuh}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section2.jaraktempuh === "24 Jam" ||
          section2.jaraktempuh === "Jam Kerja" ||
          section2.jaraktempuh === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Waktu Perjalanan'
                value={
                  section2.jaraktempuh === "Jadwal Kapal"
                    ? ""
                    : section2.jaraktempuh
                }
                onChange={(e) => {
                  setValuejaraktempuh(e.target.value);
                  dispatch(
                    setSection2({
                      ...section2,
                      jaraktempuh: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* radio perizinan akses ke site : iya, tidak */}
          <DetailRadio
            label='Ijin ke Lokasi'
            section='2'
            radioItem={[{ name: "Iya" }, { name: "Tidak" }]}
            value={section2.perizinanakseskesite}
          />
          <DetailInput
            label='Lama Perjalanan ke Kota Terdekat'
            section='2'
            satuan='jam'
            type='number'
            value={section2.lamaperjalanankekotaterdekat}
          />
          <DetailInput
            label='Keberangkatan Dari kota Terdekat'
            section='2'
            type='text'
            value={section2.keberangkatandarikotaterdekat}
          />
          {/* di SSR ADA KETINGGIAN HALANGAN */}
          <Label>Ketinggian Halangan</Label>
          <DetailInput label='Timur' section='2' type='number' satuan='meter' />
          <DetailInput
            label='Selatan'
            section='2'
            type='number'
            satuan='meter'
          />
          <DetailInput label='Barat' section='2' type='number' satuan='meter' />
          <DetailInput label='Utara' section='2' type='number' satuan='meter' />
          {/* di SSR ADA JARAK HALANGAN */}
          <Label>Jarak Halangan dari Tower</Label>
          <DetailInput label='Timur' section='2' type='number' satuan='meter' />
          <DetailInput
            label='Selatan'
            section='2'
            type='number'
            satuan='meter'
          />
          <DetailInput label='Barat' section='2' type='number' satuan='meter' />
          <DetailInput label='Utara' section='2' type='number' satuan='meter' />
          {/* dropdown kondisi peralatan : tempat terkunci dengan pengamanan 24 jam, tidak terkunci dengan peralatan terlihat, kondisi lainnya(no input) */}
          <DetailDropdown
            label='Kondisi Gudang Penyimpanan'
            section='2'
            dropdownItem={[
              {
                name: "Terkunci Security 24 Jam",
              },
              {
                name: "Ruang Terbuka",
              },
              { name: "Kondisi lainnya" },
            ]}
            value={section2.kondisiperalatan}
          />
          {/* dropdown pilih tipe antena : omni, sectoral */}
          <DetailDropdown
            label='Tipe Antenna'
            section='2'
            dropdownItem={[{ name: "Omni" }, { name: "Sectoral" }]}
            value={section2.pilihtipeantena}
          />
          {/* SSR NOTE : JUMLAH, AZIMUTH, UNIT, ANTENNA HEIGHT */}
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("1");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (
                  section2.tipesite === "Lainnya" ||
                  section2.kondisiaksesjalan === "Lainnya" ||
                  section2.aksesdarat === "Lainnya" ||
                  section2.aksessungailaut === "Lainnya"
                ) {
                  if (section2.tipesite !== "Lainnya") {
                    dispatch(
                      setSection2({
                        ...section2,
                        kondisiaksesjalan: valuekondisiaksesjalan,
                        aksesdarat: valueaksesdarat,
                        aksessungailaut: valueaksessungailaut,
                      })
                    );
                  } else if (section2.kondisiaksesjalan !== "Lainnya") {
                    dispatch(
                      setSection2({
                        ...section2,
                        tipesite: valueTipeSite,
                        aksesdarat: valueaksesdarat,
                        aksessungailaut: valueaksessungailaut,
                      })
                    );
                  } else if (section2.aksesdarat !== "Lainnya") {
                    dispatch(
                      setSection2({
                        ...section2,
                        tipesite: valueTipeSite,
                        kondisiaksesjalan: valuekondisiaksesjalan,

                        aksessungailaut: valueaksessungailaut,
                      })
                    );
                  } else if (section2.aksessungailaut !== "Lainnya") {
                    dispatch(
                      setSection2({
                        ...section2,
                        tipesite: valueTipeSite,
                        kondisiaksesjalan: valuekondisiaksesjalan,
                        aksesdarat: valueaksesdarat,
                      })
                    );
                  } else {
                    dispatch(
                      setSection2({
                        ...section2,
                        tipesite: valueTipeSite,
                        kondisiaksesjalan: valuekondisiaksesjalan,
                        aksesdarat: valueaksesdarat,
                        aksessungailaut: valueaksessungailaut,
                      })
                    );
                  }
                }
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("3");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section3 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection3 = "section3";
  let localSection3 = JSON.parse(
    window.localStorage.getItem(strSection3.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section3 = useSelector((state) => state.FormSurveyStaff.section3);

  const [valueTipeTower, setValueTipeTower] = useState("");

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");
  const [stateLat, setstateLat] = useState("");
  const [stateLon, setstateLon] = useState("");

  const toggleLatValue = (label) => {
    setstateLat(geoLat);
    dispatch(
      setSection3({
        ...section3,
        koordinatgpswgs84_lat: geoLat,
      })
    );
  };

  const toggleLongValue = (label) => {
    setstateLon(geoLong);
    dispatch(
      setSection3({
        ...section3,
        koordinatgpswgs84_long: geoLong,
      })
    );
  };

  const getGeoLatLong = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });
  };

  console.log(`console log nya stateLat`, stateLat);
  console.log(`console log nya stateLon`, stateLon);

  useEffect(() => {
    if (Object.values(section3).every((x) => x === "" || x === [])) {
      dispatch(
        setSection3({
          tinggitowerpole: lastData.page3.tinggitowerpole
            ? lastData.page3.tinggitowerpole
            : "",
          tipetower: lastData.page3.tipetower ? lastData.page3.tipetower : "",
          koordinatgpswgs84_lat: lastData.page3["koordinatgpswgs84_lat"]
            ? lastData.page3["koordinatgpswgs84_lat"]
            : lastData.page3["koordinatgpswgs84-lat"]
            ? lastData.page3["koordinatgpswgs84-lat"]
            : "",
          koordinatgpswgs84_long: lastData.page3["koordinatgpswgs84_long"]
            ? lastData.page3["koordinatgpswgs84_long"]
            : lastData.page3["koordinatgpswgs84-long"]
            ? lastData.page3["koordinatgpswgs84-long"]
            : "",
          koordinatgpswgs84_height: lastData.page3["koordinatgpswgs84-height"]
            ? lastData.page3["koordinatgpswgs84-height"]
            : lastData.page3["koordinatgpswgs84_height"]
            ? lastData.page3["koordinatgpswgs84_height"]
            : "",
        })
      );
    }
    getGeoLatLong();
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection3.concat(kodeSurvey),
      JSON.stringify(section3)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 3</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Informasi Geografi & Data Tower Yang Disarankan
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* input otomatis dari device   */}
          <div>
            <div className={`d-flex flex-row align-items-end gap16`}>
              <div className='form-group flex-grow-1'>
                <label className='px-0'>Latitude</label>
                <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                  <input
                    style={{ width: "95%", border: "none", outline: "none" }}
                    type='number'
                    placeholder='Latitude'
                    value={section3.koordinatgpswgs84_lat.replace(
                      /(\.\d{5})\d+/g,
                      "$1"
                    )}
                    onChange={(e) => {
                      setstateLat(e.target.value);
                      dispatch(
                        setSection3({
                          ...section3,
                          koordinatgpswgs84_lat: stateLat,
                        })
                      );
                    }}
                  />{" "}
                  {stateLat < -90 || stateLat > 90 ? (
                    <span style={{ color: "red", marginLeft: "auto" }}>
                      {" "}
                      Must be between -90 an 90!
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue();
                }}
              >
                Get Latitude
              </button>
            </div>{" "}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <div className='form-group flex-grow-1'>
                <label className='px-0'>Longitude</label>
                <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                  <input
                    style={{ width: "95%", border: "none", outline: "none" }}
                    type='number'
                    placeholder='Longitude'
                    value={section3.koordinatgpswgs84_long.replace(
                      /(\.\d{5})\d+/g,
                      "$1"
                    )}
                    onChange={(e) => {
                      setstateLon(e.target.value);
                      dispatch(
                        setSection3({
                          ...section3,
                          koordinatgpswgs84_long: stateLon,
                        })
                      );
                    }}
                  />

                  {stateLon < -180 || stateLon > 180 ? (
                    <span style={{ color: "red", marginLeft: "auto" }}>
                      {" "}
                      Must be between -180 an 180!
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue();
                }}
              >
                Get Longitude
              </button>
            </div>
          </div>
          {/* <DetailInput
            label="Koordinat GPS WGS84 - Latitude"
            section="3"
            value={section3.koordinatgpswgs84_lat}
            type="number"
          /> */}
          {/* input otomatis dari device   */}
          {/* <DetailInput
            label="Koordinat GPS WGS84 - Longitude"
            section="3"
            value={section3.koordinatgpswgs84_long}
            type="number"
          /> */}
          {/* SSR NOTE : TAMBAHAN Altitude */}
          {/* <DetailInput label="Altitude" satuan='meter di atas permukaan laut' section='3' type='number' /> */}
          <DetailInput
            label='Altitude (ASL)'
            section='3'
            value={section3.koordinatgpswgs84_height}
            type='number'
          />
          <DetailDropdown
            label='Tinggi Tower / Pole'
            section='3'
            value={section3.tinggitowerpole}
            dropdownItem={[
              { name: "18 meter" },
              { name: "32 meter" },
              { name: "42 meter" },
              { name: "52 meter" },
              { name: "62 meter" },
              { name: "72 meter" },
            ]}
          />
          {/* dropdown tipe tower : tiang beroda, tiang berotot, tower berdiri sendiri, lainnya(input) */}
          <DetailDropdown
            label='Tipe Tower'
            section='3'
            value={section3.tipetower}
            dropdownItem={[
              { name: "Guyed Mast" },
              { name: "Guyed Mast Tubular" },
              { name: "Self Supporting Tower Heavy" },
              { name: "Self Supporting Tower Medium" },
              { name: "Self Supporting Tower Light" },
              { name: "Lainnya" },
            ]}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section3.tipetower === "Guyed Mast" ||
          section3.tipetower === "Guyed Mast Tubular" ||
          section3.tipetower === "Self Supporting Tower" ||
          section3.tipetower === "Heavy" ||
          section3.tipetower === "Medium" ||
          section3.tipetower === "Heavy" ||
          section3.tipetower === "Light" ||
          section3.tipetower === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Tipe Tower'
                value={
                  section3.tipetower === "Lainnya" ? "" : section3.tipetower
                }
                onChange={(e) => {
                  setValueTipeTower(e.target.value);
                  dispatch(
                    setSection3({
                      ...section3,
                      tipetower: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("2");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (section3.tipetower === "Lainnya") {
                  dispatch(
                    setSection3({
                      ...section3,
                      tipetower: valueTipeTower,
                      koordinatgpswgs84_lat: stateLat,
                      koordinatgpswgs84_long: stateLon,
                    })
                  );
                }
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("4");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section4 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection4 = "section4";
  let localSection4 = JSON.parse(
    window.localStorage.getItem(strSection4.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section4 = useSelector((state) => state.FormSurveyStaff.section4);

  useEffect(() => {
    if (Object.values(section4).every((x) => x === "" || x === [])) {
      dispatch(
        setSection4({
          penempatanantena: lastData.page4.penempatanantena,
          alasantena: lastData.page4.alasantena,
          diameterantena: lastData.page4.diameterantena,
          penggunaansatelit: lastData.page4.penggunaansatelit,
          azimuth: lastData.page4.azimuth,
          elevasi: lastData.page4.elevasi,
        })
      );
    }
    // if (localSection4 !== null) {
    //   dispatch(setSection4(localSection4));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection4({
    //       penempatanantena: "",
    //       alasantena: "",
    //       diameterantena: "",
    //       penggunaansatelit: "",
    //       azimuth: "",
    //       elevasi: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection4.concat(kodeSurvey),
      JSON.stringify(section4)
    );
  };
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 4</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Transmisi VSAT
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* radio penempatan antena :  tanah, atap */}
          <DetailRadio
            label='Penempatan Antenna'
            section='4'
            radioItem={[
              { name: "Ground" },
              { name: "Rooftop" },
              { name: "Wall Mounting" },
              // { name: "Atap",   },
            ]}
          />
          {/* radio alasn antena : tidak menembus, di lantai atas */}
          <DetailRadio
            label='Mounting Antenna' // SSR NOTE : Mounting Antena
            section='4'
            radioItem={[
              {
                name: "Tidak Menembus",
              },
              {
                name: "Di lantai atas",
              },
            ]}
          />
          <DetailDropdown
            label='Diameter Antenna'
            section='4'
            dropdownItem={[
              { name: "1.3 meter" },
              { name: "1.8 meter" },
              { name: "2.4 meter" },
            ]}
            value={section4.diameterantena}
          />
          {/* dropdown penggunaan satelit : C-Band, Ku-Band, Ka-Band */}
          {/* SSR NOTE : SATELIT YANG AKAN DISURVEY (MOHON DIPERIKSA SEMUA) */}
          <DetailRadio
            label='Satelit Yang Akan Digunakan'
            section='4'
            radioItem={[
              {
                name: "Ku-Band",
              },
              {
                name: "Ka-Band",
              },
              {
                name: "C-Band",
              },
              {
                name: "C-Band Extended",
              },
            ]}
          />
          <DetailInput
            label='Azimuth'
            section='4'
            satuan=''
            type='number'
            value={section4.azimuth}
          />
          <DetailInput
            label='Elevasi'
            section='4'
            satuan=''
            type='number'
            value={section4.elevasi}
          />
          {/* SSR NOTE : TAMBAHAN ITEMS */}
          {/* <DetailImage label='PSN Nusantara Satu (146 deg EAST)' />
          <DetailImage label='JCSAT 4B (124 deg EAST)' />
          <DetailImage label='Apstar 5C (138 deg EAST)' />
          <DetailImage label='Asiasat 9 (122 deg EAST)' />
          <DetailImage label='SES-12 (95 deg EAST)' /> */}
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("3");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("5");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section5 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection5 = "section5";
  let localSection5 = JSON.parse(
    window.localStorage.getItem(strSection5.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section5 = useSelector((state) => state.FormSurveyStaff.section5);

  const [valueKetinggianTowerPole, setValueKetinggianTowerPole] = useState("");
  const [valueKepemilikanLahan, setValueKepemilikanLahan] = useState("");
  const [valueKondisiLahan, setValueKondisiLahan] = useState("");
  const [valuePanjang, setValuePanjang] = useState("");
  const [valueLebar, setValueLebar] = useState("");

  useEffect(() => {
    if (Object.values(section5).every((x) => x === "" || x === [])) {
      dispatch(
        setSection5({
          ketinggiantowerpole: lastData.page5.ketinggiantowerpole,
          kepemilikanlahan: lastData.page5.kepemilikanlahan,
          namapemiliklahan: lastData.page5.namapemiliklahan,
          nomorpemiliklahan: lastData.page5.nomorpemiliklahan,
          keamanan: lastData.page5.keamanan,
          luaslahan: lastData.page5.luaslahan,
          kondisilahan: lastData.page5.kondisilahan,
          kondisisosial: lastData.page5.kondisisosial,
        })
      );
    }
    // if (localSection5 !== null) {
    //   dispatch(setSection5(localSection5));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection5({
    //       ketinggiantowerpole: "",
    //       kepemilikanlahan: "",
    //       namapemiliklahan: "",
    //       nomorpemiliklahan: "",
    //       keamanan: "",
    //       luaslahan: "",
    //       kondisilahan: "",
    //       kondisisosial: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection5.concat(kodeSurvey),
      JSON.stringify(section5)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 5</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Informasi Umum Lahan
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* dropdown ketinggian tower : dalam jangkauan, jauh dari jangkauan */}
          {/* kalau jauh dari jangkauan : input type number > (validation maksimal 600m) */}
          <DetailDropdown
            label='Posisi Tower/Pole' // posisi tower / pole
            section='5'
            dropdownItem={[
              { name: "Di Permukiman" }, // dipermukiman
              {
                name: "Jarak dari permukiman 100 Meter (Max 600 meter)",
              }, // jarak dari permukiman ... meter
            ]}
            value={
              section5.ketinggiantowerpole !== "Di Permukiman"
                ? "Jarak dari permukiman 100 Meter (Max 600 meter)"
                : section5.ketinggiantowerpole
            }
          />
          {/* {section5.ketinggiantowerpole === "Di Permukiman" ||
          section5.ketinggiantowerpole === "" ? (
            <></>
          ) : (
            <>
              <input
                type='number'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Posisi Tower/Pole'
                // value={section5.ketinggiantowerpole}
                value={
                  section5.ketinggiantowerpole ===
                  "Jarak dari permukiman 100 Meter (Max 600 meter)"
                    ? ""
                    : section5.ketinggiantowerpole
                }
                onChange={(e) => {
                  setValueKetinggianTowerPole(e.target.value);
                  dispatch(
                    setSection5({
                      ...section5,
                      ketinggiantowerpole: e.target.value,
                    })
                  );
                }}
              />
              <span>meter</span>
            </>
          )} */}
          {/* dropdown kepemilikan  : pemerintah, individu/perusahaan, lainnya(input)  */}
          <DetailDropdown
            label='Status Kepemilikan Lahan'
            section='5'
            dropdownItem={[
              { name: "Pemerintah" },
              { name: "Individu/Perusahaan" },
              { name: "Hutan Lindung" },
              { name: "Tanah Adat" },
              { name: "Kawasan Konservasi" },
              { name: "Hutan Produksi" },
              { name: "Lainnya" },
            ]}
            value={section5.kepemilikanlahan}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section5.kepemilikanlahan === "Pemerintah" ||
          section5.kepemilikanlahan === "Individu/Perusahaan" ||
          section5.kepemilikanlahan === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Status Kepemilikan Lahan'
                value={
                  section5.kepemilikanlahan === "Lainnya"
                    ? ""
                    : section5.kepemilikanlahan
                }
                onChange={(e) => {
                  setValueKepemilikanLahan(e.target.value);
                  dispatch(
                    setSection5({
                      ...section5,
                      kepemilikanlahan: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          <DetailInput
            label='Nama Pemilik Lahan 1'
            section='5'
            type='text'
            value={section5.namapemiliklahan}
          />
          <DetailInput
            label='No Tlp Pemilik Lahan 1'
            section='5'
            type='text'
            value={section5.nomorpemiliklahan}
          />
          <DetailInput
            label='Nama Pemilik Lahan 2'
            section='5'
            type='text'
            value={section5.namapemiliklahan2}
          />
          <DetailInput
            label='No Tlp Pemilik Lahan 2'
            section='5'
            type='text'
            value={section5.nomorpemiliklahan2}
          />
          {/* dropdown kondisi : kosong, rumah, lainnya(input) */}
          <DetailDropdown
            label='Status Kondisi Lahan'
            section='5'
            dropdownItem={[
              { name: "Kosong" },
              { name: "Rumah" },
              { name: "Lainnya" },
            ]}
            value={section5.kondisilahan}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section5.kondisilahan === "Kosong" ||
          section5.kondisilahan === "Rumah" ||
          section5.kondisilahan === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Status Kondisi Lahan'
                value={
                  section5.kondisilahan === "Lainnya"
                    ? ""
                    : section5.kondisilahan
                }
                onChange={(e) => {
                  setValueKondisiLahan(e.target.value);
                  dispatch(
                    setSection5({
                      ...section5,
                      kondisilahan: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown sosial : bisa bekerjasama, tidak begitu bisa bekerjasama, tidak bekerjasama*/}
          <DetailDropdown
            label='Kondisi Sosial'
            section='5'
            dropdownItem={[
              { name: "Kooperatif" },
              { name: "Kurang Kooperatif" },
              { name: "Tidak Kooperatif" },
            ]}
            value={section5.kondisisosial}
          />
          {/* dropdown keamanan :  aman, tidak aman */}
          <DetailRadio
            label='Keamanan'
            section='5'
            radioItem={[{ name: "Aman" }, { name: "Tidak Aman" }]}
          />
          {/* ada 2 input, berapa x berapa  */}
          <Label>Luas Lahan</Label>
          <div className='d-flex flex-column px-0'>
            <div className='form-group d-flex flex-row align-items-center gap8'>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  name=''
                  id=''
                  placeholder='Panjang'
                  value={section5.luaslahan.split("x")[0]}
                  onChange={(e) => {
                    setValuePanjang(e.target.value);
                    dispatch(
                      setSection5({
                        ...section5,
                        luaslahan: e.target.value + "x" + valueLebar,
                      })
                    );
                  }}
                />
              </div>
              <span> x </span>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  name=''
                  id=''
                  placeholder='Lebar'
                  defaultValue={section5.luaslahan.split("x")[1]}
                  onChange={(e) => {
                    setValueLebar(e.target.value);
                    dispatch(
                      setSection5({
                        ...section5,
                        luaslahan: valuePanjang + "x" + e.target.value,
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div>
          {/* <div className='d-flex flex-row'>
            <div className='col-4'>
              <DetailInput
                label='Luas Lahan'
                section='5'
                value={section5.luaslahan}
              />
            </div>
            <div className='mx-2'>x</div>
            <div className='col-4'>
              <DetailInput label='Luas Lahan' section='5' />
            </div>
          </div> */}
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("4");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (
                  section5.ketinggiantowerpole ===
                    "Jarak dari permukiman 100 Meter (Max 600 meter)" ||
                  section5.kepemilikanlahan === "Lainnya" ||
                  section5.kondisilahan === "Lainnya"
                ) {
                  if (
                    section5.ketinggiantowerpole !==
                    "Jarak dari permukiman 100 Meter (Max 600 meter)"
                  ) {
                    dispatch(
                      setSection5({
                        ...section5,
                        kepemilikanlahan: valueKepemilikanLahan,
                        kondisilahan: valueKondisiLahan,
                      })
                    );
                  } else if (section5.kepemilikanlahan !== "Lainnya") {
                    dispatch(
                      setSection5({
                        ...section5,
                        ketinggiantowerpole: valueKetinggianTowerPole,
                        kondisilahan: valueKondisiLahan,
                      })
                    );
                  } else if (section5.kondisilahan !== "Lainnya") {
                    dispatch(
                      setSection5({
                        ...section5,
                        ketinggiantowerpole: valueKetinggianTowerPole,
                        kepemilikanlahan: valueKepemilikanLahan,
                      })
                    );
                  } else {
                    dispatch(
                      setSection5({
                        ...section5,
                        ketinggiantowerpole: valueKetinggianTowerPole,
                        kepemilikanlahan: valueKepemilikanLahan,
                        kondisilahan: valueKondisiLahan,
                      })
                    );
                  }
                }
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("6");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section6 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection6 = "section6";
  let localSection6 = JSON.parse(
    window.localStorage.getItem(strSection6.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section6 = useSelector((state) => state.FormSurveyStaff.section6);

  useEffect(() => {
    if (
      Object.values(section6).every((x) => x === "" || x === []) ||
      Object.values(section6).some((x) => x === "" || x === [])
    ) {
      dispatch(
        setSection6({
          kemampuanjarakradius5kmdarisite:
            lastData?.page6?.kemampuanjarakradius5kmdarisite ?? "",
          tipesinyalyangtersedia: lastData?.page6?.tipesinyalyangtersedia ?? "",
          levelsinyal4gjikaadajangkauan:
            lastData?.page6?.levelsinyal4gjikaadajangkauan.split(" ")[0] ?? "",
          levelsinyal4gjikaadajangkauaninput:
            lastData?.page6?.levelsinyal4gjikaadajangkauan.split(" ")[1] ?? "",
          calldisite: lastData?.page6?.calldisite ?? "",
          smsdisite: lastData?.page6?.smsdisite ?? "",
          namaoperator: lastData?.page6?.namaoperator ?? "",
        })
      );
    }
    // if (localSection6 !== null) {
    //   dispatch(setSection6(localSection6));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection6({
    //       kemampuanjarakradius5kmdarisite: "",
    //       tipesinyalyangtersedia: "",
    //       levelsinyal4gjikaadajangkauan: "",
    //       levelsinyal4gjikaadajangkauaninput: "",
    //       calldisite: "",
    //       smsdisite: "",
    //       namaoperator: [],
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection6.concat(kodeSurvey),
      JSON.stringify(section6)
    );
  };

  const [valueLevelSinyal4G, setValueLevelSinyal4G] = useState("");
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 6</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Coverage Seluler Di Site
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* radio : ada, tidak ada */}
          <DetailRadio
            label='Ketersediaan Coverage dalam Radius <2 km dari Site'
            section='6'
            radioItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
          />
          {/* dropdown : 2G, 3G, 4G */}
          <DetailDropdown
            label='Ketersediaan Sinyal'
            section='6'
            dropdownItem={[{ name: "2G" }, { name: "3G" }, { name: "4G" }]}
            value={section6.tipesinyalyangtersedia}
          />
          {/* radio : kuat, lemah */}
          {/* setelah pilih kuat/lemah ada input type number, dengan satuan DBm  */}
          <DetailDropdown
            label='Level Sinyal di HP (Jika ada Coverage)'
            section='6'
            value={section6.levelsinyal4gjikaadajangkauan}
            dropdownItem={[{ name: "Kuat" }, { name: "Lemah" }]}
          />
          {section6.levelsinyal4gjikaadajangkauan === "" ? (
            <></>
          ) : (
            <>
              <input
                type='number'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Level Sinyal di HP (Jika ada Coverage)'
                value={section6.levelsinyal4gjikaadajangkauaninput}
                onChange={(e) => {
                  setValueLevelSinyal4G(e.target.value);
                  dispatch(
                    setSection6({
                      ...section6,
                      levelsinyal4gjikaadajangkauaninput: e.target.value,
                    })
                  );
                }}
              />
              <span>DBm</span>
            </>
          )}
          {/* dropdown : mudah(5 kali test), lemah */}
          <DetailRadio
            label='Call di Site'
            section='6'
            radioItem={[{ name: "Mudah (5x test)" }, { name: "Lemah" }]}
          />
          {/* dropdown : mudah(5 kali test), lemah  */}
          <DetailRadio
            label='SMS di Site'
            section='6'
            radioItem={[{ name: "Mudah (5x test)" }, { name: "Lemah" }]}
          />
          {/* checkbox : telkomsel, xl, indosat, smartfren, h3i */}
          {/* <DetailCheckbox
            label='Nama Operator'
            section='6'
            name={["Telkomsel", "XL", "Indosat", "Smartfren", "H3I"]}
          /> */}
          <DetailInput
            label='Internet/Speed Test 4G'
            section='6'
            satuan='Mbps'
            type='number'
            // value={section8.kekuatankelistrikan}
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("5");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("7");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section7 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection7 = "section7";
  let localSection7 = JSON.parse(
    window.localStorage.getItem(strSection7.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section7 = useSelector((state) => state.FormSurveyStaff.section7);

  useEffect(() => {
    if (Object.values(section7).every((x) => x === "" || x === [])) {
      dispatch(
        setSection7({
          topografiumum: lastData?.page7?.topografiumum ?? "",
          deskripsiareajangkauan: lastData?.page7?.deskripsiareajangkauan ?? "",
          tipeproperty: lastData?.page7?.tipeproperty ?? "",
          statuslahan: lastData?.page7?.statuslahan ?? "",
          pengurusanimb: lastData?.page7?.pengurusanimb ?? "",
          landclassification: lastData?.page7?.landclassification ?? "",
          obyekpenghalang: lastData?.page7?.obyekpenghalang ?? "",
          kondisiperubahanlahan: lastData?.page7?.kondisiperubahanlahan ?? "",
          tipetanah: lastData?.page7?.tipetanah ?? "",
          dekatlautsungai: lastData?.page7?.dekatlautsungai ?? "",
          resikobencana: lastData?.page7?.resikobencana.split(" ")[0] ?? "",
          resikobencanainput:
            lastData?.page7?.resikobencana.split(" ")[1] ?? "",
          materialsetempat: lastData?.page7?.materialsetempat ?? "",
          resikorelokasi: lastData?.page7?.resikorelokasi ?? "",
          resikokeluhan: lastData?.page7?.resikokeluhan ?? "",
        })
      );
    }
    // if (localSection7 !== null) {
    //   dispatch(setSection7(localSection7));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection7({
    //       topografiumum: "",
    //       deskripsiareajangkauan: "",
    //       tipeproperty: "",
    //       statuslahan: "",
    //       pengurusanimb: "",
    //       landclassification: "",
    //       obyekpenghalang: "",
    //       kondisiperubahanlahan: "",
    //       tipetanah: "",
    //       dekatlautsungai: "",
    //       resikobencana: "",
    //       resikobencanainput: "",
    //       materialsetempat: "",
    //       resikorelokasi: "",
    //       resikokeluhan: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection7.concat(kodeSurvey),
      JSON.stringify(section7)
    );
  };

  const [valueTopografiUmum, setValueTopografiUmum] = useState("");
  const [valueObyekPenghalang, setValueObyekPenghalang] = useState("");
  const [valueTipeTanah, setValueTipeTanah] = useState("");
  const [valueRisikoBencana, setValueRisikoBencana] = useState("");
  const [valueMaterialSetempat, setValueMaterialSetempat] = useState("");

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 7</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Kondisi Lahan
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* dropdown : datar, penggunungan, beraspal, danau, titled, laut, berbukit, lainnya(input) */}
          <DetailDropdown
            label='Topografi Umum'
            section='7'
            dropdownItem={[
              { name: "Datar/Bergelombang" },
              { name: "Pegunungan" },
              { name: "Beraspal" },
              { name: "Danau" },
              { name: "Laut" },
              { name: "Berbukit" },
              { name: "Miring" }, // berapa derajat
              { name: "Lainnya" },
            ]}
            value={section7.topografiumum}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section7.topografiumum === "Datar/Bergelombang" ||
          section7.topografiumum === "Pegunungan" ||
          section7.topografiumum === "Beraspal" ||
          section7.topografiumum === "Danau" ||
          section7.topografiumum === "Laut" ||
          section7.topografiumum === "Berbukit" ||
          section7.topografiumum === "" ? (
            <></>
          ) : (
            <>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-50 mb-3'>
                <input
                  type='text'
                  // className='w-50 d-inline mr-3 '
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                  }}
                  placeholder='Derajat Kemiringan'
                  value={section7.topografiumuminput}
                  onChange={(e) => {
                    setValueTopografiUmum(e.target.value);
                    dispatch(
                      setSection7({
                        ...section7,
                        topografiumuminput: e.target.value,
                      })
                    );
                  }}
                />
                <span className='ml-auto font-weight-bold  mb-0'>Derajat</span>
              </div>
            </>
          )}
          {/* checkbox : pemerintahan, rumah sakit, pabrik, masjid, tempat perdagangan, perumahan, sekolah, lainnya(no input) */}
          <DetailCheckbox
            label='Keterangan Area Cakupan (Banyak Cakupan)'
            section='7'
            name={[
              "Pemerintahan",
              "Rumah Sakit",
              "Pabrik",
              "Masjid",
              "Komersial",
              "Perumahan",
              "Sekolah",
              "Lainnya",
            ]}
          />
          {/* dropdown : pemukiman, hibah, pemerintahan, perkantoran, pabrik, lainnya(no input), sekolah, status hibah */}
          <DetailDropdown
            label='Keterangan Lahan'
            section='7'
            dropdownItem={[
              { name: "Operator" },
              { name: "Pemukiman" },
              // { name: "Hibah",   },
              { name: "Pemerintahan" },
              { name: "Perkantoran" },
              { name: "Pabrik" },
              { name: "Lainnya" },
              { name: "Sekolah" },
              { name: "Status Hibah" },
            ]}
            value={section7.tipeproperty}
          />

          {/* dropdown : hibah, proses hibah, belum proses hibah, barang milik desa */}
          <DetailDropdown
            label='Status Lahan'
            section='7'
            dropdownItem={[
              { name: "Hibah" },
              { name: "Proses Hibah" },
              { name: "Belum Proses Hibah" },
              { name: "Barang Milik Desa" },
            ]}
            value={section7.statuslahan}
          />
          {/* dropdown : normal, izin khusus */}
          <DetailRadio
            label='Pengurusan IMB'
            section='7'
            radioItem={[{ name: "Normal" }, { name: "Izin Khusus" }]}
          />
          {/* dropdown : normal, berbatuan, berpasir, lumpur */}
          <DetailDropdown
            label='Klasifikasi Tanah'
            section='7'
            dropdownItem={[
              { name: "Normal" },
              { name: "Berbatuan" },
              { name: "Berpasir" },
              { name: "Berlumpur" },
            ]}
            value={section7.landclassification}
          />
          {/* dropdown : tidak ada, perkebunan dan perbukitan, gedung, lainnya (input)*/}
          <DetailDropdown
            label='Obyek Penghalang'
            section='7'
            dropdownItem={[
              { name: "Tidak Ada" },
              { name: "Perkebunan dan Perbukitan" },
              { name: "Bangunan" },
              { name: "Lainnya" },
            ]}
            value={section7.obyekpenghalang}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section7.obyekpenghalang === "Tidak Ada" ||
          section7.obyekpenghalang === "Perkebunan dan Perbukitan" ||
          section7.obyekpenghalang === "Bangunan" ||
          section7.obyekpenghalang === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Obyek Penghalang'
                value={
                  section7.obyekpenghalang === "Lainnya"
                    ? ""
                    : section7.obyekpenghalang
                }
                onChange={(e) => {
                  setValueObyekPenghalang(e.target.value);
                  dispatch(
                    setSection7({
                      ...section7,
                      obyekpenghalang: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown : pembersihan, striping, pemotongan/penambahan, penghancuran lahan */}
          <DetailDropdown
            label='Kebutuhan Pengkondisian Lahan'
            section='7'
            dropdownItem={[
              { name: "Clearing" },
              { name: "Stripping" },
              { name: "Cut/Fill" },
              { name: "Lainnya" },
            ]}
            // value={section7.kondisiperubahanlahan}
          />
          <DetailDropdown
            label='Tata Ruang'
            section='7'
            dropdownItem={[
              { name: "Bersih" },
              { name: "Galian" },
              { name: "Cut/Fill" },
              { name: "Dibongkar" },
            ]}
            value={section7.kondisiperubahanlahan}
          />
          {/* dropdown : tanah rawa, tanah sawah, tanah lembek, tanah normal, tanah keras, tanah berbatu, lainnya (input) */}
          <DetailDropdown
            label='Jenis Lahan'
            section='7'
            dropdownItem={[
              { name: "Tanah Rawa" },
              { name: "Tanah Padat" },
              { name: "Tanah Sawah" },
              // { name: "Tanah Lembek",   },
              { name: "Tanah Sedang" },
              { name: "Tanah Normal" },
              // { name: "Tanah Keras",   },
              { name: "Tanah Berbatu" },
              { name: "Lainnya" },
            ]}
            value={section7.tipetanah}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section7.tipetanah === "Tanah Rawa" ||
          section7.tipetanah === "Tanah Padat" ||
          section7.tipetanah === "Tanah Sawah" ||
          // section7.tipetanah === "Tanah Lembek" ||
          section7.tipetanah === "Tanah Sedang" ||
          section7.tipetanah === "Tanah Normal" ||
          // section7.tipetanah === "Tanah Keras" ||
          section7.tipetanah === "Tanah Berbatu" ||
          section7.tipetanah === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Jenis Lahan'
                value={
                  section7.tipetanah === "Lainnya" ? "" : section7.tipetanah
                }
                onChange={(e) => {
                  setValueTipeTanah(e.target.value);
                  dispatch(
                    setSection7({
                      ...section7,
                      tipetanah: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}

          {/* dropdown : dekat, jauh lebih dari 300m, lainnya (no input) */}
          <DetailDropdown
            label='Dekat Laut / Sungai'
            section='7'
            dropdownItem={[
              { name: "Dekat" },
              { name: "Jauh Lebih dari 300m" },
              { name: "Lainnya" },
            ]}
            value={section7.dekatlautsungai}
          />
          {/* dropdown : banjir, longsor, lainnya (input) */}
          <DetailDropdown
            label='Resiko Bencana'
            section='7'
            value={section7.resikobencana}
            dropdownItem={[
              { name: "Banjir" },
              { name: "Tanah Longsor" },
              { name: "Tidak Ada" },
              { name: "Lainnya" },
            ]}
          />
          {/* SSR NOTE : ada input > "Pernah terjadi banji tahun berapa?" */}
          {section7.resikobencana === "Banjir" && (
            <>
              <input
                type='number'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Ketinggian Banjir Terparah'
                value={section7.resikobencanainput}
                onChange={(e) => {
                  setValueRisikoBencana(e.target.value);
                  dispatch(
                    setSection7({
                      ...section7,
                      resikobencanainput: e.target.value,
                    })
                  );
                }}
              />
              <span>meter</span>
            </>
          )}
          {section7.resikobencana === "Lainnya" && (
            <>
              <input
                type='number'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Resiko Bencana Lainnya'
                value={section7.resikobencanainput}
                onChange={(e) => {
                  setValueRisikoBencana(e.target.value);
                  dispatch(
                    setSection7({
                      ...section7,
                      resikobencanainput: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown : batu, pasir, semen */}
          <DetailDropdown
            label='Sumber Daya Setempat (SDA/SDM)' // Sumber Daya Setempat(SDA/SDM)
            section='7'
            dropdownItem={[
              { name: "Batu" },
              { name: "Pasir" },
              { name: "SDM Lokal" },
              { name: "Semen" },
            ]}
            value={section7.materialsetempat}
          />
          {section7.materialsetempat === "Semen" && (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Sumber Daya Setempat (SDA/SDM)'
                onChange={(e) => {
                  setValueMaterialSetempat(e.target.value);
                }}
              />
            </>
          )}
          {/* dropdown : ya, tidak */}
          <DetailRadio
            label='Resiko Relokasi'
            section='7'
            radioItem={[{ name: "Ya" }, { name: "Tidak" }]}
          />

          <p className={`font-weight-normal text-info`}>
            (Jika ada tower opsel existing ataupun Plan)
          </p>

          {/* dropdown : ya, tidak */}
          <DetailRadio
            label='Resiko Komplain'
            section='7'
            radioItem={[{ name: "Ya" }, { name: "Tidak" }]}
          />
          <p className={`font-weight-normal text-info`}>
            (Jika ada isue Ijin Warga/Commcase)
          </p>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("6");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (
                  section7.topografiumum === "Lainnya" ||
                  section7.obyekpenghalang === "Lainnya" ||
                  section7.tipetanah === "Lainnya" ||
                  section7.resikobencana === "Lainnya" ||
                  // section7.resikobencana === "Banjir" ||
                  section7.materialsetempat === "Semen"
                ) {
                  if (section7.topografiumum !== "Lainnya") {
                    dispatch(
                      setSection7({
                        ...section7,
                        topografiumum: valueTopografiUmum,
                      })
                    );
                  }
                  if (section7.obyekpenghalang === "Lainnya") {
                    dispatch(
                      setSection7({
                        ...section7,
                        obyekpenghalang: valueObyekPenghalang,
                      })
                    );
                  }
                  if (section7.tipetanah === "Lainnya") {
                    dispatch(
                      setSection7({
                        ...section7,
                        tipetanah: valueTipeTanah,
                      })
                    );
                  }

                  // if (section7.resikobencana === "Lainnya") {
                  //   dispatch(
                  //     setSection7({
                  //       ...section7,
                  //       resikobencana: valueRisikoBencana,
                  //     })
                  //   );
                  // }

                  if (section7.materialsetempat === "Semen") {
                    dispatch(
                      setSection7({
                        ...section7,
                        materialsetempat: valueMaterialSetempat,
                      })
                    );
                  }
                }
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("8");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section8 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection8 = "section8";
  let localSection8 = JSON.parse(
    window.localStorage.getItem(strSection8.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section8 = useSelector((state) => state.FormSurveyStaff.section8);

  useEffect(() => {
    if (Object.values(section8).every((x) => x === "" || x === [])) {
      dispatch(
        setSection8({
          sumberdaya: lastData?.page8?.sumberdaya ?? "",
          kemampuankelistrikan: lastData?.page8?.kemampuankelistrikan ?? "",
          kekuatankelistrikan: lastData?.page8?.kekuatankelistrikan ?? "",
          jumlahjamketersediaanlistrik:
            lastData?.page8?.jumlahjamketersediaanlistrik ?? "",
          jarakdarisumberdayalistrik:
            lastData?.page8?.jarakdarisumberdayalistrik ?? "",
          generatorbackup: lastData?.page8?.generatorbackup.split(" ")[0] ?? "",
          brandgenerator: lastData?.page8?.generatorbackup.split(" ")[1] ?? "",
          inputkapasitas: lastData?.page8?.generatorbackup.split(" ")[2] ?? "",
          kemampuanbahanbensin: lastData?.page8?.kemampuanbahanbensin ?? "",
          tipebahanbakaryangtersedia:
            lastData?.page8?.tipebahanbakaryangtersedia ?? "",
          hargabbmdilokasi: lastData?.page8?.hargabbmdilokasi ?? "",
          listrikbisadigunakanuntukalat:
            lastData?.page8?.listrikbisadigunakanuntukalat ?? "",
        })
      );
    }
    // if (localSection8 !== null) {
    //   dispatch(setSection8(localSection8));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection8({
    //       sumberdaya: "",
    //       kemampuankelistrikan: "",
    //       kekuatankelistrikan: "",
    //       jumlahjamketersediaanlistrik: "",
    //       jarakdarisumberdayalistrik: "",
    //       generatorbackup: "",
    //       brandgenerator: "",
    //       inputkapasitas: "",
    //       kemampuanbahanbensin: "",
    //       tipebahanbakaryangtersedia: "",
    //       hargabbmdilokasi: "",
    //       listrikbisadigunakanuntukalat: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection8.concat(kodeSurvey),
      JSON.stringify(section8)
    );
  };

  const [valueSumberDaya, setValueSumberDaya] = useState("");
  const [
    valueJumlahJamKetersediaanListrik,
    setValueJumlahJamKetersediaanListrik,
  ] = useState("");
  const [valueGeneratorBackup, setValueGeneratorBackup] = useState("");
  const [valueDayaGeneratorBackup, setValueDayaGeneratorBackup] = useState("");

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 8</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Sarana Catuan Listrik Dan Pendukungnya{" "}
          {/* Sarana Catuan Listrik dan Pendukungnya */}
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* dropdown : PLN, genset, micro hydro, lainnya(input) */}
          {/* <DetailDropdown
            label="Pengelola Sumber Listrik"
            section="8"
            dropdownItem={[
              { name: "PLN",   },
              { name: "Pemda",   },
              { name: "Swadaya",   },
              { name: "Tidak Ada Sumber Lisrik",   },
            ]}
          /> */}
          <DetailDropdown
            label='Pengelola Sumber Listrik' // Jenis Sumber Listrik
            section='8'
            dropdownItem={[
              { name: "PLN" }, // tambahan
              { name: "PEMDA" },
              { name: "Swadaya" },
              { name: "Tidak Ada Sumber Listrik" },
            ]}
            // value={section8.sumberdaya}
          />
          <DetailDropdown
            label='Jenis Sumber Listrik' // Jenis Sumber Listrik
            section='8'
            dropdownItem={[
              { name: "PLN" }, // ga ada
              { name: "Genset" },
              { name: "Micro/Mini Hydro" },
              { name: "Grid Skala Besar" }, // tambahan
              { name: "Lainnya" },
            ]}
            value={section8.sumberdaya}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section8.sumberdaya === "PLN" ||
          section8.sumberdaya === "Genset" ||
          section8.sumberdaya === "Micro/Mini Hydro" ||
          section8.sumberdaya === "Grid Skala Besar" ||
          section8.sumberdaya === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Jenis Sumber Listrik'
                value={
                  section8.sumberdaya === "Lainnya" ? "" : section8.sumberdaya
                }
                onChange={(e) => {
                  setValueSumberDaya(e.target.value);
                  dispatch(
                    setSection8({
                      ...section8,
                      sumberdaya: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* PHASE LISTRIK */}
          {/* <DetailRadio
            label="Phase Listrik"
            section="8"
            radioItem={[{ name: "1" }, { name: "3" }]}
          /> */}
          {/* dengan satuan "watt" */}
          <DetailDropdown
            label='Phase Listrik' // Jenis Sumber Listrik
            section='8'
            dropdownItem={[{ name: "1" }, { name: "3" }]}
            // value={section8.jumlahjamketersediaanlistrik}
          />
          <DetailInput
            label='Kapasitas Sumber  Listrik '
            section='8'
            satuan='KVA' //KVA
            type='number'
            value={section8.kemampuankelistrikan}
          />
          {/* dengan satuan ℼ pie */}
          {/* <DetailInput
            label='Kekuatan Kelistrikan'
            section='8'
            satuan='π'
            type='number'
            value={section8.kekuatankelistrikan}
          /> */}
          {/*  SSR NOTE ADANYA INI LOH GIMANA SIH : JAM OPERASI SUMBER LISTRIK */}
          {/* <DetailInput
            label="Jam Operasi Sumber Listrik"
            section="8"
            satuan="jam"
            type="number"
          /> */}
          {/* radiobutton : 24 jam , kurang dari 24 jam   */}
          {/* kalau kurang dari 24 jam, ada input time picker (jam)  */}
          <DetailDropdown
            label='Jam Operasi Sumber Listrik' // Jenis Sumber Listrik
            section='8'
            dropdownItem={[{ name: "24 Jam" }, { name: "Kurang dari 24 Jam" }]}
            value={section8.jumlahjamketersediaanlistrik}
          />
          {/* <DetailRadio
            label='Jam Operasi Sumber Listrik'
            section='8'
            radioItem={[{ name: "24 Jam" }, { name: "Kurang dari 24 Jam" }]}
          /> */}
          {/* ########### show custom input for dropdown ############ */}
          {section8.jumlahjamketersediaanlistrik === "24 Jam" ||
          section8.jumlahjamketersediaanlistrik === "" ? (
            <></>
          ) : (
            <>
              <div className='d-flex flex-row w-100 gap16'>
                <DetailTimeRangePicker
                  section='8'
                  label='Mulai'
                  value={section8.jumlahjamketersediaanlistrikmulai}
                />
                <DetailTimeRangePicker
                  section='8'
                  label='Selesai'
                  value={section8.jumlahjamketersediaanlistrikselesai}
                />
              </div>
              {/* <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Jam Operasi Sumber Listrik'
                value={
                  section8.jumlahjamketersediaanlistrik === "Kurang dari 24 Jam"
                    ? ""
                    : section8.jumlahjamketersediaanlistrik
                }
                onChange={(e) => {
                  setValueJumlahJamKetersediaanListrik(e.target.value);
                  dispatch(
                    setSection8({
                      ...section8,
                      jumlahjamketersediaanlistrik: e.target.value,
                    })
                  );
                }}
              /> */}
            </>
          )}
          {/* satuan meter */}
          <DetailInput
            label='Jarak Perangkat ke Sumber Listrik Terdekat' // Jarak Perangkat ke Sumber Listrik Terdekat
            section='8'
            satuan='meter'
            value={section8.jarakdarisumberdayalistrik}
          />
          {/* radiobutton : ya, tidak */}
          <DetailRadio
            label='Listrik Bisa Dipakai Untuk Perangkat' // Listrik Bisa Dipakai untuk Perangkat
            section='8'
            radioItem={[{ name: "Ya" }, { name: "Tidak" }]}
          />
          <DetailRadio
            label='Kategori Grid*'
            message={`Sumber listrik dikategorikan STRONG GRID apabila memenuhi persyaratan berikut:`}
            message2={`1) Listrik dikelola oleh PLN  2) Jam Suplai Listrik 24 Jam 3) Kehandalan lebih dari 98% (dalam 1 bulan kurang dari 15 jam mati lampu)`}
            section='8'
            radioItem={[
              { name: "Strong Grid" },
              { name: "Poor Grid" },
              { name: "Off Grid" },
            ]}
          />
          {/* radiobutton : ada, tidak ada  */}
          {/* kalau ada, ditanya brand dan input kapasitas (liter)  */}
          {/* <DetailRadio
            label='Generator Backup'
            section='8'
            radioItem={[
              { name: "Ada",   },
              { name: "Tidak Ada",   },
            ]}
          /> */}
          {section8.generatorbackup === "Tidak Ada" ||
          section8.generatorbackup === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Brand Generator...'
                value={section8.brandgenerator}
                onChange={(e) => {
                  // setValueGeneratorBackup(e.target.value);
                  dispatch(
                    setSection8({
                      ...section8,
                      brandgenerator: e.target.value,
                    })
                  );
                }}
              />
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Input Kapasitas...'
                value={section8.inputkapasitas}
                onChange={(e) => {
                  // setValueDayaGeneratorBackup(e.target.value);
                  dispatch(
                    setSection8({
                      ...section8,
                      inputkapasitas: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* radiobutton : halus, tidak halus  */}
          <DetailRadio
            label='Pasokan BBM'
            section='8'
            radioItem={[{ name: "Mudah" }, { name: "Sulit" }]}
          />
          {/* radiobutton :bensin, solar  */}
          {/* SSR NOTE : GA ADA INI */}
          <DetailRadio
            label='Jenis BBM yang Sering Tersedia'
            section='8'
            radioItem={[{ name: "Bensin" }, { name: "Solar" }]}
          />
          {/* input satuan per liter  */}
          <DetailInput
            label='Harga BBM di Lokasi'
            section='8'
            satuan='/liter'
            type='number'
            value={section8.hargabbmdilokasi}
          />
          <DetailImage
            label='Posisi Objek Penghalang Terhadap  Modul Surya (Layout)'
            section='8'
          />
          <DetailRadio
            label='Bayangan Objek Menutupi Area Modul Surya'
            message='Area modul surya tidak boleh tertutup bayangan objek penghalang, jika tertutup bayangan maka objek penghalang harus dihilangkan atau area modul surya digeser'
            section='8'
            radioItem={[{ name: "Ya" }, { name: "Tidak" }]}
          />
          <DetailRadio
            label='Posisi Lintang Lokasi'
            section='8'
            radioItem={[{ name: "Lintang Utara" }, { name: "Lintang Selatan" }]}
          />
          <DetailRadio
            label='Orientasi Kemiringan Panel Surya Yang Optimal'
            message='Kemiringan modul surya menghadap equator, jika lokasi berada di Lintang Selatan maka orientasi modul surya ke arah Utara, demikian sebaliknya'
            section='8'
            radioItem={[{ name: "Utara" }, { name: "Selatan" }]}
          />
          {/* SSR NOTE : PENGARUH OBJEK PENGHALANG TERHADAP AREA MODUL SURYA */}
          {/* <DetailImage
            label="Posisi Objek Penghalang Terhadap Modul Surya (Layout)"
            section="8"
          />
          <DetailRadio
            label="Bayangan Objek Menutupi Area Modul Surya"
            sectiom="8"
            radioItem={[{ name: "Ya" }, { name: "Tidak" }]}
          />
          <DetailRadio
            label="Posisi Lintang Lokasi"
            sectiom="8"
            radioItem={[{ name: "Lintang Utara" }, { name: "Lintang Selatan" }]}
          />
          <DetailRadio
            label="Orientasi Kemiringan Panel Surya yang Optimal"
            sectiom="8"
            radioItem={[{ name: "Utara" }, { name: "Selatan" }]}
          /> */}
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("7");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (
                  section8.sumberdaya === "Lainnya" ||
                  section8.jumlahjamketersediaanlistrik === "Kurang dari 24 Jam"
                ) {
                  if (section8.sumberdaya !== "Lainnya") {
                    dispatch(
                      setSection8({
                        ...section8,
                        jumlahjamketersediaanlistrik:
                          valueJumlahJamKetersediaanListrik,
                        // generatorbackup: valueGeneratorBackup,
                      })
                    );
                  } else if (
                    section8.jumlahjamketersediaanlistrik !==
                    "Kurang dari 24 Jam"
                  ) {
                    dispatch(
                      setSection8({
                        ...section8,
                        sumberdaya: valueSumberDaya,
                        // generatorbackup: valueGeneratorBackup,
                      })
                    );
                  } else {
                    dispatch(
                      setSection8({
                        ...section8,
                        sumberdaya: valueSumberDaya,
                        jumlahjamketersediaanlistrik:
                          valueJumlahJamKetersediaanListrik,
                        // generatorbackup: valueGeneratorBackup,
                      })
                    );
                  }
                }
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("9");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section9 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection9 = "section9";
  let localSection9 = JSON.parse(
    window.localStorage.getItem(strSection9.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section9 = useSelector((state) => state.FormSurveyStaff.section9);

  useEffect(() => {
    if (Object.values(section9).every((x) => x === "" || x === [])) {
      dispatch(
        setSection9({
          suratkepimilikantanah: lastData?.page9?.suratkepimilikantanah ?? "",
          kebutuhanizin: lastData?.page9?.kebutuhanizin ?? "",
        })
      );
    }
    // if (localSection9 !== null) {
    //   dispatch(setSection9(localSection9));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection9({
    //       suratkepimilikantanah: "",
    //       kebutuhanizin: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection9.concat(kodeSurvey),
      JSON.stringify(section9)
    );
  };

  const [valuekebutuhanizin, setValuekebutuhanizin] = useState("");
  const [valuesuratkepimilikantanah, setValuesuratkepimilikantanah] =
    useState("");

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 9</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Perijinan
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* dropdown : sertifikasi, girik/persil, lainnya(input) */}
          <DetailDropdown
            label='Status Kepemilikan Surat Tanah' //Status Kepemilikan Surat Tanah
            section='9'
            dropdownItem={[
              { name: "Sertifikasi" },
              { name: "Girik/Persil" },
              {
                name: "Lainnya (Tanah Adat/Tanah Hibah/Belum Ada)",
              },
            ]}
            value={section9.suratkepimilikantanah}
          />
          {/* ########### show custom input for dropdown ############ */}
          {section9.suratkepimilikantanah === "Sertifikasi" ||
          section9.suratkepimilikantanah === "Girik/Persil" ||
          section9.suratkepimilikantanah === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Status Kepemilikan Surat Tanah'
                value={
                  section9.suratkepimilikantanah ===
                  "Lainnya (Tanah Adat/Tanah Hibah/Belum Ada)"
                    ? ""
                    : section9.suratkepimilikantanah
                }
                onChange={(e) => {
                  setValuesuratkepimilikantanah(e.target.value);
                  dispatch(
                    setSection9({
                      ...section9,
                      suratkepimilikantanah: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* dropdown : izin penduduk, izin prinsipal, lainnya(input) */}
          <DetailDropdown
            label='Ijin yang Dibutuhkan'
            section='9'
            dropdownItem={[
              { name: "Ijin Warga" },
              { name: "Ijin Prinsip" },
              { name: "Lainnya (TNI/Negara)" }, // kayanya gapake input
              { name: "Khusus (Lingkungan)" },
            ]}
            value={section9.kebutuhanizin}
          />
          {/* SSR NOTE : NEW  */}
          {/* <DetailRadio
            label="Ijin yang Dibutuhkan"
            section="9"
            radioItem={[
              { name: "KTP",   },
              { name: "Paspor",   },
              { name: "KTA",   }, 
            ]}
          /> */}
          {/* ########### show custom input for dropdown ############ */}
          {section9.kebutuhanizin === "Ijin Warga" ||
          section9.kebutuhanizin === "Ijin Prinsip" ||
          section9.kebutuhanizin === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Ijin yang Dibutuhkan'
                value={
                  section9.kebutuhanizin === "Lainnya (TNI/Negara)" ||
                  section9.kebutuhanizin === "Khusus (Lingkungan)"
                    ? ""
                    : section9.kebutuhanizin
                }
                onChange={(e) => {
                  setValuekebutuhanizin(e.target.value);
                  dispatch(
                    setSection9({
                      ...section9,
                      kebutuhanizin: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          <DetailDropdown
            label='ID Pemilik Lahan'
            section='9'
            dropdownItem={[
              { name: "KTP" },
              { name: "Passport" },
              { name: "KTA (TNI / State)" },
            ]}
            // value={section9.suratkepimilikantanah}
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("8");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (section9.tipetower === "Lainnya") {
                  dispatch(
                    setSection9({
                      ...section9,
                      kebutuhanizin: valuekebutuhanizin,
                    })
                  );
                }
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("10");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section10 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection10 = "section10";
  let localSection10 = JSON.parse(
    window.localStorage.getItem(strSection10.concat(kodeSurvey))
  );

  useEffect(() => {
    if (
      Object.values(section10).every((x) => x === "" || x === []) ||
      Object.values(section10).some((x) => x === "" || x === [])
    ) {
      dispatch(
        setSection10({
          populasiorangkk: lastData?.page10?.populasiorangkk ?? "",
          kepadatanpopulasi: lastData?.page10?.kepadatanpopulasi ?? "",
          distribusipopulasi: lastData?.page10?.distribusipopulasi ?? "",
          desaterdekat: lastData?.page10?.desaterdekat.split(" ")[0] ?? "",
          desaterdekatinput: lastData?.page10?.desaterdekat.split(" ")[1] ?? "",
          jarakdesaterdekat: lastData?.page10?.jarakdesaterdekat ?? "",
          livelihood: lastData?.page10?.livelihood ?? "",
          populasipenggunatelfongenggam:
            lastData?.page10?.populasipenggunatelfongenggam ?? "",
          tipepenggunatelfongenggam:
            lastData?.page10?.tipepenggunatelfongenggam ?? "",
          simcardyangtersedia: lastData?.page10?.simcardyangtersedia ?? "",
          pendudukyangbisadilatihuntukmenggunakanprodukjasa:
            lastData?.page10
              ?.pendudukyangbisadilatihuntukmenggunakanprodukjasa ?? "",
          rumahyangmempunyaigenerator:
            lastData?.page10?.rumahyangmempunyaigenerator ?? "",
          catatanlainnya: lastData?.page10?.catatanlainnya ?? "",
          aksesinternet: lastData?.page10?.aksesinternet.split(" ")[0] ?? "",
          aksesinternetinput:
            lastData?.page10?.aksesinternet.split(" ")[1] ?? "",
        })
      );
    }
    // if (localSection10 !== null) {
    //   dispatch(setSection10(localSection10));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection10({
    //       populasiorangkk: "",
    //       kepadatanpopulasi: "",
    //       distribusipopulasi: "",
    //       desaterdekat: "",
    //       desaterdekatinput: "",
    //       jarakdesaterdekat: "",
    //       livelihood: "",
    //       populasipenggunatelfongenggam: "",
    //       tipepenggunatelfongenggam: [],
    //       simcardyangtersedia: [],
    //       pendudukyangbisadilatihuntukmenggunakanprodukjasa: "",
    //       rumahyangmempunyaigenerator: "",
    //       catatanlainnya: "",
    //       aksesinternet: "",
    //       aksesinternetinput: "",
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection10.concat(kodeSurvey),
      JSON.stringify(section10)
    );
  };

  const dispatch = useDispatch();
  const section10 = useSelector((state) => state.FormSurveyStaff.section10);
  const [valueAksesInternet, setValueAksesInternet] = useState("");
  const [valueDesaTerdekat, setValueDesaTerdekat] = useState("");

  const [valueOrang, setValueOrang] = useState("");
  const [valueKK, setValueKK] = useState("");

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 10</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Informasi Demografi
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* ada 2 input : _______ orang / _________ kk  */}
          <div className='d-flex flex-column px-0'>
            <label className='px-0'>Populasi (Orang/KK) </label>
            <div className='form-group d-flex flex-row align-items-center gap8'>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  name=''
                  id=''
                  value={section10.populasiorangkk.split("x")[0]}
                  onChange={(e) => {
                    setValueOrang(e.target.value);
                    dispatch(
                      setSection10({
                        ...section10,
                        populasiorangkk: e.target.value + "x" + valueKK,
                      })
                    );
                  }}
                />
              </div>
              <span>Warga</span>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  name=''
                  id=''
                  value={section10.populasiorangkk.split("x")[1]}
                  onChange={(e) => {
                    setValueKK(e.target.value);
                    dispatch(
                      setSection10({
                        ...section10,
                        populasiorangkk: valueOrang + "x" + e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <span>KK</span>
            </div>
          </div>
          {/* <DetailInput
            label='Populasi (Orang/KK)'
            section='10'
            satuan='Orang'
            value={section10.populasiorangkk}
          />
          <DetailInput label='Populasi (Orang/KK)' section='10' satuan='KK' /> */}
          {/*_______ orang /km2  */}
          <DetailInput
            label='Kepadatan Penduduk'
            section='10'
            satuan='Orang/km2'
            type='number'
            value={section10.kepadatanpopulasi}
          />
          {/* dropdown : tersebar, relatif tersentralisasi, sentralisasi */}
          <DetailDropdown
            label='Distribusi Penduduk'
            section='10'
            dropdownItem={[
              { name: "Terpisah" },
              { name: "Cenderung Berkumpul" },
              // { name: "Sentralisasi",   },
              { name: "Lainnya" },
            ]}
            value={section10.distribusipopulasi}
          />
          {/* dropdown : ada, tidak ada */}
          {/* kalau ada : input type text  */}
          <DetailRadio
            label='Desa Terdekat'
            section='10'
            radioItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
          />
          {section10.desaterdekat === "Tidak Ada" ||
          section10.desaterdekat === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Nama Desa Terdekat'
                value={section10.desaterdekatinput}
                onChange={(e) => {
                  // setValueDesaTerdekat(e.target.value);
                  dispatch(
                    setSection10({
                      ...section10,
                      desaterdekatinput: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
          {/* input type number , staun "jam perjalanan " */}
          <DetailInput
            label='Jarak Desa Terdekat'
            section='10'
            type='number'
            satuan='menit'
            value={section10.jarakdesaterdekat}
            asterisk='Menggunakan transportasi motor/mobil'
          />
          <DetailInput
            label='Mata Pencaharian'
            section='10'
            satuan=''
            type='text'
            value={section10.livelihood}
          />{" "}
          {/*Mata pencaharian*/}
          {/* input type number : satuannya "penduduk"  */}
          <DetailInput
            label='Jumlah Pemilik Hp'
            section='10'
            type='number'
            satuan='Penduduk'
            value={section10.populasipenggunatelfongenggam}
          />
          {/* checkbox : 2G, 2G dan 4G, smartphone/tablet */}
          <DetailCheckbox
            label='Tipe Jenis Hp'
            section='10'
            name={["2G", "2G dan 4G", "Smartphone/Tablet"]}
          />
          {/* checkbox : telkomsel, indosat, xl, smartfren, h3i, lainnya ada input */}
          <DetailCheckbox
            label='Jenis Sim Card Operator'
            section='10'
            name={["Telkomsel", "Indosat", "XL", "Smartfren", "H3I", "Lainnya"]}
          />
          {/* radiobutton: ada, tidak ada  */}
          <DetailRadio
            label='Warga yang dapat dilatih tentang pengoperasian perangkat dasar / Training'
            section='10'
            radioItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
          />
          {/* input type number, satuan rumah  */}
          <DetailInput
            label='Rumah yang memiliki Genset / Solar Panel'
            section='10'
            satuan='rumah'
            type='number'
            value={section10.rumahyangmempunyaigenerator}
          />
          <DetailInput
            label='Catatan Lainnya'
            section='10'
            satuan=''
            type='text'
            value={section10.catatanlainnya}
          />
          {/* radiobutton : ada, tidak ada */}
          {/* kalau ada, ada input type text */}
          <DetailRadio
            label='Akses Internet Non Selular'
            section='10'
            radioItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
          />
          {section10.aksesinternet === "Tidak Ada" ||
          section10.aksesinternet === "" ? (
            <></>
          ) : (
            <>
              <input
                type='text'
                className='form-control w-50 d-inline mr-3 mb-3'
                placeholder='Akses Internet Non Selular'
                value={section10.aksesinternetinput}
                onChange={(e) => {
                  // setValueAksesInternet(e.target.value);
                  dispatch(
                    setSection10({
                      ...section10,
                      aksesinternetinput: e.target.value,
                    })
                  );
                }}
              />
            </>
          )}
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("9");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("11");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section11 = ({ lastData, setactiveTab }) => {
  // ========== URL FOTO DARI API
  let apiImageURL =
    url + lastData?.page11?.photosofthelandtobebuilded[0]?.path ?? "";

  // redux
  const dispatch = useDispatch();
  const section11 = useSelector((state) => state.FormSurveyStaff.section11);

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = () => {
    dispatch(setSection11({ ...section11, lat: geoLat }));
  };
  const toggleLongValue = () => {
    dispatch(setSection11({ ...section11, lon: geoLong }));
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  // ========== UBAH FOTO DARI PATH JADI BASE 64 REZISED
  const handleConvertImage = () => {
    urlToBase64(apiImageURL, function (myBase64) {
      if (section11?.foto === "") {
        dispatch(
          setSection11({
            ...section11,
            foto: myBase64.split(",")[1],
          })
        );
      } else if (section11?.foto !== myBase64) {
        dispatch(
          setSection11({
            ...section11,
            foto: section11?.foto,
          })
        );
      }
    });
  };

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    handleConvertImage();
    // ========== FETCH AWAL TAMPILIN DATA DI FORM
    if (Object.values(section11).every((x) => x === "" || x === [])) {
      dispatch(
        setSection11({
          ...section11,
          lat:
            lastData?.page11?.photosofthelandtobebuilded[0]?.device_lat ?? "",
          lon:
            lastData?.page11?.photosofthelandtobebuilded[0]?.device_lon ?? "",
          deskripsi:
            lastData?.page11?.photosofthelandtobebuilded[0]?.deskripsi ?? "",
        })
      );
    }
  }, []);

  // ========== Foto Preview Component
  const FotoPreview = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <img
          className={`mb-2 mt-0`}
          src={props.url}
          style={{ cursor: "pointer", width: "300px" }}
          alt='image'
          onClick={() => {
            toggleImage(props.url);
          }}
        />
      </>
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 11</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Foto Lahan Yang Akan Dibangun
        </CardTitle>
        {/* ========== TAMPILAN IMAGE DARI API  */}
        <FotoPreview
          className='col-8'
          // url={"data:image/jpeg;base64," + item.data.foto.foto}
          url={"data:image/jpeg;base64," + section11?.foto}
        />
        <DetailImage label='Upload Foto' section='11' />
        {/* ================================================================ BATAS LATITUDE LONGITUDE ===============  */}
        <div className={`d-flex flex-row align-items-end gap16`}>
          <DetailInput
            label='Latitude'
            section='11'
            type='number'
            value={section11.lat.replace(/(\.\d{5})\d+/g, "$1")}
            message={
              section11.lat < -90 || section11.lat > 90
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
            section='11'
            type='number'
            value={section11.lon.replace(/(\.\d{5})\d+/g, "$1")}
            message={
              section11.lon < -180 || section11.lon > 180
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
        <DetailInput
          label='Keterangan'
          section='11'
          value={section11.deskripsi}
          type='text'
        />
      </>
      <Col lg={12} className='px-0 py-2'>
        <div
          className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
        >
          <button
            className={`${style.pagingButtons}`}
            onClick={() => {
              setactiveTab("10");
            }}
          >{`< Prev`}</button>
          <button
            className={`${style.yesButton}`}
            onClick={() => {
              dispatch(setShowAlert(true));
              setTimeout(() => {
                dispatch(setShowAlert(false));
              }, 3000);
            }}
          >
            Simpan
          </button>{" "}
          <button
            className={`${style.pagingButtons}`}
            onClick={() => {
              setactiveTab("12");
            }}
          >{`Next >`}</button>
        </div>
      </Col>
    </CardBody>
  );
};

const Section12 = ({ lastData, setactiveTab }) => {
  // // location
  // const location = useLocation();
  // const kodeSurvey = location.state.datatable._id;
  // const kode = location.state.datatable.kode;

  // // == LOCAL STORAGE
  // let strSection12 = "editSection12";
  // let localSection12 = JSON.parse(window.localStorage.getItem(strSection12));

  // ========== URL FOTO DARI API
  let apiImageURL = url + lastData?.page12?.layoutsite?.path ?? "";

  // redux
  const dispatch = useDispatch();
  const section12 = useSelector((state) => state.FormSurveyStaff.section12);

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = () => {
    dispatch(
      setSection12({
        ...section12,
        layoutsite: {
          ...section12.layoutsite,
          lat: geoLat,
        },
      })
    );
  };
  const toggleLongValue = () => {
    dispatch(
      setSection12({
        ...section12,
        layoutsite: {
          ...section12.layoutsite,
          lon: geoLong,
        },
      })
    );
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  // ========== UBAH FOTO DARI PATH JADI BASE 64 REZISED
  const handleConvertImage = () => {
    urlToBase64(apiImageURL, function (myBase64) {
      if (section12?.layoutsite?.foto === "") {
        dispatch(
          setSection12({
            ...section12,
            layoutsite: {
              ...section12.layoutsite,
              foto: myBase64.split(",")[1],
            },
          })
        );
      } else if (section12?.layoutsite?.foto !== myBase64) {
        dispatch(
          setSection12({
            ...section12,
            layoutsite: {
              ...section12.layoutsite,
              foto: section12?.layoutsite?.foto,
            },
          })
        );
      }
    });
  };

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    handleConvertImage();
    // ========== FETCH AWAL TAMPILIN DATA DI FORM
    if (
      Object.values(section12).every((x) => x === "" || x === []) ||
      Object.values(section12).some((x) => x === "" || x === [])
    ) {
      dispatch(
        setSection12({
          layoutsite: {
            ...section12.layoutsite,
            lat: lastData?.page12?.layoutsite?.device_lat ?? "",
            lon: lastData?.page12?.layoutsite?.device_lon ?? "",
            deskripsi: lastData?.page12?.layoutsite?.deskripsi ?? "",
          },
          towerkesumberdaya: lastData?.page12?.towerkesumberdaya ?? "",
          towerkeantenavsat: lastData?.page12?.towerkeantenavsat ?? "",
          towerkesolarpanel: lastData?.page12?.towerkesolarpanel ?? "",
        })
      );
    }
    // if (localSection12 !== null) {
    //   dispatch(setSection12(localSection12));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    // }
  }, []);

  // const handleSimpanLocalStorage = async () => {
  //   await window.localStorage.setItem(strSection12, JSON.stringify(section12));
  // };

  // ========== Foto Component
  const FotoPreview = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <img
          className={`mb-2 mt-0`}
          src={props.url}
          style={{ cursor: "pointer", width: "300px" }}
          alt='image'
          onClick={() => {
            toggleImage(props.url);
          }}
        />
      </>
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 12</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Layout Site (Sesuai Penawaran Tender)
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              // url={"data:image/jpeg;base64," + item.data.foto.foto}
              url={"data:image/jpeg;base64," + section12?.layoutsite?.foto}
            />
            <DetailImage
              label='Upload Foto Layout Site (Sesuai Penawaran Tender)'
              section='12'
            />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude'
                section='12'
                type='number'
                value={section12.layoutsite.lat.replace(/(\.\d{5})\d+/g, "$1")}
                message={
                  section12.layoutsite.lat < -90 ||
                  section12.layoutsite.lat > 90
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
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude'
                section='12'
                type='number'
                value={section12.layoutsite.lon.replace(/(\.\d{5})\d+/g, "$1")}
                message={
                  section12.layoutsite.lon < -180 ||
                  section12.layoutsite.lon > 180
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
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Deskripsi'
              section='12'
              value={section12.layoutsite.deskripsi}
              type='text'
            />
          </div>
          <DetailInput
            label='Tower ke Source Power (if any)'
            section='12'
            satuan=''
            value={section12.towerkesumberdaya}
          />
          <DetailInput
            label='Tower ke Antenna VSAT'
            section='12'
            satuan=''
            value={section12.towerkeantenavsat}
          />
          <DetailInput
            label='Tower ke Solar Panel'
            section='12'
            satuan=''
            value={section12.towerkesolarpanel}
            asterisk='Gambarkan rencana tower/monopole/pole, indoor unit, antenna VSAT, Solar Panel, BTS dll'
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("11");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();
                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("13");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section13 = ({ lastData, setactiveTab }) => {
  // ========== URL FOTO DARI API
  let apiImageURL = {
    gambarlahan: url + lastData?.page13?.gambarlahan?.path ?? "",
    makinggps: url + lastData?.page13?.makinggps?.path ?? "",
    fotosisiutara: url + lastData?.page13?.fotosisiutara?.path ?? "",
    fotosisitimur: url + lastData?.page13?.fotosisitimur?.path ?? "",
    fotosisiselatan: url + lastData?.page13?.fotosisiselatan?.path ?? "",
    fotosisibarat: url + lastData?.page13?.fotosisibarat?.path ?? "",
  };

  // redux
  const dispatch = useDispatch();
  const section13 = useSelector((state) => state.FormSurveyStaff.section13);

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = (label) => {
    dispatch(
      setSection13({
        ...section13,
        [label]: {
          ...section13[label],
          lat: geoLat,
        },
      })
    );
  };

  const toggleLongValue = (label) => {
    dispatch(
      setSection13({
        ...section13,
        [label]: {
          ...section13[label],
          lon: geoLong,
        },
      })
    );
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const [tempGambarLahan, setTempGambarLahan] = useState("");
  const [tempMakingGps, setTempMakingGps] = useState("");
  const [tempUtara, setTempUtara] = useState("");
  const [tempTimur, setTempTimur] = useState("");
  const [tempSelatan, setTempSelatan] = useState("");
  const [tempBarat, setTempBarat] = useState("");

  // ========== UBAH FOTO DARI PATH JADI BASE 64 REZISED
  const handleConvertImage = (url, url2, url3, url4, url5, url6) => {
    if (url === apiImageURL?.gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section13?.gambarlahan?.foto === "") {
          setTempGambarLahan(myBase64.split(",")[1]);
        } else if (section13?.gambarlahan?.foto !== myBase64) {
          setTempGambarLahan(section13?.gambarlahan?.foto);
        }
      });
    }

    if (url2 === apiImageURL?.makinggps) {
      urlToBase64(url2, function (myBase64) {
        if (section13?.makinggps?.foto === "") {
          setTempMakingGps(myBase64.split(",")[1]);
        } else if (section13?.makinggps?.foto !== myBase64) {
          setTempMakingGps(section13?.makinggps?.foto);
        }
      });
    }

    if (url3 === apiImageURL?.fotosisiutara) {
      urlToBase64(url3, function (myBase64) {
        if (section13?.fotosisiutara?.foto === "") {
          setTempUtara(myBase64.split(",")[1]);
        } else if (section13?.fotosisiutara?.foto !== myBase64) {
          setTempUtara(section13?.fotosisiutara?.foto);
        }
      });
    }

    if (url4 === apiImageURL?.fotosisitimur) {
      urlToBase64(url4, function (myBase64) {
        if (section13?.fotosisitimur?.foto === "") {
          setTempTimur(myBase64.split(",")[1]);
        } else if (section13?.fotosisitimur?.foto !== myBase64) {
          setTempTimur(section13?.fotosisitimur?.foto);
        }
      });
    }

    if (url5 === apiImageURL?.fotosisiselatan) {
      urlToBase64(url5, function (myBase64) {
        if (section13?.fotosisiselatan?.foto === "") {
          setTempSelatan(myBase64.split(",")[1]);
        } else if (section13?.fotosisiselatan?.foto !== myBase64) {
          setTempSelatan(section13?.fotosisiselatan?.foto);
        }
      });
    }

    if (url6 === apiImageURL?.fotosisibarat) {
      urlToBase64(url6, function (myBase64) {
        if (section13?.fotosisibarat?.foto === "") {
          setTempBarat(myBase64.split(",")[1]);
        } else if (section13?.fotosisibarat?.foto !== myBase64) {
          setTempBarat(section13?.fotosisibarat?.foto);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(
      setSection13({
        ...section13,
        gambarlahan: {
          ...section13.gambarlahan,
          foto: tempGambarLahan,
        },
      })
    );
  }, [tempGambarLahan]);

  useEffect(() => {
    dispatch(
      setSection13({
        ...section13,
        makinggps: {
          ...section13.makinggps,
          foto: tempMakingGps,
        },
      })
    );
  }, [tempMakingGps]);

  useEffect(() => {
    dispatch(
      setSection13({
        ...section13,
        fotosisiutara: {
          ...section13.fotosisiutara,
          foto: tempUtara,
        },
      })
    );
  }, [tempUtara]);

  useEffect(() => {
    dispatch(
      setSection13({
        ...section13,
        fotosisitimur: {
          ...section13.fotosisitimur,
          foto: tempTimur,
        },
      })
    );
  }, [tempTimur]);

  useEffect(() => {
    dispatch(
      setSection13({
        ...section13,
        fotosisiselatan: {
          ...section13.fotosisiselatan,
          foto: tempSelatan,
        },
      })
    );
  }, [tempSelatan]);

  useEffect(() => {
    dispatch(
      setSection13({
        ...section13,
        fotosisibarat: {
          ...section13.fotosisibarat,
          foto: tempBarat,
        },
      })
    );
  }, [tempBarat]);

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    handleConvertImage(
      apiImageURL?.gambarlahan,
      apiImageURL?.makinggps,
      apiImageURL?.fotosisiutara,
      apiImageURL?.fotosisitimur,
      apiImageURL?.fotosisiselatan,
      apiImageURL?.fotosisibarat
    );

    // ========== FETCH AWAL TAMPILIN DATA DI FORM
    if (
      Object.values(section13.gambarlahan).every((x) => x === "" || x === []) ||
      Object.values(section13.makinggps).every((x) => x === "" || x === []) ||
      Object.values(section13.fotosisiutara).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section13.fotosisitimur).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section13.fotosisiselatan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section13.fotosisibarat).every((x) => x === "" || x === [])
    ) {
      dispatch(
        setSection13({
          gambarlahan: {
            ...section13.gambarlahan,
            lat: lastData?.page13?.gambarlahan?.device_lat ?? "",
            lon: lastData?.page13?.gambarlahan?.device_lon ?? "",
            deskripsi: lastData?.page13?.gambarlahan?.deskripsi ?? "",
          },
          makinggps: {
            ...section13.makinggps,
            lat: lastData?.page13?.makinggps?.device_lat ?? "",
            lon: lastData?.page13?.makinggps?.device_lon ?? "",
            deskripsi: lastData?.page13?.makinggps?.deskripsi ?? "",
          },
          fotosisiutara: {
            ...section13.fotosisiutara,
            lat: lastData?.page13?.fotosisiutara?.device_lat ?? "",
            lon: lastData?.page13?.fotosisiutara?.device_lon ?? "",
            deskripsi: lastData?.page13?.fotosisiutara?.deskripsi ?? "",
          },
          fotosisitimur: {
            ...section13.fotosisitimur,
            lat: lastData?.page13?.fotosisitimur?.device_lat ?? "",
            lon: lastData?.page13?.fotosisitimur?.device_lon ?? "",
            deskripsi: lastData?.page13?.fotosisitimur?.deskripsi ?? "",
          },
          fotosisiselatan: {
            ...section13.fotosisiselatan,
            lat: lastData?.page13?.fotosisiselatan?.device_lat ?? "",
            lon: lastData?.page13?.fotosisiselatan?.device_lon ?? "",
            deskripsi: lastData?.page13?.fotosisiselatan?.deskripsi ?? "",
          },
          fotosisibarat: {
            ...section13.fotosisibarat,
            lat: lastData?.page13?.fotosisibarat?.device_lat ?? "",
            lon: lastData?.page13?.fotosisibarat?.device_lon ?? "",
            deskripsi: lastData?.page13?.fotosisibarat?.deskripsi ?? "",
          },
        })
      );
    }
  }, []);

  // ========== Foto Component
  const FotoPreview = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <img
          className={`mb-2 mt-0`}
          src={props.url}
          style={{ cursor: "pointer", width: "300px" }}
          alt='image'
          onClick={() => {
            toggleImage(props.url);
          }}
        />
      </>
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 13</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Foto Kandidat Lahan
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              url={"data:image/jpeg;base64," + section13?.gambarlahan?.foto}
              // url={"data:image/jpeg;base64," + tempGambarLahan}
            />
            <DetailImage label='Lahan Kandidat' section='13' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Lahan Kandidat'
                section='13'
                type='number'
                value={section13.gambarlahan.lat.replace(/(\.\d{5})\d+/g, "$1")}
                message={
                  section13.gambarlahan.lat < -90 ||
                  section13.gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Lahan Kandidat'
                section='13'
                type='number'
                value={section13.gambarlahan.lon.replace(/(\.\d{5})\d+/g, "$1")}
                message={
                  section13.gambarlahan.lon < -180 ||
                  section13.gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Lahan Kandidat'
              section='13'
              type='text'
              value={section13.gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              url={"data:image/jpeg;base64," + section13?.makinggps?.foto}
              // url={"data:image/jpeg;base64," + tempMakingGps}
            />
            <DetailImage label='Marking GPS (Dalam Desimal)' section='13' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Marking GPS'
                section='13'
                type='number'
                value={section13.makinggps.lat.replace(/(\.\d{5})\d+/g, "$1")}
                message={
                  section13.makinggps.lat < -90 || section13.makinggps.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("makinggps");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Marking GPS'
                section='13'
                type='number'
                value={section13.makinggps.lon.replace(/(\.\d{5})\d+/g, "$1")}
                message={
                  section13.makinggps.lon < -180 ||
                  section13.makinggps.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("makinggps");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Marking GPS'
              section='13'
              type='text'
              value={section13.makinggps.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              url={"data:image/jpeg;base64," + section13?.fotosisiutara?.foto}
            />
            <DetailImage label='Foto Sisi Utara' section='13' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sisi Utara'
                section='13'
                type='number'
                value={section13.fotosisiutara.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisiutara.lat < -90 ||
                  section13.fotosisiutara.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("fotosisiutara");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sisi Utara'
                section='13'
                type='number'
                value={section13.fotosisiutara.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisiutara.lon < -180 ||
                  section13.fotosisiutara.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("fotosisiutara");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Foto Sisi Utara'
              section='13'
              type='text'
              value={section13.fotosisiutara.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              url={"data:image/jpeg;base64," + section13?.fotosisitimur?.foto}
            />
            <DetailImage label='Foto Sisi Timur' section='13' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sisi Timur'
                section='13'
                type='number'
                value={section13.fotosisitimur.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisitimur.lat < -90 ||
                  section13.fotosisitimur.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("fotosisitimur");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sisi Timur'
                section='13'
                type='number'
                value={section13.fotosisitimur.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisitimur.lon < -180 ||
                  section13.fotosisitimur.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("fotosisitimur");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Foto Sisi Timur'
              section='13'
              type='text'
              value={section13.fotosisitimur.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              url={"data:image/jpeg;base64," + section13?.fotosisiselatan?.foto}
            />
            <DetailImage label='Foto Sisi Selatan' section='13' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sisi Selatan'
                section='13'
                type='number'
                value={section13.fotosisiselatan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisiselatan.lat < -90 ||
                  section13.fotosisiselatan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("fotosisiselatan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sisi Selatan'
                section='13'
                type='number'
                value={section13.fotosisiselatan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisiselatan.lon < -180 ||
                  section13.fotosisiselatan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("fotosisiselatan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Foto Sisi Selatan'
              section='13'
              type='text'
              value={section13.fotosisiselatan.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* ========== TAMPILAN IMAGE DARI API  */}
            <FotoPreview
              className='col-8'
              url={"data:image/jpeg;base64," + section13?.fotosisibarat?.foto}
            />
            <DetailImage label='Foto Sisi Barat' section='13' />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sisi Barat'
                section='13'
                type='number'
                value={section13.fotosisibarat.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisibarat.lat < -90 ||
                  section13.fotosisibarat.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("fotosisibarat");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sisi Barat'
                section='13'
                type='number'
                value={section13.fotosisibarat.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section13.fotosisibarat.lon < -180 ||
                  section13.fotosisibarat.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("fotosisibarat");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Foto Sisi Barat'
              section='13'
              type='text'
              value={section13.fotosisibarat.deskripsi ?? ""}
            />
          </div>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("12");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("14");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section14 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();

  // == REDUX
  const dispatch = useDispatch();
  const section14 = useSelector((state) => state.FormSurveyStaff.section14);
  const [stateDerajat, setStateDerajat] = useState("");
  const [stateJarak, setStateJarak] = useState("");
  const [stateDeskripsi, setStateDeskripsi] = useState("");
  const [stateObstacleType, setStateObstacleType] = useState("");
  const [stateObstacleHeight, setStateObstacleHeight] = useState("");

  // == TEMPORARY ARRAY UNTUK DIDISPATCH KE REDUX STORE
  const [arrayTemp, setarrayTemp] = useState([]);
  useEffect(() => {
    console.log("check ini 1", lastData?.page14);
    console.log(
      "check ini 2",
      section14?.coverageandobstacleinformation !==
        lastData?.page14?.coverageandobstacleinformation
    );
    console.log(
      "check ini 3",
      Object.values(section14?.coverageandobstacleinformation[0]).every(
        (x) => x === "" || x === []
      )
    );

    if (
      lastData?.page14 &&
      // section14?.coverageandobstacleinformation?.length >= 1 &&
      section14?.coverageandobstacleinformation !==
        lastData?.page14?.coverageandobstacleinformation &&
      Object.values(section14?.coverageandobstacleinformation[0]).every(
        (x) => x === "" || x === []
      )
    ) {
      console.log("narik dari api");
      setarrayTemp(lastData?.page14?.coverageandobstacleinformation);
    } else if (
      Object.values(section14?.coverageandobstacleinformation[0]).every(
        (x) => x === "" || x === []
      )
    ) {
      console.log("narik dari object values");
      setarrayTemp([]);
    } else {
      console.log("narik dari redux");
      setarrayTemp(section14?.coverageandobstacleinformation);
    }

    // if (
    //   // lastData?.page14 &&
    //   section14?.coverageandobstacleinformation?.length > 1 &&
    //   section14?.coverageandobstacleinformation !==
    //     lastData?.page14?.coverageandobstacleinformation
    // ) {
    //   setarrayTemp(section14?.coverageandobstacleinformation);
    // } else if (
    //   lastData?.page14 &&
    //   section14?.coverageandobstacleinformation !==
    //     lastData?.page14?.coverageandobstacleinformation
    // ) {
    //   console.log("hoho");
    //   setarrayTemp(lastData?.page14?.coverageandobstacleinformation);
    // }
  }, []);

  const handleAddObstacle = () => {
    if (
      stateDerajat !== "" &&
      stateJarak !== "" &&
      stateDeskripsi !== "" &&
      stateObstacleType !== "" &&
      stateObstacleHeight !== ""
    ) {
      setarrayTemp([
        ...arrayTemp,
        {
          derajat: stateDerajat,
          jarak: stateJarak,
          deskripsi: stateDeskripsi,
          obstacletype: stateObstacleType,
          obstacleheight: stateObstacleHeight,
        },
      ]);
      setStateDeskripsi("");
      setStateJarak("");
      setStateDerajat("");
      setStateObstacleType("");
      setStateObstacleHeight("");
    }
  };

  const handleDeleteObstacle = (i) => {
    setarrayTemp(arrayTemp.filter((item) => item !== arrayTemp[i]));
  };

  const handleDispatchObstacle = async () => {
    if (arrayTemp == []) {
      await dispatch(
        setSection14({
          coverageandobstacleinformation: [
            {
              derajat: "",
              jarak: "",
              deskripsi: "",
              obstacletype: "",
              obstacleheight: "",
            },
          ],
        })
      );
    } else {
      await dispatch(
        setSection14({
          ...section14,
          coverageandobstacleinformation: arrayTemp,
        })
      );
    }
  };

  const derajatdropdownItem = [
    { name: "0°" },
    { name: "45°" },
    { name: "90°" },
    { name: "135°" },
    { name: "180°" },
    { name: "225°" },
    { name: "270°" },
    { name: "315°" },
  ];

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 14</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Informasi Coverage and Obstacle
        </CardTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <div className='form-group'>
              <label className='px-0'>Degree</label>
              {/* <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  placeholder='derajat'
                  value={stateDerajat}
                  onChange={(e) => {
                    setStateDerajat(e.target.value);
                  }}
                /> */}
              <select
                className={`form-control`}
                value={stateDerajat}
                onChange={(e) => {
                  setStateDerajat(e.target.value);
                }}
              >
                <option value=''>Pilih</option>
                {derajatdropdownItem.map((item, i) => {
                  return (
                    <option value={item.name} key={i}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <label className='px-0'>Distance</label>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  placeholder='Distance'
                  value={stateJarak}
                  onChange={(e) => {
                    setStateJarak(e.target.value);
                  }}
                />
                <span className='ml-auto font-weight-bold  mb-0'>meter</span>
              </div>
            </div>
            <div className='form-group'>
              <label className='px-0'>Description</label>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='text'
                  placeholder='Description'
                  value={stateDeskripsi}
                  onChange={(e) => {
                    setStateDeskripsi(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label className='px-0'>Obstacle Type</label>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='text'
                  placeholder='Obstacle Type'
                  value={stateObstacleType}
                  onChange={(e) => {
                    setStateObstacleType(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label className='px-0'>Obstacle Height</label>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  placeholder='Obstacle Height'
                  value={stateObstacleHeight}
                  onChange={(e) => {
                    setStateObstacleHeight(e.target.value);
                  }}
                />
                <span className='ml-auto font-weight-bold  mb-0'>meter</span>
              </div>
            </div>
          </div>

          <div className='mb-2'>
            <p className={`font-weight-normal text-info`}>
              1. Berikan tanda informasi coverage signal pada Peta (Kantor
              Pemda, Sekolah, Pasar dll ) dari Peta Coverage di sertakan radius
              coverage yang telah di jelaskan pada tabel di atas
            </p>
            <p className={`font-weight-normal text-info`}>
              2. Jika ada halangan sepeerti Pohon, Bukit atau hal lainI,
              Sertakan informasi ketinggian, Jarak halangan dari Tower
            </p>
            <p className={`font-weight-normal text-info`}>
              3. Sertakan foto Bar Signal pada jarak 0.5Km dan 2 Km setiap 30
              Derajat
            </p>
          </div>
          {/* <Card />s */}
          <Col lg={12} className='px-0 py-2'>
            <div
              className={`d-flex flex-row mx-auto justify-content-start align-items-center`}
            >
              <button
                type='submit'
                style={{
                  backgroundColor: "#406d96",
                  color: "white",
                  padding: "4px 8px",
                  fontSize: "16px",
                  lineHeight: "16px",
                  borderRadius: "200px",
                }}
                onClick={() => {
                  handleAddObstacle();
                }}
              >
                +
              </button>
              <span
                className='pl-1 '
                style={{ color: "#406d96", cursor: "pointer" }}
                onClick={() => {
                  handleAddObstacle();
                }}
              >
                Tambah Obstacle
              </span>
            </div>
          </Col>
        </form>

        {/* PRINT EXISTING INPUT */}

        {arrayTemp.map ? (
          arrayTemp.map((item, i) => {
            if (item.data) {
              item = item.data;
            }
            console.log("item di arraytemp section 14", item);

            return (
              <div
                style={{ border: "1px solid #ced4da" }}
                className='text-bold rounded px-4 py-2 my-3 text-bold'
                key={i}
              >
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <Label className='pt-2'>Obstacle {i + 1}</Label>
                  <span
                    style={{ color: "red" }}
                    onClick={() => handleDeleteObstacle(i)}
                  >
                    delete
                  </span>
                </div>
                <Card1 label='Degree' value={item.derajat ?? "-"} />
                <Card1 label='Distance' value={item.jarak ?? "-"} />
                <Card1 label='Description' value={item.deskripsi ?? "-"} />
                <Card1 label='Obstacle Type' value={item.obstacletype ?? "-"} />
                <Card1
                  label='Obstacle Height'
                  value={
                    item.obstacleheight ? item.obstacleheight + " meter" : "-"
                  }
                />
              </div>
            );
          })
        ) : (
          <></>
        )}

        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("13");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                handleDispatchObstacle();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("15");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section15 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection1505 = "section1505";
  let strSection155 = "section155";
  let localSection1505 = JSON.parse(
    window.localStorage.getItem(strSection1505.concat(kodeSurvey))
  );
  let localSection155 = JSON.parse(
    window.localStorage.getItem(strSection155.concat(kodeSurvey))
  );

  const dispatch = useDispatch();
  const section15 = useSelector((state) => state.FormSurveyStaff.section15);
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);
  const [stateSector05, setStateSector05] = useState("");
  const [stateJarak05, setStateJarak05] = useState("");
  const [stateLat05, setstateLat05] = useState("");
  const [stateLon05, setstateLon05] = useState("");
  const [stateKeteranganSector05, setstateKeteranganSector05] = useState("");
  const [stateSector5, setStateSector5] = useState("");
  const [stateJarak5, setStateJarak5] = useState("");
  const [stateLat5, setstateLat5] = useState("");
  const [stateLon5, setstateLon5] = useState("");
  const [stateKeteranganSector5, setstateKeteranganSector5] = useState("");

  const [arrayTemp05, setarrayTemp05] = useState([]);
  const [arrayTemp5, setarrayTemp5] = useState([]);

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();

  // ubah image menjadi base64
  const [stateGambarSector05, setstateGambarSector05] = useState("");
  const [stateGambarSector5, setstateGambarSector5] = useState("");

  // base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // base64 + compress
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        700,
        700,
        "JPEG",
        85,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = (label) => {
    if (label === "05") {
      setstateLat05(geoLat);
    } else if (label === "5") {
      setstateLat5(geoLat);
    }
  };

  const toggleLongValue = (label) => {
    if (label === "05") {
      setstateLon05(geoLong);
    } else if (label === "5") {
      setstateLon5(geoLong);
    }
  };

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    if (
      lastData?.page15 &&
      // section15?.photocapturegnettrack05km?.length > 1 &&
      section15?.photocapturegnettrack05km !==
        lastData?.page15?.photocapturegnettrack05km &&
      Object.values(section15?.photocapturegnettrack05km[0].data).some(
        (x) =>
          x === "" ||
          Object.values(
            section15?.photocapturegnettrack05km[0].data.foto
          ).every((x) => x === "")
      )
    ) {
      for (const i in lastData?.page15?.photocapturegnettrack05km) {
        urlToBase64(
          url + lastData?.page15?.photocapturegnettrack05km[i].data.foto.path,
          function (myBase64) {
            console.log(myBase64);
            setarrayTemp05((prev) => [
              ...prev,
              {
                data: {
                  sector:
                    lastData?.page15?.photocapturegnettrack05km[i].data.sector,
                  jarak:
                    lastData?.page15?.photocapturegnettrack05km[i].data.jarak,
                  foto: {
                    foto: myBase64.split(",")[1],
                    lat: lastData?.page15?.photocapturegnettrack05km[i].data
                      .foto.device_lat,
                    lon: lastData?.page15?.photocapturegnettrack05km[i].data
                      .foto.device_lon,
                    deskripsi:
                      lastData?.page15?.photocapturegnettrack05km[i].data.foto
                        .deskripsi,
                  },
                },
              },
            ]);
          }
        );
      }
    } else if (
      Object.values(section15.photocapturegnettrack05km[0].data).some(
        (x) =>
          x === "" ||
          Object.values(
            section15?.photocapturegnettrack05km[0].data.foto
          ).every((x) => x === "")
      )
    ) {
      setarrayTemp05([]);
    } else {
      setarrayTemp05(section15?.photocapturegnettrack05km);
    }

    if (
      lastData?.page15 &&
      // section15?.photocapturegnettrack5km?.length > 1 &&
      section15?.photocapturegnettrack5km !==
        lastData?.page15?.photocapturegnettrack5km &&
      Object.values(section15?.photocapturegnettrack5km[0].data).some(
        (x) =>
          x === "" ||
          Object.values(section15?.photocapturegnettrack5km[0].data.foto).every(
            (x) => x === ""
          )
      )
    ) {
      for (const i in lastData?.page15?.photocapturegnettrack5km) {
        urlToBase64(
          url + lastData?.page15?.photocapturegnettrack5km[i].data.foto.path,
          function (myBase64) {
            console.log(myBase64);
            setarrayTemp5((prev) => [
              ...prev,
              {
                data: {
                  sector:
                    lastData?.page15?.photocapturegnettrack5km[i].data.sector,
                  jarak:
                    lastData?.page15?.photocapturegnettrack5km[i].data.jarak,
                  foto: {
                    foto: myBase64.split(",")[1],
                    lat: lastData?.page15?.photocapturegnettrack5km[i].data.foto
                      .device_lat,
                    lon: lastData?.page15?.photocapturegnettrack5km[i].data.foto
                      .device_lon,
                    deskripsi:
                      lastData?.page15?.photocapturegnettrack5km[i].data.foto
                        .deskripsi,
                  },
                },
              },
            ]);
          }
        );
      }
    } else if (
      Object.values(section15.photocapturegnettrack5km[0].data).some(
        (x) =>
          x === "" ||
          Object.values(section15?.photocapturegnettrack5km[0].data.foto).every(
            (x) => x === ""
          )
      )
    ) {
      setarrayTemp5([]);
    } else {
      setarrayTemp5(section15?.photocapturegnettrack5km);
    }
  }, []);

  // upload file function
  const handleChange05 = async (e) => {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e?.target?.files[0]?.name.split(".").pop();
        if (
          fileExtension === "jpg" ||
          fileExtension === "png" ||
          fileExtension === "jpeg"
        ) {
          // setstateGambarSector05(e.target.files[0]);

          // base 64
          // const file = e.target.files[0];
          // const base64raw = await convertBase64(file);
          // const base64 = base64raw.split(",")[1];

          try {
            const file2 = e.target.files[0];
            const image = await resizeFile(file2);
            setstateGambarSector05(image.split(",")[1]);
          } catch (err) {
            console.log(err);
          }

          // setstateGambarSector05(base64);
          setErrorDocFormat("");
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg atau .png");
          setstateGambarSector05("");
        }
        break;
    }
  };

  const handleChange5 = async (e) => {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e?.target?.files[0]?.name.split(".").pop();
        if (
          fileExtension === "jpg" ||
          fileExtension === "png" ||
          fileExtension === "jpeg"
        ) {
          // setstateGambarSector5(e.target.files[0]);

          // base 64
          // const file = e.target.files[0];
          // const base64raw = await convertBase64(file);
          // const base64 = base64raw.split(",")[1];
          try {
            const file2 = e.target.files[0];
            const image = await resizeFile(file2);
            setstateGambarSector5(image.split(",")[1]);
          } catch (err) {
            console.log(err);
          }

          setErrorDocFormat("");
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg atau .png");
          setstateGambarSector5("");
        }
        break;
    }
  };

  const handleAddSector05 = () => {
    if (stateSector05 !== "" && stateJarak05 !== "") {
      setarrayTemp05([
        ...arrayTemp05,
        {
          data: {
            sector: stateSector05,
            jarak: stateJarak05,
            foto: {
              foto: stateGambarSector05,
              lat: stateLat05,
              lon: stateLon05,
              deskripsi: stateKeteranganSector05,
            },
          },
        },
      ]);
      setstateGambarSector05("");
      setstateKeteranganSector05("");
      setStateSector05("");
      setStateJarak05("");
      setstateLat05("");
      setstateLon05("");
    }
  };

  const handleAddSector5 = () => {
    if (stateSector5 !== "" && stateJarak5 !== "") {
      setarrayTemp5([
        ...arrayTemp5,
        {
          data: {
            sector: stateSector5,
            jarak: stateJarak5,
            foto: {
              foto: stateGambarSector5,
              lat: stateLat5,
              lon: stateLon5,
              deskripsi: stateKeteranganSector5,
            },
          },
        },
      ]);
      setstateGambarSector5("");
      setstateKeteranganSector5("");
      setStateSector5("");
      setStateJarak5("");
      setstateLat5("");
      setstateLon5("");
    }
  };

  const handleDeleteSector05 = (i) => {
    setarrayTemp05(arrayTemp05.filter((item) => item !== arrayTemp05[i]));
    window.localStorage.setItem(
      strSection1505.concat(kodeSurvey),
      JSON.stringify(arrayTemp05.filter((item) => item !== arrayTemp05[i]))
    );
  };

  const handleDeleteSector5 = (i) => {
    setarrayTemp5(arrayTemp5.filter((item) => item !== arrayTemp5[i]));
    window.localStorage.setItem(
      strSection155.concat(kodeSurvey),
      JSON.stringify(arrayTemp5.filter((item) => item !== arrayTemp5[i]))
    );
  };

  const handleDispatchObstacle = async () => {
    if (arrayTemp05 == []) {
      await dispatch(
        setSection15({
          ...section15,
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
        })
      );
    } else if (arrayTemp5 == []) {
      await dispatch(
        setSection15({
          ...section15,
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
    } else {
      await dispatch(
        setSection15({
          ...section15,
          photocapturegnettrack05km: arrayTemp05,
          photocapturegnettrack5km: arrayTemp5,
        })
      );
    }

    // await window.localStorage.setItem(
    //   strSection1505.concat(kodeSurvey),
    //   JSON.stringify(arrayTemp05)
    // );
    // await window.localStorage.setItem(
    //   strSection155.concat(kodeSurvey),
    //   JSON.stringify(arrayTemp5)
    // );
  };

  const Fotolokasi = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <span className='col-8 d-flex flex-column align-items-start'>
          <img
            src={props.url}
            style={{ cursor: "pointer", width: "300px" }}
            alt='image'
            onClick={() => {
              toggleImage(props.url);
            }}
          />
        </span>
      </>
    );
  };

  return (
    <>
      <span className={`${style.section}`}>Section 15</span>

      {/* ======================== START SECTOR 05 ======================== */}
      <Card>
        <CardBody className={`my-3 ${style.cardBodyNoScroll}`}>
          <form
            className='p-4 rounded mt-3'
            style={{ border: "1px solid #ced4da" }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <h5>Foto Foto Capture G-NETTRACK Jarak 0.5 KM</h5>
              <div className='form-group'>
                <label className='px-0'>Pilih Sector</label>

                <div>
                  <select
                    className='form-control d-flex flex-row justify-space-between align-items-center w-100'
                    value={stateSector05}
                    onChange={(e) => {
                      setStateSector05(e.target.value);
                    }}
                  >
                    <option value=''>Pilih Sector</option>
                    <option value='Sector 0°'>Sector 0°</option>
                    <option value='Sector 45°'>Sector 45°</option>
                    <option value='Sector 90°'>Sector 90°</option>
                    <option value='Sector 135°'>Sector 135°</option>
                    <option value='Sector 180°'>Sector 180°</option>
                    <option value='Sector 225°'>Sector 225°</option>
                    <option value='Sector 270°'>Sector 270°</option>
                    <option value='Sector 315°'>Sector 315°</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='px-0'>Jarak</label>
                <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                  <input
                    style={{ width: "95%", border: "none", outline: "none" }}
                    type='number'
                    placeholder='Jarak'
                    value={stateJarak05}
                    onChange={(e) => {
                      setStateJarak05(e.target.value);
                    }}
                  />
                  <span className='ml-auto font-weight-bold  mb-0'>Km</span>
                </div>
              </div>
              <div className='d-flex flex-column px-0'>
                <div className='form-group'>
                  <label className='col-4 px-0'>Upload Foto</label>
                  {/* ============ upload image ============ */}
                  <Label
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "11px",
                    }}
                  >
                    {errorDocFormat === "" ? "" : errorDocFormat}
                  </Label>
                  <input
                    type='file'
                    className='form-control'
                    name={"doc"}
                    onChange={(e) => {
                      if (e.target.files) {
                        handleChange05(e);
                      }
                    }}
                    className='form-control'
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      height: "43px",
                    }}
                    accept='image/*'
                  />
                </div>
              </div>
              <div className={`d-flex flex-row align-items-end gap16`}>
                <div className='form-group flex-grow-1'>
                  <label className='px-0'>Latitude</label>
                  <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                    <input
                      style={{ width: "40%", border: "none", outline: "none" }}
                      type='number'
                      placeholder='Latitude'
                      value={stateLat05.replace(/(\.\d{5})\d+/g, "$1")}
                      onChange={(e) => {
                        setstateLat05(e.target.value);
                      }}
                    />
                    {stateLat05 < -90 || stateLat05 > 90 ? (
                      <span style={{ color: "red", marginLeft: "auto" }}>
                        {" "}
                        Must be between -90 an 90!
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <button
                  className={`${style.buttonAutofill} px-2 py-1`}
                  onClick={() => {
                    toggleLatValue("05");
                  }}
                >
                  Get Latitude
                </button>
              </div>
              <div className={`d-flex flex-row align-items-end gap16`}>
                <div className='form-group flex-grow-1'>
                  <label className='px-0'>Longitude</label>
                  <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                    <input
                      style={{ width: "40%", border: "none", outline: "none" }}
                      type='number'
                      placeholder='Longitude'
                      value={stateLon05.replace(/(\.\d{5})\d+/g, "$1")}
                      onChange={(e) => {
                        setstateLon05(e.target.value);
                      }}
                    />

                    {stateLon05 < -180 || stateLon05 > 180 ? (
                      <span style={{ color: "red", marginLeft: "auto" }}>
                        {" "}
                        Must be between -180 an 180!
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <button
                  className={`${style.buttonAutofill} px-2 py-1`}
                  onClick={() => {
                    toggleLongValue("05");
                  }}
                >
                  Get Longitude
                </button>
              </div>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='text'
                  placeholder='Keterangan'
                  value={stateKeteranganSector05}
                  onChange={(e) => {
                    setstateKeteranganSector05(e.target.value);
                  }}
                />
              </div>
            </div>
            <Col lg={12} className='px-0 py-2'>
              <div
                className={`d-flex flex-row mx-auto justify-content-start align-items-center`}
              >
                <button
                  type='submit'
                  style={{
                    backgroundColor: "#406d96",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "16px",
                    lineHeight: "16px",
                    borderRadius: "200px",
                  }}
                  onClick={() => {
                    handleAddSector05();
                  }}
                >
                  +
                </button>
                <span
                  className='pl-1 '
                  style={{ color: "#406d96", cursor: "pointer" }}
                  onClick={() => {
                    handleAddSector05();
                  }}
                >
                  Tambah Sector
                </span>
              </div>
            </Col>
          </form>

          {arrayTemp05.length !== 0 &&
            arrayTemp05.map((item, i) => {
              return (
                <div
                  key={i}
                  style={{ border: "1px solid #ced4da" }}
                  className='text-bold rounded px-4 py-2 my-3 text-bold'
                >
                  <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Label className='pt-2'>{item.data.sector}</Label>
                    <span
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteSector05(i)}
                    >
                      delete
                    </span>
                  </div>
                  <Card1 label='Sector' value={item.data.sector} />
                  <Card1 label='Jarak' value={item.data.jarak} />
                  <div className='d-flex flex-row'>
                    <span className='col-4'>Foto</span>
                    <Fotolokasi
                      className='col-8'
                      // url={URL.createObjectURL(item.data.foto.foto)}
                      // url={"data:image/jpeg;base64," + fotonya}
                      url={"data:image/jpeg;base64," + item.data.foto.foto}
                    />
                  </div>
                  <Card1 label='Latitude' value={item.data.foto.lat} />
                  <Card1 label='Longitude' value={item.data.foto.lon} />
                  <Card1 label='Keterangan' value={item.data.foto.deskripsi} />
                </div>
              );
            })}
        </CardBody>
      </Card>
      {/* ======================== END OF SECTOR 05 ======================== */}

      {/* ======================== START SECTOR 5 ======================== */}
      <Card>
        <CardBody className={`my-3 ${style.cardBodyNoScroll}`}>
          <form
            className='p-4 rounded mt-3'
            style={{ border: "1px solid #ced4da" }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <h5>Foto Foto Capture G-NETTRACK Jarak 2 KM</h5>
              <div className='form-group'>
                <label className='px-0'>Pilih Sector</label>

                <div>
                  <select
                    className='form-control d-flex flex-row justify-space-between align-items-center w-100'
                    value={stateSector5}
                    onChange={(e) => {
                      setStateSector5(e.target.value);
                    }}
                  >
                    <option value=''>Pilih Sector</option>
                    <option value='Sector 0°'>Sector 0°</option>
                    <option value='Sector 45°'>Sector 45°</option>
                    <option value='Sector 90°'>Sector 90°</option>
                    <option value='Sector 135°'>Sector 135°</option>
                    <option value='Sector 180°'>Sector 180°</option>
                    <option value='Sector 225°'>Sector 225°</option>
                    <option value='Sector 270°'>Sector 270°</option>
                    <option value='Sector 315°'>Sector 315°</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='px-0'>Jarak</label>
                <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                  <input
                    style={{ width: "95%", border: "none", outline: "none" }}
                    type='number'
                    placeholder='Jarak'
                    value={stateJarak5}
                    onChange={(e) => {
                      setStateJarak5(e.target.value);
                    }}
                  />
                  <span className='ml-auto font-weight-bold  mb-0'>Km</span>
                </div>
              </div>
              <div className='d-flex flex-column px-0'>
                <div className='form-group'>
                  <label className='col-4 px-0'>Upload Foto</label>
                  {/* ============ upload image ============ */}
                  <Label
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "11px",
                    }}
                  >
                    {errorDocFormat === "" ? "" : errorDocFormat}
                  </Label>
                  <input
                    type='file'
                    className='form-control'
                    name={"doc"}
                    onChange={(e) => {
                      if (e.target.files) {
                        handleChange5(e);
                      }
                    }}
                    className='form-control'
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      height: "43px",
                    }}
                    accept='image/*'
                  />
                </div>
              </div>
              <div className={`d-flex flex-row align-items-end gap16`}>
                <div className='form-group flex-grow-1'>
                  <label className='px-0'>Latitude</label>
                  <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                    <input
                      style={{ width: "40%", border: "none", outline: "none" }}
                      type='number'
                      placeholder='Latitude'
                      value={stateLat5}
                      onChange={(e) => {
                        setstateLat5(e.target.value);
                      }}
                    />
                    {stateLat5 < -90 || stateLat5 > 90 ? (
                      <span style={{ color: "red", marginLeft: "auto" }}>
                        {" "}
                        Must be between -90 an 90!
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <button
                  className={`${style.buttonAutofill} px-2 py-1`}
                  onClick={() => {
                    toggleLatValue("5");
                  }}
                >
                  Get Latitude
                </button>
              </div>
              <div className={`d-flex flex-row align-items-end gap16`}>
                <div className='form-group flex-grow-1'>
                  <label className='px-0'>Longitude</label>
                  <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                    <input
                      style={{ width: "40%", border: "none", outline: "none" }}
                      type='number'
                      placeholder='Longitude'
                      value={stateLon5}
                      onChange={(e) => {
                        setstateLon5(e.target.value);
                      }}
                    />
                    {stateLon5 < -180 || stateLon5 > 180 ? (
                      <span style={{ color: "red", marginLeft: "auto" }}>
                        {" "}
                        Must be between -180 an 180!
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <button
                  className={`${style.buttonAutofill} px-2 py-1`}
                  onClick={() => {
                    toggleLongValue("5");
                  }}
                >
                  Get Longitude
                </button>
              </div>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='text'
                  placeholder='Keterangan'
                  value={stateKeteranganSector5}
                  onChange={(e) => {
                    setstateKeteranganSector5(e.target.value);
                  }}
                />
              </div>
            </div>
            <Col lg={12} className='px-0 py-2'>
              <div
                className={`d-flex flex-row mx-auto justify-content-start align-items-center`}
              >
                <button
                  type='submit'
                  style={{
                    backgroundColor: "#406d96",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "16px",
                    lineHeight: "16px",
                    borderRadius: "200px",
                  }}
                  onClick={() => {
                    handleAddSector5();
                  }}
                >
                  +
                </button>
                <span
                  className='pl-1 '
                  style={{ color: "#406d96", cursor: "pointer" }}
                  onClick={() => {
                    handleAddSector5();
                  }}
                >
                  Tambah Sector
                </span>
              </div>
            </Col>
          </form>

          {arrayTemp05.length !== 0 ? (
            arrayTemp5.map((item, i) => {
              return (
                <div
                  style={{ border: "1px solid #ced4da" }}
                  className='text-bold rounded px-4 py-2 my-3 text-bold'
                >
                  <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Label className='pt-2'>{item.data.sector}</Label>
                    <span
                      style={{ color: "red" }}
                      onClick={() => handleDeleteSector5(i)}
                    >
                      delete
                    </span>
                  </div>
                  <Card1 label='Sector' value={item.data.sector} />
                  <Card1 label='Jarak' value={item.data.jarak} />
                  <div className='d-flex flex-row'>
                    <span className='col-4'>Foto</span>
                    <Fotolokasi
                      className='col-8'
                      // url={URL.createObjectURL(item.data.foto.foto)}
                      url={"data:image/jpeg;base64," + item.data.foto.foto}
                    />
                  </div>
                  <Card1 label='Latitude' value={item.data.foto.lat} />
                  <Card1 label='Longitude' value={item.data.foto.lon} />
                  <Card1 label='Keterangan' value={item.data.foto.deskripsi} />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
      {/* ======================== END OF SECTOR 5 ======================== */}

      {arrayTemp05.length !== 0 &&
      arrayTemp5.length !== 0 &&
      stateSector05 === "" &&
      stateJarak05 === "" &&
      stateKeteranganSector05 === "" &&
      stateSector5 === "" &&
      stateJarak5 === "" &&
      stateKeteranganSector5 === "" &&
      stateGambarSector05 === "" &&
      stateGambarSector5 === "" ? (
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("14");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                handleDispatchObstacle();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("16");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      ) : (
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("14");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} disabled>
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("16");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      )}
    </>
  );
};

const Section16 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection16 = "section16";
  let localSection16 = JSON.parse(
    window.localStorage.getItem(strSection16.concat(kodeSurvey))
  );

  const dispatch = useDispatch();
  const section16 = useSelector((state) => state.FormSurveyStaff.section16);

  const [stateSector, setStateSector] = useState("");
  const [stateJarak, setStateJarak] = useState("");
  const [stateGambarSector, setstateGambarSector] = useState("");
  const [stateLat, setstateLat] = useState("");
  const [stateLon, setstateLon] = useState("");
  const [stateKeteranganSector, setstateKeteranganSector] = useState("");

  const [arrayTemp, setarrayTemp] = useState([]);

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = (label) => {
    setstateLat(geoLat);
  };

  const toggleLongValue = (label) => {
    setstateLon(geoLong);
  };

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    if (
      lastData?.page16 &&
      // section16.photocapturegnettrackroadroute.length > 1 &&
      section16.photocapturegnettrackroadroute !==
        lastData.page16.photocapturegnettrackroadroute &&
      Object.values(section16?.photocapturegnettrackroadroute[0].data).some(
        (x) =>
          x === "" ||
          Object.values(
            section16?.photocapturegnettrackroadroute[0].data.foto
          ).every((x) => x === "")
      )
    ) {
      console.log("section16 narik dari api");

      for (const i in lastData?.page16?.photocapturegnettrackroadroute) {
        urlToBase64(
          url +
            lastData?.page16?.photocapturegnettrackroadroute[i].data.foto.path,
          function (myBase64) {
            setarrayTemp((prev) => [
              ...prev,
              {
                data: {
                  sector:
                    lastData?.page16?.photocapturegnettrackroadroute[i].data
                      .sector,
                  jarak:
                    lastData?.page16?.photocapturegnettrackroadroute[i].data
                      .jarak,
                  foto: {
                    foto: myBase64.split(",")[1],
                    lat: lastData?.page16?.photocapturegnettrackroadroute[i]
                      .data.foto.device_lat,
                    lon: lastData?.page16?.photocapturegnettrackroadroute[i]
                      .data.foto.device_lon,
                    deskripsi:
                      lastData?.page16?.photocapturegnettrackroadroute[i].data
                        .foto.deskripsi,
                  },
                },
              },
            ]);
          }
        );
      }
    } else if (
      Object.values(section16.photocapturegnettrackroadroute[0].data).some(
        (x) =>
          x === "" ||
          Object.values(
            section16?.photocapturegnettrackroadroute[0].data.foto
          ).every((x) => x === "")
      )
    ) {
      console.log("section16 narik dari reset arraytemp");
      setarrayTemp([]);
    } else {
      console.log("section16 narik dari redux");
      setarrayTemp(section16?.photocapturegnettrackroadroute);
    }

    // if (localSection16 !== null) {
    //   dispatch(setSection16(localSection16));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection16({
    //       photocapturegnettrackroadroute: [
    //         {
    //           data: {
    //             sector: "",
    //             jarak: "",
    //             foto: {
    //               foto: "",
    //               lat: "",
    //               lon: "",
    //               deskripsi: "",
    //             },
    //           },
    //         },
    //       ],
    //     })
    //   );
    // }

    // if (localSection16 !== null) {
    //   setarrayTemp(
    //     JSON.parse(window.localStorage.getItem(strSection16.concat(kodeSurvey)))
    //   );
    // }
  }, []);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        700,
        700,
        "JPEG",
        85,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  // base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  // upload file function
  const handleChange = async (e) => {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e?.target?.files[0]?.name.split(".").pop();
        if (
          fileExtension === "jpg" ||
          fileExtension === "png" ||
          fileExtension === "jpeg"
        ) {
          // base 64
          // const file = e.target.files[0];
          // const base64 = await convertBase64(file);
          // setstateGambarSector(base64);
          try {
            const file2 = e.target.files[0];
            const image = await resizeFile(file2);
            setstateGambarSector(image.split(",")[1]);
          } catch (err) {
            console.log(err);
          }

          // setstateGambarSector(e.target.files[0]);
          setErrorDocFormat("");
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg atau .png");
          setstateGambarSector("");
        }
        break;
    }
  };

  const handleAddSector = () => {
    if (stateSector !== "" && stateJarak !== "") {
      setarrayTemp([
        ...arrayTemp,
        {
          data: {
            sector: stateSector,
            jarak: stateJarak,
            foto: {
              foto: stateGambarSector,
              lat: stateLat,
              lon: stateLon,
              deskripsi: stateKeteranganSector,
            },
          },
        },
      ]);
      setstateGambarSector("");
      setstateKeteranganSector("");
      setStateSector("");
      setStateJarak("");
      setstateLat("");
      setstateLon("");
    }
  };

  const handleDeleteSector = (i) => {
    setarrayTemp(arrayTemp.filter((item) => item !== arrayTemp[i]));
    window.localStorage.setItem(
      strSection16.concat(kodeSurvey),
      JSON.stringify(arrayTemp.filter((item) => item !== arrayTemp[i]))
    );
  };

  const Fotolokasi = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <span className='col-8 d-flex flex-column align-items-start'>
          <img
            src={props.url}
            style={{ cursor: "pointer", width: "300px" }}
            alt='image'
            onClick={() => {
              toggleImage(props.url);
            }}
          />
        </span>
      </>
    );
  };

  const handleDispatchObstacle = async () => {
    if (arrayTemp == []) {
      await dispatch(
        setSection16({
          ...section16,
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
    } else {
      await dispatch(
        setSection16({
          ...section16,
          photocapturegnettrackroadroute: arrayTemp,
        })
      );
    }

    // await window.localStorage.setItem(
    //   strSection16.concat(kodeSurvey),
    //   JSON.stringify(arrayTemp)
    // );
  };

  const handleSimpanLocalStorage = (data) => {};

  return (
    <CardBody>
      <>
        <span className={`${style.section}`}>Section 16</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Foto Capture G-NETTRACK Rute Jalan(+/- 2KM Dari Kandidat Site)
        </CardTitle>
        {/* ======================== START SECTOR 05 ======================== */}
        <form
          className='p-4 rounded mt-3'
          style={{ border: "1px solid #ced4da" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <div className='form-group'>
              <label className='px-0'>Pilih Sector</label>

              <div>
                <select
                  className='form-control d-flex flex-row justify-space-between align-items-center w-100'
                  value={stateSector}
                  onChange={(e) => {
                    setStateSector(e.target.value);
                  }}
                >
                  <option value=''>Pilih Sector</option>
                  <option value='Sector 0°'>Sector 0°</option>
                  <option value='Sector 45°'>Sector 45°</option>
                  <option value='Sector 90°'>Sector 90°</option>
                  <option value='Sector 135°'>Sector 135°</option>
                  <option value='Sector 180°'>Sector 180°</option>
                  <option value='Sector 225°'>Sector 225°</option>
                  <option value='Sector 270°'>Sector 270°</option>
                  <option value='Sector 315°'>Sector 315°</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <label className='px-0'>Jarak</label>
              <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                <input
                  style={{ width: "95%", border: "none", outline: "none" }}
                  type='number'
                  placeholder='Jarak'
                  value={stateJarak}
                  // value={section16.photocapturegnettrackroadroute[0].data.jarak}
                  onChange={(e) => {
                    setStateJarak(e.target.value);
                  }}
                />
                <span className='ml-auto font-weight-bold  mb-0'>meter</span>
              </div>
            </div>
            <div className='d-flex flex-column px-0'>
              <div className='form-group'>
                <label className='col-4 px-0'>Upload Foto</label>
                {/* ============ upload image ============ */}
                <Label
                  style={{
                    color: "red",
                    marginLeft: "15px",
                    fontSize: "11px",
                  }}
                >
                  {errorDocFormat === "" ? "" : errorDocFormat}
                </Label>
                <input
                  type='file'
                  className='form-control'
                  name={"doc"}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleChange(e);
                    }
                  }}
                  className='form-control'
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    height: "43px",
                  }}
                  accept='image/*'
                />
              </div>
            </div>{" "}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <div className='form-group flex-grow-1'>
                <label className='px-0'>Latitude</label>
                <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                  <input
                    style={{ width: "95%", border: "none", outline: "none" }}
                    type='number'
                    placeholder='Latitude'
                    value={stateLat.replace(/(\.\d{5})\d+/g, "$1")}
                    onChange={(e) => {
                      setstateLat(e.target.value);
                    }}
                  />{" "}
                  {stateLat < -90 || stateLat > 90 ? (
                    <span style={{ color: "red", marginLeft: "auto" }}>
                      {" "}
                      Must be between -90 an 90!
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("05");
                }}
              >
                Get Latitude
              </button>
            </div>{" "}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <div className='form-group flex-grow-1'>
                <label className='px-0'>Longitude</label>
                <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
                  <input
                    style={{ width: "95%", border: "none", outline: "none" }}
                    type='number'
                    placeholder='Longitude'
                    value={stateLon.replace(/(\.\d{5})\d+/g, "$1")}
                    onChange={(e) => {
                      setstateLon(e.target.value);
                    }}
                  />

                  {stateLon < -180 || stateLon > 180 ? (
                    <span style={{ color: "red", marginLeft: "auto" }}>
                      {" "}
                      Must be between -180 an 180!
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue();
                }}
              >
                Get Longitude
              </button>
            </div>
            <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
              <input
                style={{ width: "95%", border: "none", outline: "none" }}
                type='text'
                placeholder='Keterangan'
                value={stateKeteranganSector}
                onChange={(e) => {
                  setstateKeteranganSector(e.target.value);
                }}
              />
            </div>
          </div>
          <Col lg={12} className='px-0 py-2'>
            <div
              className={`d-flex flex-row mx-auto justify-content-start align-items-center`}
            >
              <button
                type='submit'
                style={{
                  backgroundColor: "#406d96",
                  color: "white",
                  padding: "4px 8px",
                  fontSize: "16px",
                  lineHeight: "16px",
                  borderRadius: "200px",
                }}
                onClick={() => {
                  handleAddSector();
                }}
              >
                +
              </button>
              <span
                className='pl-1 '
                style={{ color: "#406d96", cursor: "pointer" }}
                onClick={() => {
                  handleAddSector();
                }}
              >
                Tambah Sector
              </span>
            </div>
          </Col>
        </form>

        {arrayTemp.map ? (
          arrayTemp.map((item, i) => {
            return (
              <div
                style={{ border: "1px solid #ced4da" }}
                className='text-bold rounded px-4 py-2 my-3 text-bold'
              >
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <Label className='pt-2'>{item.data.sector}</Label>
                  <span
                    style={{ color: "red" }}
                    onClick={() => handleDeleteSector(i)}
                  >
                    delete
                  </span>
                </div>
                <Card1 label='Sector' value={item.data.sector} />
                <Card1 label='Jarak' value={item.data.jarak} />
                <div className='d-flex flex-row'>
                  <span className='col-4'>Foto</span>
                  <Fotolokasi
                    className='col-8'
                    // url={URL.createObjectURL(item.data.foto.foto)}
                    url={"data:image/jpeg;base64," + item.data.foto.foto}
                  />
                </div>
                <Card1 label='Latitude' value={item.data.foto.lat} />
                <Card1 label='Longitude' value={item.data.foto.lon} />
                <Card1 label='Keterangan' value={item.data.foto.deskripsi} />
              </div>
            );
          })
        ) : (
          <></>
        )}

        {/* ======================== END OF SECTOR 05 ======================== */}
        {arrayTemp.length !== 0 &&
        stateSector === "" &&
        stateJarak === "" &&
        stateGambarSector === "" &&
        stateKeteranganSector === "" ? (
          <Col lg={12} className='px-0 py-2'>
            <div
              className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
            >
              {" "}
              <button
                className={`${style.pagingButtons}`}
                onClick={() => {
                  setactiveTab("15");
                }}
              >{`< Prev`}</button>
              <button
                onClick={() => {
                  handleDispatchObstacle();

                  dispatch(setShowAlert(true));
                  setTimeout(() => {
                    dispatch(setShowAlert(false));
                  }, 3000);
                }}
                className={`${style.yesButton}`}
              >
                Simpan
              </button>
              <button
                className={`${style.pagingButtons}`}
                onClick={() => {
                  setactiveTab("17");
                }}
              >{`Next >`}</button>
            </div>
          </Col>
        ) : (
          <Col lg={12} className='px-0 py-2'>
            <div
              className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
            >
              {" "}
              <button
                className={`${style.pagingButtons}`}
                onClick={() => {
                  setactiveTab("15");
                }}
              >{`< Prev`}</button>
              <button disabled className={`${style.yesButton}`}>
                Simpan
              </button>{" "}
              <button
                className={`${style.pagingButtons}`}
                onClick={() => {
                  setactiveTab("17");
                }}
              >{`Next >`}</button>
            </div>
          </Col>
        )}
      </>
    </CardBody>
  );
};

const Section17 = ({ lastData, setactiveTab }) => {
  // ========== URL FOTO DARI API
  let apiImageURL = url + lastData?.page17?.locationmapping?.path ?? "";

  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection17 = "section17";
  let localSection17 = JSON.parse(
    window.localStorage.getItem(strSection17.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section17 = useSelector((state) => state.FormSurveyStaff.section17);
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = (label) => {
    dispatch(
      setSection17({
        ...section17,
        [label]: {
          ...section17[label],
          lat: geoLat,
        },
      })
    );
  };

  const toggleLongValue = (label) => {
    dispatch(
      setSection17({
        ...section17,
        [label]: {
          ...section17[label],
          lon: geoLong,
        },
      })
    );
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  // ========== UBAH FOTO DARI PATH JADI BASE 64 REZISED
  const handleConvertImage = () => {
    urlToBase64(apiImageURL, function (myBase64) {
      dispatch(
        setSection17({
          ...section17,
          locationmapping: {
            ...section17.locationmapping,
            foto: myBase64.split(",")[1],
          },
        })
      );
    });
  };

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    handleConvertImage();
    // ========== FETCH AWAL TAMPILIN DATA DI FORM
    dispatch(
      setSection17({
        locationmapping: {
          foto: "",
          lat: lastData?.page17?.locationmapping?.device_lat ?? "",
          lon: lastData?.page17?.locationmapping?.device_lon ?? "",
          deskripsi: lastData?.page17?.locationmapping?.deskripsi ?? "",
        },
        posisiyangditawarkan: {
          foto: "",
          lat: lastData?.page17?.posisiyangditawarkan?.lat ?? "",
          lon: lastData?.page17?.posisiyangditawarkan?.lon ?? "",
          elevasi: lastData?.page17?.posisiyangditawarkan?.elevasi ?? "",
        },
        kandidat1: {
          foto: "",
          lat: lastData?.page17?.kandidat1?.lat ?? "",
          lon: lastData?.page17?.kandidat1?.lon ?? "",
          elevasi: lastData?.page17?.kandidat1?.elevasi ?? "",
        },
        kandidat2: {
          foto: "",
          lat: lastData?.page17?.kandidat2?.lat ?? "",
          lon: lastData?.page17?.kandidat2?.lon ?? "",
          elevasi: lastData?.page17?.kandidat2?.elevasi ?? "",
        },
      })
    );

    // if (localSection17 !== null) {
    //   dispatch(setSection17(localSection17));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection17({
    //       locationmapping: {
    //         foto: "",
    //         lat: "",
    //         lon: "",
    //         deskripsi: "",
    //       },
    //       posisiyangditawarkan: {
    //         foto: "",
    //         lat: "",
    //         lon: "",
    //         elevasi: "",
    //       },
    //       kandidat1: {
    //         foto: "",
    //         lat: "",
    //         lon: "",
    //         elevasi: "",
    //       },
    //       kandidat2: {
    //         foto: "",
    //         lat: "",
    //         lon: "",
    //         elevasi: "",
    //       },
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = async () => {
    await window.localStorage.setItem(
      strSection17.concat(kodeSurvey),
      JSON.stringify(section17)
    );

    // window.localStorage.setItem(
    //   strSection17.concat(kodeSurvey),
    //   JSON.stringify({
    //     ...section17,
    //     locationmapping: {
    //       ...section17.locationmapping,
    //       deskripsi: kode + " : " + section2.namasite,
    //     },
    //   })
    // );
  };

  // ========== Foto Component
  const FotoPreview = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <img
          className={`mb-2 mt-0`}
          src={props.url}
          style={{ cursor: "pointer", width: "300px" }}
          alt='image'
          onClick={() => {
            toggleImage(props.url);
          }}
        />
      </>
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 17</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Location Mapping
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          {/* ========== TAMPILAN IMAGE DARI API  */}
          <FotoPreview
            className='col-8'
            // url={"data:image/jpeg;base64," + item.data.foto.foto}
            url={"data:image/jpeg;base64," + section17?.locationmapping?.foto}
          />
          <DetailImage label='Location Mapping' section='17' />
          {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Latitude'
              segment='Location Mapping'
              section='17'
              type='number'
              value={section17.locationmapping.lat.replace(
                /(\.\d{5})\d+/g,
                "$1"
              )}
              message={
                section17.locationmapping.lat < -90 ||
                section17.locationmapping.lat > 90
                  ? "Must be between -90 an 90!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLatValue("locationmapping");
              }}
            >
              Get Latitude
            </button>
          </div>
          {/* ======================================= BATAS LATITUDE  ===============  */}
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Longitude'
              segment='Location Mapping'
              section='17'
              value={section17.locationmapping.lon.replace(
                /(\.\d{5})\d+/g,
                "$1"
              )}
              message={
                section17.locationmapping.lon < -180 ||
                section17.locationmapping.lon > 180
                  ? "Must be between -180 an 180!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLongValue("locationmapping");
              }}
            >
              Get Longitude
            </button>
          </div>
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <DetailInput
            label='Keterangan Location Mapping'
            section='17'
            segment='Location Mapping'
            type='text'
            value={section17.locationmapping.deskripsi}
          />
          <p>Posisi Yang Diusulkan</p>
          {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Latitude'
              segment='Posisi Yang Diusulkan'
              section='17'
              type='number'
              value={section17.posisiyangditawarkan.lat.replace(
                /(\.\d{5})\d+/g,
                "$1"
              )}
              message={
                section17.posisiyangditawarkan.lat < -90 ||
                section17.posisiyangditawarkan.lat > 90
                  ? "Must be between -90 an 90!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLatValue("posisiyangditawarkan");
              }}
            >
              Get Latitude
            </button>
          </div>
          {/* ======================================= BATAS LATITUDE  ===============  */}
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Longitude'
              segment='Posisi Yang Diusulkan'
              section='17'
              type='number'
              value={section17.posisiyangditawarkan.lon.replace(
                /(\.\d{5})\d+/g,
                "$1"
              )}
              message={
                section17.posisiyangditawarkan.lon < -180 ||
                section17.posisiyangditawarkan.lon > 180
                  ? "Must be between -180 an 180!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLongValue("posisiyangditawarkan");
              }}
            >
              Get Longitude
            </button>
          </div>
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <DetailInput
            label='Elevasi'
            section='17'
            type='number'
            satuan='meter'
            segment='Posisi Yang Diusulkan'
            value={section17.posisiyangditawarkan.elevasi}
          />
          <p>Kandidat 1</p>

          {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Latitude'
              segment='Kandidat 1'
              section='17'
              type='number'
              value={section17.kandidat1.lat.replace(/(\.\d{5})\d+/g, "$1")}
              message={
                section17.kandidat1.lat < -90 || section17.kandidat1.lat > 90
                  ? "Must be between -90 an 90!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLatValue("kandidat1");
              }}
            >
              Get Latitude
            </button>
          </div>
          {/* ======================================= BATAS LATITUDE  ===============  */}
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Longitude'
              segment='Kandidat 1'
              section='17'
              type='number'
              value={section17.kandidat1.lon.replace(/(\.\d{5})\d+/g, "$1")}
              message={
                section17.kandidat1.lon < -180 || section17.kandidat1.lon > 180
                  ? "Must be between -180 an 180!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLongValue("kandidat1");
              }}
            >
              Get Longitude
            </button>
          </div>
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <DetailInput
            label='Elevasi'
            section='17'
            type='number'
            segment='Kandidat 1'
            value={section17.kandidat1.elevasi}
            satuan='meter'
          />
          <p>Kandidat 2</p>
          {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Latitude'
              segment='Kandidat 2'
              section='17'
              type='number'
              value={section17.kandidat2.lat.replace(/(\.\d{5})\d+/g, "$1")}
              message={
                section17.kandidat2.lat < -90 || section17.kandidat2.lat > 90
                  ? "Must be between -90 an 90!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLatValue("kandidat2");
              }}
            >
              Get Latitude
            </button>
          </div>
          {/* ======================================= BATAS LATITUDE  ===============  */}
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <div className={`d-flex flex-row align-items-end gap16`}>
            <DetailInput
              label='Longitude'
              segment='Kandidat 2'
              section='17'
              type='number'
              value={section17.kandidat2.lon.replace(/(\.\d{5})\d+/g, "$1")}
              message={
                section17.kandidat2.lon < -180 || section17.kandidat2.lon > 180
                  ? "Must be between -180 an 180!"
                  : ""
              }
              inputWidth='40%'
            />
            <button
              className={`${style.buttonAutofill} px-2 py-1`}
              onClick={() => {
                toggleLongValue("kandidat2");
              }}
            >
              Get Longitude
            </button>
          </div>
          {/* ======================================= BATAS LONGITUDE ===============  */}
          <DetailInput
            label='Elevasi'
            section='17'
            type='number'
            segment='Kandidat 2'
            value={section17.kandidat2.elevasi}
            satuan='meter'
          />
          {/* <LocationMapping label="Posisi yang Ditawarkan" />
          <LocationMapping label="Kandidat 1" />
          <LocationMapping label="Kandidat 2" /> */}

          <div className='mb-2'>
            <p className={`font-weight-normal text-info`}>
              KET. Gambarkan keadaan lokasi di peta termasuk didalamnya target
              area yang akan dicover, obstacle / penghalang, kondisi pasar, area
              perkantoran, letak jalan akses, nama pertokoan/kantor, masjid,
              sungai, pasar tradisional, gerbang gapura, garis GSB, terminal,
              sketsa kontur (jika daerah berbukit dan terletak di kemiringan),
              titik kordinat utama yang diusulkan dan kandidat titik kordinat
              usulan lainnya (3 kandidat), coverage plot dari planning tools
              beserta surrounding tower opsel.
            </p>
          </div>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("16");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("18");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section18 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection18 = "section18";
  let localSection18 = JSON.parse(
    window.localStorage.getItem(strSection18.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section18 = useSelector((state) => state.FormSurveyStaff.section18);

  useEffect(() => {
    if (
      Object.values(section18.sector0).every((x) => x === "" || x === []) ||
      Object.values(section18.sector45).every((x) => x === "" || x === []) ||
      Object.values(section18.sector90).every((x) => x === "" || x === []) ||
      Object.values(section18.sector135).every((x) => x === "" || x === []) ||
      Object.values(section18.sector180).every((x) => x === "" || x === []) ||
      Object.values(section18.sector225).every((x) => x === "" || x === []) ||
      Object.values(section18.sector270).every((x) => x === "" || x === []) ||
      Object.values(section18.sector315).every((x) => x === "" || x === [])
    ) {
      dispatch(
        setSection18({
          sector0: lastData?.page18?.sector0 ?? "",
          sector45: lastData?.page18?.sector45 ?? "",
          sector90: lastData?.page18?.sector90 ?? "",
          sector135: lastData?.page18?.sector135 ?? "",
          sector180: lastData?.page18?.sector180 ?? "",
          sector225: lastData?.page18?.sector225 ?? "",
          sector270: lastData?.page18?.sector270 ?? "",
          sector315: lastData?.page18?.sector315 ?? "",
        })
      );
    }

    // if (localSection18 !== null) {
    //   dispatch(setSection18(localSection18));
    // } else {
    //   // reset redux store ketika tidak ada local storage terdeteksi
    //   dispatch(
    //     setSection18({
    //       sector0: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector45: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector90: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector135: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector180: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector225: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector270: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //       sector315: {
    //         topografi: "",
    //         topografiIndex: "",
    //         landscape: "",
    //         landscapeIndex: "",
    //         demografi: "",
    //         demografiIndex: "",
    //       },
    //     })
    //   );
    // }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection18.concat(kodeSurvey),
      JSON.stringify(section18)
    );
  };
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 18</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Panoramic Area
        </CardTitle>
        <Label style={{ fontSize: "16px" }}>Sector 0°</Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='0'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='0'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='0'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 45°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            section='18'
            sector='45'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            section='18'
            sector='45'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            section='18'
            sector='45'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 90°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='90'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='90'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='90'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 135°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='135'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='135'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='135'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 180°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='180'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='180'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='180'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 225°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='225'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='225'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='225'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 270°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='270'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='270'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='270'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Label style={{ fontSize: "16px" }} className='mt-2'>
          Sector 315°
        </Label>
        <div className='text-bold border rounded p-4'>
          <DetailRadio
            label='Topografi'
            sector='315'
            section='18'
            satuan=''
            radioItem={[
              { name: "Datar" },
              { name: "Laut/Sungai" },
              { name: "Hutan" },
              { name: "Berbukit" },
            ]}
          />
          <DetailRadio
            label='Landscape'
            sector='315'
            section='18'
            satuan=''
            radioItem={[
              { name: "Pemukiman" },
              { name: "Perkantoran" },
              { name: "Industri" },
              { name: "Lainnya" },
            ]}
          />
          <DetailRadio
            label='Demografi'
            sector='315'
            section='18'
            satuan=''
            radioItem={[
              { name: "Padat" },
              { name: "Cukup Padat" },
              { name: "Kosong" },
              { name: "Lainnya" },
            ]}
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("17");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("19");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section19 = ({ lastData, setactiveTab }) => {
  // ========== URL FOTO DARI API
  let apiImageURL = {
    sector0gambarlahan: url + lastData?.page19?.sector0gambarlahan?.path ?? "",
    sector45gambarlahan:
      url + lastData?.page19?.sector45gambarlahan?.path ?? "",
    sector90gambarlahan:
      url + lastData?.page19?.sector90gambarlahan?.path ?? "",
    sector135gambarlahan:
      url + lastData?.page19?.sector135gambarlahan?.path ?? "",
    sector180gambarlahan:
      url + lastData?.page19?.sector180gambarlahan?.path ?? "",
    sector225gambarlahan:
      url + lastData?.page19?.sector225gambarlahan?.path ?? "",
    sector270gambarlahan:
      url + lastData?.page19?.sector270gambarlahan?.path ?? "",
    sector315gambarlahan:
      url + lastData?.page19?.sector315gambarlahan?.path ?? "",
  };

  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection19 = "section19";
  let localSection19 = JSON.parse(
    window.localStorage.getItem(strSection19.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section19 = useSelector((state) => state.FormSurveyStaff.section19);
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);

  const [valueTempatPengambilanFoto, setValueTempatPengambilanFoto] =
    useState("");

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = (label) => {
    dispatch(
      setSection19({
        ...section19,
        [label]: {
          ...section19[label],
          lat: geoLat,
        },
      })
    );
  };

  const toggleLongValue = (label) => {
    dispatch(
      setSection19({
        ...section19,
        [label]: {
          ...section19[label],
          lon: geoLong,
        },
      })
    );
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const [temp0, setTemp0] = useState("");
  const [temp45, setTemp45] = useState("");
  const [temp90, setTemp90] = useState("");
  const [temp135, setTemp135] = useState("");
  const [temp180, setTemp180] = useState("");
  const [temp225, setTemp225] = useState("");
  const [temp270, setTemp270] = useState("");
  const [temp315, setTemp315] = useState("");

  // ========== UBAH FOTO DARI PATH JADI BASE 64 REZISED
  const handleConvertImage = (
    url,
    url2,
    url3,
    url4,
    url5,
    url6,
    url7,
    url8
  ) => {
    if (url === apiImageURL?.sector0gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector0gambarlahan?.foto === "") {
          setTemp0(myBase64.split(",")[1]);
        } else if (section19?.sector0gambarlahan?.foto !== myBase64) {
          setTemp0(section19?.sector0gambarlahan?.foto);
        }
      });
    }

    if (url2 === apiImageURL?.sector45gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector45gambarlahan?.foto === "") {
          setTemp45(myBase64.split(",")[1]);
        } else if (section19?.sector45gambarlahan?.foto !== myBase64) {
          setTemp45(section19?.sector45gambarlahan?.foto);
        }
      });
    }

    if (url3 === apiImageURL?.sector90gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector90gambarlahan?.foto === "") {
          setTemp90(myBase64.split(",")[1]);
        } else if (section19?.sector90gambarlahan?.foto !== myBase64) {
          setTemp90(section19?.sector90gambarlahan?.foto);
        }
      });
    }

    if (url4 === apiImageURL?.sector135gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector135gambarlahan?.foto === "") {
          setTemp135(myBase64.split(",")[1]);
        } else if (section19?.sector135gambarlahan?.foto !== myBase64) {
          setTemp135(section19?.sector135gambarlahan?.foto);
        }
      });
    }

    if (url5 === apiImageURL?.sector180gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector180gambarlahan?.foto === "") {
          setTemp180(myBase64.split(",")[1]);
        } else if (section19?.sector180gambarlahan?.foto !== myBase64) {
          setTemp180(section19?.sector180gambarlahan?.foto);
        }
      });
    }

    if (url6 === apiImageURL?.sector225gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector225gambarlahan?.foto === "") {
          setTemp225(myBase64.split(",")[1]);
        } else if (section19?.sector225gambarlahan?.foto !== myBase64) {
          setTemp225(section19?.sector225gambarlahan?.foto);
        }
      });
    }

    if (url7 === apiImageURL?.sector270gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector270gambarlahan?.foto === "") {
          setTemp270(myBase64.split(",")[1]);
        } else if (section19?.sector270gambarlahan?.foto !== myBase64) {
          setTemp270(section19?.sector270gambarlahan?.foto);
        }
      });
    }

    if (url8 === apiImageURL?.sector315gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section19?.sector315gambarlahan?.foto === "") {
          setTemp315(myBase64.split(",")[1]);
        } else if (section19?.sector315gambarlahan?.foto !== myBase64) {
          setTemp315(section19?.sector315gambarlahan?.foto);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector0gambarlahan: {
          ...section19.sector0gambarlahan,
          foto: temp0,
        },
      })
    );
  }, [temp0]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector45gambarlahan: {
          ...section19.sector45gambarlahan,
          foto: temp45,
        },
      })
    );
  }, [temp45]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector90gambarlahan: {
          ...section19.sector90gambarlahan,
          foto: temp90,
        },
      })
    );
  }, [temp90]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector135gambarlahan: {
          ...section19.sector135gambarlahan,
          foto: temp135,
        },
      })
    );
  }, [temp135]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector180gambarlahan: {
          ...section19.sector180gambarlahan,
          foto: temp180,
        },
      })
    );
  }, [temp180]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector225gambarlahan: {
          ...section19.sector225gambarlahan,
          foto: temp225,
        },
      })
    );
  }, [temp225]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector270gambarlahan: {
          ...section19.sector270gambarlahan,
          foto: temp270,
        },
      })
    );
  }, [temp270]);

  useEffect(() => {
    dispatch(
      setSection19({
        ...section19,
        sector315gambarlahan: {
          ...section19.sector315gambarlahan,
          foto: temp315,
        },
      })
    );
  }, [temp315]);

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    handleConvertImage(
      apiImageURL?.sector0gambarlahan,
      apiImageURL?.sector45gambarlahan,
      apiImageURL?.sector90gambarlahan,
      apiImageURL?.sector135gambarlahan,
      apiImageURL?.sector180gambarlahan,
      apiImageURL?.sector225gambarlahan,
      apiImageURL?.sector270gambarlahan,
      apiImageURL?.sector315gambarlahan
    );

    // ========== FETCH AWAL TAMPILIN DATA DI FORM
    if (
      Object.values(section19.sector0gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector45gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector90gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector135gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector180gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector225gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector270gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section19.sector315gambarlahan).every(
        (x) => x === "" || x === []
      )
    ) {
      dispatch(
        setSection19({
          sector0gambarlahan: {
            ...section19.sector0gambarlahan,
            lat: lastData?.page19?.sector0gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector0gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector0gambarlahan.deskripsi ?? "",
          },
          sector45gambarlahan: {
            ...section19.sector45gambarlahan,
            lat: lastData?.page19?.sector45gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector45gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector45gambarlahan.deskripsi ?? "",
          },
          sector90gambarlahan: {
            ...section19.sector90gambarlahan,
            lat: lastData?.page19?.sector90gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector90gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector90gambarlahan.deskripsi ?? "",
          },
          sector135gambarlahan: {
            ...section19.sector135gambarlahan,
            lat: lastData?.page19?.sector135gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector135gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector135gambarlahan.deskripsi ?? "",
          },
          sector180gambarlahan: {
            ...section19.sector180gambarlahan,
            lat: lastData?.page19?.sector180gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector180gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector180gambarlahan.deskripsi ?? "",
          },
          sector225gambarlahan: {
            ...section19.sector225gambarlahan,
            lat: lastData?.page19?.sector225gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector225gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector225gambarlahan.deskripsi ?? "",
          },
          sector270gambarlahan: {
            ...section19.sector270gambarlahan,
            lat: lastData?.page19?.sector270gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector270gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector270gambarlahan.deskripsi ?? "",
          },
          sector315gambarlahan: {
            ...section19.sector315gambarlahan,
            lat: lastData?.page19?.sector315gambarlahan.device_lat ?? "",
            lon: lastData?.page19?.sector315gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page19?.sector315gambarlahan.deskripsi ?? "",
          },
          tempatpengambilanfoto: lastData?.page19?.tempatpengambilanfoto ?? "",
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = async () => {
    await window.localStorage.setItem(
      strSection19.concat(kodeSurvey),
      JSON.stringify(section19)
    );
  };

  // ========== Foto Component
  const FotoPreview = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <img
          className={`mb-2 mt-0`}
          src={props.url}
          style={{ cursor: "pointer", width: "300px" }}
          alt='image'
          onClick={() => {
            toggleImage(props.url);
          }}
        />
      </>
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 19</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto-Foto Panoramic Area
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2 '>
            <Label style={{ fontSize: "16px" }}>Sector 0°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," + section19?.sector0gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 0°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 0°'
                section='19'
                type='number'
                value={section19.sector0gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector0gambarlahan.lat < -90 ||
                  section19.sector0gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector0gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 0°'
                section='19'
                type='number'
                value={section19.sector0gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector0gambarlahan.lon < -180 ||
                  section19.sector0gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector0gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 0°'
              section='19'
              type='text'
              value={section19.sector0gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2 '>
            <Label style={{ fontSize: "16px" }}>Sector 45°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," + section19?.sector45gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 45°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 45°'
                section='19'
                type='number'
                value={section19.sector45gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector45gambarlahan.lat < -90 ||
                  section19.sector45gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector45gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 45°'
                section='19'
                type='number'
                value={section19.sector45gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector45gambarlahan.lon < -180 ||
                  section19.sector45gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector45gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 45°'
              section='19'
              type='text'
              value={section19.sector45gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2 '>
            <Label style={{ fontSize: "16px" }}>Sector 90°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," + section19?.sector90gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 90°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 90°'
                section='19'
                type='number'
                value={section19.sector90gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector90gambarlahan.lat < -90 ||
                  section19.sector90gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector90gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 90°'
                section='19'
                type='number'
                value={section19.sector90gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector90gambarlahan.lon < -180 ||
                  section19.sector90gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector90gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 90°'
              section='19'
              type='text'
              value={section19.sector90gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2'>
            <Label style={{ fontSize: "16px" }}>Sector 135°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section19?.sector135gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 135°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 135°'
                section='19'
                type='number'
                value={section19.sector135gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector135gambarlahan.lat < -90 ||
                  section19.sector135gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector135gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 135°'
                section='19'
                type='number'
                value={section19.sector135gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector135gambarlahan.lon < -180 ||
                  section19.sector135gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector135gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 135°'
              section='19'
              type='text'
              value={section19.sector135gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2'>
            <Label style={{ fontSize: "16px" }}>Sector 180°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section19?.sector180gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 180°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 180°'
                section='19'
                type='number'
                value={section19.sector180gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector180gambarlahan.lat < -90 ||
                  section19.sector180gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector180gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 180°'
                section='19'
                type='number'
                value={section19.sector180gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector180gambarlahan.lon < -180 ||
                  section19.sector180gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector180gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 180°'
              section='19'
              type='text'
              value={section19.sector180gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2'>
            <Label style={{ fontSize: "16px" }}>Sector 225°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section19?.sector225gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 225°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 225°'
                section='19'
                type='number'
                value={section19.sector225gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector225gambarlahan.lat < -90 ||
                  section19.sector225gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector225gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 225°'
                section='19'
                type='number'
                value={section19.sector225gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector225gambarlahan.lon < -180 ||
                  section19.sector225gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector225gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 225°'
              section='19'
              type='text'
              value={section19.sector225gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2'>
            <Label style={{ fontSize: "16px" }}>Sector 270°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section19?.sector270gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 270°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 270°'
                section='19'
                type='number'
                value={section19.sector270gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector270gambarlahan.lat < -90 ||
                  section19.sector270gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector270gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 270°'
                section='19'
                type='number'
                value={section19.sector270gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector270gambarlahan.lon < -180 ||
                  section19.sector270gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector270gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 270°'
              section='19'
              type='text'
              value={section19.sector270gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='d-flex flex-column text-bold border rounded p-4 mb-2'>
            <Label style={{ fontSize: "16px" }}>Sector 315°</Label>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section19?.sector315gambarlahan?.foto
              }
            />
            <DetailImage
              label='Gambar Lahan Sector 315°'
              section='19'
              satuan=''
            />

            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Sector 315°'
                section='19'
                type='number'
                value={section19.sector315gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector315gambarlahan.lat < -90 ||
                  section19.sector315gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("sector315gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Sector 315°'
                section='19'
                type='number'
                value={section19.sector315gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section19.sector315gambarlahan.lon < -180 ||
                  section19.sector315gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("sector315gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Gambar Lahan Sector 315°'
              section='19'
              type='text'
              value={section19.sector315gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            {/* <DetailDropdown
              label='Tempat Pengambilan Foto'
              section='2'
              value={section19.tempatpengambilanfoto}
              dropdownItem={[
                { name: "Pedesaan",   },
                { name: "Perbatasan dengan negara lain",   },
                { name: "Lapangan/Greenfield",   },
              ]}
            />
            <DetailDropdown
              label='Tempat Pengambilan Foto'
              section='19'
              value={section19.tempatpengambilanfoto}
            /> */}

            <DetailDropdown
              label='Tempat Pengambilan Foto'
              section='19'
              value={section19.tempatpengambilanfoto}
              dropdownItem={[
                { name: "Di Atas Tanah" },
                { name: "Pohon" },
                { name: "Lainnya" },
              ]}
            />

            {/* ########### show custom input for dropdown ############ */}
            {section19.tempatpengambilanfoto === "Di Atas Tanah" ||
            section19.tempatpengambilanfoto === "Pohon" ||
            section19.tempatpengambilanfoto === "" ? (
              <></>
            ) : (
              <>
                <input
                  type='text'
                  className='form-control w-50 d-inline mr-3 mb-3'
                  placeholder='Tipe Site'
                  value={
                    section19.tempatpengambilanfoto === "Lainnya"
                      ? ""
                      : section19.tempatpengambilanfoto
                  }
                  onChange={(e) => {
                    setValueTempatPengambilanFoto(e.target.value);
                    dispatch(
                      setSection19({
                        ...section19,
                        tempatpengambilanfoto: e.target.value,
                      })
                    );
                  }}
                />
              </>
            )}

            <div className='mb-2'>
              <p className={`font-weight-normal text-info`}>
                Lengkapi foto panorama dari titik penempatan Tower / Monopole
                sesuai dengan arahnya
              </p>
            </div>
          </div>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("18");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                if (section19.tempatpengambilanfoto === "Lainnya") {
                  dispatch(
                    setSection19({
                      ...section19,
                      tempatpengambilanfoto: valueTempatPengambilanFoto,
                    })
                  );
                }

                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("20");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section20 = ({ lastData, setactiveTab }) => {
  // ========== URL FOTO DARI API
  let apiImageURL = {
    aksessite1gambarlahan:
      url + lastData?.page20?.aksessite1gambarlahan?.path ?? "",
    aksessite2gambarlahan:
      url + lastData?.page20?.aksessite2gambarlahan?.path ?? "",
    aksessite3gambarlahan:
      url + lastData?.page20?.aksessite3gambarlahan?.path ?? "",
    aksessite4gambarlahan:
      url + lastData?.page20?.aksessite4gambarlahan?.path ?? "",
  };

  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection20 = "section20";
  let localSection20 = JSON.parse(
    window.localStorage.getItem(strSection20.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section20 = useSelector((state) => state.FormSurveyStaff.section20);

  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = (label) => {
    dispatch(
      setSection20({
        ...section20,
        [label]: {
          ...section20[label],
          lat: geoLat,
        },
      })
    );
  };

  const toggleLongValue = (label) => {
    dispatch(
      setSection20({
        ...section20,
        [label]: {
          ...section20[label],
          lon: geoLong,
        },
      })
    );
  };

  // ========== FUNCTION RESIZE FOTO + BASE64
  function urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");

  // ========== UBAH FOTO DARI PATH JADI BASE 64 REZISED
  const handleConvertImage = (url, url2, url3, url4) => {
    if (url === apiImageURL?.aksessite1gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section20?.aksessite1gambarlahan?.foto === "") {
          setTemp1(myBase64.split(",")[1]);
        } else if (section20?.aksessite1gambarlahan?.foto !== myBase64) {
          setTemp1(section20?.aksessite1gambarlahan?.foto);
        }
      });
    }

    if (url2 === apiImageURL?.aksessite2gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section20?.aksessite2gambarlahan?.foto === "") {
          setTemp2(myBase64.split(",")[1]);
        } else if (section20?.aksessite2gambarlahan?.foto !== myBase64) {
          setTemp2(section20?.aksessite2gambarlahan?.foto);
        }
      });
    }

    if (url3 === apiImageURL?.aksessite3gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section20?.aksessite3gambarlahan?.foto === "") {
          setTemp3(myBase64.split(",")[1]);
        } else if (section20?.aksessite3gambarlahan?.foto !== myBase64) {
          setTemp3(section20?.aksessite3gambarlahan?.foto);
        }
      });
    }

    if (url4 === apiImageURL?.aksessite4gambarlahan) {
      urlToBase64(url, function (myBase64) {
        if (section20?.aksessite4gambarlahan?.foto === "") {
          setTemp4(myBase64.split(",")[1]);
        } else if (section20?.aksessite4gambarlahan?.foto !== myBase64) {
          setTemp4(section20?.aksessite4gambarlahan?.foto);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(
      setSection20({
        ...section20,
        aksessite1gambarlahan: {
          ...section20.aksessite1gambarlahan,
          foto: temp1,
        },
      })
    );
  }, [temp1]);
  useEffect(() => {
    dispatch(
      setSection20({
        ...section20,
        aksessite2gambarlahan: {
          ...section20.aksessite2gambarlahan,
          foto: temp2,
        },
      })
    );
  }, [temp2]);
  useEffect(() => {
    dispatch(
      setSection20({
        ...section20,
        aksessite3gambarlahan: {
          ...section20.aksessite3gambarlahan,
          foto: temp3,
        },
      })
    );
  }, [temp3]);
  useEffect(() => {
    dispatch(
      setSection20({
        ...section20,
        aksessite4gambarlahan: {
          ...section20.aksessite4gambarlahan,
          foto: temp4,
        },
      })
    );
  }, [temp4]);

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });

    handleConvertImage(
      apiImageURL?.aksessite1gambarlahan,
      apiImageURL?.aksessite2gambarlahan,
      apiImageURL?.aksessite3gambarlahan,
      apiImageURL?.aksessite4gambarlahan
    );

    if (
      Object.values(section20.aksessite1gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section20.aksessite2gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section20.aksessite3gambarlahan).every(
        (x) => x === "" || x === []
      ) ||
      Object.values(section20.aksessite4gambarlahan).every(
        (x) => x === "" || x === []
      )
    ) {
      dispatch(
        setSection20({
          aksessite1gambarlahan: {
            ...section20.aksessite1gambarlahan,
            lat: lastData?.page20?.aksessite1gambarlahan.device_lat ?? "",
            lon: lastData?.page20?.aksessite1gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page20?.aksessite1gambarlahan.deskripsi ?? "",
          },
          aksessite2gambarlahan: {
            ...section20.aksessite2gambarlahan,
            lat: lastData?.page20?.aksessite2gambarlahan.device_lat ?? "",
            lon: lastData?.page20?.aksessite2gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page20?.aksessite2gambarlahan.deskripsi ?? "",
          },
          aksessite3gambarlahan: {
            ...section20.aksessite3gambarlahan,
            lat: lastData?.page20?.aksessite3gambarlahan.device_lat ?? "",
            lon: lastData?.page20?.aksessite3gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page20?.aksessite3gambarlahan.deskripsi ?? "",
          },
          aksessite4gambarlahan: {
            ...section20.aksessite4gambarlahan,
            lat: lastData?.page20?.aksessite4gambarlahan.device_lat ?? "",
            lon: lastData?.page20?.aksessite4gambarlahan.device_lon ?? "",
            deskripsi: lastData?.page20?.aksessite4gambarlahan.deskripsi ?? "",
          },
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = async () => {
    await window.localStorage.setItem(
      strSection20.concat(kodeSurvey),
      JSON.stringify(section20)
    );
  };

  // ========== Foto Component
  const FotoPreview = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <img
          className={`mb-2 mt-0`}
          src={props.url}
          style={{ cursor: "pointer", width: "300px" }}
          alt='image'
          onClick={() => {
            toggleImage(props.url);
          }}
        />
      </>
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 20</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto-Foto Akses ke Site
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <div className='text-bold border rounded p-4 mb-2'>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section20?.aksessite1gambarlahan?.foto
              }
            />
            <DetailImage label='Akses Site 1' section='20' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Site 1'
                section='20'
                type='number'
                value={section20.aksessite1gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite1gambarlahan.lat < -90 ||
                  section20.aksessite1gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("aksessite1gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Site 1'
                section='20'
                value={section20.aksessite1gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite1gambarlahan.lon < -180 ||
                  section20.aksessite1gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("aksessite1gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Akses Site 1'
              section='20'
              type='text'
              value={section20.aksessite1gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section20?.aksessite2gambarlahan?.foto
              }
            />
            <DetailImage label='Akses Site 2' section='20' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Site 2'
                section='20'
                type='number'
                value={section20.aksessite2gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite2gambarlahan.lat < -90 ||
                  section20.aksessite2gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("aksessite2gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Site 2'
                section='20'
                value={section20.aksessite2gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite2gambarlahan.lon < -180 ||
                  section20.aksessite2gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("aksessite2gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Akses Site 2'
              section='20'
              type='text'
              value={section20.aksessite2gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section20?.aksessite3gambarlahan?.foto
              }
            />
            <DetailImage label='Akses Site 3' section='20' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Site 3'
                section='20'
                type='number'
                value={section20.aksessite3gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite3gambarlahan.lat < -90 ||
                  section20.aksessite3gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("aksessite3gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Site 3'
                section='20'
                value={section20.aksessite3gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite3gambarlahan.lon < -180 ||
                  section20.aksessite3gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("aksessite3gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Akses Site 3'
              section='20'
              type='text'
              value={section20.aksessite3gambarlahan.deskripsi ?? ""}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <FotoPreview
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                section20?.aksessite4gambarlahan?.foto
              }
            />
            <DetailImage label='Akses Site 4' section='20' />
            {/* ======================================= BATAS LATITUDE LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Latitude Site 4'
                section='20'
                type='number'
                value={section20.aksessite4gambarlahan.lat.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite4gambarlahan.lat < -90 ||
                  section20.aksessite4gambarlahan.lat > 90
                    ? "Must be between -90 an 90!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLatValue("aksessite4gambarlahan");
                }}
              >
                Get Latitude
              </button>
            </div>
            {/* ======================================= BATAS LATITUDE  ===============  */}
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <div className={`d-flex flex-row align-items-end gap16`}>
              <DetailInput
                label='Longitude Site 4'
                section='20'
                value={section20.aksessite4gambarlahan.lon.replace(
                  /(\.\d{5})\d+/g,
                  "$1"
                )}
                message={
                  section20.aksessite4gambarlahan.lon < -180 ||
                  section20.aksessite4gambarlahan.lon > 180
                    ? "Must be between -180 an 180!"
                    : ""
                }
                inputWidth='40%'
                type='number'
              />
              <button
                className={`${style.buttonAutofill} px-2 py-1`}
                onClick={() => {
                  toggleLongValue("aksessite4gambarlahan");
                }}
              >
                Get Longitude
              </button>
            </div>
            {/* ======================================= BATAS LONGITUDE ===============  */}
            <DetailInput
              label='Keterangan Akses Site 4'
              section='20'
              type='text'
              value={section20.aksessite4gambarlahan.deskripsi ?? ""}
            />
          </div>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("19");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("21");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section22 = ({ lastData, setactiveTab }) => {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection22 = "section22";
  let localSection22 = JSON.parse(
    window.localStorage.getItem(strSection22.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const section22 = useSelector((state) => state.FormSurveyStaff.section22);

  useEffect(() => {
    if (Object.values(section22).every((x) => x === "" || x === [])) {
      dispatch(
        setSection22({
          generalcomment: lastData?.page21?.generalcomment ?? "",
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection22.concat(kodeSurvey),
      JSON.stringify(section22)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 22</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          General Comment
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailInput
            label='General Comment'
            section='21'
            satuan=''
            value={section22.generalcomment}
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("20");
              }}
            >{`< Prev`}</button>
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                // handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>{" "}
            <button
              disabled
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("22");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

// const Section22 = ({ data, setactiveTab }) => {
//   return (
//     <CardBody>
//       <>
//         <span className={style.section}>Section 22</span>
//         <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
//           Informasi Desain Link Microwave
//         </CardTitle>
//         <div style={{ fontWeight: "bold" }}>
//           <DetailInput
//             label='Site A ID (Near End)'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Kandidat Site A'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B ID (Far End)'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Kandidat Site B'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Frequency'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Path Length'
//             section='22'
//             satuan='km'
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site A Azimuth'
//             section='22'
//             satuan='derajat'
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Konfigurasi dan Kapasitas'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B Azimuth'
//             section='22'
//             satuan='derajat'
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site A Elevasi'
//             section='22'
//             satuan='m'
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Ukuran Ant (Main)'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B Elevasi'
//             section='22'
//             satuan='m'
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site A Sudut Vertical'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Ukuran Ant (SD)'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B Sudut Vertical'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site A Tinggi Antenna'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site A Antenna Support'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site A Tinggi Antenna SD'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B Antenna Support'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B Tinggi Antenna'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Peta Digital'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//           <DetailInput
//             label='Site B SD Tinggi Antenna SD'
//             section='22'
//             satuan=''
//             // value={section22.generalcomment}
//           />
//         </div>
//         <Col lg={12} className='px-0 py-2'>
//           <div
//             className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
//           >
//             <button
//               className={`${style.pagingButtons}`}
//               onClick={() => {
//                 setactiveTab("21");
//               }}
//             >{`< Prev`}</button>
//             <button className={`${style.yesButton}`} onClick={() => {}}>
//               Simpan
//             </button>
//             <button
//               className={`${style.pagingButtons}`}
//               onClick={() => {
//                 setactiveTab("23");
//               }}
//             >{`Next >`}</button>
//           </div>
//         </Col>
//       </>
//     </CardBody>
//   );
// };

const Section23 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 23</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Path Profile & Desktop Contour
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Upload Gambar Path Profile' section='23' />
          <DetailImage label='Upload Gambar Desktop Contour' section='23' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("22");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("24");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section24 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 24</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Hasil Survey LOS
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailInput
            label='Site A Latitude (DD Format)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site A Longitude (DD Format)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site B Latitude (DD Format)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site B Longitude (DD Format)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site A Tipe Tower'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site A Tinggi Tower'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site B Tipe Tower'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site B Tinggi Tower'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Rata-rata Tinggi Pohon (Asumsi +/- Mtr)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site A Proposed tinggi min Antenna (Main)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site A Proposed tinggi min Antenna (SD)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site B Proposed tinggi min Antenna (Main)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Site B Proposed tinggi min Antenna (SD)'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
          <DetailInput
            label='Kesimpulan Hasil dari Survey LOS'
            section='24'
            satuan=''
            // value={section24.generalcomment}
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            {" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("23");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>{" "}
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("25");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section25 = ({ setactiveTab }) => {
  // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  // const toggleLatValue = (label) => {
  //   dispatch(
  //     setSection25({
  //       ...section25,
  //       [label]: {
  //         ...section25[label],
  //         lat: geoLat,
  //       },
  //     })
  //   );
  // };

  // const toggleLongValue = (label) => {
  //   dispatch(
  //     setSection25({
  //       ...section25,
  //       [label]: {
  //         ...section25[label],
  //         lon: geoLong,
  //       },
  //     })
  //   );
  // };

  useEffect(() => {
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });
    // ========== GET LONGITUDE LATITUDE FROM NAVIGATOR
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 25</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Foto GPS dan Tower
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Foto GPS @ Site A' section='25' />

          <DetailImage label='Foto GPS @ Site B' section='25' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("24");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("26");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section26 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 26</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Tower SITE A
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Foto Tower SITE A' section='26' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("25");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("27");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section27 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 27</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Proposed Lokasi Antenna MW @ SITE A (As Plan Drawing)
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage
            label='Proposed Lokasi Antenna MW @ SITE A (As Plan Drawing)'
            section='27'
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("26");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("28");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section28 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 28</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Panoramic (0 deg to 150 deg) SITE A
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Site A: Sector 0°' section='28' />
          <DetailImage label='Site A: Sector 30°' section='28' />
          <DetailImage label='Site A: Sector 60°' section='28' />
          <DetailImage label='Site A: Sector 90°' section='28' />
          <DetailImage label='Site A: Sector 120°' section='28' />
          <DetailImage label='Site A: Sector 150°' section='28' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("27");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("29");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section29 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 29</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Panoramic (180 deg to 330 deg) SITE A
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Site A: Sector 180°' section='29' />
          <DetailImage label='Site A: Sector 210°' section='29' />
          <DetailImage label='Site A: Sector 240°' section='29' />
          <DetailImage label='Site A: Sector 270°' section='29' />
          <DetailImage label='Site A: Sector 300°' section='29' />
          <DetailImage label='Site A: Sector 330°' section='29' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("28");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("30");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section30 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 30</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Tower di SITE B
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Foto Tower di SITE B' section='30' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("29");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("31");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section31 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 31</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Proposed Lokasi Antenna MW @ SITE B (As Plan Drawing)
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage
            label='Proposed Lokasi Antenna MW @ SITE B (As Plan Drawing)'
            section='31'
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("30");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("32");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section32 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 32</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Panoramic (0 deg to 150 deg) dari SITE B
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Site B: Sector 0°' section='32' />
          <DetailImage label='Site B: Sector 30°' section='32' />
          <DetailImage label='Site B: Sector 60°' section='32' />
          <DetailImage label='Site B: Sector 90°' section='32' />
          <DetailImage label='Site B: Sector 120°' section='32' />
          <DetailImage label='Site B: Sector 150°' section='32' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("31");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("33");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section33 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 33</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Panoramic (180 deg to 330 deg) dari SITE B
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Site B: Sector 180°' section='33' />
          <DetailImage label='Site B: Sector 210°' section='33' />
          <DetailImage label='Site B: Sector 240°' section='33' />
          <DetailImage label='Site B: Sector 270°' section='33' />
          <DetailImage label='Site B: Sector 300°' section='33' />
          <DetailImage label='Site B: Sector 330°' section='33' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("32");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("34");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section34 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 34</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Foto Line Of Sight (LOS)
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailInput
            label='Dari'
            // value={section1.disiapkanoleh}
            type='text'
            section='34'
          />
          <DetailInput
            label='Ke'
            // value={section1.disiapkanoleh}
            type='text'
            section='34'
          />
          <DetailInput
            label='Azimuth'
            // value={section1.disiapkanoleh}
            type='text'
            section='34'
          />
          <DetailImage
            label='Gambar diambil dari Site A ke Site B (tanpa zoom)'
            message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking  Area'
            section='34'
          />
          <DetailImage
            label='Gambar diambil dari Site A ke Site B (dengan zoom)'
            message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking  Area'
            section='34'
          />
          <DetailImage
            label='Gambar diambil dari Site B ke Site A (tanpa zoom)'
            message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking Area Site B'
            section='34'
          />
          <DetailImage
            label='Gambar diambil dari Site B ke Site A (dengan zoom)'
            message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking  Area di Site B dan Halangan nya '
            section='34'
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("33");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("35");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section35 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 35</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Path Profile
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Path Profile' section='35' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("34");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("36");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section36 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 36</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Peta Lokasi keseluruhan / Global Map
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage
            label='Peta Lokasi keseluruhan / Global Map'
            section='36'
          />
          <div className='d-flex flex-column px-0'>
            <div className='form-group'>
              <label className='col-12 px-0'>File KML Peta Lokasi</label>
              {/* ============ upload image ============ */}
              <input
                type='file'
                className='form-control'
                name={"doc"}
                className='form-control'
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  height: "43px",
                }}
              />
            </div>
          </div>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("35");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("37");
              }}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};

const Section37 = ({ data, setactiveTab }) => {
  return (
    <CardBody>
      <>
        <span className={style.section}>Section 37</span>
        <CardTitle className={`mb-5 mt-2`} style={{ fontSize: "26px" }}>
          Perkiraan Link Budget (Capture-an Tools)
        </CardTitle>
        <div style={{ fontWeight: "bold" }}>
          <DetailImage label='Screenshot 1' section='37' />
          <DetailImage label='Screenshot 2' section='37' />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.pagingButtons}`}
              onClick={() => {
                setactiveTab("36");
              }}
            >{`< Prev`}</button>
            <button className={`${style.yesButton}`} onClick={() => {}}>
              Simpan
            </button>
            <button
              disabled
              className={`${style.pagingButtons}`}
            >{`Next >`}</button>
          </div>
        </Col>
      </>
    </CardBody>
  );
};
const CardTabs = (props) => {
  let lastData = props.lastData;
  const datatable = props?.datatable;
  const [activeTab, setactiveTab] = useState("");
  const localActiveTab = window.localStorage.getItem("formCurrentTab");
  window.localStorage.setItem("formCurrentTab", activeTab);
  const formType = useSelector((state) => state.BtsFormTypeReducer.formType);

  const dispatch = useDispatch();

  const sectionTitlesSSR = [
    { no: 1, title: "Section 1 : Informasi Survey" },
    { no: 2, title: "Section 2 : Informasi Umum" },
    { no: 3, title: "Section 3 : Informasi Geografi dan Tower Data" },
    { no: 4, title: "Section 4 : Transmisi VSAT" },
    { no: 5, title: "Section 5 : Informasi Umum Lahan" },
    { no: 6, title: "Section 6 : Coverage Seluler Di Site" },
    { no: 7, title: "Section 7 : Kondisi Lahan" },
    { no: 8, title: "Section 8 : Sarana Catuan Listrik Dan Pendukungnya" },
    { no: 9, title: "Section 9 : Perijinan" },
    { no: 10, title: "Section 10 : Informasi Demografi" },
    { no: 11, title: "Section 11 : Foto Foto Lahan Yang Akan Dibangun" },
    { no: 12, title: "Section 12 : Layout Site (Sesuai Penawaran Tender)" },
    { no: 13, title: "Section 13 : Foto Foto Kandidat Lahan" },
    { no: 14, title: "Section 14 : Informasi Coverage and Obstacle" },
    { no: 15, title: "Section 15 : Foto Foto Capture G-NETTRACK" },
    {
      no: 16,
      title: "Section 16 : Foto Foto Capture G-NETTRACK  Rute Jalan",
    },
    { no: 17, title: "Section 17 : Location Mapping" },
    { no: 18, title: "Section 18 : Panoramic Area" },
    { no: 19, title: "Section 19 : Foto-Foto Panoramic Area" },
    { no: 20, title: "Section 20 : Foto-Foto Akses ke Site" },
    { no: 21, title: "Section 22 : General Comment" },
  ];

  const sectionTitlesMW = [
    { no: 22, title: "Section 22 : Informasi Desain Link Microwave" },
    { no: 23, title: "Section 23 : Path Profile & Desktop Contour" },
    { no: 24, title: "Section 24 : Hasil Survey LOS" },
    { no: 25, title: "Section 25 : Foto Foto GPS dan Tower" },
    { no: 26, title: "Section 26 : Foto Tower SITE A" },
    {
      no: 27,
      title:
        "Section 27 : Proposed Lokasi Antenna MW @ SITE A (As Plan Drawing)",
    },
    { no: 28, title: "Section 28 : Foto Panoramic (0 deg to 150 deg) SITE A" },
    {
      no: 29,
      title: "Section 29 : Foto Panoramic  (180 deg to 330 deg) SITE A ",
    },
    { no: 30, title: "Section 30 : Foto Tower di SITE B" },
    {
      no: 31,
      title:
        "Section 31 : Proposed Lokasi Antenna MW @ SITE B (As Plan Drawing)",
    },
    {
      no: 32,
      title: "Section 32 : Foto Panoramic (0 deg to 150 deg) dari SITE B",
    },
    {
      no: 33,
      title: "Section 33 : Foto Panoramic (180 deg to 330 deg) dari SITE B",
    },
    { no: 34, title: "Section 34 : Foto Line Of Sight (LOS)" },
    { no: 35, title: "Section 35 : Path Profile" },
    { no: 36, title: "Section 36 : Peta Lokasi keseluruhan / Global Map" },
    { no: 37, title: "Section 37 : Perkiraan Link Budget (Capture-an Tools)" },
  ];

  useEffect(() => {
    if (formType === "mw") {
      setactiveTab("22");
    } else if (formType === "ssr") {
      setactiveTab("1");
    }
  }, [formType]);

  useEffect(() => {
    if (localActiveTab) {
      setactiveTab(localActiveTab);
    } else {
      setactiveTab((activeTab) => (activeTab = "1"));
    }

    if (parseInt(localActiveTab) > 21) {
      dispatch(setBtsFormTab("mw"));
    }
  }, []);

  const Tabs = ({ data }) => {
    let pageData = data?.data[data?.data?.length - 1];
    return (
      <div className='checkout-tabs'>
        <Row>
          <Col xl='2' lg='4' md='4' sm='4'>
            <Nav
              // className='flex-column'
              className={`d-flex justify-content-center align-items-center ${style.navLinkScrollBar} nav-link-scroll`}
              pills
            >
              {formType === "ssr" &&
                sectionTitlesSSR.map((title, i) => {
                  // if (pageData["page" + title.no]) {
                  return (
                    <NavItem key={i}>
                      <NavLink
                        className={classnames({
                          active: activeTab === `${title.no}`,
                        })}
                        onClick={() => {
                          setactiveTab(`${title.no}`);
                        }}
                      >
                        <span className={`font-weight-bold`}>
                          {title.title}
                        </span>
                      </NavLink>
                    </NavItem>
                  );
                  // }
                })}
              {formType === "mw" &&
                sectionTitlesMW.map((title, i) => {
                  return (
                    <NavItem key={i}>
                      <NavLink
                        className={classnames({
                          active: activeTab === `${title.no}`,
                        })}
                        onClick={() => {
                          setactiveTab(`${title.no}`);
                        }}
                      >
                        <span className={`font-weight-bold`}>
                          {title.title}
                        </span>
                      </NavLink>
                    </NavItem>
                  );
                })}
            </Nav>
          </Col>
          <Col xl='10' lg='8' md='8' sm='8'>
            <Card>
              <CardBody className={style.cardBody}>
                <TabContent activeTab={activeTab}>
                  {/* <TabContent activeTab='3'> */}
                  <TabPane tabId='1'>
                    <Section1
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='2'>
                    <Section2
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='3'>
                    <Section3
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='4'>
                    <Section4
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='5'>
                    <Section5
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='6'>
                    <Section6
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='7'>
                    <Section7
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='8'>
                    <Section8
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='9'>
                    <Section9
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='10'>
                    <Section10
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='11'>
                    <Section11
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='12'>
                    <Section12
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='13'>
                    <Section13
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='14'>
                    <Section14
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='15'>
                    <Section15
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='16'>
                    <Section16
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='17'>
                    <Section17
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='18'>
                    <Section18
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='19'>
                    <Section19
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='20'>
                    <Section20
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='21'>
                    <Section22
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  <TabPane tabId='22'>
                    <Section22
                      setactiveTab={setactiveTab}
                      datatable={datatable}
                      lastData={lastData}
                    />
                  </TabPane>
                  {/* <TabPane tabId='22'>
                    {datatable?.data[datatable?.data?.length - 1]?.page22 ? (
                      <Section22
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane> */}
                  <TabPane tabId='23'>
                    {datatable?.data[datatable?.data?.length - 1]?.page23 ? (
                      <Section23
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='24'>
                    {datatable?.data[datatable?.data?.length - 1]?.page24 ? (
                      <Section24
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='25'>
                    {datatable?.data[datatable?.data?.length - 1]?.page25 ? (
                      <Section25
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='26'>
                    {datatable?.data[datatable?.data?.length - 1]?.page26 ? (
                      <Section26
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='27'>
                    {datatable?.data[datatable?.data?.length - 1]?.page27 ? (
                      <Section27
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='28'>
                    {datatable?.data[datatable?.data?.length - 1]?.page28 ? (
                      <Section28
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='29'>
                    {datatable?.data[datatable?.data?.length - 1]?.page29 ? (
                      <Section29
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='30'>
                    {datatable?.data[datatable?.data?.length - 1]?.page30 ? (
                      <Section30
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='31'>
                    {datatable?.data[datatable?.data?.length - 1]?.page31 ? (
                      <Section31
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='32'>
                    {datatable?.data[datatable?.data?.length - 1]?.page32 ? (
                      <Section32
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='33'>
                    {datatable?.data[datatable?.data?.length - 1]?.page33 ? (
                      <Section33
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='34'>
                    {datatable?.data[datatable?.data?.length - 1]?.page34 ? (
                      <Section34
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='35'>
                    {datatable?.data[datatable?.data?.length - 1]?.page35 ? (
                      <Section35
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='36'>
                    {datatable?.data[datatable?.data?.length - 1]?.page36 ? (
                      <Section36
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                  <TabPane tabId='37'>
                    {datatable?.data[datatable?.data?.length - 1]?.page37 ? (
                      <Section37
                        setactiveTab={setactiveTab}
                        datatable={datatable}
                      />
                    ) : (
                      <p>Tidak ada data</p>
                    )}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  return (
    <>
      <Tabs data={datatable} />
    </>
  );
};

export default CardTabs;
