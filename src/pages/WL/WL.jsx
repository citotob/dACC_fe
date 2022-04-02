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
  const [nameWL, setNameWL] = useState("");
  const [url_website, setUrl_website] = useState([]);
  // const [listurl_website, setListurl_website] = useState([]);
  const [url_admin, setUrl_admin] = useState([]);
  const [account_bank, setAccount_bank] = useState([]);
  const [selectedAccBank, setSelectedAccBank] = useState([]);

  
  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  
  const [listurl_website, setListurl_website] = useState([]);
  const [inputurl_website, setInputurl_website] = useState("");

  const [listurl_admin, setListurl_admin] = useState([]);
  const [inputurl_admin, setInputurl_admin] = useState("");

  const [listAccBank, setListAccBank] = useState([]);
  const [inputAccBank, setInputAccBank] = useState("");

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
      nameWL &&
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
    formData.append("name", nameWL);
    formData.append("url_website", listurl_website);
    formData.append("url_admin", listurl_admin);
    formData.append("account_bank", listAccBank);
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
        setNameWL("");
        setUrl_website([]);
        setUrl_admin([]);
        setSelectedAccBank([]);
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
    setListurl_website([]);
    setListurl_admin([]);
    setListAccBank([]);
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
              label='NameWL'
              type='text'
              placeholder='Nama'
              onChange={(e) => setNameWL(e.target.value)}
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
            <div class="form-group">
              <label for="website" class="">URL Website</label>
              <input name="website" value={inputurl_website} onChange={(e) => setInputurl_website(e.target.value)} 
                class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>

              <button type='button' onClick={() => {
                setListurl_website((prevurl_website) => [...prevurl_website, inputurl_website])
                setInputurl_website("")
              }}>Add Data</button>
              <button type='button' onClick={() => {
                setListurl_website([])
              }}>Reset Data</button>

              {listurl_website.map((itemurl_website, k) => <p key={k}>{itemurl_website} | <span onClick={() => setListurl_website((prevurl_website) => prevurl_website.filter((e) => e !== itemurl_website))}>delete</span></p>)}
            </div>
            <div class="form-group">
              <label for="webadmin" class="">URL Admin</label>
              <input name="webadmin" value={inputurl_admin} onChange={(e) => setInputurl_admin(e.target.value)} 
                class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>

              <button type='button' onClick={() => {
                setListurl_admin((prevurl_admin) => [...prevurl_admin, inputurl_admin])
                setInputurl_admin("")
              }}>Add Data</button>
              <button type='button' onClick={() => {
                setListurl_admin([])
              }}>Reset Data</button>

              {listurl_admin.map((itemurl_admin, i) => <p key={i}>{itemurl_admin} | <span onClick={() => setListurl_admin((prevurl_admin) => prevurl_admin.filter((e) => e !== itemurl_admin))}>delete</span></p>)}
            </div>
            <div class="form-group">
              <select
                name='accbank'
                onChange={(e) => setInputAccBank(e.target.value)}
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
                        value={account_bank?.id+"-"+account_bank?.bankname+"-"+account_bank?.account+"-"+account_bank?.name}
                        key={index}
                      >
                        {/* {bank?.name ?? "Pilih Bank"} */}
                        {account_bank?.bankname}-{account_bank?.account}-{account_bank?.name}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Rekening Bank
                  </option>
                )}
              </select>
              <button type='button' onClick={() => {
                setListAccBank((prevAccBank) => [...prevAccBank, inputAccBank])
                setInputAccBank("")
              }}>Add Data</button>
              <button type='button' onClick={() => {
                setListAccBank([])
              }}>Reset Data</button>

              {listAccBank.map((itemAccBank, j) => <p name="p_accbank" key={j}>{itemAccBank} | <span name="s_accbank" onClick={() => setListAccBank((prevAccBank) => prevAccBank.filter((e) => e !== itemAccBank))}>delete</span></p>)}
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
