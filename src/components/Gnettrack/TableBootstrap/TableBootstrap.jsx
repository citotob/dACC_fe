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
  const [refresh, setrefresh] = useState(false);
  const [loading, setloading] = useState(false);
  const [tableData, settableData] = useState([]);
  const [activeTab, setactiveTab] = useState("ai");
  const [alertMessage, setalertMessage] = useState("");

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

  // get table data
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
    dispatch(changeBreadcrumbItem("G-NetTrack"));
  }, []);
  useEffect(() => {
    getInitData();
    getLokasiSurveyTable();

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [activeTab, pageNumber, usersPerPage, refresh]);

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
                <th>Status</th>
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
                    <td>Pending Status</td>
                    <td
                      className={`d-flex flex-column justify-content-center gap8 ${style.aksiButtonsWrapper}`}
                    >
                      <Link
                        to={{
                          pathname: `/admin/gnettrack/form/${data?._id}`,
                          // pathname: `/admin/gnettrack/form/1`,
                          state: { datatable: data, activeTab: activeTab },
                        }}
                      >
                        <button
                          type='button'
                          onClick={() => {}}
                          data-toggle='modal'
                          data-target='#myModal'
                          className={`${style.tugaskanButton}`}
                        >
                          Input Data
                        </button>
                      </Link>

                      <Link
                        to={{
                          pathname: `/admin/gnettrack/${data?._id}`,
                          // pathname: `/admin/gnettrack/1`,
                          state: { datatable: data, activeTab: activeTab },
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
                      console.log(e.target.value);
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

                      // window.location.reload(0);
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
