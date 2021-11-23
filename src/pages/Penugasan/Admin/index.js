import React from "react";
import ContentLayoutLayered, {
  ContentLayoutInner,
} from "../../../components/Layout/ContentLayoutLayered";
import TablePenugasan from "../../../components/Table/TablePenugasan/Admin";
import Style from "./Penugasan.module.css";
import { Row } from "reactstrap";
import AiProvider from "../../../context/AiProvider";
import BtsProvider from "../../../context/BtsProvider";
import TableLogPenugasanAdmin from "../../../components/Table/TableLog/Admin/Penugasan/index.js";

const SubContentAi = ({ item, tab }) => {
  return (
    <AiProvider>
      {/* <Row> */}
      {
        {
          "Daftar Penugasan": <TablePenugasan />,
          Log: <TableLogPenugasanAdmin tab={tab} />,
        }[item]
      }
      {/* </Row> */}
    </AiProvider>
  );
};

const SubContentBts = ({ item, tab }) => {
  return (
    <BtsProvider>
      {/* <Row> */}
      {
        {
          "Daftar Penugasan": <TablePenugasan />,
          Log: <TableLogPenugasanAdmin tab={tab} />,
        }[item]
      }
      {/* </Row> */}
    </BtsProvider>
  );
};

const TabMenu = ({ setMenu, activeMenu }) => {
  const listTabPenugasan = ["Daftar Penugasan", "Log"];
  return (
    <>
      <div className={"d-none d-md-block"}>
        <Row className={"mt-4 w-100"}>
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
      </div>

      <Row className={"mt-2 d-block d-md-none"}>
        <div className={"d-flex w-100 justify-content-center"}>
          {listTabPenugasan.map((list, index) => (
            <div
              className={activeMenu === list ? Style.selected : Style.selection}
              key={index}
              onClick={setMenu}
              value={list}>
              {list}
            </div>
          ))}
        </div>
      </Row>
    </>
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

const InnerMenu = ({ activeTab }) => {
  const [menu, setMenu] = React.useState("Daftar Penugasan");
  const changeMenu = (e) => setMenu(e.target.getAttribute("value"));
  if (activeTab === "AI") {
    return (
      <ContentLayoutInner
        tabmenu={<TabMenu setMenu={changeMenu} activeMenu={menu} />}
        content={<SubContentAi item={menu} tab={activeTab} />}
      />
    );
  } else {
    return (
      <ContentLayoutInner
        tabmenu={<TabMenu setMenu={changeMenu} activeMenu={menu} />}
        content={<SubContentBts item={menu} tab={activeTab} />}
      />
    );
  }
};

const PenugasanAdmin = () => {
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

export default PenugasanAdmin;
