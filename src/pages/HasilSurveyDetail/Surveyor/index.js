import React, { useState,useContext } from 'react'
import { Card, Row, Container, Col, Collapse, Button, ListGroupItem } from 'reactstrap'
import styles from './HasilSurveyDetailStyle.module.css'
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AdminProvider from "../../../context/AdminProvider";
import ArrowUp from '../../../assets/icons/Polygon1.svg'
import ArrowDown from '../../../assets/icons/Polygon2.svg'
import FlagIcon from "../../../assets/icons/flag.svg"
import ThumbnailIcon from "../../../assets/icons/thumbnail.svg"
import PopupImage from "../../../components/Popup/PopupImage"
import RootContextAdmin from "../../../context/adminContext"

import { useHistory } from 'react-router';
import ModalDetailSurvey from '../../../components/Popup/ModalDetailValidasi/Survey';
var moment = require('moment');
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
                        {data.tanggalPelaksanaan
                            ? moment(data.tanggalPelaksanaan).format("DD/MM/YYYY")
                            : ""}
                    </p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Akses Darat: </p>
                    <p>{data.modaTransportasi.darat.slice(1, -1)}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Akses Laut: </p>
                    <p>{data.modaTransportasi.laut.slice(1, -1)}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Akses Udara: </p>
                    <p>{data.modaTransportasi.udara.slice(1, -1)}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Durasi Perjalanan dari Kota Kecamatan: </p>
                    <p>{data.modaTransportasi.durasiPerjalanan ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Nama Kota Kecamatan : </p>
                    <p>{data.modaTransportasi.namaKotaKecamatan ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Elevation: </p>
                    <p>{data.elevation}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Tipe Bisnis: </p>
                    <p>{data.tipeBisnis}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Alamat: </p>
                    <p>{data.alamatLokasi}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>ID Pelanggan PLN: </p>
                    <p>{data.power.idPelangganPLN ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Sumber Listrik: </p>
                    <p>{data.power.sumber_listrik ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Kapasitas Listrik: </p>
                    <p>{data.power.kapasitas_listrik ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Sumber Listrik Cadangan: </p>
                    <p>{data.power.sumber_cadangan ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Jam Operasional Listrik: </p>
                    <p>{data.power.jamOperasionalListrik ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Jam Operasional Lokal: </p>
                    <p>{data.power.jamOperasionalLokal ?? "-"}</p>
                </Row>
                <Row className={styles.row_data_collapse}>
                    {/* <img src={FlagIcon} alt=""></img> */}
                    <p>Catatan </p>
                    <p>{data.note}</p>
                </Row>
            </Col>
        </Row>
    );
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
                                    let source = `http://202.182.55.252:8484${value.url}`;
                                    return (
                                        <>
                                            <Button color="" onClick={() => toggleImage(source)} className={styles.btn_img}>
                                                <p className={styles.image_capt}>{key}</p>
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

const ContentHasilSurveyor = ({ tab, setContent, data, reload }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    //handle Modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    //context hasil survey
    const contextHasilSurvey = useContext(RootContextAdmin)

    //history
    const history = useHistory();

    //ini untuk alasan di tandai
    const [dataAlasan, setDataAlasan] = useState('')




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

    const handleTandaiSurvey = async ({ dataTandai }) => {

        try {
            let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/tandaisurvey/`,
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            'kode': data[0].kodeHasilSurvey,
                            'jenis': 'ai',
                            'alasan': dataAlasan
                        }
                    )
                }

            )
            let response = await request.json()

            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: "Hasil Survey Berhasil di Deskripsikan" })

            setContent(0)
            reload()

        } catch (e) {

            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: "Hasil Survey Tidak Berhasil di Deskripsikan" })

            setContent(0)
            reload()

        }
    }

    //post data 
    //decline hasil survey
    const handleAlertDecline = async ({ dataSelected }) => {
        // 
        try {
            let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/declinesurvey/`,
                {
                    method: 'POST',
                    body: JSON.stringify(
                        { "kode": data[0].kodeHasilSurvey, "jenis": "ai" }
                    )
                }
            )
            let response = await request.json()
            // 
            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: "Hasil Survey Berhasil di Tolak" })

            setContent(0)
            reload()
            // 

        } catch (e) {
            // 
            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: "Hasil Survey Tidak Berhasil di Tolak" })

            setContent(0)
            reload()
            // 
        }
    }


    //approve hasil survey
    const handleAlertApprove = async ({ dataSelected }) => {
        try {
            let request = await fetch(`${process.env.REACT_APP_BE_URL}/survey/setujuisurvey/`,
                {
                    method: 'POST',
                    body: JSON.stringify(
                        { "kode": data[0].kodeHasilSurvey, "jenis": "ai" }
                    )
                }
            )
            let response = await request.json()
            // 
            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: "Hasil Survey Berhasil di Setujui" })

            setContent(0)
            reload()
            // 
        } catch (e) {
            // 
            contextHasilSurvey.dispatch({ type: "CHANGE_NOTIF", value: true })
            contextHasilSurvey.dispatch({ type: "CHANGE_ALERT", value: false })
            contextHasilSurvey.dispatch({ type: "CHANGE_MESSAGE", value: "Hasil Survey Tidak Berhasil di Setujui" })

            setContent(0)
            reload()
            // 
        }
    }
    const handleChange = (e) => {
        let term = e.target.value
        setDataAlasan(term)
    }
    return (
        <>
            <Row className={styles.row_top}>
                <h3 className={styles.title}>Manajemen Hasil Survey</h3>
            </Row>
            <Row className={styles.row_middle}>
                <Container>
                    <Card className={styles.card1}>
                        <Container>
                            <Row className={styles.wrapper_title_sub}>
                                <h3 className={styles.title_sub}>Detail Hasil Survey</h3>
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
                                            <p>{data[0].data[0].kodeHasilSurvey}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>-</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>-</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>-</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p className={styles.lokasi}>{data[0].data[0].alamatLokasi}</p>
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
                                            <p>{data[0].user.organization.name}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>{data[0].user.name}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>{data[0].status.slice(-1).pop().tanggal_pembuatan ? moment(data[0].status.slice(-1).pop().tanggal_pembuatan).format('DD/MM/YYYY') : ''}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row>
            {
                data.map((data, index) => {
                    return <CollapseItem key={index} data={data} />
                })
            }
            <Row className={styles.row_bottom}>
                <Container>
                    <Card className={styles.card_bottom}>
                        <Container className={styles.container_validasi}>
                            <Row>
                                <Button onClick={() => setContent(0)} color="" className={styles.btn_back}>{`< Back`}</Button>
                                <Button color="" className={styles.btn_tandai} onClick={toggleModal}>Tandai</Button>
                                <Button color="" className={styles.btn_validasi} onClick={handleAlertApprove}>Setujui</Button>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row>
            <ModalDetailSurvey isOpenModal={modal} toggleModal={toggleModal} handleChangeAlasan={handleChange} handleClick={handleTandaiSurvey} />
            {/* <Row className={styles.row_bottom}>
                <Container>
                    <Card className={styles.card_bottom}>
                        <Container className={styles.container_validasi}>
                            <Row>
                                doc : set state content to default , send to hasilsurvey admin pages, switch to table content
                                <Button onClick={() => setContent(0)} color="" className={styles.btn_back}>{`< Back`}</Button>
                                <Button color="" className={styles.btn_decline} >Tolak Hasil Survey</Button>
                                <Button color="" className={styles.btn_approve} >Setujui Hasil Survey</Button>
                            </Row>
                        </Container>
                    </Card>
                </Container>
            </Row> */}
        </>
    )
}

const CollapseItem = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    //arrow
    let arrow = '';
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
                                        <p className={styles.detail_titik_lokasi_text_data}>{`${data.longitude}, ${data.latitude}`}</p>
                                    </div>
                                </div>

                                <Button id={data.nomorSurvey} onClick={toggle} color="" className={styles.collapse_btn} >
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
    )
}

// const ChangeStatusHasilSurvey = async ({ code, nomorSurvey, status, tipe, setContent }) => {
//     let body = new FormData()
//     body.append('kode', code)
//     body.append('jenis', tipe)
//     body.append('nomorsurvey', nomorSurvey)
//     let request = await fetch(
//         status
//             ? `${process.env.REACT_APP_BE_URL}/survey/approvesurvey/`
//             : `${process.env.REACT_APP_BE_URL}/survey/declinesurvey/`,
//         {
//             method: 'POST',
//             body: body
//         }
//     )
//     let response = request.status === 200 && 'json' in request ?
//         await request.json() : []
// }


const HasilSurveyDetailSurveyor = (props) => {
    const [menu, setMenu] = React.useState("HASIL SURVEY");
    const changeMainSectionView = (item) => setMenu(item);

    return (
        <ContentHasilSurveyor tab={props.tab} setContent={props.setContent} data={props.data} reload={props.reload} />
        // <AdminProvider>
        //     <DashboardLayout
        // 		sidebar={ <Sidebar active={menu} action={changeMainSectionView}/> } 
        //         mainsection={<ContentHasilSurvey tab={props.location.tab} />}
        //     />
        // </AdminProvider>
    )
}

export default HasilSurveyDetailSurveyor

// import React, { useState } from 'react'
// import { Card, Row, Container, Col, Collapse, Button } from 'reactstrap'
// import styles from './HasilSurveyDetailStyle.module.css'
// import ModalDetailValidasi from '../../../../components/Popup/ModalDetailValidasi/Survey'
// import DashboardLayout from "../../../../components/Layout/DashboardLayout";
// import Sidebar from "../../../../components/Sidebar/Sidebar";
// import AdminSurveyorProvider from "../../../../context/AdminSurveyorProvider";
// import ArrowUp from '../../../../assets/icons/Polygon1.svg'
// import ArrowDown from '../../../../assets/icons/Polygon2.svg'
// import ThumbnailIcon from "../../../../assets/icons/thumbnail.svg"
// import PopupImage from "../../../../components/Popup/PopupImage"
// import { useHistory } from "react-router-dom"

// // import ModalDetailValidasi from '../../../components/Popup/ModalDetailValidasi/Survey'

// const IMAGES = [
//     {
//         src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
//         thumbnail:
//             "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 174,
//         caption: "After Rain (Jeshu John - designerspics.com)"
//     },
//     {
//         src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//         thumbnail:
//             "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         tags: [
//             { value: "Ocean", title: "Ocean" },
//             { value: "People", title: "People" }
//         ],
//         caption: "Boats (Jeshu John - designerspics.com)"
//     },

//     {
//         src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//         thumbnail:
//             "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         caption: "Boats (Jeshu John - designerspics.com)"
//     },
//     {
//         src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
//         thumbnail:
//             "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 174,
//         caption: "After Rain (Jeshu John - designerspics.com)"
//     },
//     {
//         src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//         thumbnail:
//             "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         tags: [
//             { value: "Ocean", title: "Ocean" },
//             { value: "People", title: "People" }
//         ],
//         caption: "Boats (Jeshu John - designerspics.com)"
//     },

//     {
//         src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//         thumbnail:
//             "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         caption: "Boats (Jeshu John - designerspics.com)"
//     }

// ];


// const HasilSurveyDetail = ({ setContent, data }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     

//     const [modal, setModal] = useState(false);
//     const toggleModal = () => setModal(!modal);

//     const [modalImage, setModalImage] = useState(false);
//     let toggleImage = () => {
//         setModalImage(!modalImage);
//     }
//     //history
//     let history = useHistory();

//     //arrow
//     let arrow = '';
//     if (isOpen) {
//         arrow = <img src={ArrowUp} alt=""></img>;
//     } else {
//         arrow = <img src={ArrowDown} alt=""></img>;
//     }
//     return (
//         <>
//             <Row className={styles.row_top}>
//                 <h3 className={styles.title}>Manajemen Hasil Survey</h3>
//             </Row>
//             <Row className={styles.row_middle}>
//                 <Container>
//                     <Card className={styles.card1}>
//                         <Container>
//                             <Row className={styles.wrapper_title_sub}>
//                                 <h3 className={styles.title_sub}>Detail Hasil Survey</h3>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Kode Survey: </p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Provinsi: </p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Kabupaten/Kota: </p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Kecamatan: </p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Lokasi Survey: </p>
//                                         </div>
//                                     </div>
//                                 </Col>

//                                 <Col>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>AI-YOGYA-00125</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>KUDUS</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>KUDUS</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>KUDUS</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p className={styles.lokasi}>Desa Demaan</p>
//                                         </div>
//                                     </div>
//                                 </Col>

//                                 <Col>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Jenis Survey: </p>
//                                         </div>
//                                     </div>

//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Nama Instansi Surveyor: </p>
//                                         </div>
//                                     </div>

//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Nama Pelaksana: </p>
//                                         </div>
//                                     </div>

//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Tanggal Penugasan: </p>
//                                         </div>
//                                     </div>
//                                 </Col>

//                                 <Col>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Akses Internet</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>BAKTI</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>Cameron Warren</p>
//                                         </div>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.row_detail}>
//                                             <p>20 Juli 2020</p>
//                                         </div>
//                                     </div>
//                                 </Col>

//                             </Row>
//                         </Container>
//                     </Card>
//                 </Container>
//             </Row>
//             <Row className={styles.row_below}>
//                 <Container>
//                     <Card className={styles.card2}>
//                         <div className={styles.bordered}>
//                             <Container>
//                                 <div className={styles.wrapper_collap}>
//                                     <div className={styles.wrapper_left}>
//                                         <div className={styles.title_titik_lokasi}>
//                                             <p className={styles.title_titik_lokasi_text}>Titik Lokasi: </p>
//                                         </div>
//                                         <div className={styles.detail_titik_lokasi}>
//                                             <p className={styles.detail_titik_lokasi_text}>BALAI DESA</p>
//                                             <p className={styles.detail_titik_lokasi_text_data}>6.2088° S, 106.8456° E</p>
//                                         </div>
//                                     </div>

//                                     <Button onClick={toggle} color="" className={styles.collapse_btn} >
//                                         <i className='btn-icon'>{arrow}</i>
//                                     </Button>
//                                 </div>
//                             </Container>
//                         </div>
//                         <Collapse isOpen={isOpen}>
//                             <Container>
//                                 <Row className={styles.row_data}>

//                                     <Col xs="8" >
//                                         <Row>
//                                             <span className={styles.sectionOne}>
//                                                 Section 1 : Data Calon Pelanggan 
//                                             </span>
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>PIC Desa: </p>
//                                             <p>Mail</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Nomor Telepon PIC Desa: </p>
//                                             <p>0812 3456 789</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Tanggal Pelaksanaan: </p>
//                                             <p>12 Januari 2020</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Akses Darat: </p>
//                                             <p>Bis, Rakit</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Akses Laut: </p>
//                                             <p>Speedboat, Sampan</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Akses Udara: </p>
//                                             <p>Helicopter</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Durasi Perjalanan dari Kota Kecamatan : </p>
//                                             <p>5 jam</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Nama Kota Kecamatan : </p>
//                                             <p>Pakulonan</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Elevation : </p>
//                                             <p>3 meter</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Tipe Bisnis :</p>
//                                             <p>Government</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Alamat :</p>
//                                             <p>Jl. Demaan</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>ID Pelanggan PLN :</p>
//                                             <p>010102</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Sumber Listrik :</p>
//                                             <p>PLN</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Kapasitas Listrik :</p>
//                                             <p>2500</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Sumber Listrik Cadangan :</p>
//                                             <p>300</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Jam Operasional Listrik :</p>
//                                             <p>8.30 - 22.00</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Jam Operasional Lokal :</p>
//                                             <p>8.30 - 22.00</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Catatan :</p>
//                                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//                                                 Facilisis nibh in senectus enim proin at sit. 
//                                                 Morbi egestas amet at duis quisque quam posuere dui. 
//                                                 Dui ipsum eu eu ipsum sed ultricies pharetra. 
//                                                 Auctor lobortis auctor ut pulvinar mus malesuada sed.
//                                             </p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                                 <Row className={styles.row_data}>
//                                     <Col xs="8" >
//                                         <Row>
//                                             <span className={styles.sectionOne}>
//                                                 Section 2 : Keterangan Perangkat IT Di Lokasi 
//                                             </span>
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Komputer: </p>
//                                             <p>5</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Tablet: </p>
//                                             <p>2</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Smartphone: </p>
//                                             <p>10</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                         <Row className={styles.row_data_collapse}>
//                                             <p>Laptop: </p>
//                                             <p>7</p>
//                                             {/* <img alt="" src={ThumbnailIcon}></img> */}
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                                 <Row className={styles.row_data}>
//                                     <Col xs="5" >
//                                         <Row>
//                                             <span className={styles.sectionOne}>
//                                                 Section 3 : Foto Lokasi
//                                             </span>
//                                         </Row>
//                                     </Col>
//                                     <Col xs="5">
//                                         <Row className={`${styles.row_data_collapse}`}>
//                                             <div className={styles.data_gallery}>
//                                                 {
//                                                     IMAGES.map((img) => {
//                                                         let source = img.src;
//                                                         return (<>

//                                                             <Button color="" onClick={toggleImage} className={styles.btn_img}>
//                                                                 <p className={styles.image_capt}>{img.caption}</p>
//                                                                 <img alt="" className={styles.image} src={source}></img>
//                                                             </Button>


//                                                             <PopupImage image={source} modalImage={modalImage} toggleImage={toggleImage} />
//                                                         </>)
//                                                     })
//                                                 }
//                                             </div>
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                             </Container>
//                         </Collapse>
//                     </Card>
//                 </Container>
//             </Row>
//             <Row className={styles.row_bottom}>
//                 <Container>
//                     <Card className={styles.card_bottom}>
//                         <Container className={styles.container_validasi}>
//                             <Button color="" className={styles.btn_tandai} onClick={toggleModal}>Tandai</Button>
//                             <Button color="" className={styles.btn_validasi} onClick={() => setContent(0)}>Setujui</Button>
//                         </Container>
//                     </Card>
//                 </Container>
//             </Row>
//             <ModalDetailValidasi isOpenModal={modal} toggleModal={toggleModal} />
//         </>
//     )
// }

// // onClick={() => setContent(0)}
// const HasilSurveyDetailSurveyor = (props) => {
//     // const [menu, setMenu] = React.useState("DASHBOARD");
//     // const changeMainSectionView = (item) => setMenu(item);

//     // return (
//     //     <AdminSurveyorProvider>
//     //         <DashboardLayout
//     //             sidebar={<Sidebar active={menu} action={changeMainSectionView} />}
//     //             mainsection={<HasilSurveyDetail />}
//     //         />
//     //     </AdminSurveyorProvider>
//     // )
//     return (
//         <HasilSurveyDetail setContent={props.setContent} />
//     )
// }

// export default HasilSurveyDetailSurveyor