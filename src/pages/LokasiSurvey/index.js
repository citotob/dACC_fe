import React, { useState, useContext } from "react";
import ContentLayout from "../../components/Layout/ContentLayout/ContentLayout.js";
import TableLokasiAI from "../../components/Table/TableLokasiAI";
import TableLokasiBTS from "../../components/Table/TableLokasiBTS";
import ModalTambahLokasi from "../../components/Popup/ModalTambahLokasi";
import LokasiSurveyStyle from "./lokasisurvey.module.css";
import { Row, Button, Container, Alert } from "reactstrap";
import LokasiProvider from "../../context/LokasiProvider";
import RootContext from "../../context";

const SubContentLokasiSurvey = ({ item, menuActive, reload }) => {
  return (
    <Row>
      {
        {
          "Akses Internet": <TableLokasiAI tabActive={menuActive} reload={reload} />,
          BTS: <TableLokasiBTS tabActive={menuActive} reload={reload} />,
        }[item]
      }
    </Row>
  );
};

const TabMenu = ({ toggleStatus, toggleAction, setMenu, active, setReload, reload }) => {
  //tambah lokasi notif
  //alert
  const [alertLokasi, setAlertLokasi] = useState(false);
  //notif
  const [notifLokasi, setNotifLokasi] = useState(false);
  //timer
  const [timerLokasi, setTimerLokasi] = useState(null);

  const listTabLokasiSurvey = ["Akses Internet", "BTS"];

  const contextLokasi = useContext(RootContext);

  const handleAlertLokasi = () => {
    toggleAction(!toggleStatus);
    setReload(!reload);
    setNotifLokasi(false);
    setAlertLokasi(true);
    clearTimeout(timerLokasi);
    setTimerLokasi(
      setTimeout(() => {
        setNotifLokasi(true);
      }, 3000)
    );
  };

  const handleMessage = () => {};

  return (
    <>
      <Container className={LokasiSurveyStyle.tab_menu}>
        <Row>
          {/* <div className={"w-100 d-flex justify-content-center d-block d-md-none"}>
            <Button className={`${LokasiSurveyStyle.menu_button}`} onClick={toggleAction}>
              + Tambah Lokasi
            </Button>
          </div> */}

          <div className={"d-none d-md-block w-100"}>
            <div className={"d-flex justify-content-between"}>
              <div className={"d-flex justify-content-center"}>
                {listTabLokasiSurvey.map((list, index) => (
                  <div
                    className={
                      active === list ? LokasiSurveyStyle.selected : LokasiSurveyStyle.selection
                    }
                    key={index}
                    onClick={setMenu}
                    value={list}>
                    {list}
                  </div>
                ))}
              </div>
              {/* <Button
                className={`${LokasiSurveyStyle.menu_button} d-none d-md-block`}
                onClick={toggleAction}>
                + Tambah Lokasi
              </Button> */}
              <Row style={{ width: "100%" }}>
                <Alert
                  color={"success"}
                  isOpen={true}
                  style={{
                    borderRadius: "20px",
                    textAlign: "center",
                    padding: "5px",
                    margin: "0px",
                    width: "100%",
                  }}>
                  {`Tambah Lokasi ${contextLokasi.alert ? "Berhasil" : "Gagal"}`}
                </Alert>
              </Row>
            </div>
          </div>

          <div className={"d-block d-md-none d-flex justify-content-around w-100 mt-3"}>
            {listTabLokasiSurvey.map((list, index) => (
              <div
                className={
                  active === list ? LokasiSurveyStyle.selected : LokasiSurveyStyle.selection
                }
                key={index}
                onClick={setMenu}
                value={list}>
                {list}
              </div>
            ))}
          </div>
        </Row>
        <ModalTambahLokasi
          isOpen={toggleStatus}
          toggle={toggleAction}
          handleAlertLokasi={handleAlertLokasi}
          handleMessage={handleMessage}
        />
      </Container>
    </>
  );
};

const LokasiSurvey = () => {
  const [menu, setMenu] = React.useState("Akses Internet");
  const [modalTambahLokasi, setModalTambahLokasi] = React.useState(false);

  const toggleModal = () => setModalTambahLokasi(!modalTambahLokasi);
  const handleClick = (e) => setMenu(e.target.getAttribute("value"));
  //reload
  const [reload, setReload] = useState(false);

  return (
    <LokasiProvider>
      <ContentLayout
        className={LokasiSurveyStyle.contentLok}
        title="List Lokasi Survey"
        tabmenu={
          <TabMenu
            toggleStatus={modalTambahLokasi}
            toggleAction={toggleModal}
            setMenu={handleClick}
            active={menu}
            setReload={!reload}
            reload={reload}
          />
        }
        content={<SubContentLokasiSurvey menuActive={menu} item={menu} reload={reload} />}
      />
    </LokasiProvider>
  );
};

export default LokasiSurvey;
