import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
import avatarAdmin from "../../../assets/images/users/avatarAdmin.png";
import avatarSurveyor from "../../../assets/images/users/avatarSurveyor.png";
import avatarExecutive from "../../../assets/images/users/avatarExecutive.png";
import avatarStaff from "../../../assets/images/users/avatarStaff.png";
import avatarCS from "../../../assets/images/users/avatarStaff.png";

//import style
import style from "./style.module.scss";

//icons
import profileIcon from "../../../assets/icons/profile-icon.svg";
import logoutIcon from "../../../assets/icons/logout-icon.svg";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  let role = window.localStorage.getItem("roleName");
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState(role);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className='d-inline-block'
      >
        <DropdownToggle
          className='btn header-item waves-effect'
          id='page-header-user-dropdown'
          tag='button'
        >
          {role === "admin" && (
            <img
              className='rounded-circle header-profile-user'
              src={avatarAdmin}
              alt='Header Avatar'
            />
          )}
          {role === "cs" && (
            <img
              className='rounded-circle header-profile-user'
              src={avatarCS}
              alt='Header Avatar'
            />
          )}
          {role === "adminsurveyor" && (
            <img
              className='rounded-circle header-profile-user'
              src={avatarSurveyor}
              alt='Header Avatar'
            />
          )}
          {role === "executive" && (
            <img
              className='rounded-circle header-profile-user'
              src={avatarExecutive}
              alt='Header Avatar'
            />
          )}
          {role === "staffsurveyor" && (
            <img
              className='rounded-circle header-profile-user'
              src={avatarStaff}
              alt='Header Avatar'
            />
          )}
          <span
            className={`d-none d-xl-inline-block ml-2 mr-1 ${style.profileMenu}`}
          >
            {username}
          </span>
          <i className='mdi mdi-chevron-down d-none d-xl-inline-block'></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <div className={`d-flex flex-row align-items-center gap8`}>
              <div
                className={`d-flex justify-content-center align-items-center`}
                style={{
                  height: "24px",
                  width: "24px",
                }}
              >
                <img
                  src={profileIcon}
                  className={`font-size-16 align-middle mr-1 ${style.profileDropdown}`}
                />
              </div>
              {role === "admin" && (
                <Link to='/admin/profile'>
                  <span className={`${style.profileDropdown}`}>
                    {props.t("Profile")}{" "}
                  </span>
                </Link>
              )}
              {role === "cs" && (
                <Link to='/cs/profile'>
                  <span className={`${style.profileDropdown}`}>
                    {props.t("Profile")}{" "}
                  </span>
                </Link>
              )}
              {role === "adminsurveyor" && (
                <Link to='/adminsurveyor/profile'>
                  <span className={`${style.profileDropdown}`}>
                    {props.t("Profile")}{" "}
                  </span>
                </Link>
              )}
              {role === "executive" && (
                <Link to='/executive/profile'>
                  <span className={`${style.profileDropdown}`}>
                    {props.t("Profile")}{" "}
                  </span>
                </Link>
              )}
              {role === "staffsurveyor" && (
                <Link to='/staffsurveyor/profile'>
                  <span className={`${style.profileDropdown}`}>
                    {props.t("Profile")}{" "}
                  </span>
                </Link>
              )}
            </div>
          </DropdownItem>
          <div className='dropdown-divider mx-3'></div>
          <Link to='/logout' className='dropdown-item'>
            <div className={`d-flex flex-row align-items-center gap8`}>
              <div
                className={`d-flex justify-content-center align-items-center`}
                style={{
                  height: "24px",
                  width: "24px",
                }}
              >
                <img
                  src={logoutIcon}
                  className='font-size-16 align-middle mr-1 text-danger'
                />
              </div>
              <span className={`${style.profileDropdown}`}>
                {props.t("Logout")}
              </span>
            </div>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withNamespaces()(ProfileMenu))
);
