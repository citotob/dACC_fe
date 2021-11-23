import React, { useState } from "react";

import { Alert, Modal, Input, Card, CardBody } from "reactstrap";

import { useHistory } from "react-router-dom";

// IMPORT STYLE
import style from "./style.module.scss";

//import API
import API from "../../../services";

function CardConfirm(props) {
  let role = window.localStorage.getItem("roleName");
  const userid = window.localStorage.getItem("userid");
  const data = props.datatable;
  const activeTab = props.activeTab.toLowerCase();
  const kodeSurvey = data?.data[0]?.kodeHasilSurvey;
  const history = useHistory();

  // modal states
  const [modalIssueOpen, setmodalIssue] = useState(false);
  const [modalSetujuOpen, setmodalSetuju] = useState(false);
  const [modalBukaKembaliOpen, setModalBukaKembaliOpen] = useState(false);

  // alert state
  const [alertSetujui, setalertSetujui] = useState(style.alertOff);
  const [alertTandai, setalertTandai] = useState(style.alertOff);
  const [alertMessage, setalertMessage] = useState(true);
  const [alertBukaKembali, setAlertBukaKembali] = useState(style.alertOff);

  // modal functions
  function tog_issue() {
    setmodalIssue(!modalIssueOpen);
    removeBodyCss();
  }

  function tog_setuju() {
    setmodalSetuju(!modalSetujuOpen);
    removeBodyCss();
  }

  const tog_bukaKembali = () => {
    setModalBukaKembaliOpen(!modalBukaKembaliOpen);
  };

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

  // handling API
  const handleIssue = () => {
    let params = {
      alasan: alasan,
      kode_survei: kodeSurvey,
      userfrom: userid,
      // jenis: activeTab,
    };

    API.tolakSurvey(params)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setalertMessage(true);
          setalertTandai(style.alertOn);
          setTimeout(() => {
            setalertTandai(style.alertOff);
          }, 3000);
          setTimeout(() => {
            history.push("/adminsurveyor/hasil-survey");
          }, 3200);
        }
      })
      .catch((err) => {
        setalertMessage(false);
        setalertTandai(style.alertOn);
        setTimeout(() => {
          setalertTandai(style.alertOff);
        }, 3000);
        setTimeout(() => {
          history.push("/adminsurveyor/hasil-survey");
        }, 3200);
        console.log(err.response);
      });
  };

  const handleApprove = () => {
    if (role === "admin") {
      let params = {
        // jenis: activeTab,
        kode_survei: kodeSurvey,
        userfrom: userid,
      };
      API.approveSurveyBTSAdmin(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res);
            setalertMessage(true);
            setalertSetujui(style.alertOn);
            setTimeout(() => {
              setalertSetujui(style.alertOff);
            }, 3000);
            setTimeout(() => {
              history.push("/admin/hasil-survey");
            }, 3200);
          }
        })
        .catch((err) => {
          setalertMessage(false);
          setalertSetujui(style.alertOn);
          setTimeout(() => {
            setalertSetujui(style.alertOff);
          }, 3000);
          setTimeout(() => {
            history.push("/admin/hasil-survey");
          }, 3200);
          console.log(err.response);
        });
    }
    if (role === "adminsurveyor") {
      let params = {
        // jenis: activeTab,
        kode_survei: kodeSurvey,
        userfrom: userid,
      };
      API.approveSurveyBTS(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res);
            setalertMessage(true);
            setalertSetujui(style.alertOn);
            setTimeout(() => {
              setalertSetujui(style.alertOff);
            }, 3000);
            setTimeout(() => {
              history.push("/adminsurveyor/hasil-survey");
            }, 3200);
          }
        })
        .catch((err) => {
          setalertMessage(false);
          setalertSetujui(style.alertOn);
          setTimeout(() => {
            setalertSetujui(style.alertOff);
          }, 3000);
          setTimeout(() => {
            history.push("/adminsurveyor/hasil-survey");
          }, 3200);
          console.log(err.response);
        });
    }
  };

  // handle buka kembali change status to reviewed (kirim balik ke admin surveyor biar bisa diedit)
  const handleBukaKembali = (dataDetail) => {
    let params = {
      kode: dataDetail.kode,
    };

    API.changeStatusBTS(params)
      .then((res) => {
        setalertMessage(true);
        setAlertBukaKembali(style.alertOn);
        setTimeout(() => {
          setAlertBukaKembali(style.alertOff);
        }, 3000);
        setTimeout(() => {
          history.push("/admin/hasil-survey");
        }, 3200);

        console.log("Buka kembali (change status bts) ", res.data);
      })
      .catch((err) => {
        setalertMessage(false);
        setAlertBukaKembali(style.alertOn);
        setTimeout(() => {
          setAlertBukaKembali(style.alertOff);
        }, 3000);
        setTimeout(() => {
          history.push("/admin/hasil-survey");
        }, 3200);
        console.log("Error buka kembali ", err.response);
      });
  };

  // modal components
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

  const modalBukaKembali = () => {
    return (
      <Modal
        isOpen={modalBukaKembaliOpen}
        centered={true}
        toggle={() => {
          tog_bukaKembali();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Buka Kembali Hasil Survey?</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>{data?.kode}</h1>
          </div>
          <div className={`span2 ${style.modalButtonWrapper}`}>
            <button
              type='button'
              onClick={() => {
                tog_bukaKembali();
              }}
              className={`btn-block waves-effect ${style.noButton}`}
              data-dismiss='modal'
            >
              Tutup
            </button>
            <button
              type='button'
              className={`bln-block waves-effect waves-light ${style.yesButton}`}
              onClick={() => {
                tog_bukaKembali();
                handleBukaKembali(data);
              }}
            >
              Iya
            </button>
          </div>
        </div>
      </Modal>
    );
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
      <div className={`${alertBukaKembali}`}>
        {alertMessage ? (
          <Alert color='success'>Buka Kembali Hasil Survey Berhasil</Alert>
        ) : (
          <Alert color='danger'>Buka Kembali Hasil Survey Gagal</Alert>
        )}
      </div>
      {modalComponentIssue()}
      {modalComponentSetuju()}
      {modalBukaKembali()}
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
                Tolak Hasil Survey
              </button>
            )}
            {role === "admin" && (
              <button
                className={`btn btn-outline-info`}
                onClick={() => {
                  tog_bukaKembali();
                }}
              >
                Buka Kembali
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
