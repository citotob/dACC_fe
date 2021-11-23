import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import CardExecutive from "../../../components/Card/CardExecutive";
import CardGraph from "../../../components/Card/CardGraph";
// import CardMap from "../../../components/Card/CardMap";
// import Map from "../../../components/Webgis/map.js";
import Map from "../../../components/MapVector";
import { Container, Row, Col, Card, Fade, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import styles from "./Executive.module.css";
import Logo from "../../../assets/img/baktikominfo.png";
import Assets from "../../../assets/icons/icon-avatar.png";
import { Link } from 'react-router-dom';
import Bell from "../../../assets/icons/Bell.svg";
import Ellipse from "../../../assets/icons/Ellipse.svg";
import Logout from "../../../assets/icons/Logout.svg";
import Header from "../../../components/Header/Header"

const ExecutiveApp = () => {

  const [fadeIn, setFadeIn] = useState(false);
  const [penugasanAi, setPenugasanAi] = useState('');
  const [penugasanBTS, setPenugasanBTS] = useState('');
  const [penugasanAiSurvey, setPenugasanAiSurvey] = useState('');
  const [penugasanBTSSurvey, setPenugasanBTSSurvey] = useState('');

  const toggle = () => setFadeIn(!fadeIn);

  let role = window.localStorage.getItem("role");
  let username = window.localStorage.getItem("username");

  const history = useHistory();
  const onClick = () => {
    window.localStorage.removeItem('role');
    history.push('/');
  };

  const fetchSurveyPenugasan = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //     id: dataVerify.id
      // })
    }).then(result => (result.json()))
      .then(result => {
        setPenugasanAi(result.values.penugasan_ai)
        setPenugasanBTS(result.values.penugasan_bts)
        setPenugasanAiSurvey(result.values.penugasan_ai_surveyed)
        setPenugasanBTSSurvey(result.values.penugasan_bts_surveyed)
      })
      .catch(e => console.log("error", e))
  }

  useEffect(() => {
    fetchSurveyPenugasan();
  })

  return (
    <>
      <Container fluid className={`vh-100 d-none d-lg-block ${styles.wrapExe}`}>
        <Row className="d-flex pt-3 mb-3 w-100 align-items-center">
          <div className={styles.headlist}> 
            <img src={Logo} height='50px' alt=""></img>
            <h3 className={styles.text_header}>Executive Dashboard</h3>
          </div>
          {/*<div className={styles.wrapper_profile}>
              <div className={styles.notif}>
                <img src={Ellipse} className={styles.ellipse} alt=""></img>
                <img src={Bell} className={styles.bell} alt=""></img>
              </div> 
              <UncontrolledDropdown>
                <DropdownToggle color="" className={styles.wrapper_button}>
                  <img className={styles.imge} src={Profile} color="primary" alt="" />
                </DropdownToggle>
                <DropdownMenu className={styles.dropdown_menu}>
                  <DropdownItem disabled>Profil</DropdownItem>
                  <DropdownItem onClick={onClick}>Keluar</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> 
            </div> 
            ======================================= Di ganti yang bawah ini aja ya */}
          {/* <div className={styles.notif}>
            notif
          </div>
          <div className={styles.profile}>
            <Link to={`/app/${role}/profile`}><img src={Assets} alt="avatar" /></Link>
          </div> */}
          <div className={styles.profile}>
            <Header />
          </div>
          <img alt="Logout" src={Logout} style={{ cursor: "pointer" }} className={styles.btnBack} onClick={onClick} height="30px" />
        </Row>


        <Row>
          <Col lg={"5"}>
            <CardExecutive
              title="TOTAL LOKASI AKSES INTERNET DIAJUKAN"
              jumlah={penugasanAi}
              jenis="ai"
            />
            <CardExecutive
              title="TOTAL LOKASI AKSES INTERNET SUDAH DISURVEY"
              jumlah={penugasanAiSurvey}
              jenis="ai"
            />
            <CardExecutive
              title="TOTAL LOKASI BTS DIAJUKAN"
              jumlah={penugasanBTS}
              jenis="bts"
            />
            <CardExecutive
              title="TOTAL LOKASI BTS SUDAH DISURVEY"
              jumlah={penugasanBTSSurvey}
              jenis="bts"
            />
          </Col>
          <Col lg={"7"}>
            <Container className={'pr-5 mb-2'}>
              <CardGraph />
            </Container>
            <Container className={'pr-5'}>
              <Map />
            </Container>
          </Col>
        </Row>
      </Container>

      <Container fluid className={`h-100 d-none d-md-block d-lg-none ${styles.wrapExe}`}>
        <Row className={`sticky-top pt-3 pb-3 d-flex justify-content-around align-items-center ${styles.wrapExe}`}>
          <img height='50px' src={Logo} alt=""></img>
          <h3 className={styles.text_header} >Executive Dashboard</h3>
          <img alt="Logout" src={Logout} style={{ cursor: "pointer" }} onClick={onClick} height="40px" />
        </Row>
        <Row>
          <Col className={'ml-3'}>
            <CardExecutive
              title="TOTAL LOKASI AKSES INTERNET DIAJUKAN"
              jumlah={penugasanAi}
              jenis="ai"
            />
            <CardExecutive
              title="TOTAL LOKASI AKSES INTERNET SUDAH DISURVEY"
              jumlah={penugasanAiSurvey}
              jenis="ai"
            />
          </Col>
          <Col>
            <CardExecutive
              title="TOTAL LOKASI BTS DIAJUKAN"
              jumlah={penugasanBTS}
              jenis="bts"
            />
            <CardExecutive
              title="TOTAL LOKASI BTS SUDAH DISURVEY"
              jumlah={penugasanBTSSurvey}
              jenis="bts"
            />
          </Col>
        </Row>
        <Row className={'d-flex justify-content-center align-items-center'}>
          <CardGraph />
        </Row>
        <Row className={'d-flex justify-content-center align-items-center mt-2'}>
          <Map />
        </Row>
      </Container>

      <Container className={`${styles.wrapExe} h-100 d-block d-md-none`}>
        <div className={`sticky-top pt-3 pb-3 d-flex justify-content-center align-items-center ${styles.wrapExe}`}>
          <img height='30px' src={Logo} alt=""></img>
          <h5 className={`${styles.text_header} text-center`}>Executive Dashboard</h5>
          <img alt="Logout" src={Logout} style={{ cursor: "pointer" }} onClick={onClick} height="25px" />
        </div>
        <Row className={'d-flex justify-content-center align-items-center'}>
          <CardExecutive
            title="TOTAL LOKASI AKSES INTERNET DIAJUKAN"
            jumlah={penugasanAi}
            jenis="ai"
          />
          <CardExecutive
            title="TOTAL LOKASI AKSES INTERNET SUDAH DISURVEY"
            jumlah={penugasanAiSurvey}
            jenis="ai"
          />
          <CardExecutive
            title="TOTAL LOKASI BTS DIAJUKAN"
            jumlah={penugasanBTS}
            jenis="bts"
          />
          <CardExecutive
            title="TOTAL LOKASI BTS SUDAH DISURVEY"
            jumlah={penugasanBTSSurvey}
            jenis="bts"
          />
        </Row>
        <Row className={'d-flex justify-content-center align-items-center'}>
          <CardGraph />
        </Row>
        <Row className={'d-flex justify-content-center align-items-center mt-2'}>
          <Map />
        </Row>
      </Container>
    </>
  );
};

export default ExecutiveApp;
