import React from "react";
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
  setSection21,
  setSection22,
} from "../../../store/formSurveyStaff/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailInput(props) {
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
  const section21 = useSelector((state) => state.FormSurveyStaff.section21);
  const section22 = useSelector((state) => state.FormSurveyStaff.section22);

  // // for redux
  // const breadcrumbItem = useSelector(
  //   (state) => state.BreadcrumbReducer.breadcrumbItem
  // );

  return (
    <div className='d-flex flex-column px-0 flex-grow-1'>
      <div className='form-group'>
        <label className='px-0'>{props.label}</label>
        <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            style={{
              width: props.inputWidth ?? "90%",
              border: "none",
              outline: "none",
            }}
            type={props.type}
            // className='form-control'
            value={props.value}
            placeholder={props.label}
            onKeyDown={(e) =>
              props.type === "number" && e.key === "e" && e.preventDefault()
            }
            pattern={props.type === "tel" && `[+]{1}[0-9]{11,14}`}
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
                          lamaperjalanankekotaterdekat: e.target.value,
                        })
                      );
                      break;
                    case "Keberangkatan Dari kota Terdekat":
                      dispatch(
                        setSection2({
                          ...section2,
                          keberangkatandarikotaterdekat: e.target.value,
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
                    case "Altitude (ASL)":
                      dispatch(
                        setSection3({
                          ...section3,
                          koordinatgpswgs84_height: e.target.value,
                        })
                      );
                      break;
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
                    // case "Populasi (Orang/KK)":
                    //   dispatch(
                    //     setSection10({
                    //       ...section10,
                    //       populasiorangkk: e.target.value,
                    //     })
                    //   );
                    //   break;
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
                    case "Keterangan":
                      dispatch(
                        setSection11({
                          ...section11,
                          deskripsi: e.target.value,
                        })
                      );
                      break;
                    case "Latitude":
                      dispatch(
                        setSection11({
                          ...section11,
                          lat: e.target.value,
                        })
                      );
                      break;
                    case "Longitude":
                      dispatch(
                        setSection11({
                          ...section11,
                          lon: e.target.value,
                        })
                      );
                      break;

                    default:
                      dispatch(
                        setSection11({
                          ...section11,
                        })
                      );
                      break;
                  }
                  break;

                case "12":
                  switch (props.label) {
                    case "Latitude":
                      dispatch(
                        setSection12({
                          ...section12,
                          layoutsite: {
                            ...section12.layoutsite,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;

                    case "Longitude":
                      dispatch(
                        setSection12({
                          ...section12,
                          layoutsite: {
                            ...section12.layoutsite,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;

                    case "Deskripsi":
                      dispatch(
                        setSection12({
                          ...section12,
                          layoutsite: {
                            ...section12.layoutsite,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
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
                    case "Latitude Lahan Kandidat":
                      dispatch(
                        setSection13({
                          ...section13,
                          gambarlahan: {
                            ...section13.gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Lahan Kandidat":
                      dispatch(
                        setSection13({
                          ...section13,
                          gambarlahan: {
                            ...section13.gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Lahan Kandidat":
                      dispatch(
                        setSection13({
                          ...section13,
                          gambarlahan: {
                            ...section13.gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Marking GPS":
                      dispatch(
                        setSection13({
                          ...section13,
                          makinggps: {
                            ...section13.makinggps,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Marking GPS":
                      dispatch(
                        setSection13({
                          ...section13,
                          makinggps: {
                            ...section13.makinggps,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Marking GPS":
                      dispatch(
                        setSection13({
                          ...section13,
                          makinggps: {
                            ...section13.makinggps,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sisi Utara":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisiutara: {
                            ...section13.fotosisiutara,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sisi Utara":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisiutara: {
                            ...section13.fotosisiutara,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Foto Sisi Utara":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisiutara: {
                            ...section13.fotosisiutara,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sisi Timur":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisitimur: {
                            ...section13.fotosisitimur,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sisi Timur":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisitimur: {
                            ...section13.fotosisitimur,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Foto Sisi Timur":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisitimur: {
                            ...section13.fotosisitimur,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sisi Selatan":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisiselatan: {
                            ...section13.fotosisiselatan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sisi Selatan":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisiselatan: {
                            ...section13.fotosisiselatan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Foto Sisi Selatan":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisiselatan: {
                            ...section13.fotosisiselatan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sisi Barat":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisibarat: {
                            ...section13.fotosisibarat,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sisi Barat":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisibarat: {
                            ...section13.fotosisibarat,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Foto Sisi Barat":
                      dispatch(
                        setSection13({
                          ...section13,
                          fotosisibarat: {
                            ...section13.fotosisibarat,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    default:
                      dispatch(
                        setSection13({
                          ...section13,
                        })
                      );
                      break;
                  }
                  break;

                case "14":
                  switch (props.index) {
                    case 0:
                      switch (props.label) {
                        case "Derajat":
                          dispatch(
                            setSection14({
                              ...section14,
                              coverageandobstacleinformation: [
                                {
                                  data: {
                                    ...section14.coverageandobstacleinformation[
                                      props.index
                                    ].data,
                                    derajat: e.target.value,
                                  },
                                },
                              ],
                            })
                          );
                          break;

                        case "Jarak":
                          dispatch(
                            setSection14({
                              ...section14,
                              coverageandobstacleinformation: [
                                {
                                  data: {
                                    ...section14.coverageandobstacleinformation[
                                      props.index
                                    ].data,
                                    jarak: e.target.value,
                                  },
                                },
                              ],
                            })
                          );
                          break;

                        case "Deskripsi":
                          dispatch(
                            setSection14({
                              ...section14,
                              coverageandobstacleinformation: [
                                {
                                  data: {
                                    ...section14.coverageandobstacleinformation[
                                      props.index
                                    ].data,
                                    deskripsi: e.target.value,
                                  },
                                },
                              ],
                            })
                          );
                          break;

                        default:
                          break;
                      }

                      break;

                    default:
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
                  switch (props.segment) {
                    case "Location Mapping":
                      switch (props.label) {
                        case "Latitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              locationmapping: {
                                ...section17.locationmapping,
                                lat: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Longitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              locationmapping: {
                                ...section17.locationmapping,
                                lon: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Keterangan Location Mapping":
                          dispatch(
                            setSection17({
                              ...section17,
                              locationmapping: {
                                ...section17.locationmapping,
                                deskripsi: e.target.value,
                              },
                            })
                          );
                          break;
                      }
                      break;

                    case "Posisi Yang Diusulkan":
                      switch (props.label) {
                        case "Latitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              posisiyangditawarkan: {
                                ...section17.posisiyangditawarkan,
                                lat: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Longitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              posisiyangditawarkan: {
                                ...section17.posisiyangditawarkan,
                                lon: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Elevasi":
                          dispatch(
                            setSection17({
                              ...section17,
                              posisiyangditawarkan: {
                                ...section17.posisiyangditawarkan,
                                elevasi: e.target.value,
                              },
                            })
                          );
                          break;
                      }
                      break;

                    case "Kandidat 1":
                      switch (props.label) {
                        case "Latitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              kandidat1: {
                                ...section17.kandidat1,
                                lat: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Longitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              kandidat1: {
                                ...section17.kandidat1,
                                lon: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Elevasi":
                          dispatch(
                            setSection17({
                              ...section17,
                              kandidat1: {
                                ...section17.kandidat1,
                                elevasi: e.target.value,
                              },
                            })
                          );
                          break;
                      }
                      break;

                    case "Kandidat 2":
                      switch (props.label) {
                        case "Latitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              kandidat2: {
                                ...section17.kandidat2,
                                lat: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Longitude":
                          dispatch(
                            setSection17({
                              ...section17,
                              kandidat2: {
                                ...section17.kandidat2,
                                lon: e.target.value,
                              },
                            })
                          );
                          break;
                        case "Elevasi":
                          dispatch(
                            setSection17({
                              ...section17,
                              kandidat2: {
                                ...section17.kandidat2,
                                elevasi: e.target.value,
                              },
                            })
                          );
                          break;
                      }
                      break;

                    default:
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
                    case "Latitude Sector 0°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector0gambarlahan: {
                            ...section19.sector0gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 45°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector45gambarlahan: {
                            ...section19.sector45gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 90°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector90gambarlahan: {
                            ...section19.sector90gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 135°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector135gambarlahan: {
                            ...section19.sector135gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 180°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector180gambarlahan: {
                            ...section19.sector180gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 225°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector225gambarlahan: {
                            ...section19.sector225gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 270°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector270gambarlahan: {
                            ...section19.sector270gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Sector 315°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector315gambarlahan: {
                            ...section19.sector315gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;

                    case "Longitude Sector 0°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector0gambarlahan: {
                            ...section19.sector0gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 45°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector45gambarlahan: {
                            ...section19.sector45gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 90°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector90gambarlahan: {
                            ...section19.sector90gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 135°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector135gambarlahan: {
                            ...section19.sector135gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 180°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector180gambarlahan: {
                            ...section19.sector180gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 225°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector225gambarlahan: {
                            ...section19.sector225gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 270°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector270gambarlahan: {
                            ...section19.sector270gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Sector 315°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector315gambarlahan: {
                            ...section19.sector315gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;

                    case "Keterangan Gambar Lahan Sector 0°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector0gambarlahan: {
                            ...section19.sector0gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 45°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector45gambarlahan: {
                            ...section19.sector45gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 90°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector90gambarlahan: {
                            ...section19.sector90gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 135°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector135gambarlahan: {
                            ...section19.sector135gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 180°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector180gambarlahan: {
                            ...section19.sector180gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 225°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector225gambarlahan: {
                            ...section19.sector225gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 270°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector270gambarlahan: {
                            ...section19.sector270gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Gambar Lahan Sector 315°":
                      dispatch(
                        setSection19({
                          ...section19,
                          sector315gambarlahan: {
                            ...section19.sector315gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                  }
                  break;

                case "20":
                  switch (props.label) {
                    case "Latitude Site 1":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite1gambarlahan: {
                            ...section20.aksessite1gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Site 2":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite2gambarlahan: {
                            ...section20.aksessite2gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Site 3":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite3gambarlahan: {
                            ...section20.aksessite3gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Latitude Site 4":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite4gambarlahan: {
                            ...section20.aksessite4gambarlahan,
                            lat: e.target.value,
                          },
                        })
                      );
                      break;

                    case "Longitude Site 1":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite1gambarlahan: {
                            ...section20.aksessite1gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Site 2":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite2gambarlahan: {
                            ...section20.aksessite2gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Site 3":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite3gambarlahan: {
                            ...section20.aksessite3gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Longitude Site 4":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite4gambarlahan: {
                            ...section20.aksessite4gambarlahan,
                            lon: e.target.value,
                          },
                        })
                      );
                      break;

                    case "Keterangan Akses Site 1":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite1gambarlahan: {
                            ...section20.aksessite1gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Akses Site 2":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite2gambarlahan: {
                            ...section20.aksessite2gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Akses Site 3":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite3gambarlahan: {
                            ...section20.aksessite3gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                    case "Keterangan Akses Site 4":
                      dispatch(
                        setSection20({
                          ...section20,
                          aksessite4gambarlahan: {
                            ...section20.aksessite4gambarlahan,
                            deskripsi: e.target.value,
                          },
                        })
                      );
                      break;
                  }
                  break;

                case "21":
                  switch (props.label) {
                    case "Keterangan Tambahan":
                      dispatch(
                        setSection21({
                          ...section21,
                          keterangantambahan: e.target.value,
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
          <div className='d-flex flex-row flex-grow-1 align-items-center'>
            {props.satuan !== "" && (
              <span className='ml-auto font-weight-bold  mb-0'>
                {props.satuan}
              </span>
            )}
          </div>
          {props.message ? (
            props.message !== "" ? (
              <span style={{ color: "red" }}> {props.message}</span>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='mb-2'>
        {props.asterisk ? (
          <p className={`font-weight-normal text-info`}>* {props.asterisk}</p>
        ) : (
          <></>
        )}
        {props.asterisk2 ? (
          <p className={`font-weight-normal text-info`}>* {props.asterisk2}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DetailInput;
