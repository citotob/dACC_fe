import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";
import {
  Container,
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  FormText,
  Alert,
} from "reactstrap";
import assets from ".././../assets/img/baktikominfo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { set } from "d3";
import { wrap } from "underscore";
import { calendarFormat } from "moment";

export default function Profile() {
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const toggleEmail = () => setIsOpenEmail(!isOpenEmail);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorPassConfirm, setErrorPassConfirm] = useState("");
  const [noMatch, setNoMatch] = useState("");
  // const [errPass, setErrPass] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [visibleSuccess, setVisibleSuccess] = useState(true);
  const [visibleError, setVisibleError] = useState(true);

  const onDismissSuccess = () => setVisibleSuccess(false);
  const onDismissError = () => setVisibleError(false);

  // const history = useHistory();
  const onClick = () => {
    window.history.go(-1);
    return false;
    // history.push('/');
  };

  const email = window.localStorage.getItem("email");
  const username = window.localStorage.getItem("username");
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("userid");
  const orgpt = window.localStorage.getItem("orgpt");
  const subStr = username.substring(0, 1);

  const handlePassword = () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);
    formData.append("newpassword", newPassword);

    if (password === "") {
      return setErrorPassword("Password tidak boleh kosong");
    }
    if (newPassword === "") {
      return setErrorNewPassword("New Password tidak boleh kosong");
    }
    if (passwordConfirm === "") {
      return setErrorPassConfirm("Confirm Password tidak boleh kosong");
    }
    if (newPassword !== passwordConfirm) {
      return setNoMatch("Password baru dan konfirmasi tidak sesuai");
    }

    const reqOption = {
      method: "POST",
      body: formData,
    };

    fetch(`${process.env.REACT_APP_BE_URL}/user/changepassword/`, reqOption)
      .then((res) => {
        setError("");
        setSuccess("");
        if (res.status === 400) {
          throw new Error("Password anda salah")
        }
        return res.json();
      })
      .then((val) => {
        // setErrPass("Password anda salah");
        if (!val.success) {
          setError(val.message);
        } else {
          setSuccess("Perubahan Password Berhasil");
        }

        setIsOpen(false);
        setPassword("");
        setNewPassword("");
        setPasswordConfirm("");
      })
      .catch((err) => {
        setError(err.message);
        setPassword("");
        setNewPassword("");
        setPasswordConfirm("");
      });
  };

  return (
    <>
      <div className={styles.contProfile}>
        <div className="d-flex justify-content-center">
          <div className={`${styles.title} mt-5 mb-5`}>
            <p>Manajemen Akun</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className={`${styles.card_costume} card`}>
          <Container className="mt-4 mb-3">
            {success === "" ? (
              ""
            ) : (
                <Alert color="success" isOpen={visibleSuccess} toggle={onDismissSuccess}>
                  {success}
                </Alert>
              )}
            {error === "" ? (
              ""
            ) : (
                <Alert color="danger" isOpen={visibleError} toggle={onDismissError}>
                  {error}
                </Alert>
              )}
            <Row className="mb-5">
              <div className={styles.avatar}>{subStr}</div>
              <div className={styles.wrap_user}>
                <div className={`${styles.email} pt-1 pb-1`}>
                  {email}
                </div>
                <div className={`${styles.username} pt-1 pb-1`}>
                  {username}
                </div>
                <div className={`${styles.role} pt-1 pb-1`}>
                  {orgpt}
                </div>
              </div>
            </Row>
            <Col>
              <div className="d-flex justify-content-between">
                <div>Email</div>
                <div>
                  <div>{email}</div>
                </div>
              </div>
            </Col>
            <hr />
            <Col>
              <div className="d-flex justify-content-between">
                <div>Password</div>
                <div>
                  <Row>
                    <div>Ganti password</div>
                    <div className="ml-2">
                      <button className={styles.btn_icon_collapse} onClick={toggle}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
            <hr />
            <Collapse isOpen={isOpen} className="mt-2">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-center mb-2">
                    <FormText>{noMatch}</FormText>
                    {/* <FormText>{errPass}</FormText> */}
                  </div>
                  <Form>
                    <FormGroup>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorPassword("");
                          setNoMatch("");
                        }}
                      />
                      <FormText>{errorPassword}</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setErrorNewPassword("");
                          setNoMatch("");
                        }}
                      />
                      <FormText>{errorNewPassword}</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                          setErrorPassConfirm("");
                          setNoMatch("");
                        }}
                      />
                      <FormText>{errorPassConfirm}</FormText>
                    </FormGroup>
                  </Form>
                  <Button color="primary" onClick={handlePassword}>
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Collapse>
          </Container>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className={`${styles.btnIcon} mt-2 mb-2`}>
          <span onClick={onClick}>
            <FontAwesomeIcon icon={faArrowCircleLeft} /> Back{" "}
          </span>
        </div>
      </div>
    </>
  );
}
