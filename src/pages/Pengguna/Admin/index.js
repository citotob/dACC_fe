import React, { useState } from "react";
import ContentLayout from "../../../components/Layout/ContentLayout/ContentLayout.js";
import TablePenggunaVerif from "../../../components/Table/TablePenggunaVerif";
import TablePenggunaAktif from "../../../components/Table/TablePenggunaAktif";
import TablePenggunaDitolak from "../../../components/Table/TablePenggunaDitolak";
import ModalTambahPengguna from "../../../components/Popup/ModalTambahPengguna";
import PenggunaStyle from "./Pengguna.module.css";
import { Row, Button, Container } from "reactstrap";

const SubContentPengguna = ({ item, alert, notif, fetch, handleAlert }) => {
  return (
    <Row>
      {
        {
          Verifikasi: <TablePenggunaVerif
            fetch={fetch}
            handleAlert={handleAlert}
          />,
          "Pengguna Aktif": <TablePenggunaAktif
            handleAlert={handleAlert}
          />,
          Ditolak: <TablePenggunaDitolak
            handleAlert={handleAlert}
          />,
        }[item]
      }
    </Row>
  );
};

const TabMenu = ({ toggleStatus, toggleAction, setMenu, active, fetch, handleAlert }) => {
  const listTabPengguna = ["Verifikasi", "Pengguna Aktif", "Ditolak"];

  const handleAlertPengguna = (bool) => {
    toggleAction(!toggleStatus);

    // Send Alert to parent
    handleAlert(bool, 'Tambah pengguna')
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
                  value={list}
                >
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
              value={list}
            >
              {list}
            </div>
          ))}
        </div>

        <ModalTambahPengguna
          isOpen={toggleStatus}
          toggle={toggleAction}
          fetch={handleFetch}
          handleAlert={handleAlertPengguna}
        />
      </Row>

    </Container>
  );
};

const Pengguna = () => {
  const [menu, setMenu] = React.useState("Verifikasi");
  const [modalPengguna, setModalPengguna] = React.useState(false);
  const toggleModal = () => setModalPengguna(!modalPengguna);
  const handleClick = (e) => setMenu(e.target.getAttribute("value"));

  // reload
  const [fetch, setFetch] = useState(false);

  // alert
  const [notif, setNotif] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stringAlert, setStringAlert] = useState("");
  // timer
  const [timer, setTimer] = useState(null);

  const handleFetch = () => {
    setFetch(!fetch);
  };

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
            fetch={handleFetch}
            handleAlert={handleAlert} // handle alert passing
          />
        }
        content={
          <SubContentPengguna
            item={menu}
            fetch={{ fetch: fetch, setFetch: handleFetch }}
            handleAlert={handleAlert} // handle alert passing
          />
        }
        // Show alert
        notification={notif}
        alert={alert}
        stringAlert={stringAlert}
      />
    </>
  );
}

export default Pengguna;
