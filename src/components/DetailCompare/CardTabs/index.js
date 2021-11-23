import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "reactstrap";
import classnames from "classnames";

//Import Style
import style from "./style.module.scss";

import Detail from "./DetailList.js";
import Image from "./ImageList.js";
import Obstacle from "./ObstacleList.js";
import LocationMapping from "./LocationMappingList";
import get from "lodash/get";
import Lightbox from "../../UILightbox/Lightbox";
import { setBTSData1 } from "../../../store/compareBTS/action";

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

const Section1 = ({ data }) => {
  return (
    <CardBody>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 1</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Informasi Survey</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Disiapkan Oleh'
              value={get(data.page1, "disiapkanoleh", "-")}
            />
            <Detail
              label='Nama Project'
              value={get(data.page1, "namaproject", "-")}
            />

            <Detail
              label='Tanggal Kunjungan'
              value={get(data.page1, "tanggalkunjungan", "-")}
            />
            <Detail
              label='Nama Surveyor'
              value={get(data.page1, "namasurveyor", "-")}
            />
            <Detail
              label='Nomor Telepon'
              value={get(data.page1, "nomortelepon", "-")}
            />
            <Detail label='Email' value={get(data.page1, "email", "-")} />
            <Detail
              label='Status Site'
              value={get(data.page1, "statussite", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section2 = ({ data }) => {
  return (
    <CardBody>
      {data.page2 ? (
        <>
          <span className={style.section}>Section 2</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Informasi Umum</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Nama Site'
              value={get(data.page2, "namasite", "-")}
            />
            <Detail
              label='Tipe Site'
              value={get(data.page2, "tipesite", "-")}
            />

            <Detail
              label='Tipe Cakupan Site'
              value={get(data.page2, "tipecakupansite", "-")}
            />
            <Detail label='Alamat' value={get(data.page2, "alamat", "-")} />
            <Detail
              label='Nama PIC Daerah'
              value={get(data.page2, "namapicdaerah", "-")}
            />
            <Detail
              label='Nomor Telepon PIC'
              value={get(data.page2, "nomorteleponpic", "-")}
            />
            <Detail
              label='Alamat PIC Daerah'
              value={get(data.page2, "alamatpicdaerah", "-")}
            />
            <Detail
              label='Akses ke Lokasi'
              value={get(data.page2, "akseskelokasi", "-")}
            />
            <Detail
              label='Jarak Dari Site ke Jalan Utama'
              value={get(data.page2, "jarakdarisitekejalanutama", "-")}
            />
            <Detail label='Luas Akses Jalan' value={get(data.page2, "", "-")} />
            <Detail
              label='Kondisi Akses Jalan'
              value={get(data.page2, "kondisiakssjalan", "-")}
            />
            <Detail
              label='Akses Darat'
              value={get(data.page2, "aksesdarat", "-")}
            />
            <Detail
              label='Akses Sungai atau Laut'
              value={get(data.page2, "aksessungailaut", "-")}
            />
            <Detail
              label='Jarak Tempuh'
              value={get(data.page2, "jaraktempuh", "-")}
            />
            <Detail
              label='Perizinan Akses ke Site'
              value={get(data.page2, "perizinanakseskesite", "-")}
            />
            <Detail
              label='Jarak dari Kota ke Lokasi dan Nama Kota'
              value={get(data.page2, "jarakdarikotakelokasidannamakota", "-")}
            />
            <Detail
              label='Kondisi Peralatan'
              value={get(data.page2, "kondisiperalatan", "-")}
            />
            <Detail
              label='Pilih Tipe Antena'
              value={get(data.page2, "pilihtipeantena", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section3 = ({ data }) => {
  return (
    <CardBody>
      {data.page3 ? (
        <>
          <span className={style.section}>Section 3</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Informasi Geografi & Tower Data
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Koordinat GPS WGS84 - Latitude'
              value={get(data.page3, "koordinatgpswgs84-lat", "-")}
            />
            <Detail
              label='Koordinat GPS WGS84 - Longitude'
              value={get(data.page3, "koordinatgpswgs84-long", "-")}
            />
            <Detail
              label='Tinggi Tower / Pole'
              value={get(data.page3, "tinggitowerpole", "-")}
            />
            <Detail
              label='Tipe Tower'
              value={get(data.page3, "tipetower", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section4 = ({ data }) => {
  return (
    <CardBody>
      {data.page4 ? (
        <>
          <span className={style.section}>Section 4</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Transmisi VSAT</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Penempatan Antena'
              value={get(data.page4, "penempatanantena", "-")}
            />
            <Detail
              label='Alas Antena'
              value={get(data.page4, "alasantena", "-")}
            />
            <Detail
              label='Diameter Antena'
              value={get(data.page4, "diameterantena", "-")}
            />
            <Detail
              label='Penggunaan Satelit'
              value={get(data.page4, "penggunaansatelit", "-")}
            />
            <Detail label='Azimuth' value={get(data.page4, "azimuth", "-")} />
            <Detail label='Elevasi' value={get(data.page4, "elevasi", "-")} />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section5 = ({ data }) => {
  return (
    <CardBody>
      {data.page5 ? (
        <>
          <span className={style.section}>Section 5</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Informasi Umum Lahan
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Ketinggian Tower/Pole'
              value={get(data.page5, "ketinggiantowerpole", "-")}
            />
            <Detail
              label='Kepemilikan Lahan'
              value={get(data.page5, "kepemilikanlahan", "-")}
            />
            <Detail
              label='Nama Pemilik Lahan'
              value={get(data.page5, "namapemiliklahan", "-")}
            />
            <Detail
              label='Nomor Pemilik Lahan'
              value={get(data.page5, "nomorpemiliklahan", "-")}
            />
            <Detail
              label='Kondisi Lahan'
              value={get(data.page5, "kondisilahan", "-")}
            />
            <Detail
              label='Kondisi Social'
              value={get(data.page5, "kondisisosial", "-")}
            />
            <Detail label='Keamanan' value={get(data.page5, "keamanan", "-")} />
            <Detail
              label='Luas Lahan'
              value={get(data.page5, "luaslahan", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section6 = ({ data }) => {
  return (
    <CardBody>
      {data.page6 ? (
        <>
          <span className={style.section}>Section 6</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Mobile Coverage on Site
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Kemampuan Jarak Radius < 5km dari Site'
              value={get(data.page6, "kemampuanjarakradius5kmdarisite", "-")}
            />
            <Detail
              label='Tipe Sinyal yang Tersedia'
              value={get(data.page6, "tipesinyalyangtersedia", "-")}
            />
            <Detail
              label='Level Sinyal 4G Jika Ada Jangkauan'
              value={get(data.page6, "levelsinyal4gjikaadajangkauan", "-")}
            />
            <Detail
              label='Call di Site'
              value={get(data.page6, "calldisite", "-")}
            />
            <Detail
              label='SMS di Site'
              value={get(data.page6, "smsdisite", "-")}
            />
            <Detail
              label='Nama Operator'
              value={get(data.page6, "namaoperator[0]", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section7 = ({ data }) => {
  return (
    <CardBody>
      {data.page7 ? (
        <>
          <span className={style.section}>Section 7</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Land Condition</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Topografi Umum'
              value={get(data.page7, "topografiumum", "-")}
            />
            <Detail
              label='Deskripsi Area Jangkauan'
              value={get(data.page7, "deskripsiareajangkauan", "-")}
            />
            <Detail
              label='Tipe Properti'
              value={get(data.page7, "tipeproperty", "-")}
            />
            <Detail
              label='Status Lahan'
              value={get(data.page7, "statuslahan", "-")}
            />
            <Detail
              label='Pengurusan IMB'
              value={get(data.page7, "pengurusanimb", "-")}
            />
            <Detail
              label='Land Classification'
              value={get(data.page7, "landclassification", "-")}
            />
            <Detail
              label='Obyek Penghalang'
              value={get(data.page7, "obyekpenghalang", "-")}
            />
            <Detail
              label='Kondisi Perubahan Lahan'
              value={get(data.page7, "kondisiperubahanlahan", "-")}
            />
            <Detail
              label='Tipe Tanah'
              value={get(data.page7, "tipetanah", "-")}
            />
            <Detail
              label='Dekat Laut / Sungai'
              value={get(data.page7, "dekatlautsungai", "-")}
            />
            <Detail
              label='Risiko Bencana'
              value={get(data.page7, "resikobencana", "-")}
            />
            <Detail
              label='Material Setempat'
              value={get(data.page7, "materialsetempat", "-")}
            />
            <Detail
              label='Risiko Relokasi'
              value={get(data.page7, "resikorelokasi", "-")}
            />
            <Detail
              label='Risiko Keluhan'
              value={get(data.page7, "resikokeluhan", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section8 = ({ data }) => {
  return (
    <CardBody>
      {data.page8 ? (
        <>
          <span className={style.section}>Section 8</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Facilities of Electricity and Support
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Sumber Daya'
              value={get(data.page8, "sumberdaya", "-")}
            />
            <Detail
              label='Kemampuan Kelistrikan'
              value={get(data.page8, "kemampuankelistrikan", "-")}
            />
            <Detail
              label='Kekuatan Kelistrikan'
              value={get(data.page8, "kekuatankelistrikan", "-")}
            />
            <Detail
              label='Jumlah Jam Ketersediaan Listrik'
              value={get(data.page8, "jumlahjamketersediaanlistrik", "-")}
            />
            <Detail
              label='Jarak Dari Sumber Daya Listrik'
              value={get(data.page8, "jarakdarisumberdayalistrik", "-")}
            />
            <Detail
              label='Generator Backup'
              value={get(data.page8, "generatorbackup", "-")}
            />
            <Detail
              label='Kemampuan Bahan Bensin'
              value={get(data.page8, "kemampuanbahanbensin", "-")}
            />
            <Detail
              label='Tipe Bahan Bakar yang Tersedia'
              value={get(data.page8, "tipebahanbakaryangtersedia", "-")}
            />
            <Detail
              label='Harga BBM di Lokasi'
              value={get(data.page8, "hargabbmdilokasi", "-")}
            />
            <Detail
              label='Listrik Bisa Digunakan Untuk Alat'
              value={get(data.page8, "listrikbisadigunakanuntukalat", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section9 = ({ data }) => {
  return (
    <CardBody>
      {data.page9 ? (
        <>
          <span className={style.section}>Section 9</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Perizinan</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Surat Kepemilikan Tanah'
              value={get(data.page9, "suratkepimilikantanah", "-")}
            />
            <Detail
              label='Kebutuhan Izin'
              value={get(data.page9, "kebutuhanizin", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section10 = ({ data }) => {
  return (
    <CardBody>
      {data.page10 ? (
        <>
          <span className={style.section}>Section 10</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Informasi Demografi
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Populasi (Orang/KK)'
              value={get(data.page10, "populasiorangkk", "-")}
            />
            <Detail
              label='Kepadatan Populasi'
              value={get(data.page10, "kepadatanpopulasi", "-") + " Orang/km2"}
            />
            <Detail
              label='Distribusi Populasi'
              value={get(data.page10, "distribusipopulasi", "-")}
            />
            <Detail
              label='Desa Terdekat'
              value={get(data.page10, "desaterdekat", "-")}
            />
            {/* <Detail label='Desa Terdekat' value={get(data.page10, "", "-")} /> */}
            <Detail
              label='Jarak Desa Terdekat'
              value={
                get(data.page10, "jarakdesaterdekat", "-") + " Jam Perjalanan"
              }
            />
            <Detail
              label='Livelihood'
              value={get(data.page10, "livelihood", "-")}
            />
            <Detail
              label='Populasi Pengguna Telepon Genggam'
              value={get(data.page10, "populasipenggunatelfongenggam", "-")}
            />
            <Detail
              label='Tipe Pengguna Telepon Genggam'
              value={data?.page10?.tipepenggunatelfongenggam.map(
                (item) => item
              )}
            />
            <Detail
              label='SIM Card yang Tersedia'
              value={data?.page10?.simcardyangtersedia.map((item) => item)}
            />
            <Detail
              label='Penduduk yang Bisa Dilatih Untuk Menggunakan Produk/Jasa'
              value={get(
                data.page10,
                "pendudukyangbisadilatihuntukmenggunakanprodukjasa",
                "-"
              )}
            />
            <Detail
              label='Rumah yang Mempunyai Generator'
              value={
                get(data.page10, "rumahyangmempunyaigenerator", "-") + " Rumah"
              }
            />
            <Detail
              label='Catatan Lainnya'
              value={get(data.page10, "catatanlainnya", "-")}
            />
            <Detail
              label='Akses Internet'
              value={get(data.page10, "aksesinternet", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section11 = ({ data }) => {
  return (
    <CardBody>
      {data.page11 ? (
        <>
          <span className={style.section}>Section 11</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Photos of The Land To Be Built
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Image
              label='Photos of the Land To Be Built'
              value={data?.page11?.photosofthelandtobebuilded}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section12 = ({ data }) => {
  return (
    <CardBody>
      {data.page12 ? (
        <>
          <span className={style.section}>Section 12</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Layout Site</CardTitle>
          <div className={`font-weight-bold`}>
            <Image label='Layout Site' value={data?.page12?.layoutsite} />
            <Detail
              label='Tower ke Sumber Daya'
              value={get(data.page12, "towerkesumberdaya", "-") + " meter"}
            />
            <Detail
              label='Tower ke Antena VSAT'
              value={get(data.page12, "towerkeantenavsat", "-") + " meter"}
            />
            <Detail
              label='Tower ke Solar Panel'
              value={get(data.page12, "towerkesolarpanel", "-") + " meter"}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section13 = ({ data }) => {
  return (
    <CardBody>
      {data.page13 ? (
        <>
          <span className={style.section}>Section 13</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Land Candidate Photos
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Image label='Gambar Lahan' value={data?.page13?.gambarlahan} />
            <Image label='Marking GPS' value={data?.page13?.makinggps} />
            <Image
              label='Foto Sisi Utara'
              value={data?.page13?.fotosisiutara}
            />
            <Image
              label='Foto Sisi Timur'
              value={data?.page13?.fotosisitimur}
            />
            <Image
              label='Foto Sisi Selatan'
              value={data?.page13?.fotosisiselatan}
            />
            <Image
              label='Foto Sisi Barat'
              value={data?.page13?.fotosisibarat}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section14 = ({ data }) => {
  return (
    <CardBody>
      {data.page14 ? (
        <>
          <span className={style.section}>Section 14</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Coverage and Obstacle Information
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Obstacle
              label='Coverage and Obstacle Information'
              value={data?.page14?.coverageandobstacleinformation}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section15 = ({ data }) => {
  return (
    <CardBody>
      {data.page15 ? (
        <>
          <span className={style.section}>Section 15</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Photo Capture G-NETTRACK 0.5km
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Image
              label='Photo Capture G-NETTRACK 0.5km'
              value={data?.page15?.photocapturegnettrack05km}
              nettrack={true}
            />
            <Image
              label='Photo Capture G-NETTRACK 2km'
              value={data?.page15?.photocapturegnettrack5km}
              nettrack={true}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section16 = ({ data }) => {
  return (
    <CardBody>
      {data.page16 ? (
        <>
          <span className={style.section}>Section 16</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Photo Capture G-NETTRACK Road Route
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Image
              label='Photo Capture G-NETTRACK Road Route'
              value={data?.page16?.photocapturegnettrackroadroute}
              nettrack={true}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section17 = ({ data }) => {
  return (
    <CardBody>
      {data.page17 ? (
        <>
          <span className={style.section}>Section 17</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Location Mapping</CardTitle>
          <div className={`font-weight-bold`}>
            <Image
              label='Location Mapping'
              value={get(data.page17, "locationmapping", "-")}
            />
            <LocationMapping
              label='Posisi yang Ditawarkan'
              value={get(data.page17, "posisiyangditawarkan", "-")}
            />
            <LocationMapping
              label='Kandidat 1'
              value={get(data.page17, "kandidat1", "-")}
            />
            <LocationMapping
              label='Kandidat 2'
              value={get(data.page17, "kandidat2", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section18 = ({ data }) => {
  return (
    <CardBody>
      {data.page18 ? (
        <>
          <span className={style.section}>Section 18</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Panoramic Area</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Sector 0°'
              value={get(data.page18, "sector0", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 45°'
              value={get(data.page18, "sector45", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 90°'
              value={get(data.page18, "sector90", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 135°'
              value={get(data.page18, "sector135", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 180°'
              value={get(data.page18, "sector180", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 225° '
              value={get(data.page18, "sector225", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 270° '
              value={get(data.page18, "sector270", "-")}
              sector={true}
              type={"list"}
            />
            <Detail
              label='Sector 315°'
              value={get(data.page18, "sector315", "-")}
              sector={true}
              type={"list"}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section19 = ({ data }) => {
  return (
    <CardBody>
      {data.page19 ? (
        <>
          <span className={style.section}>Section 19</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Foto-foto Panoramic Area
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Image
              label='Sector 0°'
              value={get(data.page19, "sector0gambarlahan", "-")}
            />
            <Image
              label='Sector 45°'
              value={get(data.page19, "sector45gambarlahan", "-")}
            />
            <Image
              label='Sector 90°'
              value={get(data.page19, "sector90gambarlahan", "-")}
            />
            <Image
              label='Sector 135°'
              value={get(data.page19, "sector135gambarlahan", "-")}
            />
            <Image
              label='Sector 180°'
              value={get(data.page19, "sector180gambarlahan", "-")}
            />
            <Image
              label='Sector 225° '
              value={get(data.page19, "sector225gambarlahan", "-")}
            />
            <Image
              label='Sector 270° '
              value={get(data.page19, "sector270gambarlahan", "-")}
            />
            <Image
              label='Sector 315°'
              value={get(data.page19, "sector315gambarlahan", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section20 = ({ data }) => {
  return (
    <CardBody>
      {data.page20 ? (
        <>
          <span className={style.section}>Section 20</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Foto-foto Akses ke Site
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Image
              label='Akses Site 1'
              value={get(data.page20, "aksessite1gambarlahan", "-")}
            />
            <Image
              label='Akses Site 2'
              value={get(data.page20, "aksessite2gambarlahan", "-")}
            />
            <Image
              label='Akses Site 3'
              value={get(data.page20, "aksessite3gambarlahan", "-")}
            />
            <Image
              label='Akses Site 4'
              value={get(data.page20, "aksessite4gambarlahan", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};

const Section21 = ({ data }) => {
  return (
    <CardBody>
      {data.page21 ? (
        <>
          <span className={style.section}>Section 21</span>
          <CardTitle className={`mb-5 mt-2 text26`}>General Comment</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='General Comment'
              value={get(data.page21, "generalcomment", "-")}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
};
const CardTabs = (props) => {
  const btsData1 = useSelector((state) => state.CompareBTS.btsData1);
  const btsData2 = useSelector((state) => state.CompareBTS.btsData2);

  const jumlahMapping = [1, 2];
  const arrayBTSData = [btsData1, btsData2];

  const [activeTab, setactiveTab] = useState("1");
  // const [visibility, setVisibility] = useState(true);
  const data = props.datatable;

  const sectionTitles = [
    { no: 1, title: "Section 1 : Informasi Survey" },
    { no: 2, title: "Section 2 : Informasi Umum" },
    { no: 3, title: "Section 3 : Informasi Geografi dan Tower Data" },
    { no: 4, title: "Section 4 : Transmisi VSAT" },
    { no: 5, title: "Section 5 : Informasi Umum Lahan" },
    { no: 6, title: "Section 6 : Mobile Coverage on Site" },
    { no: 7, title: "Section 7 : Land Condition" },
    { no: 8, title: "Section 8 : Facilities of Electricity and Support" },
    { no: 9, title: "Section 9 : Perizinan" },
    { no: 10, title: "Section 10 : Informasi Demografi" },
    { no: 11, title: "Section 11 : Photos of The Land To Be Built" },
    { no: 12, title: "Section 12 : Layout Site" },
    { no: 13, title: "Section 13 : Land Candidate Photos" },
    { no: 14, title: "Section 14 : Coverage and Obstacle Information" },
    { no: 15, title: "Section 15 : Photo Capture G-NETTRACK" },
    { no: 16, title: "Section 16 : Photo Capture G-NETTRACK Road Route" },
    { no: 17, title: "Section 17 : Location Mapping" },
    { no: 18, title: "Section 18 : Panoramic Area" },
    { no: 19, title: "Section 19 : Foto-foto Panoramic Area" },
    { no: 20, title: "Section 20 : Foto-foto Akses ke Site" },
    { no: 21, title: "Section 21 : General Comment" },
  ];

  const Tabs = ({ data }) => {
    return (
      // <Container fluid>
      <div className='checkout-tabs'>
        <Row>
          <Col xl='2' lg='4' md='4' sm='4'>
            <Nav
              // className='flex-column'
              className={`d-flex justify-content-center align-items-center ${style.navLinkScrollBar}`}
              pills
            >
              {sectionTitles.map((title, i) => {
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
                      <span className={`font-weight-bold`}>{title.title}</span>
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </Col>
          <Col xl='10' lg='8' md='8' sm='8'>
            <div className={`d-flex flex-row w-100 gap16`}>
              {arrayBTSData[0] === "" && arrayBTSData[1] === "" ? (
                <></>
              ) : (
                arrayBTSData.map((data, i) => {
                  return (
                    <Card className={`${style.cardBody} w-50`} key={i}>
                      <CardBody>
                        <h3 className={`${style.sectionTitle}`}>
                          Lokasi {i + 1}
                        </h3>
                        <hr />
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId='1'>
                            <Section1 data={data} />
                          </TabPane>
                          <TabPane tabId='2'>
                            <Section2 data={data} />
                          </TabPane>
                          <TabPane tabId='3'>
                            <Section3 data={data} />
                          </TabPane>
                          <TabPane tabId='4'>
                            <Section4 data={data} />
                          </TabPane>
                          <TabPane tabId='5'>
                            <Section5 data={data} />
                          </TabPane>
                          <TabPane tabId='6'>
                            <Section6 data={data} />
                          </TabPane>
                          <TabPane tabId='7'>
                            <Section7 data={data} />
                          </TabPane>
                          <TabPane tabId='8'>
                            <Section8 data={data} />
                          </TabPane>
                          <TabPane tabId='9'>
                            <Section9 data={data} />
                          </TabPane>
                          <TabPane tabId='10'>
                            <Section10 data={data} />
                          </TabPane>
                          <TabPane tabId='11'>
                            <Section11 data={data} />
                          </TabPane>
                          <TabPane tabId='12'>
                            <Section12 data={data} />
                          </TabPane>
                          <TabPane tabId='13'>
                            <Section13 data={data} />
                          </TabPane>
                          <TabPane tabId='14'>
                            <Section14 data={data} />
                          </TabPane>
                          <TabPane tabId='15'>
                            <Section15 data={data} />
                          </TabPane>
                          <TabPane tabId='16'>
                            <Section16 data={data} />
                          </TabPane>
                          <TabPane tabId='17'>
                            <Section17 data={data} />
                          </TabPane>
                          <TabPane tabId='18'>
                            <Section18 data={data} />
                          </TabPane>
                          <TabPane tabId='19'>
                            <Section19 data={data} />
                          </TabPane>
                          <TabPane tabId='20'>
                            <Section20 data={data} />
                          </TabPane>
                          <TabPane tabId='21'>
                            <Section21 data={data} />
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  );
                })
              )}
            </div>
          </Col>
        </Row>
      </div>
      // </Container>
    );
  };
  return <Tabs data={data} />;
};

export default CardTabs;
