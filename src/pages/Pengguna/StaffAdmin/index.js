import React, { useState } from "react";
import ContentLayout from "../../../components/Layout/ContentLayout/ContentLayout.js";
import TablePenggunaVerif from "../../../components/Table/TablePenggunaVerif";
import TablePenggunaAktif from "../../../components/Table/TablePenggunaAktif";
import TablePenggunaDitolak from "../../../components/Table/TablePenggunaDitolak";
// import ModalTambahPengguna from "../../components/Popup/ModalTambahPengguna";
import PenggunaStyle from "./Pengguna.module.css";
import { Row, Button, Container, Alert } from "reactstrap";
import { set } from "d3";

const SubContentPengguna = ({ item, alert, notif, fetch }) => {
  // console.log('parent component',item, alert, notif, fetch)
  return (
    <Row>
      {
        {
          Verifikasi: <TablePenggunaVerif fetch={fetch} alert={alert}/>,
          "Pengguna Aktif": <TablePenggunaAktif />,
          Ditolak: <TablePenggunaDitolak />,
        }[item]
      }
    </Row>
  );
};

const TabMenu = ({
  toggleStatus,
  toggleAction,
  setMenu,
  active,
  setReload,
  reload,
  alert,
  alertVerif,
  notif,
  fetch,
}) => {
  //timer
  const [timerPengguna, setTimerPengguna] = useState(null);

  const listTabPengguna = ["Verifikasi", "Pengguna Aktif", "Ditolak"];
  const handleAlertPengguna = () => {
    toggleAction(!toggleStatus);
    setReload(!reload);
    clearTimeout(timerPengguna);
    setTimerPengguna(
      setTimeout(() => {
        // setNotif(true)
      }, 3000)
    );
  };

  const handleFetch = (e) => {
    if (e) {
      fetch();
    }
  };

  return (
    <Container className={PenggunaStyle.tab_menu}>
      <Row>
        <div className={"d-none d-md-block w-100"}>
          <div className={"d-flex justify-content-between"}>
            <div className={"d-flex justify-content-center"}>
              {listTabPengguna.map((list, index) => (
                <div
                  className={active === list ? PenggunaStyle.selected : PenggunaStyle.selection}
                  key={index}
                  onClick={setMenu}
                  value={list}>
                  {list}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={"d-block d-md-none d-flex justify-content-around w-100 mt-3"}>
          {listTabPengguna.map((list, index) => (
            <div
              className={active === list ? PenggunaStyle.selected : PenggunaStyle.selection}
              key={index}
              onClick={setMenu}
              value={list}>
              {list}
            </div>
          ))}
        </div>
      </Row>
      <Row>
          {
            alertVerif === false ? "" :
              <Alert
                color={"success"}
                className={PenggunaStyle.panelNotiff}>
                Verifikasi Berhasil
            </Alert>
          }

        {/* {alert ? (
          <Alert
            color={alert.alert ? "success" : "success"}
            isOpen={notif.notif}
            className={PenggunaStyle.panelNotiff}>
            Tambah Pengguna Berhasil
          </Alert>
        ) : (
            <Alert
              color={alert.alert ? "danger" : "danger"}
              isOpen={notif.notif}
              className={PenggunaStyle.panelNotiff}>
              Tambah Pengguna Gagal
            </Alert>
          )} */}
      </Row>
    </Container>
  );
};

const Pengguna = () => {
  const [menu, setMenu] = React.useState("Verifikasi");
  const [modalPengguna, setModalPengguna] = React.useState(false);
  const toggleModal = () => setModalPengguna(!modalPengguna);
  const handleClick = (e) => setMenu(e.target.getAttribute("value"));

  const [fetch, setFetch] = useState(false);

  // alert
  const [notif, setNotif] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stringAlert, setStringAlert] = useState("");
  const [alertPengguna, setAlertPengguna] = useState(false);
  const [alertVerif, setAlertVerif] = useState(false);

  // timer
  const [timer, setTimer] = useState(null);

  //notif
  const [notifPengguna, setNotifPengguna] = useState(false);

  const handleFetch = () => {
    setFetch(!fetch);
  };

  const handleAlertVerif = () => {
    setAlertVerif(true);

    setTimer(
      setTimeout(() => {
        setAlertVerif(false);
      }, 10000)
    );
  }

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
      <ContentLayout
        title="Manajemen Pengguna"
        tabmenu={
          <TabMenu
            toggleStatus={modalPengguna}
            toggleAction={toggleModal}
            setMenu={handleClick}
            active={menu}
            alert={{
              alert: alert,
              setAlert: setAlert,
            }}
            alertVerif={alertVerif}
            notif={{
              notif: notif,
              setNotif: setNotif,
            }}
            fetch={handleFetch}
            handleAlert={handleAlert} // handle alert passing
          />
        }
        content={
          <SubContentPengguna
            item={ menu }
            alert={ handleAlertVerif }
            fetch={{ fetch: fetch, setFetch: handleFetch}}
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

export default Pengguna;
