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
import Table from "../../components/Bonus/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function Bonus() {
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
  const [wl, setWL] = useState([]);
  const [selectedWL, setSelectedWL] = useState([]);
  const [member, setMember] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
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
          setWL(wlData);
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
      selectedWL &&
      member &&
      keterangan &&
      amount
    ) {
      postAddBonus();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddBonus = () => {
    let formData = new URLSearchParams();

    formData.append("whitelabel", selectedWL);
    formData.append("amount", amount);
    formData.append("member", member);
    formData.append("keterangan", keterangan);
    formData.append("userid", userId);
    API.postAddBonus(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        setSelectedWL("");
        setMember("");
        setAmount("");
        setKeterangan("");
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah Bonus Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddBonus();
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
              Tambah Bonus berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("member") &&
                "Member Bonus Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan Bonus</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddBonus()}>
            <div>
              <select
                name='bank'
                onChange={(e) => setSelectedWL(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih WL
                </option>
                {wl && wl.length !== 0 ? (
                  wl?.map((wl, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        value={wl?.id}
                        key={index}
                      >
                        {wl?.name ?? "Pilih WL"}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih WL
                  </option>
                )}
              </select>
            </div>
            <AvField
              name='member'
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
                  errorMessage: "Member harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='keterangan'
              label='Keterangan'
              type='text'
              placeholder='Keterangan'
              onChange={(e) => setKeterangan(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a keterangan",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Keterangan harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='amount'
              label='Amount'
              type='text'
              placeholder='Amount'
              onChange={(e) => setAmount(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a amount",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Amount harus lebih dari 1 karakter",
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
        <Alert color='success'>Bonus berhasil di Ditambahkan!</Alert>
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
            <Breadcrumbs title='Data Bonus' breadcrumbItem='Aktif' />
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

export default Bonus;
