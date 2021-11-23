import React, { useState, useEffect } from "react"
import styles from "./resetpass.module.css"
import logo from "../../assets/img/baktikominfo.png";
import { Card, Button, Alert } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Redirect } from "react-router-dom";
import API from "../../services";
import Password from "antd/lib/input/Password";
import ForgotPass from "../ForgotPass"

function ResetPassPages(props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [email, setEmail] = useState("");

  const [redirectCheckToken, setRedirectCheckToken] = useState(false);

  const token = props.location.pathname.substr(props.location.pathname.lastIndexOf("/") + 1)

  const checkExpiredToken = () => {
    API.getCheckToken(`${token}`)
      .then((response) => {
        if (response.status === 200) {
          // Continue
          const data = response.data;
          setEmail(data.values.email);
        }
      })
      .catch((err) => {
        // Redirect to Forgot Pass page
        setRedirectCheckToken(true);
        console.log(err.message)
      })
  }

  const handleReset = () => {

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        token: token,
        newpassword: password,
      })
    };

    API.postReset(requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.success) {
          // Success reset password
          // Redirect to Login, show notif success
          props.history.push({
            pathname: '/login',
            state: { notifResetPwd: true, alertResetPwd: true, messageResetPwd: 'Sukses melakukan reset password. Silahkan login ke dalam sistem.' }
          })
        } else {
          // Error reset password
          // Redirect to Login, show notif error
          props.history.push({
            pathname: '/login',
            state: { notifResetPwd: true, alertResetPwd: false, messageResetPwd: 'Terjadi kesalahan saat reset password. Silahkan masuk ke halaman Forgot Password untuk mengulangi tahapan.' }
          })
        }
      }).catch((err) => {
        // Error reset password
        // Redirect to Forgot Password, show notif error
        props.history.push({
          pathname: '/login',
          state: { notifResetPwd: true, alertResetPwd: false, messageResetPwd: 'Terjadi kesalahan pada sistem. Silahkan masuk ke halaman Forgot Password untuk mengulangi tahapan.' }
        })
        console.log(err.message);
      })
  }

  const hadleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleReset();
    }
  };

  useEffect(() => {
    checkExpiredToken();
  }, []);

  const checkPassword = (value, ctx) => {
    if (ctx.password !== ctx.passwordConfirm) {
      return "Password yang anda masukkan tidak sama.";
    }
    return true;
  }

  return (
    <div>
      {
        !redirectCheckToken ? (
          <div className={styles.ContLogin}>
            <div className={styles.CardLogin}>
              <div className={styles.LogoLog}>
                <img alt="Logo" src={logo} />
              </div>
              <div className={styles.title}>Reset Password</div>
              <div className={styles.WrapperContCard}>
                <Card body id={styles.ContCard}>
                  <AvForm onValidSubmit={handleReset}>
                    <div className={styles.LogField}>
                      <AvField style={{ marginBottom: "0" }}
                        type="password"
                        name="password"
                        className={styles.formfieldUs}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Kata Sandi"
                        validate={{
                          required: { password: true, errorMessage: "Please enter a password" },
                          myValidation: checkPassword
                        }}
                      />
                      <hr></hr>
                      <AvField style={{ marginBottom: "0" }}
                        type="password"
                        name="passwordConfirm"
                        className={styles.formfieldUs}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="Ulang Kata Sandi"
                        validate={{
                          required: { password: true, errorMessage: "Please enter a password" },
                          myValidation: checkPassword
                        }}
                      />
                    </div>
                    <div className={styles.LogBtn}>
                      <Button
                        className={styles.btnSubmit}
                        color="danger"
                        type="submit"
                        // onClick={handleReset}
                        onKeyPress={hadleKeyPress}
                      >
                        Submit
                      </Button>
                    </div>
                  </AvForm>
                  {/* <div className={styles.btnRegister}>
                            <Link to="/login">Login</Link>
                        </div> */}
                </Card>
              </div>
            </div>
          </div>
        ) : (
            <Redirect
              to={{
                pathname: "/forgotpassword",
                state: { alertTokenReset: true }
              }}
            />
          )}
    </div>
  )
}

export default ResetPassPages;