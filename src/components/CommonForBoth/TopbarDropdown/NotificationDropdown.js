import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

//i18n
import { withNamespaces } from "react-i18next";

//style
import style from "./style.module.scss";

// import API
import API from "../../../services";

const notificationDummy = [
  {
    title: "1 Hasil Survey Baru dari Budi",
    date: "1 Agustus 2021",
    icon: "bx bx-cart",
    unread: true,
  },
  {
    title: "1 Hasil Survey Baru dari Budi",
    date: "1 Agustus 2021",
    icon: "bx bx-cart",
    unread: true,
  },
  {
    title: "1 Hasil Survey Baru dari Budi",
    date: "1 Agustus 2021",
    icon: "bx bx-cart",
    unread: false,
  },
  {
    title: "1 Hasil Survey Baru dari Budi",
    date: "1 Agustus 2021",
    icon: "bx bx-cart",
    unread: false,
  },
  {
    title: "1 Hasil Survey Baru dari Budi",
    date: "1 Agustus 2021",
    icon: "bx bx-cart",
    unread: false,
  },
];

const NotificationDropdown = (props) => {
  const moment = require("moment");

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [notifList, setnotifList] = useState([]);
  const [bgColor, setbgColor] = useState("white");
  let role = window.localStorage.getItem("roleName");
  let username = window.localStorage.getItem("username");
  let params = {
    user: username,
  };

  useEffect(() => {
    let useEffectSubscribed = true;
    API.getNotif(params)
      .then((res) => {
        if (useEffectSubscribed) {
          if (res.status === 200) {
            // console.log(res.data.values);
            setnotifList(res.data.values);
          }
        }
      })
      .catch((err) => console.log(err.response));
    return () => (useEffectSubscribed = false);
  }, []);

  let today = new Date();
  let lastThreeDays = moment(today).subtract(3, "days")._d;
  // console.log(lastThreeDays);
  // console.log("hari ini adalah tanggal ", today);
  let newNotif = 0;
  for (let i = 0; i < notifList.length; i++) {
    if (moment(notifList[i]?.tanggal)._d > lastThreeDays) {
      newNotif += 1;
      // setbgColor("pink");
    }
  }
  // console.log("api getnotif :", moment(notifList[0]?.tanggal)._d);

  return (
    <>
      {notifList ? (
        <Dropdown
          isOpen={menu}
          toggle={() => setMenu(!menu)}
          className='dropdown d-inline-block px-2'
          tag='li'
        >
          <DropdownToggle
            className='btn header-item noti-icon waves-effect'
            tag='button'
            id='page-header-notifications-dropdown'
          >
            <i className='bx bx-bell bx-tada'></i>
            <span className='badge badge-danger badge-pill'>{newNotif}</span>
          </DropdownToggle>

          <DropdownMenu className='dropdown-menu dropdown-menu-lg p-0' right>
            <div className='p-3 border-bottom mx-3'>
              <Row className='align-items-center'>
                <Col>
                  <h6 className={`${style.notifikasiTitle} m-0`}>
                    {props.t("Notifikasi")}{" "}
                  </h6>
                </Col>
                <div className='col-auto'>
                  {role === "admin" && (
                    <Link to='/admin/notifikasi'>
                      <p href='' className={`my-auto ${style.lihatSemua}`}>
                        Lihat Semua
                      </p>
                    </Link>
                  )}
                  {role === "adminsurveyor" && (
                    <Link to='/adminsurveyor/notifikasi'>
                      <p href='' className={`my-auto ${style.lihatSemua}`}>
                        Lihat Semua
                      </p>
                    </Link>
                  )}
                  {role === "staffsurveyor" && (
                    <Link to='/staffsurveyor/notifikasi'>
                      <p href='' className={`my-auto ${style.lihatSemua}`}>
                        Lihat Semua
                      </p>
                    </Link>
                  )}
                </div>
              </Row>
            </div>

            <SimpleBar style={{ height: "230px" }}>
              {notifList.length !== 0
                ? notifList?.map((e, i) => {
                    return (
                      <Link
                        to=''
                        className='text-reset notification-item'
                        key={i}
                      >
                        <div
                          className='media'
                          styles={{ backgroundColor: `${bgColor}` }}
                        >
                          <div className='avatar-xs mr-3'>
                            <span className='avatar-title bg-primary rounded-circle font-size-16'>
                              <i className='bx bxs-bell-ring'></i>
                            </span>
                          </div>
                          <div className='media-body'>
                            <h6
                              className={`mt-0 mb-1 ${style.notificationTitle}`}
                            >
                              {e?.message}
                              {moment(e?.tanggal)._d > lastThreeDays ? (
                                <span className='badge badge-danger badge-pill align-top ml-1'>
                                  New
                                </span>
                              ) : (
                                ""
                              )}
                            </h6>
                            <div className='font-size-12 text-muted'>
                              <p className={`mb-0 ${style.notificationDate}`}>
                                {moment(e?.tanggal).format("DD/MM/YYYY")}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : ""}
            </SimpleBar>
          </DropdownMenu>
        </Dropdown>
      ) : (
        "Menunggu Data.."
      )}
    </>
  );
};

export default withNamespaces()(NotificationDropdown);
