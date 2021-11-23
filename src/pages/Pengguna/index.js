import React, { useState } from "react";
import ContentLayout from "../../components/Layout/ContentLayout/ContentLayout.js";
import TablePenggunaVerif from "../../components/Table/TablePenggunaVerif";
import TablePenggunaAktif from "../../components/Table/TablePenggunaAktif";
import TablePenggunaDitolak from "../../components/Table/TablePenggunaDitolak";
import ModalTambahPengguna from "../../components/Popup/ModalTambahPengguna";
import PenggunaStyle from "./Pengguna.module.css";
import { Row, Button, Container, Alert } from "reactstrap";
import { set } from "d3";

const SubContentPengguna = ({ item, alert, notif, fetch }) => {
  return (
    <Row>
      {
        {
          Verifikasi: <TablePenggunaVerif fetch={fetch} />,
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
        <div className={"w-100 d-flex justify-content-center"}>
          <Button
            size="sm"
            className={`${PenggunaStyle.menu_button} d-block d-md-none`}
            onClick={toggleAction}>
            + Tambah Pengguna
          </Button>
        </div>
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
            <Button
              className={`${PenggunaStyle.menu_button} d-none d-md-block`}
              onClick={toggleAction}>
              + Tambah Pengguna
            </Button>
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

        <ModalTambahPengguna
          isOpen={toggleStatus}
          handleAlertPengguna={handleAlertPengguna}
          toggle={toggleAction}
          alert={alert}
          notif={notif}
          fetch={handleFetch}
        />
      </Row>

      <Row>
        {alert ? (
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
        )}
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
  const [alertPengguna, setAlertPengguna] = useState(false);
  //notif
  const [notifPengguna, setNotifPengguna] = useState(false);

  const handleFetch = () => {
    setFetch(!fetch);
  };
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
              alert: alertPengguna,
              setAlert: setAlertPengguna,
            }}
            notif={{
              notif: notifPengguna,
              setNotif: setNotifPengguna,
            }}
            fetch={handleFetch}
          />
        }
        content={<SubContentPengguna item={menu} fetch={{ fetch: fetch, setFetch: handleFetch }} />}
      />
    </>
  );
};

export default Pengguna;
