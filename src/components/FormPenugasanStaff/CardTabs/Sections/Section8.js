import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import DetailRadio from "../DetailRadio";
import DetailTimeRangePicker from "../DetailTimeRangePicker";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import InfoText from "../InfoText";

function Section8({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection8 = "section8";
  let localSection8 = JSON.parse(
    window.localStorage.getItem(strSection8.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section8 = useSelector((state) => state.FormSurveyStaff.section8);

  // set time
  const moment = require("moment");
  let today = new Date();
  let todayTime = moment(today).format("HH:MM");

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  // useEffect(() => {
  //   if (localBtsMain !== null) {
  //     dispatch(setBtsMain(localBtsMain));
  //   } else {
  //     dispatch(
  //       setBtsMain({
  //         ...btsMain,
  //         section8: {
  //           ...btsMain?.section8,
  //           pengelolasumberlistrik: "",
  //           jenissumberlistrik: "",
  //           jenissumberlistriklainnya: "",
  //           phaselistrik: "",
  //           kapasitassumberlistrik: "",
  //           jamoperasisumberlistrik: "",
  //           mulai: todayTime,
  //           selesai: todayTime,
  //           jarakperangkatkesumberlistrikterdekat: "",
  //           listrikbisadipakaiuntukperangkat: "",
  //           kategorigrid: "",
  //           pasokanbbm: "",
  //           jenisbbmyangseringtersedia: "",
  //           hargabbmdilokasi: "",
  //           posisiobjekpenghalangterhadapmodulsuryalayout: "",
  //           bayanganobjekmenutupiareamodulsurya: "",
  //           posisilintanglokasi: "",
  //           orientasikemiringanpanelsuryayangoptimal: "",
  //           beritaacarakelistrikan: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 8</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Sarana Catuan Listrik Dan Pendukungnya
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Pengelola Sumber Listrik'
            section='8'
            dropdownItem={[
              { name: "PLN" },
              { name: "PEMDA" },
              { name: "Swadaya" },
              { name: "Tidak Ada Sumber Listrik" },
            ]}
            value={btsMain?.section8?.pengelolasumberlistrik}
          />
          {btsMain?.section8?.pengelolasumberlistrik !==
          "Tidak Ada Sumber Listrik" ? (
            <DetailDropdown
              label='Jenis Sumber Listrik'
              section='8'
              dropdownItem={[
                { name: "PLN" },
                { name: "Genset" },
                { name: "Micro/Mini Hydro" },
                { name: "Grid Skala Besar" },
                { name: "Lainnya" },
              ]}
              value={btsMain?.section8?.jenissumberlistrik}
            />
          ) : (
            <DetailDropdown
              label='Jenis Sumber Listrik'
              section='8'
              dropdownItem={[
                { name: "Genset" },
                { name: "Micro/Mini Hydro" },
                { name: "Grid Skala Besar" },
                { name: "Lainnya" },
              ]}
              value={btsMain?.section8?.jenissumberlistrik}
            />
          )}

          {btsMain?.section8?.jenissumberlistrik === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Jenis Sumber Listrik Lainnya'
              section='8'
              type='text'
              value={btsMain?.section8?.jenissumberlistriklainnya}
            />
          )}
          {btsMain?.section8?.pengelolasumberlistrik !==
            "Tidak Ada Sumber Listrik" && (
            <DetailDropdown
              label='Phase Listrik'
              section='8'
              dropdownItem={[{ name: "1" }, { name: "3" }]}
              value={btsMain?.section8?.phaselistrik}
            />
          )}
          {btsMain?.section8?.pengelolasumberlistrik !==
          "Tidak Ada Sumber Listrik" ? (
            <DetailInput
              label='Kapasitas Sumber  Listrik'
              section='8'
              satuan='KVA'
              type='number'
              value={btsMain?.section8?.kapasitassumberlistrik}
            />
          ) : (
            <DetailInput
              label='Kapasitas Sumber  Listrik'
              section='8'
              satuan='KVA'
              type='number'
              disabled={true}
              value={0}
            />
          )}

          <DetailDropdown
            label='Jam Operasi Sumber Listrik'
            section='8'
            dropdownItem={[
              { name: "6 Jam" },
              { name: "8 Jam" },
              { name: "24 Jam" },
            ]}
            value={btsMain?.section8?.jamoperasisumberlistrik}
          />
          {btsMain?.section8?.jamoperasisumberlistrik === "6 Jam" ||
          btsMain?.section8?.jamoperasisumberlistrik === "8 Jam" ? (
            <>
              <div className='d-flex flex-row w-100 gap16 pt-0'>
                <DetailTimeRangePicker
                  label='Mulai'
                  section='8'
                  kodeSurvey={kodeSurvey}
                  value={btsMain?.section8?.mulai}
                />
                <DetailTimeRangePicker
                  label='Selesai'
                  section='8'
                  kodeSurvey={kodeSurvey}
                  value={btsMain?.section8?.selesai}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {btsMain?.section8?.pengelolasumberlistrik !==
            "Tidak Ada Sumber Listrik" && (
            <DetailInput
              label='Jarak Perangkat ke Sumber Listrik Terdekat'
              section='8'
              type='number'
              satuan='meter'
              value={btsMain?.section8?.jarakperangkatkesumberlistrikterdekat}
            />
          )}
          <DetailDropdown
            label='Listrik Bisa Dipakai Untuk Perangkat'
            section='8'
            dropdownItem={[{ name: "Ya" }, { name: "Tidak" }]}
            value={btsMain?.section8?.listrikbisadipakaiuntukperangkat}
          />
          <DetailDropdown
            label='Kategori Grid*'
            section='8'
            dropdownItem={[
              { name: "Strong Grid" },
              { name: "Poor Grid" },
              { name: "Off Grid" },
            ]}
            value={btsMain?.section8?.kategorigrid}
          />
          <InfoText
            text1='Sumber listrik dikategorikan STRONG GRID apabila memenuhi persyaratan berikut:'
            text2='1) Listrik dikelola oleh PLN  2) Jam Suplai Listrik 24 Jam 3) Kehandalan lebih dari 98% (dalam 1 bulan kurang dari 15 jam mati lampu)'
          />
          <DetailDropdown
            label='Pasokan BBM'
            section='8'
            dropdownItem={[{ name: "Mudah" }, { name: "Sulit" }]}
            value={btsMain?.section8?.pasokanbbm}
          />
          <DetailDropdown
            label='Jenis BBM yang Sering Tersedia'
            section='8'
            dropdownItem={[{ name: "Bensin" }, { name: "Solar" }]}
            value={btsMain?.section8?.jenisbbmyangseringtersedia}
          />
          <DetailInput
            label='Harga BBM di Lokasi'
            section='8'
            satuan='/liter'
            type='number'
            value={btsMain?.section8?.hargabbmdilokasi}
          />
          <DetailImage
            label='Posisi Objek Penghalang Terhadap Modul Surya (Layout)'
            section='8'
          />
          <DetailDropdown
            label='Bayangan Objek Menutupi Area Modul Surya'
            section='8'
            dropdownItem={[{ name: "Ya" }, { name: "Tidak" }]}
            asterisk='Area modul surya tidak boleh tertutup bayangan objek penghalang, jika tertutup bayangan maka objek penghalang harus dihilangkan atau area modul surya digeser'
            value={btsMain?.section8?.bayanganobjekmenutupiareamodulsurya}
          />
          <DetailDropdown
            label='Posisi Lintang Lokasi'
            section='8'
            dropdownItem={[
              { name: "Lintang Utara" },
              { name: "Lintang Selatan" },
            ]}
            value={btsMain?.section8?.posisilintanglokasi}
          />
          <DetailDropdown
            label='Orientasi Kemiringan Panel Surya Yang Optimal'
            section='8'
            dropdownItem={[{ name: "Utara" }, { name: "Selatan" }]}
            asterisk='Kemiringan modul surya menghadap equator, jika lokasi berada di Lintang Selatan maka orientasi modul surya ke arah Utara, demikian sebaliknya'
            value={btsMain?.section8?.orientasikemiringanpanelsuryayangoptimal}
          />
          <DetailImage
            label='Berita Acara Kelistrikan'
            section='8'
            name='jpgpdf' // dapat menerima jpg dan pdf
            asterisk='Upload berita acara file jpg atau pdf'
          />
        </div>
        <NextPrevButtons
          section='8'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section8;
