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
import Table from "../../components/AccBank/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function AccBank() {
  let roleName = window.localStorage.getItem("roleName");
  let userId = window.localStorage.getItem("userid");
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

  const [refresh, setrefresh] = useState(false);
  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  const [errorDocFormat, setErrorDocFormat] = useState();
  // cito
  const [bank, setBank] = useState([]);
  const [selectedBank, setSelectedBank] = useState([]);
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [user_account, setUser_account] = useState("");
  const [pass_account, setPass_account] = useState("");
  // 

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  // initial data for modal tambah pengguna
  const getInitData = () => {
    API.getBank()
      .then((res) => {
        const bankData = res?.data?.values ?? "";
        // console.log("iniroledata", roleData)
        if (res.status === 200) {
          setBank(bankData);
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
  // submit new Acc bank
  function handleValidSubmit(event, values) {
    if (
      selectedBank &&
      account &&
      name &&
      user_account &&
      pass_account
    ) {
      postAddAccBank();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddAccBank = () => {
    let formData = new URLSearchParams();

    formData.append("bankid", selectedBank);
    formData.append("account", account);
    formData.append("name", name);
    formData.append("user_account", user_account);
    formData.append("pass_account", pass_account);
    formData.append("userid", userId);
    API.postAddAccBank(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        // setBank("")
        // setSelectedBank([]);
        setAccount("");
        setName("");
        setUser_account("");
        setPass_account("");
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah AccBank Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddAccBank();
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
    // switch (e.target.name) {
    //   case "doc":
    //     let fileExtension = e.target.files[0].name.split(".").pop();
    //     if (fileExtension !== "pdf") {
    //       setErrorDocFormat("Format Dokumen harus .pdf");
    //       setDocUpload("");
    //     } else {
    //       setErrorDocFormat("");
    //       setDocUpload(e.target.files[0]);
    //     }
    //     break;
    // }
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
              Tambah AccBank berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("name") &&
                "Nama AccBank Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("account") &&
                "Rekening Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("bank") &&
                "Bank Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan AccBank</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddAccBank()}>
          <label className='col-form-label'>Pilih Tipe Pengguna</label>
            <div>
              <select
                name='bank'
                onChange={(e) => setSelectedBank(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Bank
                </option>
                {bank && bank.length !== 0 ? (
                  bank?.map((bank, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={bank?.id}
                        key={index}
                      >
                        {/* {bank?.name ?? "Pilih Bank"} */}
                        {bank?.name}-{bank?.currency}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Bank
                  </option>
                )}
              </select>
            </div>
            <AvField
              name='accountCustomMessage'
              label='Account'
              type='text'
              placeholder='Rekening'
              onChange={(e) => setAccount(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a rekening",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Rekening harus lebih dari 1 karakter",
                },
              }}
            />
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
                minLength: {
                  value: 1,
                  errorMessage: "Nama harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='user_accountCustomMessage'
              label='User_account'
              type='text'
              placeholder='User_account'
              onChange={(e) => setUser_account(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a user_account",
                },
                minLength: {
                  value: 1,
                  errorMessage: "User_account harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='pass_accountCustomMessage'
              label='Pass_account'
              type='text'
              placeholder='Password Account'
              onChange={(e) => setPass_account(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a user_account",
                },
                minLength: {
                  value: 1,
                  errorMessage: "User_account harus lebih dari 1 karakter",
                },
              }}
            />
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_AddData();
                  setrefresh(!refresh);
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
        <Alert color='success'>AccBank berhasil di Ditambahkan!</Alert>
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
            <Breadcrumbs title='Data AccBank' breadcrumbItem='Aktif' />
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

export default AccBank;
