import React, { useState, useEffect, useContext, useMemo, Fragment } from "react";
import {
  Table,
  Row,
  Spinner,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Card,
  CardBody,
  Label,
} from "reactstrap";
import styles from "./styles.module.css";
import SearchBox from "../../../../components/Search";
import FilterBox from "../../../../components/Filter";
import RootContext from "../../../../context";
import ModalDetailPenugasanSurveyor from "../../../Popup/ModalDetailPenugasanSurveyor";
import ModalTugaskanPenugasanSurveyor from "../../../../components/Popup/ModalTugaskanPenugasanSurveyor";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import _ from "underscore";
import get from "lodash.get";
var moment = require("moment");

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
    id: "kode",
    label: "Kode Survey",
    verticalAlign: "middle",
    textAlign: "left",
    width: "3% ",
    className: `${styles.content_report_table}`,
  },
  {
    id: "lokasisurvey.desa.name",
    label: "Lokasi Survey",
    verticalAlign: "middle",
    width: "3%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "target",
    label: "SLA Tanggal Penyelesaian",
    verticalAlign: "middle",
    width: "3%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "status",
    label: "Status Penugasan",
    verticalAlign: "middle",
    textAlign: "center",
    width: "3%",
    className: `${styles.content_report_table}`,
  },
  {
    id: "button_red",
    label: "",
    verticalAlign: "middle",
    textAlign: "end",
    width: "1%",
    className: `${styles.content_report_table} columnright`,
  },
];

const colLength = columns.length;

// Sorting Data
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      if (sortConfig.key === 'target') { // Sort Date
        sortableItems.sort((a, b) => {
          if (moment(get(a, sortConfig.key)).format("YYYYMMDD") < moment(get(b, sortConfig.key)).format("YYYYMMDD")) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (moment(get(a, sortConfig.key)).format("YYYYMMDD") > moment(get(b, sortConfig.key)).format("YYYYMMDD")) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      } else if (sortConfig.key === 'status') { // Sort Status Latest
        sortableItems.sort((a, b) => {
          if (get(a, sortConfig.key).slice(-1).pop().status.toLowerCase() < get(b, sortConfig.key).slice(-1).pop().status.toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (get(a, sortConfig.key).slice(-1).pop().status.toLowerCase() > get(b, sortConfig.key).slice(-1).pop().status.toLowerCase()) {
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

const sortByStatus = (val) => {
  return val.status.slice(-1).pop().status.toLowerCase();
};

const TableRow = (props) => {
  useEffect(() => {
    const handleProps = () => {
      if (props.data) {
        // alert(props.data);
      } else {
        // alert(props.data);
      }
    };

    handleProps();
    return () => {
      handleProps();
    };
  }, [props.data, props.filter]);

  // Sorting Procedure
  const { items, requestSort, sortConfig } = useSortableData(props.filter != null ? (props.filter.length > 0 ? props.filter : props.data) : (props.data));

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // Handle automatic CSV / Excel update and populate items to Parent
  useEffect(() => {
    props.handleClickSort(items);
  }, [items]);

  return (
    <>
      <thead>
        <tr>
          <th
            key={"no."}
            style={{
              textAlign: 'left',
              verticalAlign: 'middle',
              width: "1.5% ",
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
                      ? styles.ascending
                      : styles.descending
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
        {items.length > 0 && props.filter != null ? (
          _.chain(items)
            // .sortBy(sortByStatus)
            .slice(props.startPage, props.endPage)
            .map((row, index) => {
              return (
                <>
                  <tr key={index} className={`${styles.border_laporan}`} style={{ fontSize: "15px" }} >
                    <td key={index + "#"}>{20 * props.currentPage + index + 1}</td>
                    <td key={index + "A"}>{row.kode}</td>
                    <td key={index + "B"}>{row.lokasisurvey.desa.name}</td>
                    <td key={index + "C"}>
                      {moment(row.target).format("DD/MM/YYYY")}
                    </td>
                    <td key={index + "D"}>{row.status.slice(-1).pop().status}</td>
                    <td key={index + "E"}>
                      {
                        row.status.slice(-1).pop().status.toLowerCase() !== "created" && // Ini tidak mungkin terjadi harusnya
                          row.status.slice(-1).pop().status.toLowerCase() !== "on progress" &&
                          row.status.slice(-1).pop().status.toLowerCase() !== "reviewed" &&
                          row.status.slice(-1).pop().status.toLowerCase() !== "finished"
                          ? (
                            <Button
                              color=""
                              className={styles.btn_detail}
                              onClick={() => props.toggleTugas(row)}
                            >
                              Tugaskan
                            </Button>
                          ) : (
                            <Button
                              color=""
                              className={styles.btn_detail}
                              onClick={() => props.toggleDetail(row)}
                            >
                              Detail
                            </Button>
                          )}
                    </td>
                  </tr>
                </>
              );
            })
            .value()
        ) : (
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
    </>
  );
};

function TableSurveyor(props) {
  // state reload
  const [reload, setReload] = useState(true);

  // state modal tugas
  const [modalTugas, setModalTugas] = useState(false);
  const [dataTugas, setDataTugas] = useState([]);

  // state modal detail
  const [modalDetail, setModalDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);

  // datarender
  const [dataResult, setDataResult] = useState([]);

  // context
  const contextSurveyor = useContext(RootContext);

  // table states
  const [filter, setFilter] = useState([]);
  const [items, setItems] = useState([]);

  // state for search term
  const [termStatus, setTermStatus] = useState(""); // lokasi survey
  const [termKode, setTermKode] = useState(""); // kode survey
  const [termLokasiSurvey, setTermLokasiSurvey] = useState(""); // lokasi survey
  const [startDate, setStartDate] = useState(null); // Tanggal SLA Penyelesaian
  const [endDate, setEndDate] = useState(null); // Tanggal SLA Penyelesaian

  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(true);

  const org = window.localStorage.getItem("org");

  // handle filter term
  const handleTermStatus = (term) => {
    if (term === "Default") {
      setTermStatus("");
    } else {
      setTermStatus(term);
    }
  };

  // handle search term
  const handleTermKode = (term) => {
    setTermKode(term);
  };

  const handleTermLokasiSurvey = (term) => {
    setTermLokasiSurvey(term);
  };

  //handleChangeDate
  const handleChangeDate = (e, picker) => {
    setStartDate(moment(picker.startDate));
    setEndDate(moment(picker.endDate));
  };

  // handle Reset filter
  const handleReset = () => {
    setReset(true);
    setFilter([]);

    setTermStatus("");

    setTermKode("");
    setTermLokasiSurvey("");
    setStartDate(null);
    setEndDate(null);

    setCurrentPage(0);
  };

  // handling search submit
  const handleSubmit = (e) => {
    // e.preventDefault();
    setCurrentPage(0);

    let result;
    if (startDate != null || endDate != null) {
      result = dataResult.filter(
        (e) =>
          e.status.slice(-1).pop().status.includes(termStatus.toLowerCase().trim()) &&

          e.kode.toLowerCase().includes(termKode.toLowerCase().trim()) &&
          e.lokasisurvey.desa.name.toLowerCase().includes(termLokasiSurvey.toLowerCase().trim()) &&
          moment(e.target).isSameOrAfter(startDate) &&
          moment(e.target).isSameOrBefore(endDate)
      );
    } else {
      result = dataResult.filter(
        (e) =>
          e.status.slice(-1).pop().status.includes(termStatus.toLowerCase().trim()) &&

          e.kode.toLowerCase().includes(termKode.toLowerCase().trim()) &&
          e.lokasisurvey.desa.name.toLowerCase().includes(termLokasiSurvey.toLowerCase().trim())
      );
    }

    if (result.length > 0) {
      setFilter(result);
    } else {
      setFilter(null);
    }
  };

  // unique lists for Filter
  const listStatus = [
    ...new Set(dataResult.map((item) => item.status.slice(-1).pop().status.toLowerCase())),
  ]; // status

  // Pagination Condition
  const pageItems = 20;
  const pagesCount = Math.ceil(
    filter !== null
      ? filter.length
        ? filter.length / pageItems
        : dataResult.length / pageItems
      : dataResult.length / pageItems
  );

  const [currentPage, setCurrentPage] = useState(0);

  // handle pagination
  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const fetchDataPenugasan = (isSubscribed) => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getpenugasansurveyor/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "surveyor",
        value: "all",
        jenis: contextSurveyor.jenissurvey,
        surveyor: org,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setLoading(false);
        if (isSubscribed && result.success) {
          setReload(false);
          setDataResult(result.values);
        }
      })
      .catch((e) => console.log("error", e))
      .finally((e) => {
        setReload(false);
        setLoading(false);
      });
  };

  // toggle modal tugas
  let toggleTugas = (i) => {
    setDataTugas(i);
    setModalTugas(!modalTugas);
  };

  // toggle modal tugas
  let toggleDetail = (i) => {
    setDataDetail(i);
    setModalDetail(!modalDetail);
  };

  // Handling CSV/Excel sort & populate items
  const handleClickSort = (dataSort) => {
    // setDataCSV(reformatCSV(dataSort));
    setItems(dataSort);
  };

  const handleAlert = (bool, string) => {
    setReload(!reload);

    // Send Alert to parent
    props.handleAlert(bool, string)
  };

  // fetch data penugasan
  useEffect(() => {
    let isSubscribed = true;
    fetchDataPenugasan(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    fetchDataPenugasan(isSubscribed);
    return () => (isSubscribed = false);
  }, [reload]);

  return (
    <>
      <div className={`${styles.wrapperTable} pt-2 border-top`}>
        <div className={"d-none d-md-block"}>
          <Row className={styles.wrapper_filter}>
            <Col className={"p-3"} lg={6}>
              <Card className={"bg-light border-0"}>
                <CardBody>
                  <h6>Filter</h6>
                  <FilterBox
                    handleFilter={handleTermStatus}
                    handleReset={handleReset}
                    reset={reset}
                    dataFilter={listStatus}
                    defaultPick={"Pilih Status"}
                    label={"Status"}
                    value={termStatus}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className={"p-3"} lg={6}>
              <Card className={"bg-light border-0"}>
                <CardBody>
                  <h6>Search</h6>
                  <SearchBox
                    handleTerm={handleTermKode}
                    className={styles.search}
                    value={termKode}
                    keywords={"Kode Survey"}
                    handleKeyPress={handleKeyPress}
                  />

                  <SearchBox
                    handleTerm={handleTermLokasiSurvey}
                    className={styles.search}
                    value={termLokasiSurvey}
                    keywords={"Lokasi Survey"}
                    handleKeyPress={handleKeyPress}
                  />

                  <div className={"d-flex w-75 justify-content-between"}>
                    <Label className={styles.label_filter} for="awal">
                      Range Tanggal <br /> SLA
                    </Label>
                    <DateRangePicker
                      initialSettings={{
                        locale: {
                          format: "DD/MM/YYYY",
                        },
                      }}
                      handleKeyPress={handleKeyPress}
                      onApply={handleChangeDate}
                      startDate="1/1/2014"
                      endDate="3/1/2014">
                      <input
                        bssize="sm"
                        name="dateRange"
                        className={`${styles.input} form-control-sm`}
                      />
                      {/* onChange={(e) => setDate(`${e.target.value} 00:00:00`)} */}
                    </DateRangePicker>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <div className={"d-block d-md-none"}>
          <Card className={"bg-light border-0 w-100"}>
            <CardBody style={{ padding: "0.5rem" }}>
              <h6>Filter</h6>
              <FilterBox
                handleFilter={handleTermStatus}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listStatus}
                defaultPick={"Pilih Status"}
                label={"Status"}
                value={termStatus}
              />
            </CardBody>
          </Card>
          <Card className={"bg-light border-0 w-100 mt-2"}>
            <CardBody style={{ padding: "0.5rem" }}>
              <h6>Search</h6>
              <SearchBox
                handleTerm={handleTermKode}
                className={styles.search}
                value={termKode}
                keywords={"Kode Survey"}
                handleKeyPress={handleKeyPress}
              />

              <SearchBox
                handleTerm={handleTermLokasiSurvey}
                className={styles.search}
                value={termLokasiSurvey}
                keywords={"Lokasi Survey"}
                handleKeyPress={handleKeyPress}
              />

              <div className={"d-flex w-100 justify-content-between"}>
                <Label className={styles.label_filter} for="awal">
                  Range Tanggal SLA
                </Label>
                <DateRangePicker
                  initialSettings={{
                    locale: {
                      format: "DD/MM/YYYY",
                    },
                  }}
                  handleKeyPress={handleKeyPress}
                  onApply={handleChangeDate}
                  startDate="1/1/2014"
                  endDate="3/1/2014">
                  <input
                    name="dateRange"
                    bssize="sm"
                    className={`${styles.input} form-control-sm`}
                    style={{ width: "100%" }}
                  />
                  {/* onChange={(e) => setDate(`${e.target.value} 00:00:00`)} */}
                </DateRangePicker>
              </div>
            </CardBody>
          </Card>
        </div>

        <Row className={`justify-content-center mb-3 mt-2`}>
          <Button size="sm" color="" onKeyPress={handleKeyPress} className={styles.btn_search} onClick={(e) => handleSubmit(e)}>
            Search
          </Button>
          <Button size="sm" color="" className={styles.btn_reset} onClick={handleReset}>
            Reset
          </Button>
        </Row>

        {dataResult.length === 0 ? (
          <LoadingSpinner loading={loading} />
        ) : (
            <Table borderless responsive hover style={{ fontSize: "0.9rem" }}>
              <TableRow
                filter={filter}
                toggleTugas={toggleTugas}
                toggleDetail={toggleDetail}
                data={dataResult}
                startPage={currentPage * pageItems}
                endPage={currentPage * pageItems + pageItems}
                currentPage={currentPage}
                handleClickSort={handleClickSort}
              // tipesurvey={props.jenisSurvey}
              />
            </Table>
          )}

        {/* Pagination */}
        <Fragment>
          {items.length > 0 && filter != null ? (
            <div className={styles.pagination}>
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

      <ModalTugaskanPenugasanSurveyor
        isOpen={modalTugas}
        toggle={toggleTugas}
        data={dataTugas}
        jenisSurvey={props.jenisSurvey}
        handleAlert={handleAlert}
      />

      <ModalDetailPenugasanSurveyor
        isOpen={modalDetail}
        toggle={toggleDetail}
        data={dataDetail}
        jenisSurvey={props.jenisSurvey}
      />
    </>
  );
}

export default TableSurveyor;
