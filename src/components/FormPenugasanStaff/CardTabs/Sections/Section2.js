import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import LatitudeLongitude from "../LatitudeLongitude";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section2({ setactiveTab, db }) {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection2 = "section2";
  let localSection2 = JSON.parse(
    window.localStorage.getItem(strSection2.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section2 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section2
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
  //         section2: {
  //           ...btsMain?.section2,
  //           namasite: "",
  //           tipesite: "",
  //           tipesitelainnya: "",
  //           tipecoverageareasite: "",
  //           alamatdankodepos: "",
  //           latitude: "",
  //           longitude: "",
  //           contactpersonpemilik: "",
  //           notlp: "",
  //           alamatcontactperson: "",
  //           akseskelokasisite: "",
  //           jarakdarilokasisitekejalurutama: "",
  //           akseskelokasisitejarak: "",
  //           kondisijalanakseslokasi: "",
  //           kondisijalanakseslokasilainnya: "",
  //           jalanakseslokasi: "",
  //           jalanakseslokasilainnya: "",
  //           aksessungaiataulaut: "",
  //           aksessungaiataulautlainnya: "",
  //           waktuperjalanan: "",
  //           waktukerja: "",
  //           ijinkelokasi: "",
  //           lamaperjalanankekotaterdekat: "", //new
  //           keberangkatandarikotaterdekat: "", //new
  //           tinggitimur: "",
  //           tinggiselatan: "",
  //           tinggibarat: "",
  //           tinggiutara: "",
  //           jaraktimur: "",
  //           jarakselatan: "",
  //           jarakbarat: "",
  //           jarakutara: "",
  //           kondisigudangpenyimpanan: "",
  //           kondisigudangpenyimpananlainnya: "",
  //           tipeantenna: "",
  //           ketinggianomni: "",
  //           jumlah: "",
  //           azimuth: "",
  //           unit: "",
  //           rfantennaheight: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 2</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Informasi Umum</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailInput
            label='Nama Site'
            section='2'
            type='text'
            value={btsMain?.section2?.namasite}
          />
          <DetailDropdown
            label='Tipe Site'
            section='2'
            value={btsMain?.section2?.tipesite}
            dropdownItem={[
              { name: "Pedesaan" },
              { name: "Perbatasan dengan negara lain" },
              { name: "Lapangan/Greenfield" },
              { name: "Atap/Rooftop" },
              { name: "Lainnya" },
            ]}
          />
          {btsMain?.section2?.tipesite === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Tipe Site Lainnya'
              section='2'
              type='text'
              value={btsMain?.section2?.tipesitelainnya}
            />
          )}

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
            value={btsMain?.section2?.tipecoverageareasite}
          />
          <DetailInput
            label='Alamat dan Kode Pos'
            section='2'
            type='text'
            value={btsMain?.section2?.alamatdankodepos}
          />
          <LatitudeLongitude
            section='2'
            latLabel='Latitude'
            lonLabel='Longitude'
          />
          <DetailInput
            label='Contact Person Pemilik'
            section='2'
            type='text'
            value={btsMain?.section2?.contactpersonpemilik}
          />
          <DetailInput
            label='No Tlp'
            section='2'
            type='text'
            value={btsMain?.section2?.notlp}
          />
          <DetailInput
            label='Alamat Contact Person'
            section='2'
            type='text'
            value={btsMain?.section2?.alamatcontactperson}
          />
          <DetailDropdown
            label='Akses ke Lokasi Site'
            section='2'
            dropdownItem={[
              { name: "Akses Darat" },
              { name: "Akses Laut" },
              { name: "Akses Udara" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section2?.akseskelokasisite}
          />
          {btsMain?.section2?.akseskelokasisite === "Lainnya" && (
            <DetailInput
              label='Akses ke Lokasi Site Lainnya'
              section='2'
              type='text'
              value={btsMain?.section2?.akseskelokasisitelainnya}
            />
          )}
          <DetailInput
            label='Jarak Dari Lokasi Site ke Jalur Utama '
            section='2'
            type='number'
            satuan='meter'
            value={btsMain?.section2?.jarakdarilokasisitekejalurutama}
          />
          <DetailInput
            label='Akses ke Lokasi Site (jarak)'
            section='2'
            type='number'
            satuan='meter'
            value={btsMain?.section2?.akseskelokasisitejarak}
          />
          <DetailDropdown
            label='Kondisi Jalan Akses Lokasi'
            section='2'
            value={btsMain?.section2?.kondisijalanakseslokasi}
            dropdownItem={[
              { name: "Akses Aspal" },
              { name: "Akses Cor" },
              { name: "Akses Tanah" },
              { name: "Akses Setapak" },
              { name: "Akses Berbatu" },
              { name: "Lainnya" },
            ]}
          />
          {btsMain?.section2?.kondisijalanakseslokasi === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Kondisi Jalan Akses Lokasi Lainnya'
              section='2'
              type='text'
              value={btsMain?.section2?.kondisijalanakseslokasilainnya}
            />
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
            value={btsMain?.section2?.jalanakseslokasi}
          />
          {btsMain?.section2?.jalanakseslokasi === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Jalan Akses Lokasi Lainnya'
              section='2'
              type='text'
              value={btsMain?.section2?.jalanakseslokasilainnya}
            />
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
            value={btsMain?.section2?.aksessungaiataulaut}
          />
          {btsMain?.section2?.aksessungaiataulaut === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Akses Sungai atau Laut Lainnya'
              section='2'
              type='text'
              value={btsMain?.section2?.aksessungaiataulautlainnya}
            />
          )}
          <DetailDropdown
            label='Waktu Perjalanan'
            section='2'
            dropdownItem={[
              { name: "24 Jam" },
              { name: "Waktu Kerja" },
              { name: "Jadwal Kapal" },
            ]}
            value={btsMain?.section2?.waktuperjalanan}
          />
          {btsMain?.section2?.waktuperjalanan === "Waktu Kerja" && (
            <DetailInput
              isExtraInput={true}
              label='Waktu Kerja'
              section='2'
              type='text'
              value={btsMain?.section2?.waktukerja}
            />
          )}
          <DetailDropdown
            label='Ijin ke Lokasi'
            section='2'
            dropdownItem={[{ name: "Iya" }, { name: "Tidak" }]}
            value={btsMain?.section2?.ijinkelokasi}
          />
          <DetailInput
            label='Lama Perjalanan ke Kota Terdekat'
            section='2'
            satuan='jam'
            type='number'
            value={btsMain?.section2?.lamaperjalanankekotaterdekat}
          />
          <DetailInput
            label='Keberangkatan Dari kota Terdekat'
            section='2'
            type='text'
            value={btsMain?.section2?.keberangkatandarikotaterdekat}
          />
          <Label>Ketinggian Halangan</Label>
          <div className='d-flex flex-row gap16'>
            <DetailInput
              label='Tinggi Timur'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.tinggitimur}
            />
            <DetailInput
              label='Tinggi Selatan'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.tinggiselatan}
            />
            <DetailInput
              label='Tinggi Barat'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.tinggibarat}
            />
            <DetailInput
              label='Tinggi Utara'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.tinggiutara}
            />
          </div>
          <Label>Jarak Halangan dari Tower</Label>
          <div className='d-flex flex-row gap16'>
            <DetailInput
              label='Jarak Timur'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.jaraktimur}
            />
            <DetailInput
              label='Jarak Selatan'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.jarakselatan}
            />
            <DetailInput
              label='Jarak Barat'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.jarakbarat}
            />
            <DetailInput
              label='Jarak Utara'
              section='2'
              type='number'
              satuan='meter'
              value={btsMain?.section2?.jarakutara}
            />
          </div>
          <DetailDropdown
            label='Kondisi Gudang Penyimpanan'
            section='2'
            dropdownItem={[
              { name: "Terkunci Security 24 Jam" },
              { name: "Ruang Terbuka" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section2?.kondisigudangpenyimpanan}
          />
          {btsMain?.section2?.kondisigudangpenyimpanan === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Kondisi Gudang Penyimpanan Lainnya'
              section='2'
              type='text'
              value={btsMain?.section2?.kondisigudangpenyimpananlainnya}
            />
          )}
          <DetailDropdown
            label='Tipe Antenna'
            section='2'
            dropdownItem={[{ name: "Omni" }, { name: "Sectoral" }]}
            value={btsMain?.section2?.tipeantenna}
          />
          {btsMain?.section2?.tipeantenna === "Omni" && (
            <DetailInput
              isExtraInput={true}
              label='Ketinggian Omni'
              section='2'
              type='numebr'
              satuan='meter'
              value={btsMain?.section2?.ketinggianomni}
            />
          )}
          {btsMain?.section2?.tipeantenna === "Sectoral" && (
            <>
              <DetailInput
                isExtraInput={true}
                label='Jumlah'
                section='2'
                type='number'
                value={btsMain?.section2?.jumlah}
              />
              <DetailInput
                isExtraInput={true}
                label='Azimuth'
                section='2'
                type='number'
                value={btsMain?.section2?.azimuth}
              />
              <DetailInput
                isExtraInput={true}
                label='Unit'
                section='2'
                type='number'
                value={btsMain?.section2?.unit}
              />
              <DetailInput
                isExtraInput={true}
                label='RF Antenna Height'
                section='2'
                type='number'
                satuan='meter'
                value={btsMain?.section2?.rfantennaheight}
              />
            </>
          )}

          {/* SSR NOTE : JUMLAH, AZIMUTH, UNIT, ANTENNA HEIGHT */}
        </div>
        <NextPrevButtons
          section='2'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section2;
