import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailDropdown from "../DetailDropdown.js";
import DetailCheckbox from "../DetailCheckbox.js";
import DetailInput from "../DetailInput";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import InfoText from "../InfoText";

function Section7({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection7 = "section7";
  let localSection7 = JSON.parse(
    window.localStorage.getItem(strSection7.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section7 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section7
  );

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
  //         section7: {
  //           ...btsMain?.section7,
  //           topografiumum: "",
  //           derajatkemiringan: "",
  //           topografiumumlainnya: "",
  //           keteranganareacakupanbanyakcakupan: [],
  //           keteranganareacakupanlainnya: "",
  //           keteranganlahan: "",
  //           statuslahan: "",
  //           pengurusanimb: "",
  //           klasifikasitanah: "",
  //           obyekpenghalang: "",
  //           obyekpenghalanglainnya: "",
  //           kebutuhanpengkondisianlahan: "",
  //           kebutuhanpengkondisianlahanlainnya: "",
  //           tataruang: "",
  //           jenislahan: "",
  //           jenislahanlainnya: "",
  //           dekatlautsungai: "",
  //           dekatlautsungailainnya: "",
  //           resikobencana: "",
  //           ketinggianbanjir: "",
  //           resikobencanalainnya: "",
  //           sumberdayasetempatsdasdm: "",
  //           sumberdayalainnya: "",
  //           resikorelokasi: "",
  //           resikokomplain: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 7</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Kondisi Lahan</CardTitle>
        <div className={`font-weight-bold`}>
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
              { name: "Miring" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.topografiumum}
          />
          {btsMain?.section7?.topografiumum === "Miring" && (
            <DetailInput
              isExtraInput={true}
              inputWidth='60%'
              label='Derajat Kemiringan'
              section='7'
              type='number'
              satuan='°'
              value={btsMain?.section7?.derajatkemiringan}
            />
          )}
          {btsMain?.section7?.topografiumum === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Topografi Umum Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.topografiumumlainnya}
            />
          )}
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
          {btsMain?.section7?.keteranganareacakupanbanyakcakupan.includes(
            "Lainnya"
          ) && (
            <DetailInput
              isExtraInput={true}
              label='Keterangan Area Cakupan Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.keteranganareacakupanlainnya}
            />
          )}
          <DetailDropdown
            label='Keterangan Lahan'
            section='7'
            dropdownItem={[
              { name: "Operator" },
              { name: "Pemukiman" },
              { name: "Pemerintahan" },
              { name: "Perkantoran" },
              { name: "Pabrik" },
              { name: "Sekolah" },
              { name: "Status Hibah" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.keteranganlahan}
          />
          {btsMain?.section7?.keteranganlahan === "Lainnya" && (
            <DetailInput
              label='Keterangan Lahan Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.keteranganlahanlainnya}
            />
          )}
          <DetailDropdown
            label='Status Lahan'
            section='7'
            dropdownItem={[
              { name: "Hibah" },
              { name: "Proses Hibah" },
              { name: "Belum Proses Hibah" },
              { name: "Barang Milik Desa" },
            ]}
            value={btsMain?.section7?.statuslahan}
          />
          <DetailDropdown
            label='Pengurusan IMB'
            section='7'
            dropdownItem={[{ name: "Normal" }, { name: "Izin Khusus" }]}
            value={btsMain?.section7?.pengurusanimb}
          />
          <DetailDropdown
            label='Klasifikasi Tanah'
            section='7'
            dropdownItem={[
              { name: "Normal" },
              { name: "Berbatuan" },
              { name: "Berpasir" },
              { name: "Berlumpur" },
            ]}
            value={btsMain?.section7?.klasifikasitanah}
          />
          <DetailDropdown
            label='Obyek Penghalang'
            section='7'
            dropdownItem={[
              { name: "Tidak Ada" },
              { name: "Perkebunan dan Perbukitan" },
              { name: "Bangunan" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.obyekpenghalang}
          />
          {btsMain?.section7?.obyekpenghalang === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Obyek Penghalang Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.obyekpenghalanglainnya}
            />
          )}
          <DetailDropdown
            label='Kebutuhan Pengkondisian Lahan'
            section='7'
            dropdownItem={[
              { name: "Clearing" },
              { name: "Stripping" },
              { name: "Cut/Fill" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.kebutuhanpengkondisianlahan}
          />
          {btsMain?.section7?.kebutuhanpengkondisianlahan === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Kebutuhan Pengkondisian Lahan Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.kebutuhanpengkondisianlahanlainnya}
            />
          )}
          <DetailDropdown
            label='Tata Ruang'
            section='7'
            dropdownItem={[
              { name: "Bersih" },
              { name: "Galian" },
              { name: "Cut/Fill" },
              { name: "Dibongkar" },
            ]}
            value={btsMain?.section7?.tataruang}
          />
          <DetailDropdown
            label='Jenis Lahan'
            section='7'
            dropdownItem={[
              { name: "Tanah Rawa" },
              { name: "Tanah Padat" },
              { name: "Tanah Sawah" },
              { name: "Tanah Sedang" },
              { name: "Tanah Normal" },
              { name: "Tanah Berbatu" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.jenislahan}
          />
          {btsMain?.section7?.jenislahan === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Jenis Lahan Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.jenislahanlainnya}
            />
          )}
          <DetailDropdown
            label='Dekat Laut / Sungai'
            section='7'
            dropdownItem={[
              { name: "Dekat" },
              { name: "Jauh Lebih dari 300m" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.dekatlautsungai}
          />
          {btsMain?.section7?.dekatlautsungai === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Dekat Laut / Sungai Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.dekatlautsungailainnya}
            />
          )}
          <DetailDropdown
            label='Resiko Bencana'
            section='7'
            dropdownItem={[
              { name: "Banjir" },
              { name: "Tanah Longsor" },
              { name: "Tidak Ada" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.resikobencana}
          />
          {btsMain?.section7?.resikobencana === "Banjir" && (
            <DetailInput
              isExtraInput={true}
              label='Ketinggian Banjir'
              section='7'
              type='number'
              satuan='meter'
              value={btsMain?.section7?.ketinggianbanjir}
            />
          )}
          {btsMain?.section7?.resikobencana === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Resiko Bencana Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.resikobencanalainnya}
            />
          )}
          <DetailDropdown
            label='Sumber Daya Setempat (SDA/SDM)'
            section='7'
            dropdownItem={[
              { name: "Batu" },
              { name: "Pasir" },
              { name: "SDM Lokal" },
              { name: "Semen" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section7?.sumberdayasetempatsdasdm}
          />
          {btsMain?.section7?.sumberdayasetempatsdasdm === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Sumber Daya Lainnya'
              section='7'
              type='text'
              value={btsMain?.section7?.sumberdayalainnya}
            />
          )}
          <DetailDropdown
            label='Resiko Relokasi'
            section='7'
            dropdownItem={[{ name: "Ya" }, { name: "Tidak" }]}
            value={btsMain?.section7?.resikorelokasi}
          />
          <InfoText text1='(Jika ada tower opsel existing ataupun Plan)' />
          <DetailDropdown
            label='Resiko Komplain'
            section='7'
            dropdownItem={[{ name: "Ya" }, { name: "Tidak" }]}
            value={btsMain?.section7?.resikokomplain}
          />
          <InfoText text1='(Jika ada isue Ijin Warga/Commcase)' />
        </div>
        <NextPrevButtons
          section='7'
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

export default Section7;
