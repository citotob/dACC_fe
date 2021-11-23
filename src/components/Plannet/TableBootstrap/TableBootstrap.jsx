import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Modal, Label, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { changeBreadcrumbItem } from "../../../store/breadcrumb/action";
import { useDispatch } from "react-redux";
// IMPORT CUSTOM STYLING
import style from "./style.module.css";
import "./style.css";

//import API
import API from "../../../services";

// IMPORT LIBRARY
import Skeleton from "react-loading-skeleton";

function TableBootstrap() {
  // redux
  const dispatch = useDispatch();

  //pagination states
  const [pageNumber, setpageNumber] = useState(1); // which page we are in
  const [usersPerPage, setusersPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNext, setdisabledNext] = useState(false);

  // states
  const [breadcrumbStatus, setbreadcrumbStatus] = useState("aksesinternet");
  const [refresh, setrefresh] = useState(false);
  const [loading, setloading] = useState(false);
  const [tableData, settableData] = useState([]);
  const [activeTab, setactiveTab] = useState("ai");
  const [organization, setOrganization] = useState([]);
  const [alertMessage, setalertMessage] = useState("");
  const [refreshTable, setrefreshTable] = useState(false);

  //states for modal form tugaskan
  const [dataInstansi, setDataInstansi] = useState("");
  const [dataTanggalPenugasan, setDataTanggalPenugasan] = useState("");
  const [dataTanggalSLA, setDataTanggalSLA] = useState("");
  const [dataNomorSPK, setDataNomorSPK] = useState("");
  const [dataJenisSurvey, setdataJenisSurvey] = useState("");
  const [dataLokasiSurvey, setdataLokasiSurvey] = useState({});
  const [prefix, setPrefix] = useState("");

  // filter states
  const [filterShow, setfilterShow] = useState("d-none");
  const [provinsiList, setProvinsiList] = useState([]); // untuk isi select prov
  const [kabKotaList, setKabKotaList] = useState([]); // untuk isi select prov
  const [kecamatanList, setKecamatanList] = useState([]); // untuk isi select prov
  const [desaList, setDesaList] = useState([]); // untuk isi select prov
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKabKota, setSelectedKabKota] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedDesa, setSelectedDesa] = useState("");

  // styling states
  const [alertErrorTugaskan, setalertErrorTugaskan] = useState(style.alertOff);
  const [alertSuccessTugaskan, setalertSuccessTugaskan] = useState(
    style.alertOff
  );

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();

  // modal states
  const [modalTugaskanOpen, setmodalTugaskanOpen] = useState(false);

  // modal functions
  function tog_tugaskan() {
    setmodalTugaskanOpen(!modalTugaskanOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  // toggles
  const tog_filter = () => {
    if (filterShow === "d-none") {
      setfilterShow("d-flex");
    } else {
      setfilterShow("d-none");
    }
  };

  // fetch api
  const getInitData = () => {
    const params = {
      surveyor: "all",
      jenis: "ai/bts",
    };
    API.getSurveyor(params)
      .then((res) => {
        // console.log("ini res data getsurveyor :", res.data)
        const organizationData = res?.data?.values ?? "";
        if (res.status === 200) {
          setOrganization(organizationData);
          // console.log("organization", organizationData)
        }
      })
      .catch((err) => {
        console.log(err);
      });

    API.getLokasiProvinsi()
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : Get Lokasi Provinsi > ", res.data.data);
          setProvinsiList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("API FAIL : Get Lokasi Provinsi > ", err);
      });
  };

  const getLokasiKabKota = (id) => {
    API.getLokasiKabKota(id)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : getLokasiKabKota > ", res.data.data);
          setKabKotaList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("API FAIL : getLokasiKabKota > ", err);
      });
  };

  const getLokasiKecamatan = (id) => {
    API.getLokasiKecamatan(id)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : getLokasiKecamatan > ", res.data.data);
          setKecamatanList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("API FAIL : getLokasiKecamatan > ", err);
      });
  };

  const getLokasiDesa = (id) => {
    API.getLokasiDesa(id)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : getLokasiDesa > ", res.data.data);
          setDesaList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("API FAIL : getLokasiDesa > ", err);
      });
  };

  const getLokasiSurveyTable = () => {
    const params = {
      field: "status",
      value: "created",
      jenis: activeTab,
      row: usersPerPage,
      page: pageNumber,
    };
    setloading(true);
    API.getLokasiSurveyTable(params)
      .then((res) => {
        if (res.status === 200) {
          console.log(
            // "API SUCCESS : Fetch Lokasi Survey Table Data : ",
            res.data
          );
          settableData(res.data.values);

          if (res.data.values.length < usersPerPage) {
            setdisabledNext(true);
          } else {
            setdisabledNext(false);
          }
        } else {
          settableData(null);
        }
        setloading(false);
      })
      .catch((err) => {
        settableData(null);
        setloading(false);
        console.log(err);
      });
  };

  // useeffect
  useEffect(() => {
    dispatch(changeBreadcrumbItem("Plannet"));
  }, []);

  useEffect(() => {
    getInitData();
    getLokasiSurveyTable();

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [refreshTable, activeTab, pageNumber, usersPerPage, refresh]);

  // handle filter
  const handleFilterSearch = () => {
    let params = {
      provinsi: selectedProvinsi,
      kabupaten_kota: selectedKabKota,
      kecamatan: selectedKecamatan,
      desa: selectedDesa,
    };
    setloading(true);
    if (activeTab === "ai") {
      API.searchLokasiAI(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log("API SUCCESS : Search lokasi AI > ", res);
            settableData(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNext(true);
            } else {
              setdisabledNext(false);
            }
          } else {
            settableData([]);
          }
          setloading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setloading(false);
            settableData([]);
          }
          console.error("API FAIL : Search lokasi AI > ", err.response);
        });
    } else if (activeTab === "bts") {
      API.searchLokasiBTS(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log("API SUCCESS : Search Lokasi BTS > ", res);
            settableData(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNext(true);
            } else {
              setdisabledNext(false);
            }
          } else {
            settableData(null);
          }
          setloading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setloading(false);
            settableData([]);
          }
          console.error("API FAIL : Search Lokasi BTS > ", err);
        });
    }
  };

  // upload file function
  function handleChange(e) {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e.target.files[0].name.split(".").pop();
        if (fileExtension !== "pdf") {
          setErrorDocFormat("Format Dokumen harus .pdf");
          setDocUpload("");
        } else {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
        }
        break;
    }
  }

  const handleAssignTugas = (formData) => {
    API.postAssignPenugasan(formData)
      .then((res) => {
        // console.log("API success : ", res);
        setrefreshTable(!refreshTable);
      })
      .catch((err) => {
        // console.log("API success : ", err);
      });
  };

  const handleFormTugaskan = (e) => {
    const userid = window.localStorage.getItem("userid");

    let formData = new FormData();

    formData.append("user", userid);
    formData.append("jenissurvey", dataJenisSurvey);
    formData.append("surveyor", dataInstansi);
    formData.append("tanggal_penugasan", dataTanggalPenugasan);
    formData.append("lokasisurvey", dataLokasiSurvey);
    formData.append("sla", dataTanggalSLA);
    formData.append("nospk", dataNomorSPK);
    formData.append("doc", docUpload);
    formData.append("prefix", prefix);

    API.postAddPenugasan(formData)
      .then((res) => {
        if (res.status === 200) {
          setrefreshTable(!refreshTable);
          console.log("berhasil kirimkan tugas ", res);
          setalertSuccessTugaskan(style.alertOn);
          setTimeout(() => {
            setalertSuccessTugaskan(style.alertOff);
          }, 4000);

          // ================= copy dari asli:
          let formAssign = new FormData();
          // Asign Penugasan to User
          formAssign.append("user", userid);
          formAssign.append("kode", res.values.kode);
          formAssign.append("assignto", dataInstansi);
          formAssign.append("ke", "1");
          const objectData = {
            user: userid,
            kode: res.values.kode,
            assignto: dataInstansi,
            ke: "1",
          };
          const assign = handleAssignTugas(objectData);

          if (assign.success) {
            console.log("success assign");
          } else {
            console.log("failed assign");
          }
        }
      })
      .catch((err) => {
        console.log("gagal kirimkan tugas ", err?.response?.data?.message);
        setalertMessage(err?.response?.data?.message);
        if (err.status !== 200) {
          setalertErrorTugaskan(style.alertOn);
          setTimeout(() => {
            setalertErrorTugaskan(style.alertOff);
          }, 4000);
        }
      });
  };

  // Tabs functions (verifikasi, aktif, ditolak)
  const [customActiveTab, setcustomActiveTab] = useState("1");
  function toggleCustom(tab) {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }

  // Modal component
  const modalComponentTugaskan = () => {
    return (
      <Modal
        isOpen={modalTugaskanOpen}
        // isOpen={true}
        centered={true}
        toggle={() => {
          tog_tugaskan();
          // setdataLokasiSurvey(null);
        }}
      >
        <div className={`modal-body px-4 ${style.modalBody}`}>
          <div className='px-4'>
            <div className={` ${style.modalTitleWrapper}`}>
              <div
                className={`d-flex flex-column align-items-center ${style.modalTopTitle}`}
              >
                <h3>Detail Penugasan</h3>
              </div>
              <div
                className={`d-flex flex-column align-items-start ${style.modalContentWrapper}`}
              >
                <div>
                  <p>Jenis Survey</p>
                  {activeTab === "ai" && (
                    <p className={` text-center ${style.jenisPenugasan}`}>
                      Akses Internet
                    </p>
                  )}
                  {activeTab === "bts" && (
                    <p className={` text-center ${style.jenisPenugasan}`}>
                      BTS
                    </p>
                  )}
                </div>
                <form
                  className={`${style.formWrapper}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFormTugaskan(e);
                  }}
                >
                  <div className='form-group'>
                    <label htmlFor='staffSurveyorName'>
                      Nama Instansi Survey
                    </label>
                    <select
                      className='form-control'
                      id='staffSurveyorName'
                      onChange={(e) => setDataInstansi(e.target.value)}
                    >
                      <option>Pilih Instansi</option>
                      {organization && organization?.length ? (
                        organization?.map((org, index) => {
                          // console.log("isi org ", org);
                          return (
                            <option value={org._id} key={index}>
                              {org?.name ?? "Pilih Instansi"}
                            </option>
                          );
                        })
                      ) : (
                        <option>Pilih Instansi</option>
                      )}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='surveyorDate'>Tanggal Penugasan</label>
                    <input
                      type='date'
                      id='surveyorDate'
                      name='birthday'
                      className='form-control'
                      onChange={(e) =>
                        setDataTanggalPenugasan(e.target.value + " 00:00:00")
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='SLAPenyelesaianDate'>
                      SLA Penyelesaian Survey
                    </label>
                    <input
                      type='date'
                      id='SLAPenyelesaianDate'
                      name='birthday'
                      className='form-control'
                      onChange={(e) =>
                        setDataTanggalSLA(e.target.value + " 00:00:00")
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Input Nomor SPK</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Nomor SPK'
                      onChange={(e) => setDataNomorSPK(e.target.value)}
                      required
                    />
                  </div>

                  {/* ================ upload file ===============  */}
                  <Label for='basicpill-firstname-input14'>
                    Dokumen Pendukung
                  </Label>
                  <Label
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "11px",
                    }}
                  >
                    {errorDocFormat === "" ? "" : errorDocFormat}
                  </Label>
                  <input
                    type='file'
                    className='form-control'
                    name={"doc"}
                    onChange={(e) => handleChange(e)}
                    className='form-control'
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      height: "43px",
                    }}
                    accept='application/pdf'
                  />
                  {/* ================ buttons ===============  */}
                  <div
                    className={`d-flex align-items-center justify-content-center mt-4 ${style.modalButtonWrapper}`}
                  >
                    <button
                      type='button'
                      onClick={() => {
                        tog_tugaskan();
                        // setdataLokasiSurvey(null);
                      }}
                      className={`btn-block waves-effect ${style.noButton}`}
                      data-dismiss='modal'
                    >
                      Tutup
                    </button>
                    {dataInstansi &&
                    dataTanggalSLA &&
                    dataTanggalPenugasan &&
                    dataNomorSPK &&
                    docUpload ? (
                      <button
                        type='submit'
                        onClick={() => {
                          tog_tugaskan();
                          // setdataLokasiSurvey(null);
                        }}
                        className={`btn-block waves-effect ${style.yesButton}`}
                        data-dismiss='modal'
                      >
                        Tugaskan
                      </button>
                    ) : (
                      <button
                        type='button'
                        className={`btn-block waves-effect ${style.disabledButton}`}
                        data-dismiss='modal'
                        disabled
                      >
                        Tugaskan
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // Table components
  const table = () => {
    return (
      <div className='table-responsive'>
        {tableData.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Provinsi</th>
                <th>Kabupaten/Kota</th>
                <th>Kecamatan</th>
                <th>Desa</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data?.provinsi?.name ?? ""}</td>
                    <td>{data?.kabupaten?.name ?? ""}</td>
                    <td>{data?.kecamatan?.name ?? ""}</td>
                    <td>{data?.desa?.name ?? ""}</td>
                    <td>{data?.longitude ?? ""}</td>
                    <td>{data?.latitude ?? ""}</td>
                    <td className={`${style.aksiButtonsWrapper}`}>
                      <Link
                        to={{
                          // pathname: `/admin/gnettrack/${data?.data[0]?._id}`,
                          pathname: `/admin/plannet/1`,
                          // state: { datatable: data, activeTab: activeTab },
                        }}
                      >
                        <button
                          // disabled
                          type='button'
                          className={`${style.tugaskanButton}`}
                        >
                          Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              }) ?? "Belum Ada data"}
            </tbody>
          </table>
        ) : (
          <p>Tidak Ditemukan Data</p>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col className='col-12'>
          <div className={`${alertErrorTugaskan}`}>
            <Alert color='danger'>{alertMessage}</Alert>
          </div>
          <div className={`${alertSuccessTugaskan}`}>
            <Alert color='success'>Berhasil ditugaskan</Alert>
          </div>
          {modalComponentTugaskan()}

          <Card>
            <CardBody>
              {/* ==== filter button  */}
              <div
                className={`d-flex flex-row justify-content-end align-items-center w-100 mb-3`}
              >
                <button
                  onClick={() => {
                    tog_filter();
                  }}
                >
                  Filter
                </button>
                <div className={`d-flex ${style.selectDropdown}`}>
                  <select
                    style={{}}
                    className='ml-auto'
                    onChange={(e) => {
                      setusersPerPage(parseInt(e.target.value, 10));
                      setpageNumber(1);
                    }}
                  >
                    <option style={{ padding: "50px" }} value='20' defaultValue>
                      20
                    </option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                  </select>
                </div>
              </div>
              {/* ==== filter dropdown  */}
              <div
                className={`${filterShow} flex-row my-2 justify-content-end w-100 px-4  ${style.filterSearchWrapper}`}
              >
                {/* --- dropdown select value Provinsi */}
                <select
                  name='fieldvalue'
                  value={selectedProvinsi}
                  className={`${style.filterSearchSelect} w-75`}
                  onChange={(e) => {
                    setSelectedProvinsi(e.target.value);
                    getLokasiKabKota(e.target.value);
                  }}
                >
                  <option value=''>Pilih Provinsi</option>
                  {provinsiList?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {/* --- dropdown select value Kab/Kota */}
                <select
                  name='fieldvalue'
                  value={selectedKabKota}
                  className={`${style.filterSearchSelect} w-75`}
                  onChange={(e) => {
                    setSelectedKabKota(e.target.value);
                    getLokasiKecamatan(e.target.value);
                  }}
                >
                  <option value=''>Pilih Kab/Kota</option>
                  {kabKotaList?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {/* --- dropdown select value Kecamatan */}
                <select
                  name='fieldvalue'
                  value={selectedKecamatan}
                  className={`${style.filterSearchSelect} w-75`}
                  onChange={(e) => {
                    setSelectedKecamatan(e.target.value);
                    getLokasiDesa(e.target.value);
                  }}
                >
                  <option value=''>Pilih Kecamatan</option>
                  {kecamatanList?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {/* --- dropdown select value Desa */}
                <select
                  name='fieldvalue'
                  value={selectedDesa}
                  className={`${style.filterSearchSelect} w-75`}
                  onChange={(e) => {
                    setSelectedDesa(e.target.value);
                  }}
                >
                  <option value=''>Pilih Desa</option>
                  {desaList?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>

                <div
                  className={`${filterShow} w-25 ml-auto justify-content-end ${style.filterSearchButtons}`}
                >
                  <button
                    className={`${style.searchButton}`}
                    onClick={() => {
                      setpageNumber(1);
                      handleFilterSearch();
                    }}
                  >
                    Cari
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProvinsi("");
                      setSelectedKabKota("");
                      setSelectedKecamatan("");
                      setSelectedDesa("");
                      setrefresh(!refresh);
                      setpageNumber(1);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <Row>
                <Col sm='12'>
                  {loading ? (
                    <div
                      className='w-75 mx-auto'
                      style={{ fontSize: 20, lineHeight: 2.2 }}
                    >
                      <Skeleton height={20} count={5} />
                    </div>
                  ) : (
                    table()
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
          {/* ============ PAGINATION  */}
          {loading ? (
            <></>
          ) : (
            <div
              className={`d-flex flex-row mx-auto justify-content-between align-items-center ${style.paginationWrapper}`}
            >
              <button
                disabled={disabledPrev}
                className={`${style.paginationButton}`}
                onClick={() => {
                  if (pageNumber > 1) {
                    setpageNumber((prev) => prev - 1);
                  }
                }}
              >{`<`}</button>
              <p className={`mb-0`}>Halaman {pageNumber}</p>
              <button
                disabled={disabledNext}
                className={`${style.paginationButton}`}
                onClick={() => {
                  if (tableData?.length === usersPerPage) {
                    setpageNumber((prev) => prev + 1);
                  }
                }}
              >{`>`}</button>
            </div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TableBootstrap;
