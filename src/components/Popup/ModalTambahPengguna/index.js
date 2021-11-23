import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import styles from "./styles.module.css";
import Bell from '../../../assets/icons/Bell.svg'
import Eye from '../../../assets/icons/eye.svg'

const ModalTambahPengguna = (props) => {
  const [jenis_ai, setJenis_ai] = useState(false); // ini harus keadaan false karena jika true ini akan menghasilkan kondisi yang akan kita tuju

  // State input
  const [nama_lengkap, setNama_lengkap] = useState("");
  const [email, setEmail] = useState("");
  const [tipe_pengguna, setTipe_pengguna] = useState("");
  const [nama_instansi, setNama_instansi] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  const [rolelist, setRolelist] = useState([]);
  const [instanceList, setInstanceList] = useState([]);

  // error
  const [errorNama, setErrorNama] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTipePengguna, setErrorTipePengguna] = useState("");
  const [errorInstansi, setErrorInstansi] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  // toggle password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onChangeFileUpload = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const onHandleTelephoneChange = (e) => {
    let newPhone = e.target.value;
    const regexp = /^[0-9\b]+$/;

    if (newPhone === "" || regexp.test(newPhone)) {
      setPhone(newPhone);
    }
  };

  const inputChange = (event) => {
    const target = event.target;
    const value = target.value;

    switch (target.name) {
      case "name":
        var errorNama = value.length > 0 ? " " : "Silahkan Diisi Nama Anda";
        setNama_lengkap(value);
        setErrorNama(errorNama);

        break;

      case "email":
        var errorEmail = value.length > 0 && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) ? " " : "Silahkan Isi Email Anda Sesuai Format";
        setEmail(value);
        setErrorEmail(errorEmail);

        break;

      case "organization":
        var errorInstansi = value.length > 0 ? " " : "Silahkan Diisi Instansi Anda";
        setNama_instansi(value);
        setErrorInstansi(errorInstansi);

        break;

      case "tipe_pengguna":
        if (value === "5f13b362386bf295b4169eff" || value === "5f13b370386bf295b4169f00") {
          setJenis_ai(true);
          setTipe_pengguna(value);
        } else {
          setNama_instansi("BAKTI");
          setJenis_ai(false);
          setTipe_pengguna(value);
        }
        var errorTipePengguna = value.length > 0 ? " " : "Silahkan isi Tipe Pengguna Anda";
        setErrorTipePengguna(errorTipePengguna);
        break;

      case "username":
        var errorUsername = value.length > 0 && (/^[A-Za-z0-9]+$/.test(value)) ? " " : "Silahkan Diisi Username Anda";
        setUsername(value);
        setErrorUsername(errorUsername);

        break;

      case "password":
        var errorPassword = value.length > 0 ? " " : "Silahkan Diisi Password Anda";
        setPassword(value);
        setErrorPassword(errorPassword);

        break;

      case "phone":
        var errorPhone = value.length > 0 ? " " : "Silahkan Diisi Nomor Telepon Anda";
        setPhone(value);
        setErrorPhone(errorPhone);

        break;

      default:
        break;
    }
  };

  // Get Role to choose
  const handleGetRole = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/user/getrole/`)
      .then((response) => response.json())
      .then((data) => setRolelist(data.values));
  };

  // Get Surveyor to choose
  const handleGetSurveyor = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveyor/`, {
      method: "POST",
      body: JSON.stringify({
        surveyor: "all",
        jenis: "ai/bts",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //
        setInstanceList(data.values);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleGetRole();
    handleGetSurveyor();
  }, []);

  const Submit = (event) => {
    let formData = new FormData();

    formData.append("email", email);
    formData.append("organization", nama_instansi);
    formData.append("role", tipe_pengguna);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("jenis", "AI/BTS");
    formData.append("name", nama_lengkap);
    formData.append("phone", phone);
    formData.append("doc", uploadFile);
    setLoading(true);

    fetch(`${process.env.REACT_APP_BE_URL}/user/regist/`, {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setLoading(false);
        props.toggle();

        if (result.success) {

          props.handleAlert(true);
          props.fetch(true);
        } else {
          props.handleAlert(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        props.toggle();

        console.log("catch error", e);
        props.handleAlert(false);
      });
  };

  // handle Modal Exit
  const resetState = () => {
    setLoading(false);

    setNama_lengkap("");
    setEmail("");
    setTipe_pengguna("");
    setNama_instansi("");
    setUsername("");
    setPassword("");
    setPhone("");
    setUploadFile(null);

    setErrorNama("");
    setErrorEmail("");
    setErrorTipePengguna("");
    setErrorInstansi("");
    setErrorUsername("");
    setErrorPassword("");
    setErrorPhone("");

    setPasswordShown(false);
  };

  return (
    <Modal
      size="lg"
      centered={true}
      isOpen={props.isOpen}
      toggle={props.toggle}
      onOpened={resetState} // transition in
    >
      <ModalBody>
        <Form>

          {/* Nama Lengkap */}
          <FormGroup>
            <Label>Nama Lengkap</Label>
            <Input
              className={styles.input}
              type="text"
              name="name"
              onChange={inputChange}
              placeholder="Nama Lengkap"
              value={nama_lengkap}
            />
            {errorNama.length > 0 && <span className={styles.styleError}>{errorNama}</span>}
          </FormGroup>

          {/* Email */}
          <FormGroup>
            <Label>Email</Label>
            <Input
              className={styles.input}
              type="email"
              name="email"
              // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              onChange={inputChange}
              placeholder="Email"
            />
            {errorEmail.length > 0 && <span className={styles.styleError}>{errorEmail}</span>}
          </FormGroup>

          {/* Tipe Pengguna */}
          <FormGroup>
            <Label>Tipe Pengguna</Label>
            <select
              className={styles.FieldReg}
              type="select"
              name="tipe_pengguna"
              onChange={inputChange}>
              <option value="">Pilih</option>
              {rolelist.map((role, index) => {
                if (role.name !== "Staff asd") {
                  return (
                    <option value={role.id} key={index}>
                      {role.name}
                    </option>
                  );
                }
              })}
            </select>
            {errorTipePengguna.length > 0 && (
              <span className={styles.styleError}>{errorTipePengguna}</span>
            )}
          </FormGroup>

          {/* Nama Instansi */}
          <FormGroup>
            <Label>Nama Instansi</Label>
            <select
              disabled={tipe_pengguna === ""}
              className={styles.FieldReg}
              type="select"
              name="organization"
              value={nama_instansi}
              key={`${Math.floor(Math.random() * 1000)}-min`}
              onChange={inputChange}>
              {instanceList.map((instance, index) => {
                if (tipe_pengguna === "") {
                  return (
                    <option disabled="disabled" selected="selected" key={index}>
                      Pilih Tipe Pengguna Dahulu
                    </option>
                  );
                } else if (tipe_pengguna !== "5f13b370386bf295b4169f00" && tipe_pengguna !== "5f13b362386bf295b4169eff") {
                  if (instance.name === "BAKTI") {
                    return (
                      <option value={instance.name} key={index}>
                        {instance.name}
                      </option>
                    );
                  }
                } else {
                  if (instance.name !== "BAKTI" && instance.name !== "PILIH INSTANSI") {
                    if (tipe_pengguna === "") {
                      return (
                        <option disabled="disabled" selected="selected" key={index}>
                          Pilih Tipe Pengguna Dahulu
                        </option>
                      );
                    }
                    return (
                      <>
                        <option value={instance.name} key={index}>
                          {instance.name}
                        </option>
                      </>
                    );
                  }
                }
              })}
            </select>
            {errorInstansi.length > 0 && <span className={styles.styleError}>{errorInstansi}</span>}
          </FormGroup>

          {/* Username */}
          <FormGroup>
            <Label>Username</Label>
            <Input
              className={styles.input}
              type="text"
              name="username"
              onChange={inputChange}
              placeholder="Username"
            />
            {errorUsername.length > 0 && <span className={styles.styleError}>{errorUsername}</span>}
          </FormGroup>

          {/* Password */}
          <div className="pass-wrapper">
            <FormGroup>
              <Label>Password</Label>
              <Input
                className={styles.input}
                type={passwordShown ? "text" : "password"}
                name="password"
                onChange={inputChange}
                placeholder="Password"
              />

              <img
                src={Eye}
                alt=""
                className={styles.iconEye}
                onClick={togglePasswordVisiblity}
              ></img>
              {errorPassword.length > 0 && <span className={styles.styleError}>{errorPassword}</span>}
            </FormGroup>
          </div>

          {/* Phone */}
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              className={styles.FieldReg}
              name="phone"
              id="telephoneField"
              // className={styles.input}
              // value={phone}
              onChange={onHandleTelephoneChange}
              required
              placeholder="No. Telp"
            />
            {errorPhone.length > 0 && <span className={styles.styleError}>{errorPhone}</span>}
          </FormGroup>

          {/* File */}
          <FormGroup>
            <Label>File</Label>
            <Input
              className={styles.input}
              type="file"
              name="file"
              onChange={onChangeFileUpload}
              accept="application/pdf"
            />
          </FormGroup>

          {/* Buttons */}
          <Row className={styles.btn_modal}>
            <Button color="" onClick={props.toggle}>
              Cancel
            </Button>
            <Button
              onClick={Submit}
              disabled={
                uploadFile === "" ||
                  nama_lengkap === "" ||
                  tipe_pengguna === "" ||
                  nama_instansi === "" ||
                  // email === "" ||
                  !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) ||
                  phone === "" ||
                  // username === "" ||
                  !(/^[A-Za-z0-9]+$/.test(username)) ||
                  password === ""
                  ? true
                  : false
              }
              className={styles.btn_tambah}
            >
              {loading ? <Spinner /> : `Tambah Pengguna`}
            </Button>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalTambahPengguna;
