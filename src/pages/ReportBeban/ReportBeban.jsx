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
import Table from "../../components/ReportBeban/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function ReportBeban() {
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
  const [selectedJenis, setSelectedJenis] = useState("");
  const [desc, setDesc] = useState([]);
  const [whitelabel, setWhitelabel] = useState([]);
  const [selectedWhitelabel, setSelectedWhitelabel] = useState("");
  const [accountBank, setAccountBank] = useState([]);
  const [selectedAccountBank, setSelectedAccountBank] = useState("");
  const [amount, setAmount] = useState("");
  // 

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  // initial data for modal tambah pengguna
  const getInitData = () => {
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
      selectedJenis &&
      selectedWhitelabel &&
      selectedAccountBank &&
      amount
    ) {
      postAddBeban();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddBeban = () => {
    let formData = new URLSearchParams();

    formData.append("jenis", selectedJenis);
    formData.append("whitelabel", selectedWhitelabel);
    formData.append("accountBank", selectedAccountBank);
    formData.append("amount", amount);
    formData.append("userid", userId);
    API.postAddBeban(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        setSelectedJenis("");
        setSelectedWhitelabel("");
        setSelectedAccountBank("");
        setAmount("");
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah Bebam Gagal");
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
          setAccountBank(accBankData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddBeban();
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

  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

  const handleChange = event =>
    setAmount(addCommas(removeNonNumeric(event.target.value)));

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
              Tambah Beban berhasil
            </Alert>
            {/* <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("name") &&
                "Nama Beban Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("account") &&
                "Rekening Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("bank") &&
                "Bank Sudah Ada"}
            </Alert> */}
          </div>
          <h5 className={style.title}>Tambahkan Beban</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddBeban()}>
          <div>
              <select
                name='jenis'
                onChange={(e) => setSelectedJenis(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Jenis
                </option>
                <option value='gaji'>Gaji</option>
                <option value='seo'>SEO</option>
                <option value='akuran'>Akuran</option>
                <option value='lain-lain'>Lain-lain</option>
              </select>
            </div>
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
            <label className='col-form-label'>Pilih Bank Destination</label>
            <div>
              <select
                name='accountBank'
                onChange={(e) => setSelectedAccountBank(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Rekening
                </option>
                {accountBank && accountBank.length !== 0 ? (
                  accountBank?.map((accountBank, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={accountBank?.id}
                        key={index}
                      >
                        {accountBank?.bankname}-{accountBank?.account}-{accountBank?.name}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Rekening
                  </option>
                )}
              </select>
            </div>
            <label className='col-form-label'>Amount</label>
            <div>
              <input type="text" value={amount} onInput={handleChange} />
            </div>
            {/* <AvField
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
            /> */}
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  setAmount("");
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
        <Alert color='success'>Beban berhasil di Ditambahkan!</Alert>
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
            <Breadcrumbs title='Data Beban' breadcrumbItem='Aktif' />
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

export default ReportBeban;
