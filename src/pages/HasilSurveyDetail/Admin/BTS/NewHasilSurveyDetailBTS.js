import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import { faChevronLeft, faChevronRight, faFlag } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios'
import get from "lodash.get";
import { allpage } from "../../Surveyor/BTS/JSONLabel/allpage"
import ModalLoading from '../../../../components/Popup/ModalLoading'
import ModalTolakSurvey from '../../../../components/Popup/ModalTolakSurvey'
import axiosPost from '../../../../services/axioPost'
import { useHistory } from 'react-router-dom';
import AlertSukses from '../../../../components/Popup/Alert/AlertSukses'
import AlertFail from '../../../../components/Popup/Alert/AlertFail'
import { pointer } from 'd3-selection'
import ModalFlag from '../../../../components/Popup/ModalFlag'
import { isNumber } from 'underscore'

var moment = require('moment');


// const updateStatusHasilSurvey = (dataDetail) => {
//     let formData = new FormData();
//     formData.append('kodeHasilSurvey', dataDetail.data[0].kodeHasilSurvey);
//     formData.append('status', "Reviewed");
//     return (
//         fetch(`${process.env.REACT_APP_BE_URL}/survey/changestatusbts/`, {
//             method: 'POST',
//             body: formData
//         })
//             .then((response) => response.json())
//             .then(() => true)
//             .catch(() => true)
//     );
// };


const NewHasilSurveyDetailBTS = (props) => {
    // Change status Hasil Survey to reviewed upon open
    // updateStatusHasilSurvey(props.data);
    const [dataDetail, setDataDetail] = useState([]);
    const [dataPage, setDataPage] = useState([]);
    const [subdataPage, setSubDataPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const { kode_survei } = useParams()
    const [alreadyFetch, setAlreadyFetch] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [titlePanel, setTitlePanel] = useState("");
    const [subTitlePanel, setSubTitlePanel] = useState("");
    const [modalSetujui, setModalSetujui] = useState(false);
    const [modalTolak, setModalTolak] = useState(false);
    const [alasan, setAlasan] = useState("");
    const [openSukses, setOpenSukses] = useState(false);
    const [openFailed, setOpenFailed] = useState(false);
    const [message, setMessage] = useState("");

    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorfetch, seterrorfetch] = useState(false);

    const [pagedbkey, setPageDB] = useState("");
    const [flagkey, setFlagkey] = useState("");
    const [flagindex, setFlagIndex] = useState("-");
    const [alasanflag, setAlasanFlag] = useState("");
    const [modalFlag, setModalFlag] = useState(false);
    const [flagobject, setFlagObject] = useState();


    const userid = window.localStorage.getItem("userid");
    const history = useHistory();


    let locationData = dataDetail?.lokasi;
    let styleJenis = {
        color: "red"
    }
    let jenis_survey = "BTS"

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let arrow = '';
    if (isOpen) {
        arrow = <img src={ArrowUp} alt=""></img>;
    } else {
        arrow = <img src={ArrowDown} alt=""></img>;
    }

    function setCurrentData(datautama, dataperlabelan, index) {
        // console.log(datautama)
        let pagenya = []
        let pagedb = ''
        let pagenya2 = []

        if (Object.prototype.hasOwnProperty.call(dataperlabelan['page' + index], 'custompage')) {
            pagedb = dataperlabelan['page' + index]['custompage']
        } else {
            pagedb = 'page' + index
        }
        setPageDB(pagedb);

        let datanya = dataperlabelan['page' + index]['data']
        setTitlePanel(dataperlabelan['page' + index]['title'])

        if (Object.prototype.hasOwnProperty.call(dataperlabelan['page' + index], 'subtitle')) {
            setSubTitlePanel(dataperlabelan['page' + index]['subtitle'])
            let datasub = dataperlabelan['page' + index]['datasub']
            datasub.map((data) => {
                if (Object.prototype.hasOwnProperty.call(data, 'key')) {
                    pagenya2.push([data['label'], datautama["data"][0][pagedb][data['key']], data['suffix'] ?? "", data['key']])
                } else {
                    let str = data['label'];
                    str = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                    str = str.replace(/\s+/g, '');
                    str = str.toLocaleLowerCase()
                    pagenya2.push([data['label'], datautama["data"][0][pagedb][str], data['suffix'] ?? "", str])
                }
            })
            setSubDataPage(pagenya2);
        }

        datanya.map((data) => {
            if (Object.prototype.hasOwnProperty.call(data, 'key')) {
                pagenya.push([data['label'], datautama["data"][0][pagedb][data['key']], data['suffix'] ?? "", data['key']])
            } else {
                let str = data['label'];
                str = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                str = str.replace(/\s+/g, '');
                str = str.toLocaleLowerCase()
                pagenya.push([data['label'], datautama["data"][0][pagedb][str], data['suffix'] ?? "", str])
            }
        })

        return pagenya
    }

    async function fetchwa(kode_survei) {
        if (!alreadyFetch) {
            setLoading(true)
            setLoadingFetch(true)

            try {
                let body = new FormData();
                body.append("kode_survei", kode_survei);
                let request2 = await fetch(
                    `${process.env.REACT_APP_BE_URL}/survey/getSurveyBTSbyKode/`,
                    {
                        method: "POST",
                        body: body,
                    }
                );
                let response2 = request2.status === 200 && "json" in request2 ? await request2.json() : [];
                setDataDetail(response2.values[0]);

                setDataPage(setCurrentData(response2.values[0], allpage, 1));

                if (response2.values[0].data[0].status.slice(-1).pop().status == "Submitted") {
                    let updatestatus = await axiosPost(`${process.env.REACT_APP_BE_URL}/survey/changestatusbtsnew/`, {
                        "id": response2.values[0].data[0]['_id']['$oid'],
                        "kode": kode_survei
                    })
                }

                if (response2.values[0].data[0]?.flagged == "True") {
                    setFlagObject(response2.values[0].data[0]?.flag)
                }
                setActivePage(1);
            } catch (error) {
                
            }

            setLoadingFetch(false)
            setAlreadyFetch(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        //fetch
        fetchwa(kode_survei);
        // setOpenFailed(true);
        // setOpenSukses(true);
        // setMessage("kom a ansda asidaid")

        return () => { };
    }, [kode_survei])

    function handleNextPage() {
        if (activePage == 22) {
            let nextpage = 1

            setDataPage(setCurrentData(dataDetail, allpage, nextpage));
            setActivePage(nextpage);
        } else {
            let nextpage = activePage + 1

            setDataPage(setCurrentData(dataDetail, allpage, nextpage));
            setActivePage(nextpage);
        }
    }

    function handlePreviousPage() {
        if (activePage > 1) {
            let prevpage = activePage - 1

            setDataPage(setCurrentData(dataDetail, allpage, prevpage));
            setActivePage(prevpage);
        } else {
            let prevpage = 22

            setDataPage(setCurrentData(dataDetail, allpage, prevpage));
            setActivePage(prevpage);
        }
    }

    function determineOutput(out, label, suffix) {
        // custom section :
        if (label == "Level Sinyal 4G Jika ada Jangkauan") {
            let outfix = out.split("|")
            return `${outfix[0]} ( ${outfix[1]} dBm )`
        }
        if (label == "Harga BBM di Lokasi") {
            return `Rp ${out} /liter`
        }
        if (label == "Populasi (Orang/KK)") {
            let outfix = out.split("x")
            return `${outfix[0]} Orang / ${outfix[1]} KK`
        }

        if (typeof out == "string") {
            if (suffix != "" && (typeof suffix != "undefined")) {
                return out + " " + suffix
            } else {
                return out
            }
        }
        if (typeof out == "object") {
            if (Array.isArray(out)) {
                return out.join(", ")
            }
            else {
                //foto
                return parsePhoto(out)
            }
        }
    }

    function parsePhoto(fotoObject) {
        var lat = fotoObject.exif_lat ?? fotoObject.exif_lat != 0 ? fotoObject.exif_lat : fotoObject.device_lat
        var lon = fotoObject.exif_lon ?? fotoObject.exif_lon != 0 ? fotoObject.exif_lon : fotoObject.device_lon

        var desc = fotoObject?.deskripsi ?? ""
        var hasdesc = desc != ""

        return (
            <div>
                <div className="row">
                    <div className={hasdesc ? "col-8" : "col-12"}>
                        <div className={styles.containerfoto}>
                            <img style={{ maxHeight: "500px", width: "100%" }} src={`${process.env.REACT_APP_BE_URL}${fotoObject.path}`} className="img-thumbnail rounded" />
                            <div className={styles.textblockfoto}>
                                <p style={{ fontSize: "8px" }}>Latitude : {lat}</p>
                                <p style={{ fontSize: "8px" }}>Longitude : {lon}</p>
                            </div>
                        </div>
                    </div>

                    {
                        hasdesc ?
                            <div className="col-4">
                                <p>
                                    {desc}
                                </p>
                            </div> : null
                    }
                </div>
            </div>
        )
    }

    async function handleSetujuiSurvey() {
        try {
            setModalSetujui(false)
            setLoadingFetch(true)
            const data = await axiosPost(`${process.env.REACT_APP_BE_URL}/survey/approvesurveibtsadmin/`, {
                kode_survei: kode_survei,
                userfrom: userid,
                id: dataDetail.data[0]['_id']['$oid']
            })

            if (data.data.success) {
                setMessage(data.data.message)
                setOpenSukses(true)
                setTimeout(() => {
                    setOpenSukses(false)
                    history.push("/app/admin/hasilsurvey")
                }, 2000);
            } else {
                setMessage(data.data.message)
                setOpenFailed(true)
            }
            setLoadingFetch(false)

        } catch (error) {
            setLoadingFetch(false)
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setMessage(error.response.data.message)
                setOpenFailed(true)
            }
            console.log(error)
        }
    }

    function handleFlag(keydb, indexchild, index) {
        // console.log(pagedbkey);
        // console.log(keydb);
        setFlagkey(keydb);
        setFlagIndex(indexchild);
        setModalFlag(true);
        // buka modal
    }

    function handleSubmitFlag() {
        // console.log(flagindex)
        // console.log(pagedbkey);
        // console.log(flagkey);
        // console.log(alasanflag);
        let fo = {}
        let objchild = {};
        let value = {};
        if (typeof flagobject != "undefined") {
            fo = flagobject;
            //add
            //check if this has same object
            //ex : page1 => page1
            if (typeof fo[pagedbkey] != "undefined") {
                console.log('a')
                if (flagindex != "-" && (!isNaN(flagindex))) {
                    if (typeof fo[pagedbkey][flagkey] == "object") {
                        fo[pagedbkey][flagkey][flagindex] = alasanflag;
                    } else {
                        objchild[flagindex] = alasanflag;
                        fo[pagedbkey][flagkey] = objchild;
                    }
                } else {
                    fo[pagedbkey][flagkey] = alasanflag;
                }
            } else {
                console.log('b')
                if (flagindex != "-" && (!isNaN(flagindex))) {
                    objchild[flagindex] = alasanflag;
                    value[flagkey] = objchild;
                } else {
                    value[flagkey] = alasanflag;
                }
                fo[pagedbkey] = value;
            }
        } else {
            console.log('c')
            if (flagindex != "-" && (!isNaN(flagindex))) {
                objchild[flagindex] = alasanflag;
                value[flagkey] = objchild;
            } else {
                value[flagkey] = alasanflag;
            }
            fo[pagedbkey] = value;
        }
        console.log(fo)
        setFlagObject(fo)

        // save
        saveFlag(fo)
        setModalFlag(false)
    }

    async function saveFlag(fo) {
        setLoadingFetch(true)
        await axiosPost(`${process.env.REACT_APP_BE_URL}/survey/flagSurvey/`, {
            id: dataDetail.data[0]['_id']['$oid'],
            flag: fo
        })
        setLoadingFetch(false)
    }

    function determineAlasan(flagkey, index) {
        let asd;
        if (index != "-" && (!isNaN(index))) {
            asd = flagobject?.[pagedbkey]?.[flagkey]?.[index] ?? "";
            if (asd != "") {
                return <p style={{ color: "red" }}>{asd}</p>
            } else {
                return asd
            }
        } else {
            asd = flagobject?.[pagedbkey]?.[flagkey] ?? "";
            if (asd != "") {
                return <p style={{ color: "red" }}>{asd}</p>
            } else {
                return asd
            }
        }

    }

    function determineFlag(flagkey, index) {
        let asd;
        if (index != "-" && (!isNaN(index))) {
            asd = flagobject?.[pagedbkey]?.[flagkey]?.[index] ?? "";
            if (asd != "") {
                return (
                    <FontAwesomeIcon style={{
                        color: "red",
                        pointer: "cursor"
                    }} icon={faFlag} />
                )
            } else {
                return (
                    <FontAwesomeIcon style={{
                        color: "black",
                        pointer: "cursor"
                    }} icon={faFlag} />
                )
            }
        } else {
            asd = flagobject?.[pagedbkey]?.[flagkey] ?? "";
            if (asd != "") {
                return (
                    <FontAwesomeIcon style={{
                        color: "red",
                        pointer: "cursor"
                    }} icon={faFlag} />
                )
            } else {
                return (
                    <FontAwesomeIcon style={{
                        color: "black",
                        pointer: "cursor"
                    }} icon={faFlag} />
                )
            }
        }
    }

    async function handleTolak() {
        try {
            setModalTolak(false)
            setLoadingFetch(true)
            const data = await axiosPost(`${process.env.REACT_APP_BE_URL}/survey/tolaksurveibtsadmin/`, {
                kode_survei: kode_survei,
                alasan: alasan,
                userfrom: userid,
                id: dataDetail.data[0]['_id']['$oid']
            })

            if (data.data.success) {
                setMessage(data.data.message)
                setOpenSukses(true)
                setTimeout(() => {
                    setOpenSukses(false)
                    history.push("/app/admin/hasilsurvey")
                }, 2000);
            } else {
                setMessage(data.data.message)
                setOpenFailed(true)
            }
            setLoadingFetch(false)

        } catch (error) {
            setLoadingFetch(false)
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setMessage(error.response.data.message)
                setOpenFailed(true)
            }
            console.log(error)
        }
    }

    return loading ? LoadingComp : (
        <div>
            <ModalSetujuiSurvey
                isOpenModal={modalSetujui}
                toggleModal={() => { setModalSetujui(!modalSetujui) }}
                handleSetujuiSurvey={handleSetujuiSurvey}
            />

            <ModalFlag
                isOpenModal={modalFlag}
                toggleModal={() => { setModalFlag(!modalFlag) }}
                handleChangeAlasan={(e) => { setAlasanFlag(e.target.value); }}
                handleTandai={handleSubmitFlag}
            />

            <ModalTolakSurvey
                isOpenModal={modalTolak}
                toggleModal={() => { setModalTolak(!modalTolak) }}
                handleChangeAlasan={(e) => { setAlasan(e.target.value); console.log(e.target.value) }}
                handleTolakSurvey={handleTolak}
            />

            <ModalLoading
                isOpenModal={loadingFetch}
            />

            <AlertSukses
                isOpenModal={openSukses}
                toggle={() => { setOpenSukses(!openSukses) }}
                message={message}
            />

            <AlertFail
                isOpenModal={openFailed}
                toggle={() => { setOpenFailed(!openFailed) }}
                message={message}
            />

            {/* Title Atas Banget */}
            <Row className={styles.row_top}>
                <Container>
                    <div className={`${styles.wrapper_title} d-flex justify-content-between`}>
                        <div className="d-flex">
                            <h3 className={styles.title}>Manajemen Hasil Survey</h3>
                        </div>
                    </div>
                </Container>
            </Row>

            <Row className={styles.row_middle}>
                <Container>
                    <Card style={{ borderRadius: "10px" }} className={styles.card}>
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
                                            <p>{get(dataDetail, "data[0].user_id.organization.name", "-")}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.row_detail}>
                                            <p>{get(dataDetail, "data[0].user_id.name", "-")}</p>
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

            <Row>
                <Container>
                    <Card style={{ margin: "20px 0px", padding: "20px 0px" }}>
                        <Row style={{ margin: "0px 20px" }}>
                            <div className="col-3 my-auto">
                                <h3 className={styles.tl + " my-auto"}>Titik Lokasi :</h3>
                            </div>
                            <div className="col-5 my-auto">
                                <div style={{ padding: "5px" }} className={styles.bgpinky}>
                                    <h3 style={{ textAlign: "center" }} className={styles.tl + " my-auto"}>
                                        <span style={{ color: "#2C3280" }}>Main Candidate : &nbsp;&nbsp;</span> {dataDetail.data[0].latitude}° S, {dataDetail.data[0].longitude}° E</h3>
                                </div>
                            </div>
                            <div className="offset-3 col-1">
                                <Button onClick={toggle} color="" className={styles.collapse_btn} >
                                    <i className='btn-icon'>{arrow}</i>
                                </Button>
                            </div>
                        </Row>
                        <hr />

                        {
                            isOpen ? <>
                                <div style={{ margin: "20px 20px" }}>
                                    <div className="card">
                                        <h5 style={{ fontSize: "15px", backgroundColor: "#F4F5FF" }} className="card-header">{titlePanel}</h5>
                                        <div className="card-body">
                                            <table className={`table table-striped ${styles.tablefonta}`}>
                                                <tbody>
                                                    {dataPage.map((data) => {
                                                        if (data[0] == "Photos of the Land to be Builded") {
                                                            return (
                                                                <>
                                                                    {
                                                                        data[1].map((foto, index) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td style={{ width: "5%" }}>
                                                                                        <button onClick={() => { handleFlag(data[3], index) }} style={{ padding: "0px" }} className="btn">
                                                                                            {determineFlag(data[3], index)}
                                                                                        </button>
                                                                                    </td>
                                                                                    <td style={{ width: "30%" }}>
                                                                                        Photo {index + 1}
                                                                                    </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                                    </td>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        {parsePhoto(foto)}
                                                                                    </td>
                                                                                    <td>
                                                                                        {determineAlasan(data[3], index)}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        else if (data[0] == "Photo Capture G-NETTRACK 0.5km" || data[0] == "Photo Capture G-NETTRACK Road Route") {
                                                            return (
                                                                <>
                                                                    {
                                                                        data[1].map((datum, index) => {
                                                                            console.log(datum)
                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <td style={{ width: "5%" }}>
                                                                                            <button onClick={() => { handleFlag(data[3], index) }} style={{ padding: "0px" }} className="btn">
                                                                                                {determineFlag(data[3], index)}
                                                                                            </button>
                                                                                        </td>
                                                                                        <td>
                                                                                            <h3 className={styles.iowa}>Sector {index + 1}</h3>
                                                                                            <table id='t02' className='nnn'>
                                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                                    <td style={{ width: "40%" }}>
                                                                                                        Sector
                                                                                                    </td>
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        :
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {datum.data.sector}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                                    <td style={{ width: "40%" }}>
                                                                                                        Jarak
                                                                                                    </td>
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        :
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {datum.data.jarak}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                                    <td style={{ width: "40%" }}>
                                                                                                        Photo Capture
                                                                                                    </td>
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        :
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {parsePhoto(datum.data.foto)}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                        <td style={{ width: "20%" }}>
                                                                                            {determineAlasan(data[3], index)}
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        else if (data[0] == "Coverage and Obstacle Information") {
                                                            return (
                                                                <>
                                                                    {
                                                                        data[1].map((datum, index) => {
                                                                            console.log(datum)
                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <td style={{ width: "5%" }}>
                                                                                            <button onClick={() => { handleFlag(data[3], index) }} style={{ padding: "0px" }} className="btn">
                                                                                                {determineFlag(data[3], index)}
                                                                                            </button>
                                                                                        </td>
                                                                                        <td>
                                                                                            <h3 className={styles.iowa}>Obstacle {index + 1}</h3>
                                                                                            <table id='t02' className='nnn'>
                                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                                    <td style={{ width: "40%" }}>
                                                                                                        Derajat
                                                                                                    </td>
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        :
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {datum.data.derajat}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                                    <td style={{ width: "40%" }}>
                                                                                                        Jarak
                                                                                                    </td>
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        :
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {datum.data.jarak}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                                    <td style={{ width: "40%" }}>
                                                                                                        Deskripsi
                                                                                                    </td>
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        :
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {datum.data.deskripsi}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                        <td style={{ width: "20%" }}>
                                                                                            {determineAlasan(data[3], index)}
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        else if (data[0] == "Posisi yang Ditawarkan" || data[0] == "Kandidat 1" || data[0] == "Kandidat 2") {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td style={{ width: "5%" }}>
                                                                            <button onClick={() => { handleFlag(data[3], "-") }} style={{ padding: "0px" }} className="btn">
                                                                                {determineFlag(data[3], "-")}
                                                                            </button>
                                                                        </td>
                                                                        <td colSpan="3">
                                                                            <h3 className={styles.iowa}>{data[0]}</h3>
                                                                            <table width="100%" id='t02' className='nnn'>
                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        Latitude
                                                                            </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                            </td>
                                                                                    <td>
                                                                                        {data[1].lat}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        Longitude
                                                                            </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                            </td>
                                                                                    <td>
                                                                                        {data[1].long}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        Elevasi
                                                                            </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                            </td>
                                                                                    <td>
                                                                                        {data[1].elevasi}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td style={{ width: "20%" }}>
                                                                            {determineAlasan(data[3], "-")}
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                        else if (
                                                            activePage == 19 && (
                                                                data[0] == "Sector 0°" ||
                                                                data[0] == "Sector 45°" ||
                                                                data[0] == "Sector 90°" ||
                                                                data[0] == "Sector 135°" ||
                                                                data[0] == "Sector 180°" ||
                                                                data[0] == "Sector 225°" ||
                                                                data[0] == "Sector 270°" ||
                                                                data[0] == "Sector 315°")
                                                        ) {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td style={{ width: "5%" }}>
                                                                            <button onClick={() => { handleFlag(data[3], "-") }} style={{ padding: "0px" }} className="btn">
                                                                                {determineFlag(data[3], "-")}
                                                                            </button>
                                                                        </td>
                                                                        <td colSpan="3">
                                                                            <h3 className={styles.iowa}>{data[0]}</h3>
                                                                            <table width="100%" id='t02' className='nnn'>
                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        Topografi
                                                                            </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                            </td>
                                                                                    <td>
                                                                                        {data[1].topografi}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        Landscape
                                                                            </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                            </td>
                                                                                    <td>
                                                                                        {data[1].landscape}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "transparent" }}>
                                                                                    <td style={{ width: "40%" }}>
                                                                                        Demografi
                                                                            </td>
                                                                                    <td style={{ width: "2%" }}>
                                                                                        :
                                                                            </td>
                                                                                    <td>
                                                                                        {data[1].demografi}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td style={{ width: "20%" }}>
                                                                            {determineAlasan(data[3], "-")}
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <tr>
                                                                    <td style={{ width: "5%" }}>
                                                                        <button onClick={() => { handleFlag(data[3], "-") }} style={{ padding: "0px" }} className="btn">
                                                                            {determineFlag(data[3], "-")}
                                                                        </button>
                                                                    </td>
                                                                    <td style={{ width: "30%" }}>
                                                                        {data[0]}
                                                                    </td>
                                                                    <td style={{ width: "2%" }}>
                                                                        :
                                                                    </td>
                                                                    <td style={{ width: "40%" }}>
                                                                        {determineOutput(data[1], data[0], data[2])}
                                                                    </td>
                                                                    <td>
                                                                        {determineAlasan(data[3], "-")}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {
                                    (subTitlePanel != "" && activePage == 16) ? (<>
                                        <div style={{ margin: "20px 20px" }}>
                                            <div className="card">
                                                <h5 style={{ fontSize: "15px", backgroundColor: "#F4F5FF" }} className="card-header">{subTitlePanel}</h5>
                                                <div className="card-body">
                                                    <table className={`table table-striped ${styles.tablefonta}`}>
                                                        <tbody>
                                                            {subdataPage.map((data) => {
                                                                if (data[0] == "Photo Capture G-NETTRACK 5km") {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                data[1].map((datum, index) => {
                                                                                    console.log(datum)
                                                                                    return (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td style={{ width: "5%" }}>
                                                                                                    <button onClick={() => { handleFlag("photocapturegnettrack5km", index) }} style={{ padding: "0px" }} className="btn">
                                                                                                        {determineFlag("photocapturegnettrack5km", index)}
                                                                                                    </button>
                                                                                                </td>
                                                                                                <td>

                                                                                                    <h3 className={styles.iowa}>Sector {index + 1}</h3>
                                                                                                    <table id='t02' className='nnn'>
                                                                                                        <tr style={{ backgroundColor: "transparent" }}>
                                                                                                            <td style={{ width: "40%" }}>
                                                                                                                Sector
                                                                                                            </td>
                                                                                                            <td style={{ width: "2%" }}>
                                                                                                                :
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {datum.data.sector}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr style={{ backgroundColor: "transparent" }}>
                                                                                                            <td style={{ width: "40%" }}>
                                                                                                                Jarak
                                                                                                            </td>
                                                                                                            <td style={{ width: "2%" }}>
                                                                                                                :
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {datum.data.jarak}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr style={{ backgroundColor: "transparent" }}>
                                                                                                            <td style={{ width: "40%" }}>
                                                                                                                Photo Capture
                                                                                                            </td>
                                                                                                            <td style={{ width: "2%" }}>
                                                                                                                :
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {parsePhoto(datum.data.foto)}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </td>
                                                                                                <td style={{ width: "20%" }}>
                                                                                                    {determineAlasan("photocapturegnettrack5km", index)}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </>
                                                                    )
                                                                }
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </>) : null
                                }
                                <br />

                                <Row style={{ margin: "0px 20px" }}>
                                    <div onClick={handlePreviousPage} className="col-6">
                                        <button className="btn btn-link float-left">
                                            <FontAwesomeIcon icon={faChevronLeft} /> &nbsp; Previous
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button onClick={handleNextPage} className="btn btn-link float-right">
                                            Next &nbsp; <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                    </div>
                                </Row>
                            </> : null
                        }
                    </Card>
                </Container>
            </Row>
            <div style={{ marginTop: "100px" }} className="row">
                <div className="container">
                    <Card style={{ margin: "20px 0px" }}>
                        <div className={styles.floatbawah}>
                            <center>
                                <button onClick={() => { setModalTolak(!modalTolak) }} style={{ backgroundColor: "#C42127" }} className="btn btn-danger mx-2 my-3">
                                    Tolak Hasil Survey
                                </button>
                                <button onClick={() => { setModalSetujui(!modalSetujui) }} style={{ backgroundColor: "#2C3280" }} className="btn btn-primary mx-2 my-3">
                                    Setujui Hasil Survey
                                </button>
                            </center>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
};

const LoadingComp = () => {
    return (
        <>
            {/* Title Atas Banget */}
            <Row className={styles.row_top}>
                <Container>
                    <div className={`${styles.wrapper_title} d-flex justify-content-between`}>
                        <div className="d-flex">
                            <h3 className={styles.title}>Manajemen Hasil Survey</h3>
                        </div>
                    </div>
                </Container>
            </Row>
            <h1>Loading...</h1>
        </>
    )
}

export default NewHasilSurveyDetailBTS