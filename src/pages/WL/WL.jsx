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
import Table from "../../components/WL/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function WL() {
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
  const [id_wl, setId_wl] = useState("");
  const [name, setName] = useState("");
  const [url_website, setUrl_website] = useState([]);
  const [url_admin, setUrl_admin] = useState([]);
  const [account_bank, setAccount_bank] = useState([]);
  const [selectedAccBank, setSelectedAccBank] = useState([]);
  // 

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  // initial data for modal tambah pengguna
  const getInitData = () => {
    API.getAccBank()
      .then((res) => {
        const accbankData = res?.data?.values ?? "";
        // console.log("iniroledata", roleData)
        if (res.status === 200) {
          setAccount_bank(accbankData);
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
      id_wl &&
      name &&
      url_website &&
      url_admin &&
      selectedAccBank 
    ) {
      postAddWL();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddWL = () => {
    let formData = new URLSearchParams();

    formData.append("id_wl", id_wl);
    formData.append("name", name);
    formData.append("url_website", url_website+",");
    formData.append("url_admin", url_admin+",");
    formData.append("account_bank", selectedAccBank+",");
    formData.append("userid", userId);
    API.postAddWL(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        setId_wl("");
        setName("");
        setUrl_website([]);
        setUrl_admin([]);
        setSelectedAccBank([])
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah Whitelabel Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddWL();
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
              Tambah Whitelabel berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("name") &&
                "Nama WhiteLabel Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan WL</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddWL()}>
            <AvField
              name='id_wlCustomMessage'
              label='Id_wl'
              type='text'
              placeholder='Id_wl'
              onChange={(e) => setId_wl(e.target.value)}
              className={`${style.placeholder} form-control`}
              // validate={{
              //   required: {
              //     value: true,
              //     errorMessage: "Please enter a id_wl",
              //   },
              //   minLength: {
              //     value: 1,
              //     errorMessage: "Nama harus lebih dari 1 karakter",
              //   },
              // }}
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
              name='url_websiteCustomMessage'
              label='Url_website'
              type='text'
              placeholder='url_website'
              onChange={(e) => setUrl_website(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Url_website",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Code harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='url_adminCustomMessage'
              label='Url_admin'
              type='text'
              placeholder='Url_admin'
              onChange={(e) => setUrl_admin(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Url_admin",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Code harus lebih dari 1 karakter",
                },
              }}
            />
            <div>
              <select
                name='accbank'
                onChange={(e) => setSelectedAccBank(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Rekening Bank
                </option>
                {account_bank && account_bank.length !== 0 ? (
                  account_bank?.map((account_bank, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={account_bank?.id}
                        key={index}
                      >
                        {/* {bank?.name ?? "Pilih Bank"} */}
                        {account_bank?.bank_name}-{account_bank?.account}-{account_bank?.name}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Rekening Bank
                  </option>
                )}
              </select>
            </div>
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
        <Alert color='success'>WhiteLabel berhasil di Ditambahkan!</Alert>
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
            <Breadcrumbs title='Data WhiteLabel' breadcrumbItem='Aktif' />
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

export default WL;
