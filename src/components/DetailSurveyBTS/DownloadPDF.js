import React, { useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import get from "lodash/get";
import _ from "lodash";

import html2pdf from "html2pdf.js";
import style from "./CardInfo/style.module.scss";
import styles from "./style.module.css";
import "./print.scss";

const DownloadPDF = (props) => {
  const moment = require("moment");

  const data = props?.location?.state?.datatable;
  let tanggal = get(data, "tanggal_pembuatan", "-");

  //auto download function
  const downloadPDF = () => {
    var element = document.getElementById("detail-survey");
    var opt = {
      margin: [0.15, 0.15],
      image: { type: "jpeg", quality: 1 },
      filename: `Hasil Survey ${data.kodeHasilSurvey} ${moment(
        data.tanggal_pembuatan
      ).format("DD/MM/YYYY")}`,
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    // downloadPDF();
  }, []);

  const FormatForm = ({ label, value, labelWidth, weight, size }) => (
    <Row
      className='mb-1'
      style={{ fontWeight: `${weight}`, fontSize: `${size}` }}
    >
      <Col
        lg={labelWidth !== undefined ? labelWidth : 4}
        md={labelWidth !== undefined ? labelWidth : 4}
        sm={labelWidth !== undefined ? labelWidth : 4}
      >
        {label}
      </Col>
      <Col>: {value}</Col>
    </Row>
  );

  const FormatFormImage = ({
    label,
    url,
    desc,
    device_lon,
    device_lat,
    width,
    labelWidth,
  }) => {
    labelWidth = labelWidth !== undefined ? labelWidth : "1";
    return (
      <>
        <Row className='h5'>
          <Col>{label && label}</Col>
        </Row>
        <Row className='mb-1'>
          <Col className='d-flex flex-column'>
            <img
              src={`${process.env.REACT_APP_BE_URL}${url}`}
              alt={desc}
              style={{ width: `${width}` }}
            />
            <div
              className='mb-0'
              style={{ fontSize: "10px", fontWeight: "normal" }}
            >
              <FormatForm
                label='Deskripsi'
                value={desc}
                labelWidth={labelWidth}
                style={{ marginTop: "20px" }}
              />
              <FormatForm
                label='Latitude'
                value={device_lat}
                labelWidth={labelWidth}
              />
              <FormatForm
                label='Longitude'
                value={device_lon}
                labelWidth={labelWidth}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const Section1 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 1 - Informasi Survey</div>
          <div>
            <FormatForm
              label='Kontraktor'
              value={get(e?.page1, "disiapkanoleh", "-")}
            />
            <FormatForm label='Email' value={get(e?.page1, "email", "-")} />
            <FormatForm
              label='Nama Project'
              value={get(e?.page1, "namaproject", "-")}
            />
            <FormatForm
              label='Nama Surveyor'
              value={get(e?.page1, "namasurveyor", "-")}
            />
            <FormatForm
              label='Nomor Telepon'
              value={get(e?.page1, "nomortelepon", "-")}
            />
            <FormatForm
              label='Status Site'
              value={get(e?.page1, "statussite", "-")}
            />
            <FormatForm
              label='Tanggal Survey'
              value={get(e?.page1, "tanggalkunjungan", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section2 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 2 - Informasi Umum</div>
          <div>
            <FormatForm
              label='Jalan Akses Lokasi'
              value={get(e?.page2, "aksesdarat", "-")}
            />
            <FormatForm
              label='Akses ke Lokasi Site'
              value={get(e?.page2, "akseskelokasi", "-")}
            />
            <FormatForm
              label='Akses Sungai / Laut'
              value={get(e?.page2, "aksessungailaut", "-")}
            />
            <FormatForm label='Alamat' value={get(e?.page2, "alamat", "-")} />
            <FormatForm
              label='Alamat Contact Person'
              value={get(e?.page2, "alamatpicdaerah", "-")}
            />
            <FormatForm
              label='Jarak dari Kota ke Lokasi dan Nama Kota'
              value={get(e?.page2, "jarakdarikotakelokasidannamakota", "-")}
            />
            <FormatForm
              label='Jarak dari Site ke Jalan Utama'
              value={get(e?.page2, "jarakdarisitekajalanutama", "-")}
            />
            <FormatForm
              label='Waktu Perjalanan'
              value={get(e?.page2, "jaraktempuh", "-")}
            />
            <FormatForm
              label='Kondisi Jalan Akses lokasi'
              value={get(e?.page2, "kondisiaksesjalan", "-")}
            />
            <FormatForm
              label='Kondisi Gudang Penyimpanan'
              value={get(e?.page2, "kondisiperalatan", "-")}
            />
            <FormatForm
              label='Akses ke Lokasi Site (jarak)'
              value={get(e?.page2, "luasaksesjalan", "-")}
            />
            <FormatForm
              label='Contact Person Pemilik'
              value={get(e?.page2, "namapicdaerah", "-")}
            />
            <FormatForm
              label='Nama Site'
              value={get(e?.page2, "namasite", "-")}
            />
            <FormatForm
              label='No Tlp'
              value={get(e?.page2, "nomorteleponpic", "-")}
            />
            <FormatForm
              label='Ijin ke Lokasi'
              value={get(e?.page2, "perizinanakseskesite", "-")}
            />
            <FormatForm
              label='Tipe Antenna'
              value={get(e?.page2, "pilihtipeantena", "-")}
            />
            <FormatForm
              label='Tipe Coverage Area Site'
              value={get(e?.page2, "tipecakupansite", "-")}
            />
            <FormatForm
              label='Tipe Site'
              value={get(e?.page2, "tipesite", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section3 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 3 - Informasi Geografi dan Tower Data
          </div>
          <div>
            <FormatForm
              label='Koordinat GPS WGS84 - Latitude'
              value={get(e?.page3, "koordinatgpswgs84-lat", "-")}
            />
            <FormatForm
              label='Koordinat GPS WGS84 - Longitude'
              value={get(e?.page3, "koordinatgpswgs84-long", "-")}
            />
            <FormatForm
              label='Tinggi Tower / Pole'
              value={get(e?.page3, "tinggitowerpole", "-")}
            />
            <FormatForm
              label='Tipe Tower'
              value={get(e?.page3, "tipetower", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section4 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 4 - Transmisi VSAT</div>
          <div>
            <FormatForm
              label='Penempatan Antenna'
              value={get(e?.page4, "penempatanantena", "-")}
            />
            <FormatForm
              label='Alas Antenna'
              value={get(e?.page4, "alasantena", "-")}
            />
            <FormatForm
              label='Diameter Antenna'
              value={get(e?.page4, "diameterantena", "-")}
            />
            <FormatForm
              label='Penggunaan Satelit'
              value={get(e?.page4, "penggunaansatelit", "-")}
            />
            <FormatForm label='Azimuth' value={get(e?.page4, "azimuth", "-")} />
            <FormatForm label='Elevasi' value={get(e?.page4, "elevasi", "-")} />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section5 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 5 - Informasi Umum Lahan</div>
          <div>
            <FormatForm
              label='Ketinggian Tower Pole'
              value={get(e?.page5, "ketinggiantowerpole", "-")}
            />
            <FormatForm
              label='Kepemilikan Lahan'
              value={get(e?.page5, "kepemilikanlahan", "-")}
            />
            <FormatForm
              label='Nama Pemilik Lahan'
              value={get(e?.page5, "namapemiliklahan", "-")}
            />
            <FormatForm
              label='Nomor Pemilik Lahan'
              value={get(e?.page5, "nomorpemiliklahan", "-")}
            />
            <FormatForm
              label='Kondisi Lahan'
              value={get(e?.page5, "kondisilahan", "-")}
            />
            <FormatForm
              label='Kondisi Sosial'
              value={get(e?.page5, "kondisisosial", "-")}
            />
            <FormatForm
              label='Keamanan'
              value={get(e?.page5, "keamanan", "-")}
            />
            <FormatForm
              label='Luas Lahan'
              value={get(e?.page5, "luaslahan", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section6 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 6 - Mobile Coverage on Site
          </div>
          <div>
            <FormatForm
              label='Kemampuan Jarak Radius < 5km dari Site'
              value={get(e?.page6, "kemampuanjarakradius5kmdarisite", "-")}
            />
            <FormatForm
              label='Tipe Sinyal yang Tersedia'
              value={get(e?.page6, "tipesinyalyangtersedia", "-")}
            />
            <FormatForm
              label='Level Sinyal 4G Jika Ada Jangkauan'
              value={get(e?.page6, "levelsinyal4gjikaadajangkauan", "-")}
            />
            <FormatForm
              label='Call di Site'
              value={get(e?.page6, "calldisite", "-")}
            />
            <FormatForm
              label='SMS di Site'
              value={get(e?.page6, "smsdisite", "-")}
            />
            <FormatForm
              label='NamaOperator'
              value={_.join(get(e?.page6, "namaoperator", "-"), ", ")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section7 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 7 - Land Condition</div>
          <div>
            <FormatForm
              label='Topografi Umum'
              value={get(e?.page7, "topografiumum", "-")}
            />
            <FormatForm
              label='Deskripsi Area Jangakauan'
              value={_.join(get(e?.page7, "deskripsiareajangkauan", "-"), ", ")}
            />
            <FormatForm
              label='Tipe Properti'
              value={get(e?.page7, "tipeproperti", "-")}
            />
            <FormatForm
              label='Status Lahan'
              value={get(e?.page7, "statuslahan", "-")}
            />
            <FormatForm
              label='Pengurusan IMB'
              value={get(e?.page7, "pengurusanimb", "-")}
            />
            <FormatForm
              label='Land Classification'
              value={get(e?.page7, "landclassification", "-")}
            />
            <FormatForm
              label='Obyek Penghalang'
              value={get(e?.page7, "obyekpenghalang", "-")}
            />
            <FormatForm
              label='Kondisi Perubahan Lahan'
              value={get(e?.page7, "kondisiperubahanlahan", "-")}
            />
            <FormatForm
              label='Tipe Tanah'
              value={get(e?.page7, "tipetanah", "-")}
            />
            <FormatForm
              label='Dekat Sungai / Laut'
              value={get(e?.page7, "dekatlautsungai", "-")}
            />
            <FormatForm
              label='Risiko Bencana'
              value={get(e?.page7, "resikobencana", "-")}
            />
            <FormatForm
              label='Material Setempat'
              value={get(e?.page7, "materialsetempat", "-")}
            />
            <FormatForm
              label='Risiko Relokasi'
              value={get(e?.page7, "resikorelokasi", "-")}
            />
            <FormatForm
              label='Risiko Keluhan'
              value={get(e?.page7, "resikokeluhan", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section8 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 8 - Facilities of Electricity and Support
          </div>
          <div>
            <FormatForm
              label='Sumber Daya'
              value={get(e?.page8, "sumberdaya", "-")}
            />
            <FormatForm
              label='Kemampuan Kelistrikan'
              value={get(e?.page8, "kemampuankelistrikan", "-")}
            />
            <FormatForm
              label='Kekuatan Kelistrikan'
              value={get(e?.page8, "kekuatankelistrikan", "-")}
            />
            <FormatForm
              label='Jumlah Jam Ketersediaan Listrik'
              value={get(e?.page8, "jumlahjamketersediaanlistrik", "-")}
            />
            <FormatForm
              label='Jarak dari Sumber Daya Listrik'
              value={get(e?.page8, "jarakdarisumberdayalistrik", "-")}
            />
            <FormatForm
              label='Kemampuan Bahan Bensin'
              value={get(e?.page8, "kemampuanbahanbensin", "-")}
            />
            <FormatForm
              label='Tipe Bahan Bakar yang Tersedia'
              value={get(e?.page8, "tipebahanbakaryangtersedia", "-")}
            />
            <FormatForm
              label='Harga BB di Lokasi'
              value={get(e?.page8, "hargabbmdilokasi", "-")}
            />
            <FormatForm
              label='Listrik Bisa Digunakan untuk Alat'
              value={get(e?.page8, "listrikbisadigunakanuntukalat", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section9 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 9 - Perizinan</div>
          <div>
            <FormatForm
              label='Surat Kepemilikan Tanah'
              value={get(e?.page9, "suratkepimilikantanah", "-")}
            />
            <FormatForm
              label='Kebutuhan Izin'
              value={get(e?.page9, "kebutuhanizin", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section10 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 10 - Informasi Demografi</div>
          <div>
            <FormatForm
              label='Populasi (Orang/KK)'
              value={get(e?.page10, "populasiorangkk", "-")}
            />
            <FormatForm
              label='Kepadatan Populasi'
              value={get(e?.page10, "kepadatanpopulasi", "-")}
            />
            <FormatForm
              label='Distribusi Populasi'
              value={get(e?.page10, "distribusipopulasi", "-")}
            />
            <FormatForm
              label='Desa Terdekat'
              value={get(e?.page10, "desaterdekat", "-")}
            />
            <FormatForm
              label='Jarak Desa Terdekat'
              value={get(e?.page10, "jarakdesaterdekat", "-")}
            />
            <FormatForm
              label='Livelihood'
              value={get(e?.page10, "livelihood", "-")}
            />
            <FormatForm
              label='Populasi Pengguna Telepon Genggam'
              value={get(e?.page10, "populasipenggunatelfongenggam", "-")}
            />
            <FormatForm
              label='Tipe Pengguna Telepon Genggam'
              value={_.join(
                get(e?.page10, "tipepenggunatelfongenggam", "-"),
                ", "
              )}
            />
            <FormatForm
              label='Sim Card yang Tersedia'
              value={_.join(get(e?.page10, "simcardyangtersedia", "-"), ", ")}
            />
            <FormatForm
              label='Penduduk yang Bisa Dilatih Untuk Menggunakan Produk/Jasa'
              value={get(
                e?.page10,
                "pendudukyangbisadilatihuntukmenggunakanprodukjasa",
                "-"
              )}
            />
            <FormatForm
              label='Rumah yang Mempunyai Generator'
              value={get(e?.page10, "rumahyangmempunyaigenerator", "-")}
            />
            <FormatForm
              label='Catatan Lainnya'
              value={get(e?.page10, "catatanlainnya", "-")}
            />
            <FormatForm
              label='Akses Internet'
              value={get(e?.page10, "aksesinternet", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section11 = ({ e }) => {
    let width =
      e?.page11?.photosofthelandtobebuilded.length > 1 ? "100%" : "30%";

    console.log(`console log nya width`, width);
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 11 - Photos of The Land to be Built
          </div>
          <div>
            {get(e?.page11, "photosofthelandtobebuilded", "-").map(
              (e, index) => (
                <FormatFormImage
                  label='Photos of The Land To Be Built'
                  url={get(e, "path", "-")}
                  device_lat={get(e, "device_lat", "-")}
                  device_lon={get(e, "device_lon", "-")}
                  deskripsi={get(e, "deskripsi", "-")}
                  width={width}
                  labelWidth='2'
                />
              )
            )}
          </div>
        </div>
      </CardBody>
    );
  };

  const Section12 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 12 - Layout Site</div>
          <div>
            <FormatFormImage
              label='Layout Site'
              url={get(e?.page12.layoutsite, "path", "-")}
              device_lat={get(e?.page12?.layoutsite, "device_lat", "-")}
              device_lon={get(e?.page12?.layoutsite, "device_lon", "-")}
              deskripsi={get(e?.page12?.layoutsite, "deskripsi", "-")}
              width='30%'
              labelWidth='2'
            />
            <FormatForm
              label='Tower ke Sumber Daya'
              value={get(e?.page12, "towerkesumberdaya", "-")}
            />
            <FormatForm
              label='Tower ke Antena VSAT'
              value={get(e?.page12, "towerkeantenavsat", "-")}
            />
            <FormatForm
              label='Tower ke Solar Panel'
              value={get(e?.page12, "towerkesolarpanel", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section13 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 13 - Land Candidate Photos</div>
          <div className='d-flex flex-row w-100 flex-wrap'>
            <div className='w-50'>
              <FormatFormImage
                label='Gambar Lahan'
                url={get(e?.page13.gambarlahan, "path", "-")}
                device_lat={get(e?.page13.gambarlahan, "device_lat", "-")}
                device_lon={get(e?.page13.gambarlahan, "device_lon", "-")}
                deskripsi={get(e, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Marking GPS'
                url={get(e?.page13.makinggps, "path", "-")}
                device_lat={get(e?.page13.makinggps, "device_lat", "-")}
                device_lon={get(e?.page13.makinggps, "device_lon", "-")}
                deskripsi={get(e, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Foto Sisi Barat'
                url={get(e?.page13.fotosisibarat, "path", "-")}
                device_lat={get(e?.page13.fotosisibarat, "device_lat", "-")}
                device_lon={get(e?.page13.fotosisibarat, "device_lon", "-")}
                deskripsi={get(e, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Foto Sisi Selatan'
                url={get(e?.page13.fotosisiselatan, "path", "-")}
                device_lat={get(e?.page13.fotosisiselatan, "device_lat", "-")}
                device_lon={get(e?.page13.fotosisiselatan, "device_lon", "-")}
                deskripsi={get(e, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Foto Sisi Timur'
                url={get(e?.page13.fotosisitimur, "path", "-")}
                device_lat={get(e?.page13.fotosisitimur, "device_lat", "-")}
                device_lon={get(e?.page13.fotosisitimur, "device_lon", "-")}
                deskripsi={get(e, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Foto Sisi Utara'
                url={get(e?.page13.fotosisiutara, "path", "-")}
                device_lat={get(e?.page13.fotosisiutara, "device_lat", "-")}
                device_lon={get(e?.page13.fotosisiutara, "device_lon", "-")}
                deskripsi={get(e, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
          </div>
        </div>
      </CardBody>
    );
  };

  const Section14 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 14 - Coverage and Obstacle Information
          </div>
          <div>
            {e?.page14?.coverageandobstacleinformation.map((e, index) => (
              <>
                <span>Obstacle {index + 1}</span>
                <FormatForm
                  label='Derajat'
                  value={get(e?.data, "derajat", "-")}
                />
                <FormatForm
                  label='Jarak'
                  value={get(e?.page14, "jarak", "-")}
                />
                <FormatForm
                  label='Deskripsi'
                  value={get(e?.page14, "deskripsi", "-")}
                />
              </>
            ))}
          </div>
        </div>
      </CardBody>
    );
  };

  const Section15 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 15 - Foto Foto Capture G-NETTRACK
          </div>
          <div className='h4'>Foto Foto Capture G-NETTRACK 0.5km</div>
          <div className='d-flex flex-row'>
            {Object.keys(e?.page15?.photocapturegnettrack05km.length !== 0) &&
              e?.page15?.photocapturegnettrack05km.map((e, index) => {
                return (
                  <div className='col-6 pl-0'>
                    <div className='h5 text-capitalize my-1'>
                      {e.data.sector}
                    </div>
                    <FormatFormImage
                      label=''
                      url={get(e.data.foto, "path", "-")}
                      device_lat={get(e.data.foto, "device_lat", "-")}
                      device_lon={get(e.data.foto, "device_lon", "-")}
                      deskripsi={get(e.data.foto, "deskripsi", "-")}
                      labelWidth='3'
                      width='60%'
                    />
                    {console.log(`console log nya e.data`, e.data)}
                  </div>
                );
              })}
          </div>
          <div className='h4 mt-2'>Foto Foto Capture G-NETTRACK 2km</div>
          <div className='d-flex flex-row'>
            {Object.keys(e?.page15?.photocapturegnettrack5km.length !== 0) &&
              e?.page15?.photocapturegnettrack5km.map((e, index) => {
                return (
                  <div className='col-6 pl-0'>
                    <div className='h5 text-capitalize my-1'>
                      {e.data.sector}
                    </div>
                    <FormatFormImage
                      label=''
                      url={get(e.data.foto, "path", "-")}
                      device_lat={get(e.data.foto, "device_lat", "-")}
                      device_lon={get(e.data.foto, "device_lon", "-")}
                      deskripsi={get(e.data.foto, "deskripsi", "-")}
                      labelWidth='3'
                      width='60%'
                    />
                    {console.log(`console log nya e.data`, e.data)}
                  </div>
                );
              })}
          </div>
        </div>
      </CardBody>
    );
  };

  const Section16 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 16 - Foto Foto Capture G-NETTRACK Road Route
          </div>
          <div className='d-flex flex-row'>
            {Object.keys(
              e?.page16?.photocapturegnettrackroadroute.length !== 0
            ) &&
              e?.page16?.photocapturegnettrackroadroute.map((e, index) => {
                return (
                  <div className='col-6 pl-0'>
                    <div className='h5 text-capitalize my-1'>
                      {e.data.sector}
                    </div>
                    <FormatFormImage
                      label=''
                      url={get(e.data.foto, "path", "-")}
                      device_lat={get(e.data.foto, "device_lat", "-")}
                      device_lon={get(e.data.foto, "device_lon", "-")}
                      deskripsi={get(e.data.foto, "deskripsi", "-")}
                      labelWidth='3'
                      width='60%'
                    />
                    {console.log(`console log nya e.data`, e.data)}
                  </div>
                );
              })}
          </div>
        </div>
      </CardBody>
    );
  };

  const Section17 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 17 - Location Mapping</div>
          <div className='text-normal'>
            <FormatFormImage
              label='Location Mapping'
              url={get(e?.page17?.locationmapping, "path", "-")}
              device_lat={get(e?.page17?.locationmapping, "device_lat", "-")}
              device_lon={get(e?.page17?.locationmapping, "device_lon", "-")}
              deskripsi={get(e?.page17?.locationmapping, "deskripsi", "-")}
              width='30%'
              labelWidth='2'
            />
            <div>Posisi yang Ditawarkan</div>
            <FormatForm
              label='Elevasi'
              value={get(e?.page17?.posisiyangditawarkan, "elevasi", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <FormatForm
              label='Latitude'
              value={get(e?.page17?.posisiyangditawarkan, "lat", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <FormatForm
              label='Longitude'
              value={get(e?.page17?.posisiyangditawarkan, "lon", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <div>Kandidat 1</div>
            <FormatForm
              label='Elevasi'
              value={get(e?.page17?.kandidat1, "elevasi", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <FormatForm
              label='Latitude'
              value={get(e?.page17?.kandidat1, "lat", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <FormatForm
              label='Longitude'
              value={get(e?.page17?.kandidat1, "lon", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <div>Kandidat 2</div>
            <FormatForm
              label='Elevasi'
              value={get(e?.page17?.kandidat2, "elevasi", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <FormatForm
              label='Latitude'
              value={get(e?.page17?.kandidat2, "lat", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
            <FormatForm
              label='Longitude'
              value={get(e?.page17?.kandidat2, "lon", "-")}
              labelWidth='2'
              weight='normal'
              size='12px'
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section18 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 18 - Panoramic Area</div>
          <div className='d-flex flex-row w-100 flex-wrap'>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 0</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18.sector0, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector0, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector0, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 45</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector45, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector45, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector45, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 90</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector90, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector90, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector90, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 135</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector135, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector135, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector135, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 180</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector180, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector180, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector180, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 225</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector225, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector225, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector225, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 270</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector270, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector270, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector270, "demografi", "-")}
              />
            </div>
            <div className='w-50'>
              <div className='h5 mt-2 text-muted'>Sector 315</div>
              <FormatForm
                label='Topografi'
                value={get(e?.page18?.sector315, "topotopografi", "-")}
              />
              <FormatForm
                label='Landscape'
                value={get(e?.page18?.sector315, "landscape", "-")}
              />
              <FormatForm
                label='Demografi'
                value={get(e?.page18?.sector315, "demografi", "-")}
              />
            </div>
          </div>
        </div>
      </CardBody>
    );
  };

  const Section19 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 19 - Foto-Foto Panoramic Area
          </div>
          <div className='d-flex flex-row w-100 flex-wrap'>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 0'
                url={get(e?.page19.sector0gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector0gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector0gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(e?.page19.sector0gambarlahan, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 45'
                url={get(e?.page19.sector45gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector45gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector45gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(e?.page19.sector45gambarlahan, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 90'
                url={get(e?.page19.sector90gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector90gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector90gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(e?.page19.sector90gambarlahan, "deskripsi", "-")}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 135'
                url={get(e?.page19.sector135gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector135gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector135gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page19.sector135gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 180'
                url={get(e?.page19.sector180gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector180gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector180gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page19.sector180gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 225'
                url={get(e?.page19.sector225gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector225gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector225gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page19.sector225gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 270'
                url={get(e?.page19.sector270gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector270gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector270gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page19.sector270gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Sector 315'
                url={get(e?.page19.sector315gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page19.sector315gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page19.sector315gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page19.sector315gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
          </div>
        </div>
      </CardBody>
    );
  };

  const Section20 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 20 - Foto-Foto Akses ke Site
          </div>
          <div className='d-flex flex-row w-100 flex-wrap'>
            <div className='w-50'>
              <FormatFormImage
                label='Site 1'
                url={get(e?.page20?.aksessite1gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page20?.aksessite1gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page20?.aksessite1gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page20?.aksessite1gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Site 2'
                url={get(e?.page20?.aksessite2gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page20?.aksessite2gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page20?.aksessite2gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page20?.aksessite2gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Site 3'
                url={get(e?.page20?.aksessite3gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page20?.aksessite3gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page20?.aksessite3gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page20?.aksessite3gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
            <div className='w-50'>
              <FormatFormImage
                label='Site 4'
                url={get(e?.page20?.aksessite4gambarlahan, "path", "-")}
                device_lat={get(
                  e?.page20?.aksessite4gambarlahan,
                  "device_lat",
                  "-"
                )}
                device_lon={get(
                  e?.page20?.aksessite4gambarlahan,
                  "device_lon",
                  "-"
                )}
                deskripsi={get(
                  e?.page20?.aksessite4gambarlahan,
                  "deskripsi",
                  "-"
                )}
                width='60%'
                labelWidth='3'
              />
            </div>
          </div>
        </div>
      </CardBody>
    );
  };

  const Section21 = ({ e }) => {
    return (
      <CardBody className='border border-secondary rounded mt-4'>
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 21 - General Comment</div>
          <div>
            <FormatForm
              label='General Comment'
              value={get(e?.page21, "generalcomment", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const DetailSurvey = () => {
    return (
      <CardBody className='border mb-3 border-secondary rounded'>
        <div className={`${styles.boxPadding}`}>
          <div className='mt-1'>
            <FormatForm
              label='Kode Survey'
              value={get(data, "kodeHasilSurvey", "-")}
            />
            <FormatForm label='Jenis Survey' value='BTS' />
            <FormatForm
              label='Provinsi'
              value={get(data, "lokasi.provinsi.name", "-")}
            />
            <FormatForm
              label='Kabupaten/Kota'
              value={get(data, "lokasi.kabupaten.name", "-")}
            />
            <FormatForm
              label='Kecamatan'
              value={get(data, "lokasi.kecamatan.name", "-")}
            />
            <FormatForm
              label='Lokasi Survey'
              value={get(data, "lokasi.desa.name", "-")}
            />
            <FormatForm
              label='Nama Instansi Surveyor'
              value={get(data, "page1.disiapkanoleh", "-")}
            />
            <FormatForm
              label='Nama Pelaksana'
              value={get(data, "page1.namasurveyor", "-")}
            />
            <FormatForm
              label='Tanggal Survey Masuk'
              value={moment(tanggal).format("DD/MM/YYYY")}
            />
            <FormatForm
              label='Status Survey'
              value={
                data !== undefined ? data?.status.slice(-1).pop().status : "-"
              }
            />
          </div>
        </div>
      </CardBody>
    );
  };

  return (
    <div
      // id="detail-survey"
      className='font-weight-bold'
      id='detail-survey'
    >
      <div>
        <Card>
          <div
            style={{
              position: "sticky",
              top: "10px",
              marginLeft: "auto",
              marginRight: "30px",
              zIndex: "100",
            }}
          >
            <button
              id='unduh'
              className={`${style.unduhButton2}`}
              onClick={() => {
                document.getElementById("unduh").classList.add("d-none");
                setTimeout(() => {
                  window.print();
                }, 1000);
                setTimeout(() => {
                  document.getElementById("unduh").classList.remove("d-none");
                }, 1500);
              }}
            >
              Print / Unduh PDF
            </button>
          </div>
          <CardBody className='mx-5'>
            <div className='page' style={{ breakInside: "avoid" }}>
              <div className='h3 text-center py-2'>
                Detail Survey {get(data, "kodeHasilSurvey", "-")}
              </div>
              <DetailSurvey />

              <div className='h3'>Hasil Survey</div>
              <FormatForm
                label='Tanggal Pembuatan'
                value={moment(get(data, "tanggal_pembuatan", "-")).format(
                  "DD/MM/YYYY"
                )}
              />
              <FormatForm
                label='Titik Lokasi'
                value={`${get(data, "latitude", "-")}, ${get(
                  data,
                  "longitude",
                  "-"
                )} (${get(data, "kategori", "-")})`}
              />
              {data.page1 && Object.keys(data.page1).length !== 0 && (
                <Section1 e={data} />
              )}
              {data.page2 && Object.keys(data.page2).length !== 0 && (
                <Section2 e={data} />
              )}
              {data.page3 && Object.keys(data.page3).length !== 0 && (
                <Section3 e={data} />
              )}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {data.page4 && Object.keys(data.page4).length !== 0 && (
                <Section4 e={data} />
              )}
              {data.page5 && Object.keys(data.page5).length !== 0 && (
                <Section5 e={data} />
              )}
              {data.page6 && Object.keys(data.page6).length !== 0 && (
                <Section6 e={data} />
              )}
              {data.page7 && Object.keys(data.page7).length !== 0 && (
                <Section7 e={data} />
              )}
              {data.page8 && Object.keys(data.page8).length !== 0 && (
                <Section8 e={data} />
              )}
            </div>
            <div
              className='page'
              style={{
                breakAfter: "always",
                breakBefore: "always",
                breakInside: "avoid",
              }}
            >
              {data.page9 && Object.keys(data.page9).length !== 0 && (
                <Section9 e={data} />
              )}
              {data.page10 && Object.keys(data.page10).length !== 0 && (
                <Section10 e={data} />
              )}
              {data.page11 && Object.keys(data.page11).length !== 0 && (
                <Section11 e={data} />
              )}
            </div>
            <div
              className='page'
              style={{ breakBefore: "always", breakInside: "avoid" }}
            >
              {data.page12 && Object.keys(data.page12).length !== 0 && (
                <Section12 e={data} />
              )}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {data.page13 && Object.keys(data.page13).length !== 0 && (
                <Section13 e={data} />
              )}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {Object.keys(data.page14).length !== 0 && <Section14 e={data} />}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {Object.keys(data.page15).length !== 0 && <Section15 e={data} />}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {Object.keys(data.page16).length !== 0 && <Section16 e={data} />}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {Object.keys(data.page17).length !== 0 && <Section17 e={data} />}
              {Object.keys(data.page18).length !== 0 && <Section18 e={data} />}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {Object.keys(data.page19).length !== 0 && <Section19 e={data} />}
            </div>
            <div className='page' style={{ breakInside: "avoid" }}>
              {Object.keys(data.page20).length !== 0 && <Section20 e={data} />}
              {Object.keys(data.page21).length !== 0 && <Section21 e={data} />}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DownloadPDF;
