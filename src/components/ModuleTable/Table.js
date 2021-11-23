import React, { useState, useEffect, useRef } from "react";

import _ from "lodash";
import DummyData from "./DummyData.json";
import { MDBDataTable } from "mdbreact";
import Filter from "../../helpers/filter";
import moment from "moment";
import { Row, Card, CardBody, Container, Alert } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import DTN from "../../assets/images/DTN.png";

const Table = (props) => {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const handleSearch = () => {
    const searchValue = searchRef.current.value;
    setSearch(searchValue);
  };
  const [isEmpty, setIsEmpty] = useState(false);

  var items = [];
  console.log("rows1", rows);
  if (rows.length !== 0) {
    if (rows.data.length > 0) {
      console.log("rows", rows);
      items = rows.data.filter((data) => {
        if (search === "") return data;
        let statusKurator = data
          ? data.status_kurator
            ? data.status_kurator.length !== 0
              ? data.status_kurator[data.status_kurator.length - 1].status
                ? data.status_kurator[data.status_kurator.length - 1].status
                : "-"
              : "-"
            : "-"
          : "-";
        let status = data.status;
        let emergency = data.emergency;
        const statusSearched =
          status && status === "submitted"
            ? emergency
              ? "emergency"
              : statusKurator === "Lolos Kurasi"
              ? "Lolos Kurasi"
              : statusKurator === "Tidak Lolos Kurasi"
              ? "Tidak Lolos Kurasi"
              : statusKurator === "Revisi"
              ? "Revisi"
              : statusKurator === "Sudah Revisi"
              ? "Sudah Revisi"
              : statusKurator
            : status === "declined"
            ? "Ditolak"
            : status === "approved"
            ? "Disetujui"
            : status === "scheduled"
            ? "Tayang"
            : data.status == "declined"
            ? "ditolak"
            : data.status == "Terjadwal"
            ? "Terjadwal"
            : data.status == "submitted"
            ? "Baru"
            : data.status == "canceled"
            ? "Dibatalkan"
            : data.status == "pending"
            ? "pending"
            : data.status;

        const index = [
          data ? (data.details ? data.details.title : data.title) : "-",
          data.category,
          // data.proposed_duration,
          // data.list_provinsi.map((prov) => prov.name).toString(),
          data.proposed_date.map((date) => moment(date, "DD-MM-YYYY").format("DD-MM-YYYY")).toString(),
          statusSearched,
        ];
        if (
          Filter.byIndex({
            index: index,
            search: search,
          })
        ) {
          return data;
        }
      });
    }
  }

  const data = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Judul",
        field: "judul",
        sort: "asc",
        width: 200,
      },
      {
        label: "Kategori",
        field: "kategori",
        sort: "asc",
        width: 150,
      },
      // {
      //   label: "Durasi",
      //   field: "durasi",
      //   sort: "asc",
      //   width: 150,
      // },
      // {
      //   label: "Provinsi",
      //   field: "provinsi",
      //   sort: "asc",
      //   width: 150,
      // },
      {
        label: "Tanggal Tayang",
        field: "tanggal_tayang",
        sort: "asc",
        width: 150,
      },
      //   {
      //     label: "Status",
      //     field: "status",
      //     sort: "disabled",
      //     width: 150,
      //   },
      {
        label: "Preview",
        field: "preview",
        sort: "disabled",
        width: 150,
      },
      //   {
      //     label: "",
      //     field: "aksi",
      //     sort: "disabled",
      //     width: 150,
      //   },
    ],

    rows:
      rows === null
        ? [
            {
              tanggal_tayang: [
                <Row key="a" className="justify-content-md-center">
                  Terjadi Kesalahan
                </Row>,
              ],
            },
          ]
        : items.map((it, index) => ({
            no: index + 1,
            judul: it.details.title ? it.details.title ?? "-" : it.title ?? "-",
            kategori: it.category ?? "-",
            // durasi: it.proposed_duration ?? "-",
            // provinsi:
            //   it.list_provinsi.length > 2
            //     ? `${it ? (it.list_provinsi[0] ? it.list_provinsi[0].name : "-") : "-"}, ${
            //         it ? (it.list_provinsi[1] ? it.list_provinsi[1].name : "-") : "-"
            //       }, ${it ? (it.list_provinsi[2] ? it.list_provinsi[2].name : "-") : "-"}...`
            //     : it.list_provinsi.length > 1
            //     ? `${it.list_provinsi[0] ? it.list_provinsi[0].name : "-"},${
            //         it.list_provinsi[1] ? it.list_provinsi[1].name : "-"
            //       }`
            //     : `${it.list_provinsi[0] ? it.list_provinsi[0].name : "-"}`,
            tanggal_tayang:
              it.proposed_date.length > 0 ? `${moment(it.proposed_date[0], "DD-MM-YYYY").format("DD-MM-YYYY")}\n s/d \n${moment(it.proposed_date.slice(-1), "DD-MM-YYYY").format("DD-MM-YYYY")} ` : "-",
            // status: getStatus(it),
            preview: [
              <a key={index}>
                <center style={{ width: "fit-content" }}>
                  <img
                    alt={it.details.title}
                    className="wrapperImgYT"
                    src={DTN}
                    //   src={it.details.thumbnail !== "" ? `${process.env.REACT_APP_BE_URL}/${it.details.thumbnail ? it.details.thumbnail : ""}` : noImage}
                  ></img>
                </center>
              </a>,
            ],
            // aksi: <ButtonAction title={it.details.title} data={it} status={it.status} />,
          })),
  };
  useEffect(() => {
    setRows(DummyData);
  }, []);
  return (
    <React.Fragment>
      <Card className="wrapperCard">
        <CardBody>
          <div className="d-flex ml-auto w-25 my-3">
            <input placeholder="Cari..." ref={searchRef} className="form-control" onChange={handleSearch} type="text" />
          </div>
          {/* <Container>
            <Alert color={"success"} isOpen={true}>
              ALERT
            </Alert>
          </Container> */}
          {rows.length === 0 && !isEmpty ? (
            <div>
              <h1>
                <Skeleton />
              </h1>
              <Skeleton count={10} />
            </div>
          ) : isEmpty ? (
            <div className="justify-content-md-center">Tidak ada konten archieve</div>
          ) : (
            <MDBDataTable
              id="tableArchievedVideo"
              noBottomColumns={true}
              className="text-center"
              responsive
              disableRetreatAfterSorting
              striped
              bordered
              data={data}
              // displayEntries={false}
              pagesAmount={5}
              entries={10}
              searching={false}
            />
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Table;
