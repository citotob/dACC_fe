import React, { useState, useEffect, useMemo, Fragment } from "react";
import {
  Col,
  Card,
  CardBody,
  Table,
  Row,
  Spinner,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import get from 'lodash.get';

import styles from "./styles.module.css";

import ButtonPDF from "../../../assets/icons/pdf-icon.svg";
import ButtonDelete from "../../../assets/icons/Tolak.svg";
import ButtonVerify from "../../../assets/icons/Setuju.svg";
import PopupVerify from "../../Popup/PopupConfirmation";
import PopupTolak from "../../Popup/PopupTolak";
import SearchBox from "../../Search";
import FilterBox from "../../Filter";
import PopupDokPenunjang from "../../Popup/PopupDokPenunjang";
import useDeepCompareEffect from "use-deep-compare-effect";

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
    id: "nama",
    label: "Nama",
    verticalAlign: "middle",
    textAlign: "left",
    width: "1.5% ",
    className: `${styles.content_report_table}`,
  },
  {
    id: "username",
    label: "Username",
    verticalAlign: "middle",
    textAlign: "center",
    width: "1%",
    className: `${styles.content_report_table}`,
  },
  {
    id: "tipe",
    label: "Tipe",
    verticalAlign: "middle",
    width: "2%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "email",
    label: "Email",
    verticalAlign: "middle",
    width: "2%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "no_telp",
    label: "No. Telp",
    verticalAlign: "middle",
    textAlign: "center",
    width: "3%",
    className: `${styles.content_report_table}`,
  },
  {
    id: "instansi",
    label: "Instansi",
    verticalAlign: "middle",
    width: "1%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "dokumen_penunjang",
    label: "Dokumen Penunjang",
    verticalAlign: "middle",
    textAlign: "center",
    width: "3%",
    className: `${styles.content_report_table}`,
  },
  {
    id: "button_verify",
    label: "Verifikasi",
    verticalAlign: "middle",
    textAlign: "center",
    width: "1%",
    className: `${styles.content_report_table} `,
  },
];

const colLength = columns.length;

// Create Data for Row
function createData(
  nama,
  username,
  tipe,
  email,
  no_telp,
  instansi,
  dokumen_penunjang,
  button_verify
  // files
) {
  return {
    nama,
    username,
    tipe,
    email,
    no_telp,
    instansi,
    dokumen_penunjang,
    button_verify,
    // files,
  };
}

// Sorting Data
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
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

function TablePenggunaVerif(props) {
  const { alert } = props;

  // state
  const [rows, setRows] = useState([]);
  const [verificationNumber, setVerificationNumber] = useState(0);
  const [modalVerify, setModalVerify] = useState(false);
  const [dataVerify, setDataVerify] = useState([]);
  const [tableStatus, setTableStatus] = useState(true);
  const [dataDelete, setDataDelete] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [reload, setReload] = useState(true);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(true);

  // data search and render
  const [dataResult, setDataResult] = useState([]);

  // modal pengguna pdf
  const [modalDok, setModalDok] = useState(false);
  const toggleDok = () => {
    setModalDok(!modalDok);
  };

  // data pdf
  const [dataPDF, setDataPDF] = useState([]);

  // handle data alasan
  const [dataAlasan, setDataAlasan] = useState("");

  // toggle modal
  let toggleVerify = (i) => {
    setDataVerify(i);
    setModalVerify(true);
  };

  let toggleDecline = (i) => {
    //
    setDataDelete(i);
    setModalDelete(true);
  };

  const handlePreviewPDF = (i) => {
    setDataPDF(i);
    toggleDok();
  };

  // handle alasan
  const handleChange = (e) => {
    let term = e.target.value;
    setDataAlasan(term);
  };

  // confirm
  const verifyAction = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/user/verify/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: dataVerify._id,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then(async (result) => {
        setReload(!reload);
        setModalVerify(!modalVerify);

        if (result.success === true) {
          alert()
        }
        fetchAPIVerifikasiPengguna();
      })
      .catch((e) => {
        setReload(!reload);
        setModalVerify(!modalVerify);
        // if (e) {
        //   props.handleAlert(false, 'Verifikasi Pengguna');
        // }

        // props.handleAlertVerif(false, 'Verifikasi Pengguna');
      });
  };

  // toggle modal delete
  let declineAction = (i) => {
    fetch(`${process.env.REACT_APP_BE_URL}/user/decline/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: dataDelete._id,
        comment: dataAlasan,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setReload(!reload);
        setModalDelete(!modalDelete);

        if (result.success) {
          props.handleAlertVerif(true, 'Tolak Pengguna');
        } else {
          props.handleAlertVerif(false, 'Tolak Pengguna');
        }
      })
      .catch((e) => {
        setReload(!reload);
        setModalDelete(!modalDelete);

        // console.log("catch error", e)

        // props.handleAlertVerif(false, 'Tolak Pengguna');
      });
  };

  // table states
  const [filter, setFilter] = useState([]);
  const [termNama, setTermNama] = useState("");
  const [termInstansi, setTermInstansi] = useState("");
  const [termUsername, setTermUsername] = useState("");
  const [termTipe, setTermTipe] = useState("");
  const [termEmail, setTermEmail] = useState("");
  const [termTelepon, setTermTelepon] = useState("");

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
  };

  // unique lists for Filter
  const listInstansi = [...new Set(rows.map((item) => item.instansi))]; //instansi: [..]
  const listTipe = [...new Set(rows.map((item) => item.tipe))]; //Lokasi Survey: [..]

  // handle term filter
  const handleTermInstansi = (term) => {
    if (term === "Default") {
      setTermInstansi("");
    } else {
      setTermInstansi(term);
    }
  };

  const handleTermTipe = (term) => {
    if (term === "Default") {
      setTermTipe("");
    } else {
      setTermTipe(term);
    }
  };

  // handle term search
  const handleTermNama = (term) => {
    setTermNama(term);
  };

  const handleTermUsername = (term) => {
    setTermUsername(term);
  };

  const handleTermEmail = (term) => {
    setTermEmail(term);
  };

  const handleTermTelepon = (term) => {
    setTermTelepon(term);
  };

  // handle Reset filter
  const handleReset = () => {
    setReset(true);
    setFilter([]);

    setTermInstansi("");
    setTermTipe("");

    setTermUsername("");
    setTermNama("");
    setTermEmail("");
    setTermTelepon("");

    setCurrentPage(0);
  };

  // handling search submit
  const handleSubmit = (e) => {
    // e.preventDefault();

    setCurrentPage(0);

    let result = rows.filter(
      (e) =>
        // Filter
        e.instansi.toLowerCase().includes(termInstansi.toLowerCase().trim()) &&
        (termTipe === "" ? e.tipe.toLowerCase().includes(termTipe.toLowerCase().trim()) : e.tipe.toLowerCase() === termTipe.toLowerCase()) &&

        // Search
        e.nama.toLowerCase().includes(termNama.toLowerCase().trim()) &&
        e.username.toLowerCase().includes(termUsername.toLowerCase().trim()) &&
        e.email.toLowerCase().includes(termEmail.toLowerCase().trim()) &&
        e.no_telp.toLowerCase().includes(termTelepon.toLowerCase().trim())
    );
    if (result.length > 0) {
      setFilter(result);
    } else {
      setFilter(null);
    }
  };

  async function fetchAPIVerifikasiPengguna(isSubscribed) {
    const getUnverifiedPengguna = await fetch(
      `${process.env.REACT_APP_BE_URL}/user/get/?status=requested`
    ).then((result) => result.json());

    setLoading(false);
    if (isSubscribed && getUnverifiedPengguna.success) {
      setTableStatus(true);
      setVerificationNumber(getUnverifiedPengguna.values.length);
      const rowsData = [];
      for (let i of getUnverifiedPengguna.values) {

        const dokumen_penunjang = (
          <div>
            <Button
              color=""
              className={styles.button_pdf_verifp}
              onClick={() => handlePreviewPDF(i)}
            >
              <img src={ButtonPDF} alt="" />
            </Button>
          </div>
        );

        const buttonAction = (
          <div style={{ display: "flex" }}>
            <button className={styles.btn_verif} onClick={() => toggleVerify(i)}>
              <img className={styles.button_delete} src={ButtonVerify} alt="" />
            </button>
            <div className={styles.barrier}></div>
            <button className={styles.btn_verif} onClick={() => toggleDecline(i)}>
              <img className={styles.button_delete} src={ButtonDelete} alt="" />
            </button>
          </div>
        );

        rowsData.push(
          createData(
            i.name ?? "-",
            i.username ?? "-",
            i.role.name ?? "-",
            i.email ?? "-",
            i.phone ?? "-",
            i.organization.name ?? "-",
            dokumen_penunjang,
            buttonAction
            // i.doc.name
          )
        );
      }

      setRows(rowsData);
      setDataResult(rowsData);
    } else {
      setTableStatus(false);
    }
  }

  useDeepCompareEffect(() => {
    if (props.fetch.fetch) {
      let isSubscribed = true;
      fetchAPIVerifikasiPengguna(isSubscribed);
      return () => (isSubscribed = false);
    }
    props.fetch.setFetch();
  }, [props.fetch]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // create initial data
  useEffect(() => {
    let isSubscribed = true;
    fetchAPIVerifikasiPengguna(isSubscribed);
    return () => (isSubscribed = false);
  }, [reload]);

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
      <PopupDokPenunjang
        modalDok={modalDok}
        toggleDok={() => toggleDok()}
        data={dataPDF}
      />

      <PopupVerify
        modalVerify={modalVerify}
        toggleVerify={() => setModalVerify(false)}
        data={dataVerify}
        verifyAction={verifyAction}
      />

      <PopupTolak
        modalDelete={modalDelete}
        toggleDecline={() => setModalDelete(false)}
        data={dataDelete}
        handleChangeAlasan={handleChange}
        deleteAction={declineAction}
      />

      <div className={styles.wrapper_table}>
        <Row className={`${styles.wrapper_filter} border-top`}>
          <Col className={"p-3 h-75"} lg={5}>
            <Card className={"h-75 border-0 bg-light"}>
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
                <FilterBox
                  // handleReset={() => setReset(false)}
                  handleFilter={handleTermTipe}
                  handleReset={handleReset}
                  reset={reset}
                  dataFilter={listTipe}
                  defaultPick={"Pilih Tipe"}
                  label={"Tipe"}
                  value={termTipe}
                />

                {/* <FilterBox
                  handleReset={() => setReset(false)}
                  reset={reset}
                  handleFilter={handleTermFile}
                  dataFilter={listFile}
                  defaultPick={"Pilih File"}
                  label={"File"}
                  value={termFile}
                /> */}
              </CardBody>
            </Card>
          </Col>
          <Col className={"p-3 h-75"} lg={7}>
            <Card className={"d-none d-md-block h-75 border-0 bg-light"}>
              <CardBody>
                <h6>Search</h6>
                <div className={"d-flex w-100"}>
                  <div className={"d-flex flex-column w-50"}>
                    <SearchBox
                      handleKeyPress={handleKeyPress}
                      value={termNama}
                      handleTerm={handleTermNama}
                      keywords={"Nama"}
                    />
                    <SearchBox
                      handleKeyPress={handleKeyPress}
                      value={termUsername}
                      handleTerm={handleTermUsername}
                      keywords={"Username"}
                    />
                  </div>
                  <div className={"d-flex flex-column w-50 pl-5"}>
                    <SearchBox
                      handleKeyPress={handleKeyPress}
                      value={termEmail}
                      handleTerm={handleTermEmail}
                      keywords={"Email"}
                    />
                    <SearchBox
                      handleKeyPress={handleKeyPress}
                      value={termTelepon}
                      handleTerm={handleTermTelepon}
                      keywords={"Telepon"}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className={"d-block d-md-none h-75 border-0 bg-light"}>
              <CardBody>
                <h6>Search</h6>
                <SearchBox
                  value={termNama}
                  handleKeyPress={handleKeyPress}
                  handleTerm={handleTermNama}
                  keywords={"Nama"}
                />
                <SearchBox
                  handleKeyPress={handleKeyPress}
                  value={termUsername}
                  handleTerm={handleTermUsername}
                  keywords={"Username"}
                />
                <SearchBox
                  handleKeyPress={handleKeyPress}
                  value={termEmail}
                  handleTerm={handleTermEmail}
                  keywords={"Email"}
                />
                <SearchBox
                  handleKeyPress={handleKeyPress}
                  value={termTelepon}
                  handleTerm={handleTermTelepon}
                  keywords={"Telepon"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className={`justify-content-center border-bottom pb-3`}>
          <Button size="sm" color="" className={styles.btn_search} onClick={(e) => handleSubmit(e)}>
            Apply
          </Button>
          <Button size="sm" color="" className={styles.btn_reset} onClick={handleReset}>
            Reset
          </Button>
        </Row>

        {rows.length === 0 ? (
          <LoadingSpinner loading={loading} />
        ) : (
            <Table borderless responsive hover style={{ fontSize: "0.9rem" }}>
              <thead>
                <tr className={`${styles.content_report_table} head`}>
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
                      {index_col < colLength - 2 ? (
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
                {items.length > 0 && filter != null ? (
                  items.slice(currentPage * pageItems, currentPage * pageItems + pageItems)
                    .map((row, index_row) => {
                      return (
                        <tr key={index_row} className={`${styles.border_laporan}`} >
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
                                key={index_col}>
                                {value}
                              </td>
                            );
                          })}
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
            </Table>
          )}

        {/* pagination */}
        <Fragment>
          {items.length > 0 && filter != null ? (
            <div className={styles.pagins}>
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

export default TablePenggunaVerif;
