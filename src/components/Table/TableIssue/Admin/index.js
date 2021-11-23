import React, { useState, useEffect, useMemo, Fragment } from "react";
// component
import SearchBox from "../../../Search";
import FilterBox from "../../../Filter";
import { CSVLink } from "react-csv";
import ReactExport from "react-data-export";

// third party
import {
  Table,
  Row,
  Spinner,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
  Col,
  Card,
  CardBody,
} from "reactstrap";

// datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

// styling
import styles from "./styles.module.css";

import get from 'lodash.get';
import moment from "moment";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
    id: "data[0].user.organization.name",
    label: "Instansi Surveyor",
    verticalAlign: "middle",
    textAlign: "center",
    width: "1%",
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
    id: "data[0].status",
    label: "Tanggal Hasil Survey Masuk",
    verticalAlign: "middle",
    width: "2%",
    textAlign: "center",
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
      } else if (sortConfig.key === 'data[0].status') { // Sort Date
        sortableItems.sort((a, b) => {
          if (moment(get(get(a, sortConfig.key).slice(-1).pop(), 'tanggal_pembuatan', '-')).format("YYYYMMDD") < moment(get(get(b, sortConfig.key).slice(-1).pop(), 'tanggal_pembuatan', '-')).format("YYYYMMDD")) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (moment(get(get(a, sortConfig.key).slice(-1).pop(), 'tanggal_pembuatan', '-')).format("YYYYMMDD") > moment(get(get(b, sortConfig.key).slice(-1).pop(), 'tanggal_pembuatan', '-')).format("YYYYMMDD")) {
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

// table content
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
  }, [props.data]);

  // handle click to detail issue
  const handleClick = (val) => {
    props.setContent(2);
    props.setData(val);
  };

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
              {index_col < colLength - 0 ? (
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
          items
            .slice(props.startPage, props.endPage)
            .map((row, index_row) => {
              const kodeSurvey = `${row.data[0].kodeHasilSurvey}/${row.data[0].tiket ?? '-'}`;

              return (
                <tr key={index_row} className={`${styles.border_laporan}`} style={{ fontSize: "15px" }}>
                  <td>{20 * props.currentPage + index_row + 1}</td>
                  <td>{kodeSurvey}</td>
                  <td>
                    {get(row, "data[0].user.organization.name", "-")}
                  </td>
                  <td>
                    {get(row, "lokasi.desa.name", "-")}
                  </td>
                  <td>
                    {get(row, 'data[0].status[0].tanggal_pembuatan')
                      ? moment(get(row, 'data[0].status[0].tanggal_pembuatan')).format("DD/MM/YYYY")
                      : '-'}
                    {/* {row.data[0].status.tanggal_pembuatan
                      ? moment(row.data[0].status.tanggal_pembuatan).format("DD/MM/YYYY")
                      : row.data[0].status.slice(-1).pop().tanggal_pembuatan
                        ? moment(row.data[0].status.slice(-1).pop().tanggal_pembuatan).format("DD/MM/YYYY")
                        : "-"} */}
                  </td>
                  <td>
                    <Button
                      className={styles.menu_button}
                      // onClick={() => {
                      //   // doc: set state content to hasil , send to hasilsurvey admin pages, switch to hasil survey detail
                      //   props.setContent(1);
                      //   // doc : set data to selected row data
                      //   props.setData(row);
                      // }}
                      onClick={() => handleClick(row)}
                    >
                      {!row ? `Loading...` : `Detail Issue`}
                    </Button>
                  </td>
                </tr>
              );
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

function TableIssue(props) {
  // reload
  const [reload, setReload] = useState(true);

  // state result data
  const [dataResult, setDataResult] = useState([]);

  // state reset filter
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(true);

  // state selected filter
  const [filter, setFilter] = useState([]);
  const [items, setItems] = useState([]);

  // state for search term
  const [termInstansi, setTermInstansi] = useState(""); // instansi
  const [termKode, setTermKode] = useState(""); // kode survey
  const [termLokasi, setTermLokasi] = useState(""); // lokasi survey
  const [startDate, setStartDate] = useState(null); // Tanggal Hasil Survey Masuk
  const [endDate, setEndDate] = useState(null); // Tanggal Hasil Survey Masuk

  // state CSV / Excel
  const [isReady, setIsReady] = useState(false);
  const [dataCSV, setDataCSV] = useState([]);
  const [headerCSV, setHeaderCSV] = useState([]);

  // handle term filter
  const handleTermInstansi = (term) => {
    if (term === "Default") {
      setTermInstansi("");
    } else {
      setTermInstansi(term);
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

  const reformatCSV = (arrayResult) => {
    const hasilMap = arrayResult.map((row, index_row) => {
      const object = Object.assign(
        {},
        {
          no: index_row + 1,
          kodeSurvey: row.data[0].kodeHasilSurvey,
          instansiSurveyor: row.data[0].user.organization.name,
          titikLokasi: row.lokasi.desa !== undefined ? row.lokasi.desa.name : '-',
          tanggalSurveyMasuk: get(row, 'data[0].status[0].tanggal_pembuatan')
            ? moment(get(row, 'data[0].status[0].tanggal_pembuatan')).format("DD/MM/YYYY")
            : '-'
        }
      );
      return object;
    });

    return hasilMap;
  };

  // handle Reset filter
  const handleReset = () => {
    setReset(true);
    setFilter([]);

    setTermInstansi("");

    setTermKode("");
    setTermLokasi("");
    setStartDate(null);
    setEndDate(null);

    setCurrentPage(0);
    setDataCSV(reformatCSV(dataResult));
  };

  // handling search submit
  const handleSubmit = (e) => {
    setCurrentPage(0);
    let result;

    if (startDate != null || endDate != null) {
      // Handling lokasi because Penugasan still not used
      if (termLokasi.trim() === "") {
        result = dataResult.filter(
          (e) =>
            // filter
            e.data[0].user.organization.name.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&

            // search
            e.data[0].kodeHasilSurvey.toLowerCase().includes(termKode.toLowerCase().trim()) &&

            moment(e.data[0].status[0].tanggal_pembuatan).isSameOrAfter(startDate) &&
            moment(e.data[0].status[0].tanggal_pembuatan).isSameOrBefore(endDate)
        );
      } else if (termLokasi.trim() === "-") { // Untuk search lokasi tanpa penugasan
        result = dataResult.filter(
          (e) =>
            // filter
            e.data[0].user.organization.name.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&

            // search
            e.data[0].kodeHasilSurvey.toLowerCase().includes(termKode.toLowerCase().trim()) &&
            (e.lokasi.desa !== undefined ? e.lokasi.desa.name.toLowerCase().includes(termLokasi.toLowerCase().trim()) : true) &&

            moment(e.data[0].status[0].tanggal_pembuatan).isSameOrAfter(startDate) &&
            moment(e.data[0].status[0].tanggal_pembuatan).isSameOrBefore(endDate)
        );
      } else {
        result = dataResult.filter(
          (e) =>
            // filter
            e.data[0].user.organization.name.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&

            // search
            e.data[0].kodeHasilSurvey.toLowerCase().includes(termKode.toLowerCase().trim()) &&
            (e.lokasi.desa !== undefined ? e.lokasi.desa.name.toLowerCase().includes(termLokasi.toLowerCase().trim()) : false) &&

            moment(e.data[0].status[0].tanggal_pembuatan).isSameOrAfter(startDate) &&
            moment(e.data[0].status[0].tanggal_pembuatan).isSameOrBefore(endDate)
        );
      }

    } else {
      // Handling lokasi because Penugasan still not used
      if (termLokasi.trim() === "") {
        result = dataResult.filter(
          (e) =>
            // filter
            e.data[0].user.organization.name.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&

            // search
            e.data[0].kodeHasilSurvey.toLowerCase().includes(termKode.toLowerCase().trim())
        );
      } else if (termLokasi.trim() === "-") { // Untuk search lokasi tanpa penugasan
        result = dataResult.filter(
          (e) =>
            // filter
            e.data[0].user.organization.name.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&

            // search
            e.data[0].kodeHasilSurvey.toLowerCase().includes(termKode.toLowerCase().trim()) &&
            (e.lokasi.desa !== undefined ? e.lokasi.desa.name.toLowerCase().includes(termLokasi.toLowerCase().trim()) : true)
        );
      } else {
        result = dataResult.filter(
          (e) =>
            // filter
            e.data[0].user.organization.name.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&

            // search
            e.data[0].kodeHasilSurvey.toLowerCase().includes(termKode.toLowerCase().trim()) &&
            (e.lokasi.desa !== undefined ? e.lokasi.desa.name.toLowerCase().includes(termLokasi.toLowerCase().trim()) : false)
        );
      }
    }

    if (result.length > 0) {
      setDataCSV(reformatCSV(result));
      setFilter(result);
    } else {
      setFilter(null);
    }
  };

  // unique lists for Filter
  const listInstansi = [...new Set(dataResult.map((item) => item.data[0].user.organization.name))]; //instansi: [..]

  // paginate configuration
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

  // handle enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // fetch data issue table
  const fetchData = async () => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveyissue/`, {
      method: "POST",
      body: JSON.stringify({
        jenis: `${props.tab.toLowerCase()}`,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setLoading(false);
        if (result.success === false) {
          // setDataResult(result.values);
          setReload(false);
        }
        if (result.success) {
          setDataResult(result.values);
          setReload(false);
        }
      })
      .catch((e) => console.log(e))
      .finally((e) => {
        setReload(false);
        setLoading(false);
      });
  };

  // // filter
  // const toggleTabReload = () => {
  //   setDataResult([]);
  // };

  // Handling CSV/Excel sort & populate items
  const handleClickSort = (dataSort) => {
    setDataCSV(reformatCSV(dataSort));
    setItems(dataSort);
  }

  useEffect(() => {
    fetchData();

    // === Export to CSV func ===
    const headers = [
      { label: "No.", key: "no" },
      { label: "Kode Survey", key: "kodeSurvey" },
      { label: "Instansi Surveyor", key: "instansiSurveyor" },
      { label: "Lokasi Survey", key: "titikLokasi" },
      { label: "Tanggal Hasil Survey Masuk", key: "tanggalSurveyMasuk" },
    ];
    setHeaderCSV(headers);

    const hasilMap = reformatCSV(dataResult);

    setDataCSV(hasilMap);
  }, [dataResult.length]);

  return (
    <>
      <div className={`${styles.wrapperTable} pt-2 border-top`}>
        <div className={"d-none d-md-block"}>
          <Row className={`${styles.wrapper_filter}`}>
            <Col className={"p-3 "} lg={6}>
              <Card className={"bg-light border-0"}>
                <CardBody>
                  <h6>Filter</h6>
                  <FilterBox
                    handleFilter={handleTermInstansi}
                    handleReset={handleReset}
                    reset={reset}
                    dataFilter={listInstansi}
                    defaultPick={"Pilih Instansi"}
                    label={"Instansi"}
                    value={termInstansi}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className={"p-3"} lg={6}>
              <Card className={"bg-light border-0"}>
                <CardBody>
                  <h6>Search</h6>
                  <SearchBox
                    handleKeyPress={handleKeyPress}
                    handleTerm={handleTermKode}
                    className={styles.search}
                    value={termKode}
                    keywords={"Kode Survey"}
                  />
                  <SearchBox
                    handleKeyPress={handleKeyPress}
                    handleTerm={handleTermLokasi}
                    className={styles.search}
                    value={termLokasi}
                    keywords={"Lokasi Survey"}
                  />

                  <div className={"d-flex w-75 justify-content-between"}>
                    <Label className={styles.label_filter} for="daterange">
                      Range Tanggal <br /> Hasil Survey
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
                      <input bssize="sm" name="dateRange" className={`${styles.input} btn`} />
                      {/* onChange={(e) => setDate(`${e.target.value} 00:00:00`)} */}
                    </DateRangePicker>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <div className={"d-block d-md-none"}>
          <Card className={"bg-light border-0 w-100 mt-2"}>
            <CardBody style={{ padding: "0.5rem" }}>
              <h6>Filter</h6>
              <FilterBox
                handleFilter={handleTermInstansi}
                handleReset={handleReset}
                reset={reset}
                dataFilter={listInstansi}
                defaultPick={"Pilih Instansi"}
                label={"Instansi"}
                value={termInstansi}
              />
            </CardBody>
          </Card>
          <Card className={"bg-light border-0 w-100 mt-2"}>
            <CardBody style={{ padding: "0.5rem" }}>
              <h6>Search</h6>
              <SearchBox
                handleKeyPress={handleKeyPress}
                handleTerm={handleTermKode}
                className={styles.search}
                value={termKode}
                keywords={"Kode Survey"}
              />
              <SearchBox
                handleKeyPress={handleKeyPress}
                handleTerm={handleTermLokasi}
                className={styles.search}
                value={termLokasi}
                keywords={"Lokasi Survey"}
              />
              <div className={"d-flex w-100 justify-content-between"}>
                <Label className={styles.label_filter} for="daterange">
                  Range Tanggal Hasil Survey
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
                  // style={{ width: "100%" }}
                  />
                  {/* onChange={(e) => setDate(`${e.target.value} 00:00:00`)} */}
                </DateRangePicker>
              </div>
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

        <div className="w-100 d-flex justify-content-end">
          <Button className={styles.btnDownloadCSV}>
            <CSVLink data={dataCSV} headers={headerCSV} filename={"Hasil Survey.csv"}>
              CSV
            </CSVLink>
          </Button>
          <ExcelFile filename="Hasil Survey" element={<Button className={styles.btnDownloadExcel}>Excel</Button>}>
            <ExcelSheet data={dataCSV} name="Survey">
              <ExcelColumn label="No." value="no" />
              <ExcelColumn label="Kode Survey" value="kodeSurvey" />
              <ExcelColumn label="Instansi Surveyor" value="instansiSurveyor" />
              <ExcelColumn label="Lokasi Survey" value="titikLokasi" />
              <ExcelColumn label="Tanggal Hasil Survey Masuk" value="tanggalSurveyMasuk" />
            </ExcelSheet>
          </ExcelFile>
        </div>

        {dataResult.length === 0 ? (
          <LoadingSpinner loading={loading} />
        ) : (
            <Table borderless responsive hover>
              <TableRow
                tab={props.tab}
                setContent={props.setContent}
                setData={props.setData}
                filter={filter}
                data={dataResult}
                startPage={currentPage * pageItems}
                endPage={currentPage * pageItems + pageItems}
                currentPage={currentPage}
                handleClickSort={handleClickSort}
              />
            </Table>
          )}

        {/* pagination */}
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
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, currentPage + 1)}
                    next
                    href="#"
                  />
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

export default TableIssue;
