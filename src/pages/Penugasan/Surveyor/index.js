import React from "react";
import ContentLayoutLayered, {
  ContentLayoutInner,
} from "../../../components/Layout/ContentLayoutLayered";
import TablePenugasan from "../../../components/Table/TablePenugasan/Surveyor";
import Style from "./Surveyor.module.css";
import { Row, Container } from "reactstrap";
import AiProvider from "../../../context/AiProvider";
import BtsProvider from "../../../context/BtsProvider";
import TableLogPenugasanSurveyor from "../../../components/Table/TableLog/Surveyor/Penugasan/index.js";

const SubContentAi = ({ item, tab, handleAlert }) => {
  return (
    <AiProvider>
      {/* <Row> */}
      {
        {
          "Permintaan Survey": <TablePenugasan
            jenisSurvey={tab}
            handleAlert={handleAlert}
          />,
          Log: <TableLogPenugasanSurveyor tab={tab} />,
        }[item]
      }
      {/* </Row> */}
    </AiProvider>
  );
};

const SubContentBts = ({ item, tab, handleAlert }) => {
  return (
    <BtsProvider>
      {/* <Row> */}
      {
        {
          "Permintaan Survey": <TablePenugasan
            jenisSurvey={tab}
            handleAlert={handleAlert}
          />,
          Log: <TableLogPenugasanSurveyor tab={tab} />,
        }[item]
      }
      {/* </Row> */}
    </BtsProvider>
  );
};

const TabMenu = ({ setMenu, activeMenu }) => {
  const listTabPenugasan = ["Permintaan Survey", "Log"];
  return (
    <Container className={Style.tab_menu}>
      <Row>
        {listTabPenugasan.map((list, index) => (
          <div
            className={activeMenu === list ? Style.selected : Style.selection}
            key={index}
            onClick={setMenu}
            value={list}>
            {list}
          </div>
        ))}
      </Row>
    </Container>
  );
};

const Topmenu = ({ activeTab, toggleTab }) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        onClick={() => toggleTab("AI")}
        style={{
          padding: "0.3rem",
          color: `${activeTab === "AI" ? "#2C3780" : "grey"}`,
          backgroundColor: `${activeTab === "AI" ? "white" : "#2C3780"}`,
          borderRadius: "5px 5px 0px 0px",
          width: "10rem",
        }}>
        Akses Internet
      </div>
      <div
        onClick={() => toggleTab("BTS")}
        style={{
          padding: "0.3rem",
          color: `${activeTab === "BTS" ? "#2C3780" : "grey"}`,
          backgroundColor: `${activeTab === "BTS" ? "white" : "#2C3780"}`,
          borderRadius: "5px 5px 0px 0px",
          width: "10rem",
        }}>
        BTS
      </div>
    </div>
  );
};

const InnerMenu = ({ activeTab, handleAlert }) => {
  const [menu, setMenu] = React.useState("Permintaan Survey");
  const changeMenu = (e) => setMenu(e.target.getAttribute("value"));
  if (activeTab === "AI") {
    return (
      <ContentLayoutInner
        tabmenu={
          <TabMenu
            setMenu={changeMenu}
            activeMenu={menu}
          />
        }
        content={
          <SubContentAi
            item={menu}
            tab={activeTab}
            handleAlert={handleAlert}
          />
        }
      />
    );
  } else {
    return (
      <ContentLayoutInner
        tabmenu={
          <TabMenu
            setMenu={changeMenu}
            activeMenu={menu}
          />
        }
        content={
          <SubContentBts
            item={menu}
            tab={activeTab}
            handleAlert={handleAlert}
          />
        }
      />
    );
  }
};

const PenugasanSurveyor = () => {
  const [activeTab, setActiveTab] = React.useState("AI");
  const [modalPenugasanSurveyor, setModalPenugasanSurveyor] = React.useState(false);
  const toggleModalPenugasanSurveyor = () => setModalPenugasanSurveyor(!modalPenugasanSurveyor);
  const toggleTab = (tab) => setActiveTab(tab);

  // alert
  const [notif, setNotif] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [stringAlert, setStringAlert] = React.useState("");
  // timer
  const [timer, setTimer] = React.useState(null);

  // handle alert to Content Layout Layered
  const handleAlert = (bool, string) => {
    clearTimeout(timer);

    setNotif(true);
    setAlert(bool);
    setStringAlert(string);

    setTimer(
      setTimeout(() => {
        setNotif(false);
      }, 10000)
    );
  }

  return (
    <>
      <ContentLayoutLayered
        title="Manajemen Penugasan"
        topmenu={
          <Topmenu
            activeTab={activeTab}
            toggleTab={toggleTab}
            toggleStatus={modalPenugasanSurveyor}
            toggleAction={toggleModalPenugasanSurveyor}
          />
        }
        content={
          <InnerMenu
            activeTab={activeTab}
            handleAlert={handleAlert}
          />
        }
        // Show alert
        notification={notif}
        alert={alert}
        stringAlert={stringAlert}
      />
    </>
  );
};

export default PenugasanSurveyor;
