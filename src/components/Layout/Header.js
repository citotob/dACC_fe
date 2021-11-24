import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
// import { Row, Col } from "reactstrap";

import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/images/baktikominfo-2.png";

//i18n
import { withNamespaces } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";

//import style
import style from "./style.css";

const Header = (props) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const location = useLocation();
  const [topbar, settopbar] = useState(false);

  const changeTopbarBg = () => {
    if (window.scrollY >= 30) {
      settopbar(true);
    } else {
      settopbar(false);
    }
  };
  window.addEventListener("scroll", changeTopbarBg);

  function tToggle() {
    props.toggleLeftmenu(!props.leftMenu);
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile);
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile);
    }
  }

  useEffect(() => {
    if (
      location.pathname === "/admin/explore-data" ||
      location.pathname === "/executive/explore-data" ||
      location.pathname === "/vendor/explore-data"
    ) {
      props.toggleLeftmenu(!props.leftMenu);
      props.changeSidebarType("condensed", isMobile);
    } else {
      props.changeSidebarType("default", isMobile);
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div className='cirle-bg'>
        <div className='circle-bg-item circle-1'></div>
        <div className='circle-bg-item circle-2'></div>
      </div>
      <header className={topbar ? "page-topbar active" : "page-topbar"}>
        <div className='navbar-header'>
          <div className='d-flex align-items-center'>
            <div className='navbar-brand-box'>
              <Link to='/' className='logo'>
                <span className='logo-sm'>
                  <img src="" alt='' height='10' />
                </span>
                <span className='logo-lg'>
                  <img src="" alt='' height='49' />
                </span>
              </Link>
            </div>
            <div className='page-title-button'>
              <button
                type='button'
                onClick={() => {
                  tToggle();
                }}
                className='btn btn-sm px-3 font-size-20 waves-effect'
                id='vertical-menu-btn'
                style={{
                  display:
                    location.pathname === "/admin/explore-data" ||
                    location.pathname === "/executive/explore-data" ||
                    location.pathname === "/vendor/explore-data"
                      ? "none"
                      : "",
                  padding: 0,
                }}
              >
                <i className='fa fa-fw fa-bars'></i>
              </button>
            </div>
          </div>
          <div className={`${style.rightTopBar}`}>
            <ProfileMenu />
            <NotificationDropdown />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withNamespaces()(Header));
