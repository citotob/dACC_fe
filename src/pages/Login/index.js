import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import StyledLogin from "../Login/login.module.css";
import { Card, Button, Alert } from "reactstrap";
import logo from "../../assets/img/baktikominfo.png";
import firebase from '../../firebase';
import { Link } from "react-router-dom";

import Bell from '../../assets/icons/Bell.svg'
import Eye from '../../assets/icons/eye.svg'

//validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import API from "../../services";

function Login(props) {
  const history = useHistory();
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  //   const [timer, setTimer] = useState(null);

  // alert
  const [alertResetPwd, setAlertResetPwd] = useState(false);
  // notif
  const [notifResetPwd, setNotifResetPwd] = useState(false);
  // notif
  const [messageResetPwd, setMessageResetPwd] = useState("");

  // alert
  const [alertLogin, setAlertLogin] = useState(false);
  // notif
  const [notifLogin, setNotifLogin] = useState(false);
  const [notifLogin2, setNotifLogin2] = useState(false);

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  // alert panel
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  // toggle password
  const [passwordShown, setPasswordShown] = useState(false);


  if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
    messaging.requestPermission().then(async function () {
      const token = await messaging.getToken();
      window.localStorage.setItem('tokenFirebase', token)
    }).catch(err => {
      return err
    })
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const handleFromClick = () => {
    let token = window.localStorage.getItem('tokenFirebase')
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("token", token);
    if (!username || !password) {
      setError("Kolom Isian Tidak Lengkap");
    }
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    API.postLogin(requestOptions)
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          let role = data.values.role.name.replace(/\s/g, "").toLowerCase();

          if (role == "staffsurveyor") {
            setAlertLogin(false);
            setNotifLogin2(true);
            setTimeout(() => {
              setNotifLogin2(false);
            }, 10000);
          } else {
            window.localStorage.setItem("role", role.trim());
            window.localStorage.setItem("userid", data.values.id);
            window.localStorage.setItem("org", data.values.organization.id);
            window.localStorage.setItem("orgpt", data.values.organization.name);
            window.localStorage.setItem("email", data.values.email);
            window.localStorage.setItem("username", data.values.username);
            history.push(`/`);
          }
        } else {
          setAlertLogin(false);
          setNotifLogin(true);
          setTimeout(() => {
            setNotifLogin(false);
          }, 10000);
        }
      }).catch((err) => {
        return setError(err.status);
      })
  };

  const hadleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFromClick();
    }
  };

  const checkResetPasswordAction = () => {
    if (props.location.state) {
      // setNotifResetPwd(props.location.state.notifResetPwd ?? false);
      // setAlertResetPwd(props.location.state.alertResetPwd ?? false);
      // setMessageResetPwd(props.location.state.messageResetPwd ?? '')

      // Below for after reset and refresh at login page, the notif will disappear
      setNotifResetPwd(props.location.state.notifResetPwd !== notifResetPwd ? props.location.state.notifResetPwd : false);
      setAlertResetPwd(props.location.state.alertResetPwd !== alertResetPwd ? props.location.state.alertResetPwd : false);
      setMessageResetPwd(props.location.state.messageResetPwd !== messageResetPwd ? props.location.state.messageResetPwd : "")
      setTimeout(() => {
        setNotifResetPwd(false);
      }, 10000);
    } else {
      setAlertResetPwd(false);
      setNotifResetPwd(false);
    }
  }

  useEffect(() => {
    checkResetPasswordAction();
  }, []);

  return (
    <>
      <div>
        {/* Alert for Redirect from Reset Password action on Reset Password page. */}
        <Alert
          color={alertResetPwd
            ? "success"
            : notifResetPwd
              ? "danger"
              : ""
          }
          isOpen={notifResetPwd}
          style={{
            width: "100%",
            borderRadius: "20px",
            textAlign: "center",
            padding: "5px",
            margin: "0px",
          }}>
          {messageResetPwd === "" ? "" : messageResetPwd}
        </Alert>

        <Alert
          color={alertLogin ? "success" : "danger"}
          isOpen={notifLogin2}
          style={{
            width: "100%",
            borderRadius: "20px",
            textAlign: "center",
            padding: "5px",
            margin: "0px",
          }}>
          {alertLogin ? `` : `Akun dengan role staffsurveyor hanya dapat login di mobile apps!`}
        </Alert>

        {/* Alert for login failed. */}
        <Alert
          color={alertLogin ? "success" : "danger"}
          isOpen={notifLogin}
          style={{
            width: "100%",
            borderRadius: "20px",
            textAlign: "center",
            padding: "5px",
            margin: "0px",
          }}>
          {alertLogin ? `` : `Username atau Password Salah`}
        </Alert>
      </div>
      <div className={StyledLogin.ContLogin}>
        <div className={StyledLogin.CardLogin}>
          <div className={StyledLogin.LogoLog}>
            <img src={logo} alt="" />
          </div>
          <div className={StyledLogin.WrapperContCard}>
            <Card body id={StyledLogin.ContCard}>
              <AvForm onValidSubmit={handleFromClick}>
                <div className={StyledLogin.LogField}>
                  <AvField
                    type="text"
                    name="username"
                    className={StyledLogin.formfieldUs}
                    onChange={changeUsername}
                    placeholder="Username"
                    validate={{
                      required: { value: true, errorMessage: "Please enter a username" },
                      pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Username hanya boleh diisi dengan angka dan huruf. Pastikan tidak ada spasi di isian ini.' },
                    }}
                  />
                  <hr></hr>
                  <div className="pass-wrapper">
                    <AvField
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      className={StyledLogin.formfieldPw}
                      onChange={changePassword}
                      validate={{
                        required: { value: true, errorMessage: "Please enter a password" },
                        // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                        minLength: {
                          value: 4,
                          errorMessage: "Your name must be between 4 and 18 characters",
                        },
                        maxLength: {
                          value: 18,
                          errorMessage: "Your name must be between 4 and 18 characters",
                        },
                      }}
                      placeholder="Password"
                    />
                    <img
                      src={Eye}
                      alt=""
                      className={StyledLogin.iconEye}
                      onClick={togglePasswordVisiblity}
                    />
                  </div>
                </div>
                <div className={StyledLogin.LogBtn}>
                  <Button
                    className={StyledLogin.btnLogin}
                    color="danger"
                    type="submit"
                    onKeyPress={hadleKeyPress}>
                    Login
                  </Button>
                </div>
              </AvForm>
              <div className="d-flex justify-content-left">
                <span
                  className={StyledLogin.forgotPass}
                // onClick={handleLupaPass}
                >
                  {" "}
                  <Link to="/forgotpassword">Lupa Password ?</Link>
                </span>
              </div>
              <div className={StyledLogin.btnRegister}>
                <a href="/register">REGISTER</a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
