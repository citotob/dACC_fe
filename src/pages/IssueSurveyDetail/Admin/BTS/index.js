import React, { useState, useContext, useEffect } from 'react'
import { Card, Row, Container, Col, Collapse, Button, Spinner } from 'reactstrap'
import styles from './IssueSurveyDetailStyle.module.css'
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import AdminProvider from "../../../../context/AdminProvider";
import ArrowUp from '../../../../assets/icons/Polygon1.svg'
import ArrowDown from '../../../../assets/icons/Polygon2.svg'
import ThumbnailIcon from "../../../../assets/icons/thumbnail.svg"
import FlagIcon from "../../../../assets/icons/flag.svg"
import PopupImage from "../../../../components/Popup/PopupImage"
import { useHistory } from "react-router-dom"
import RootContext from '../../../../context';
import RootContextAdmin from "../../../../context/adminContext"
import { style } from 'd3';
import IconBack from "../../../../assets/icons/ArrowBack.svg"
import PopupConfirmHasilSurvey from "../../../../components/Popup/PopupConfirmHasilSurvey"
import PopupMap from "../../../../components/Popup/PopupMap"
import IconMap from "../../../../assets/icons/IconMap.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

var moment = require("moment");
const SectionDataPelanggan = ({ data }) => {
  return (
    <Row className={styles.row_data}>
      <Col xs="5" className={styles.wrapper_section}>
        <Row className={styles.text_section}>
          <h5>Section 1 : Data Calon Pelanggan</h5>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>PIC Desa: </p>
          <p>{data.pic.namaPic ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Nomor Telepon PIC Desa: </p>
          <p>{data.pic.phonePic ?? "-"}</p>
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
          <p>{data.modaTransportasi.darat == "[]" ? "-" : data.modaTransportasi.darat}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Akses Laut: </p>
          <p>{data.modaTransportasi.laut == "[]" ? "-" : data.modaTransportasi.laut}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Akses Udara: </p>
          <p>{data.modaTransportasi.udara == "[]" ? "-" : data.modaTransportasi.udara}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Durasi Perjalanan dari Kota Kecamatan: </p>
          <p>{data.modaTransportasi.durasiPerjalanan == "-" ? "-" : data.modaTransportasi.durasiPerjalanan} jam</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Nama Kota Kecamatan : </p>
          <p>{data.modaTransportasi.namaKotaKecamatan == "-" ? "-" : data.modaTransportasi.namaKotaKecamatan}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Elevation: </p>
          <p>{data.elevation == "-" ? "-" : data.elevation} meter</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Tipe Bisnis: </p>
          <p>{data.tipeBisnis == "-" ? "-" : data.tipeBisnis}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Alamat: </p>
          <p>{data.alamatLokasi ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>ID Pelanggan PLN: </p>
          <p>{data.idPelangganPLN ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Sumber Listrik: </p>
          <p>{data.sumber_listrik ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Kapasitas Listrik: </p>
          <p>{data.kapasitas_listrik ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Sumber Listrik Cadangan: </p>
          <p>{data.sumber_cadangan ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Jam Operasional Listrik: </p>
          <p>{data.jamOperasionalListrik ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Jam Operasional Lokal: </p>
          <p>{data.jamOperasionalLokal ?? "-"}</p>
        </Row>
        <Row className={styles.row_data_collapse}>
          <p>Catatan </p>
          <p>{data.note ?? "-"}</p>
        </Row>
      </Col>
    </Row>
  )
}

const SectionPerangkatIT = ({ data }) => {
  console.log("aku : ", data)
  return (
    <Row className={styles.row_data}>
      {/* <Col xs="5" className={styles.wrapper_section} >
                <Row className={styles.text_section}>
                    <h5>
                        Section 2 : Keterangan Perangkat IT di Lokasi
                    </h5>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Komputer : </p>
                    {data.pc === "-" ? "-" : <p>{data.pc} buah</p>}
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Tablet : </p>
                    {data.tablet === "-" ? "-" : <p>{data.tablet} buah</p>}
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Smartphone : </p>
                    {data.smartPhone === "-" ? "-" : <p>{data.smartPhone} buah</p>}
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Laptop: </p>
                    {data.laptop === "-" ? "-" : <p>{data.laptop} buah</p>}
                </Row>
                {
                    data.lainnya1 && Object.keys(data.lainnya1).length !== 0 &&
                    <Row className={styles.row_data_collapse}>
                        <p>`{data.lainnya1.nama}`</p>
                        <p>{data.lainnya1.qty}</p>
                    </Row>
                }
                {
                    data.lainnya2 && Object.keys(data.lainnya2).length !== 0 &&
                    <Row className={styles.row_data_collapse}>
                        <p>`{data.lainnya2.nama}`</p>
                        <p>{data.lainnya2.qty}</p>
                    </Row>
                }
            </Col> */}
    </Row>
  )
}

const SectionFotoLokasi = ({ data }) => {

  const [image, setImage] = useState('');
  const [modalImage, setModalImage] = useState(false);
  let toggleImage = (img) => {
    setImage(img)
    setModalImage(!modalImage);
  }

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
  }

  return (
    <>
      <Row className={`${styles.row_data} ${styles.text_section}`}>
        <h5>
          Section 3 : Foto Lokasi
                    </h5>
      </Row>
      <Row className={styles.row_data}>
        <Col xs="5" className={styles.wrapper_section} >
          <Row>
            <p>
              Foto Lokasi :
                        </p>
          </Row>
        </Col>
        <Col xs="5">
          <Row className={`${styles.row_data_collapse}`}>
            <div className={styles.data_gallery}>
              <PopupImage image={image} modalImage={modalImage} toggleImage={toggleImage} />
              {
                Object.entries(data).map(([key, value]) => {
                  let source = `${process.env.REACT_APP_BE_URL}${value.url}`;
                  return (
                    <>
                      <Button color="" key={key} onClick={() => toggleImage(source)} className={styles.btn_img}>
                        <p className={styles.image_capt}>{title(key)}</p>
                        <div className={styles.img_wrapper}>
                          <img alt="" className={styles.image} src={source}></img>
                        </div>
                      </Button>
                    </>
                  )
                })
              }
            </div>
          </Row>
        </Col>
      </Row>
    </>
  )
}

const ContentIssueSurvey = ({ tab, setContent, reload }) => {
  //modal confirm approve
  const [modalConfirmApprove, setModalConfirmApprove] = useState(false);

  //loading
  const [loading, setLoading] = useState(false)

  let [dataIssuePelanggan, setDataIssuePelanggan] = useState({})
  let contextData = useContext(RootContext);

  //context hasil survey
  const contextHasilSurvey = useContext(RootContextAdmin)
  //text jenis survey 
  let jenis_survey = tab === "AI" ? "Akses Internet" : "BTS";
  //style
  let styleJenis = {
    color: tab === "AI" ? "#485EEB" : "red"
  }


  const LoadingSpinner = () => {
    return (
      <Spinner color="primary">
      </Spinner>

    )
  }

  //toggle modal confirm approve
  const toggleModalConfirmApprove = () => {
    setModalConfirmApprove(!modalConfirmApprove)
  }

  //approve hasil survey
  const handleAlertApprove = async () => {
    try {
      let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/approvesurvey/`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(
            { "kode": contextData.data.kodeSurvey, "jenis": "bts" }
          )
        }
      )
      let response = await request.json()
      contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
      contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true })
      contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: `Survey ${contextData.data.kodeSurvey} Berhasil di Setujui` })
      setLoading(true)
      await setContent(0)
      await reload()


    } catch (e) {

      contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
      contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: false })
      contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: `Survey ${contextData.data.kodeSurvey}  Tidak Berhasil di Setujui` })
    } finally {
      setLoading(false)
    }

  }
  return (
    <>
      <PopupConfirmHasilSurvey
        kode={contextData.data.kodeSurvey}
        isOpenModal={modalConfirmApprove}
        toggleModal={toggleModalConfirmApprove}
        handleConfirmHasilSurvey={handleAlertApprove}
      />
      <Row className={styles.row_top}>
        <Container>
          <div className={styles.wrapper_title}>
            {/* <Button color="" onClick={() => setContent(0)}>
                            <img alt="" className="mr-2" src={IconBack}></img>
                        </Button> */}
            <h3 className={styles.title}>Manajemen Hasil Survey</h3>
          </div>
        </Container>
      </Row>
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
                      {contextData.data.data[0].issue[0].alasan ?? "-"}
                    </p>
                  </div>
                </div>
              </Row>
              <Row>
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
                    {contextData.data.kodeSurvey}
                    {contextData.data.data[0].issue[0].status ? <img src={FlagIcon} alt=""></img> : ""}
                  </Col>
                  <Col className="p-2">
                    -
                                    </Col>
                  <Col className="p-2">
                    -
                                    </Col>
                  <Col className="p-2">
                    -
                                    </Col>
                  <Col className="p-2">
                    -
                                    </Col>
                </div>
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
                    Tanggal Penugasan:
                                    </Col>
                </div>
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <Col className="p-2" style={styleJenis}>
                    {jenis_survey}
                  </Col>
                  <Col className="p-2">
                    {contextData.data.data[0].user.organization.name ?? "-"}
                  </Col>
                  <Col className="p-2">
                    {contextData.data.data[0].user.name ?? "-"}
                  </Col>
                  <Col className="p-2">
                    {contextData.data.data[0].issue[0].tanggal_pembuatan ? moment(contextData.data.data[0].issue[0].tanggal_pembuatan).format('DD/MM/YYYY') : "-"}
                  </Col>
                </div>
              </Row>
            </Container>
          </Card>
        </Container>
      </Row>
      {
        contextData.data.data.map((data, index) => {
          return <CollapseItem key={index} data={data} />
        })
      }
      <Row className={styles.row_bottom}>
        <Container>
          <Card className={styles.card_bottom}>
            <Container className={styles.container_validasi}>
              <Row>
                <Button color="" onClick={() => setContent(0)}> <FontAwesomeIcon icon={faArrowCircleLeft} /> Back{" "}</Button>
                <Button color="" className={styles.btn_approve} onClick={handleAlertApprove}>{loading ? <LoadingSpinner /> : "Setujui Hasil Survey"}</Button>
              </Row>
            </Container>
          </Card>
        </Container>
      </Row>
    </>
  )
}

const CollapseItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //history
  let history = useHistory();
  //arrow
  let arrow = '';
  if (isOpen) {
    arrow = <img src={ArrowUp} alt=""></img>;
  } else {
    arrow = <img src={ArrowDown} alt=""></img>;
  }
  //popup map
  const [modalMap, setModalMap] = useState(false)
  let toggleMap = () => {
    setModalMap(!modalMap)
  }

  return (
    <Row className={styles.row_below}>
      <Container>
        <Card>
          <div className={styles.bordered}>
            <Container>
              <div className={styles.wrapper_collap}>
                <div className={styles.wrapper_left}>
                  <div className={styles.title_titik_lokasi}>
                    <p className={styles.title_titik_lokasi_text}>Titik Lokasi: </p>
                  </div>
                  <div className={styles.detail_titik_lokasi}>
                    <p className={styles.detail_titik_lokasi_text}>{data.namaLokasi}</p>
                    <p className={styles.detail_titik_lokasi_text_data}>{`${data.latitude}, ${data.longitude}`}</p>
                  </div>
                                    &nbsp;&nbsp;<img alt="" className={styles.cursor} src={IconMap} onClick={toggleMap}></img>
                  <PopupMap coordinate={{ latitude: data.latitude, longitude: data.longitude }} modalMap={modalMap} toggleMap={toggleMap} />
                </div>

                <Button onClick={toggle} color="" className={styles.collapse_btn} >
                  <i className='btn-icon'>{arrow}</i>
                </Button>
              </div>
            </Container>
          </div>
          <Collapse isOpen={isOpen}>
            <Container>
              <SectionDataPelanggan data={data} />
              <SectionPerangkatIT data={data.device} />
              <SectionFotoLokasi data={data.listFoto} />
            </Container>
          </Collapse>
        </Card>
      </Container>
    </Row>
  )
}


const IssueSurveyDetailAdminBTS = (props) => {
  return (
    <ContentIssueSurvey tab={props.tab} setContent={props.setContent} reload={props.reload} dataIssue={props.data.data} />
  )
}

export default IssueSurveyDetailAdminBTS