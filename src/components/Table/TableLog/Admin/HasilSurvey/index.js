import React, { useState, useEffect, useMemo, Fragment } from "react";
// third party
import {
  Table,
  Row,
  Spinner,
  Button,
  Alert,
  Collapse,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import get from 'lodash.get';
import moment from "moment";

// component
import SearchBox from "../../../../../components/Search";
import FilterBox from "../../../../../components/Filter";

// asset
import ArrowUp from "../../../../../assets/icons/Polygon1.svg";
import ArrowDown from "../../../../../assets/icons/Polygon2.svg";

// styling
import styles from "./styles.module.css";

// datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

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
    width: "1.5% ",
    className: `${styles.content_report_table}`,
  },
  {
    id: "lokasi.desa.name",
    label: "Lokasi Survey",
    verticalAlign: "middle",
    width: "2%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "status[0].tanggal_pembuatan",
    label: "Tanggal",
    verticalAlign: "middle",
    width: "2%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "status",
    label: "Status Hasil Survey",
    verticalAlign: "middle",
    textAlign: "center",
    width: "3%",
    className: `${styles.content_report_table}`,
  }
];

const colLength = columns.length;

// Sorting Data
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      if (sortConfig.key === 'lokasi.desa.name') { // Sort Lokasi Desa Penugasan, possible undefined
        // Assign 'ZZZ' as  default value to sort them to be last items
        sortableItems.sort((a, b) => {
          if (get(a, sortConfig.key, 'ZZZ').toLowerCase() < get(b, sortConfig.key, 'ZZZ').toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (get(a, sortConfig.key, 'ZZZ').toLowerCase() > get(b, sortConfig.key, 'ZZZ').toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      } else if (sortConfig.key === 'status[0].tanggal_pembuatan') { // Sort Date
        sortableItems.sort((a, b) => {
          if (moment(get(a, sortConfig.key)).format("YYYYMMDD") < moment(get(b, sortConfig.key)).format("YYYYMMDD")) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (moment(get(a, sortConfig.key)).format("YYYYMMDD") > moment(get(b, sortConfig.key)).format("YYYYMMDD")) {
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

const CollapseItem = (props) => {
  // toggle Collapse
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // arrow conditional
  let arrow = "";
  if (isOpen) {
    arrow = <img src={ArrowUp} alt=""></img>;
  } else {
    arrow = <img src={ArrowDown} alt=""></img>;
  }

  useEffect(() => {
    setIsOpen(false);
  }, [props.collapseClose]);

  return (
    <>
      <tr key={props.index} className={`${styles.border_laporan}`} style={{ fontSize: "15px" }}>
        <td>{20 * props.currentPage + props.index + 1}</td>
        <td>{props.row.kode}</td>
        <td>
          {get(props.row, "lokasi.desa.name", "-")}
        </td>
        <td>
          {get(props.row, 'status[0].tanggal_pembuatan')
            ? moment(get(props.row, 'status[0].tanggal_pembuatan')).format("DD/MM/YYYY")
            : '-'}
        </td>
        <td>{props.row.status[0].status}</td>
        <td>
          <Button className={styles.btn_icon} color="" onClick={toggle}>
            <i>{arrow}</i>
          </Button>
        </td>
      </tr>
      <tr>
        <td colSpan="6" className={styles.collapse_column}>
          <Collapse isOpen={isOpen}>
            <table className={styles.sub_table}>
              <tbody className={styles.wrapper_log}>
                {props.row.status.map((val, index) => {
                  if (index > 0) {
                    return (
                      <tr key={index} className={styles.tbody_log}>
                        <td style={{ width: "25%" }}></td>
                        <td style={{ width: "25%" }}></td>
                        <td style={{ width: "15%" }}>
                          {moment(val.tanggal_pembuatan).format("DD/MM/YYYY")}
                        </td>
                        <td style={{ width: "20.4%" }}>{val.status}</td>
                        <td></td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

// table content
const TableRow = (props) => {
  // Don't know what the use of this
  const [filtered, setFiltered] = useState(props.filter);

  // Don't know what the use of this
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
  }, [props.data]);

  // Don't know what the use of this
  useEffect(() => {
    if (props.filter !== null) {
      setFiltered(props.filter);
    }
  }, [props.filter]);

  // Reset collapse
  const [reset, setReset] = useState(false);
  useEffect(() => {
    setReset(!reset);
  }, [props.collapseClose]);

  // Sorting Procedure
  const { items, requestSort, sortConfig } = useSortableData(props.filter != null ? (props.filter.length > 0 ? props.filter : props.data) : (props.data));

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortAndReset = (id) => {
    setReset(!reset);
    requestSort(id);
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
              }}
              key={index_col}
            >
              {/* Handling sortable header not for docs and button */}
              {index_col < colLength - 1 ? (
                <button
                  type="button"
                  onClick={() => sortAndReset(column.id)}
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
          items
            .slice(props.startPage, props.endPage)
            .map((row, index) => {
              return <CollapseItem
                key={index}
                row={row}
                collapseClose={reset}
                currentPage={props.currentPage}
                index={index}
              />;
            })
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

function TableLogHasilSurveyAdmin(props) {
  const [dataStatus, setDataStatus] = useState([]);
  const [dataTanggal, setDataTanggal] = useState([]);

  // data search and render
  const [dataResult, setDataResult] = useState([]);
  const [dataLog, setDataLog] = useState([]);
  const [reload, setReload] = useState(true);

  // table states
  const [filter, setFilter] = useState([]);
  const [items, setItems] = useState([]);

  // state for search term
  const [termStatus, setTermStatus] = useState(""); // status
  const [termKode, setTermKode] = useState(""); // kode survey
  const [termLokasi, setTermLokasi] = useState(""); // lokasi survey

  const [startDate, setStartDate] = useState(null); // Tanggal SLA Penyelesaian
  const [endDate, setEndDate] = useState(null); // Tanggal SLA Penyelesaian

  const [collapseClose, setCollapseClose] = useState(false); // collapse close

  // state reset filter
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(true);

  // handling table states for filter feature
  const handleTermStatus = (term) => {
    if (term === "Default") {
      setTermStatus("");
    } else {
      setTermStatus(term);
    }
  };

  // handling table states for search feature
  const handleTermKode = (term) => {
    setTermKode(term);
  };

  const handleTermLokasi = (term) => {
    setTermLokasi(term);
  };

  // handleChangeDate
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
    setTermLokasi("");
    setStartDate(null);
    setEndDate(null);

    setCurrentPage(0);
    setCollapseClose(!collapseClose);
  };

  // handling search submit
  const handleSubmit = (e) => {
    setCurrentPage(0);
    setCollapseClose(!collapseClose);

    let result;

    // Handling lokasi because Penugasan still not used
    if (termLokasi.trim() === "") {
      result = dataResult.filter(
        (e) =>
          // filter
          e.status.filter((e) => e.status.toLowerCase().includes(termStatus.toLowerCase().trim())).length > 0 &&

          // search
          e.kode.toLowerCase().includes(termKode.toLowerCase().trim())
      );
    } else if (termLokasi.trim() === "-") { // Untuk search lokasi tanpa penugasan
      result = dataResult.filter(
        (e) =>
          // filter
          e.status.filter((e) => e.status.toLowerCase().includes(termStatus.toLowerCase().trim())).length > 0 &&

          // search
          e.kode.toLowerCase().includes(termKode.toLowerCase().trim()) &&

          (e.lokasi.desa !== undefined ? e.lokasi.desa.name.toLowerCase().includes(termLokasi.toLowerCase().trim()) : true)
      );
    } else {
      result = dataResult.filter(
        (e) =>
          // filter
          e.status.filter((e) => e.status.toLowerCase().includes(termStatus.toLowerCase().trim())).length > 0 &&

          // search
          e.kode.toLowerCase().includes(termKode.toLowerCase().trim()) &&

          (e.lokasi.desa !== undefined ? e.lokasi.desa.name.toLowerCase().includes(termLokasi.toLowerCase().trim()) : false)
      );
    }

    if (result.length > 0) {
      setFilter(result);
    } else {
      setFilter(null);
    }
  };

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

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
    setCollapseClose(!collapseClose);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const fetchData = async (isSubscribed) => {
    let formData = new FormData();

    const requestOption = {
      method: "POST",
      body: formData,
    };

    const url =
      props.tab === "AI"
        ? `${process.env.REACT_APP_BE_URL}/survey/getsurveylogai/`
        : `${process.env.REACT_APP_BE_URL}/survey/getsurveylogbts/`;

    await fetch(url, requestOption)
      .then((result) => {
        return result.json();
      })
      .then(async (result) => {
        setLoading(false);
        if (isSubscribed && result.success) {
          const datas = [...new Set(result.values.map((e) => e.status.map((i) => i.status)))];
          const flatDatas = datas.flat();
          const setFlatData = [...new Set(flatDatas)];
          setDataStatus(setFlatData);

          // const datasTanggal = [
          //   ...new Set(result.values.map((e) => e.status.map((i) => i.tanggal_pembuatan))),
          // ];
          // const flatDatasTanggal = datasTanggal.flat();
          // const setFlatDataTanggal = [...new Set(flatDatasTanggal)];
          // setDataTanggal(setFlatDataTanggal);
          if (props.tab === "AI") {
            setDataLog(result.values);
            setDataResult(result.values);
          } else {
            // fetch data baru :
            console.log('sianjaaay');
            await fetch(`${process.env.REACT_APP_BE_URL}/survey/getLogBtsAdminNew/`)
              .then((result2) => {
                return result2.json();
              })
              .then((result2) => {
                console.log('request be dev :', result2);
                let tempresarr2 = result2.values
                let asd2 = []
                asd2 = tempresarr2.map((arr) => {
                  return {
                    "kode": arr.data[0].kodeHasilSurvey,
                    "status": arr.data[0].status
                  }
                });
                setDataLog(asd2.concat(result.values));
                setDataResult(asd2.concat(result.values));
              })
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
        setReload(false);
      });
  };

  // Handling CSV/Excel sort & populate items
  const handleClickSort = (dataSort) => {
    // setDataCSV(reformatCSV(dataSort));
    setItems(dataSort);
  }

  // untuk check dia selesai fecth or belum
  useEffect(() => {
    let isSubscribed = true;
    fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  return (
    <>
      <div className={`${styles.wrapperTable} w-100 pt-2 border-top`}>
        <div className={"d-none d-md-block"}>
          <Row className={styles.wrapper_filter}>
            <Col className={"p-3"} lg={6}>
              <Card className={"bg-light border-0 h-100"}>
                <CardBody>
                  <h6>Filter</h6>
                  <FilterBox
                    handleFilter={handleTermStatus}
                    handleReset={handleReset}
                    reset={reset}
                    dataFilter={dataStatus}
                    defaultPick={"Pilih Status"}
                    label={"Status"}
                    value={termStatus}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className={"p-3"} lg={6}>
              <Card className={"bg-light border-0 h-100 w-100"}>
                <CardBody>
                  <h6>Search</h6>
                  <SearchBox
                    handleTerm={handleTermKode}
                    handleKeyPress={handleKeyPress}
                    className={styles.search}
                    value={termKode}
                    keywords={"Kode Survey"}
                  />

                  <SearchBox
                    handleTerm={handleTermLokasi}
                    handleKeyPress={handleKeyPress}
                    className={styles.search}
                    value={termLokasi}
                    keywords={"Lokasi Survey"}
                  />

                  {/* <div className={"d-flex w-75 justify-content-between"}>
                    <Label className={styles.label_filter} for="awal">
                      Range Tanggal SLA
                    </Label>
                    <DateRangePicker
                      onApply={handleChangeDate}
                      startDate="1/1/2014"
                      endDate="3/1/2014"
                      defaultText="pilih tanggal">
                      <input name="dateRange" bssize="sm" className={`${styles.input} btn`} />
                    </DateRangePicker>
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <div className={"d-block d-md-none"}>
          <Card className={"bg-light border-0 h-100 w-100"}>
            <CardBody style={{ padding: "0.5rem" }}>
              <h6>Filter</h6>
              <FilterBox
                handleFilter={handleTermStatus}
                handleReset={handleReset}
                reset={reset}
                dataFilter={dataStatus}
                defaultPick={"Pilih Status"}
                label={"Status"}
                value={termStatus}
              />
            </CardBody>
          </Card>

          <Card className={"bg-light border-0 h-100 w-100 mt-2"}>
            <CardBody style={{ padding: "0.5rem" }}>
              <h6>Search</h6>
              <SearchBox
                handleTerm={handleTermKode}
                handleKeyPress={handleKeyPress}
                className={styles.search}
                value={termKode}
                keywords={"Kode Survey"}
              />

              <SearchBox
                handleTerm={handleTermLokasi}
                handleKeyPress={handleKeyPress}
                className={styles.search}
                value={termLokasi}
                keywords={"Lokasi Survey"}
              />

              {/* <div className={"d-flex w-75 justify-content-between"}>
                <Label className={styles.label_filter} for="awal">
                  Range Tanggal SLA
                </Label>
                <DateRangePicker
                  onApply={handleChangeDate}
                  initialSettings={{
                    locale: {
                      format: "DD/MM/YYYY",
                    },
                  }}
                  startDate="1/1/2014"
                  endDate="3/1/2014"
                  defaultText="pilih tanggal">
                  <input
                    name="dateRange"
                    bssize="sm"
                    className={`${styles.input} form-control-sm`}
                    style={{ width: "100%" }}
                  />
                </DateRangePicker>
              </div> */}
            </CardBody>
          </Card>
        </div>

        <Row className={`justify-content-center mb-3 mt-2`}>
          <Button size="sm" color="" className={styles.btn_search} onClick={(e) => handleSubmit(e)}>
            Search
          </Button>
          <Button size="sm" color="" className={styles.btn_reset} onClick={handleReset}>
            Reset
          </Button>
        </Row>

        {dataResult.length === 0 ? (
          <LoadingSpinner loading={loading} />
        ) : (
            <Table
              borderless
              responsive
              hover
              style={{ fontSize: "0.9rem", overflow: "scroll" }}
            >
              <TableRow
                filter={filter}
                data={dataLog}
                startPage={currentPage * pageItems}
                endPage={currentPage * pageItems + pageItems}
                currentPage={currentPage}
                collapseClose={collapseClose}
                handleClickSort={handleClickSort}
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
    </>
  );
}

export default TableLogHasilSurveyAdmin;
