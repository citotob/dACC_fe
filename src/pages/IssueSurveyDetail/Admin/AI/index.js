import React, { useState, useEffect } from 'react'
import { Card, Row, Container, Col, Collapse, Button, Spinner } from 'reactstrap'
import styles from './IssueSurveyDetailStyle.module.css'
import ArrowUp from '../../../../assets/icons/Polygon1.svg'
import ArrowDown from '../../../../assets/icons/Polygon2.svg'
import FlagIcon from "../../../../assets/icons/flag.svg"
import PopupImage from "../../../../components/Popup/PopupImage"
import PopupConfirmHasilSurvey from "../../../../components/Popup/PopupConfirmHasilSurvey"
import PopupMap from "../../../../components/Popup/PopupMap"
import IconMap from "../../../../assets/icons/IconMap.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import DownloadPDF from "../../../../components/DownloadPDF";
import DownloadPDFBTS from "../../../../components/DownloadPDFBTS";
import get from "lodash.get";
var moment = require("moment");

const SectionDataPelanggan = ({ data, tab }) => {
  return (
    <>
      {
        tab === "AI" ?
          <Row className={styles.row_data}>
            <Col xs="5" className={styles.wrapper_section}>
              <Row className={styles.text_section}>
                <h5>Section 1 : Data Calon Pelanggan</h5>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>PIC Desa: </p>
                <p>{get(data, "pic.namaPic", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Nomor Telepon PIC Desa: </p>
                <p>{get(data, "pic.phonePic", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Tanggal Pelaksanaan: </p>
                <p>
                  {data.tanggalPelaksanaan
                    ? moment(data.tanggalPelaksanaan).format("DD/MM/YYYY")
                    : ""}
                </p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Akses Darat: </p>
                <p>
                  {data.modaTransportasi.darat === "[]" ? "-" : data.modaTransportasi.darat.slice(1, -1)}
                </p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Akses Laut: </p>
                <p>
                  {data.modaTransportasi.laut === "[]" ? "-" : data.modaTransportasi.laut.slice(1, -1)}
                </p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Akses Udara: </p>
                <p>
                  {data.modaTransportasi.udara === "[]" ? "-" : data.modaTransportasi.udara.slice(1, -1)}
                </p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Durasi Perjalanan dari Kota Kecamatan: </p>
                <p>{get(data, "modaTransportasi.durasiPerjalanan", "-")} jam</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Nama Kota Kecamatan : </p>
                <p>{get(data, "modaTransportasi.namaKotaKecamatan", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Elevation: </p>
                <p>{data.elevation ?? "-"} meter</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Tipe Bisnis: </p>
                <p>{data.tipeBisnis ?? "-"}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Alamat: </p>
                <p>{data.alamatLokasi ?? "-"}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Sumber Listrik: </p>
                <p>{get(data, "power.sumber_listrik", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>ID Pelanggan PLN: </p>
                <p>{get(data, "power.idPelangganPLN", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Kapasitas Listrik: </p>
                <p>{get(data, "power.kapasitas_listrik", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Sumber Listrik Cadangan: </p>
                <p>{get(data, "power.sumber_cadangan", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Jam Operasional Listrik: </p>
                <p>{get(data, "power.jamOperasionalListrik", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Jam Operasional Lokal: </p>
                <p>{get(data, "power.jamOperasionalLokal", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Catatan: </p>
                <p>{data.note ?? "-"}</p>
              </Row>
            </Col>
          </Row>
          :
          // BTS
          <Row className={styles.row_data}>
            <Col xs="5" className={styles.wrapper_section}>
              <Row className={styles.text_section}>
                <h5>Section 1 : Data Calon Pelanggan</h5>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>PIC Desa: </p>
                <p>{get(data, "pic.namaPic", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Nomor Telepon PIC Desa: </p>
                <p>{get(data, "pic.phonePic", "-")}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Tanggal Pelaksanaan: </p>
                <p>
                  {data.tanggalPelaksanaan
                    ? moment(data.tanggalPelaksanaan).format("DD/MM/YYYY")
                    : ""}
                </p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Nama Lokasi: </p>
                <p>{data.namaLokasi ?? "-"}</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Catatan: </p>
                <p>{data.note ?? "-"}</p>
              </Row>
            </Col>
          </Row>
      }
    </>
  )
}

const SectionPerangkatIT = ({ data, tab }) => {
  return (
    <>
      {
        tab === "AI" ?
          <Row className={styles.row_data}>
            <Col xs="5" className={styles.wrapper_section} >
              <Row className={styles.text_section}>
                <h5>Section 2 : Keterangan Perangkat IT di Lokasi</h5>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Komputer : </p>
                <p>{data.pc ?? "-"} buah</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Tablet : </p>
                <p>{data.tablet ?? "-"} buah</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Smartphone : </p>
                <p>{data.smartPhone ?? "-"} buah</p>
              </Row>
              <Row className={styles.row_data_collapse}>
                <p>Laptop: </p>
                <p>{data.laptop ?? "-"} buah</p>
              </Row>
              {
                data.lainnya1 && Object.keys(data.lainnya1).length !== 0 &&
                <Row className={styles.row_data_collapse}>
                  <p>`{data.lainnya1.nama}`</p>
                  <p>{data.lainnya1.qty} buah</p>
                </Row>
              }
              {
                data.lainnya2 && Object.keys(data.lainnya2).length !== 0 &&
                <Row className={styles.row_data_collapse}>
                  <p>{data.lainnya2.nama}</p>
                  <p>{data.lainnya2.qty} buah</p>
                </Row>
              }
            </Col>
          </Row>
          :
          // BTS
          <Row className={styles.row_data}>
            <div></div>
          </Row>
      }
    </>
  )
}

const SectionFotoLokasi = ({ data, tab }) => {
  const [image, setImage] = useState('');
  const [modalImage, setModalImage] = useState(false);

  let toggleImage = (img) => {
    setImage(img)
    setModalImage(!modalImage);
  };

  const title = (text) => {
    var name = '';
    switch (text) {
      case 'aksesJalan':
        name = 'Akses Jalan'
        break;
      case 'plang':
        name = 'Plang';
        break;
      case 'markingPerangkat':
        name = 'Marking Perangkat';
        break;
      case 'kwhMeter':
        name = 'KWH Meter';
        break;
      case 'gambarDenah':
        name = 'Gambar Denah';
        break;
      case 'lanskapBangunan':
        name = 'Landscape Bangunan';
        break;
      default:
        name = '-'
        break;
    }
    return name;
  };

  return (
    <>
      {
        tab === "AI" ?
          <Row className={`${styles.row_data} ${styles.text_section}`}>
            <h5>Section 3 : Foto Lokasi</h5>
          </Row>
          :
          <Row className={`${styles.row_data} ${styles.text_section}`}>
            <h5>Section 2 : Foto Kandidat Lahan</h5>
          </Row>
      }

      <Row className={styles.row_data}>
        <Col xs="5" className={styles.wrapper_section} >
          <Row>
            <p>Foto Lokasi :</p>
          </Row>
        </Col>
        <Col xs="5">
          {
            tab === "AI" ?
              <Row className={`${styles.row_data_collapse}`}>
                {/* <div className={styles.data_gallery}> */}
                <PopupImage image={image} modalImage={modalImage} toggleImage={toggleImage} />
                {Object.entries(data).map(([key, value]) => {
                  let source = `${process.env.REACT_APP_BE_URL}${value.url}`;
                  const longLat = get(value, "longlat", ['-', '-']);

                  return (
                    <>
                      <Button color="" key={key} onClick={() => toggleImage(source)} className={styles.btn_img}>
                        <p className={styles.image_capt}>{title(key)}</p>
                        <div className={styles.img_wrapper}>
                          <img alt="" className={styles.image} src={source}></img>
                        </div>
                        {/* <p className={styles.image_capt}>{`GPS: ${longLat.coordinates[1]}, ${longLat.coordinates[0]}`}</p> */}
                        <p className={styles.image_capt}>{`GPS: ${get(longLat, "coordinates[1]", "-")}, ${get(longLat, "coordinates[0]", "-")}`}</p>
                      </Button>
                    </>
                  );
                })}
                {/* </div> */}
              </Row>
              :
              // BTS
              <Row className={`${styles.row_data_collapse}`}>
                <PopupImage image={image} modalImage={modalImage} toggleImage={toggleImage} />

                <Button
                  color=""
                  onClick={() => {
                    let source = `${process.env.REACT_APP_BE_URL}${data.fotoKandidatLahan.url}`;
                    toggleImage(source);
                  }}
                  className={styles.btn_img}
                >
                  <p className={styles.image_capt}>Foto Kandidat Lahan</p>
                  <div className={styles.img_wrapper}>
                    {
                      data.fotoKandidatLahan.url === "-" ?
                        <div>Tidak ada foto</div> :
                        <img alt="" className={styles.image} src={`${process.env.REACT_APP_BE_URL}${data.fotoKandidatLahan.url}`}></img>
                    }
                  </div>
                  <p className={styles.image_capt}>{`GPS: ${get(data, "fotoKandidatLahan.longlat.coordinates[1]", "-")}, ${get(data, "fotoKandidatLahan.longlat.coordinates[0]", "-")}`}</p>
                </Button>

                <Button
                  color=""
                  onClick={() => {
                    let source = `${process.env.REACT_APP_BE_URL}${data.fotoMarkingGps.url}`;
                    toggleImage(source)
                  }}
                  className={styles.btn_img}
                >
                  <p className={styles.image_capt}>Marking Gps</p>
                  <div className={styles.img_wrapper}>
                    {
                      data.fotoMarkingGps.url === "-" ?
                        <div>Tidak ada foto</div> :
                        <img alt="" className={styles.image} src={`${process.env.REACT_APP_BE_URL}${data.fotoMarkingGps.url}`}></img>
                    }
                  </div>
                  <p className={styles.image_capt}>{`GPS: ${get(data, "fotoMarkingGps.longlat.coordinates[1]", "-")}, ${get(data, "fotoMarkingGps.longlat.coordinates[0]", "-")}`}</p>
                </Button>

                <Button
                  color=""
                  onClick={() => {
                    let source = `${process.env.REACT_APP_BE_URL}${data.fotoUtaraTitik.url}`;
                    toggleImage(source)
                  }}
                  className={styles.btn_img}
                >
                  <p className={styles.image_capt}>Foto Arah Utara dari Titik (dengan kompas)</p>
                  <div className={styles.img_wrapper}>
                    {
                      data.fotoUtaraTitik.url === "-" ?
                        <div>Tidak ada foto</div> :
                        <img alt="" className={styles.image} src={`${process.env.REACT_APP_BE_URL}${data.fotoUtaraTitik.url}`}></img>
                    }
                  </div>
                  <p className={styles.image_capt}>{`GPS: ${get(data, "fotoUtaraTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoUtaraTitik.longlat.coordinates[0]", "-")}`}</p>
                </Button>

                <Button
                  color=""
                  onClick={() => {
                    let source = `${process.env.REACT_APP_BE_URL}${data.fotoTimurTitik.url}`;
                    toggleImage(source)
                  }}
                  className={styles.btn_img}
                >
                  <p className={styles.image_capt}>Foto Arah Timur dari Titik (dengan kompas)</p>
                  <div className={styles.img_wrapper}>
                    {
                      data.fotoTimurTitik.url === "-" ?
                        <div>Tidak ada foto</div> :
                        <img alt="" className={styles.image} src={`${process.env.REACT_APP_BE_URL}${data.fotoTimurTitik.url}`}></img>
                    }
                  </div>
                  <p className={styles.image_capt}>{`GPS: ${get(data, "fotoTimurTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoTimurTitik.longlat.coordinates[0]", "-")}`}</p>
                </Button>

                <Button
                  color=""
                  onClick={() => {
                    let source = `${process.env.REACT_APP_BE_URL}${data.fotoSelatanTitik.url}`;
                    toggleImage(source)
                  }}
                  className={styles.btn_img}
                >
                  <p className={styles.image_capt}>Foto Arah Selatan dari Titik (dengan kompas)</p>
                  <div className={styles.img_wrapper}>
                    {
                      data.fotoSelatanTitik.url === "-" ?
                        <div>Tidak ada foto</div> :
                        <img alt="" className={styles.image} src={`${process.env.REACT_APP_BE_URL}${data.fotoSelatanTitik.url}`}></img>
                    }
                  </div>
                  <p className={styles.image_capt}>{`GPS: ${get(data, "fotoSelatanTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoSelatanTitik.longlat.coordinates[0]", "-")}`}</p>
                </Button>

                <Button
                  color=""
                  onClick={() => {
                    let source = `${process.env.REACT_APP_BE_URL}${data.fotoBaratTitik.url}`;
                    toggleImage(source)
                  }}
                  className={styles.btn_img}
                >
                  <p className={styles.image_capt}>Foto Arah Barat dari Titik (dengan kompas)</p>
                  <div className={styles.img_wrapper}>
                    {
                      data.fotoBaratTitik.url === "-" ?
                        <div>Tidak ada foto</div> :
                        <img alt="" className={styles.image} src={`${process.env.REACT_APP_BE_URL}${data.fotoBaratTitik.url}`}></img>
                    }
                  </div>
                  <p className={styles.image_capt}>{`GPS: ${get(data, "fotoBaratTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoBaratTitik.longlat.coordinates[0]", "-")}`}</p>
                </Button>

              </Row>
          }
        </Col>
      </Row>
    </>
  )
}

const SectionNetWork = ({ data }) => {
  return (
    <>
      <Col xs="5" className={styles.wrapper_section}>
        <Row className={styles.text_section}>
          <h5>Network</h5>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Tipe: </p>
          <p>{get(data, "network.tipe", "-")}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Download: </p>
          <p>{get(data, "network.download", "-")}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Upload: </p>
          <p>{get(data, "network.upload", "-")}</p>
        </Row>
      </Col>
    </>
  )
}

const CollapseItem = ({ data, tab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // arrow
  let arrow = '';
  if (isOpen) {
    arrow = <img src={ArrowUp} alt=""></img>;
  } else {
    arrow = <img src={ArrowDown} alt=""></img>;
  }

  // popup map
  const [modalMap, setModalMap] = useState(false)
  let toggleMap = () => {
    setModalMap(!modalMap)
  }

  return (
    <Row className={styles.row_below}>
      <Container>
        <Card>

          {/* Title */}
          <div className={styles.bordered}>
            <Container>
              <div className={styles.wrapper_collap}>
                <div className={`${styles.wrapper_left} w-80`}>
                  <div className={styles.title_titik_lokasi}>
                    <p className={styles.title_titik_lokasi_text}>Titik Lokasi: </p>
                  </div>
                  <div className={styles.detail_titik_lokasi}>
                    <p className={styles.detail_titik_lokasi_text}>
                      {data.namaLokasi ?? '-'}
                    </p>
                    <p className={styles.detail_titik_lokasi_text_data}>
                      {data.latitude && data.longitude ? `${data.latitude}, ${data.longitude}` : '-, -'}
                    </p>
                  </div>
                  &nbsp;&nbsp;
                  <img
                    alt=""
                    className={styles.cursor}
                    src={IconMap}
                    onClick={toggleMap}
                  ></img>
                  <PopupMap
                    coordinate={{ latitude: data.latitude, longitude: data.longitude }}
                    modalMap={modalMap}
                    toggleMap={toggleMap}
                  />
                </div>

                <Button
                  onClick={toggle}
                  id={data.nomorSurvey}
                  color=""
                  className={styles.collapse_btn}
                >
                  <i className='btn-icon'>{arrow}</i>
                </Button>
              </div>
            </Container>
          </div>

          {/* Content */}
          <Collapse isOpen={isOpen}>
            <Container>
              <SectionDataPelanggan data={data} tab={tab} />
              <SectionPerangkatIT data={data.device} tab={tab} />
              {
                tab === "AI" ? <SectionFotoLokasi data={data.listFoto} tab={tab} /> :
                  <SectionFotoLokasi data={data} tab={tab} />
              }
              <SectionNetWork data={data} />
            </Container>
          </Collapse>
        </Card>
      </Container>
    </Row>
  )
}

const ContentIssueSurvey = ({ tab, setContent, reload, dataIssue, handleAlert }) => {

  // modal confirm approve
  const [modalConfirmApprove, setModalConfirmApprove] = useState(false);

  // toggle modal confirm approve
  const toggleModalConfirmApprove = () => {
    setModalConfirmApprove(!modalConfirmApprove)
  };

  // loading
  const [loading, setLoading] = useState(false);

  // For PDF rendering
  const [isReady, setIsReady] = useState(false);

  // text jenis survey 
  let jenis_survey = tab === "AI" ? "Akses Internet" : "BTS";

  // style
  let styleJenis = {
    color: tab === "AI" ? "#485EEB" : "red"
  }

  const LoadingSpinner = () => {
    return <Spinner color="primary"></Spinner>;
  };

  // approve hasil survey
  const handleAlertApprove = async () => {
    const jenis = tab === "AI" ? 'ai' : 'bts'
    const userid = window.localStorage.getItem('userid');

    let kodeSurvey = dataIssue.data[0].kodeHasilSurvey;
    try {
      let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/approvesurvey/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "kode": kodeSurvey,
          "jenis": jenis,
          usersetujui: userid
        })
      });

      let response = await request.json(); 
      
      if (response.success) {
        handleAlert(true, 'Setujui Hasil Survey');
      } else {
        handleAlert(false, 'Setujui Hasil Survey');
      }

      setLoading(true);
      await setContent(0);
      await reload();

    } catch (e) {
      console.log("catch error", e)

      handleAlert(false, 'Setujui Hasil Survey');
      await setContent(0);
      await reload();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1);
  });

  const dataIssueLokasi = dataIssue.lokasi

  return (
    <>

      {/* Modal Setujui */}
      <PopupConfirmHasilSurvey
        kode={dataIssue.data[0].kodeHasilSurvey}
        isOpenModal={modalConfirmApprove}
        toggleModal={toggleModalConfirmApprove}
        handleConfirmHasilSurvey={handleAlertApprove}
      />

      {/* Title */}
      <Row className={styles.row_top}>
        <Container>
          <div className={`${styles.wrapper_title} d-flex justify-content-between`}>
            <div className="d-flex">
              <h3 className={styles.title}>Manajemen Hasil Survey</h3>
            </div>
            {/* PDF */}
            {tab === "AI"
              ? <Button className={`ml-5 mr-15 ${styles.btnDownloadPDF}`}>
                {isReady ? <DownloadPDF dataDetail={dataIssue} jenisSurvey={jenis_survey} issue={true} /> : ""}
              </Button>
              : <Button className={`ml-5 mr-15 ${styles.btnDownloadPDF}`}>
                {isReady ? <DownloadPDFBTS dataDetail={dataIssue} jenisSurvey={jenis_survey} issue={true} /> : ""}
              </Button>
            }
          </div>
        </Container>
      </Row>

      {/* Detail Survey */}
      <Row className={styles.row_middle}>
        <Container>
          <Card className={styles.card}>
            <Container>

              <Row className={styles.wrapper_title_sub}>
                <h3 className={styles.title_sub}>Detail Issue</h3>
              </Row>

              <Row>
                <div className="col-lg-3 col-md-3 ">
                  <div className="p-2">
                    <p>Deskripsi Issue: </p>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 ">
                  <div className="p-2">
                    <p>
                      {get(dataIssue, "data[0].issue[0].alasan", "-")}
                    </p>
                  </div>
                </div>
              </Row>

              <Row>
                {/* Column no. 1 */}
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <Col className="p-2">
                    Kode Survey :
                  </Col>
                  <Col className="p-2">
                    Provinsi :
                  </Col >
                  <Col className="p-2">
                    Kabupaten/Kota :
                  </Col>
                  <Col className="p-2">
                    Kecamatan :
                  </Col>
                  <Col className="p-2">
                    Lokasi Survey :
                  </Col>
                </div>
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <Col className={`p-2 ${styles.kode_survey_wrapper}`}>
                    {dataIssue.kode}
                    {dataIssue.data[0].issue[0].status ? <img src={FlagIcon} alt=""></img> : ""}
                  </Col>
                  <Col className="p-2">
                    {dataIssueLokasi.provinsi === undefined ? "-" : dataIssueLokasi.provinsi.name}
                  </Col>
                  <Col className="p-2">
                    {dataIssueLokasi.kabupaten
                      ? dataIssueLokasi.kabupaten.name
                      : (dataIssueLokasi.kota ? dataIssueLokasi.kota.name : '-')
                    }
                  </Col>
                  <Col className="p-2">
                    {dataIssueLokasi.kecamatan === undefined ? "-" : dataIssueLokasi.kecamatan.name}
                  </Col>
                  <Col className="p-2">
                    {dataIssueLokasi.desa === undefined ? "-" : dataIssueLokasi.desa.name}
                  </Col>
                </div>

                {/* Column no. 2 */}
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <Col className="p-2">
                    Jenis Survey:
                  </Col>
                  <Col className="p-2">
                    Nama Instansi Surveyor:
                  </Col>
                  <Col className="p-2">
                    Nama Pelaksana:
                  </Col>
                  <Col className="p-2">
                    Tanggal Survey Masuk:
                  </Col>
                  <Col className="p-2">
                    Status:
                  </Col>
                </div>
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <Col className="p-2" style={styleJenis}>
                    {jenis_survey}
                  </Col>
                  <Col className="p-2">
                    {get(dataIssue, "data[0].user.organization.name", "-")}
                  </Col>
                  <Col className="p-2">
                    {get(dataIssue, "data[0].user.name", "-")}
                  </Col>
                  <Col className="p-2">
                    {/* {moment(get(dataIssue, "data[0].issue[0].tanggal_pembuatan", "-")).format('DD/MM/YYYY')} */}
                    {/* Below is date for submitted survey */}
                    {dataIssue.data[0].status[0].tanggal_pembuatan
                      ? moment(dataIssue.data[0].status[0].tanggal_pembuatan).format('DD/MM/YYYY')
                      : "-"}
                  </Col>
                  <Col className="p-2">
                    {dataIssue.data[0].status.slice(-1).pop().status}
                  </Col>
                </div>
              </Row>
            </Container>
          </Card>
        </Container>
      </Row>

      {/* Content Per Lokasi */}
      {dataIssue.data.map((data, index) => {
        return <CollapseItem key={index} data={data} tab={tab} />
      })}

      {/* Footer */}
      <Row className={styles.row_bottom}>
        <Container>
          <Card className={styles.card_bottom}>
            <Container className={styles.container_validasi}>
              <Row>
                <Button color="" className={styles.btn_back} onClick={() => setContent(0)}>
                  <FontAwesomeIcon icon={faArrowCircleLeft} /> Back{" "}
                </Button>
                <Button
                  color=""
                  className={styles.btn_approve}
                  onClick={() => toggleModalConfirmApprove()}
                >
                  {loading ? <LoadingSpinner /> : "Setujui Hasil Survey"}
                </Button>
              </Row>
            </Container>
          </Card>
        </Container>
      </Row>
    </>
  )
}

const IssueSurveyDetailAdminAI = (props) => {
  return (
    <ContentIssueSurvey
      tab={props.tab}
      setContent={props.setContent}
      reload={props.reload}
      dataIssue={props.data}
      handleAlert={props.handleAlert}
      />
  )
}

export default IssueSurveyDetailAdminAI