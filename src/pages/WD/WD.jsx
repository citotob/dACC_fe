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
import Table from "../../components/WD/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function WD() {
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
  const [bank_origin, setBank_origin] = useState([]);
  const [selectedBank_origin, setSelectedBank_origin] = useState([]);
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
    // API.getAccBank()
    //   .then((res) => {
    //     const accBankData = res?.data?.values ?? "";
    //     // console.log("iniroledata", roleData)
    //     if (res.status === 200) {
    //       setBank_origin(accBankData);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
      selectedBank_origin &&
      amount &&
      selectedWhitelabel
    ) {
      postAddWD();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddWD = () => {
    let formData = new URLSearchParams();

    formData.append("ticket_id", ticket_id);
    formData.append("member", member);
    formData.append("bank_member", bank_member);
    formData.append("bank_origin", selectedBank_origin);
    formData.append("amount", amount);
    formData.append("whitelabel", selectedWhitelabel);
    formData.append("userid", userId);
    API.postAddWD(formData)
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
        setBank_origin([]);
        setSelectedBank_origin([]);
        setAmount("");
        // setWhitelabel([]);
        setSelectedWhitelabel([]);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah WD Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  function getAccBankWL(data) {
    let params = new URLSearchParams();
    params.append("id",data)
    API.getWLById(params)
      .then((res) => {
        const accBankData = res?.data?.values ?? "";
        if (res.status === 200) {
          setBank_origin(accBankData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddWD();
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
              Tambah WD berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("name") &&
                "Nama WD Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan WD</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddWD()}>
            <label className='col-form-label'>Pilih White Label</label>
            <div>
              <select
                name='whitelabel'
                onChange={(e) => {
                  setSelectedWhitelabel(e.target.value);
                  getAccBankWL(e.target.value);
                }}
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
                minLength: {
                  value: 1,
                  errorMessage: "Code harus lebih dari 1 karakter",
                },
              }}
            />
            <label className='col-form-label'>Pilih Bank Origin</label>
            <div>
              <select
                name='bank_origin'
                onChange={(e) => setSelectedBank_origin(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Bank Origin
                </option>
                {bank_origin && bank_origin.length !== 0 ? (
                  bank_origin?.map((bank_origin, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={bank_origin?.id}
                        key={index}
                      >
                        {/* {bank_origin?.name ?? "Pilih Bank origin"} */}
                        {bank_origin?.bankname}-{bank_origin?.account}-{bank_origin?.name}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Bank Origin
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
        <Alert color='success'>WD berhasil di Ditambahkan!</Alert>
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
            <Breadcrumbs title='Data WD' breadcrumbItem='Aktif' />
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

export default WD;
