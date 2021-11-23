import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Label, Modal, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/Pengguna/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function Pengguna() {
  let roleName = window.localStorage.getItem("roleName");
  const location = useLocation();
  const history = useHistory();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  // initial data for modal tambah pengguna
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

  // modal functions
  // submit new user
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
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        setName("");
        setEmail("");
        setPhone("");
        setOrganization([]);
        setSelectedOrganization();
        setRole([]);
        setSelectedRole([]);
        setUsername("");
        setPassword("");
        setDocUpload("");
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

  //alert state
  const [alertAddDataStatus, setalertAddDataStatus] = useState(
    style.alertAddDataOff
  );

  function tog_AddData() {
    setmodalAddDataOpen(!modalAddDataOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

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
        }
        break;
    }
  }

  // Modal component for tambah data
  const modalAddData = () => {
    return (
      <Modal
        isOpen={modalAddDataOpen}
        centered={true}
        toggle={() => {
          tog_AddData();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <div
            style={{ position: "sticky", top: "15px", zIndex: "2000" }}
            className='w-100 d-flex justify-content-center text-center'
          >
            <Alert
              color={"success"}
              isOpen={toggleAlert}
              className={style.alertDetail}
            >
              Tambah Pengguna berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("username") &&
                "Username Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("email") &&
                "Email Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan Pengguna</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postRegis()}>
            <AvField
              name='nameCustomMessage'
              label='Name'
              type='text'
              placeholder='Nama'
              onChange={(e) => setName(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a name",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
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
              className={style.placeholder}
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
            <label className='col-form-label'>Pilih Tipe Pengguna</label>
            <div>
              <select
                name='role'
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Tipe Pengguna
                </option>
                {role && role.length !== 0 ? (
                  role?.map((role, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={role?.id}
                        key={index}
                      >
                        {role?.name ?? "Pilih Tipe Pengguna"}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Tipe Pengguna
                  </option>
                )}
              </select>
            </div>
            <AvField
              name='phone'
              label='No. Telp'
              value=''
              type='number'
              className={style.placeholder}
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
            <label className='col-form-label'>Nama Instansi</label>
            <div>
              <select
                name='organization'
                onChange={(e) => setSelectedOrganization(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>Pilih Instansi</option>
                {organization && organization?.length ? (
                  organization?.map((org, index) => {
                    return (
                      <option
                        value={org.name}
                        key={index}
                        className={style.placeholder}
                      >
                        {org?.name ?? "Pilih Instansi"}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>Pilih Instansi</option>
                )}
              </select>
            </div>
            <AvField
              name='username'
              label='Username'
              value=''
              className={`${style.placeholder} form-control`}
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
                  errorMessage: "Username hanya boleh berisi angka dan huruf",
                },
                minLength: {
                  value: 5,
                  errorMessage: "Masukkan minimal 5 karakter",
                },
                // maxLength: {value: 16}
              }}
            />

            <div className={`${style.passwordBox}`}>
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
                className={style.placeholder}
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <FormGroup> */}
            <Label for='basicpill-firstname-input14'>Dokumen Pendukung</Label>
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
            {/* </FormGroup> */}

            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_AddData();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              <button
                type='submit'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={handleKeyPress}
              >
                Tambah
              </button>
            </div>
          </AvForm>

          {/* ============================== form   */}
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <div className={`${alertAddDataStatus}`}>
        <Alert color='success'>Pengguna berhasil di Ditambahkan!</Alert>
      </div>
      <div className='page-content px-4'>
        {modalAddData()}
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>{PageTitle()}</span>
              {roleName === "admin" ? (
                <button
                  className={`${style.addDataButton}`}
                  type='button'
                  onClick={() => {
                    tog_AddData();
                  }}
                  data-toggle='modal'
                  data-target='#myModal'
                >
                  <i className='bi bi-plus-circle'></i>
                  <span>Tambah Data</span>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <Breadcrumbs title='Data Pengguna' breadcrumbItem='Verifikasi' />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Pengguna;
