import React, { useState } from "react";

import { Alert, Modal, Input, Card, CardBody } from "reactstrap";

import { useHistory } from "react-router-dom";

// IMPORT STYLE
import style from "./style.module.scss";

// import icons
// import mapIcon from "../../../assets/icons/map-icon.svg";

//import API
import API from "../../../services";

function CardConfirm(props) {
  let role = window.localStorage.getItem("roleName");
  const userid = window.localStorage.getItem("userid");
  const data = props.datatable;
  console.log("data dari detail issue :", data);
  const activeTab = props.activeTab.toLowerCase();
  const kodeSurvey = data?.data[0]?.kodeHasilSurvey;
  console.log("activeTab dari dalam card confirm :", activeTab);
  // console.log("userid dari dalam card confirm :", userid)
  const history = useHistory();

  let params = {
    jenis: activeTab,
    kode: kodeSurvey,
    usersetujui: userid,
  };

  const [modalSetujuOpen, setmodalSetuju] = useState(false);

  // alert state
  const [alertSetujui, setalertSetujui] = useState(style.alertSetujuiOff);

  // modal functions
  function tog_setuju() {
    setmodalSetuju(!modalSetujuOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // handleApprove
  const handleApprove = () => {
    API.approveSurvey(params)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res)
          let payload = {
            kode: kodeSurvey,
            status: "reviewed",
          };
          API.changeStatusPenugasan(payload)
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response));
          setTimeout(() => {
            history.push("/admin/hasil-survey");
          }, 3200);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const modalComponentSetuju = () => {
    return (
      <Modal
        isOpen={modalSetujuOpen}
        centered={true}
        toggle={() => {
          tog_setuju();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Setujui Hasil Survey?</h5>
          <div>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_setuju();
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
                  handleApprove();
                  tog_setuju();
                  setalertSetujui(style.alertSetujuiOn);
                  setTimeout(() => {
                    setalertSetujui(style.alertSetujuiOff);
                  }, 3000);
                  // setalertVerifyStatus(style.alertVerifyOn);
                  // setTimeout(() => {
                  //   setalertVerifyStatus(style.alertVerifyOff);
                  // }, 2000);
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
    <div>
      <div className={`${alertSetujui}`}>
        <Alert color='success'>Survey Berhasil Disetujui</Alert>
      </div>
      {modalComponentSetuju()}
      <Card>
        <CardBody className={style.cardBody}>
          <div className='d-flex justify-content-center p-2'>
            {role === "admin" ? (
              <button
                onClick={() => history.push(`/admin/hasil-survey/`)}
                className={style.buttonKembali}
              >
                Kembali
              </button>
            ) : role === "adminsurveyor" ? (
              <button
                onClick={() => history.push(`/adminsurveyor/hasil-survey/`)}
                className={style.buttonKembali}
              >
                Kembali
              </button>
            ) : (
              ""
            )}

            {role === "admin" && (
              <button
                onClick={() => tog_setuju()}
                className={style.buttonSetuju}
              >
                Setujui Hasil Survey
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardConfirm;
