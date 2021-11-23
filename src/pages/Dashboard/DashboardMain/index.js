import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import CardDashboard from "../../../components/Card/CardDashboard";
import CardGraph from "../../../components/Card/CardGraph";
import Header from "../../../components/Header/Header";
import Map from "../../../components/Webgis/map.js";
import { Container, Row, Col } from "reactstrap";
import styles from "./Dashboard.module.css";
import Logo from "../../../assets/img/baktikominfo.png";
import Burger from "../../../assets/icons/Burger.svg";
// import Bell from "../../../assets/icons/Bell.svg";
// import Ellipse from "../../../assets/icons/Ellipse.svg";
import Assets from "../../../assets/icons/icon-avatar.png";

const DashboardMain = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [penugasanAi, setPenugasanAi] = useState("");
  const [penugasanBTS, setPenugasanBTS] = useState("");
  const [penugasanAiSurvey, setPenugasanAiSurvey] = useState("");
  const [penugasanBTSSurvey, setPenugasanBTSSurvey] = useState("");
  const [totalIssueSurveyAI, setTotalIssueSurveyAI] = useState("");
  const [totalIssueSurveyBTS, setTotalIssueSurveyBTS] = useState("");

  const toggle = () => setFadeIn(!fadeIn);

  const history = useHistory();
  const onClick = () => {
    window.localStorage.removeItem("role");
    history.push("/");
  };

  const fetchSurveyPenugasan = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        setPenugasanAi(result.values.penugasan_ai);
        setPenugasanBTS(result.values.penugasan_bts);
        setPenugasanAiSurvey(result.values.penugasan_ai_surveyed);
        setPenugasanBTSSurvey(result.values.penugasan_bts_surveyed);
        setTotalIssueSurveyAI(result.values.penugasan_ai_issue);
        setTotalIssueSurveyBTS(result.values.penugasan_bts_issue);
      })
      .catch((e) => console.log("error", e));
  };

  const showSidebar = () => {
    alert("asd");
  };

  useEffect(() => {
    fetchSurveyPenugasan();
  });

  return (
    <>
      <div className={"d-none d-lg-block"}>
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
                title="TOTAL LOKASI AKSES INTERNET DIAJUKAN"
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
                title="TOTAL LOKASI BTS DIAJUKAN"
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
          <Row className={"mt-3 mb-3 w-100 d-flex justify-content-center"}>
            <CardGraph />
          </Row>
          <Row className={"mt-3 mb-3 w-100 d-flex justify-content-center"}>
            <Map />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DashboardMain;
