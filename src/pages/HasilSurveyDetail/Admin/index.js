import React, { useState } from 'react'
import { Card, Row, Container, Col, Collapse, Button } from 'reactstrap'
import styles from './HasilSurveyDetailStyle.module.css'
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AdminProvider from "../../../context/AdminProvider";
import ArrowUp from '../../../assets/icons/Polygon1.svg'
import ArrowDown from '../../../assets/icons/Polygon2.svg'
import FlagIcon from "../../../assets/icons/flag.svg"
import ThumbnailIcon from "../../../assets/icons/thumbnail.svg"
import PopupImage from "../../../components/Popup/PopupImage"
var moment = require('moment');


const IMAGES = [
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail:
            "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail:
            "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [
            { value: "Ocean", title: "Ocean" },
            { value: "People", title: "People" }
        ],
        caption: "Boats (Jeshu John - designerspics.com)"
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail:
            "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    // {
    //     src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    //     thumbnail:
    //         "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    //     thumbnailWidth: 320,
    //     thumbnailHeight: 174,
    //     caption: "After Rain (Jeshu John - designerspics.com)"
    // },
    // {
    //     src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    //     thumbnail:
    //         "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    //     thumbnailWidth: 320,
    //     thumbnailHeight: 212,
    //     tags: [
    //         { value: "Ocean", title: "Ocean" },
    //         { value: "People", title: "People" }
    //     ],
    //     caption: "Boats (Jeshu John - designerspics.com)"
    // },

    // {
    //     src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    //     thumbnail:
    //         "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    //     thumbnailWidth: 320,
    //     thumbnailHeight: 212,
    //     caption: "Boats (Jeshu John - designerspics.com)"
    // }

];

const SectionDataPelanggan = ({ data }) => {
    return (
        <Row className={styles.row_data}>
            <Col xs="5" className={styles.wrapper_section} >
                <Row className={styles.text_section}>
                    <h5>
                        Section 1 : Data Calon Pelanggan
                </h5>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>ID Pelanggan PLN: </p>
                    <p>{data.idPelangganPLN}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Sumber Listrik: </p>
                    <p>{data.sumber_listrik}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Kapasitas Listrik: </p>
                    <p>{data.kapasitas_listrik}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Jam Operasional Listrik: </p>
                    <p>{data.jamOperasionalListrik}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>jam Operasional Lokal: </p>
                    <p>{data.jamOperasionalLokal}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Sumber Listrik Cadangan: </p>
                    <p>{data.sumber_cadangan}</p>
                </Row>
            </Col>

        </Row>
    )
}

const SectionPerangkatIT = ({ data }) => {
    return (
        <Row className={styles.row_data}>
            <Col xs="5" className={styles.wrapper_section} >
                <Row className={styles.text_section}>
                    <h5>
                        Section 2 : Keterangan Perangkat IT di Lokasi
            </h5>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Komputer : </p>
                    <p>{data.pc}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Tablet : </p>
                    <p>{data.tablet}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Smartphone : </p>
                    <p>{data.smartPhone}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    <p>Laptop: </p>
                    <p>{data.laptop}</p>
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
            </Col>
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
    return (
        <>
            <Row className={`${styles.row_data} ${styles.text_section}`}>
                <h5>
                    Section 3 : Foto Lokasi
                    </h5>
            </Row>
            <Row className={styles.row_data_foto}>
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
                            {/* <Button color="" onClick={toggleImage} className={styles.btn_img}>
                                <p className={styles.image_capt}>{'asd'}</p>
                                <img alt="" className={styles.image} src={'http://202.182.55.252:8484/media/survey/foto/scaled_a78f8bf1-85bd-487d-8576-1651c89b5c1c4936808297435517435.jpg'}></img>
                            </Button> */}
                            <PopupImage image={image} modalImage={modalImage} toggleImage={toggleImage} />
                            {
                                Object.entries(data).map(([key, value]) => {
                                    let source = `http://202.182.55.252:8484${value.url}`;
                                    return (
                                        <>
                                            <Button color="" onClick={() => toggleImage(source)} className={styles.btn_img}>
                                                <p className={styles.image_capt}></p>
                                                <div className={styles.img_wrapper}>
                                                    <img alt="" className={styles.image} src={source}></img>
                                                </div>
                                            </Button>


                                        </>
                                    )
                                })
                                // IMAGES.map((img) => {
                                //     let source = img.src;
                                //     return (<>

                                //         <Button color="" onClick={toggleImage} className={styles.btn_img}>
                                //             <p className={styles.image_capt}>{img.caption}</p>
                                //             <img className={styles.image} src={source} alt=""></img>
                                //         </Button>


                                //         <PopupImage image={source} modalImage={modalImage} toggleImage={toggleImage} />
                                //     </>)
                                // })
                            }
                        </div>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

const ContentHasilSurvey = ({ tab, setContent, data }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    //handle Modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    //arrow
    let arrow = '';
    if (isOpen) {
        arrow = <img src={ArrowUp} alt=""></img>;
    } else {
        arrow = <img src={ArrowDown} alt=""></img>;
    }
    //text jenis
    let jenis_survey = tab == "AI" ? "Akses Internet" : "BTS"
    //style
    let styleJenis = {
        color: tab == "AI" ? "#485EEB" : "red"
    }
    //style hasil survey
    let styleHasilSurvey = {
        backgroundColor: tab == "AI" ? "#485EEB" : "red"
    }
    return (
        <>
            <Row className={styles.row_top}>
                <h3 className={styles.title}>Manajemen Hasil Survey</h3>
            </Row>
            <Row className={styles.row_middle}>
                <Container>
                    <Card className={styles.card}>
                        <Container>
                            <Row className={styles.wrapper_title_sub}>
                                <h3 className={styles.title_sub}>Detail Issue</h3>
                            </Row>
                            <Row>
                                <Col>
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
                                </Col>
                                <Col>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            {/* <p>00010</p> */}
                                            <p>{data.kodeHasilSurvey}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>Kudus</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>Kudus</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>Kudus</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p className={styles.lokasi}>{data.namaLokasi}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
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
                                            <p>Tanggal Penugasan: </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p style={styleJenis}>{jenis_survey}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>{data.user.organization.name}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>{data.user.name}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>{data.status.slice(-1).pop().tanggal_pembuatan ? moment(data.status.slice(-1).pop().tanggal_pembuatan).format('DD/MM/YYYY') : ''}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row>
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
                                            <p className={styles.detail_titik_lokasi_text_data}>{`${data.longitude}, ${data.latitude}`}</p>
                                        </div>
                                    </div>

                                    <Button onClick={toggle} color="" className={styles.collapse_btn} >
                                        <i className='btn-icon'>{arrow}</i>
                                    </Button>
                                </div>
                            </Container>
                        </div>
                        <Collapse isOpen={isOpen}>
                            <Container>
                                <SectionDataPelanggan data={data.power} />
                                <SectionPerangkatIT data={data.device} />
                                <SectionFotoLokasi data={data.listFoto} />
                            </Container>
                        </Collapse>
                    </Card>
                </Container>
            </Row>
            <Row className={styles.row_bottom}>
                <Container>
                    <Card className={styles.card_bottom}>
                        <Container className={styles.container_validasi}>
                            <Row>
                                <Button onClick={() => setContent(0)} color="" className={styles.btn_back}>{`< Back`}</Button>
                                <Button color="" className={styles.btn_decline} >Tolak Hasil Survey</Button>
                                <Button color="" className={styles.btn_approve} >Setujui Hasil Survey</Button>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row>
        </>
    )
}




const HasilSurveyDetailAdmin = (props) => {
    const [menu, setMenu] = React.useState("HASIL SURVEY");
    const changeMainSectionView = (item) => setMenu(item);

    return (
        <ContentHasilSurvey tab={props.tab} setContent={props.setContent} data={props.data} />
        // <AdminProvider>
        //     <DashboardLayout
        // 		sidebar={ <Sidebar active={menu} action={changeMainSectionView}/> } 
        //         mainsection={<ContentHasilSurvey tab={props.location.tab} />}
        //     />
        // </AdminProvider>
    )
}

export default HasilSurveyDetailAdmin