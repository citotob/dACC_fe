import React, { useEffect } from "react";
import StyledSignUp from "../SignUp/signup.module.css";
import logo from "../../assets/img/baktikominfo.png";
import Bell from '../../assets/icons/Bell.svg'
import Eye from '../../assets/icons/eye.svg'
import { Card, Button, Alert } from "reactstrap";
import { withRouter, useHistory } from "react-router-dom";

class CardFormRegist extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleTelephoneChange = this.onHandleTelephoneChange.bind(this);
    this.state = {
      selectedfile: null,
      rolelist: [],
      instanceList: [],
      newPhone: "",
      regexp: /^[0-9\b]+$/,
      role: "",
      username: "",
      password: "",
      name: "",
      email: "",
      type: "",
      surveyor: "",
      organization: "",
      typePengguna: "",
      notif: false,
      alert: false,
      jenis_ai: false,
      errors: {
        username: "",
        password: "",
        name: "",
        newPhone: "",
        email: "",
        organization: "",
      },
      error: "",
      errorMessage: "",

      timer: null,
      timerRedirect: null,
      passwordShown: false
    };
  }

  redirectTologin(t) {
    this.setState({
      timerRedirect: setTimeout(() => {
        const { history } = this.props;
        history.push("/login");
      }, t),
    });
  }

  showNotif(bool, message) {
    const t = 3000; // Time to show notif
    if (bool) {
      this.setState({
        errorMessage: "Registrasi Anda Berhasil.",
      });
      // this.redirectTologin(t + 2000); // Add 1s for redirect
    }
    
    // clearTimeout(this.state.timer);
    this.setState({
      notif: true,
      alert: bool,
      timer: setTimeout(() => {
        this.setState({
          notif: false,
        });
      }, t),
    });

    if (message.includes("username")) {
      this.setState({ errorMessage: "Duplikat Username" });
    } else if (message.includes("email")) {
      this.setState({ errorMessage: "Duplikat Email" });
    }
  }

  onClick() {
    let formData = new FormData();

    formData.append("email", this.state.email);
    formData.append("organization", this.state.organization);
    formData.append("role", this.state.typePengguna);
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("jenis", "AI/BTS");
    formData.append("name", this.state.name);
    formData.append("phone", this.state.newPhone);
    formData.append("doc", this.state.selectedfile);

    fetch(`${process.env.REACT_APP_BE_URL}/user/regist/`, {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        // console.log(result)
        return result.json();
      })
      .then((result) => {
        console.log(result)
        if (result.success) {
          this.showNotif(true, result.message);
          setTimeout(
            () => this.props.history.push("/login"), 
            3000
          );
        } else {
          this.showNotif(false, result.message);
        }
        // this.props.history.push("/login");
      })
      .catch((e) => {
        console.log("catch error", e);
        this.showNotif(false, e.message);
      });
  }

  roleChange = (e) => this.setState({ role: e.target.value });

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    let formError = this.state.errors;
    switch (target.name) {
      case "name":
        formError.name = value.length > 0 ? " " : "Silahkan Isi Nama Anda";
        break;

      case "email":
        formError.email = value.length > 0 && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) ? " " : "Silahkan Isi Email Anda Sesuai Format";
        break;

      case "newPhone":
        formError.newPhone = value.length > 0 ? " " : "Silahkan Isi No Telepon Anda";
        break;

      case "organization":
        formError.organization = value.length > 0 ? " " : "Silahkan Isi Organization Anda";
        break;

      case "username":
        formError.username = value.length > 0 && (/^[A-Za-z0-9]+$/.test(value)) ? " " : "Silahkan Isi Username Anda. Pastikan hanya menggunakan huruf dan angka, serta tidak ada spasi.";
        break;

      case "password":
        formError.password = value.length > 0 ? " " : "Silahkan Isi Password Anda";
        break;

      case "typePengguna":
        formError.typePengguna = value.length > 0 ? " " : "Silahkan Isi Pilihan ini";
        if (value === "5f13b362386bf295b4169eff" || value === "5f13b370386bf295b4169f00") {
          this.setState({ jenis_ai: true });
        } else {
          this.setState({ jenis_ai: false });
        }
        break;

      default:
        break;
    }
    this.setState({ [target.name]: value });
  };

  contactSubmit = (e) => {
    e.preventDefault();
    this.CardFormRegist.validateFields();
    if (!this.CardFormRegist.isValid()) {
    } else {
    }
  };

  onHandleTelephoneChange = (e) => {
    let newPhone = e.target.value;
    let formError = this.state.errors;
    if (newPhone === "" || this.state.regexp.test(newPhone)) {
      formError.newPhone = newPhone.length > 0 ? " " : "Silahkan Isi No Telepon Anda";
      this.setState({ [e.target.name]: newPhone });
    }
  };

  onChangeFileUpload = (e) => this.setState({ selectedfile: e.target.files[0] });

  handleGetSurveyor = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveyor/`, {
      method: "POST",
      body: JSON.stringify({
        surveyor: "all",
        jenis: "ai/bts",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ instanceList: data.values });
      })
      .catch((e) => console.log(e));
  };

  handleGetRole = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/user/getrole/`)
      .then((response) => response.json())
      .then((data) => this.setState({ rolelist: data.values }))
      .catch((e) => console.log(e));
  };

  togglePasswordVisiblity = () => {
    this.setState({
      passwordShown: !this.state.passwordShown
    });
  };

  componentDidMount() {
    this.handleGetRole();
    this.handleGetSurveyor();
  }

  fileData = () => {
    if (this.state.selectedfile) {
      return (
        <div className={StyledSignUp.FieldReg}>
          <label className={StyledSignUp.labLog}>File Detail</label>
          <label className={StyledSignUp.labLog}>File Name: {this.state.selectedfile.name}</label>
          <label className={StyledSignUp.labLog}>File Type: {this.state.selectedfile.type}</label>
          <label className={StyledSignUp.labLog}>
            Last Modified: {this.state.selectedfile.lastModifiedDate ? (this.state.selectedfile.lastModifiedDate.toDateString()) : ("-")}
          </label>
        </div>
      );
    }
  };

  render() {
    const {
      selectedfile,
      name,
      email,
      newPhone,
      organization,
      username,
      password,
      errorMessage,
    } = this.state;
    // console.log('ini error',errorMessage)
    return (
      <>
        <div className={StyledSignUp.conRegis}>
          <div style={{ paddingBottom: "25px" }}>
            <Alert
              color={this.state.alert ? "success" : "danger"}
              isOpen={this.state.notif}
              style={{ borderRadius: "20px", textAlign: "center", padding: "5px", margin: "0px" }}>
              {errorMessage}
            </Alert>
          </div>
          <Card body id={StyledSignUp.contCard}>
            <center>
              <div className={StyledSignUp.LogoSign}>
                <img src={logo} alt="" />
              </div>
              <form className={StyledSignUp.inputReg}>
                <div className={StyledSignUp.title}>Register</div>

                <input
                  type="name"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  className={StyledSignUp.FieldReg}
                  placeholder="Nama"
                />
                {this.state.errors.name.length > 0 && (
                  <span className={StyledSignUp.styleError}>{this.state.errors.name}</span>
                )}

                <input
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  className={StyledSignUp.FieldReg}
                  value={this.state.email}
                  placeholder="Email"
                />

                {this.state.errors.email.length > 0 && (
                  <span className={StyledSignUp.styleError}>{this.state.errors.email}</span>
                )}

                <input
                  type="tel"
                  name="newPhone"
                  id="telephoneField"
                  className={StyledSignUp.FieldReg}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={this.state.newPhone}
                  onChange={this.onHandleTelephoneChange}
                  required
                  placeholder="No. Telp"
                />

                {this.state.errors.newPhone.length > 0 && (
                  <span className={StyledSignUp.styleError}>{this.state.errors.newPhone}</span>
                )}

                {/* <input
                  type="text"
                  name="organization"
                  onChange={this.handleChange}
                  value={this.state.organization}
                  className={StyledSignUp.FieldReg}
                  placeholder="Nama Instansi"
                />
                {this.state.errors.organization.length > 0 && (
                  <span className={StyledSignUp.styleError}>{this.state.errors.organization}</span>
                )} */}

                <select
                  className={StyledSignUp.FieldReg}
                  onChange={this.handleChange}
                  type="text"
                  name="organization"
                  id="organization"
                  placeholder="Nama Instansi"
                >
                  <option disabled="disabled" selected="selected">
                    Pilih Instansi
                  </option>
                  {this.state.instanceList.map((org, index) => {
                    if (org.name !== "BAKTI") {
                      return (
                        <option value={org.name} key={index}>
                          {org.name}
                        </option>
                      );
                    }
                    if (org.name !== undefined ){
                      return(
                        <option value={org.name} key={index}>
                          {org.name}
                        </option>
                      )
                    }
                  })}
                </select>

                <select
                  className={StyledSignUp.FieldReg}
                  onChange={this.handleChange}
                  name="typePengguna"
                  id="typePengguna"
                  placeholder="Tipe Surveyor"
                >
                  <option disabled="disabled" selected="selected">
                    Pilih Tipe Pengguna
                  </option>
                  {this.state.rolelist.map((role, index) => {
                    if (role.name === "Admin Surveyor" || role.name === "Staff Surveyor") {
                      return (
                        <option value={role.id} key={index}>
                          {role.name}
                        </option>
                      );
                    }
                  })}
                </select>

                {/* {this.state.jenis_ai && (
                  //ini kondisi field yang akan muncul ketika dipilih
                  <>
                    <select
                      className={StyledSignUp.FieldReg}
                      type="select"
                      name="tipe_surveyor"
                      onChange={this.handleChange}>
                      <option>Pilih Tipe Survey</option>
                      <option value={"AI"}>Akses Internet</option>
                      <option value={"BTS"}>BTS</option>
                      <option value={"AI/BTS"}>{`AI & BTS`}</option>
                    </select>
                  </>
                )} */}

                <input
                  type="username"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                  className={StyledSignUp.FieldReg}
                  placeholder="Username"
                />
                {this.state.errors.username.length > 0 && (
                  <span className={StyledSignUp.styleError}>{this.state.errors.username}</span>
                )}

                <div className="pass-wrapper">
                  <input
                    type={this.state.passwordShown ? "text" : "password"}
                    name="password"
                    onChange={this.handleChange}
                    className={StyledSignUp.FieldReg}
                    placeholder="Password"
                  />

                  <img
                    src={Eye}
                    alt=""
                    className={StyledSignUp.iconEye}
                    onClick={this.togglePasswordVisiblity}
                  ></img>
                </div>
                {this.state.errors.password.length > 0 && (
                  <span className={StyledSignUp.styleError}>{this.state.errors.password}</span>
                )}

                {/*<input type="password" name="newPassword" onChange={this.handleChange} className={StyledSignUp.FieldReg}  placeholder="ulangi password"/>
								{this.state.errors.password.length > 0 &&  ( <span className={StyledSignUp.styleError}>{this.state.errors.password}</span>
                				)} */}

                <label className={StyledSignUp.labLog}>Dokumen Penunjang</label>
                <input
                  type="file"
                  name={"doc"}
                  accept="application/pdf"
                  onChange={this.onChangeFileUpload}
                  className={StyledSignUp.FieldRegInput}
                  placeholder="Choose File"
                />
                {this.fileData()}
              </form>
              <div className={StyledSignUp.buttonReg}>
                <Button
                  type="submit"
                  color="danger"
                  style={{ borderRadius: "18px", fontSize: "18px", fontWeight: "bold" }}
                  className={StyledSignUp.btnRegister}
                  disabled={
                    selectedfile === null ||
                      name === "" ||
                      // !(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) ||
                      !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) ||
                      newPhone === "" ||
                      organization === "" ||
                      // username === "" ||
                      !(/^[A-Za-z0-9]+$/.test(username)) ||
                      password === ""
                      ? true
                      : false
                  }
                  onClick={this.onClick.bind(this)}>
                  REGISTER
                </Button>
              </div>
              <div className={StyledSignUp.buttonBack}>
                <Button
                  type="submit"
                  color="danger"
                  style={{ borderRadius: "18px", fontSize: "18px", fontWeight: "bold" }}
                  className={StyledSignUp.btnBackLogin}
                  onClick={this.onClick.bind(this)}>
                  <a href="/login">Login</a>
                </Button>
              </div>
            </center>
          </Card>
        </div>
      </>
    );
  }
}

export default withRouter(CardFormRegist);
