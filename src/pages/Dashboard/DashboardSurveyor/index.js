import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom'
import CardDashboard from "../../../components/Card/CardDashboard";
import CardGraph from "../../../components/Card/CardGraph";
// import CardMap from "../../../components/Card/CardMap";
import Map from "../../../components/Webgis/map-surveyor.js";
import { Container, Row, Col, Card, Fade, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import styles from "./Dashboard.module.css";
import Logo from "../../../assets/img/baktikominfo.png";
import Profile from "../../../assets/icons/Profile.svg";
import Bell from "../../../assets/icons/Bell.svg";
import Ellipse from "../../../assets/icons/Ellipse.svg";
import Assets from '../../../assets/icons/icon-avatar.png';
import Header from "../../../components/Header/Header";

const DashboardMain = () => {

  const [fadeIn, setFadeIn] = useState(false);
  const [penugasanAi, setPenugasanAi] = useState('');
  const [penugasanBTS, setPenugasanBTS] = useState('');
  const [penugasanAiSurvey, setPenugasanAiSurvey] = useState('');
  const [penugasanBTSSurvey, setPenugasanBTSSurvey] = useState('');
  const [totalIssueSurveyAI, setTotalIssueSurveyAI] = useState('');
  const [totalIssueSurveyBTS, setTotalIssueSurveyBTS] = useState('');

  const toggle = () => setFadeIn(!fadeIn);

  const history = useHistory();
  const onClick = () => {
    window.localStorage.removeItem('role');
    history.push('/');
  };

  const fetchSurveyPenugasan = () => {
    let formData = new FormData()
    let org = localStorage.getItem('org')
    formData.append('surveyor', org)
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/surveyor/`, {
      method: 'POST',
      body: formData,
    }).then(result => (result.json()))
      .then(result => {
        setPenugasanAi(result.values.penugasan_ai)
        setPenugasanBTS(result.values.penugasan_bts)
        setPenugasanAiSurvey(result.values.penugasan_ai_surveyed)
        setPenugasanBTSSurvey(result.values.penugasan_bts_surveyed)
        setTotalIssueSurveyAI(result.values.penugasan_ai_issue)
        setTotalIssueSurveyBTS(result.values.penugasan_bts_issue)
      })
      .catch(e => console.log("error", e))
  }

  useEffect(() => {
    fetchSurveyPenugasan();
  })

  // const history = useHistory();
  // const onClick = () => {
  //       window.localStorage.removeItem('role');
  //       history.push('/');
  // };

  return (
    <>

      <div className={"d-none d-lg-block h-100"}>
        <Container
          fluid
          className={`${styles.wrapExe} d-flex flex-column justify-content-center align-items-center`}>
          <Container>
            <Header title={"Dashboard"} />
          </Container>
          <Row>
            <Col sm="6">
              <CardDashboard
                className={styles.card_dashboardAju}
                title="PERMINTAAN SURVEY MASUK AKSES INTERNET"
                jumlah={penugasanAi}
                jenis="ai"
              />
              <CardDashboard
                className={styles.card_dashboardSur}
                title="TOTAL LOKASI AKSES INTERNET SUDAH DISURVEY"
                jumlah={penugasanAiSurvey}
                jenis="ai"
              />
              <CardDashboard
                className={styles.card_dashboardIss}
                title="TOTAL ISSUE TEMUAN DARI HASIL SURVEY AKSES INTERNET"
                jumlah={totalIssueSurveyAI}
                jenis="ai"
              />
            </Col>
            <Col sm="6">
              <CardDashboard
                className={styles.card_dashboardBTSaju}
                title="PERMINTAAN SURVEY MASUK BTS"
                jumlah={penugasanBTS}
                jenis="bts"
              />
              <CardDashboard
                className={styles.card_dashboardBTSsur}
                title="TOTAL LOKASI BTS SUDAH DISURVEY"
                jumlah={penugasanBTSSurvey}
                jenis="bts"
              />
              <CardDashboard
                className={styles.card_dashboardBTSIss}
                title="TOTAL ISSUE TEMUAN DARI HASIL SURVEY BTS"
                jumlah={totalIssueSurveyBTS}
                jenis="bts"
              />
            </Col>
          </Row>
          <Row style={{ "marginLeft": "0%", "marginTop": "1%", "width": "94%", "paddingBottom": "6%" }}>
            <Map />
          </Row>
        </Container>
      </div>

      <div className={"d-none d-md-block d-lg-none"}>
        <Container
          fluid
          className={`${styles.wrapExe} pb-4 d-flex flex-column justify-content-center align-items-center`}>
          <Header title={"Dashboard"} />
          <Row>
            <Col sm="6" className={"d-flex flex-column align-items-center justify-content-center"}>
              <CardDashboard
                title="PERMINTAAN SURVEY MASUK AKSES INTERNET"
                jumlah={penugasanAi}
                jenis="ai"
              />
              <CardDashboard
                title="TOTAL LOKASI AKSES INTERNET SUDAH DISURVEY"
                jumlah={penugasanAiSurvey}
                jenis="ai"
              />
              <CardDashboard
                title="TOTAL ISSUE TEMUAN DARI HASIL SURVEY AKSES INTERNET"
                jumlah={totalIssueSurveyAI}
                jenis="ai"
              />
            </Col>
            <Col sm="6" className={"d-flex flex-column align-items-center justify-content-center"}>
              <CardDashboard
                title="PERMINTAAN SURVEY MASUK BTS"
                jumlah={penugasanBTS}
                jenis="bts"
              />
              <CardDashboard
                title="TOTAL LOKASI BTS SUDAH DISURVEY"
                jumlah={penugasanBTSSurvey}
                jenis="bts"
              />
              <CardDashboard
                title="TOTAL ISSUE TEMUAN DARI HASIL SURVEY BTS"
                jumlah={totalIssueSurveyBTS}
                jenis="bts"
              />
            </Col>
          </Row>
          <Row className={'w-100'}>
            <Map />
          </Row>
        </Container>
      </div>

      <div className={"d-block d-md-none"}>
        <Container
          fluid
          className={`${styles.wrapExe} d-flex flex-column justify-content-center align-items-center`}>
          <Header title={"Dashboard"} />
          <Row>
            <CardDashboard
              title="PERMINTAAN SURVEY MASUK AKSES INTERNET"
              jumlah={penugasanAi}
              jenis="ai"
            />
            <CardDashboard
              title="TOTAL LOKASI AKSES INTERNET SUDAH DISURVEY"
              jumlah={penugasanAiSurvey}
              jenis="ai"
            />
            <CardDashboard
              title="TOTAL ISSUE TEMUAN DARI HASIL SURVEY AKSES INTERNET"
              jumlah={totalIssueSurveyAI}
              jenis="ai"
            />
            <CardDashboard
              title="PERMINTAAN SURVEY MASUK BTS"
              jumlah={penugasanBTS}
              jenis="bts"
            />
            <CardDashboard
              title="TOTAL LOKASI BTS SUDAH DISURVEY"
              jumlah={penugasanBTSSurvey}
              jenis="bts"
            />
            <CardDashboard
              title="TOTAL ISSUE TEMUAN DARI HASIL SURVEY BTS"
              jumlah={totalIssueSurveyBTS}
              jenis="bts"
            />
          </Row>
          <Row className={'w-100'}>
            <Map
              // role={localStorage.getItem('role')}
              surveyor={localStorage.getItem('org')}
            />
          </Row>
        </Container>
      </div>

    </>
  );
};

export default DashboardMain;
