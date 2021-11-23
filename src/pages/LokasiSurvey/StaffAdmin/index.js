import React, { useState, useContext } from "react";
import ContentLayout from "../../../components/Layout/ContentLayout/ContentLayout.js";
import TableLokasiAI from "../../../components/Table/TableLokasiAI";
import TableLokasiBTS from "../../../components/Table/TableLokasiBTS";
// import ModalTambahLokasi from "../../components/Popup/ModalTambahLokasi";
import LokasiSurveyStyle from "./lokasisurvey.module.css";
import { Row, Button, Container } from "reactstrap";
import LokasiProvider from "../../../context/LokasiProvider";
import RootContext from "../../../context";

const SubContentLokasiSurvey = ({ item, menuActive, reload, handleAlert }) => {
  return (
    <Row>
      {
        {
          "Akses Internet": <TableLokasiAI
            tabActive={menuActive}
            reload={reload}
            handleAlert={handleAlert}
          />,
          BTS: <TableLokasiBTS
            tabActive={menuActive}
            reload={reload}
            handleAlert={handleAlert}
          />,
        }[item]
      }
    </Row>
  );
};

const TabMenu = ({ toggleStatus, toggleAction, setMenu, active, setReload, reload, handleAlert }) => {
  const listTabLokasiSurvey = ["Akses Internet", "BTS"];

  // const contextLokasi = useContext(RootContext);

  const handleAlertLokasi = (bool) => {
    toggleAction(!toggleStatus);
    setReload(!reload);

    // Send Alert to parent
    handleAlert(bool, 'Tambah lokasi')
  };

  return (
    // Delete <> and </> for mobile view
    <>
      <Container className={LokasiSurveyStyle.tab_menu}>
        <Row>
          <div className={'w-100 d-flex justify-content-center d-block d-md-none'}>
            {/* <Button className={`${LokasiSurveyStyle.menu_button}`} onClick={toggleAction}>
              + Tambah Lokasi
            </Button> */}
          </div>

          <div className={'d-none d-md-block w-100'}>
            <div className={'d-flex justify-content-between'}>
              <div className={'d-flex justify-content-center'}>
                {listTabLokasiSurvey.map((list, index) => (
                  <div
                    className={active === list ? LokasiSurveyStyle.selected : LokasiSurveyStyle.selection}
                    key={index}
                    onClick={setMenu}
                    value={list}
                  >
                    {list}
                  </div>
                ))}
              </div>
              {/* <Button className={`${LokasiSurveyStyle.menu_button} d-none d-md-block`} onClick={toggleAction}>+ Tambah Lokasi</Button> */}
            </div>
          </div>

          <div className={'d-block d-md-none d-flex justify-content-around w-100 mt-3'}>
            {listTabLokasiSurvey.map((list, index) => (
              <div
                className={active === list ? LokasiSurveyStyle.selected : LokasiSurveyStyle.selection}
                key={index}
                onClick={setMenu}
                value={list}
              >
                {list}
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
};

const LokasiSurvey = () => {
  const [menu, setMenu] = React.useState("Akses Internet");
  // const [modalTambahLokasi, setModalTambahLokasi] = React.useState(false);

  // const toggleModal = () => setModalTambahLokasi(!modalTambahLokasi);
  const handleClick = (e) => setMenu(e.target.getAttribute("value"));
  // reload
  const [reload, setReload] = useState(false);

  // alert
  const [notif, setNotif] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stringAlert, setStringAlert] = useState("");
  // timer
  const [timer, setTimer] = useState(null);

  // handle alert to Content Layout
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
  };

  return (
    <LokasiProvider>
      <ContentLayout
        className={LokasiSurveyStyle.contentLok}
        title="List Lokasi Survey"
        tabmenu={
          <TabMenu
            // toggleStatus={modalTambahLokasi}
            // toggleAction={toggleModal}
            setMenu={handleClick}
            active={menu}
            setReload={setReload}
            reload={reload}
            handleAlert={handleAlert}
          />
        }
        content={
          <SubContentLokasiSurvey
            menuActive={menu}
            item={menu}
            reload={reload}
            handleAlert={handleAlert}
          />
        }
        notification={notif}
        alert={alert}
        stringAlert={stringAlert}
      />
    </LokasiProvider>
  );
};

export default LokasiSurvey;
