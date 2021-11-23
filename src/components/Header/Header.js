import React, { useState, useEffect, useRef } from 'react';
import Assets from "../../assets/icons/icon-avatar.png";
import { Link } from 'react-router-dom';
import { Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormText } from "reactstrap";
import styles from './styles.module.css';
// import { GlobalContext } from '../../context/GlobalState';
import Ellipse from '../../assets/icons/Ellipse.svg'
import Bell from '../../assets/icons/Bell.svg'
import API from '../../services';
import firebase from '../../firebase';

const useRecursiveTimeout = (callback, delay = 1000) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      const ret = ref.current();

      // const nextDelay = Math.floor(Math.random() * (delay * 2)) + 1;
      const nextDelay = delay;
      if (!ret) {
        setTimeout(tick, nextDelay);
      } else if (ret.constructor === Promise) {
        ret.then(() => setTimeout(tick, nextDelay));
      }
    };

    const timer = setTimeout(tick, delay);

    return () => clearTimeout(timer);
  }, [delay]);
};

const Header = (props) => {
  // const { nav, showNav } = useContext(GlobalContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  let role = window.localStorage.getItem("role");
  let username = window.localStorage.getItem("username");
  const [activeNotif, setActiveNotif] = useState(false)
  var moment = require("moment");

  const notifGet = (isSubscribed) => {
    let idNotif = window.localStorage.getItem('id')
    API.postNotif(username, isSubscribed).then(res => res.json()).then(response => {
      if (isSubscribed) {
        if (response.values[0] !== undefined) {
          // window.localStorage.setItem('id', response.values[0].id);
          setData(response.values)
          if (idNotif !== response.values[0].id) {
            window.localStorage.setItem('id', response.values[0].id);
            setActiveNotif(true)
          }
        }
      }
    })
  }

  // condition firebase
  if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging()
    messaging.requestPermission()
      .then(async function () {
        let idNotif = window.localStorage.getItem('id');
        navigator.serviceWorker.addEventListener("message", (message) => {
          API.getNotif(username).then(res => res.json()).then(response => {
            if (response.values[0] !== undefined) {
              if (idNotif !== response.values[0].id) {
                console.log(response.values);
                setActiveNotif(true)
                setData(response.values)
              }
            }
          })
        });
      })
      .catch(function (err) {
        return err
      });
  }

  useRecursiveTimeout(
    () =>
      new Promise((r) => {
        notifGet(true);
        r();
      }),
    60000
  );

  useEffect(() => {
    let isSubscribed = true;
    notifGet(isSubscribed)
    return () => (isSubscribed = false);
  }, [])

  const toggle = () => {
    setActiveNotif(false)
    setDropdownOpen(prevState => !prevState);
  }

  const onMouseEnter = () => {
    setDropdownOpen(true)
  }

  const onMouseLeave = () => {
    setDropdownOpen(false)
  }

  return (
    <>
      <div className={'d-none d-lg-block w-100'}>
        <Row className={'d-flex justify-content-between align-items-center w-100 mt-4 mb-2'}>
          {/* <img className={'d-none d-md-block d-lg-none ml-3'} src={Burger} alt="burger icon" height={'30px'} /> */}
          <span className={styles.text_header}>{props.title}</span>
          <div className="d-flex justify-content-between" >
            <div className={styles.notif}>
              <Dropdown direction="left" isOpen={dropdownOpen} toggle={toggle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                <DropdownToggle tag="span"
                  data-toggle="dropdown"
                  aria-expanded={dropdownOpen}>
                  <div className={styles.btnNotif}>
                    {
                      activeNotif === false ? "" : <img src={Ellipse} className={styles.ellipse} alt=""></img>
                    }
                    <img src={Bell} className={styles.bell} alt=""></img>
                  </div>
                </DropdownToggle>
                <DropdownMenu modifiers={{
                  setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                      return {
                        ...data,
                        styles: {
                          ...data.styles,
                          overflow: 'auto',
                          maxHeight: '320px',
                        },
                      };
                    },
                  },
                }} >
                  <DropdownItem style={{ color: "#2C3780", fontWeight: "400" }}>Notifikasi</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    {
                      data.map((val, index) => {
                        let date = moment(val.tanggal).format("ll")
                        let blue = <div className={styles.circleBlue}></div>
                        let red = <div className={styles.circleRed}></div>
                        let green = <div className={styles.circleGreen}></div>
                        return (
                          <div key={index} className="d-flex mt-2 mb-2">
                            <div className={styles.circle}></div>
                            {
                              val.title === "Registrasi Akun SMASLAB" ? blue : val.title === "Issue Survey" ? red : green
                            }
                            <div>
                              <div className="ml-1">
                                {/* {val.title} */}
                                {val.message}
                              </div>
                              <div className="ml-1">
                                <FormText color="muted" style={{ marginTop: "0" }}>
                                  {date}
                                </FormText>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>

              <Link to={`/app/${role}/profile`}><img src={Assets} alt="" /></Link>
            </div>
          </div>
        </Row>
      </div>
    </>
  )
}

export default Header;
