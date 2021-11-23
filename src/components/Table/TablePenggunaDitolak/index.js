import React, { useState, useEffect, useMemo, Fragment } from "react";
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
} from "reactstrap";
import get from 'lodash.get';
import styles from "./styles.module.css";
import ButtonPDF from "../../../assets/icons/pdf-icon.svg";
import ButtonDelete from "../../../assets/icons/DeleteIcon.svg";
import SearchBox from "../../Search";
import FilterBox from "../../Filter";
import PopupAlasan from "../../Popup/PopupAlasan";
import PopupDokPenunjang from "../../Popup/PopupDokPenunjang";
import ModalHapusPengguna from "../../Popup/ModalHapusPengguna";

const LoadingSpinner = (props) => {
  return (
    <Table responsive style={{ fontSize: "0.9rem", overflow: "scroll" }}>
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
    width: "2%",
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
    width: "1%",
    textAlign: "center",
    className: `${styles.content_report_table}`,
  },
  {
    id: "no_telp",
    label: "No. Telp",
    verticalAlign: "middle",
    textAlign: "center",
    width: "2%",
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
    id: "alasan",
    label: "Alasan",
    verticalAlign: "middle",
    textAlign: "center",
    width: "1%",
    className: `${styles.content_report_table}`,
  },
  {
    id: "aksi",
    label: "Aksi",
    verticalAlign: "middle",
    textAlign: "center",
    width: "1%",
    className: `${styles.content_report_table}`,
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
  alasan,
  aksi
) {
  return { nama, username, tipe, email, no_telp, instansi, dokumen_penunjang, alasan, aksi };
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

function TablePenggunaDitolak(props) {
  // state
  const [reload, setReload] = useState(true);
  const [rows, setRows] = useState([]);
  const [tableStatus, setTableStatus] = useState(true);
  const [dataDelete, setDataDelete] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);

  // data search and render
  const [dataResult, setDataResult] = useState([]);

  // modal alasan
  const [modalComment, setModalComment] = useState(false);
  const [dataComment, setDataComment] = useState("");

  // modal pengguna pdf
  const [modalDok, setModalDok] = useState(false);
  const toggleDok = () => {
    setModalDok(!modalDok);
  };

  // data pdf
  const [dataPDF, setDataPDF] = useState([]);

  // toggle alasan
  function handleModalAlasan(comment) {
    setDataComment(comment);
    setModalComment(!modalComment);
  }

  const handlePreviewPDF = (i) => {
    setDataPDF(i);
    toggleDok();
  };

  // table states
  const [filter, setFilter] = useState([]);
  const [termNama, setTermNama] = useState("");
  const [termTelepon, setTermTelepon] = useState("");
  const [termUsername, setTermUsername] = useState("");
  const [termTipe, setTermTipe] = useState("");
  const [termEmail, setTermEmail] = useState("");
  const [termInstansi, setTermInstansi] = useState("");
  const [loading, setLoading] = useState(true);

  // reset
  const [reset, setReset] = useState(false);

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
        (termTipe === "" ? e.tipe.toLowerCase().includes(termTipe.toLowerCase().trim()) : e.tipe.toLowerCase() === termTipe.toLowerCase().trim()) &&

        // Search
        e.nama.toLowerCase().includes(termNama.toLowerCase().trim()) &&
        e.username.toLowerCase().includes(termUsername.toLowerCase().trim()) &&
        e.email.toLowerCase().includes(termEmail.toLowerCase().trim()) &&
        e.no_telp.toLowerCase().includes(termTelepon.toLowerCase().trim())
      // (termSurveyor === "" ? true : e.surveyor.toLowerCase() === termSurveyor.toLowerCase())
    );

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
  };

  // unique lists for Filter
  const listInstansi = [...new Set(rows.map((item) => item.instansi))]; //instansi: [..]
  const listTipe = [...new Set(rows.map((item) => item.tipe))]; //Lokasi Survey: [..]

  async function fetchAPIPenggunaNonAktif(isSubscribed) {
    const getPenggunaNonAktif = await fetch(
      `${process.env.REACT_APP_BE_URL}/user/get/?status=declined`
    ).then((result) => result.json());

    setLoading(false);
    if (isSubscribed && getPenggunaNonAktif.success) {
      setTableStatus(true);
      const rowsData = [];

      for (let i of getPenggunaNonAktif.values) {
        const dokumen_penunjang = (
          <div>
            <Button
              color=""
              className={styles.button_pdf_verifp}
              onClick={() => handlePreviewPDF(i)}>
              <img src={ButtonPDF} alt="" />
            </Button>
          </div>
        );

        const alasan = (
          <>
            <div style={{ display: "inline" }}>
              <Button color="" onClick={() => handleModalAlasan(i.comment)}>
                <p className={styles.alasan}>Alasan</p>
              </Button>
            </div>
          </>
        );

        const buttonDelete = (
          <div style={{ display: "inline" }}>
            <Button color="" onClick={() => toggleDelete(i)}>
              <img className={styles.button_delete} src={ButtonDelete} alt="" />
            </Button>
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
            alasan,
            buttonDelete,
            i.doc.name
          )
        );
      }
      setRows(rowsData);
      setDataResult(rowsData);
    } else {
      setTableStatus(false);
    }
  }

  // toggle modal delete
  let toggleDelete = (i) => {
    setDataDelete(i);
    setModalDelete(true);
    // setModalDelete(!modalDelete);
  };

  // handle enter when search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // toggle modal delete
  let declineAction = (i) => {
    fetch(`${process.env.REACT_APP_BE_URL}/user/removeuser/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: dataDelete._id,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then(async (result) => {
        setReload(!reload);
        setModalDelete(!modalDelete);

        if (result.success) {
          props.handleAlert(true, 'Hapus Akun');
        } else {
          props.handleAlert(false, 'Hapus Akun');
        }

        // setDataDelete([]);
      })
      .catch((e) => {
        setReload(!reload);
        setModalDelete(!modalDelete);

        props.handleAlert(false, 'Hapus Akun');
      });
  };

  // create initial data
  useEffect(() => {
    let isSubscribed = true;
    fetchAPIPenggunaNonAktif(isSubscribed);
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

      <PopupAlasan
        isOpenModal={modalComment}
        toggleModalAlasan={() => handleModalAlasan()}
        comment={dataComment}
      />

      <ModalHapusPengguna
        modalDelete={modalDelete}
        toggleDelete={() => setModalDelete(false)}
        // toggleDelete={toggleDelete}
        data={dataDelete}
        // verificationStatus={verificationStatus}
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
                  handleFilter={handleTermTipe}
                  handleReset={handleReset}
                  reset={reset}
                  dataFilter={listTipe}
                  defaultPick={"Pilih Tipe"}
                  label={"Tipe"}
                  value={termTipe}
                />
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
                      {index_col < colLength - 3 ? (
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

export default TablePenggunaDitolak;
