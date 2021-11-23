import React, { useState, useEffect } from "react"
import styles from "./forgotpass.module.css"
import logo from "../../assets/img/baktikominfo.png";
import { Card, Button, Alert } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import API from "../../services";
import AvCheckboxGroup from "availity-reactstrap-validation/lib/AvCheckboxGroup";

function ForgotPassPages(props) {
  const [email, setEmail] = useState("");
  // alert
  const [alertForgot, setAlertForgot] = useState(false);
  // notif
  const [notifForgot, setNotifForgot] = useState(false);

  // alert
  const [alertTokenReset, setAlertTokenReset] = useState(false);
  // notif
  const [notifTokenReset, setNotifTokenReset] = useState(false);

  const handleForgot = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        "email": email
      })
    };
    // alert(email);
    API.postForgot(requestOptions)
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        if (response.success) {
          setAlertForgot(true);
          setNotifForgot(true);
          setTimeout(() => {
            setNotifForgot(false);
          }, 10000);
        } else {
          setAlertForgot(false);
          setNotifForgot(true);
          setTimeout(() => {
            setNotifForgot(false);
          }, 10000);
        }
      }).catch((err) => {
        console.log(err);
        setAlertForgot(false);
        setNotifForgot(true);
        setTimeout(() => {
          setNotifForgot(false);
        }, 10000);
      })
  }

  const hadleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleForgot();
    }
  };

  const checkTokenReset = () => {
    if (props.location.state) {
      const alertToken = props.location.state.alertTokenReset;
      setNotifTokenReset(true);
      setAlertTokenReset(alertToken);
      setTimeout(() => {
        setNotifTokenReset(false);
      }, 10000);
    } else {
      setNotifTokenReset(false);
      setAlertTokenReset(false);
    }
  }

  useEffect(() => {
    checkTokenReset();
  }, []);

  return (
    <div>
      <div>
        {/* Alert for Redirect from Reset Password page if token expired or not exist */}
        <Alert
          color={alertTokenReset ? "danger" : ""}
          isOpen={notifTokenReset}
          style={{
            width: "100%",
            borderRadius: "20px",
            textAlign: "center",
            padding: "5px",
            margin: "0px",
          }}>
          {alertTokenReset ? `Token yang anda masukkan sudah expired atau tidak tersedia dalam sistem. Silahkan ulangi prosedur Lupa Password.` : ``}
        </Alert>

        {/* Alert for success or failed when Forgot Password Action */}
        <Alert
          color={alertForgot ? "success" : "danger"}
          isOpen={notifForgot}
          style={{
            width: "100%",
            borderRadius: "20px",
            textAlign: "center",
            padding: "5px",
            margin: "0px",
          }}>
          {alertForgot ? `Kami telah mengirimkan panduan reset password ke email anda. Silahkan cek email anda.` : `Reset password gagal. Silahkan coba kembali.`}
        </Alert>
      </div>
      <div className={styles.ContLogin}>
        <div className={styles.CardLogin}>
          <div className={styles.LogoLog}>
            <img alt="logo" src={logo} />
          </div>
          <div className={styles.title}>Forgot Password</div>
          <div className={styles.WrapperContCard}>
            <Card body id={styles.ContCard}>
              <AvForm onValidSubmit={handleForgot}>
              {/* <AvForm> */}
                <div className={styles.LogField}>
                  <AvField style={{ marginBottom: "0" }}
                    type="email"
                    name="email"
                    className={styles.formfieldUs}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    validate={{
                      required: { email: true, errorMessage: "Please enter a email" },
                    }}
                  />
                </div>
                <div className={styles.LogBtn}>
                  <Button
                    className={styles.btnSubmit}
                    color="danger"
                    type="submit"
                    // onClick={handleForgot}
                    onKeyPress={hadleKeyPress}
                  >
                    Submit
                  </Button>
                </div>
              </AvForm>
              <div className={styles.btnRegister}>
                <Link to="/login">Login</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassPages;