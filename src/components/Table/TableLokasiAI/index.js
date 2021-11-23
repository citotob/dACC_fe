import React, { useState, useEffect, useContext, useMemo, Fragment } from "react";
import {
  Table,
  Row,
  Spinner,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
} from "reactstrap";
import get from 'lodash.get';
// styling
import LokasiAi from "./lokasiai.module.css";
// component
import PopupTugas from "../../Popup/PopupTugas";
import FilterBox from "../../Filter";
import RootContext from "../../../context";

const LoadingSpinner = (props) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <td colSpan="8">
            <Row className="justify-content-md-center">
              {props.loading ? <Spinner /> : <span>Belum ada data</span>}
            </Row>
          </td>
        </tr>
      </thead>
    </Table>
  );
};

// Columns Title
const columns = [
  {
    id: "provinsi",
    label: "Provinsi",
    verticalAlign: "middle",
    textAlign: "left",
    width: "8%",
    className: `${LokasiAi.content_report_table}`,
  },
  {
    id: "kabupatenkota",
    label: "Kabupaten/Kota",
    verticalAlign: "middle",
    textAlign: "center",
    width: "8%",
    className: `${LokasiAi.content_report_table}`,
  },
  {
    id: "kecamatan",
    label: "Kecamatan",
    verticalAlign: "middle",
    textAlign: "center",
    width: "8%",
    className: `${LokasiAi.content_report_table}`,
  },
  {
    id: "desa",
    label: "Desa",
    verticalAlign: "middle",
    textAlign: "center",
    width: "8%",
    className: `${LokasiAi.content_report_table}`,
  },
  {
    id: "longitude",
    label: "Longitude",
    verticalAlign: "middle",
    textAlign: "center",
    width: "5%",
    className: `${LokasiAi.content_report_table}`,
  },
  {
    id: "latitude",
    label: "Latitude",
    verticalAlign: "middle",
    textAlign: "center",
    width: "4%",
    className: `${LokasiAi.content_report_table} columnright`,
  },
  {
    id: "button_red",
    label: "",
    verticalAlign: "middle",
    textAlign: "end",
    width: "1%",
    className: `${LokasiAi.content_report_table} columnright`,
  },
];

const colLength = columns.length;

// Create Data for Row
function createData(provinsi, kabupatenkota, kecamatan, desa, longitude, latitude, button_red) {
  return {
    provinsi,
    kabupatenkota,
    kecamatan,
    desa,
    longitude,
    latitude,
    button_red,
  };
}

// Sorting Data
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {

      if (sortConfig.key === 'latitude' || sortConfig.key === 'longitude') {
        sortableItems.sort((a, b) => {
          if (parseFloat(a[sortConfig.key]) < parseFloat(b[sortConfig.key])) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (parseFloat(a[sortConfig.key]) > parseFloat(b[sortConfig.key])) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      } else {
        sortableItems.sort((a, b) => {
          if (get(a, sortConfig.key).toLowerCase() < get(b, sortConfig.key).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (get(a, sortConfig.key).toLowerCase() > get(b, sortConfig.key).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

function TableLokasiAI(props) {

  // context
  const contextLokasi = useContext(RootContext);

  const [rows, setRows] = useState([]);
  const [verificationNumber, setVerificationNumber] = useState(0);
  const [modalTugasAI, setModalTugasAI] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataTugas, setDataTugas] = useState([]);
  const [tableStatus, setTableStatus] = useState(true);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabKota, setListKabKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);
  const [listDesa, setListDesa] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [kabupatenkota, setKabupatenKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);

  // table states
  const [filter, setFilter] = useState([]);
  const [termProvinsi, setTermProvinsi] = useState(""); // Provinsi
  const [termKabKota, setTermKabKota] = useState(""); // KabKota
  const [termKecamatan, setTermKecamatan] = useState(""); // Kecamatan survey
  const [termDesa, setTermDesa] = useState(""); // Desa survey

  // state reset
  const [reset, setReset] = useState(false);

  // handling table states for search feature
  const handleTermProvinsi = async (term) => {
    if (term === "Default") {
      setTermProvinsi("");
    } else {
      const filterProv = await provinsi.filter((value) => value.name === term);
      fetchDataKabupaten(filterProv[0].id);
      setTermProvinsi(term);
      setTermKabKota("");
      setTermKecamatan("");
      setTermDesa("");
    }
  };

  // handling table states for search feature
  const handleTermKabKota = async (term) => {
    if (term === "Default") {
      setTermKabKota("");
    } else {
      const filterKabKota = await kabupatenkota.filter((value) => value.name === term);
      fetchDataKecamatan(filterKabKota[0].id);
      setTermKabKota(term);
      setTermKecamatan("");
      setTermDesa("");
    }
  };

  // handling table states for search feature
  const handleTermKecamatan = async (term) => {
    if (term === "Default") {
      setTermKecamatan("");
    } else {
      const filterKecamatan = await kecamatan.filter((value) => value.name === term);
      fetchDataDesa(filterKecamatan[0].id);
      setTermKecamatan(term);
      setTermDesa("");
    }
  };

  // handling table states for search feature
  const handleTermDesa = (term) => {
    if (term === "Default") {
      setTermDesa("");
    } else {
      setTermDesa(term);
    }
  };

  // handle Reset filter
  const handleReset = () => {
    setReset(true);
    setFilter([]);

    setTermProvinsi("");
    setTermKabKota("");
    setTermKecamatan("");
    setTermDesa("");

    setListKabKota([]);
    setListKecamatan([]);
    setListDesa([]);

    setCurrentPage(0);
  };

  // handling search submit
  const handleSubmit = (e) => {
    // e.preventDefault();
    setCurrentPage(0);

    let result = rows.filter(
      (e) =>
        e.provinsi.toLowerCase().includes(termProvinsi.toLowerCase()) &&
        e.kabupatenkota.toLowerCase().includes(termKabKota.toLowerCase()) &&
        e.kecamatan.toLowerCase().includes(termKecamatan.toLowerCase()) &&
        e.desa.toLowerCase().includes(termDesa.toLowerCase())
    );

    if (result.length > 0) {
      setFilter(result);
    } else {
      setFilter(null);
    }
  };

  // paginate configuration
  const pageItems = 20;
  const pagesCount = Math.ceil(
    filter !== null
      ? filter.length
        ? filter.length / pageItems
        : rows.length / pageItems
      : rows.length / pageItems
  );

  const [currentPage, setCurrentPage] = useState(0);

  // handle pagination
  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  // toggle modal tugas
  let toggleTugasAI = (i) => {
    setDataTugas(i);
    setModalTugasAI(!modalTugasAI);
  };

  async function fetchdata(isSubscribed) {
    return fetch(`${process.env.REACT_APP_BE_URL}/survey/getlokasisurvey/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // field: "jenis",
        // value: "ai",
        field: "status",
        value: "created",
        jenis: "ai",
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setLoading(false);
        if (result.success && isSubscribed) {
          setTableStatus(true);
          setVerificationNumber(result.values.count);
          const rowsData = [];
          for (let [v, i] of result.values.entries()) {
            const buttonAction = (
              <div style={{ display: "inline" }}>
                <Button
                  className={LokasiAi.buttonTugas}
                  color="" onClick={() => toggleTugasAI(i)}
                >
                  Tugaskan
                </Button>
              </div>
            );
            rowsData.push(
              createData(
                i.provinsi.name ?? "-",
                i.kabupaten ? i.kabupaten.name ?? "-" : i.kota.name ?? "-",
                i.kecamatan ? i.kecamatan.name : "-",
                i.desa ? i.desa.name : "-",
                i.longitude ?? "-",
                i.latitude ?? "-",
                buttonAction
              )
            );
          }
          setRows(rowsData);
        } else {
          setTableStatus(false);
        }
      })
      .catch((e) => console.log("error", e));
  }

  async function fetchDataProv() {
    return fetch(`${process.env.REACT_APP_BE_URL}/location/provinsi/`)
      .then((result) => result.json())
      .then(async (result) => {
        const provinsi = await result.data.map((value) => value.name);
        setListProvinsi(provinsi);
        setProvinsi(result.data);
        setListKabKota([]);
        setListKecamatan([]);
        setListDesa([]);
      })
      .catch((e) => console.log("error", e));
  }

  async function fetchDataKabupaten(provinsi) {
    return fetch(`${process.env.REACT_APP_BE_URL}/location/kabupatenkota/?provinsi=${provinsi}`)
      .then((result) => result.json())
      .then(async (result) => {
        const kabkota = await result.data.map((value) => value.name);
        setKabupatenKota(result.data);
        setListKabKota(kabkota);
        setListKecamatan([]);
        setListDesa([]);
      })
      .catch((e) => console.log("error", e));
  }

  async function fetchDataKecamatan(kabupaten_kota) {
    return fetch(
      `${process.env.REACT_APP_BE_URL}/location/kecamatan/?kabupaten_kota=${kabupaten_kota}`
    )
      .then((result) => result.json())
      .then(async (result) => {
        const kecamatan = await result.data.map((value) => value.name);
        setKecamatan(result.data);
        setListKecamatan(kecamatan);
        setListDesa([]);
      })
      .catch((e) => console.log("error", e));
  }

  async function fetchDataDesa(kecamatan) {
    return fetch(`${process.env.REACT_APP_BE_URL}/location/desa/?kecamatan=${kecamatan}`)
      .then((result) => result.json())
      .then(async (result) => {
        const desa = await result.data.map((value) => value.name);
        setListDesa(desa);
      })
      .catch((e) => console.log("error", e));
  }

  // handle alert
  const handleAlert = (bool) => {
    // Close modal
    setModalTugasAI(!modalTugasAI);

    // Get New data
    fetchdata(true);
    fetchDataProv();

    // Send Alert to parent
    props.handleAlert(bool, 'Penugasan AI')

  };

  useEffect(() => {
    let isSubscribed = true;
    fetchdata(isSubscribed);
    fetchDataProv();
    return () => (isSubscribed = false);
  }, [contextLokasi.reload]);

  useEffect(() => {
    let isSubscribed = true;
    fetchdata(isSubscribed);
    fetchDataProv();
    return () => (isSubscribed = false);
  }, [props.reload]);

  // Sorting Procedure
  const { items, requestSort, sortConfig } = useSortableData(filter != null ? (filter.length > 0 ? filter : rows) : (rows));

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>

      <div className={LokasiAi.wrapper_table}>
        <Row
          className={`${LokasiAi.wrapper_filter} d-flex flex-column align-items-stretch border-top border-bottom w-100`}
        >
          <Card className={"d-none d-md-block h-75 border-0 bg-light"}>
            <CardBody>
              <h6>Filter</h6>
              <FilterBox
                handleFilter={handleTermProvinsi}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listProvinsi}
                defaultPick={"Pilih Provinsi"}
                label={"Provinsi"}
                value={termProvinsi}
              />
              <FilterBox
                handleFilter={handleTermKabKota}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listKabKota}
                defaultPick={"Pilih Kab/Kota"}
                label={"Kab/Kota"}
                value={termKabKota}
              />
              <FilterBox
                handleFilter={handleTermKecamatan}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listKecamatan}
                defaultPick={"Pilih Kecamatan"}
                label={"Kecamatan"}
                value={termKecamatan}
              />
              <FilterBox
                handleFilter={handleTermDesa}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listDesa}
                defaultPick={"Pilih Desa"}
                label={"Desa"}
                value={termDesa}
              />
              <Row className={"justify-content-center mt-4"}>
                <Button
                  size="sm"
                  color=""
                  className={LokasiAi.btn_search}
                  onClick={(e) => handleSubmit(e)}>
                  Search
                </Button>
                <Button size="sm" color="" className={LokasiAi.btn_reset} onClick={handleReset}>
                  Reset
                </Button>
              </Row>
            </CardBody>
          </Card>

          <Card className={"d-block d-md-none h-auto w-100 border-0 bg-light"}>
            <CardBody className={LokasiAi.less_padding}>
              <h6>Filter</h6>
              <FilterBox
                handleFilter={handleTermProvinsi}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listProvinsi}
                defaultPick={"Pilih Provinsi"}
                label={"Provinsi"}
                value={termProvinsi}
              />
              <FilterBox
                handleFilter={handleTermKabKota}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listKabKota}
                defaultPick={"Pilih Kab/Kota"}
                label={"Kab/Kota"}
                value={termKabKota}
              />
              <FilterBox
                handleFilter={handleTermKecamatan}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listKecamatan}
                defaultPick={"Pilih Kecamatan"}
                label={"Kecamatan"}
                value={termKecamatan}
              />
              <FilterBox
                handleFilter={handleTermDesa}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listDesa}
                defaultPick={"Pilih Desa"}
                label={"Desa"}
                value={termDesa}
              />
              <Row className={"justify-content-center mt-4"}>
                <Button
                  size="sm"
                  color=""
                  className={LokasiAi.btn_search}
                  onClick={(e) => handleSubmit(e)}>
                  Search
                </Button>
                <Button size="sm" color="" className={LokasiAi.btn_reset} onClick={handleReset}>
                  Reset
                </Button>
              </Row>
            </CardBody>
          </Card>

        </Row>

        {rows.length === 0 ? (
          <LoadingSpinner loading={loading} />
        ) : (
            <Table borderless responsive hover style={{ fontSize: "0.9rem" }}>
              <thead>
                <tr className={`${LokasiAi.content_report_table} head`}>
                  <th
                    style={{
                      textAlign: 'left',
                      verticalAlign: 'middle',
                    }}
                  >
                    No.
                  </th>

                  {columns.map((column, index_col) => (
                    <th
                      className={column.className}
                      style={{
                        textAlign: column.textAlign,
                        verticalAlign: column.verticalAlign,
                        width: column.width,
                      }}
                      key={index_col}
                    >
                      {/* Handling sortable header not for docs and button */}
                      {index_col < colLength - 1 ? (
                        <button
                          type="button"
                          onClick={() => requestSort(column.id)}
                          className={getClassNamesFor(column.id) != null ?
                            getClassNamesFor(column.id) === 'ascending'
                              ? LokasiAi.ascending
                              : LokasiAi.descending
                            : ''}
                        >
                          {column.label}
                        </button>
                      ) : (
                          column.label
                        )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length > 0 && filter != null ? (
                  items.slice(currentPage * pageItems, currentPage * pageItems + pageItems)
                    .map((row, index_row) => {
                      return (
                        <tr key={index_row} className={`${LokasiAi.border_laporan}`} >
                          <td
                            style={{
                              textAlign: 'left',
                              verticalAlign: 'middle',
                              paddingTop: "6px",
                              paddingBottom: "6px",
                            }}
                          >
                            {20 * currentPage + index_row + 1}
                          </td>
                          {columns.map((column, index_col) => {
                            const value = row[column.id];
                            let colorCostum;
                            if (value === "Akses Internet") {
                              colorCostum = "blue";
                            } else if (value === "BTS") {
                              colorCostum = "red";
                            } else {
                              colorCostum = "black";
                            }
                            return (
                              <td
                                style={{
                                  textAlign: column.textAlign,
                                  verticalAlign: column.verticalAlign,
                                  color: colorCostum,
                                  paddingTop: "6px",
                                  paddingBottom: "6px",
                                }}
                                key={index_col}
                              >
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                ) : (
                    // if filter null
                    <>
                      <tr>
                        <td colSpan="8">
                          <Row className="justify-content-center">
                            <span>Tidak ada Data</span>
                          </Row>
                        </td>
                      </tr>
                    </>
                  )}
              </tbody>
            </Table>
          )}

        {/* pagination */}
        <Fragment>
          {items.length > 0 && filter != null ? (
            <div className={LokasiAi.paginationS}>
              <Pagination>
                <PaginationItem disabled={currentPage === 0}>
                  <PaginationLink first onClick={(e) => setCurrentPage(0)} />
                </PaginationItem>

                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, currentPage - 1)}
                    previous
                    href="#"
                  />
                </PaginationItem>
                <PaginationItem disabled>
                  <PaginationLink>
                    {`Page ${currentPage + 1} of ${pagesCount === 0 ? "1" : pagesCount}`}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                  <PaginationLink onClick={(e) => handlePageClick(e, currentPage + 1)} next href="#" />
                </PaginationItem>
                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                  <PaginationLink last onClick={(e) => setCurrentPage(pagesCount - 1)} />
                </PaginationItem>
              </Pagination>
            </div>
          ) : (
              <></>
            )}
        </Fragment>
      </div>

      <PopupTugas
        handleAlert={handleAlert}
        modalTugasAI={modalTugasAI}
        toggleTugasAI={() => toggleTugasAI("")}
        data={dataTugas}
        jenisSurvey={props.tabActive}
      />
    </>
  );
}

export default TableLokasiAI;
