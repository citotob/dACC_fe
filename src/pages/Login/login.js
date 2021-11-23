import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import firebase from "../../firebase";

import { Col, CardBody, Card, Alert, Container } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser, apiError } from "../../store/actions";

// import images
// import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import logoBakti from "../../assets/images/BAKTI.png";

//import style
import styles from "../../assets/css/loginpages.module.css";

// API
import API from "../../services";
import Localbase from "localbase";
let db = new Localbase("db");
const Login = (props) => {
  // db.collection("btsMain6153c4edef769c4beeda8dc1").delete();
  // db.collection("local-forage-detect-blob-support").delete();
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  // const [error, setError] = useState("");
  // const [noMatch, setNoMatch] = useState("");
  // const [loading, setLoading] = useState(false);

  //alert
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertLoginFail, setAlertLoginFail] = useState(false);
  const [alertLoginError, setAlertLoginError] = useState(false);

  // notif
  const [notifLogin, setNotifLogin] = useState(false);
  const [notifLogin2, setNotifLogin2] = useState(false);

  const [notifLoginFail, setNotifLoginFail] = useState(false);
  const [notifLoginError, setNotifLoginError] = useState(false);

  //log in
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   typeof props?.dataAuth?.accessToken !== "undefined"
  // );

  const handleFromClick = () => {
    let formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    if (!username || !password) {
      setAlertLoginFail(true);
      setErrorMessage("Kolom Isian Tidak Lengkap");
    }

    API.postLogin(formData)
      .then((response) => {
        // console.log("response dari postlogin ",response);
        if (response.status === 200) {
          console.log(response.data)
          let role = response.data.values.role_name
            .replace(/\s/g, "")
            .toLowerCase();
          // if (role == "staffsurveyor") {
          //   setAlertLogin(false);
          //   setNotifLogin2(true);
          //   setTimeout(() => {
          //     setNotifLogin2(false);
          //   }, 10000);
          // } else {
          window.localStorage.setItem("roleName", role.trim());
          window.localStorage.setItem(
            "userid",
            response?.data?.values?.id ?? ""
          );
          window.localStorage.setItem(
            "org",
            response?.data?.values?.organization?.id ?? ""
          );
          window.localStorage.setItem(
            "orgpt",
            response?.data?.values?.organization?.name ?? ""
          );
          window.localStorage.setItem(
            "email",
            response?.data?.values?.email ?? ""
          );
          window.localStorage.setItem(
            "username",
            response?.data?.values?.username ?? ""
          );
          history.push(`/`);
        }
        // }
      })
      .catch((err) => {
        setNotifLoginFail(true);
        setErrorMessage(err?.response?.data?.message ?? "Login Gagal");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFromClick();
    }
  };

  return (
    <React.Fragment>
      {/* {isLoggedIn ? ( */}
      <div className={`account-pages ${styles.containerlogin}`}>
        <Container className='d-flex justify-content-center align-items-center'>
          {/* <Row className="justify-content-center"> */}
          <Alert
            color={alertLoginFail ? "success" : "danger"}
            isOpen={notifLoginFail}
            className={styles.alertDetail}
          >
            {alertLoginFail ? `berhasil` : `${errorMessage}`}
          </Alert>
          <Col
            md={8}
            lg={6}
            xl={5}
            // className={`d-flex align-items-center justify-content-center`}
          >
            <Card
              className={`d-flex justify-content-center align-items-center overflow-hidden ${styles.loginCard}`}
            >
              <CardBody className={`pt-0 ${styles.cardBody}`}>
                <div className='p-2'>
                  <img src="" className={styles.logo}></img>
                  <AvForm
                    className='form-horizontal'
                    onValidSubmit={() => handleFromClick()}
                    //   handleValidSubmit(e, v);
                    // }}
                  >
                    {props.error && props.error ? (
                      <Alert color='danger'>{props.error}</Alert>
                    ) : null}

                    <div className='form-group'>
                      <AvField
                        name='username'
                        label='Username'
                        value=''
                        className={`${styles.placeholder} form-control`}
                        placeholder='Enter Username'
                        type='username'
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter a username",
                          },
                          pattern: {
                            value: "^[A-Za-z0-9]+$",
                            errorMessage:
                              "Username hanya boleh diisi dengan angka dan huruf. Pastikan tidak ada spasi di isian ini.",
                          },
                        }}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {/* {console.log("username: ", username)} */}
                    <div className={styles.passwordGroup}>
                      <div className={`form-group ${styles.passwordBox}`}>
                        <AvField
                          name='password'
                          label='Password'
                          value=''
                          type='password'
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter a password",
                            },
                            minLength: {
                              value: 4,
                              errorMessage:
                                "Your name must be between 4 and 18 characters",
                            },
                            maxLength: {
                              value: 18,
                              errorMessage:
                                "Your name must be between 4 and 18 characters",
                            },
                          }}
                          className={styles.placeholder}
                          placeholder='Enter Password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='mt-3 mb-2 text-center'>
                      <button
                        className={`${styles.buttonReset} ${styles.buttonLogin}`}
                        type='submit'
                        onClick={handleKeyPress}
                      >
                        Login
                      </button>
                    </div>

                    <div className='mt-3 mb-3 text-center'>
                      <Link to='/register' className='text-muted'>
                        Register
                      </Link>
                    </div>
                    <div className={`${styles.forget} ${styles.placeholder}`}>
                      <Link to='/forgot-password'>Lupa Password?</Link>
                    </div>
                  </AvForm>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* </Row> */}
        </Container>
      </div>
      {/* // ) : ( // history.push("/home") // )} */}
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStatetoProps, { loginUser, apiError })(Login)
);
