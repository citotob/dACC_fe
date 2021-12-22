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
import Table from "../../components/Deposit/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function Deposit() {
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
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();
  // cito
  const [ticket_id, setTicket_id] = useState("");
  const [member, setMember] = useState("");
  const [bank_member, setBank_member] = useState("");
  const [bank_destination, setBank_destination] = useState([]);
  const [selectedBank_destination, setSelectedBank_destination] = useState([]);
  const [amount, setAmount] = useState("");
  const [whitelabel, setWhitelabel] = useState([]);
  const [selectedWhitelabel, setSelectedWhitelabel] = useState([]);
  // 

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  // initial data for modal tambah pengguna
  const getInitData = () => {
    API.getAccBank()
      .then((res) => {
        const accBankData = res?.data?.values ?? "";
        // console.log("iniroledata", roleData)
        if (res.status === 200) {
          setBank_destination(accBankData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    API.getWL()
      .then((res) => {
        const wlData = res?.data?.values ?? "";
        if (res.status === 200) {
          setWhitelabel(wlData);
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
      ticket_id &&
      member &&
      bank_member &&
      selectedBank_destination &&
      amount &&
      selectedWhitelabel
    ) {
      postAddDeposit();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddDeposit = () => {
    let formData = new URLSearchParams();

    formData.append("ticket_id", ticket_id);
    formData.append("member", member);
    formData.append("bank_member", bank_member);
    formData.append("bank_destination", selectedBank_destination);
    formData.append("amount", amount);
    formData.append("whitelabel", selectedWhitelabel);
    formData.append("userid", userId);
    API.postAddDeposit(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        setTicket_id("");
        setMember("");
        setBank_member("");
        setBank_destination([]);
        setSelectedBank_destination([]);
        setAmount("");
        setWhitelabel([]);
        setSelectedWhitelabel([]);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah Deposit Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddDeposit();
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
              Tambah Deposit berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("name") &&
                "Nama Deposit Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("currency") &&
                "Currency Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan Deposit</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddDeposit()}>
            <label className='col-form-label'>Pilih White Label</label>
            <div>
              <select
                name='whitelabel'
                onChange={(e) => setSelectedWhitelabel(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih White Label
                </option>
                {whitelabel && whitelabel.length !== 0 ? (
                  whitelabel?.map((whitelabel, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={whitelabel?.id}
                        key={index}
                      >
                        {whitelabel?.name ?? "Pilih White Label"}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih White Label
                  </option>
                )}
              </select>
            </div>
            <AvField
              name='ticketCustomMessage'
              label='Ticket'
              type='text'
              placeholder='Ticket'
              onChange={(e) => setTicket_id(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a tiket",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage: "Nama hanya berisi huruf dan angka",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Nama harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='memberCustomMessage'
              label='Member'
              type='text'
              placeholder='Member'
              onChange={(e) => setMember(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a member",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage: "Code hanya berisi huruf dan angka",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Code harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='bank_memberCustomMessage'
              label='Bank Member'
              type='text'
              placeholder='Bank Member'
              onChange={(e) => setBank_member(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Bank Member",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage: "Code hanya berisi huruf dan angka",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Code harus lebih dari 1 karakter",
                },
              }}
            />
            <label className='col-form-label'>Pilih Bank Destination</label>
            <div>
              <select
                name='bank_destination'
                onChange={(e) => setSelectedBank_destination(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Bank Destination
                </option>
                {bank_destination && bank_destination.length !== 0 ? (
                  bank_destination?.map((bank_destination, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={bank_destination?.id}
                        key={index}
                      >
                        {/* {bank_destination?.name ?? "Pilih Bank Destination"} */}
                        {bank_destination?.bank_name}-{bank_destination?.account}-{bank_destination?.name}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Bank Destination
                  </option>
                )}
              </select>
            </div>
            <AvField
              name='amountCustomMessage'
              label='Amount'
              type='text'
              placeholder='Amount'
              onChange={(e) => setAmount(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Amount",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage: "hanya berisi huruf dan angka",
                },
                minLength: {
                  value: 1,
                  errorMessage: "harus lebih dari 1 karakter",
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
        <Alert color='success'>Deposit berhasil di Ditambahkan!</Alert>
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
            <Breadcrumbs title='Data Deposit' breadcrumbItem='Aktif' />
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

export default Deposit;
