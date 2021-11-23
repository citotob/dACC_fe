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
  // console.log("data dalam detail survey :", data);
  const activeTab = props.activeTab.toLowerCase();
  const kodeSurvey = data?.data[0]?.kodeHasilSurvey;
  // console.log("activeTab dari dalam card confirm :", activeTab);
  // console.log("userid dari dalam card confirm :", userid)
  const history = useHistory();

  // modal states
  const [modalIssueOpen, setmodalIssue] = useState(false);
  const [modalSetujuOpen, setmodalSetuju] = useState(false);

  // modal functions

  function tog_issue() {
    setmodalIssue(!modalIssueOpen);
    removeBodyCss();
  }

  function tog_setuju() {
    setmodalSetuju(!modalSetujuOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // Text Area Functions
  const [textcount, settextcount] = useState(0);
  const [textareabadge, settextareabadge] = useState(0);
  const [textarearequiredtext, settextarearequiredtext] = useState(false);
  const [alasan, setAlasan] = useState("");
  function textareachange(event) {
    var count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  // console.log("alasan menandai issue :", alasan);

  // handle issue
  const handleIssue = () => {
    let params = {
      alasan: alasan,
      jenis: activeTab,
      kode: kodeSurvey,
      userfrom: userid,
    };
    API.tandaiSurvey(params)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setalertMessage(true);
          setalertTandai(style.alertSetujuiOn);
          setTimeout(() => {
            setalertTandai(style.alertSetujuiOff);
          }, 3000);
          setTimeout(() => {
            history.push("/adminsurveyor/hasil-survey");
          }, 3200);
        }
      })
      .catch((err) => {
        setalertMessage(false);
        setalertTandai(style.alertSetujuiOn);
        setTimeout(() => {
          setalertTandai(style.alertSetujuiOff);
        }, 3000);
        setTimeout(() => {
          history.push("/adminsurveyor/hasil-survey");
        }, 3200);
        console.log(err.response);
      });
  };

  const modalComponentIssue = () => {
    return (
      <Modal
        isOpen={modalIssueOpen}
        centered={true}
        toggle={() => {
          tog_issue();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h2 className={style.title}>Tandai Issue Hasil Survey</h2>
          <div style={{ textAlign: "center" }}>
            <h4 className={style.name}>Deskripsi Issue Temuan</h4>
          </div>
          <div className={`d-flex flex-column align-items-center gap16`}>
            <div style={{ width: "360px" }}>
              <Input
                type='textarea'
                id='textarea'
                onChange={(e) => {
                  textareachange(e);
                  setAlasan(e.target.value);
                }}
                maxLength='225'
                rows='3'
                placeholder='Tuliskan deskripsi'
              />
              {textareabadge ? (
                <span className='badgecount badge badge-success '>
                  {textcount} / 225{" "}
                </span>
              ) : null}
            </div>

            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_issue();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              {textcount !== 0 ? (
                <button
                  type='button'
                  className={`bln-block waves-effect waves-light ${style.yesButton}`}
                  onClick={() => {
                    handleIssue();
                    tog_issue();
                    settextcount(0);
                    settextarearequiredtext(false);
                  }}
                >
                  Submit
                </button>
              ) : (
                <button
                  type='button'
                  className={`bln-block waves-effect waves-light ${style.yesButton}`}
                  onClick={() => {
                    settextarearequiredtext(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
            {textarearequiredtext && textcount === 0 ? (
              <span className={`${style.textAreaRequiredText}`}>
                Tolong diisi alasan penolakan
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  // handleApprove
  const handleApprove = () => {
    if (role === "admin") {
      let params = {
        jenis: activeTab,
        kode: kodeSurvey,
        usersetujui: userid,
      };
      API.approveSurvey(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res);
            setalertMessage(true);
            setalertSetujui(style.alertSetujuiOn);
            setTimeout(() => {
              setalertSetujui(style.alertSetujuiOff);
            }, 3000);
            setTimeout(() => {
              history.push("/admin/hasil-survey");
            }, 3200);
          }
        })
        .catch((err) => {
          setalertMessage(false);
          setalertSetujui(style.alertSetujuiOn);
          setTimeout(() => {
            setalertSetujui(style.alertSetujuiOff);
          }, 3000);
          setTimeout(() => {
            history.push("/admin/hasil-survey");
          }, 3200);
          console.log(err.response);
        });
    }
    if (role === "adminsurveyor") {
      let params = {
        jenis: activeTab,
        kode: kodeSurvey,
        userfrom: userid,
      };
      API.setujuiSurvey(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res);
            setalertMessage(true);
            setalertSetujui(style.alertSetujuiOn);
            setTimeout(() => {
              setalertSetujui(style.alertSetujuiOff);
            }, 3000);
            setTimeout(() => {
              history.push("/adminsurveyor/hasil-survey");
            }, 3200);
          }
        })
        .catch((err) => {
          setalertMessage(false);
          setalertSetujui(style.alertSetujuiOn);
          setTimeout(() => {
            setalertSetujui(style.alertSetujuiOff);
          }, 3000);
          setTimeout(() => {
            history.push("/adminsurveyor/hasil-survey");
          }, 3200);
          console.log(err.response);
        });
    }
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

  // alert state
  const [alertSetujui, setalertSetujui] = useState(style.alertSetujuiOff);
  const [alertTandai, setalertTandai] = useState(style.alertSetujuiOff);
  const [alertMessage, setalertMessage] = useState(true);

  return (
    <div>
      <div className={`${alertSetujui}`}>
        {alertMessage ? (
          <Alert color='success'>Survey Berhasil Disetujui</Alert>
        ) : (
          <Alert color='danger'>Survey Gagal Disetujui</Alert>
        )}
      </div>
      <div className={`${alertTandai}`}>
        {alertMessage ? (
          <Alert color='warning'>Tandai Issue Berhasil</Alert>
        ) : (
          <Alert color='danger'>Tandai Issue Gagal</Alert>
        )}
      </div>
      {modalComponentIssue()}
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
            {role === "adminsurveyor" && (
              <button onClick={() => tog_issue()} className={style.buttonIssue}>
                Tandai Issue
              </button>
            )}
            <button onClick={() => tog_setuju()} className={style.buttonSetuju}>
              Setujui Hasil Survey
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardConfirm;
