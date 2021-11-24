import React, { useState, useEffect } from "react";

//reactstrap
import { Label, Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser, apiError } from "../../store/actions";

// import images
import logoBakti from "../../assets/images/BAKTI.png";

//import style
import styles from "./style.module.css";

//import API
import API from "../../services";

const Login = (props) => {
  const history = useHistory();

  const getInitData = () => {
    API.getRole()
      .then((res) => {
        const roleData = res?.data?.values ?? "";
        // console.log("iniroledata", roleData)
        if (res.status === 200) {
          setRole(roleData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const params = {
      surveyor: "all",
      jenis: "ai/bts",
    };
    API.getSurveyor(params)
      .then((res) => {
        // console.log("ini res data getsurveyor :", res.data)
        const organizationData = res?.data?.values ?? "";
        if (res.status === 200) {
          setOrganization(organizationData);
          // console.log("organization", organizationData)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInitData();
  }, []);

  // STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [docUpload, setDocUpload] = useState({});
  const [errorDocFormat, setErrorDocFormat] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  // handleValidSubmit
  function handleValidSubmit(event, values) {
    if (
      name &&
      email &&
      phone &&
      organization &&
      role &&
      username &&
      password &&
      docUpload
    ) {
      postRegis();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postRegis = () => {
    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("organization", selectedOrganization);
    formData.append("role", selectedRole);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("doc", docUpload);

    console.log("form data dari register", formData);
    API.postRegis(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            history.push("/login");
          }, 4000);
        }
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Register Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postRegis();
    }
  };

  function handleChange(e) {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e.target.files[0].name.split(".").pop();
        if (fileExtension !== "pdf") {
          setErrorDocFormat("Format Dokumen harus .pdf");
          setDocUpload("");
        } else {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
          console.log("REGISTER : file upload ", e.target.files[0]);
        }
        break;
    }
  }

  return (
    <React.Fragment>
      <div className={`account-pages pt-sm-5 ${styles.containerlogin}`}>
        <Container>
          <div
            style={{ position: "sticky", top: "10px", zIndex: "2000" }}
            className='w-100 d-flex justify-content-center text-center'
          >
            <Alert
              color={"success"}
              isOpen={toggleAlert}
              className={styles.alertDetail}
            >
              Register success.
              <br />
              Please Proceed to Log In.
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={styles.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("username") &&
                "Username Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("email") &&
                "Email Sudah Ada"}
            </Alert>
          </div>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5} className={`{styles.loginCard}`}>
              <Card className=' justify-content-center overflow-hidden'>
                <CardBody className='pt-0'>
                  <div className='p-2'>
                    {/* LOGO */}

                    <img src="" className={styles.logo}></img>

                    {/* FORM START */}

                    <AvForm
                      className='form-horizontal'
                      // was using postregis() directly instead of handleValidSubmit, if breaks change it back to postregis()
                      onValidSubmit={() => handleValidSubmit()}
                    >
                      {props.error && props.error ? (
                        <Alert color='danger'>{props.error}</Alert>
                      ) : null}

                      <AvField
                        name='nameCustomMessage'
                        label='Name'
                        type='text'
                        placeholder='Nama'
                        onChange={(e) => setName(e.target.value)}
                        className={`${styles.placeholder} form-control`}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter a name",
                          },
                          pattern: {
                            value: "^[A-Za-z0-9 ]+$",
                            errorMessage: "Nama hanya berisi huruf dan angka",
                          },
                          minLength: {
                            value: 6,
                            errorMessage: "Nama harus lebih dari 6 karakter",
                          },
                        }}
                      />
                      <AvField
                        name='emailProp'
                        label='Email'
                        type='text'
                        className={styles.placeholder}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Masukkan email yang valid",
                          },
                          email: {
                            value: true,
                            errorMessage: "Pastikan penulisan email sesuai",
                          },
                        }}
                      />
                      <AvField
                        name='phone'
                        label='No. Telp'
                        value=''
                        type='number'
                        className={styles.placeholder}
                        placeholder='No. Telp'
                        onChange={(e) => setPhone(e.target.value)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Masukkan No. Telp yang valid",
                          },
                          number: {
                            value: true,
                            errorMessage: "No. Telp harus berupa angka",
                          },
                        }}
                      />
                      <label className='col-form-label'>Pilih Instansi</label>
                      <div>
                        <select
                          name='organization'
                          onChange={(e) =>
                            setSelectedOrganization(e.target.value)
                          }
                          className={`form-control form-group ${styles.placeholder}`}
                        >
                          <option className={styles.placeholder}>
                            Pilih Instansi
                          </option>
                          {organization && organization?.length ? (
                            organization?.map((org, index) => {
                              return (
                                <option
                                  value={org.name}
                                  key={index}
                                  className={styles.placeholder}
                                >
                                  {org?.name ?? "Pilih Instansi"}
                                </option>
                              );
                            })
                          ) : (
                            <option className={styles.placeholder}>
                              Pilih Instansi
                            </option>
                          )}
                        </select>
                      </div>
                      <label className='col-form-label'>
                        Pilih Tipe Pengguna
                      </label>
                      <div>
                        <select
                          name='role'
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className={`form-control form-group ${styles.placeholder}`}
                        >
                          <option className={styles.placeholder}>
                            Pilih Tipe Pengguna
                          </option>
                          {role && role.length !== 0 ? (
                            role?.map((role, index) => {
                              if (
                                role?.name === "Admin Surveyor" ||
                                role?.name === "Staff Surveyor"
                              ) {
                                return (
                                  <option
                                    className={styles.placeholder}
                                    value={role?.id}
                                    key={index}
                                  >
                                    {role?.name ?? "Pilih Tipe Pengguna"}
                                  </option>
                                );
                              }
                            })
                          ) : (
                            <option className={styles.placeholder}>
                              Pilih Tipe Pengguna
                            </option>
                          )}
                        </select>
                      </div>
                      <AvField
                        name='username'
                        label='Username'
                        value=''
                        className={`${styles.placeholder} form-control`}
                        placeholder='Enter Username'
                        onChange={(e) => setUsername(e.target.value)}
                        type='username'
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Silakan isi Username",
                          },
                          pattern: {
                            value: "^[A-Za-z0-9]+$",
                            errorMessage:
                              "Username hanya boleh berisi angka dan huruf",
                          },
                          minLength: {
                            value: 5,
                            errorMessage: "Masukkan minimal 5 karakter",
                          },
                          // maxLength: {value: 16}
                        }}
                      />

                      <div className={`${styles.passwordBox}`}>
                        <AvField
                          name='password'
                          label='Password'
                          value=''
                          type='password'
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Silakan isi Password",
                            },
                            pattern: {
                              value: "/^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/g",
                              errorMessage:
                                "Password mengandung karakter yang tidak diperbolehkan",
                            },
                            minLength: {
                              value: 6,
                              errorMessage: "Masukkan minimal 6 karakter",
                            },
                            // maxLength: {value: 16}
                          }}
                          className={styles.placeholder}
                          placeholder='Enter Password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Label for='basicpill-firstname-input14'>
                        Dokumen Pendukung
                      </Label>
                      <Label
                        style={{
                          color: "red",
                          marginLeft: "15px",
                          fontSize: "11px",
                        }}
                      >
                        {errorDocFormat === "" ? "" : errorDocFormat}
                      </Label>
                      <input
                        type='file'
                        className='form-control'
                        name={"doc"}
                        onChange={(e) => handleChange(e)}
                        className='form-control'
                        style={{
                          display: "flex",
                          justifyItems: "center",
                          alignItems: "center",
                          height: "43px",
                        }}
                        accept='application/pdf'
                      />

                      <div className='mt-3 mb-2 text-center'>
                        <button
                          className={`${styles.buttonReset} ${styles.buttonLogin}`}
                          type='submit'
                          onClick={handleKeyPress}
                        >
                          Register
                        </button>
                      </div>
                      <div className='mt-3 mb-3 text-center'>
                        <Link to='/login' className='text-muted'>
                          Login
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
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
