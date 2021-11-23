import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Label, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import DetailCheckbox from "../DetailCheckbox.js";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";
// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import InfoText from "../InfoText";
import LatitudeLongitude from "../LatitudeLongitude";

function Section10({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection10 = "section10";
  let localSection10 = JSON.parse(
    window.localStorage.getItem(strSection10.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section10 = useSelector((state) => state.FormSurveyStaff.section10);
  const [valueAksesInternet, setValueAksesInternet] = useState("");
  const [valueDesaTerdekat, setValueDesaTerdekat] = useState("");

  const [valueOrang, setValueOrang] = useState("");
  const [valueKK, setValueKK] = useState("");

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
  //         section10: {
  //           ...btsMain?.section10,
  //           populasiorangkk: "",
  //           orang: "",
  //           kk: "",
  //           kepadatanpenduduk: "",
  //           distribusipenduduk: "",
  //           desaterdekat: "",
  //           namadesaterdekat: "",
  //           jarakdesaterdekat: "",
  //           matapencaharian: "",
  //           jumlahpemilikhp: "",
  //           tipejenishp: [],
  //           jenissimcardoperator: [],
  //           wargayangdapatdilatihtentangpengoperasianperangkatdasartraining: "",
  //           rumahyangmemilikigensetsolarpanel: "",
  //           catatanlainnya: "",
  //           aksesinternetnonselular: "",
  //           aksesinternetnonselularlainnya: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 10</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Demografi
        </CardTitle>{" "}
        <div className='font-weight-bold border rounded p-4 mb-2'>
          <p className='mt-4'>A. INFORMASI UMUM</p>
          <div className={`font-weight-bold`}>
            <Label>Populasi (Orang/KK)</Label>
            <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
              <DetailInput
                label='Orang'
                showLabel={false}
                section='10'
                type='number'
                satuan='Warga'
                value={btsMain?.section10?.orang}
              />
              <DetailInput
                label='KK'
                showLabel={false}
                section='10'
                type='number'
                satuan='KK'
                value={btsMain?.section10?.kk}
              />
            </div>
            <DetailInput
              label='Kepadatan Penduduk'
              section='10'
              satuan='Orang/km2'
              type='number'
              value={btsMain?.section10?.kepadatanpenduduk}
            />
            <DetailDropdown
              label='Distribusi Penduduk'
              section='10'
              dropdownItem={[
                { name: "Terpisah" },
                { name: "Cenderung Berkumpul" },
                { name: "Lainnya" },
              ]}
              value={btsMain?.section10?.distribusipenduduk}
            />
            <DetailDropdown
              label='Desa Terdekat'
              section='10'
              dropdownItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
              value={btsMain?.section10?.desaterdekat}
            />
            {btsMain?.section10?.desaterdekat === "Ada" && (
              <DetailInput
                isExtraInput={true}
                label='Nama Desa Terdekat'
                section='10'
                type='text'
                value={btsMain?.section10?.namadesaterdekat}
              />
            )}
            <DetailInput
              label='Jarak Desa Terdekat'
              section='10'
              type='number'
              satuan='jam'
              asterisk='Menggunakan transportasi motor/mobil'
              value={btsMain?.section10?.jarakdesaterdekat}
            />
            <DetailInput
              label='Akses dan Kondisi Jalan'
              section='10'
              type='text'
              value={btsMain?.section10?.aksesdankondisijalan}
            />
            <DetailImage label='Foto Akses dan Kondisi Jalan' section='10' />
            <DetailInput
              label='Kondisi Geografis'
              section='10'
              type='text'
              value={btsMain?.section10?.kondisigeografis}
            />
            <DetailImage label='Foto Kondisi Geografis' section='10' />
            <LatitudeLongitude
              section='10'
              latLabel='Latitude'
              lonLabel='Longitude'
            />
            <DetailInput
              label='Transportasi Desa'
              section='10'
              type='text'
              value={btsMain?.section10?.transportasidesa}
            />
            <DetailImage label='Foto Transportasi Desa' section='10' />
            <DetailInput
              label='Potensi Desa'
              section='10'
              type='text'
              value={btsMain?.section10?.potensidesa}
            />
            <DetailImage label='Foto Potensi Desa' section='10' />
            <DetailInput
              label='Mata Pencaharian'
              section='10'
              type='text'
              value={btsMain?.section10?.matapencaharian}
            />
            <DetailInput
              label='Jumlah Pemilik Hp'
              section='10'
              type='number'
              satuan='Orang'
              value={btsMain?.section10?.jumlahpemilikhp}
            />
            <DetailCheckbox
              label='Tipe Jenis Hp'
              section='10'
              name={["2G", "2G dan 4G", "Smartphone/Tablet"]}
            />
            <DetailCheckbox
              label='Jenis Sim Card Operator'
              section='10'
              name={[
                "Telkomsel",
                "Indosat",
                "XL",
                "Smartfren",
                "H3I",
                "Lainnya",
              ]}
            />
            <DetailDropdown
              label='Warga yang dapat dilatih tentang pengoperasian perangkat dasar / Training'
              section='10'
              dropdownItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
              value={
                btsMain?.section10
                  ?.wargayangdapatdilatihtentangpengoperasianperangkatdasartraining
              }
            />
            <DetailInput
              label='Rumah yang memiliki Genset / Solar Panel'
              section='10'
              satuan='rumah'
              type='number'
              value={btsMain?.section10?.rumahyangmemilikigensetsolarpanel}
            />
            <DetailInput
              label='Catatan Lainnya'
              section='10'
              type='text'
              value={btsMain?.section10?.catatanlainnya}
            />
            <DetailDropdown
              label='Akses Internet Non Selular'
              section='10'
              dropdownItem={[{ name: "Ada" }, { name: "Tidak Ada" }]}
              value={btsMain?.section10?.aksesinternetnonselular}
            />
            {btsMain?.section5?.desaterdekat === "Ada" && (
              <DetailInput
                isExtraInput={true}
                label='Akses Internet Non Selular Lainnya'
                section='10'
                type='text'
                value={btsMain?.section5?.aksesinternetnonselularlainnya}
              />
            )}
          </div>
        </div>
        <div className='font-weight-bold border rounded p-4 mb-2'>
          <p className='mt-4'>B. INFORMASI KOMERSIAL</p>
          <div className={`font-weight-bold`}>
            <DetailInput
              label='Jumlah Penduduk'
              section='10'
              type='number'
              satuan='Orang'
              value={btsMain?.section10?.jumlahpenduduk}
            />
            <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
              <DetailInput
                label='Jumlah Penduduk Pria'
                section='10'
                type='number'
                satuan='Orang'
                value={btsMain?.section10?.jumlahpendudukpria}
              />
              <DetailInput
                label='Jumlah Penduduk Wanita'
                section='10'
                type='number'
                satuan='Orang'
                value={btsMain?.section10?.jumlahpendudukwanita}
              />
            </div>
            <hr />
            <Label>Jumlah Penduduk Berdasarkan Umur</Label>
            <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
              <DetailInput
                label='Umur < 20 th'
                inputWidth='100%'
                section='10'
                type='number'
                value={btsMain?.section10?.umur20th}
              />
              <DetailInput
                label='Umur 21 - 30 th'
                inputWidth='100%'
                section='10'
                type='number'
                value={btsMain?.section10?.umur2130th}
              />
              <DetailInput
                label='Umur 31 - 40 th'
                inputWidth='100%'
                section='10'
                type='number'
                value={btsMain?.section10?.umur3140th}
              />
              <DetailInput
                label='Umur 41 - 50 th'
                inputWidth='100%'
                section='10'
                type='number'
                value={btsMain?.section10?.umur4150th}
              />
              <DetailInput
                label='Umur 51 - 60 th'
                inputWidth='100%'
                section='10'
                type='number'
                value={btsMain?.section10?.umur5160th}
              />
              <DetailInput
                label='Umur > 60 th'
                inputWidth='100%'
                section='10'
                type='number'
                value={btsMain?.section10?.umur60th}
              />
            </div>
            <Label>Jumlah Penduduk Berdasarkan Pendidikan</Label>
            <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
              <DetailInput
                label='Tidak Sekolah'
                section='10'
                type='number'
                value={btsMain?.section10?.tidaksekolah}
              />
              <DetailInput
                label='SD'
                section='10'
                type='number'
                value={btsMain?.section10?.sd}
              />
              <DetailInput
                label='SMP'
                section='10'
                type='number'
                value={btsMain?.section10?.smp}
              />
              <DetailInput
                label='SMU'
                section='10'
                type='number'
                value={btsMain?.section10?.smu}
              />
              <DetailInput
                label='Akademi'
                section='10'
                type='number'
                value={btsMain?.section10?.akademi}
              />
              <DetailInput
                label='Sarjana'
                section='10'
                type='number'
                value={btsMain?.section10?.sarjana}
              />
            </div>
            <hr />
            <DetailInput
              label='Empat (4) Bidang Pekerjaan Utama'
              section='10'
              type='text'
              value={btsMain?.section10?.empat4bidangpekerjaanutama}
            />
            <DetailInput
              label='Pengeluaran Rata-Rata Perbulan Rumah Tangga'
              section='10'
              type='text'
              value={btsMain?.section10?.pengeluaranratarataperbulanrumahtangga}
            />
            <DetailInput
              label='Harapan Pengeluaran Pulsa Perbulan Rumah Tangga'
              section='10'
              type='text'
              value={
                btsMain?.section10?.harapanpengeluaranpulsaperbulanrumahtangga
              }
            />
          </div>
          <hr />
          <Label>Fasilitas Desa</Label>
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailInput
              label='Pasar Desa'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.pasardesa}
            />
            <DetailInput
              label='Jarak Pasar Desa'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakpasardesa}
            />
            <DetailInput
              label='Pasar Kota'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.pasarkota}
            />
            <DetailInput
              label='Jarak Pasar Kota'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakpasarkota}
            />
            <DetailInput
              label='Sekolah'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.sekolah}
            />
            <DetailInput
              label='Jarak Sekolah'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jaraksekolah}
            />
          </div>
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailInput
              label='Industri'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.industri}
            />
            <DetailInput
              label='Jarak Industri'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakindustri}
            />
            <DetailInput
              label='Koperasi'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.koperasi}
            />
            <DetailInput
              label='Jarak Koperasi'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakkoperasi}
            />
            <DetailInput
              label='Puskesmas/RSU'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.puskesmasrsu}
            />
            <DetailInput
              label='Jarak Puskesmas/RSU'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakpuskesmasrsu}
            />
          </div>
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailInput
              label='Dermaga'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.dermaga}
            />
            <DetailInput
              label='Jarak Dermaga'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakdermaga}
            />
            <DetailInput
              label='Tambang'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.tambang}
            />
            <DetailInput
              label='Jarak Tambang'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jaraktambang}
            />
            <DetailInput
              label='Perkebunan'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.perkebunan}
            />
            <DetailInput
              label='Jarak Perkebunan'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakperkebunan}
            />
          </div>
          <InfoText text1='Tuliskan "Tidak Ada" jika tidak ada' />
          <hr />
          <Label>Supply Chain Management</Label>
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailInput
              label='Kios Voucher'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.kiosvoucher}
            />
            <DetailInput
              label='Jarak Kios Voucher'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakkiosvoucher}
            />
            <DetailInput
              label='Bank'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.bank}
            />
            <DetailInput
              label='Jarak Bank'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakbank}
            />
            <DetailInput
              label='Kantor Pos'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.kantorpos}
            />
            <DetailInput
              label='Jarak Kantor Pos'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakkantorpos}
            />
          </div>
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailImage label='Foto Kios Voucher' section='10' />
            <DetailImage label='Foto Bank' section='10' />
            <DetailImage label='Foto Kantor Pos' section='10' />
          </div>
          <hr />
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailInput
              label='Toko Ritel'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.tokoritel}
            />
            <DetailInput
              label='Jarak Toko Ritel'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jaraktokoritel}
            />
            <DetailInput
              label='Kios Listrik'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.kioslistrik}
            />
            <DetailInput
              label='Jarak Kios Listrik'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakkioslistrik}
            />
            <DetailInput
              label='Operator'
              inputWidth='80%'
              section='10'
              type='text'
              value={btsMain?.section10?.operator}
            />
            <DetailInput
              label='Jarak Operator'
              inputWidth='80%'
              section='10'
              type='number'
              satuan='KM'
              value={btsMain?.section10?.jarakoperator}
            />
          </div>
          <div className='form-group d-flex flex-row align-items-center justify-content-center gap8'>
            <DetailImage label='Foto Toko Ritel' section='10' />
            <DetailImage label='Foto Kios Listrik' section='10' />
            <DetailImage label='Foto Operator' section='10' />
          </div>
        </div>
        <div className='font-weight-bold border rounded p-4 mb-2'>
          <div className={`font-weight-bold`}>
            <DetailInput
              label='Keterangan Tambahan'
              section='10'
              type='text'
              value={btsMain?.section10?.keterangantambahan}
            />
          </div>
        </div>
        <NextPrevButtons
          section='10'
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

export default Section10;
