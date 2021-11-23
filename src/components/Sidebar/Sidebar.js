import React, { useState, useContext } from "react";
import { BrowserRouter as Router, useLocation, useHistory } from "react-router-dom";
import styles from "./Sidebar.module.css";
import RootContext from "../../context";
import logo from "../../assets/img/baktikominfo.png";
import ModalLogout from "../Popup/ModalLogout";
import { GlobalContext } from '../../context/GlobalState';

const MenuItem = ({ item, active, path }) => {
  const { showNav } = useContext(GlobalContext);
  const history = useHistory();
  // const locationHasilSurveyor = useLocation().pathname == '/adminsurveyor/detail-issue' ? 'HASIL SURVEY' : "";
  const onClick = () => {
    showNav()
    history.push(path);
  };
  return (
    <div
      className={`${styles.button} ${active === item ? styles.active : styles.passive}`}
      onClick={onClick}>
      <b>{item}</b>
    </div>
  );
};

const Logout = () => {
  const [modalLogout, setModalLogout] = useState(false);

  const toggleModalLogout = () => {
    setModalLogout(!modalLogout);
  };
  return (
    <>
      <ModalLogout toggleModalLogout={toggleModalLogout} modalLogout={modalLogout} />
      <div className={`${styles.button} ${styles.passive}`} onClick={toggleModalLogout}>
        <b>KELUAR</b>
      </div>
    </>
  );
};

const Sidebar = ({ active, path }) => {
  return (
    <RootContext.Consumer>
      {({ menulist }) => {
        return (
          <>
            <div className={`${styles.card} d-none d-lg-block`}>
              <img src={logo} height={"50px"} className={"mt-3 mb-3"} alt="" />
              <React.Fragment>
                {menulist.map((menu, index) => {
                  return (
                    <MenuItem
                      item={menu.page}
                      key={index}
                      path={`/app${menu.path}`}
                      active={active}
                    />
                  );
                })}
              </React.Fragment>
              <Logout />
            </div>
            <div className={`${styles.card} d-block d-lg-none h-100 w-100`}>
              <img src={logo} className={styles.dashboard_logo} alt="" />
              <React.Fragment>
                {menulist.map((menu, index) => {
                  return (
                    <MenuItem
                      item={menu.page}
                      key={index}
                      path={`/app${menu.path}`}
                      active={active}
                    />
                  );
                })}
              </React.Fragment>
              <Logout />
            </div>
          </>
        );
      }}
    </RootContext.Consumer>
  );
};

export default Sidebar;
