import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeBreadcrumbItem } from '../../store/breadcrumb/action';
import { Alert } from 'reactstrap';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

// IMPORT STYLE
import style from './style.module.scss';

// IMPORT CARDS
import CardDetail from '../../components/FormPenugasanStaffAI/CardDetail';
import CardInfo from '../../components/FormPenugasanStaffAI/CardInfo';
import CardConfirm from '../../components/FormPenugasanStaffAI/CardConfirm';

function FormPenugasanStaffAI(props) {
  // redux
  const dispatch = useDispatch();

  //states
  const showSavedAlert = useSelector(
    (state) => state.SimpanFormAlert.showSavedAlert
  );
  const showSentAlert = useSelector(
    (state) => state.SimpanFormAlert.showSentAlert
  );

  //========== Get Local Storage Info
  const role = window.localStorage.getItem('roleName');
  const userid = window.localStorage.getItem('userid');
  const orgid = window.localStorage.getItem('org');
  // console.log("detailsurvey", props)
  const location = useLocation();
  const datatable = location.state?.datatable;
  const activeTab = location.state?.activeTab;

  useEffect(() => {
    dispatch(changeBreadcrumbItem('Akses Internet'));
  }, []);

  return (
    <div className={style.pageFont}>
      <div className="page-content px-4">
        {showSavedAlert === false ? (
          <></>
        ) : (
          <div className={`${style.alertOn}`}>
            <Alert color="success">Form Berhasil Di Simpan</Alert>
          </div>
        )}
        {showSentAlert === false ? (
          <></>
        ) : (
          <div className={`${style.alertOn}`}>
            <Alert color="success">Form Berhasil Di Kirim</Alert>
          </div>
        )}

        {/* ======================== HEADER ======================= */}
        <div className="d-flex flex-row justify-content-between mb-4">
          <div className="d-flex flex-row align-items-center">
            <div className="align-self-center">
              <span className={`${style.pageTitle} mr-4`}>
                Form Hasil Survey AI
              </span>
              {/* <button
                className={`${style.addDataButton}`}
                type='button'
                onClick={() => {
                  // tog_tambahTitik();
                }}
                data-toggle='modal'
                data-target='#myModal'
              >
                <i className='bi bi-plus-circle mr-2'></i>
                <span>Tambah Lokasi</span>
              </button> */}
            </div>
          </div>
          <div>
            {/* FIX BREADCRUMB TO SHOW MORE THAN 1 LAYER BELOW */}
            <Breadcrumbs title="Penugasan" titleLink={`/${role}/penugasan`} />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <CardDetail datatable={datatable} activeTab={activeTab} />
        <CardInfo datatable={datatable} activeTab={activeTab} />
        <CardConfirm datatable={datatable} activeTab={activeTab} />
      </div>
    </div>
  );
}

export default FormPenugasanStaffAI;
