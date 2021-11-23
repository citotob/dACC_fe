import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap";

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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailDatePicker(props) {
  const dispatch = useDispatch();
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

  const moment = require("moment");
  let today = new Date();
  let todayDate = moment(today).format("YYYY-MM-DD");

  return (
    <div className='d-flex flex-column px-0'>
      <div className='form-group'>
        <label className='col-4 px-0'>{props.label}</label>
        <div className='d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            className='form-control'
            type='date'
            defaultValue={todayDate}
            onChange={(e) => {
              switch (props.section) {
                case "1":
                  switch (props.label) {
                    case "Kontraktor":
                      dispatch(
                        setSection1({
                          ...section1,
                          disiapkanoleh: e.target.value,
                        })
                      );
                      break;
                    case "Nama Project":
                      dispatch(
                        setSection1({
                          ...section1,
                          namaproject: e.target.value,
                        })
                      );
                      break;
                    case "Tanggal Survey":
                      dispatch(
                        setSection1({
                          ...section1,
                          tanggalkunjungan: e.target.value,
                        })
                      );
                      break;
                    case "Nama Surveyor":
                      dispatch(
                        setSection1({
                          ...section1,
                          namasurveyor: e.target.value,
                        })
                      );
                      break;
                    case "Nomor Telepon":
                      dispatch(
                        setSection1({
                          ...section1,
                          nomortelepon: e.target.value,
                        })
                      );
                      break;
                    case "Email":
                      dispatch(
                        setSection1({
                          ...section1,
                          email: e.target.value,
                        })
                      );
                      break;
                    case "Status Site":
                      dispatch(
                        setSection1({
                          ...section1,
                          statussite: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection1({
                          ...section1,
                        })
                      );
                      break;
                  }
                  break;

                case "2":
                  switch (props.label) {
                    case "Nama Site":
                      dispatch(
                        setSection2({
                          ...section2,
                          namasite: e.target.value,
                        })
                      );
                      break;
                    case "Tipe Site":
                      dispatch(
                        setSection2({
                          ...section2,
                          tipesite: e.target.value,
                        })
                      );
                      break;
                    case "Tipe Coverage Area Site":
                      dispatch(
                        setSection2({
                          ...section2,
                          tipecakupansite: e.target.value,
                        })
                      );
                      break;
                    case "Alamat dan Kode Pos":
                      dispatch(
                        setSection2({
                          ...section2,
                          alamat: e.target.value,
                        })
                      );
                      break;
                    case "Contact Person Pemilik":
                      dispatch(
                        setSection2({
                          ...section2,
                          namapicdaerah: e.target.value,
                        })
                      );
                      break;
                    case "No Tlp":
                      dispatch(
                        setSection2({
                          ...section2,
                          nomorteleponpic: e.target.value,
                        })
                      );
                      break;
                    case "Alamat Contact Person":
                      dispatch(
                        setSection2({
                          ...section2,
                          alamatpicdaerah: e.target.value,
                        })
                      );
                      break;
                    case "Akses ke Lokasi Site":
                      dispatch(
                        setSection2({
                          ...section2,
                          akseskelokasi: e.target.value,
                        })
                      );
                      break;
                    case "Jarak Dari Lokasi Site ke Jalur Utama ":
                      dispatch(
                        setSection2({
                          ...section2,
                          jarakdarisitekajalanutama: e.target.value,
                        })
                      );
                      break;
                    case "Akses ke Lokasi Site (jarak)":
                      dispatch(
                        setSection2({
                          ...section2,
                          luasaksesjalan: e.target.value,
                        })
                      );
                      break;
                    case "Kondisi Jalan Akses lokasi":
                      dispatch(
                        setSection2({
                          ...section2,
                          kondisiaksesjalan: e.target.value,
                        })
                      );
                      break;
                    case "Jalan Akses Lokasi":
                      dispatch(
                        setSection2({
                          ...section2,
                          aksesdarat: e.target.value,
                        })
                      );
                      break;
                    case "Akses Sungai atau Laut":
                      dispatch(
                        setSection2({
                          ...section2,
                          aksessungailaut: e.target.value,
                        })
                      );
                      break;
                    case "Waktu Perjalanan":
                      dispatch(
                        setSection2({
                          ...section2,
                          jaraktempuh: e.target.value,
                        })
                      );
                      break;
                    case "Ijin ke Lokasi":
                      dispatch(
                        setSection2({
                          ...section2,
                          perizinanakseskesite: e.target.value,
                        })
                      );
                      break;
                    case "Lama Perjalanan ke Kota Terdekat":
                      dispatch(
                        setSection2({
                          ...section2,
                          jarakdarikotakelokasidannamakota: e.target.value,
                        })
                      );
                      break;
                    case "Kondisi Gudang Penyimpanan":
                      dispatch(
                        setSection2({
                          ...section2,
                          kondisiperalatan: e.target.value,
                        })
                      );
                      break;
                    case "Tipe Antenna":
                      dispatch(
                        setSection2({
                          ...section2,
                          pilihtipeantena: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection2({
                          ...section2,
                        })
                      );
                      break;
                  }

                case "3":
                  switch (props.label) {
                    case "Koordinat GPS WGS84 - Latitude":
                      dispatch(
                        setSection3({
                          ...section3,
                          koordinatgpswgs84_lat: e.target.value,
                        })
                      );
                      break;
                    case "Koordinat GPS WGS84 - Longitude":
                      dispatch(
                        setSection3({
                          ...section3,
                          koordinatgpswgs84_long: e.target.value,
                        })
                      );
                      break;
                    case "Tinggi Tower / Pole":
                      dispatch(
                        setSection3({
                          ...section3,
                          tinggitowerpole: e.target.value,
                        })
                      );
                      break;
                    case "Tipe Tower":
                      dispatch(
                        setSection3({
                          ...section3,
                          tipetower: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection3({
                          ...section3,
                        })
                      );
                      break;
                  }
                  break;

                case "4":
                  switch (props.label) {
                    case "Penempatan Antenna":
                      dispatch(
                        setSection4({
                          ...section4,
                          penempatanantena: e.target.value,
                        })
                      );
                      break;
                    case "Mounting Antenna":
                      dispatch(
                        setSection4({
                          ...section4,
                          alasantena: e.target.value,
                        })
                      );
                      break;
                    case "Diameter Antenna":
                      dispatch(
                        setSection4({
                          ...section4,
                          diameterantena: e.target.value,
                        })
                      );
                      break;
                    case "Satelit Yang Akan Digunakan":
                      dispatch(
                        setSection4({
                          ...section4,
                          penggunaansatelit: e.target.value,
                        })
                      );
                      break;
                    case "Azimuth":
                      dispatch(
                        setSection4({
                          ...section4,
                          azimuth: e.target.value,
                        })
                      );
                      break;
                    case "Elevasi":
                      dispatch(
                        setSection4({
                          ...section4,
                          elevasi: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection4({
                          ...section4,
                        })
                      );
                      break;
                  }
                  break;

                case "5":
                  switch (props.label) {
                    case "Posisi Tower/Pole":
                      dispatch(
                        setSection5({
                          ...section5,
                          ketinggiantowerpole: e.target.value,
                        })
                      );
                      break;
                    case "Status Kepemilikan Lahan":
                      dispatch(
                        setSection5({
                          ...section5,
                          kepemilikanlahan: e.target.value,
                        })
                      );
                      break;
                    case "Nama Pemilik Lahan":
                      dispatch(
                        setSection5({
                          ...section5,
                          namapemiliklahan: e.target.value,
                        })
                      );
                      break;
                    case "No Tlp Pemilik Lahan":
                      dispatch(
                        setSection5({
                          ...section5,
                          nomorpemiliklahan: e.target.value,
                        })
                      );
                      break;
                    case "Status Kondisi Lahan":
                      dispatch(
                        setSection5({
                          ...section5,
                          kondisilahan: e.target.value,
                        })
                      );
                      break;
                    case "Kondisi Sosial":
                      dispatch(
                        setSection5({
                          ...section5,
                          kondisisosial: e.target.value,
                        })
                      );
                      break;
                    case "Keamanan":
                      dispatch(
                        setSection5({
                          ...section5,
                          keamanan: e.target.value,
                        })
                      );
                      break;
                    case "Luas Lahan":
                      dispatch(
                        setSection5({
                          ...section5,
                          luaslahan: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection5({
                          ...section5,
                        })
                      );
                      break;
                  }
                  break;

                case "6":
                  switch (props.label) {
                    case "Ketersediaan Coverage dalam Radius <2 km dari Site":
                      dispatch(
                        setSection6({
                          ...section6,
                          kemampuanjarakradius5kmdarisite: e.target.value,
                        })
                      );
                      break;
                    case "Ketersediaan Sinyal":
                      dispatch(
                        setSection6({
                          ...section6,
                          tipesinyalyangtersedia: e.target.value,
                        })
                      );
                      break;
                    case "Level Sinyal di HP (Jika ada Coverage)":
                      dispatch(
                        setSection6({
                          ...section6,
                          levelsinyal4gjikaadajangkauan: e.target.value,
                        })
                      );
                      break;
                    case "Call di Site":
                      dispatch(
                        setSection6({
                          ...section6,
                          calldisite: e.target.value,
                        })
                      );
                      break;
                    case "SMS di Site":
                      dispatch(
                        setSection6({
                          ...section6,
                          smsdisite: e.target.value,
                        })
                      );
                      break;
                    case "Nama Operator":
                      dispatch(
                        setSection6({
                          ...section6,
                          namaoperator: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection6({
                          ...section6,
                        })
                      );
                      break;
                  }
                  break;

                case "7":
                  switch (props.label) {
                    case "Topografi Umum":
                      dispatch(
                        setSection7({
                          ...section7,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                    case "Keterangan Area Cakupan (Banyak Cakupan)":
                      dispatch(
                        setSection7({
                          ...section7,
                          deskripsiareajangkauan: e.target.value,
                        })
                      );
                      break;
                    case "Keterangan Lahan":
                      dispatch(
                        setSection7({
                          ...section7,
                          tipeproperty: e.target.value,
                        })
                      );
                      break;
                    case "Status Lahan":
                      dispatch(
                        setSection7({
                          ...section7,
                          statuslahan: e.target.value,
                        })
                      );
                      break;
                    case "Pengurusan IMB":
                      dispatch(
                        setSection7({
                          ...section7,
                          pengurusanimb: e.target.value,
                        })
                      );
                      break;
                    case "Klasifikasi Tanah":
                      dispatch(
                        setSection7({
                          ...section7,
                          landclassification: e.target.value,
                        })
                      );
                      break;

                    case "Obyek Penghalang":
                      dispatch(
                        setSection7({
                          ...section7,
                          obyekpenghalang: e.target.value,
                        })
                      );
                      break;

                    case "Tata Ruang":
                      dispatch(
                        setSection7({
                          ...section7,
                          kondisiperubahanlahan: e.target.value,
                        })
                      );
                      break;

                    case "Jenis Lahan":
                      dispatch(
                        setSection7({
                          ...section7,
                          tipetanah: e.target.value,
                        })
                      );
                      break;

                    case "Dekat Laut / Sungai":
                      dispatch(
                        setSection7({
                          ...section7,
                          dekatlautsungai: e.target.value,
                        })
                      );
                      break;

                    case "Resiko Bencana":
                      dispatch(
                        setSection7({
                          ...section7,
                          resikobencana: e.target.value,
                        })
                      );
                      break;

                    case "Sumber Daya Setempat (SDA/SDM)":
                      dispatch(
                        setSection7({
                          ...section7,
                          materialsetempat: e.target.value,
                        })
                      );
                      break;

                    case "Resiko Relokasi":
                      dispatch(
                        setSection7({
                          ...section7,
                          resikorelokasi: e.target.value,
                        })
                      );
                      break;

                    case "Resiko Komplain":
                      dispatch(
                        setSection7({
                          ...section7,
                          resikokeluhan: e.target.value,
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection7({
                          ...section7,
                        })
                      );
                      break;
                  }
                  break;

                case "8":
                  switch (props.label) {
                    case "Jenis Sumber Listrik":
                      dispatch(
                        setSection8({
                          ...section8,
                          sumberdaya: e.target.value,
                        })
                      );
                      break;
                    case "Kapasitas Sumber  Listrik ":
                      dispatch(
                        setSection8({
                          ...section8,
                          kemampuankelistrikan: e.target.value,
                        })
                      );
                      break;
                    case "Kekuatan Kelistrikan":
                      dispatch(
                        setSection8({
                          ...section8,
                          kekuatankelistrikan: e.target.value,
                        })
                      );
                      break;
                    case "Jam Operasi Sumber Listrik":
                      dispatch(
                        setSection8({
                          ...section8,
                          jumlahjamketersediaanlistrik: e.target.value,
                        })
                      );
                      break;
                    case "Jarak Perangkat ke Sumber Listrik Terdekat":
                      dispatch(
                        setSection8({
                          ...section8,
                          jarakdarisumberdayalistrik: e.target.value,
                        })
                      );
                      break;
                    case "Generator Backup":
                      dispatch(
                        setSection8({
                          ...section8,
                          generatorbackup: e.target.value,
                        })
                      );
                      break;
                    case "Pasokan BBM":
                      dispatch(
                        setSection8({
                          ...section8,
                          kemampuanbahanbensin: e.target.value,
                        })
                      );
                      break;
                    case "Jenis BBM yang Sering Tersedia":
                      dispatch(
                        setSection8({
                          ...section8,
                          tipebahanbakaryangtersedia: e.target.value,
                        })
                      );
                      break;
                    case "Harga BBM di Lokasi":
                      dispatch(
                        setSection8({
                          ...section8,
                          hargabbmdilokasi: e.target.value,
                        })
                      );
                      break;
                    case "Listrik Bisa Dipakai Untuk Perangkat":
                      dispatch(
                        setSection8({
                          ...section8,
                          listrikbisadigunakanuntukalat: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "9":
                  switch (props.label) {
                    case "Status Kepemilikan Surat Tanah":
                      dispatch(
                        setSection9({
                          ...section9,
                          suratkepimilikantanah: e.target.value,
                        })
                      );
                      break;
                    case "Ijin yang Dibutuhkan":
                      dispatch(
                        setSection9({
                          ...section9,
                          kebutuhanizin: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "10":
                  switch (props.label) {
                    case "Populasi (Orang/KK)":
                      dispatch(
                        setSection10({
                          ...section10,
                          populasiorangkk: e.target.value,
                        })
                      );
                      break;
                    case "Kepadatan Penduduk":
                      dispatch(
                        setSection10({
                          ...section10,
                          kepadatanpopulasi: e.target.value,
                        })
                      );
                      break;
                    case "Distribusi Penduduk":
                      dispatch(
                        setSection10({
                          ...section10,
                          distribusipopulasi: e.target.value,
                        })
                      );
                      break;
                    case "Desa Terdekat":
                      dispatch(
                        setSection10({
                          ...section10,
                          desaterdekat: e.target.value,
                        })
                      );
                      break;
                    case "Jarak Desa Terdekat":
                      dispatch(
                        setSection10({
                          ...section10,
                          jarakdesaterdekat: e.target.value,
                        })
                      );
                      break;
                    case "Mata Pencaharian":
                      dispatch(
                        setSection10({
                          ...section10,
                          livelihood: e.target.value,
                        })
                      );
                      break;
                    case "Jumlah Pemilik Hp":
                      dispatch(
                        setSection10({
                          ...section10,
                          populasipenggunatelfongenggam: e.target.value,
                        })
                      );
                      break;
                    case "Tipe Jenis Hp":
                      dispatch(
                        setSection10({
                          ...section10,
                          tipepenggunatelfongenggam: e.target.value,
                        })
                      );
                      break;
                    case "Jenis Sim Card Operator":
                      dispatch(
                        setSection10({
                          ...section10,
                          simcardyangtersedia: e.target.value,
                        })
                      );
                      break;
                    case "Warga yang dapat dilatih tentang pengoperasian perangkat dasar / Training":
                      dispatch(
                        setSection10({
                          ...section10,
                          pendudukyangbisadilatihuntukmenggunakanprodukjasa:
                            e.target.value,
                        })
                      );
                      break;
                    case "Rumah yang memiliki Genset / Solar Panel":
                      dispatch(
                        setSection10({
                          ...section10,
                          rumahyangmempunyaigenerator: e.target.value,
                        })
                      );
                      break;
                    case "Catatan Lainnya":
                      dispatch(
                        setSection10({
                          ...section10,
                          catatanlainnya: e.target.value,
                        })
                      );
                      break;
                    case "Akses Internet Non Selular":
                      dispatch(
                        setSection10({
                          ...section10,
                          aksesinternet: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "11":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection11({
                          ...section11,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "12":
                  switch (props.label) {
                    case "Tower ke Source Power (if any)":
                      dispatch(
                        setSection12({
                          ...section12,
                          towerkesumberdaya: e.target.value,
                        })
                      );
                      break;
                    case "Tower ke Antenna VSAT":
                      dispatch(
                        setSection12({
                          ...section12,
                          towerkeantenavsat: e.target.value,
                        })
                      );
                      break;
                    case "Tower ke Solar Panel":
                      dispatch(
                        setSection12({
                          ...section12,
                          towerkesolarpanel: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "13":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection13({
                          ...section13,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "14":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection14({
                          ...section14,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "15":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection15({
                          ...section15,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "16":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection16({
                          ...section16,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "17":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection17({
                          ...section17,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "18":
                  switch (props.label) {
                    case "Sector 0°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector0: e.target.value,
                        })
                      );
                      break;
                    case "Sector 45°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector45: e.target.value,
                        })
                      );
                      break;
                    case "Sector 90°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector90: e.target.value,
                        })
                      );
                      break;
                    case "Sector 135°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector135: e.target.value,
                        })
                      );
                      break;
                    case "Sector 180°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector180: e.target.value,
                        })
                      );
                      break;
                    case "Sector 225°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector225: e.target.value,
                        })
                      );
                      break;
                    case "Sector 270°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector270: e.target.value,
                        })
                      );
                      break;
                    case "Sector 315°":
                      dispatch(
                        setSection18({
                          ...section18,
                          sector315: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "19":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection19({
                          ...section19,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "20":
                  switch (props.label) {
                    case "":
                      dispatch(
                        setSection20({
                          ...section20,
                          topografiumum: e.target.value,
                        })
                      );
                      break;
                  }
                  break;

                case "22":
                  switch (props.label) {
                    case "General Comment":
                      dispatch(
                        setSection22({
                          ...section22,
                          generalcomment: e.target.value,
                        })
                      );
                      break;
                  }
                  break;
                default:
                  break;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailDatePicker;
