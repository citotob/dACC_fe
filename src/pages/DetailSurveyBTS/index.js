import React, { useState, useEffect } from "react";
import { Modal, Alert } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeBreadcrumbItem } from "../../store/breadcrumb/action";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// IMPORT STYLE
import style from "./style.module.scss";

// IMPORT CARDS
import CardDetail from "../../components/DetailSurveyBTS/CardDetail";
import CardInfo from "../../components/DetailSurveyBTS/CardInfo";
import CardConfirm from "../../components/DetailSurveyBTS/CardConfirm";
// untuk form
import CardForm from "../../components/FormEditAdminSurveyor/CardInfo";
import CardFormConfirm from "../../components/FormEditAdminSurveyor/CardConfirm";

// import api
import API from "../../services";

function DetailSurvey(props) {
  // redux
  const dispatch = useDispatch();

  const showSentAlert = useSelector(
    (state) => state.SimpanFormAlert.showSentAlert
  );

  console.log("showSentAlert", showSentAlert);

  //========== Get Local Storage Info
  const role = window.localStorage.getItem("roleName");
  const location = useLocation();
  const datatable = location.state?.datatable;
  const idSurvey = location.state?.idSurvey;

  // untuk dapatkan last data untuk di edit
  let sortedData = datatable.data.sort((a, b) =>
    a.tanggal_pembuatan > b.tanggal_pembuatan ? 1 : -1
  );
  let lastData = sortedData[sortedData.length - 1];
  const activeTab = location.state?.activeTab;
  const kode = datatable.kode;
  const [btsData, setbtsData] = useState([]);

  const getBTSData = () => {
    let formData = new FormData();
    formData.append("kode_survei", kode);

    API.getSurveyBTSbyKode(formData)
      .then((res) => {
        if (res.status === 200) {
          // console.log(
          //   "res api getsurveyBTSbyKode dari detailsurveyBTS page",
          //   res.data.values
          // );
          setbtsData(res.data.values);
        }
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    dispatch(changeBreadcrumbItem("BTS"));
    getBTSData();
  }, []);

  // modal states
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // modal functions
  function tog_edit() {
    setModalEditOpen(!modalEditOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // modal component
  const ModalEdit = () => {
    return (
      <Modal
        isOpen={modalEditOpen}
        centered={true}
        toggle={() => {
          tog_edit();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Edit Hasil Survey?</h5>
          <div>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_edit();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              <button
                type='button'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={() => {
                  setEditMode(true);
                  tog_edit();
                }}
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  return (
    <div className={style.pageFont}>
      <ModalEdit />
      <div className='page-content px-4'>
        {showSentAlert === false ? (
          <></>
        ) : (
          <div className={`${style.alertOn}`}>
            <Alert color='success'>Form Berhasil Di Kirim</Alert>
          </div>
        )}
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between mb-4'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4`}>
                {/* {role === "admin" ? "BTS" : "BTS Surveyor"} */}
                Manajemen Hasil Survey
              </span>
              {/* ====== form edit button =====  */}
              <button
                className={`${style.addDataButton}`}
                type='button'
                data-toggle='modal'
                data-target='#myModal'
                onClick={() => {
                  tog_edit();
                }}
              >
                <div className='d-flex flex-row align-items-center'>
                  <i className='bx bxs-edit mr-2 my-1'></i>
                  <span>Edit</span>
                </div>
              </button>
              {/* USE IF SOMETHING TO THE RIGHT OF THE PAGE IS NEEDED */}
              {/* <button
                className={`${style.addDataButton}`}
                type='button'
                onClick={() => {
                  tog_AddData();
                }}
                data-toggle='modal'
                data-target='#myModal'
              >
                <i classname='bi bi-plus-circle'></i>
                <span>Tambah Data</span>
              </button> */}
            </div>
          </div>
          <div>
            {/* FIX BREADCRUMB TO SHOW MORE THAN 1 LAYER BELOW */}
            <Breadcrumbs
              title='Manajemen Hasil Survey'
              titleLink={`/${role}/hasil-survey`}
            />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <CardDetail datatable={datatable} btsData={btsData} />
        {editMode ? (
          role === "adminsurveyor" ? (
            <>
              <CardForm
                datatable={datatable}
                activeTab={activeTab}
                idSurvey={idSurvey}
                lastData={lastData}
              />
              <CardFormConfirm
                datatable={datatable}
                activeTab={activeTab}
                idSurvey={idSurvey}
                lastData={lastData}
              />
            </>
          ) : (
            <></>
          )
        ) : (
          <>
            <CardInfo datatable={datatable} btsData={btsData} />
            <CardConfirm datatable={datatable} activeTab={activeTab} />
          </>
        )}
        {/* {role === "adminsurveyor" ? (
          <>
            <CardForm
              datatable={datatable}
              activeTab={activeTab}
              idSurvey={idSurvey}
              lastData={lastData}
            />
            <CardFormConfirm
              datatable={datatable}
              activeTab={activeTab}
              idSurvey={idSurvey}
              lastData={lastData}
            />
          </>
        ) : (
          <></>
        )}

        <CardInfo datatable={datatable} btsData={btsData} />
        <CardConfirm datatable={datatable} activeTab={activeTab} /> */}
      </div>
    </div>
  );
}

export default DetailSurvey;
