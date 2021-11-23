import React, { useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import get from "lodash/get";
import _ from "lodash";
import style from "./CardInfo/style.module.scss";
import styles from "./style.module.css";
import "./print.scss";

import html2pdf from "html2pdf.js";

const DownloadPDF = (props) => {
  const moment = require("moment");

  const data = props?.location?.state?.datatable;
  const lokasi = props?.location?.state?.lokasi;
  let tanggal = get(data, "tanggal_pembuatan", "-");

  console.log(`console log nya data`, data);
  console.log(`console log nya lokasi`, lokasi);

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
      </>
    );
  };

  const Section1 = ({ e }) => {
    return (
      <CardBody
        className='border border-secondary rounded mt-4'
        style={{ pageBreakInside: "avoid" }}
      >
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 1 - Calon Pelanggan</div>
          <div>
            <FormatForm label='Kategori' value={get(e, "kategori", "-")} />
            <FormatForm label='PIC' value={get(e, "pic.namaPic", "-")} />
            <FormatForm
              label='Tanggal Pelaksanaan'
              value={get(e, "tanggalPelaksanaan", "-")}
            />
            <FormatForm
              label='Akses Darat'
              value={get(e, "modaTransportasi.darat", "-")}
            />
            <FormatForm
              label='Akses Laut'
              value={get(e, "modaTransportasi.laut", "-")}
            />
            <FormatForm
              label='Akses Udara'
              value={get(e, "modaTransportasi.udara", "-")}
            />
            <FormatForm
              label='Durasi Perjalanan dari Kecamatan'
              value={`${get(e, "modaTransportasi.durasiPerjalanan", "-")} jam`}
            />
            <FormatForm
              label='Nama Kota Kecamatan'
              value={get(e, "modaTransportasi.namaKotaKecamatan", "-")}
            />
            <FormatForm label='Elevasi' value={get(e, "elevation", "-")} />
            <FormatForm label='Tipe Bisnis' value={get(e, "tipeBisnis", "-")} />
            <FormatForm label='Alamat' value={get(e, "alamatLokasi", "-")} />
            <FormatForm
              label='Sumber Listrik'
              value={get(e, "power.sumber_listrik", "-")}
            />
            <FormatForm
              label='ID Pelanggan PLN'
              value={get(e, "power.idPelangganPLN", "-")}
            />
            <FormatForm
              label='Kapasitas Listrik'
              value={get(e, "power.kapasitas_listrik", "-")}
            />
            <FormatForm
              label='Sumber Listrik Cadangan'
              value={get(e, "power.sumber_cadangan", "-")}
            />
            <FormatForm
              label='Jam Operasional Listrik'
              value={get(e, "power.jamOperasionalListrik", "-")}
            />
            <FormatForm
              label='Jam Operasional Lokal'
              value={get(e, "power.jamOperasionalLokal", "-")}
            />
            <FormatForm label='Catatan' value={get(e, "note", "-")} />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section2 = ({ e }) => {
    return (
      <CardBody
        className='border border-secondary rounded mt-4'
        style={{ pageBreakInside: "avoid" }}
      >
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>
            Section 2 - Keterangan Perangkat IT di Lokasi
          </div>
          <div>
            <FormatForm label='Komputer' value={get(e.device, "pc", "-")} />
            <FormatForm label='Tablet' value={get(e.device, "tablet", "-")} />
            <FormatForm
              label='Smartphone'
              value={get(e.device, "smartPhone", "-")}
            />
            <FormatForm label='Laptop' value={get(e.device, "laptop", "-")} />
            <FormatForm
              label='Perangkat Lain 1'
              value={get(e.device, "perangkatlain1", "-")}
            />
            <FormatForm
              label='Perangkat Lain 1'
              value={get(e.device, "perangkatlain2", "-")}
            />
          </div>
        </div>
      </CardBody>
    );
  };

  const Section3 = ({ e }) => {
    return (
      <CardBody
        className='border border-secondary rounded mt-4'
        style={{ breakInside: "avoid" }}
      >
        <div className={`${styles.boxPadding}`}>
          <div className='h4 text-info'>Section 3 - Foto Lokasi</div>
          <span className='d-flex flex-row flex-wrap gap16'>
            <div style={{ width: "48%" }}>
              <FormatFormImage
                label='Akses Jalan'
                url={get(e?.listFoto, "aksesJalan.url", "-")}
                device_lat={get(e, "latitude", "-")}
                device_lon={get(e, "longitude", "-")}
                deskripsi={get(e?.listFoto, "deskripsi", "-")}
                labelWidth={3}
                width='100%'
              />
            </div>
            <div style={{ width: "48%" }}>
              <FormatFormImage
                label='Plang'
                url={get(e?.listFoto, "plang.url", "-")}
                device_lat={get(e, "latitude", "-")}
                device_lon={get(e, "longitude", "-")}
                deskripsi={get(e?.listFoto, "deskripsi", "-")}
                labelWidth={3}
                width='100%'
              />
            </div>
            <div style={{ width: "48%" }}>
              <FormatFormImage
                label='Marking'
                url={get(e?.listFoto, "markingPerangkat.url", "-")}
                device_lat={get(e, "latitude", "-")}
                device_lon={get(e, "longitude", "-")}
                deskripsi={get(e?.listFoto, "deskripsi", "-")}
                labelWidth={3}
                width='100%'
              />
            </div>
            <div style={{ width: "48%" }}>
              <FormatFormImage
                label='KWH Meter'
                url={get(e?.listFoto, "kwhMeter.url", "-")}
                device_lat={get(e, "latitude", "-")}
                device_lon={get(e, "longitude", "-")}
                deskripsi={get(e?.listFoto, "deskripsi", "-")}
                labelWidth={3}
                width='100%'
              />
            </div>
            <div style={{ width: "48%" }}>
              <FormatFormImage
                label='Gambar Denah Lokasi / Lanskap Bangunan'
                url={get(e?.listFoto, "gambarDenah.url", "-")}
                device_lat={get(e, "latitude", "-")}
                device_lon={get(e, "longitude", "-")}
                deskripsi={get(e?.listFoto, "deskripsi", "-")}
                labelWidth={3}
                width='100%'
              />
            </div>
            <div style={{ width: "48%" }}>
              <FormatFormImage
                label='Berita Acara'
                url={get(e?.listFoto, "lanskapBangunan.url", "-")}
                device_lat={get(e, "latitude", "-")}
                device_lon={get(e, "longitude", "-")}
                deskripsi={get(e?.listFoto, "deskripsi", "-")}
                labelWidth={3}
                width='100%'
              />
            </div>
          </span>
        </div>
      </CardBody>
    );
  };

  const Section4 = ({ e }) => {
    return (
      <CardBody
        className='border border-secondary rounded mt-4'
        style={{ pageBreakInside: "avoid" }}
      >
        <div className={`${styles.boxPadding}`}>
          <h4 className={`${styles.title}`}>Section 4 - Network</h4>
          <div>
            <FormatForm label='Tipe' value={get(e?.network, "tipe", "-")} />
            <FormatForm
              label='Download'
              value={get(e?.network, "download", "-")}
            />
            <FormatForm label='Upload' value={get(e?.network, "upload", "-")} />
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
              value={get(lokasi, "provinsi.name", "-")}
            />
            <FormatForm
              label='Kabupaten/Kota'
              value={get(lokasi, "kabupaten.name", "-")}
            />
            <FormatForm
              label='Kecamatan'
              value={get(lokasi, "kecamatan.name", "-")}
            />
            <FormatForm
              label='Lokasi Survey'
              value={get(lokasi, "desa.name", "-")}
            />
            <FormatForm
              label='Nama Instansi Surveyor'
              value={get(data, "user.organization.name", "-")}
            />
            <FormatForm
              label='Nama Pelaksana'
              value={get(data, "user.username", "-")}
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
                window.print();
                document.getElementById("unduh").classList.remove("d-none");
              }}
            >
              Print / Unduh PDF
            </button>
          </div>
          <CardBody className='mx-5'>
            <div className='page'>
              <div className='h3 text-center py-2'>
                Detail Issue {get(data, "kodeHasilSurvey", "-")}
              </div>
              <div className='text-center mx-5 mb-4 text-danger d-flex flex-column'>
                <div style={{ minWidth: "50px" }}>ISSUE : </div>
                <div>{_.map(get(data, "issue", "-"), "alasan")}</div>
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
              <Section1 e={data} />
              <Section2 e={data} />
            </div>
            <div className='page'>
              <Section3 e={data} />
              <Section4 e={data} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DownloadPDF;
