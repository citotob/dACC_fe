import React, { useState, useEffect } from 'react'
import { Card, Row, Container, Col, Collapse, Button, Spinner } from 'reactstrap'
import styles from './HasilSurveyDetailStyle.module.css'

import ArrowUp from '../../../../assets/icons/Polygon1.svg'
import ArrowDown from '../../../../assets/icons/Polygon2.svg'
import PopupImage from '../../../../components/Popup/PopupImage'
import RootContextAdmin from "../../../../context/adminContext"
import IconMap from "../../../../assets/icons/IconMap.svg"
import PopupMap from "../../../../components/Popup/PopupMap"
import ModalTandaiSurvey from "../../../../components/Popup/ModalTandaiSurvey/Surveyor";
import ModalSetujuiSurvey from "../../../../components/Popup/ModalSetujuiSurvey/Surveyor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import DownloadPDFBTSSurveyor from "../../../../components/DownloadPDFBTSSurveyor";
import get from "lodash.get";
var moment = require('moment');

const SectionDataPelanggan = ({ data }) => {
  return (
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
          <p>Catatan: </p>
          <p>{data.note ?? "-"}</p>
        </Row>
      </Col>
    </Row>
  );
};

const SectionFotoLokasi = ({ data }) => {
  const [image, setImage] = useState('');
  const [modalImage, setModalImage] = useState(false);

  let toggleImage = (img) => {
    setImage(img)
    setModalImage(!modalImage);
  }

  return (
    <>
      <Row className={`${styles.row_data} ${styles.text_section}`}>
        <h5>Section 2 : Foto Lokasi</h5>
      </Row>
      <Row className={styles.row_data}>
        <Col xs="5" className={styles.wrapper_section} >
          <Row>
            <p>Foto Lokasi :</p>
          </Row>
        </Col>
        <Col xs="5">
          <Row className={`${styles.row_data_collapse}`}>
            {/* <div className={styles.data_gallery}> */}
            <PopupImage image={image} modalImage={modalImage} toggleImage={toggleImage} />

            <Button
              color=""
              onClick={() =>
                toggleImage(`${process.env.REACT_APP_BE_URL}${data.fotoKandidatLahan.url}`)
              }
              className={styles.btn_img}
            >
              <p className={styles.image_capt}>Foto Kandidat Lahan</p>
              <div>
                <img
                  className={styles.image}
                  src={`${process.env.REACT_APP_BE_URL}${data.fotoKandidatLahan.url}`}
                  alt=""></img>
              </div>
              <p className={styles.image_capt}>{`GPS: ${get(data, "fotoKandidatLahan.longlat.coordinates[1]", "-")}, ${get(data, "fotoKandidatLahan.longlat.coordinates[0]", "-")}`}</p>
            </Button>

            <Button
              color=""
              onClick={() =>
                toggleImage(`${process.env.REACT_APP_BE_URL}${data.fotoMarkingGps.url}`)
              }
              className={styles.btn_img}
            >
              <p className={styles.image_capt}>Marking GPS</p>
              <div>
                <img
                  className={styles.image}
                  src={`${process.env.REACT_APP_BE_URL}${data.fotoMarkingGps.url}`}
                  alt=""></img>
              </div>
              <p className={styles.image_capt}>{`GPS: ${get(data, "fotoMarkingGps.longlat.coordinates[1]", "-")}, ${get(data, "fotoMarkingGps.longlat.coordinates[0]", "-")}`}</p>
            </Button>

            <Button
              color=""
              onClick={() =>
                toggleImage(`${process.env.REACT_APP_BE_URL}${data.fotoUtaraTitik.url}`)
              }
              className={styles.btn_img}
            >
              <p className={styles.image_capt}>Foto Arah Utara dari Titik (dengan kompas)</p>
              <div>
                <img
                  className={styles.image}
                  src={`${process.env.REACT_APP_BE_URL}${data.fotoUtaraTitik.url}`}
                  alt=""></img>
              </div>
              <p className={styles.image_capt}>{`GPS: ${get(data, "fotoUtaraTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoUtaraTitik.longlat.coordinates[0]", "-")}`}</p>
            </Button>

            <Button
              color=""
              onClick={() =>
                toggleImage(`${process.env.REACT_APP_BE_URL}${data.fotoTimurTitik.url}`)
              }
              className={styles.btn_img}
            >
              <p className={styles.image_capt}>Foto Arah Timur dari Titik (dengan kompas)</p>
              <div>
                <img
                  className={styles.image}
                  src={`${process.env.REACT_APP_BE_URL}${data.fotoTimurTitik.url}`}
                  alt=""></img>
              </div>
              <p className={styles.image_capt}>{`GPS: ${get(data, "fotoTimurTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoTimurTitik.longlat.coordinates[0]", "-")}`}</p>
            </Button>

            <Button
              color=""
              onClick={() =>
                toggleImage(`${process.env.REACT_APP_BE_URL}${data.fotoSelatanTitik.url}`)
              }
              className={styles.btn_img}
            >
              <p className={styles.image_capt}>Foto Arah Selatan dari Titik (dengan kompas)</p>
              <div>
                <img
                  className={styles.image}
                  src={`${process.env.REACT_APP_BE_URL}${data.fotoSelatanTitik.url}`}
                  alt=""></img>
              </div>
              <p className={styles.image_capt}>{`GPS: ${get(data, "fotoSelatanTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoSelatanTitik.longlat.coordinates[0]", "-")}`}</p>
            </Button>

            <Button
              color=""
              onClick={() =>
                toggleImage(`${process.env.REACT_APP_BE_URL}${data.fotoBaratTitik.url}`)
              }
              className={styles.btn_img}
            >
              <p className={styles.image_capt}>Foto Arah Barat dari Titik (dengan kompas)</p>
              <div>
                <img
                  className={styles.image}
                  src={`${process.env.REACT_APP_BE_URL}${data.fotoBaratTitik.url}`}
                  alt=""></img>
              </div>
              <p className={styles.image_capt}>{`GPS: ${get(data, "fotoBaratTitik.longlat.coordinates[1]", "-")}, ${get(data, "fotoBaratTitik.longlat.coordinates[0]", "-")}`}</p>
            </Button>

            {/* </div> */}
          </Row>
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

const CollapseItem = ({ data }) => {
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
  };

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
                    className={styles.cursor}
                    src={IconMap}
                    onClick={toggleMap}
                    alt=""
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
              <SectionDataPelanggan data={data} />
              {/* <SectionPerangkatIT data={data.device} /> */}
              <SectionFotoLokasi data={data} />
              <SectionNetWork data={data} />
            </Container>
          </Collapse>
        </Card>
      </Container>
    </Row>
  )
}

const ContentHasilSurveyor = ({ tab, setContent, dataDetail, reload, handleAlert }) => {
  // handle Modal Tandai
  const [modalTandai, setModalTandai] = useState(false);
  // toggle modal tandai
  const toggleModalTandai = () => setModalTandai(!modalTandai);

  // handle Modal Setujui
  const [modalSetujui, setModalSetujui] = useState(false);
  // toggle modal tandai
  const toggleModalSetujui = () => setModalSetujui(!modalSetujui);

  // loading
  const [loading, setLoading] = useState(false)

  // For PDF rendering
  const [isReady, setIsReady] = useState(false);

  // untuk alasan Tandai
  const [dataAlasan, setDataAlasan] = useState('-')

  // Userid
  const userid = window.localStorage.getItem('userid')

  // text jenis
  let jenis_survey = tab === "AI" ? "Akses Internet" : "BTS"

  // style
  let styleJenis = {
    color: tab === "AI" ? "#485EEB" : "red"
  }
  // style hasil survey
  let styleHasilSurvey = {
    backgroundColor: tab === "AI" ? "#485EEB" : "red"
  }

  const LoadingSpinner = () => {
    return <Spinner color="primary"></Spinner>;
  };

  const handleTandaiSurvey = async () => {
    const kodeSurvey = dataDetail.data[0].kodeHasilSurvey;
    try {
      let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/tandaisurvey/`, {
        method: "POST",
        body: JSON.stringify({
          kode: kodeSurvey,
          jenis: "bts",
          alasan: dataAlasan,
          userfrom: userid,
        }),
      });
      let response = await request.json();

      if (response.success) {
        handleAlert(true, 'Tandai Hasil Survey BTS');
      } else {
        handleAlert(false, 'Tandai Hasil Survey BTS');
      }

      setLoading(true);
      await setContent(0);
      await reload();

    } catch (e) {

      console.log("catch error", e)

      handleAlert(false, 'Tandai Hasil Survey BTS');
      await setContent(0);
      await reload();
    } finally {
      setLoading(false);
    }
  };

  // approve hasil survey
  const handleSetujuiSurvey = async () => {
    const kodeSurvey = dataDetail.data[0].kodeHasilSurvey;
    try {
      let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/setujuisurvey/`, {
        method: "POST",
        body: JSON.stringify({
          kode: kodeSurvey,
          jenis: "bts",
          userfrom: userid,
        }),
      });
      let response = await request.json();

      if (response.success) {
        handleAlert(true, 'Setujui Hasil Survey BTS');
      } else {
        handleAlert(false, 'Setujui Hasil Survey BTS');
      }

      setLoading(true);
      await setContent(0);
      await reload();

    } catch (e) {
      console.log("catch error", e)

      handleAlert(false, 'Setujui Hasil Survey BTS');
      await setContent(0);
      await reload();
    } finally {
      setLoading(false);
    }
  };

  // Handle change alasan
  const handleChange = (e) => {
    let term = e.target.value
    setDataAlasan(term)
  }

  const handleBackButton = () => {
    setContent(0);
    reload();
  }

  useEffect(() => {
    console.log(dataDetail);
    setTimeout(() => setIsReady(true), 1);
  });

  // container data
  let locationData = dataDetail.lokasi;

  return (
    <>

      {/* Modal Tandai */}
      <ModalTandaiSurvey
        isOpenModal={modalTandai}
        toggleModal={toggleModalTandai}
        handleChangeAlasan={handleChange}
        handleTandaiSurvey={handleTandaiSurvey}
      />

      {/* Modal Setujui */}
      <ModalSetujuiSurvey
        isOpenModal={modalSetujui}
        toggleModal={toggleModalSetujui}
        handleSetujuiSurvey={handleSetujuiSurvey}
      />

      {/* Title */}
      <Row className={styles.row_top}>
        <Container>
          <div className={`${styles.wrapper_title} d-flex justify-content-between`}>
            <div className="d-flex">
              <h3 className={styles.title}>Manajemen Hasil Survey</h3>
            </div>
            <div>
              <Button className={`ml-5 mr-15 ${styles.btnDownloadPDF}`}>
                {isReady ? <DownloadPDFBTSSurveyor dataDetail={dataDetail} jenisSurvey={jenis_survey} issue={false} /> : ""}
              </Button>
            </div>
          </div>
        </Container>
      </Row>

      {/* Detail Survey */}
      <Row className={styles.row_middle}>
        <Container>
          <Card className={styles.card}>
            <Container>
              <Row className={styles.wrapper_title_sub}>
                <h3 className={styles.title_sub}>Detail Survey</h3>
              </Row>
              <Row>
                {/* Column no. 1 */}
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Kode Survey: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Provinsi: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Kabupaten/Kota: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Kecamatan: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Lokasi Survey: </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>{dataDetail.data[0].kodeHasilSurvey}</p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>
                        {locationData.provinsi === undefined ? "-" : locationData.provinsi.name}
                      </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>
                        {locationData.kabupaten
                          ? locationData.kabupaten.name
                          : (locationData.kota ? locationData.kota.name : '-')
                        }
                      </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>
                        {locationData.kecamatan === undefined ? "-" : locationData.kecamatan.name}
                      </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>
                        {locationData.desa === undefined ? "-" : locationData.desa.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column no. 2 */}
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Jenis Survey: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Nama Instansi Surveyor: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Nama Pelaksana: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Tanggal Survey Masuk: </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>Status Survey: </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-6 col-lg-3 col-md-3 ">
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p style={styleJenis}>{jenis_survey}</p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>{get(dataDetail, "data[0].user.organization.name", "-")}</p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>{get(dataDetail, "data[0].user.name", "-")}</p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>
                        {/* Below is date for submitted survey */}
                        {get(dataDetail, 'data[0].status[0].tanggal_pembuatan')
                          ? moment(get(dataDetail, 'data[0].status[0].tanggal_pembuatan')).format("DD/MM/YYYY")
                          : '-'}
                      </p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.row_detail}>
                      <p>{dataDetail.data[0].status.slice(-1).pop().status}</p>
                    </div>
                  </div>
                </div>
              </Row>
            </Container>
          </Card>
        </Container>
      </Row>

      {/* Content Per Lokasi */}
      {dataDetail.data.map((data, index) => {
        return <CollapseItem key={index} data={data} />;
      })}

      {/* Footer */}
      <Row className={styles.row_bottom}>
        <Container>
          <Card className={styles.card_bottom}>
            <Container className={styles.container_validasi}>
              {loading
                ? <LoadingSpinner />
                : <Row>
                  {/* doc : set state content to default , send to hasilsurvey admin pages, switch to table content*/}
                  <Button color="" className={styles.btn_back} onClick={handleBackButton}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} /> Back{" "}
                  </Button>
                  <Button color="" className={styles.btn_tandai} onClick={toggleModalTandai}>
                    Tandai
                  </Button>
                  <Button color="" className={styles.btn_validasi} onClick={toggleModalSetujui}>
                    Setujui
                  </Button>
                </Row>}
            </Container>
          </Card>
        </Container>
      </Row>
    </>
  )
}

// Change status Hasil Survey to reviewed upon open
const updateStatusHasilSurvey = (dataDetail) => {
  let formData = new FormData();
  formData.append('kodeHasilSurvey', dataDetail.data[0].kodeHasilSurvey);
  formData.append('status', "Reviewed");
  return (
    fetch(`${process.env.REACT_APP_BE_URL}/survey/changestatusbts/`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(() => true)
      .catch(() => true)
  );
};

const HasilSurveyDetailSurveyorBTS = (props) => {
  // Change status Hasil Survey to reviewed upon open
  updateStatusHasilSurvey(props.data);

  return (
    <ContentHasilSurveyor
      tab={props.tab}
      setContent={props.setContent}
      dataDetail={props.data}
      reload={props.reload}
      handleAlert={props.handleAlert} // handle alert passing
    />
  );
};

export default HasilSurveyDetailSurveyorBTS