import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  Alert,
} from "reactstrap";

// Tabs functions
import classnames from "classnames";

// IMPORT CUSTOM STYLING
import style from "./style.module.css";
// import "./style.css";

// IMPORT ASSETS
import DokPenunjangIcon from "../../../assets/icons/dok-penunjang-icon.svg";
import AksiNoIcon from "../../../assets/icons/aksi-no.svg";
import AksiYesIcon from "../../../assets/icons/aksi-yes.svg";

// IMPORT DUMMY DATA
// import { datatabel } from "./datatable";

//import API
import { url } from "../../../services/Config";
import API from "../../../services";

// IMPORT LIBRARY
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";

function TableBootstrap() {
  // states
  const [refresh, setrefresh] = useState(false);
  const [alertVerifyStatus, setalertVerifyStatus] = useState(
    style.alertVerifyOff
  );
  const [alertRejectStatus, setalertRejectStatus] = useState(
    style.alertRejectOff
  );
  const [selectedTableData, setselectedTableData] = useState(null); // untuk simpan data ID untuk aksi verify atau decline
  const [alasanTolak, setalasanTolak] = useState("");
  const [tableData, settableData] = useState([]); // untuk tab "Verifikasi"
  const [tableDataVerified, settableDataVerified] = useState([]); // untuk tab "Pengguna Aktif"
  const [tableDataDeclined, settableDataDeclined] = useState([]); // untuk tab "Pengguna Ditolak"
  const [loadingVerifikasi, setloadingVerifikasi] = useState(false); // untuk skeleton table Verifikasi
  const [loadingAktif, setloadingAktif] = useState(false); // untuk skeleton table Aktif
  const [loadingDitolak, setloadingDitolak] = useState(false); // untuk skeleton table Ditolak

  //pagination states and consts
  const [pageNumber, setpageNumber] = useState(0); // which page we are in

  const usersPerPage = 10; // how many to show per page
  const pagesVisited = pageNumber * usersPerPage; // how many users we have seen so far
  const pageCount = Math.ceil(tableData?.length ?? 1 / usersPerPage);

  const displayUsers = tableData
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((data, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{data?.name}</td>
          <td>{data?.username}</td>
          <td>{data?.role.name}</td>
          <td>{data?.email}</td>
          <td>{data?.phone}</td>
          <td>{data?.organization.name}</td>
          <td>
            <a href={`${url}/${data?.doc.path}`} target='_blank'>
              <img src={DokPenunjangIcon} alt='Icon Dok. Penunjang' />
            </a>
          </td>
          <td className={`${style.aksiButtonsWrapper}`}>
            <button
              type='button'
              onClick={() => {
                tog_verfiy();
              }}
              data-toggle='modal'
              data-target='#myModal'
            >
              <img src={AksiYesIcon} alt='Icon Aksi Yes' />
            </button>
            <button
              type='button'
              onClick={() => {
                tog_reject();
              }}
              data-toggle='modal'
              data-target='#myModal'
            >
              <img src={AksiNoIcon} alt='Icon Aksi No' />
            </button>
          </td>
        </tr>
      );
    });

  // modal states
  const [modalVerifyOpen, setmodalVerifyOpen] = useState(false);
  const [modalRejectOpen, setmodalRejectOpen] = useState(false);

  // fetch api
  const getDataPenggunaTable = () => {
    setloadingVerifikasi(true);
    API.getDataPenggunaTable("status=requested")
      .then((res) => {
        if (res.status === 200) {
          console.log("API Table Requested : ", res.data.values);
          settableData(res.data.values);
        } else {
          settableData(null);
        }
        setloadingVerifikasi(false);
      })
      .catch((err) => {
        settableData(null);
        setloadingVerifikasi(false);
        console.log(err);
      });
  };

  const getDataPenggunaTableVerified = () => {
    setloadingAktif(true);
    API.getDataPenggunaTable("status=aktif")
      .then((res) => {
        if (res.status === 200) {
          console.log("API Table Verified : ", res.data.values);
          settableDataVerified(res.data.values);
        } else {
          settableDataVerified(null);
        }
        setloadingAktif(false);
      })
      .catch((err) => {
        settableDataVerified(null);
        setloadingAktif(false);
        console.log(err);
      });
  };

  const getDataPenggunaTableDeclined = () => {
    setloadingDitolak(true);
    API.getDataPenggunaTable("status=declined")
      .then((res) => {
        if (res.status === 200) {
          console.log("API Table Verified : ", res.data.values);
          settableDataDeclined(res.data.values);
        } else {
          settableDataDeclined(null);
        }
        setloadingDitolak(false);
      })
      .catch((err) => {
        settableDataDeclined(null);
        setloadingDitolak(false);
        console.log(err);
      });
  };

  // useeffect
  useEffect(() => {
    getDataPenggunaTable();
    getDataPenggunaTableVerified();
    getDataPenggunaTableDeclined();
  }, []);

  useEffect(() => {
    getDataPenggunaTable();
    getDataPenggunaTableVerified();
    getDataPenggunaTableDeclined();
  }, [refresh]);

  // modal functions
  function tog_verfiy() {
    setmodalVerifyOpen(!modalVerifyOpen);
    removeBodyCss();
  }
  function tog_reject() {
    setmodalRejectOpen(!modalRejectOpen);
    settextarearequiredtext(false);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // Tabs functions (verifikasi, aktif, ditolak)
  const [customActiveTab, setcustomActiveTab] = useState("1");
  function toggleCustom(tab) {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }
  // Tabs functions (verifikasi, aktif, ditolak)

  // Text Area Functions
  const [textcount, settextcount] = useState(0);
  const [textareabadge, settextareabadge] = useState(0);
  const [textarearequiredtext, settextarearequiredtext] = useState(false);
  function textareachange(event) {
    var count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  // Action Button Functions
  const handleVerifyAction = (data) => {
    let params = {
      id: data,
    };
    API.postUserVerify(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Handle Verify Action 200 : ", res);
        }
      })
      .catch((err) => {
        console.log("Handle Verify Catch Error : ", err);
      });
  };

  const handleDeclineAction = (data) => {
    let params = {
      id: data,
      comment: alasanTolak,
    };
    API.postUserDecline(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Handle Decline Action 200 : ", res);
        }
      })
      .catch((err) => {
        console.log("Handle Decline Catch Error : ", err);
      });
  };

  // Table components
  const tableVerifikasi = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Tipe</th>
              <th>Email</th>
              <th>No Telp.</th>
              <th>Instansi</th>
              <th>Dok. Penunjang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* {displayUsers} */}
            {tableData.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data?.name}</td>
                  <td>{data?.username}</td>
                  <td>{data?.role.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.phone}</td>
                  <td>{data?.organization.name}</td>
                  <td>
                    <a href={`${url}/${data?.doc.path}`} target='_blank'>
                      <img src={DokPenunjangIcon} alt='Icon Dok. Penunjang' />
                    </a>
                  </td>
                  <td className={`${style.aksiButtonsWrapper}`}>
                    <button
                      type='button'
                      onClick={() => {
                        tog_verfiy();
                        setselectedTableData(data);
                        // handleVerifyAction(data._id);
                      }}
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <img src={AksiYesIcon} alt='Icon Aksi Yes' />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        tog_reject();
                        setselectedTableData(data);
                      }}
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <img src={AksiNoIcon} alt='Icon Aksi No' />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const tableAktif = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Tipe</th>
              <th>Email</th>
              <th>No Telp.</th>
              <th>Instansi</th>
              <th>Dok. Penunjang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableDataVerified.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data?.name}</td>
                  <td>{data?.username}</td>
                  <td>{data?.role.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.phone}</td>
                  <td>{data?.organization.name}</td>
                  <td>
                    <a href={`${url}/${data?.doc.path}`} target='_blank'>
                      <img src={DokPenunjangIcon} alt='Icon Dok. Penunjang' />
                    </a>
                  </td>
                  <td className={`${style.aksiButtonsWrapper}`}>
                    <button
                      type='button'
                      onClick={() => {
                        tog_reject();
                        setselectedTableData(data);
                      }}
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <img src={AksiNoIcon} alt='Icon Aksi No' />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const tableDitolak = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Tipe</th>
              <th>Email</th>
              <th>No Telp.</th>
              <th>Instansi</th>
              <th>Dok. Penunjang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableDataDeclined.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data?.name ?? ""}</td>
                  <td>{data?.username ?? ""}</td>
                  <td>{data?.role.name ?? ""}</td>
                  <td>{data?.email ?? ""}</td>
                  <td>{data?.phone ?? ""}</td>
                  <td>{data?.organization.name ?? ""}</td>
                  <td>
                    <a href={`${url}/${data?.doc.path}`} target='_blank'>
                      <img src={DokPenunjangIcon} alt='Icon Dok. Penunjang' />
                    </a>
                  </td>
                  <td className={`${style.aksiButtonsWrapper}`}>
                    <button
                      type='button'
                      onClick={() => {
                        tog_verfiy();
                        setselectedTableData(data);
                      }}
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <img src={AksiYesIcon} alt='Icon Aksi Yes' />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Modal components
  const modalComponentVerify = () => {
    return (
      <Modal
        isOpen={modalVerifyOpen}
        centered={true}
        toggle={() => {
          tog_verfiy();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Verifikasi Pengguna</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>{selectedTableData?.name ?? ""}</h1>
            <p>{selectedTableData?.role?.name ?? ""}</p>
          </div>
          <div>
            <p className={style.confirmation}>Setujui Pendaftaran akun?</p>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_verfiy();
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
                  tog_verfiy();
                  handleVerifyAction(selectedTableData._id);
                  setrefresh(!refresh);
                  setalertVerifyStatus(style.alertVerifyOn);
                  setTimeout(() => {
                    setalertVerifyStatus(style.alertVerifyOff);
                    setselectedTableData(null);
                  }, 2000);
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

  const modalComponentReject = () => {
    return (
      <Modal
        isOpen={modalRejectOpen}
        centered={true}
        toggle={() => {
          tog_reject();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Tolak Pengguna</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>{selectedTableData?.name ?? ""}</h1>
            <p>{selectedTableData?.role?.name ?? ""}</p>
          </div>
          <div className={`d-flex flex-column align-items-center gap16`}>
            <p className={style.confirmation}>Tolak pendaftaran akun?</p>
            <div style={{ width: "360px" }}>
              <Input
                type='textarea'
                id='textarea'
                onChange={(e) => {
                  textareachange(e);
                  setalasanTolak(e.target.value);
                }}
                maxLength='225'
                rows='3'
                placeholder='Tuliskan alasan penolakan'
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
                  tog_reject();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Tutup
              </button>
              {textcount !== 0 ? (
                <button
                  type='button'
                  className={`bln-block waves-effect waves-light ${style.yesButton}`}
                  onClick={() => {
                    tog_reject();
                    settextcount(0);
                    handleDeclineAction(selectedTableData._id);
                    setrefresh(!refresh);
                    settextarearequiredtext(false);
                    setalertRejectStatus(style.alertRejectOn);
                    setTimeout(() => {
                      setalertRejectStatus(style.alertRejectOff);
                      setselectedTableData(null);
                      setalasanTolak("");
                    }, 2000);
                  }}
                >
                  Iya
                </button>
              ) : (
                <button
                  type='button'
                  className={`bln-block waves-effect waves-light ${style.yesButton}`}
                  onClick={() => {
                    settextarearequiredtext(true);
                  }}
                >
                  Iya
                </button>
              )}
            </div>
            {textarearequiredtext && textcount == 0 ? (
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

  return (
    <React.Fragment>
      <Row>
        <Col className='col-12'>
          <div className={`${alertVerifyStatus}`}>
            <Alert color='success'>Pengguna berhasil di verifikasi!</Alert>
          </div>
          <div className={`${alertRejectStatus}`}>
            <Alert color='success'>Pengguna berhasil di reject!</Alert>
          </div>
          {modalComponentVerify()}
          {modalComponentReject()}
          <Card>
            <CardBody>
              <Nav tabs className='nav-tabs-custom'>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    <span className='d-none d-sm-block'>Verifikasi</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    <span className='d-none d-sm-block'>Pengguna Aktif</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "3",
                    })}
                    onClick={() => {
                      toggleCustom("3");
                    }}
                  >
                    <span className='d-none d-sm-block'>Pengguna Ditolak</span>
                  </NavLink>
                </NavItem>
                <div className={`${style.tableSearchWrapper} ml-auto`}>
                  <div className={`${style.tableSearchBar}`}>
                    <i className='bi bi-search'></i>
                    <input
                      type='text'
                      name='search'
                      placeholder='Search...'
                      className={`${style.searchInput}`}
                    />
                  </div>
                  <div className={`${style.tableSearchButtonWrapper}`}>
                    <button className={`${style.tableSearchButton}`}>
                      import
                    </button>
                    <button className={`${style.tableSearchButton}`}>
                      export
                    </button>
                  </div>
                </div>
              </Nav>

              <TabContent activeTab={customActiveTab}>
                <TabPane tabId='1' className='p-3'>
                  <Row>
                    <Col sm='12'>
                      {loadingVerifikasi ? (
                        <div
                          className='w-75 mx-auto'
                          style={{ fontSize: 20, lineHeight: 2.2 }}
                        >
                          <Skeleton height={20} count={5} />
                        </div>
                      ) : (
                        tableVerifikasi()
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='2' className='p-3'>
                  <Row>
                    <Col sm='12'>
                      {loadingAktif ? (
                        <div
                          className='w-75 mx-auto'
                          style={{ fontSize: 20, lineHeight: 2.2 }}
                        >
                          <Skeleton height={20} count={5} />
                        </div>
                      ) : (
                        tableAktif()
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='3' className='p-3'>
                  <Row>
                    <Col sm='12'>
                      {loadingDitolak ? (
                        <div
                          className='w-75 mx-auto'
                          style={{ fontSize: 20, lineHeight: 2.2 }}
                        >
                          <Skeleton height={20} count={5} />
                        </div>
                      ) : (
                        tableDitolak()
                      )}
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
          {/* ============ PAGINATION  */}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            pageRangeDisplayed={1}
            nextLinkClassName={`${style.nextLink}`}
            previousClassName={`${style.prevlink}`}
            containerClassName={`${style.pagination}`}
            activeClassName={`${style.activePage}`}
            pageClassName={`${style.paginationStyle}`}
            pageLinkClassName={`${style.pageLink}`}
            onPageActive={(e) => e.selected === pageNumber}
            onPageChange={(e) => {
              setpageNumber(e.selected);
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TableBootstrap;
