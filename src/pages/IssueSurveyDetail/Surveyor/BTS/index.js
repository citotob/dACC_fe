import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Container, Col, Collapse, Button } from "reactstrap";
import styles from "./IssueSurveyDetailStyle.module.css";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import AdminProvider from "../../../../context/AdminProvider";
import ArrowUp from "../../../../assets/icons/Polygon1.svg";
import ArrowDown from "../../../../assets/icons/Polygon2.svg";
import ThumbnailIcon from "../../../../assets/icons/thumbnail.svg";
import FlagIcon from "../../../../assets/icons/flag.svg";
import PopupImage from "../../../../components/Popup/PopupImage";
import { useHistory } from "react-router-dom";
import RootContext from "../../../../context";
import RootContextAdmin from "../../../../context/adminContext";
import IconMap from "../../../../assets/icons/IconMap.svg";
import IconBack from "../../../../assets/icons/ArrowBack.svg";
// import { style } from 'd3';
import PopupMap from "../../../../components/Popup/PopupMap";
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
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>PIC Desa: </p>
                    <p>{data.pic.namaPic ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Nomor Telepon PIC Desa: </p>
                    <p>{data.pic.phonePic ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Tanggal Pelaksanaan: </p>
                    <p>
                        {data.tanggalPelaksanaan ? moment(data.tanggalPelaksanaan).format("DD/MM/YYYY") : ""}
                    </p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Akses Darat: </p>
                    <p>{"-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Akses Laut: </p>
                    <p>{"-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Akses Udara: </p>
                    <p>{"-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Durasi Perjalanan dari Kota Kecamatan: </p>
                    <p> - </p>
                    {/* <p>{data.modaTransportasi.durasiPerjalanan ?? "-"} jam</p> */}
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Nama Kota Kecamatan : </p>
                    <p> - </p>
                    {/* <p>{data.modaTransportasi.namaKotaKecamatan ?? "-"}</p>  */}
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Elevation: </p>
                    <p> - </p>
                    {/* <p>{data.elevation ?? "-"} meter</p> */}
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Tipe Bisnis: </p>
                    <p>{data.tipeBisnis ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Alamat: </p>
                    <p>{data.alamatLokasi ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>ID Pelanggan PLN: </p>
                    <p>{data.idPelangganPLN ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Sumber Listrik: </p>
                    <p>{data.sumber_listrik ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Kapasitas Listrik: </p>
                    <p>{data.kapasitas_listrik ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Sumber Listrik Cadangan: </p>
                    <p>{data.sumber_cadangan ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Jam Operasional Listrik: </p>
                    <p>{data.jamOperasionalListrik ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Jam Operasional Lokal: </p>
                    <p>{data.jamOperasionalLokal ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                     {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Catatan </p>
                    <p>{data.note ?? "-"}</p>
                </Row>
            </Col>
        </Row>
    );
};

const SectionPerangkatIT = ({ data }) => {
    return (
        <Row className={styles.row_data}>
            <Col xs="5" className={styles.wrapper_section}>
                <Row className={styles.text_section}>
                    <h5>Section 2 : Keterangan Perangkat IT di Lokasi</h5>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Komputer : </p>
                    {/* <p>{data.pc} buah</p> */}
                    <p> - </p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Tablet : </p>
                    {/* <p>{data.tablet} buah</p> */}
                    <p> - </p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Smartphone : </p>
                    {/* <p>{data.smartPhone} buah</p> */}
                    <p> - </p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Laptop: </p>
                    {/* <p>{data.laptop} buah</p> */}
                    <p> - </p>
                </Row>
                {/* {data.lainnya1 && Object.keys(data.lainnya1).length !== 0 && (
                <Row className={styles.row_data_collapse}>
                    <p>`{data.lainnya1.nama}`</p>
                    <p>{data.lainnya1.qty}</p>
                </Row>
                )}
                {data.lainnya2 && Object.keys(data.lainnya2).length !== 0 && (
                <Row className={styles.row_data_collapse}>
                    <p>`{data.lainnya2.nama}`</p>
                    <p>{data.lainnya2.qty}</p>
                </Row>
                )} */}
            </Col>
        </Row>
    );
};

const SectionFotoLokasi = ({ data }) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
        setImage(img);
        setModalImage(!modalImage);
    };

    const title = (text) => {
        var name = "";
        switch (text) {
            case "aksesJalan":
                name = "Akses Jalan";
                break;
            case "plang":
                name = "Plang";
                break;
            case "markingPerangkat":
                name = "Marking Perangkat";
                break;
            case "kwhMeter":
                name = "KWH Meter";
                break;
            case "gambarDenah":
                name = "Gambar Denah";
                break;
            case "lanskapBangunan":
                name = "Landscape Bangunan";
                break;
            default:
                name = "-";
                break;
        }
        return name;
    };

    return (
        <>
            <Row className={`${styles.row_data} ${styles.text_section}`}>
                <h5>Section 3 : Foto Lokasi</h5>
            </Row>
            <Row className={styles.row_data}>
                <Col xs="5" className={styles.wrapper_section}>
                    <Row>
                        <p>Foto Lokasi :</p>
                    </Row>
                </Col>
                <Col xs="5">
                    <Row className={`${styles.row_data_collapse}`}>
                        {/* <Button color="" onClick={toggleImage} className={styles.btn_img}>
                                    <p className={styles.image_capt}>{'asd'}</p>
                                    <img alt="" className={styles.image} src={'http://202.182.55.252:8484/media/survey/foto/scaled_a78f8bf1-85bd-487d-8576-1651c89b5c1c4936808297435517435.jpg'}></img>
                                </Button> */}
                        <PopupImage image={image} modalImage={modalImage} toggleImage={toggleImage} />
                        {Object.entries(data).map(([key, value]) => {
                            let source = `${process.env.REACT_APP_BE_URL}${value.url}`;
                            return (
                                <>
                                    <Button color="" onClick={() => toggleImage(source)} className={styles.btn_img}>
                                        <p className={styles.image_capt}>{title(key)}</p>
                                        <div className={styles.img_wrapper}>
                                            <img alt="" className={styles.image} src={source}></img>
                                        </div>
                                    </Button>
                                </>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const ContentIssueSurvey = ({ tab, setContent, reload, dataIssue }) => {
    //
    let [dataIssuePelanggan, setDataIssuePelanggan] = useState({});
    let contextData = useContext(RootContext);
    let data = contextData.data;

    //text jenis survey
    let jenis_survey = tab === "AI" ? "Akses Internet" : "BTS";
    //style
    let styleJenis = {
        color: tab == "AI" ? "#485EEB" : "red",
    };

    //context notif issue tolak
    const contextHasilSurvey = useContext(RootContextAdmin);

    //approve hasil survey
    const handleAlertApprove = async ({ dataSelected }) => {
        try {
            let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/approvesurvey/`, {
                method: "POST",
                body: JSON.stringify({ kode: contextData.data.kodeSurvey, jenis: "ai" }),
            });

            let response = await request.json();

            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true });
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true });
            contextHasilSurvey.dispatch({
                type: "CHANGE_MESSAGE",
                value: "Hasil Survey Berhasil di Setujui",
            });

            setContent(0);
            reload();
        } catch (e) {
            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true });
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: false });
            contextHasilSurvey.dispatch({
                type: "CHANGE_MESSAGE",
                value: "Hasil Survey Tidak Berhasil di Setujui",
            });

            setContent(0);
            reload();
        }
    };

    return (
        <>
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
                                <Col xs="3">
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>Deskripsi Issue: </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="8">
                                    <div className={styles.row_issue_desc}>
                                        <p>
                                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis nibh in senectus enim proin at sit. Morbi egestas amet at duis quisque quam posuere dui. Dui ipsum eu eu ipsum sed ultricies pharetra. Auctor lobortis auctor ut pulvinar mus malesuada sed. */}
                                            {contextData.data.data[0].issue[0].alasan ?? "-"}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Col className="p-2">Kode Survey :</Col>
                                    <Col className="p-2">Provinsi :</Col>
                                    <Col className="p-2">Kabupaten/Kota :</Col>
                                    <Col className="p-2">Kecamatan :</Col>
                                    <Col className="p-2">Lokasi Survey :</Col>
                                </Col>
                                <Col>
                                    <Col className="p-2">
                                        {contextData.data.data[0].kodeHasilSurvey}
                                        {contextData.data.data[0].issue[0].status ? <img src={FlagIcon} alt=""></img> : ""}
                                    </Col>
                                    <Col className="p-2">Pending</Col>
                                    <Col className="p-2">Pending</Col>
                                    {/* <Col className="p-2">
                        {contextData.data.data[0].modaTransportasi.namaKotaKecamatan}
                    </Col> */}
                                    <Col className="p-2">{contextData.data.data[0].alamatLokasi}</Col>
                                </Col>
                                <Col>
                                    <Col className="p-2">Jenis Survey:</Col>
                                    <Col className="p-2">Nama Instansi Surveyor:</Col>
                                    <Col className="p-2">Nama Pelaksana:</Col>
                                    <Col className="p-2">Tanggal Penugasan:</Col>
                                </Col>
                                <Col>
                                    <Col className="p-2">{jenis_survey}</Col>
                                    <Col className="p-2">{contextData.data.data[0].user.organization.name}</Col>
                                    <Col className="p-2">{contextData.data.data[0].user.role.name}</Col>
                                    <Col className="p-2">
                                        {contextData.data.data[0].status.tanggal_pembuatan
                                            ? moment(contextData.data.data[0].status.tanggal_pembuatan).format(
                                                "DD/MM/YYYY"
                                            )
                                            : ""}
                                    </Col>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row>
            {contextData.data.data.map((data, index) => {
                return <CollapseItem key={index} data={data} />;
            })}
            <Row className={styles.row_bottom}>
                <Container>
                    <Card className={styles.card_bottom}>
                        <Container className={styles.container_validasi}>
                            <Row>
                                <Button color="" className={styles.btn_back} onClick={() => setContent(0)}> <FontAwesomeIcon icon={faArrowCircleLeft} /> Back{" "}</Button>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row>
        </>
    );
};

const CollapseItem = ({ data }) => {
    const [modalMap, setModalMap] = useState(false);
    let toggleMap = () => {
        setModalMap(!modalMap);
    };
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    //history
    let history = useHistory();
    //arrow
    let arrow = "";
    if (isOpen) {
        arrow = <img src={ArrowUp} alt=""></img>;
    } else {
        arrow = <img src={ArrowDown} alt=""></img>;
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
                                        <p
                                            className={
                                                styles.detail_titik_lokasi_text_data
                                            }>{`${data.longitude}, ${data.latitude}`}</p>
                                    </div>
                            &nbsp;&nbsp;
                            <img alt="" className={styles.cursor} src={IconMap} onClick={toggleMap}></img>
                                    <PopupMap
                                        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
                                        modalMap={modalMap}
                                        toggleMap={toggleMap}
                                    />
                                </div>

                                <Button onClick={toggle} color="" className={styles.collapse_btn}>
                                    <i className="btn-icon">{arrow}</i>
                                </Button>
                            </div>
                        </Container>
                    </div>
                    <Collapse isOpen={isOpen}>
                        <Container>
                            <SectionDataPelanggan data={data} />
                            <SectionPerangkatIT data={data.device} />
                            <SectionFotoLokasi data={data} />
                        </Container>
                    </Collapse>
                </Card>
            </Container>
        </Row>
    );
};
const IssueSurveyDetailSurveyorBTS = (props) => {
    return (
        <ContentIssueSurvey
            tab={props.tab}
            setContent={props.setContent}
            reload={props.reload}
            dataIssue={props.data.data}
        />
    );
};

export default IssueSurveyDetailSurveyorBTS;
